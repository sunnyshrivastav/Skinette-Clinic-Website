# Skinette Clinic

Premium, responsive marketing website for Skinette Clinic, a laser treatment and skin care clinic in Sector 16, Faridabad.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/skinette-clinic run dev` — run the Skinette Clinic website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/skinette-clinic/src/App.tsx` — single-page clinic experience, content, interactions, form validation, contact actions, and structured data
- `artifacts/skinette-clinic/src/index.css` — visual system, typography, motion, grain, and responsive styling
- `artifacts/skinette-clinic/public/` — local hero and clinic interior imagery

## Architecture decisions

- The site is frontend-only for now; consultation requests are intentionally captured locally and clearly described as requests, not confirmed bookings.
- Review and before/after areas use explicit placeholders until the clinic supplies approved patient content and consent.
- Phone and WhatsApp details live centrally in `App.tsx` so conversion links can be updated in one place.

## Product

- Presents Skinette Clinic's treatment approach and location
- Supports responsive anchor navigation, mobile menu, treatment and FAQ expansion
- Provides validated consultation request form plus direct phone and prefilled WhatsApp actions
- Includes local SEO metadata and MedicalBusiness/LocalBusiness JSON-LD

## User preferences

- Keep medical claims conservative and avoid invented clinicians, credentials, equipment, awards, social URLs, or testimonials.

## Gotchas

- Do not replace placeholder reviews or patient imagery with fabricated content; use approved clinic material only.
- The website workflow provides `PORT` and `BASE_PATH`; run through the managed workflow rather than starting Vite without those values.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
