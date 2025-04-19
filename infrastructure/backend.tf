terraform {
  backend "s3" {
    # bucket configured via CLI with -backend-config
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
