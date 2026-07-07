# NexGen Technologies — Landing Page

Marketing site for NexGen Technologies (fictional enterprise IT company), built as a polished,
accessible, performance-tuned Next.js app.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · framer-motion ·
lucide-react · react-hook-form + zod · Web3Forms (contact email).

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm test             # node:test suite (overflow + axe a11y) — needs a running server
```

## Environment variables

The contact form (`/api/contact`) writes each submission to **one or both** of two sinks:
**Supabase** (stored in Postgres, viewable at `/admin/submissions`) and **Web3Forms** email. A
submission succeeds as long as it lands in *at least one* configured sink, so either can be used on
its own. Copy `.env.example` → `.env.local` and set the vars for whichever you use:

| Variable                    | Purpose                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `SUPABASE_URL`              | Supabase project URL — stores each submission in Postgres (primary sink)                    |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (server-side only, bypasses RLS — never expose it)               |
| `WEB3FORMS_ACCESS_KEY`      | _Optional._ Free key from https://web3forms.com — emails each submission (best-effort)     |
| `ADMIN_USER`                | _Optional._ Username for the `/admin/submissions` view (defaults to `admin`)               |
| `ADMIN_PASSWORD`            | _Optional._ Password for `/admin/submissions`. Unset ⇒ the admin view is fully locked      |

Set the same vars in **Vercel → Project → Settings → Environment Variables** for production, then
redeploy. With **neither** sink configured the form validates and rate-limits, then returns a clear
"not configured" error. The route keeps a honeypot + in-memory IP rate limit server-side; no keys
are ever exposed to the browser.

### Store submissions in Supabase (primary sink)

The contact route **persists each submission to a Postgres table** — searchable and exportable,
and browsable at [`/admin/submissions`](#admin-view). This is the primary sink: once a submission is
stored the request succeeds, and a failed/unconfigured Web3Forms email never blocks it (the email
is best-effort notification only).

To enable:

1. Create a free project at [supabase.com](https://supabase.com).
2. Run [`supabase/migrations/0001_contact_submissions.sql`](supabase/migrations/0001_contact_submissions.sql)
   in **Supabase → SQL Editor** to create the `contact_submissions` table (RLS on, no public access).
3. Copy `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings → API** into
   `.env.local` (and Vercel).

The service-role key is only read in [`lib/supabase-admin.ts`](lib/supabase-admin.ts), which is
guarded with `server-only` so it can never be bundled into the browser.

### Admin view

Stored submissions can be browsed at **`/admin/submissions`**, gated by HTTP Basic Auth. Set
`ADMIN_PASSWORD` (and optionally `ADMIN_USER`) to unlock it — with no password set, every `/admin`
request is denied. The gate lives in [`proxy.ts`](proxy.ts) (Next 16's renamed middleware, Node.js
runtime) and is re-checked inside the page itself as defense in depth. The view is `noindex` and
never cached.

## Project structure

```
app/            App Router routes, layouts, API route handler, OG image
components/     sections/ (landing sections) · layout/ (navbar, footer) · ui/ · shared/
lib/            data.ts (content), contact-schema.ts (shared zod schema), utils
tests/          node:test overflow + axe-core accessibility suite
audit/          Lighthouse reports + before/after summary, bug sweep, polish notes
```

## Testing & CI

- **`npm test`** runs against a running server (`npm run start` first, or set `BASE_URL`). It uses
  `puppeteer-core` + system Chrome (`CHROME_PATH`) + `node:test`, asserting **0 horizontal overflow**
  across 6 pages × {375, 768, 1024}px and **no serious/critical `axe-core` violations** on `/` and
  `/contact`.
- **GitHub Actions** (`.github/workflows/ci.yml`) runs lint → build → tests → **Lighthouse CI** on
  every push to `main` and PR, enforcing budgets: performance ≥ 0.80, accessibility /
  best-practices / SEO = 100.

## Deployment

Deploys to **Vercel** (App Router, zero config). Ensure `WEB3FORMS_ACCESS_KEY` is set for the contact
form to send.
