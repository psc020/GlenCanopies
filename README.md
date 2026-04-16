# Glen Canopies Website

Production-ready Next.js 16 marketing site for Glen Canopies, built around server-rendered service content, project-led SEO, and a configurable external project feed.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui-style component setup
- Zod validation
- Optional Plausible analytics
- Optional Resend email delivery

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: canonical production URL
- `NEXT_PUBLIC_BUSINESS_PHONE`: optional phone CTA in header, footer, and mobile sticky bar
- `NEXT_PUBLIC_BUSINESS_EMAIL`: optional email shown in footer and LocalBusiness schema
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: enables Plausible script and CTA tracking
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: optional Google Maps Embed API key for richer location maps on area cards/pages
- `SPIFFY_DATASET_URL`: optional full dataset URL when the project feed is supplied as a single endpoint
- `SPIFFY_API_URL`: base URL for the external project feed
- `SPIFFY_PROJECTS_PATH`: JSON endpoint path for project records
- `SPIFFY_API_TOKEN`: optional bearer token for the project feed
- `SPIFFY_ALLOWED_IMAGE_HOSTS`: comma-separated remote hosts allowed through `/api/media`
- `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `QUOTE_TO_EMAIL`: contact form delivery
- `REVALIDATE_SECRET`: protects `/api/revalidate`

## Notes

- Project data is fetched server-side, validated with Zod, mapped into internal project types, and cached with revalidation tags.
- In development, the recent work archive falls back to local demo project content if the external feed is not configured.
- In production, the site still builds without the feed, but archive sections will show graceful empty states until live data is connected.
