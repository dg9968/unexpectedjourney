# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Unexpected Journey (`unexpectedjourneymx.com`) — a Spanish-language marketing site for a youth travel-camp company (campamentos for ages 7–17: Londres, Toronto, Montreal, Rancho El Lucero, plus example school pages). Content-driven, conversion-focused (WhatsApp/email CTAs), not an app with user accounts.

Built on **vinext** (`https://github.com/cloudflare/vinext`), a Next.js-App-Router-compatible framework that runs on Vite. Routing/conventions (`app/`, `page.tsx`, `generateStaticParams`, `next/headers`, `next/navigation`) follow Next.js App Router even though `next` itself isn't a dependency — types come from `next-env.d.ts`. Deployment target is plain Node.js on **Render** (via vinext's `output: "standalone"` build mode), backed by **Render Postgres** — not Cloudflare Workers/D1, which this repo used until the Render migration.

## Commands

```bash
npm run dev          # vinext dev — local dev server (Node, HMR)
npm run build         # vinext build — production build, emits dist/standalone/
npm run start          # node dist/standalone/server.js — run the built standalone server
npm test               # build + node --test tests/rendered-html.test.mjs
npm run lint            # eslint . --ignore-pattern dist --ignore-pattern .next
npm run db:generate      # drizzle-kit generate — regenerate migrations after editing db/schema.ts
```

Node `>=22.13.0` required. No test runner beyond node:test — there's a single test file, no per-test filtering script (use `node --test --test-name-pattern=<name> tests/rendered-html.test.mjs` after `npm run build` if isolating one).

**Known issue:** `tests/rendered-html.test.mjs` still asserts against the original vinext-starter scaffolding (a `SkeletonPreview.tsx` / `app/_sites-preview/` loading skeleton, `react-loading-skeleton` dependency, "Your site is taking shape" placeholder copy) and, on top of that, imports the built output as a Cloudflare-Workers-shaped `fetch(request, env, ctx)` module — which no longer exists now that the build target is vinext's Node/standalone output (`dist/standalone/`). `npm test` is expected to fail until the test is rewritten against the standalone server. Don't treat its failure as a regression you introduced unless you touched something it actually covers.

## Architecture

- **Content lives in one file:** `app/data.ts` exports `destinations` and `schools` arrays (typed `Destination`/`School`). Adding a destination/school is purely a data edit — new pages are generated automatically via `generateStaticParams` in `app/destinos/[slug]/page.tsx` and `app/escuelas/[slug]/page.tsx`. No routing code needed for new content.
- **Shared UI** (`Header`, `Footer`, `ContactBand`, `DestinationCard`, etc.) lives in `app/components.tsx` — a single components module rather than a `components/` directory.
- **`next.config.ts`** sets `output: "standalone"`, which makes `vinext build` emit a self-hosting Node bundle at `dist/standalone/` (started via `node dist/standalone/server.js`, reading `PORT`/`HOST` — this is what `npm start` and Render's Start Command run). There is no custom worker entry point — vinext's own server handles routing directly on Node. One consequence: there's no Cloudflare Images-style on-the-fly optimization step on this target, so images under `public/` are served as-is (unoptimized).
- **`vite.config.ts`** is a minimal config: just the `vinext()` plugin, plus a `CODEX_SANDBOX=seatbelt` special-case (macOS Codex sandbox) that forces polling instead of FSEvents for HMR.
- **Database:** Postgres (Render Postgres in production). `db/schema.ts` defines a single `registrations` table (Drizzle/pg-core), accessed via `db/index.ts`'s `getDb()`, which lazily creates a `pg.Pool` from `process.env.DATABASE_URL` (cached on `globalThis` to survive dev hot-reload). After editing `db/schema.ts`, run `npm run db:generate` to produce a new migration under `./drizzle/`; apply it to the real database yourself (e.g. `psql "$DATABASE_URL" -f drizzle/000X_*.sql`, or `drizzle-kit migrate`) — nothing applies migrations automatically on deploy. **Local dev:** point `DATABASE_URL` (in a git-ignored `.env`, auto-loaded by `vinext dev`/`vinext build`) at Render Postgres's External Connection String; `node dist/standalone/server.js` does *not* auto-load `.env`, so run it as `node --env-file=.env dist/standalone/server.js` when testing the production artifact locally.
- **Camp registration feature:** `app/registro/page.tsx` is a public registration form (plain HTML `<form method="POST">`, no client JS — matches the rest of the site's zero-JS style) that posts to `app/api/registrations/route.ts`, which validates, checks the session's capacity, inserts a row, and redirects back with a `?success=1`/`?error=<code>` query param. Camp sessions (dates/price/capacity) live alongside each destination in `app/data.ts` as `Destination.sessions: CampSession[]` — add a session there to make a destination registrable; a destination with no `sessions` simply doesn't appear in the form. Capacity is enforced server-side (rejects once a session's registration count reaches its `capacity`) and reflected in the form's `<select>` (remaining-spots count, disabled once full).
- **Admin panel:** `/admin` (registrations list + per-session capacity counts) and `/admin/export` (CSV) are gated by `proxy.ts` (Next.js 16's middleware convention — note `matcher` needs both `"/admin"` and `"/admin/:path*"`, since `:path*` alone does not match the bare parent path in vinext). Auth is a single shared password compared against `process.env.ADMIN_SECRET`, with a SHA-256-hashed session cookie (`app/admin-auth.ts`) set by `app/api/admin/login/route.ts`. **Local dev** reads `ADMIN_SECRET` from `.env` (falls back to no access if unset). **Production** sets `ADMIN_SECRET` as a Render environment variable — `render.yaml` declares it with `sync: false`, so Render prompts for the real value once in the dashboard rather than storing it in git.
- **`app/chatgpt-auth.ts`** (optional "Sign in with ChatGPT" helpers) is unused and now vestigial — it depends on `oai-authenticated-user-*` request headers that were injected by a hosting dispatch layer this project no longer runs behind (that layer, along with `.openai/hosting.json` and the `sites()` build plugin, was removed as part of the Render migration). Safe to delete if it keeps causing confusion; left in place only because nothing currently references it.
- **Route handlers returning `Response`:** only files under `route.ts` may return a raw `Response`/redirect — a `page.tsx` default export must return JSX (returning `Response` from a page throws an RSC serialization error). This is why CSV export lives at `app/admin/export/route.ts` rather than as a `?format=csv` branch inside `app/admin/page.tsx`.
- **Styling:** global CSS in `app/globals.css`, Tailwind v4 via `@tailwindcss/postcss` (`postcss.config.mjs`). Fonts are Google Fonts (`Cormorant_Garamond`, `Montserrat`) loaded through `next/font/google` in `app/layout.tsx`.

## Editing content

All copy/data (phone numbers, prices, dates, availability) lives in `app/data.ts` and `app/components.tsx` — verify these before any deploy, per `DEPLOYMENT.md`. To add a destination: duplicate an object in `destinations`, set a unique `slug`, add an image under `public/`. To add a school: duplicate an object in `schools`. To open registration for a destination/dates, add a `CampSession` to its `sessions` array (`id`, `label`, `startDate`/`endDate`, `priceAmount`/`currency`/`priceNote`, `capacity`) — it then appears automatically in `/registro` and in the `/admin` capacity summary. No other files need to change for new content pages or sessions.
