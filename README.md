# frankkme

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
Push to `main` branch triggers:
- Build & export (`npm run build`)
- Sync `/out/` to S3
- Invalidate CloudFront cache

## Infrastructure
Terraform in `/terraform`. To provision:
```bash
cd terraform
terraform init
terraform apply
```

## Runbook
See [RUNBOOK.md](RUNBOOK.md) for detailed instructions
