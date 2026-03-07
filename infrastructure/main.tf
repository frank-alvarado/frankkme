# Terraform backend configured in backend.tf

# Terraform state bucket with versioning & encryption
resource "aws_s3_bucket" "terraform_state" {
  bucket        = "${var.s3_bucket_name}-terraform-state"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_encryption" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state_public_access" {
  bucket                  = aws_s3_bucket.terraform_state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

module "static_site" {
  source         = "./modules/static-site"
  domain_name    = var.domain_name
  s3_bucket_name = var.s3_bucket_name
}