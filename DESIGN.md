---
name: MrWinRock
description: An asymmetric dark obsidian bento monograph with a floating pill navigation dock and cyan-to-magenta spectrum accents.
colors:
  background: "#121212"
  ink: "#F4F4F4"
  muted: "#B9B9B9"
  surface: "#1B1B1B"
  surface-elevated: "#252525"
  field: "#0E0E0E"
  border: "#373737"
  border-strong: "#777777"
  brand-ink: "#A6EEEB"
  brand-cyan: "#33FFFF"
  brand-magenta: "#CB4EFF"
  primary-hover: "#D9FAF7"
  status-error: "#F4A4BB"
  status-success: "#A1E2BC"
typography:
  display:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "clamp(2.3rem, 4.3vw, 3.9rem)"
    fontWeight: 650
    lineHeight: 1.07
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "clamp(1.65rem, 3vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.035em"
  title:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "1.48rem"
    fontWeight: 590
    lineHeight: 1.2
  body:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
  label:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: ".875rem"
    fontWeight: 600
    lineHeight: 1.4
  support:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: ".875rem"
    lineHeight: 1.75
rounded:
  chip: "8px"
  control: "10px"
  card: "16px"
  panel: "22px"
  bento: "24px"
  pill: "999px"
spacing:
  control-gap: "8px"
  compact: "12px"
  base: "16px"
  bento-gap: "18px"
  panel: "32px"
  desktop-gutter: "48px"
  mobile-gutter: "24px"
  section: "80px"
  section-mobile: "52px"
  header-height: "84px"
  header-height-mobile: "76px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.background}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  navigation-dock:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "6px 8px 6px 10px"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "30px"
  technology-tag:
    backgroundColor: "{colors.field}"
    textColor: "{colors.muted}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  skill-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "12px"
    padding: "10px 14px"
  direct-contact:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "14px"
    padding: "16px 18px"
---

# Design System: MrWinRock

## Overview

**Creative North Star: "Asymmetric Bento Monograph & Floating Dock"**

MrWinRock pairs a detached floating obsidian pill navigation dock with an asymmetric bento-grid portfolio layout. Rather than stacking identical full-width sections beneath a rigid top bar, Home opens with an 8/4 hero split (statement plate beside a skull identity stage with an integrated 2x2 quick-links footer), transitions into an asymmetric featured work grid (`01` full-width lead plate over `02` and `03` side-by-side), and pairs `What I build` beside `Technologies I Work With` inside one balanced hairline-divided band.

Interior routes drop the boxed banner in favor of open monumental editorial headers directly on the `#121212` obsidian canvas, carrying the same bento language across the portfolio—full-width asymmetric bento plus horizontal Project Matcher band on Projects, top pill category bar plus 2-column hairline-divided bento matrices on Skills, left sticky dossier on About, viewport-centered alternating timeline on Experience, and asymmetric inquiry form plus direct-channel cards on Contact.

**Key Characteristics:**

- Floating centered pill navigation dock on desktop (`999px` radius) and floating rounded dock bar on mobile.
- Asymmetric Home bento: 8/4 hero split, lead-plus-pair featured projects, and side-by-side capability ledger and stack matrix.
- Open unboxed editorial interior headers with a `64px` cyan-to-magenta hairline notch directly on `#121212`.
- Exact preserved charcoal, chalk-ink, mint-cyan, and electric cyan-to-magenta palette with zero nested cards and full reduced-motion support.

## Colors

The palette anchors neutral charcoal bento surfaces with crisp white ink, soft mint-cyan interactive accents, and a rationed electric cyan-to-magenta spectrum.

### Primary

- **Mint Cyan** (`brand-ink`): role titles, project indices, category counts, interactive arrows, hover text, and company metadata.
- **Electric Cyan** (`brand-cyan`): keyboard focus outlines, caret color, current timeline nodes, and the leading edge of the spectrum gradient.
- **Electric Magenta** (`brand-magenta`): trailing edge of the spectrum gradient (`linear-gradient(90deg, #33FFFF, #CB4EFF)`) and the cool-warm stage wash tint.
- **Ice Mint** (`primary-hover`): hover and focus fill for primary chalk-white action buttons.

### Neutral

- **Obsidian Ground** (`background`): continuous page canvas beneath the floating dock and open interior headers.
- **Chalk Ink** (`ink`): display headings, titles, and primary action button fills.
- **Silver Gray** (`muted`): body copy, descriptions, placeholders, and resting navigation labels.
- **Charcoal Plate** (`surface`): floating dock, hero plates, project cards, bento ledgers, standalone skill/contact tiles, and footer band.
- **Graphite Lift** (`surface-elevated`): hover states, secondary buttons, active pill links, and icon wells.
- **Recessed Ink** (`field`): form inputs, technology chips, project screenshot frames, and index badges.
- **Hairline Rule** (`border`) and **Strong Rule** (`border-strong`): bento dividers, card boundaries, and interactive borders.
- **Rose Error** (`status-error`) and **Mint Success** (`status-success`): form validation, unavailable alerts, and accepted contact feedback.

