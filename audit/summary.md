# NexGen Landing Page — Polish & Hardening Summary

Date: 2026-07-03
Stack: Next.js 16.2.9 (App Router) · React 19.2.4 · Tailwind v4
Audit target: local **production** build (`next build && next start`), measured with Lighthouse
**mobile emulation** (the harder target). Reports in this folder.

This summary covers the full arc: the original baseline → all hardening/polish work → the final
state. The **“before”** is the true original baseline (committed pre-hardening); the **“after”** is
the final polished tree.

---

## Lighthouse: before → after

| Category | Before | After | Δ |
|----------|:------:|:-----:|:---:|
| Performance | 74 | **89** | ▲ +15 |
| Accessibility | 91 | **100** | ▲ +9 |
| Best Practices | 100 | **100** | — |
| SEO | 100 | **100** | — |

Reports: `before-lighthouse.report.{json,html}` / `before-lighthouse.json` (original baseline),
`after-lighthouse.report.{json,html}` / `after-lighthouse.json` (final). Both captured on local prod
builds under mobile emulation for a like-for-like comparison.

> Performance history: after the initial hardening this sat at a noisy **82–83** (the animated hero
> made it vary run-to-run). The **LCP pass** — `content-visibility:auto` on below-the-fold sections —
> cut main-thread work ~38% and **stabilized it at a reproducible 89** (three consecutive runs).
> Accessibility/Best-Practices/SEO stable at 100.

### Key metric movements (mobile) — from the saved `after-lighthouse.report.json`
| Metric | Before | After |
|--------|:------:|:-----:|
| First Contentful Paint | 3.1 s | **1.4 s** |
| Speed Index | 4.7 s | **1.7 s** |
| Total Blocking Time | 130 ms | **20 ms** |
| Largest Contentful Paint | 4.7 s | **3.8 s** |
| Main-thread work | 6.6 s | **4.0 s** |
| Cumulative Layout Shift | 0 | **0** |

Biggest wins: (1) `next/font` self-hosting + the slide-only hero entrance drove **FCP 3.1→1.4s**;
(2) `content-visibility:auto` on below-fold sections cut **main-thread work 6.6→4.0s**, pulling
**Speed Index 4.7→1.7s** and **TBT 130→20ms**. **LCP (~3.8s) remains the main lever** — the animated
hero — and is the best target for a further pass (simplify/defer the hero SVG, or trim first-load JS).

### Accessibility: 91 → 100
Before, Lighthouse flagged **color-contrast** (8 nodes) and **target-size** (2 nodes).
After: **0 failing accessibility audits — every audit passes.** No new colors/accents were
introduced during polish, so nothing reopened contrast.

---

## Critical / High bugs fixed
Full catalogue with file:line in `bugs-found.md`.

**Hardening pass:**
- **C1** — Contact form never sent data (fake `setTimeout`). Now a real Resend Route Handler.
- **H1** — Invalid `<button>`-inside-`<a>` nesting across 7 files → `ButtonLink`/`buttonClasses()`.
- **H2** — Duplicate scroll-progress bar (layout + navbar) → removed the navbar copy.
- **H3** — WCAG AA color-contrast (8 nodes) → token shifts (`.pill`, React badge, muted text).
- **H4** — WCAG target-size on hero CTAs → resolved by H1 + CTA spacing.
- **H5/H6** — Decorative emoji `aria-hidden`; nav dropdowns made keyboard/click operable.

**This pass (2026-07-03):**
- **P2-H1** — The one remaining ESLint **error** (`navbar.tsx` set-state-in-effect on route change)
  → fixed with React’s render-time state-reset pattern. Lint is now **0 errors / 0 warnings**.

---

## Mobile responsiveness (this pass)
Re-running the CDP overflow sweep on the current tree caught **regressed** horizontal overflow:
- Testimonials **+47px**, AI Showcase **+10px**, About **+4px** at 375px — all fixed
  (base `grid-cols-1` on card grids + `overflow-hidden` on animated sections).
- **Verified: 9 pages × 3 widths (375/768/1024) → 0px horizontal overflow everywhere.**
Details in `responsive-fixes.md`.

