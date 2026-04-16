# Deployment Guide

## Preflight

- `.env.local` is already ignored and should not be committed.
- The app builds successfully in production mode.
- Before launch, verify the live project feed URLs still return valid data.

## GitHub

If you want to create a brand new local git repository and push it to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

If you use the GitHub CLI:

```bash
gh repo create your-repo-name --private --source=. --remote=origin --push
```

If you prefer creating the repo in the GitHub website first:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## DigitalOcean App Platform

Recommended settings:

- App type: Web Service
- Source: GitHub repository
- Branch: `main`
- Source directory: `/`
- Environment: `Node.js`
- Build command: `npm ci && npm run build`
- Run command: `npm run start -- --hostname 0.0.0.0 --port 8080`
- HTTP port: `8080`
- Instance size: `basic-xxs`
- Region: `lon`

Health check:

- Path: `/`
- Initial delay: `15`
- Period: `30`
- Timeout: `5`
- Failure threshold: `5`

The included app spec is in `.do/app.yaml`.

## Environment Variables

Set these in DigitalOcean App Platform:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BUSINESS_PHONE`
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `SPIFFY_DATASET_URL`
- `SPIFFY_ALLOWED_IMAGE_HOSTS`
- `APIFY_TESTIMONIALS_DATASET_URL`
- `RESEND_API_KEY`
- `QUOTE_FROM_EMAIL`
- `QUOTE_TO_EMAIL`
- `REVALIDATE_SECRET`

Use the values from your local `.env.local` for the feed URLs rather than retyping them from memory.

## After Deployment

- Point your custom domain at the DigitalOcean app
- Update `NEXT_PUBLIC_SITE_URL` to the final production URL
- Trigger a fresh deployment
- Test:
  - homepage
  - recent work archive
  - development archive
  - contact form
  - remote project images
  - testimonials
