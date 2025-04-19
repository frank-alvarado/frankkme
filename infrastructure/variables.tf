variable "aws_region" {
  description = "AWS region for resources (must be us-east-1 for ACM/CloudFront)"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Unique name for the S3 bucket to host the site"
  type        = string
}

variable "domain_name" {
  description = "Custom domain name for the site (e.g., frankk.me)"
  type        = string
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with DNS edit permissions"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for frankk.me"
  type        = string
}
