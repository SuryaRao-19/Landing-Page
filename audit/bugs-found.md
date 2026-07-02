# NexGen Landing Page — Bug Sweep

Date: 2026-07-02
Scope: homepage (`app/page.tsx`) + shared layout (navbar, footer, UI primitives), with spot-checks across sub-pages.
Method: full read of components/pages/config + Lighthouse (mobile emulation) accessibility audit.

Legend for action taken:
- **[FIXED]** — resolved in this pass (Critical/High only).
- **[DEFERRED]** — left in place per the "fix Critical/High only" instruction; one-line reason given.

---

## CRITICAL

### C1 — Contact form never sends data (fake submit) — [FIXED in Step 5]
`app/contact/contact-form.tsx:121-125` — `onSubmit` does `await new Promise(r => setTimeout(r, 1400))`, `console.log`s the data, then flips `submitted` to `true`. No network request; every submission is silently dropped. The primary conversion path on the site is non-functional. Addressed by Step 5 (Resend route handler).

---

## HIGH

### H1 — Invalid interactive nesting: `<button>` inside `<a>` — [FIXED]
`<Link>` renders an `<a>`, and these wrap a native `<button>`, producing `<a><button>…</button></a>` — invalid HTML (interactive content inside interactive content), which triggers React `validateDOMNesting` warnings and contributes to the Lighthouse **target-size** failure.
Occurrences:
- `components/sections/hero.tsx:284-293` (2)
- `components/sections/cta-section.tsx:64-75` (2)
- `components/sections/ai-showcase.tsx:128-137` (2)
- `components/layout/navbar.tsx:279-300` (desktop CTAs, 2) and `:409-418` (mobile CTAs, 2)
- `app/services/[slug]/page.tsx:73-85` (2)
- `app/case-studies/[slug]/page.tsx:116-118` (1)
- `app/not-found.tsx:66-73` (2)
Fix: added `ButtonLink` (renders a styled `<Link>`) and exported `buttonClasses()` from `components/ui/button.tsx`; converted the wrappers to a single anchor element.

### H2 — Two scroll-progress bars render at once — [FIXED]
`app/layout.tsx:71` renders `<ScrollProgress/>` (from `components/shared/scroll-progress.tsx`), and `components/layout/navbar.tsx:190` renders a second, internally-defined `ScrollProgress` (`navbar.tsx:151-166`). Both target the same fixed `.scroll-line` at `top:0`, so two bars stack and two scroll listeners run. Fix: removed the duplicate definition + usage from the navbar; kept the shared component.

### H3 — WCAG AA color-contrast failures (8 nodes) — [FIXED]
From the Lighthouse accessibility audit (`color-contrast`, score 0):
- `.pill` badge text `#2563EB` on `#E9EFFB` = **4.48:1** (needs 4.5) — `app/globals.css:248`; appears in industries/technologies/testimonials/hero eyebrows.
- Trust-bar label `#94A3B8` on white = **2.56:1** — `components/sections/trust-bar.tsx:59`.
- Trust-bar marquee logos `#CBD5E1` on white = **1.48:1** — `trust-bar.tsx:83`.
- Tech "React" badge `#0891B2` on `#ECFEFF` = **3.53:1** — `components/sections/tech-stack.tsx:17`.
- Tech tagline `#94A3B8` on `#F8FAFC` = **2.45:1** — `tech-stack.tsx:128`.
Fix: `.pill` → `#1D4ED8`; React badge cyan → `#0E7490`; muted body/caption text `#94A3B8` → `#64748B` (slate-500, still "muted" but AA-compliant) on flagged + sibling instances; marquee logos darkened.

### H4 — WCAG target-size failures on hero CTAs — [FIXED]
`target-size` (score 0): the two hero CTA anchors (`/contact`, `/services`) were effectively ~4px tall and adjacent. Root cause is H1 (inline `<a>` wrapping a button). Fixed by the H1 refactor (anchor is now the sized target) plus adequate `gap` between CTAs.

### H5 — Emoji icons rendered without `aria-hidden`/label — [FIXED]
Functional/decorative emoji output directly to the DOM with no accessible handling; screen readers announce raw emoji names.
- `components/sections/industries-section.tsx:79` — `{industry.icon}` (🏦🏥🏭…), title text already adjacent → mark decorative.
- `components/sections/services-grid.tsx:108` — `✦` fallback.
- `components/layout/navbar.tsx:135` — `✦` fallback (wrapper already `aria-hidden`, OK).
Fix: wrapped emoji containers in `aria-hidden`.

### H6 — Primary-nav dropdowns are hover-only (keyboard-inaccessible) — [FIXED]
`components/navbar.tsx:219-241` — the dropdown trigger `<button aria-haspopup aria-expanded>` opens submenus only via `onMouseEnter`; it has no `onClick`, so keyboard and touch users cannot open Services/Company/etc. submenus. Fix: added `onClick` toggle so the button opens/closes on click and Enter/Space.

---

## MEDIUM — [DEFERRED]

### M1 — Broken OG image reference
`app/layout.tsx:23` sets `openGraph.images` to `/og-image.png`, but `public/` has no such file (only default Next `*.svg` boilerplate). Social/link previews will 404.
Reason: needs a real brand image asset or an OG-image generator (recommend `app/opengraph-image.tsx` via `ImageResponse`); out of scope for a one-line fix and no source asset provided.

### M2 — Mobile drawer missing Escape/scroll-lock/focus-trap
`components/navbar.tsx:319-423` — the drawer opens but background scroll isn't locked, `Escape` doesn't close it, and focus isn't trapped/restored.
Reason: moderate a11y enhancement larger than a hardening one-liner; the drawer is still operable (overlay + X close).

### M3 — Array-index React keys
`faq-section.tsx:27`, `trust-bar.tsx:81/93`, testimonials/why-us avatar rows, process steps use `key={i}`.
Reason: lists are static and never reordered, so no correctness impact; cosmetic.

### M4 — Duplicate tech short-codes
`tech-stack.tsx:41-48` — both TensorFlow and Terraform map to `"TF"`.
Reason: purely a label collision in a decorative badge; no functional impact.

### M5 — Inline-style padding workaround
Multiple sections use `style={{ padding: … }}` with a comment "padding on `<a>` is ignored in this render env" (`services-grid.tsx:101`).
Reason: works correctly as-is; refactoring to utility classes is cleanup, not a defect.

---

## LOW — [DEFERRED]

### L1 — Unused Next.js boilerplate assets
`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are unreferenced.
Reason: dead assets, no runtime impact.

### L2 — Fragile metric-extraction regex
`case-studies-preview.tsx:15-19` `extractMetric` can mis-parse unusual `results[0]` strings.
Reason: current data parses fine; defensive-only.

### L3 — Trust-bar client names/logos are placeholders
`trust-bar.tsx:6-11` lists real company names with generic grey-dot "logos".
Reason: content/branding decision — out of scope per guardrails (contrast of the text is fixed under H3).
</content>
</invoke>