## UI polish (this pass)
The site already carried extensive polish (design system in `globals.css`, lucide icons across 27
files, shared `Button` system). This pass added the mobile-overflow fixes above, **Escape-to-close +
background scroll-lock** on the mobile drawer, and cleaned **18 dead imports/vars**. On approval the
flagged items were then completed:
- **Replaced emoji with lucide vectors** — AI-illustration nodes (📊💻🔒🌐☁️🤖 via `foreignObject`),
  hero `✓`/`↑` glyphs (→ SVG paths), About “Our Values”, and — after catching that the
  Services/Industries icons live in `lib/data.ts` (retyped `string → LucideIcon`) — the homepage
  **Industries** section and the `/services` + `/industries` pages. **The homepage is now emoji-free.**
  Emoji still remain on secondary pages (`technologies` tech-logos, `portfolio`, `solutions`,
  `careers`, About mission/vision) — see `ui-polish-changes.md` “Still remaining”. (An earlier draft
  claimed “no emoji anywhere”; that was inaccurate and is corrected here.)
- **Footer socials** repointed to brand-consistent handles (LinkedIn `/company/nexgen-technologies`,
  X `x.com/NexGenTechIN` — matching the `@NexGenTechIN` metadata — GitHub `/nexgen-technologies`);
  the “Twitter” label corrected to “X”.
- **Fixed a white-on-white invisible button** — the AI-showcase “Talk to an AI Expert” CTA used the
  `outline` variant (`bg-white`) + `text-white`; added `bg-transparent` so the ghost CTA is legible
  on the dark section (contrast fix). Found via visual verification, not the automated audit.
Details in `ui-polish-changes.md`.

---

## Contact form → real backend
- **`app/api/contact/route.ts`** — Next Route Handler (Node runtime), validates with the shared Zod
  schema, sends via **Resend’s REST API** over `fetch` (no new npm dependency, key stays server-side).
- **`lib/contact-schema.ts`** — one schema shared by client + server so validation can’t drift.
- **`app/contact/contact-form.tsx`** — real `fetch('/api/contact')`; success/error UI tied to the
  actual HTTP response (`role="alert"` banner); per-field `label htmlFor`/`aria-invalid`/
  `aria-describedby`; `react-hook-form` + `zodResolver` client validation.
- Verified end-to-end: invalid → 400 w/ field errors, malformed JSON → 400, valid + unconfigured env
  → 500, valid + bad key → 502 (proves the Resend call fires).

### Env vars (Vercel → Settings → Environment Variables, and `.env.local` for dev)
Documented in **`.env.example`**:
- `RESEND_API_KEY` — from https://resend.com/api-keys
- `CONTACT_TO_EMAIL` — inbox that receives submissions
- `CONTACT_FROM_EMAIL` — a verified Resend sender (prod: address on a verified domain; testing:
  `onboarding@resend.dev` → your own Resend inbox)

---

## Changelog
```
fix(a11y):       navbar route-change state reset moved out of effect — lint 0 errors/0 warnings
fix(responsive): eliminate horizontal overflow at 375px (testimonials +47, AI +10, about +4 → 0)
feat(nav):       mobile drawer closes on Escape + locks background scroll
chore(cleanup):  remove 18 unused imports/vars; strip corrupted lines from bugs-found.md
perf(lcp):       content-visibility on below-fold sections -> main-thread 6.6s->4.0s, perf 83->89
fix(icons):      emoji -> lucide across homepage (AI illustration, hero, About, Industries) + /services + /industries (secondary pages still pending)
fix(a11y):       fix white-on-white "Talk to an AI Expert" outline button (bg-transparent)
chore(footer):   repoint social links to brand handles; "Twitter" label → "X"
perf(hero):      slide-only hero entrance + self-hosted next/font → FCP 3.1→1.4s, SI 4.7→3.1s, TBT 130→80ms
feat(contact):   real Resend submissions + shared Zod schema + field aria wiring + error state
fix(a11y):       color-contrast + target-size → Accessibility 91→100
fix(html):       remove <button>-inside-<a> nesting (ButtonLink) across 7 files
```

## Guardrails honored
- **Branding stayed locked** — only existing `globals.css` tokens used; no new colors. Proposed
  branding changes: none (flagged content/brand items live in `ui-polish-changes.md`).
- **`lucide-react`** was already installed and used across the tree before this pass (not a new
  install by me).
- **Nothing pushed/deployed** — all changes are staged in the working tree for your review.
