---
name: MrWinRock
description: A dark personal catalog with a vivid skull identity sleeve.
colors:
  background: "#0c0c10"
  ink: "#f3f1f8"
  muted: "#aaa7b7"
  surface: "#151419"
  surface-elevated: "#1c1b23"
  border: "#302e39"
  border-strong: "#514d60"
  brand-ink: "#c6b5ff"
  brand-cyan: "#a0e8ee"
  control-ink: "#14101f"
  primary-hover: "#ded3ff"
  field-background: "#0e0d12"
  placeholder: "#9d97ac"
  error: "#f4a4bb"
  project-hover: "#1c1726"
typography:
  display:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "clamp(2.8rem, 5.4vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-.035em"
  title:
    fontFamily: "Sora, 'Noto Sans Thai', sans-serif"
    fontSize: "1.65rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
  label:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: ".875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  control: "8px"
  panel: "16px"
  resource: "12px"
  compact: "6px"
spacing:
  compact: "8px"
  control-gap: "14px"
  base: "16px"
  mobile-gutter: "24px"
  panel: "32px"
  desktop-gutter: "48px"
  section: "84px"
components:
  button-primary:
    textColor: "{colors.control-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  input:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 16px"
  navigation-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.compact}"
    padding: "8px 11px"
  technology-tag:
    padding: "2px 0"
  project-row:
    padding: "32px 0"
  evidence-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "32px"
---

# Design System: MrWinRock

## Overview

**Creative North Star: "The Independent Catalog"**

The system treats personal work as a catalog: clear names, open listings, fine rules, and enough space to inspect the evidence. Ink-dark fields and cool lettering provide a quiet reading surface; the original skull anchors recognition inside an expressive gradient sleeve.

This name, the descriptive color names, and the named rules below are designer decisions made under the owner's delegated visual brief. The durable owner commitments are the MrWinRock identity, the existing skull, dark surfaces, gradients, and useful English and Thai journeys. Sora supplies the display voice while Noto Sans Thai carries reading and Thai coverage.

**Key Characteristics:**

- Ink-dark reading surfaces and cool, solid-color text.
- Original skull artwork on a violet, lilac, and cyan sleeve.
- Open project rows, fine dividers, and restrained tonal states.
- Bilingual typography, visible focus, and static reduced-motion behavior.

## Colors

The palette combines cool neutrals with soft violet and cyan accents; vivid gradients belong to material surfaces.

### Primary

- **Sleeve Lavender** (`brand-ink`): role text, evidence links, field focus, and selection.
- **Ice Cyan** (`brand-cyan`): global keyboard focus and selected accent details.
- The primary surface gradient uses `linear-gradient(115deg, #a48aff 0%, #d6a5f6 45%, #a0e8ee 100%)`. The identity sleeve has its own material gradient: `linear-gradient(145deg, #aa80f7, #c5aff4 48%, #73d4e2)`.

### Neutral

- **Night Ink** (`background`): the continuous page and navigation field.
- **Cool Lettering** (`ink`) and **Quiet Lilac Gray** (`muted`): main and supporting reading levels.
- **Catalog Surface** (`surface`) and **Raised Ink** (`surface-elevated`): panel tones; the latter is declared in the source palette but is not a general elevation mandate.
- **Fine Rule** (`border`) and **Control Rule** (`border-strong`): structural dividers and control boundaries.
- **Control Ink**, **Primary Hover**, **Field Background**, **Placeholder**, and **Project Hover** describe the corresponding control and row states. **Error** marks invalid contact fields and assistant failures.

### Named Rules

**The Material Gradient Rule.** Put gradients on sleeves, action fills, and broad contact surfaces; keep reading text a solid color.

## Typography

**Display Font:** self-hosted Sora, followed by Noto Sans Thai and sans-serif.

**Body Font:** self-hosted Noto Sans Thai, followed by sans-serif.

**Character:** geometric display lettering creates identity while generous reading leading supports both languages. The root is (16px); the system uses observed roles rather than a fixed mathematical type ratio.

### Hierarchy

- **Display:** the frontmatter display role is the desktop first-name treatment. The surname uses (.59em), weight (450), leading inherited from the name, and tracking (-.03em). At mobile width it becomes (.65em).
- **Headline:** fluid section headings use the headline role; route titles use `clamp(2.5rem, 5vw, 4.5rem)`, weight (500).
- **Title:** project titles use the title role; featured work increases to (2rem). Panel titles are (1.4rem), weight (500).
- **Body:** the root role is the default. Hero and page descriptions increase leading to (1.9), with measures of (57ch) and (70ch); project summaries use (.95rem), leading (1.85), and (68ch).
- **Label:** controls use the label role. Navigation uses (.82rem), technology labels (.75rem); labels stay in ordinary case.

### Named Rules

**The Two-Script Rule.** Preserve the Noto Sans Thai fallback in display stacks and its reading role; test both languages when changing type size or width.

## Layout

The outer main and navigation containers stop at (1280px), including desktop side padding of (48px); the resulting inner content width is (1184px). Navigation is fixed and (84px) high. The page begins below it. Main content has (100px) bottom padding. Sections use the source's (84px) separation, with local (8–32px) control and reading gaps.

The home composition pairs text and the sleeve in (1.3fr / 1fr) columns with a (64px) gap. Project rows pair flexible summaries with a (200px) action column and a (44px) gap. These compositions are surface patterns, not mandatory layouts for every route.

