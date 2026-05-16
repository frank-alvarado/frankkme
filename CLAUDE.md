# CLAUDE.md

Guidance for Claude Code when working in this repo. Keep changes scoped — this is a small personal site, not a platform.

## What this is

**frankk.me** — Frank Alvarado's personal CV / portfolio. A statically-exported Next.js site whose content comes entirely from a single YAML file. Same YAML also feeds a LaTeX-rendered PDF resume.

For background, see [README.md](README.md), [CONTRIBUTING.md](CONTRIBUTING.md), [RUNBOOK.md](RUNBOOK.md), [SECURITY.md](SECURITY.md).

## Repo layout

| Path | Purpose |
| --- | --- |
| [app/](app/) | Next.js 16 app (React 19, Tailwind 3, Jest). Static export. |
| [data/cv.yml](data/cv.yml) | **Source of truth** for all CV content. Edit here, not in components. |
| [scripts/generate_cv.py](scripts/generate_cv.py) | Renders LaTeX → `app/public/cv.pdf` from `data/cv.yml`. |
| [latex/](latex/) | LaTeX templates / assets for the PDF. |
| [infrastructure/](infrastructure/) | Terraform: S3, CloudFront, ACM, Cloudflare DNS. |
| [.github/workflows/](.github/workflows/) | CI/CD pipeline (test → infra → deploy → tag). |

## Key files

- [app/src/pages/index.jsx](app/src/pages/index.jsx) — entry page; reads + validates `data/cv.yml` via `getStaticProps`.
- [app/src/pages/_app.jsx](app/src/pages/_app.jsx) — wraps pages with `ThemeToggle` + GA script.
- [app/src/components/](app/src/components/) — `Profile`, `Experience`, `Education`, `Skills`, `ThemeToggle`.
- [app/src/lib/cv-schema.js](app/src/lib/cv-schema.js) — zod schema for `cv.yml`. Build fails if YAML drifts from this.
- [app/src/instrumentation-client.js](app/src/instrumentation-client.js) — Sentry client init (replay, console logs, custom metrics).
- [infrastructure/main.tf](infrastructure/main.tf) — S3 + CloudFront + ACM + Cloudflare records.
- [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) — test, terraform apply, build/deploy, auto-tag release.

## Where tests live

[app/src/__tests__/](app/src/__tests__/) — Jest + RTL. One test file per component/page/lib. Shared helpers in [app/src/__tests__/utils/](app/src/__tests__/utils/) (excluded from test discovery via `testPathIgnorePatterns`).

## Adding a new CV section

1. Add the new section to [data/cv.yml](data/cv.yml).
2. Extend the zod schema in [app/src/lib/cv-schema.js](app/src/lib/cv-schema.js) so the build doesn't reject it.
3. Create a presentation component under [app/src/components/](app/src/components/) — it should accept the section data as a prop and render only.
4. Mount it in [app/src/pages/index.jsx](app/src/pages/index.jsx) inside `<main>` and destructure the prop from `Home(...)`.
5. Add a test under [app/src/__tests__/components/](app/src/__tests__/components/) mirroring the existing component-test pattern.

## Paths to ignore

When grepping/exploring, skip these — they're build output, vendored code, or LaTeX artifacts:

- `app/.next/`, `app/out/`, `app/coverage/` — Next build / static export / Jest coverage
- `app/node_modules/` — dependencies
- `latex/**/*.{aux,log,out,toc,fdb_latexmk,fls,synctex.gz}` — LaTeX intermediate files
- `infrastructure/.terraform/`, `infrastructure/*.tfstate*` — Terraform state and providers

## Common commands

```bash
# Dev / build / test (run from app/)
cd app
npm install
npm run dev          # localhost:3000
npm run build        # static export → app/out/
npm test             # Jest + RTL with coverage
npm run test:ci      # CI: JSON + LCOV coverage reporters
npm run analyze      # bundle analysis

# Regenerate the PDF CV (run from repo root)
./scripts/generate_cv.py    # requires python3 + pyyaml + pdflatex

# Infrastructure (from infrastructure/)
terraform init -backend-config=...
terraform apply
```

Node ≥ 20.9 (CI uses Node 22).

## Tech stack

Next.js 16 (static export, no SSR/API routes), React 19, Tailwind 3 (`darkMode: 'class'`), Jest + React Testing Library (jsdom), js-yaml, Sentry (`@sentry/nextjs` + `@sentry/profiling-node`), Google Analytics 4, Terraform 1.5, AWS (S3 + CloudFront + ACM via OIDC), Cloudflare DNS, Codecov.

## Conventions

- **JSX only** — no TypeScript. Don't introduce `.ts`/`.tsx` without asking. For type hints, use JSDoc against the zod-inferred `Cv` type from [cv-schema.js](app/src/lib/cv-schema.js): `/** @type {import('../lib/cv-schema').Cv} */`.
- **CV content lives in [data/cv.yml](data/cv.yml)** — to update profile/experience/skills, edit the YAML, not the React components. Components are presentation only. The shape is enforced by zod at build time — see [Adding a new CV section](#adding-a-new-cv-section).
- **Dark mode** is class-based (`darkMode: 'class'` in Tailwind) and persisted in `localStorage` by [ThemeToggle](app/src/components/ThemeToggle.jsx).
- **Coverage threshold is 10%** by design (early-stage). Raise it deliberately, not incidentally.
- No ESLint/Prettier config is checked in — defer to Next.js defaults.

## Gotchas (read before editing)

- **Static export only.** `next build` produces `app/out/`. There are no API routes, no SSR, no `getServerSideProps`. New data must come through `getStaticProps` at build time, or be loaded client-side.
- **`app/public/cv.pdf` is not built by CI.** After editing `data/cv.yml`, run `./scripts/generate_cv.py` locally and commit the regenerated PDF — otherwise the downloadable CV drifts from the site.
- **AWS uses OIDC in CI** — there are no long-lived AWS access keys, and there shouldn't be. Don't add `AWS_ACCESS_KEY_ID`-style secrets; extend the OIDC role instead.
- **Sentry DSN and GA ID** are injected at build time via `NEXT_PUBLIC_SENTRY_DSN` and `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`. Missing values won't fail the build but will silently disable telemetry.
- **CI auto-tags releases** as `YYYY-MM-DD-SHA` after a successful deploy on `main`. Don't create release tags manually.
- **Deploy is fire-and-forget on `main`**: a merged PR triggers terraform apply + S3 sync + CloudFront invalidation. Treat `main` accordingly.

## External integrations

- **Sentry** — errors, session replay (10% sampled / 100% on error), Node profiling, custom metrics (`user_action`, `api_response_time`).
- **Google Analytics 4** — loaded via `<Script strategy="afterInteractive">` in `_app.jsx`.
- **Codecov** — coverage uploaded from CI.
- **AWS** — S3 bucket (private, OAI-fronted) + CloudFront + ACM.
- **Cloudflare** — DNS only; ACM validation records managed via Terraform.
