variable "domain_name" {
  description = "Custom domain name for the site (e.g., frankk.me)"
  type        = string
}

variable "s3_bucket_name" {
  description = "Unique name for the S3 bucket to host the site"
  type        = string
}