At (1100px) the hero tightens. At (1023px) side gutters become (32px), hero columns tighten again, and skills use three columns. At (767px) gutters become (24px), navigation becomes (72px) high, hero and project rows stack, skills use two columns, and section separation becomes (56px). At (359px) gutters become (18px) and skills use one column. The Tailwind desktop navigation appears from (1024px); its larger navigation gap begins at (1280px). The body supports a minimum width of (280px).

## Elevation & Depth

Depth comes from tonal fields, dividers, and state changes. Panels have no general drop shadow. The skull artwork alone has the observed soft shadow (`0 24px 42px -22px #21113b70`), grounding it inside the sleeve. Navigation is opaque, with no backdrop blur.

### Named Rules

**The Open Catalog Rule.** Present work listings as open rows separated by fine rules; use enclosed panels for evidence, fields, and resource states where grouping earns its boundary.

## Shapes

Controls and skill links use the control radius; sleeves, contact rails, and evidence panels use the panel radius. Resource notices, screenshots, and the résumé frame use the resource radius. Compact navigation and experience labels use the compact radius. The original skull and navigation logo keep their circular crop. Project rows themselves have no rounded enclosure.

## Components

### Buttons

Controls are clear and gently rounded. Primary actions use the brand surface gradient, dark lettering, a (48px) minimum height, and the frontmatter padding. Hover becomes a solid pale lavender. Secondary actions are transparent with a strong boundary, shifting to a violet-dark fill and lighter rule on hover. Disabled buttons reduce opacity to (.55).

The contact rail reverses the action to a dark solid fill with light lettering. Global keyboard focus uses a (2px) cyan outline offset by (5px). Color and border transitions last (.2s).

### Chips

Technology tags are unboxed text with slash separators, not badges. Skill evidence links are bordered controls with a (56px) minimum height and (10px 18px) padding. Filtering controls elsewhere may use the existing button vocabulary; technology labels are not interactive.

### Cards / Containers

Project entries use open rows. Featured rows use (38px 28px) padding and alternate a subtle dark tone; hover and focus-within share the project-hover tone. On mobile, featured padding becomes (28px 18px) and the action region has a (250px) maximum width.

Evidence panels use the frontmatter surface, padding, and panel radius with a fine border; mobile padding becomes (24px). Resource notices use the resource radius and explicit status copy.

### Inputs / Fields

Fields have a dark inset tone, strong border, and control radius. Minimum height is (50px); textarea height begins at (150px) and resizes vertically. Placeholder text remains visibly distinct. Field focus uses a (2px) lavender outline offset by (2px); invalid contact fields use the error border.

### Navigation

The compact skull and wordmark sit beside ordinary-case links. Active and hover links receive a light foreground and a dark violet field. Links and the language switcher have a (44px) minimum target; the menu toggle is (44px) square. Mobile links are (1rem) with (12px 18px) padding, inside an opaque scrollable menu. Destination visibility continues to follow settings.

### Identity Sleeve and Arrow

The sleeve preserves the original skull asset; its desktop aspect ratio is (.94) and mobile ratio (1.05), with a mobile maximum width of (440px). Its sheen travels once on arrival (1.8s), then sweeps on hover with a (1s) transition. The shared easing is `cubic-bezier(.16, 1, .3, 1)`. Primary and project-detail arrows shift (2px -2px) on hover over (.3s). All decorative animation, transitions, and smooth scrolling stop under reduced motion; essential content is never gated by animation.

Arrow links use the shared inline SVG with round caps, (1.6) stroke width, and a default (20px) square view. Smaller social, skill, and footer arrows retain the same path; back links use the matching back path.

### Source mappings

| Module or snippet | Source of truth |
| --- | --- |
| Palette, type, radii, spacing, focus, breakpoints | `src/index.css`, `:root`, global rules, responsive media blocks |
| Font delivery | `src/index.css` font faces; `index.html` font preloads |
| Primary / secondary buttons | `src/index.css` controls; `src/components/pages/home/Home.tsx` actions |
| Input | `src/index.css` search/contact field rules |
| Navigation | `src/components/Navbar.tsx`; `src/index.css` navigation rules |
| Technology tag / project row | `src/components/pages/projects/ProjectCard.tsx`; `src/index.css` catalog rules |
| Evidence panel | `src/index.css` secondary-route panel rules |
| Identity sleeve | `src/components/pages/home/Home.tsx`; `src/index.css` sleeve and motion rules |
| Arrow SVG | `src/components/ArrowIcon.tsx` |
| Utility defaults | `tailwind.config.ts` has no extended theme; Tailwind supplies responsive display utilities |

The sidecar previews translate these modules into standalone HTML/CSS. Preview examples are interface labels, not new project claims. Tonal ramps are generated panel metadata, not additional shipped palette tokens.

## Do's and Don'ts

### Do:

- **Do** preserve the original skull and dark, gradient-bearing identity.
- **Do** use solid readable text, fine rules, and open work listings.
- **Do** preserve both language stacks, visible focus, and reduced-motion behavior.
- **Do** derive future component variants from the observed source and verify their responsive reading order.

### Don't:

- **Don't** turn reading text into gradient lettering.
- **Don't** apply the skull's shadow as a general panel elevation.
- **Don't** gate content behind decorative animation or add a continuous sleeve loop.
- **Don't** infer new project evidence or product claims from visual examples.
