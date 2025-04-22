# frankk.me

<!-- Badges: CI/CD, coverage, dependencies, bundle size, tech, infra, deployments, status, releases -->
[![CI/CD](https://github.com/frank-alvarado/frankkme/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/frank-alvarado/frankkme/actions/workflows/ci-cd.yml) [![codecov](https://codecov.io/gh/frank-alvarado/frankkme/graph/badge.svg?token=ZKIJLTCRF3)](https://codecov.io/gh/frank-alvarado/frankkme)

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?logo=next.js)](https://nextjs.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.2-blue?logo=tailwind-css)](https://tailwindcss.com/) [![Terraform](https://img.shields.io/badge/Terraform-1.5.0-623ce4?logo=terraform)](https://www.terraform.io/) [![Cloudflare](https://img.shields.io/badge/Cloudflare-enabled-orange?logo=cloudflare)](https://cloudflare.com/) 

[![Deployments](https://img.shields.io/github/deployments/frank-alvarado/frankkme/production?label=Production&logo=github)](https://github.com/frank-alvarado/frankkme/deployments?environment=production) [![Website Status](https://img.shields.io/website-up-down-green-red/https/frankk.me?label=frankk.me)](https://frankk.me) [![Last Release](https://img.shields.io/github/release-date/frank-alvarado/frankkme?label=Last%20Release&logo=github)](https://github.com/frank-alvarado/frankkme/releases)

A modern, statically-generated personal website and CV.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Releases](#releases)
- [Quick Start](#quick-start)
- [LaTeX CV](#latex-cv)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
  - [Automated Workflow](#automated-workflow)
  - [Required GitHub Secrets](#required-github-secrets)
  - [Manual Deploy (optional)](#manual-deploy-optional)
- [Infrastructure](#infrastructure)
- [Editing Content](#editing-content)
- [Additional Resources](#additional-resources)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Built With ❤️](#built-with-️️)

## Features
- Static Site Generation with Next.js 15
- Utility-first styling with Tailwind CSS
- Dark/light mode toggle (system-aware, persistent)
- Unit tests (Jest, React Testing Library) with Codecov reporting
- CI/CD pipeline (GitHub Actions) automating test, build, deploy
- Infrastructure as Code (Terraform) on AWS S3 & CloudFront, Cloudflare

## Tech Stack
- Next.js 15
- Tailwind CSS 3.3.2
- Jest & React Testing Library
- GitHub Actions
- Terraform, AWS, Cloudflare

## Releases
Tags are auto-generated after successful deployments in `YYYY-MM-DD-<shortSHA>` format.
GitHub Releases are created automatically for each tag.

## Quick Start
1. Clone the repo
2. `cd app`
3. `npm install`
4. `npm run dev`
5. Visit [http://localhost:3000](http://localhost:3000)
6. **Generate PDF CV:** at project root run:
   ```bash
   ./scripts/generate_cv.py
   ```

## LaTeX CV
- LaTeX CV source & build scripts live in the `latex/` directory.
- See `latex/README.md` for more information.

## Project Structure
```plaintext
frankkme/
└── app/                    # Next.js application
    ├── public/             # Static assets
    ├── src/                # Pages, components, styles, data
    ├── next.config.js      # Next.js config
    ├── tailwind.config.js  # Tailwind config
    ├── postcss.config.js   # PostCSS config
    ├── jest.config.js      # Jest config
    ├── jest.setup.js       # Jest setup
    ├── codecov.yml         # Codecov config
    ├── package.json        # Dependencies & scripts
    └── package-lock.json   # Lockfile
frankkme/
├── infrastructure/         # Terraform for AWS & Cloudflare
├── .github/                # Workflows & deployments
├── README.md               # Project overview (this file)
├── RUNBOOK.md              # Runbook & troubleshooting
├── SECURITY.md             # Security policy
└── latex/                  # LaTeX CV source & build scripts (see `latex/README.md`)

```

## Deployment
### Automated Workflow
- Tests & coverage upload
- Terraform infra apply
- Build & static export
- Sync to S3 & invalidate CloudFront

### Required GitHub Secrets
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ZONE_ID`
- `CODECOV_TOKEN`

### Manual Deploy (optional)
```bash
cd app
npm ci
npm run build
aws s3 sync out/ s3/$S3_BUCKET_NAME --delete --cache-control max-age=60
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
```

## Infrastructure
Infrastructure as code lives in the `infrastructure/` directory. Ensure Terraform variables are set in GitHub Actions Secrets (e.g. `TF_VAR_s3_bucket_name`, `TF_VAR_domain_name`, `TF_VAR_cloudflare_api_token`, `TF_VAR_cloudflare_zone_id`).

The project uses a dedicated state bucket (`${{ secrets.S3_BUCKET_NAME }}-terraform-state`). First-time setup:
```bash
cd infrastructure
aws s3 mb s3://${{ secrets.S3_BUCKET_NAME }}-terraform-state
aws s3api put-bucket-versioning --bucket ${{ secrets.S3_BUCKET_NAME }}-terraform-state --versioning-configuration Status=Enabled
```
Then:
```bash
terraform init -reconfigure -backend-config=bucket=${{ secrets.S3_BUCKET_NAME }}-terraform-state -backend-config=region=us-east-1
terraform apply -auto-approve
```

## Editing Content
All CV data is centralized under `app/src/data/cv.yml`. To update your profile, experience, education, or skills, edit that file and push to `main`—the CI/CD pipeline will rebuild and redeploy your changes.

## Additional Resources
- Runbook & troubleshooting: [RUNBOOK.md]
- Security policy: [SECURITY.md]

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License – see the [LICENSE.md](LICENSE.md) file for details.

## Contact
Built and maintained by Frank Alvarado. Find me on [GitHub](https://github.com/frank-alvarado), [LinkedIn](https://www.linkedin.com/in/fralvarado), or email frjalv@gmail.com.

## Built With ❤️
Made with Next.js, Tailwind CSS, and a passion for development.
