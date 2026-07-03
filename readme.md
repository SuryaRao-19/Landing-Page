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

The contact form (`/api/contact`) sends email via [Web3Forms](https://web3forms.com) (free tier —
no domain or credit card). Copy `.env.example` → `.env.local` and set:

| Variable               | Purpose                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `WEB3FORMS_ACCESS_KEY` | Free access key from https://web3forms.com — submissions go to the email tied to it |

Set the same var in **Vercel → Project → Settings → Environment Variables** for production, then
redeploy. Without it the form validates and rate-limits, then returns a clear "not configured"
error. The route keeps a honeypot + in-memory IP rate limit server-side; the key is never exposed
to the browser.

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
