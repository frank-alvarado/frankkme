data "aws_iam_policy_document" "site_policy" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "CanonicalUser"
      identifiers = [aws_cloudfront_origin_access_identity.oai.s3_canonical_user_id]
    }
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }
}

resource "aws_s3_bucket" "site" {
  bucket        = var.s3_bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "public" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_policy.json
}

resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for o in aws_acm_certificate.cert.domain_validation_options : o.resource_record_name]
  depends_on             = [cloudflare_record.cert_validation]
  timeouts {
    create = "30m"
  }
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.domain_name}"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled = true

  aliases = [var.domain_name]

  origin {
    domain_name = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.site.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.site.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_root_object = "index.html"
  price_class         = "PriceClass_100"
}

/* AWS Route53 alias removed: Cloudflare will manage DNS */

// Cloudflare DNS records for ACM validation and CNAME
data "cloudflare_zones" "domain" {
  filter {
    name = var.domain_name
  }
}

locals {
  cf_zone_id = data.cloudflare_zones.domain.zones[0].id
  dv_suffix  = ".${var.domain_name}."
  dv_names   = [for o in aws_acm_certificate.cert.domain_validation_options : replace(o.resource_record_name, local.dv_suffix, "")]
}

resource "cloudflare_record" "cert_validation" {
  zone_id         = local.cf_zone_id
  name            = replace(element(tolist(aws_acm_certificate.cert.domain_validation_options), 0).resource_record_name, local.dv_suffix, "")
  type            = element(tolist(aws_acm_certificate.cert.domain_validation_options), 0).resource_record_type
  value           = element(tolist(aws_acm_certificate.cert.domain_validation_options), 0).resource_record_value
  ttl             = 60
  allow_overwrite = true
}

resource "cloudflare_record" "cname" {
  zone_id = local.cf_zone_id
  name    = var.domain_name
  type    = "CNAME"
  value   = aws_cloudfront_distribution.cdn.domain_name
  proxied = true
  ttl     = 1
  allow_overwrite = true
}
