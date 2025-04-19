terraform {
  backend "s3" {
    # bucket and region configured via CLI with -backend-config
    key = "terraform.tfstate"
  }
}