### Named Rules

**The Spectrum Ration Rule.** Reserve the cyan-to-magenta gradient strictly for thin accent rims (2px), full-perimeter card hover/focus borders (1.5px mask ring), the active dock indicator, timeline spines, and the circular skull ring; keep all reading and display text a solid color.

**The Single-Boundary Rule.** Never nest bordered cards inside bordered cards; use hairline-divided internal matrices (`1px` gap grids) inside unified bento frames, recessed `#0E0E0E` wells for inputs and screenshots, and standalone tiles directly on `#121212`.

## Typography

**Display Font:** self-hosted Sora, followed by Noto Sans Thai and sans-serif.

**Body Font:** self-hosted Noto Sans Thai, followed by sans-serif.

**Character:** tight geometric Sora display headlines contrast with open, legible Noto Sans Thai body copy across both languages.

### Hierarchy

- **Display:** Hero full-name treatment (`clamp(2.3rem, 4.3vw, 3.9rem)`), weight (650) given name and (475) surname, line height (1.07), tracking (`-.04em` floor). Thai switches to line height (1.24) and tracking (`-.018em`).
- **Headline:** Open interior route titles use `clamp(2.35rem, 4.8vw, 4.1rem)`, weight (630), tracking (`-.038em`); Home section headings use `clamp(1.65rem, 3vw, 2.3rem)`, weight (600), tracking (`-.035em`). Thai `h2` headings relax to line height (1.28) and tracking (`-.012em`).
- **Title:** Lead featured project titles scale to `clamp(1.7rem, 2.6vw, 2.15rem)`, paired showcase cards use (1.48rem), and archive cards use (1.28rem).
- **Body:** Root (16px) with (1.75–1.9) line height and (56–68ch) measures across biography, summaries, and case studies.
- **Label:** Controls, dock links, and form labels use (.825–.875rem) in ordinary sentence case with tabular numerals (`font-variant-numeric: tabular-nums`) on project indices, counts, and timeline dates.

### Named Rules

**The Two-Script Tracking Rule.** Keep Latin display tracking at or above (`-.04em`) and relax tracking (`-.018em` / `-.012em`) and line height (`1.24` / `1.28`) for `:lang(th)` headings so Thai upper vowels and tone marks stay clear.

## Layout

Outer main containers cap at (1248px) with fluid side gutters (`clamp(20px, 4vw, 48px)`). The desktop navigation floats `14px` from the top edge centered as a compact pill dock (`fit-content`, `min-height: 56px`); main content offsets by `--header-height` (`84px` desktop, `76px` mobile) and finishes with (108px) desktop and (68px) mobile bottom padding. Major Home bands separate by (80px) desktop and (52px) mobile.

Home uses a multi-column bento architecture: a 12-column opening row (`span 8` statement plate + `span 4` skull identity stage with integrated 2x2 social dock), a 2-column Selected Work bento (`01` spanning full width above `02` and `03` side-by-side, with `:nth-child(2):last-child` spanning full width to prevent orphans), a side-by-side lower bento pairing `What I build` (`1.2fr`) beside `Technologies I Work With` (`1fr`, collapsing cleanly to 1 column when skills are disabled), and a full-width closing Contact banner.

Interior routes open with an unboxed editorial `PageIntro` directly on `#121212` (top-aligned whenever header actions are present). Projects flows full-width in the same bento cadence as Home: asymmetric lead-plus-pair Selected Projects above a full-width horizontal two-column Project Matcher bento plate (`.78fr / 1.22fr`), followed by a three-column archive grid and three-column link-only Company Work strip. Skills pairs a sticky floating pill category tab bar (with a spring-gliding active pill indicator and scroll-spy synchronization; horizontally scrollable single-row pill rail on mobile) above a single-column stack of unified category plates, each carrying a uniform hairline-divided three-column skill matrix on desktop (two columns on tablet/mobile, one column at `<=359px`) where every skill tile keeps identical column width and (60px) base row height. About pairs a left sticky skull identity dossier (`.42fr`) beside a right unified hairline-divided reading ledger (`1fr`). Experience alternates milestone cards symmetrically around the (50%) horizontal axis (`>=1024px`, 96px gap, equal 512px cards at 1440px). Project Detail keeps a sticky left overview rail beside framed spec blocks.

