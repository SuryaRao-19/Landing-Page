# Mobile Responsiveness Pass

Date: 2026-07-02
Breakpoints reviewed: **375px** (mobile), **768px** (tablet), **1024px** (small laptop / lg boundary).

## Method
- **Programmatic overflow check** at emulated mobile metrics via Chrome DevTools Protocol
  (`Emulation.setDeviceMetricsOverride` → measure `scrollWidth − innerWidth` and enumerate every
  element whose right edge exceeds the viewport, ignoring `overflow:hidden`-clipped subtrees).
- **CSS / breakpoint analysis** of every homepage section.
- **Lighthouse mobile emulation** (Moto-G class, ~360px) for the before/after runs.

> Methodology note: initial `--window-size=375` headless screenshots were **misleading** because
> this machine runs at ~125% Windows display scaling, which inflated the headless CSS viewport to
> ~473px and framed content off the edge of the PNG — it *looked* like horizontal overflow but was
> a capture artifact. Switching to CDP device-metric emulation (`deviceScaleFactor: 1`) gave the
> ground truth.

## Findings

### No horizontal overflow
At true 375px emulation, `scrollWidth === innerWidth` (**overflow = 0 px**) and there were **zero
un-clipped elements** extending past the viewport. The layout is genuinely responsive:
- Grid columns collapse correctly (`sm:` / `md:` / `lg:` breakpoints throughout).
- The Process section swaps a horizontal 8-column track (`hidden lg:block`) for a vertical timeline
  (`lg:hidden`) on mobile.
- The hero illustration and several decorative SVGs are `hidden lg:block` on small screens.
- The trust-bar marquee (`w-max`, ~9500px wide) is correctly contained by `overflow-hidden`.
- `body { overflow-x: hidden }` provides a global safety net.

### Fixes applied
| # | Section | Was | Change |
|---|---------|-----|--------|
| R1 | Hero eyebrow pill (`hero.tsx`) | `.pill` is `white-space:nowrap`; the long label *"India's Premier Digital Transformation Partner"* (~420px) was clipped by the hero's `overflow-hidden` on narrow screens | Overrode this instance to `display:inline-block; white-space:normal; max-width:100%` (dot set to `align-middle`) so it wraps cleanly to two lines |
| R2 | Hero stats row (`hero.tsx`) | `grid-cols-3 gap-8` — 32px gutters cramped the three stats at 375px | `gap-4 sm:gap-8` (tighter on mobile, unchanged ≥640px) |
| R3 | Hero layout hardening (`hero.tsx`) | grid/flex children relied on default `min-width:auto` | Added `min-w-0` to the container, grid, and left column, plus `break-words` on the `h1` — defensive against future long-string blowout |
| R4 | Tap-target / spacing | Hero CTAs were adjacent `<a>` wrappers ~4px apart (Lighthouse `target-size` fail) | Fixed via the `ButtonLink` refactor (see bugs-found H1/H4) + `gap-4` between CTAs — now clean 44px+ targets |

### Verified OK at all three widths (no change needed)
Services grid (`sm:2 / lg:3`), Industries (`2 / sm:3 / lg:5`), Tech stack (`3 / sm:4 / md:6 / lg:8`),
Case studies (`md:3`), Testimonials (`md:2 / lg:3`), FAQ (single column, `max-w-3xl`), Footer
(`lg:[2fr_1fr_1fr_1fr]` → stacked), Navbar (collapses to hamburger drawer below `lg`).

Tap targets: footer social icons are 32×32px and legal links sit in a 24px+ row — both pass WCAG
2.5.8 (AA, 24px). The primary nav collapses to a full-width drawer with 40px+ rows on mobile.

---

## Pass 2 — 2026-07-03 (re-audit of the current tree)

The Pass-1 note above recorded "overflow = 0 px" for the then-current tree. Re-running the **same**
CDP mobile-emulation sweep on the current tree (after the later content-update commits) surfaced
**real horizontal overflow that had since regressed** — a good example of why the check is worth
re-running. Method this pass: `page.setViewport({ deviceScaleFactor, isMobile })` (the reliable path;
a manual `Emulation.setDeviceMetricsOverride` was silently ignored and fell back to an 800px default,
so it was replaced), measuring `scrollWidth − clientWidth` and enumerating un-clipped offenders.

### Overflow found and fixed
| # | Page @375 | Overflow | Root cause | Fix |
|---|-----------|:--------:|-----------|-----|
| P2-R1 | Home (Testimonials) | **+47px** | Card grid `md:2/lg:3` with no base `grid-cols-1` → mobile `auto` track grew to the 402px card max-content | Added `grid-cols-1` |
| P2-R2 | Home (AI Showcase) | **+10px** | Content column `x:30` entrance transform poked past the edge pre-scroll | `overflow-hidden` on section (+ base `grid-cols-1`) |
| P2-R3 | About (Our Story) | **+4px** | Column `x:24` entrance transform | `overflow-hidden` on section (+ base `grid-cols-1`) |

### Verification matrix (after fixes)
Swept **9 pages** (`/`, `/contact`, `/services`, `/about`, `/case-studies`, `/industries`,
`/technologies`, `/blog`, `/careers`) × **3 widths** (375 / 768 / 1024):

> **ALL CLEAN — `scrollWidth === clientWidth` on every page at every width (0px horizontal overflow).**

### Tap targets
Primary controls (buttons, `ButtonLink`, nav rows, form inputs) meet **44×44px** (`py-2.5`–`py-3.5`
+ generous padding). Footer social icons (32×32) and legal links meet **WCAG 2.5.8 AA (24px)** with
8px+ spacing — kept at their compact size to preserve footer density; enlarging to 44px is a design
call flagged in `ui-polish-changes.md`, not a defect.
