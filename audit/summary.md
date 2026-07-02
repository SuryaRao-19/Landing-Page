# NexGen Landing Page — Hardening Summary

Date: 2026-07-02
Stack: Next.js 16.2.9 (App Router, Turbopack) · React 19.2.4 · Tailwind v4
Audit target: local **production** build (`next build && next start`) of the current working tree,
measured with Lighthouse **mobile emulation** (the harder target). Reports saved in this folder.

---

## Lighthouse: before → after

| Category | Before | After | Δ |
|----------|:------:|:-----:|:---:|
| Performance | 74 | **83** | ▲ +9 |
| Accessibility | 91 | **100** | ▲ +9 |
| Best Practices | 100 | **100** | — |
| SEO | 100 | **100** | — |

Reports: `before-lighthouse.report.{json,html}`, `after-lighthouse.report.{json,html}`.

> Note on Performance variance: a mid-run measurement briefly showed 69 because ~8 leftover
> `next start` preview servers were competing for CPU during that pass. Re-run on a single clean
> server, Performance was a stable **82–84** (median 83). Both before and after were captured on
> local prod builds for a like-for-like comparison.

### Key metric movements (mobile)
| Metric | Before | After |
|--------|:------:|:-----:|
| First Contentful Paint | 3.1 s | **1.4 s** |
| Speed Index | 4.7 s | **1.7 s** |
| Total Blocking Time | 130 ms | **70 ms** |
| Largest Contentful Paint | 4.7 s | 4.4 s |
| Cumulative Layout Shift | 0 | 0 |

The big FCP/Speed-Index win came from migrating the render-blocking Google Fonts `<link>` to
`next/font` (self-hosted, no external request, zero layout shift). LCP (~4.4s) is the main remaining
performance lever — largely the animated hero — and is a good candidate for a future pass.

### Accessibility: before → after
Before, Lighthouse flagged two failing audits:
- **color-contrast** — 8 nodes (score 0)
- **target-size** — 2 nodes (score 0)

After: **0 failing accessibility audits — every audit passes (score 100).**

---

## Critical / High bugs fixed
Full catalogue with file:line in `bugs-found.md`. Fixed (Critical + High only, per scope):

- **C1 — Contact form never sent data.** It resolved a fake `setTimeout` and `console.log`ged the
  payload. Now wired to a real backend (see below).
- **H1 — Invalid `<a><button>` nesting** across hero, CTA, AI showcase, navbar (desktop + mobile),
  services/[slug], case-studies/[slug], and 404. Introduced `ButtonLink` + `buttonClasses()` in
  `components/ui/button.tsx`; all now render a single valid anchor. Removes React
  `validateDOMNesting` warnings and the root cause of the `target-size` failure.
- **H2 — Duplicate scroll-progress bar.** Both `layout.tsx` and `navbar.tsx` rendered a
  `.scroll-line` fixed bar. Removed the navbar's duplicate (and its extra scroll listener).
- **H3 — WCAG AA color-contrast (8 nodes).** `.pill` `#2563EB`→`#1D4ED8`; React tech badge
  `#0891B2`→`#0E7490`; muted body/caption text `#94A3B8`→`#64748B` (slate-500 — still "muted",
  now ≥4.5:1); trust-bar marquee logos darkened.
- **H4 — WCAG target-size on hero CTAs.** Resolved by H1 + a `gap-4` between CTAs.
- **H5 — Emoji icons without accessible handling.** `aria-hidden` added to the industries emoji
  tiles and the `✦` fallbacks (screen readers no longer announce raw emoji).
- **H6 — Keyboard-inaccessible nav dropdowns.** The Services/Company/etc. triggers opened on hover
  only; added an `onClick` toggle so they work via keyboard and touch.

### Deferred (Medium/Low — listed, not fixed, per scope)
Reasons in `bugs-found.md`: broken `/og-image.png` reference (needs a brand asset / OG generator),
mobile drawer Escape/scroll-lock/focus-trap, array-index keys, duplicate `"TF"` tech code,
inline-style padding workaround, unused Next boilerplate SVGs, placeholder trust-bar client names.
There is also one **pre-existing** ESLint error (`navbar.tsx` set-state-in-effect on route change)
that predates this pass and does not block the build.

---

## Contact form → real backend
- **`app/api/contact/route.ts`** — a Next.js Route Handler (Node runtime) that validates with the
  shared Zod schema and sends via **Resend's REST API** over `fetch` (no new npm dependency; the
  API key stays server-side).
- **`lib/contact-schema.ts`** — one schema imported by both the client form and the server so
  validation can't drift.
- **`app/contact/contact-form.tsx`** — replaced the fake timeout with a real `fetch('/api/contact')`;
  success/error UI is now tied to the actual HTTP response (added a `role="alert"` error banner).
  Client-side required-field + email validation via `react-hook-form` + `zodResolver` is retained.
- Verified end-to-end against a live server: invalid payload → **400** with field errors,
  malformed JSON → **400**, valid + unconfigured env → **500** (clear message), valid + bad Resend
  key → **502** (proves the Resend call actually fires).

### Env vars to set (Vercel → Settings → Environment Variables, and `.env.local` for dev)
Documented in **`.env.example`** (now committable — added `!.env.example` to `.gitignore`):
- `RESEND_API_KEY` — from https://resend.com/api-keys
- `CONTACT_TO_EMAIL` — inbox that receives submissions
- `CONTACT_FROM_EMAIL` — a verified Resend sender (for production, an address on a domain verified
  at https://resend.com/domains; for quick testing, `onboarding@resend.dev` → your own Resend inbox)

---

## Performance extra
- Migrated Inter from a render-blocking `<link>` to `next/font/google` (self-hosted, `display:swap`,
  exposed as the `--font-inter` CSS variable consumed by `--font-sans`). Removes the external
  font request and the `no-page-custom-font` lint warning.

---

## Changelog
```
feat(contact):   real submissions via Resend Route Handler + shared Zod schema + error state
fix(a11y):       fix all color-contrast & target-size failures → Accessibility 91→100
fix(html):       remove invalid <button>-inside-<a> nesting (ButtonLink) across 7 files
fix(nav):        make dropdown menus keyboard/click operable; drop duplicate scroll bar
fix(a11y):       aria-hidden on decorative emoji icons
perf(fonts):     migrate Google Fonts <link> → next/font (FCP 3.1s→1.4s, SI 4.7s→1.7s)
fix(responsive): wrap long hero eyebrow pill; tighten hero stat gutters on mobile
chore(env):      add .env.example + gitignore exception; document RESEND_* vars
```

## Not done (by guardrail)
- No design/branding changes beyond accessibility-required contrast shifts.
- No new npm dependencies installed.
- Nothing pushed/deployed — changes are staged in the working tree for review.