At (1023px) the floating dock spans mobile width (`16px` radius), the Home bento collapses to single-column plates with a horizontal skull strip, Projects stacks the matcher to one column and archive to two columns, Skills stacks category plates to one column with two-column internal matrices, About keeps the profile above reading sections, and Experience switches to a single-column left-aligned timeline. At (767px) gutters become (24px), mobile hero buttons stay side-by-side at (390px), and Projects archive stacks to one column; at (359px) gutters become (16px) and internal skill matrices become one column down to (280px).

## Elevation & Depth

Depth combines tonal plate stepping (`#121212` canvas -> `#1B1B1B` plates -> `#252525` hover lifts, with `#0E0E0E` recessed wells) and two soft offset ambient drop shadows: `--dock-shadow` (`0 18px 42px -16px rgba(0, 0, 0, .82)`) grounding the floating pill dock and mobile drawer, and `--plate-shadow` (`0 20px 44px -26px rgba(0, 0, 0, .72)`) beneath primary bento plates. Zero-offset neon glow halos are avoided.

## Shapes

The floating desktop navigation dock, route pills, section jump buttons, back links, and count tags use full pill radii (`999px`). Major bento plates use (24px) on Hero/Contact Banner and (22px) on project/ledger panels; compact cards and mobile dock use (16px); controls and inputs use (10px); technology chips and index badges use (8px) and (6px). The MrWinRock skull remains circular inside a (2px) cyan-to-magenta gradient ring.

## Components

### Buttons

Primary actions use chalk-white fill with obsidian ink, (46–50px) minimum height, (10px) radius, shifting to ice-mint on hover/focus. Secondary actions use graphite-lift fill with a strong border, shifting to mint-cyan border and ink on hover. Interactive controls depress (2px) on active press; disabled or non-interactive span/div states never light up on hover or depress on click.

### Chips

Technology tags are recessed (`#0E0E0E`) chips with a hairline border, (34px) minimum height, and (8px) radius. Interactive links illuminate to mint-cyan on graphite lift when Projects is enabled; non-linked chips remain informational.

### Cards / Containers

Lead and paired featured project plates feature inline tabular index badges (`01`, `02`, `03`), a full-perimeter (1.5px) diagonal cyan-to-magenta border ring revealed smoothly around all four edges on hover and focus-within (with no top-only hover stripe), hairline-separated bottom action bars, and recessed `#0E0E0E` screenshot frames. The same full-perimeter spectrum border reveal unifies Skills category plates, Company Work cards, direct contact destinations, and the focused Project Matcher panel. Home's `What I build` ledger, `Technologies I Work With` matrix, and Skills category plates all use unified outer frames with `1px` hairline internal dividers and odd-tail orphan guards (zero nested cards).

### Inputs / Fields

Text inputs and textareas sit recessed in `#0E0E0E` with hairline borders, (48px) minimum height, high-contrast muted placeholders, cyan carets, and a (2px) cyan focus ring offset by (2px). Invalid fields switch borders to rose error.

### Navigation

Desktop navigation floats centered (`14px` from top) in a single charcoal pill dock holding the circular skull mark, vertical hairline divider, pill route links (graphite active fill + 2px cyan-to-magenta bottom accent), and circular language switcher. Mobile uses a floating rounded bar with a `grid-template-rows` animated drawer, `inert` focus protection, and Escape-to-close behavior.

### Identity Stage & Motion

The Hero identity stage pairs the circular MrWinRock skull with an integrated 2x2 hairline quick-links footer and a diagonal light sheen sweeping once on arrival (`1.45s cubic-bezier(.16, 1, .3, 1)`) and replaying on hover. Route changes animate subtly from visible opacity (`.76 -> 1`) over (420ms). All animations, transitions, press translations, and smooth scrolling stop under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

### Do:

- **Do** preserve the exact charcoal, chalk-ink, mint-cyan, and electric cyan-to-magenta palette across all routes.
- **Do** keep the floating centered pill dock on desktop, asymmetric bento grid on Home, and open unboxed editorial headers on interior routes.
- **Do** scope hover highlights and active press translation strictly to real interactive controls (`<a>` and enabled `<button>`).
- **Do** keep English and Thai layouts free of horizontal overflow and WCAG AA violations from (320px) to (1440px).

### Don't:

- **Don't** place kickers or eyebrows above headings.
- **Don't** nest bordered cards inside bordered cards; use hairline-divided matrices or standalone tiles on `#121212`.
- **Don't** apply gradient fills to body or heading text, or use zero-offset neon glow halos.
- **Don't** invent project evidence, company case-study details, or claims outside published API data.
