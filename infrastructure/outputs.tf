output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the site"
  value       = module.static_site.s3_bucket_name
}

output "cloudfront_domain" {
  description = "CloudFront distribution domain name"
  value       = module.static_site.cloudfront_domain
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for the site"
  value       = module.static_site.cloudfront_distribution_id
}

// DNS validation options for ACM certificate
output "domain_validation_options" {
  description = "DNS validation options for ACM certificate"
  value       = module.static_site.domain_validation_options
}
