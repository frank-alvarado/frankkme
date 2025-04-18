# frankk.me

[![Deploy](https://github.com/frank-alvarado/frankkme/actions/workflows/deploy.yml/badge.svg)](https://github.com/frank-alvarado/frankkme/actions/workflows/deploy.yml)
[Live Site](https://frankk.me)

Personal website / online CV built with Next.js & Tailwind CSS

Hosted on AWS S3 & CloudFront via GitHub Actions CI/CD

## Tech Stack
- Next.js (Static Generation)
- Tailwind CSS (Utility-first CSS)
- AWS S3 & CloudFront (Hosting & CDN)
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Browse to `http://localhost:3000`

## Deployment
This project is deployed via GitHub Actions. Ensure you’ve configured the following repository Secrets under **Settings > Secrets & variables > Actions**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`

Pushes to the `main` branch trigger:
- Install dependencies: `npm ci`
- Build the site: `npm run build`
- Sync `out/` to S3: `aws s3 sync out/ s3://${{ secrets.S3_BUCKET_NAME }} --delete --acl public-read`
- Invalidate CloudFront cache: `aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`

## Infrastructure
Terraform in `/terraform`. To provision:
```bash
cd terraform
terraform init
terraform apply
```

## Editing Content
All CV content is centralized in `data/cv.yml`. Modify your profile, experiences, education, and skills in that file. Commit & push to `main` to rebuild and redeploy.

## Runbook
See [RUNBOOK.md](RUNBOOK.md) for detailed instructions
