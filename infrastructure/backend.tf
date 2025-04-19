terraform {
  backend "s3" {
    # Use dedicated state bucket configured via CLI with -backend-config
    key = "frankk-website.tfstate"
  }
}