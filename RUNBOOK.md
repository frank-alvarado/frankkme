# Runbook: Deploying frankk.me Static CV Site

## Prerequisites
- AWS CLI installed and configured with IAM creds
- Terraform v1.5+ installed
- Node.js v18+ and npm
- GitHub repository cloned locally

---
## 1. Provision AWS Infrastructure
1. `cd infrastructure`
2. Edit `variables.tf` in the `infrastructure/` folder:
   ```hcl
   variable "s3_bucket_name" { default = "<YOUR_UNIQUE_BUCKET>" }
   variable "domain_name"    { default = "frankk.me" }
   ```
3. Ensure Terraform state bucket exists
   ```bash
   aws s3 ls s3://${S3_BUCKET_NAME}-terraform-state || aws s3 mb s3://${S3_BUCKET_NAME}-terraform-state
   aws s3api put-bucket-versioning --bucket ${S3_BUCKET_NAME}-terraform-state --versioning-configuration Status=Enabled
   ```
4. Initialize Terraform with remote state
   ```bash
   terraform init -backend-config=bucket=${S3_BUCKET_NAME}-terraform-state -backend-config=region=us-east-1
   ```
5. Apply changes
   ```bash
   terraform apply
   ```
   - Confirm when prompted
   - Note outputs: `s3_bucket_name`, `cloudfront_domain`, and `domain_validation_options`
   - Retrieve S3 bucket name: `terraform output s3_bucket_name`

---
## 2. Configure GitHub Secrets
In your GitHub repo under **Settings > Secrets > Actions**, add:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME` (from Terraform output)
- `CLOUDFRONT_DISTRIBUTION_ID` (CF dist ID from Terraform or AWS console)
- `CLOUDFLARE_API_TOKEN` (for Cloudflare provider)
- `CLOUDFLARE_ZONE_ID` (your Cloudflare zone ID for frankk.me)

---
## 3. CI/CD with GitHub Actions
Your pipeline triggers on `push` to `main`:
- Installs dependencies (`npm ci`)
- Build the site: `npm run build` (static export is automatic via Next.js 15's `output: 'export'` in next.config.js)
- Syncs `/out/` to S3 (`aws s3 sync`)
- Invalidates CloudFront cache (`aws cloudfront create-invalidation`)

No manual steps needed after commit & push.

---
## 4. Local Development & Testing
1. Install packages
   ```bash
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```
3. Preview at `http://localhost:3000`
4. **Theme Toggle**
   - A theme switch appears in the top‑right.
   - It respects your OS preference on first load and persists choice in localStorage.
   - Toggle between light and dark modes to verify styling.

---
## 5. Updating Content
- Modify components in `components/` or pages in `pages/`.
- Style with Tailwind utilities in `styles/globals.css`.
- Commit & push to `main` to trigger deployment.

---
## 6. Troubleshooting
- **S3 403 errors**: Check bucket policy, `aws_s3_bucket_policy` and OAI.
- **DNS/SSL**: Ensure Route53 alias record and ACM status is `ISSUED`.
- **Pipeline failures**: Inspect GitHub Actions logs under **Actions** tab.

---
*End of runbook.*
