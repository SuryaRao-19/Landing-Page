# NexGen Landing Page — UI Polish Changes

Date: 2026-07-03
Scope of this pass: **audit gaps, then finish** — the site already carried heavy prior polish
(a full design system in `app/globals.css`, `lucide-react` icons across 27 files, a shared
`Button`/`ButtonLink` system, a real Resend contact backend, Accessibility already at 100). This
document records the **visual/UX changes made in this pass** plus **branding items flagged for a
decision** (per the guardrail: flag, don't silently change, the locked branding doc).

Branding remained locked throughout: every color/shadow/radius/type token used already exists in
`globals.css`. **No new colors or accents were introduced**, so no new contrast risk (confirmed by
Accessibility = 100 after).

---

## Visual / UX changes made this pass

| # | Section / file | Change | Reason |
|---|----------------|--------|--------|
| P1 | Testimonials (`testimonials-section.tsx`) | Added base `grid-cols-1` to the card grid | Cards were 402px wide on a 375px phone and pushed the whole page 47px wide (horizontal scroll). A grid with only `md:`/`lg:` columns leaves an `auto`-sized mobile track that grows to the card's content width; `grid-cols-1` (`minmax(0,1fr)`) makes cards shrink to fit. Visually: cards no longer clip or cause sideways scroll on mobile. |
| P2 | AI Showcase (`ai-showcase.tsx`) | Added `overflow-hidden` to the section + base `grid-cols-1` | The content column animates in from `x:30`; before it scrolled into view that translate poked ~10px past the viewport edge, creating horizontal scroll on mobile. Clipping the section contains the entrance without changing the animation. |
| P3 | About “Our Story” (`about/page.tsx`) | Added `overflow-hidden` to the section + base `grid-cols-1` | Same class of issue — the stats/certifications column enters from `x:24` and poked ~4px past the edge on mobile. |
| P4 | Mobile nav drawer (`navbar.tsx`) | Drawer now closes on **Escape** and **locks background scroll** while open | Micro-interaction / a11y polish: the open drawer previously let the page scroll behind it and could not be dismissed from the keyboard. |
| P5 | AI illustration (`ai-showcase.tsx`) | Satellite-node emoji (📊💻🔒🌐☁️🤖) → lucide vectors (BarChart3/Code2/Lock/Globe/Cloud/Bot) rendered via `foreignObject` so they scale with the SVG viewBox | Emoji rendered inconsistently across OSes inside an otherwise-vector illustration; monochrome lucide glyphs match the brand and look premium everywhere. |
| P6 | Hero graphic (`hero.tsx`) | `✓` and `↑` SVG-text glyphs → drawn `<path>` checkmark / up-arrow | Removes the last text-glyph dependency in the hero mock; pixel-consistent across platforms. |
| P7 | About “Our Values” (`about/page.tsx`) | Emoji card icons (🎯⚙️🔍💡🤝🌱) → lucide (Target/Code2/Eye/Lightbulb/Handshake/Leaf) in branded `#2563EB` tiles with a hover fill | Brings the last functional emoji icons in line with the site-wide lucide treatment. |
| P8 | AI Showcase CTA (`ai-showcase.tsx`) | “Talk to an AI Expert” button was `outline` variant (`bg-white`) + `text-white` = **white-on-white, invisible label**; added `bg-transparent` | Correctness + contrast: the secondary CTA on the dark section is now a legible ghost button. Caught via visual verification. |

### Changes already in the working tree from the prior session (kept, not reverted)
These were staged before this pass and are genuine polish/hardening — verified and retained:
- **Contact form** (`contact-form.tsx`, `contact/page.tsx`): proper `<label htmlFor>` + `id`
  associations, `aria-invalid`/`aria-describedby` wiring on every field, and muted-text contrast
  bumped `#94A3B8 → #64748B`; privacy link given a visible underline.
- **Hero** (`hero.tsx`): entrance retuned to a slide-only (no opacity fade) so the `<h1>` paints on
  first render and counts as LCP immediately — a performance/polish win (LCP 4.7s → 3.8s).

---

## Section-by-section polish review (findings)

Walked hero → services grid → industries → AI showcase → why-us → tech stack → case studies →
process → testimonials → FAQ → footer. The design system is already consistent, so most sections
needed **no change**:

- **Spacing/rhythm:** all sections use the shared `.section` / `.container` clamps; card padding,
  `gap`, and section padding are consistent. No ad-hoc spacing found on the landing page.
- **Typography hierarchy:** headings all use the `display-*` scale + `.eyebrow`/`.pill`; no default
  browser styling leaking through.
- **Cards/buttons:** one `.card` primitive (shared shadow/border/radius) and one `Button`/
  `ButtonLink` system (6 variants, 5 sizes) with consistent hover (`-translate-y`), `active:scale`,
  and `focus-visible` ring across the whole site.
- **Icons:** functional icons on the landing page are all `lucide-react`, sized/colored to brand.
- **FAQ:** already a correct single-open accordion — every question renders its own answer (the
  “only the first answer shows” bug does not exist in the current code).
- **Micro-interactions:** tasteful hover/transition states already present site-wide; drawer
  Escape/scroll-lock added (P4).

---

## Previously-flagged items — now COMPLETED (you approved “a”)

1. **All emoji replaced with lucide vectors.** AI-illustration nodes (P5), hero `✓`/`↑` (P6), and the
   About “Our Values” cards (P7). **No color emoji remain anywhere on the site.** Verified visually at
   1280px: the AI illustration shows clean monochrome node icons, and the values cards use branded
   icon tiles.
2. **Footer social links repointed** to brand-consistent handles: LinkedIn
   `https://www.linkedin.com/company/nexgen-technologies`, X `https://x.com/NexGenTechIN` (matches the
   `@NexGenTechIN` metadata), GitHub `https://github.com/nexgen-technologies`; the “Twitter” label is
   now “X”. Kept the LinkedIn/X/GitHub set (all plausible for a B2B tech firm) rather than adding
   Instagram/Facebook, which would only introduce more not-yet-real handles. **Note:** these handles
   are brand-intentional placeholders — swap in the real account URLs once the profiles are created.

## Remaining note
The `outline` button variant carries `bg-white` in its base, so any future use on a dark background
needs `bg-transparent` in `className` (as now done in the AI showcase, P8). Consider adding a
dedicated `ghost-on-dark` variant if this pattern recurs.

## Branding-doc change proposals
None. The locked design system in `globals.css` is internally coherent and was sufficient for every
change above; no branding rule needed to bend to complete the polish.
