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
    fontSize: "clamp(3rem, 5.3vw, 4.75rem)"
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
  support:
    fontFamily: "'Noto Sans Thai', sans-serif"
    fontSize: ".875rem"
rounded:
  control: "8px"
  panel: "16px"
  resource: "12px"
  compact: "6px"
spacing:
  compact: "8px"
  control-gap: "8px"
  base: "16px"
  mobile-gutter: "24px"
  panel: "32px"
  desktop-gutter: "48px"
  section: "80px"
  section-mobile: "56px"
  header-height: "72px"
  header-height-mobile: "64px"
components:
  button-primary:
    textColor: "{colors.control-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  hero-primary:
    textColor: "{colors.control-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "52px"
  button-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-tertiary:
    textColor: "{colors.muted}"
    typography: "{typography.support}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  input:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 16px"
  navigation-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.compact}"
    padding: "8px 10px"
  skill-evidence:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px 18px"
  technology-tag:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  direct-contact:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px"
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

- **Display:** the frontmatter display role is the desktop first-name treatment. The surname uses (.62em), weight (450), leading inherited from the name, and tracking (-.03em). At tablet width the first name uses `clamp(2.5rem, 5.4vw, 4rem)`; on mobile it uses `clamp(2.6rem, 9.4vw, 4.8rem)` and the surname becomes (.65em).
- **Headline:** fluid section headings use the headline role; route titles use `clamp(2.5rem, 5vw, 4.5rem)`, weight (500).
- **Title:** project titles use the title role; featured work increases to (2rem). Panel titles are (1.4rem), weight (500).
- **Body:** the root role is the default. Hero and page descriptions increase leading to (1.9), with measures of (57ch) and (70ch); project summaries use (.95rem), leading (1.85), and (68ch).
- **Label:** controls use the label role. Navigation and technology labels use (.8125rem); labels stay in ordinary case. The support role maps to the source's `--support-size` for capability descriptions, hero social links, and the tertiary action.

### Named Rules

**The Two-Script Rule.** Preserve the Noto Sans Thai fallback in display stacks and its reading role; test both languages when changing type size or width.

## Layout

The outer main and navigation containers stop at (1280px), including desktop side padding of (48px); the resulting inner content width is (1184px). Navigation is fixed and uses `--header-height`; the page begins below it and scroll padding adds (24px). Main content has (100px) bottom padding. Sections use `--section-space`, with local (8–32px) control and reading gaps. The frontmatter records the desktop and mobile values of both source tokens.

The home composition pairs text and a supporting sleeve in (1.6fr / .8fr) columns with an (80px) gap and (72px 0 56px) padding. Selected work precedes the capability summary. Project actions wrap directly below the summary and technology chips, grouped with them at a (24px) gap so a taller screenshot cannot push the actions away. A Home showcase with a published screenshot centers this information group beside the image, in (1fr / 1.05fr) columns with a (56px) column gap; without an image it retains the open text listing. Home skill evidence uses three columns of boxed links with (12px) gaps. These compositions are surface patterns, not mandatory layouts for every route.

At (1100px) the hero tightens. At (1023px) side gutters become (32px), hero columns tighten again, and the separate Skills route uses three columns. At (767px) gutters become (24px), navigation becomes (64px) high, hero and project rows stack, Home showcase images lead their summaries, skills use two columns, and section separation becomes (56px). The Skills route becomes one column at (479px); Home skill evidence becomes one column at (359px), when gutters also become (18px). The Tailwind desktop navigation appears from (1024px). The body supports a minimum width of (280px).

## Elevation & Depth

Depth comes from tonal fields, dividers, and state changes. Panels have no general drop shadow. The skull artwork alone has the observed soft shadow (`0 24px 42px -22px #21113b70`), grounding it inside the sleeve. Navigation is opaque, with no backdrop blur.

### Named Rules

**The Open Catalog Rule.** Present work listings as open rows separated by fine rules; use enclosed panels for evidence, fields, and resource states where grouping earns its boundary.

## Shapes

Controls, technology chips, Home skill links, Skills tiles, and direct contact links use the control radius; sleeves, contact rails, and evidence panels use the panel radius. Resource notices, screenshots, and the résumé frame use the resource radius. Compact navigation uses the compact radius. The original skull and navigation logo keep their circular crop. Project rows remain open without a rounded enclosure.

## Components

### Buttons

Controls are clear and gently rounded. Primary actions use the brand surface gradient, dark lettering, a (48px) minimum height, and the frontmatter padding. Hover and keyboard focus become solid pale lavender. Secondary actions are transparent with a strong boundary, shifting to a violet-dark fill and lavender rule on hover and keyboard focus. Action labels and arrows share the compact control gap. Buttons, text actions, technology links, skill links, and project-detail links move down (1px) while pressed. Disabled buttons reduce opacity to (.55).

On Home, View My Work has a (52px) minimum height and (24px) horizontal padding; the résumé stays secondary with (16px) horizontal padding. Contact is a tertiary text action with the support type role and a (48px) minimum height; hover and keyboard focus brighten its text and add a raised-ink fill. Compact breakpoints reduce the work action's horizontal padding.

The contact rail reverses the action to a dark solid fill with light lettering. Global keyboard focus uses a (2px) cyan outline offset by (5px). Color and border transitions last (.2s).

### Chips

Technology tags are boxed chips with a strong boundary, raised-ink fill, a (36px) minimum height, and the frontmatter padding. The shared technology-tag component deduplicates labels across project cards, project details, and Experience. When Projects is enabled, each chip links to its technology filter; during visibility loading or when Projects is hidden, the same label remains informational. Link hover and keyboard focus brighten the text, turn the rule lavender, and deepen the violet fill.

Home skill evidence uses boxed catalog-surface links with a strong boundary, a (64px) minimum height, and the frontmatter padding. The Skills route uses the same visual vocabulary in tiles with (16px) padding and a (72px) minimum height. Both link to the corresponding project filter only when Projects is enabled; otherwise they retain reading semantics. Hover and keyboard focus use lavender text and rules with a raised-ink fill. Arrows sit beside the label. Home skill icons are (24px); Skills icons are (28px) inside a (36px) well.

### Cards / Containers

Project entries use open rows with linked titles. Title hover and keyboard focus add lavender text and a fine underline. Detail actions are compact, boxed links beneath the description and technology chips, with (10px 14px) padding and a (44px) minimum height. Their arrows remain beside the label. Live and repository actions wrap alongside them. Home showcase rows use (36px 0) padding and a transparent resting surface; hover and focus-within share the project-hover tone. On mobile, row padding becomes (28px 0) and each detail action and external-action group has a (250px) maximum width. Showcase screenshots are conditional on published evidence, contained without cropping, and limited to (380px) height on desktop and (320px) on mobile. Linked covers open the project detail; hover and keyboard focus outline the image boundary.

Evidence panels use the frontmatter surface, padding, and panel radius with a fine border; mobile padding becomes (24px). Panels containing a focused control strengthen their boundary. Resource notices use the resource radius and explicit status copy.

Direct contact destinations use boxed links with (16px) padding, a (16px) icon-to-copy gap, a fine boundary, and the catalog surface. The arrow stays beside the destination label; supporting addresses can wrap. Hover and keyboard focus use lavender rules and a raised-ink fill. About offers contextual work and Experience actions only when those destinations are enabled. The résumé toolbar pairs its download label with a (16px) download SVG and its new-tab action with the shared arrow.

Loading notices keep that real status text and add a decorative (16px) outlined progress ring. It rotates over (.8s) only when reduced motion is not requested; status remains readable when the ring is static.

### Inputs / Fields

Fields have a dark inset tone, strong border, and control radius. Minimum height is (50px); textarea height begins at (150px) and resizes vertically. Placeholder text remains visibly distinct. Field focus uses a (2px) lavender outline offset by (2px); invalid contact fields use the error border.

### Navigation

The compact skull and wordmark sit beside ordinary-case links. The active link has lavender text and a fine lavender indicator (2px); hover uses a light foreground and the catalog surface. Links and the language switcher have a (44px) minimum target; the menu toggle is (44px) square. Mobile links are (1rem) with (12px 18px) padding, inside an opaque scrollable menu bounded by the viewport minus `--header-height`. Destination visibility continues to follow settings.

Project details offer a wrapping section navigation when at least two published sections are available. Its boxed anchors have a (44px) minimum height, (8px 14px) padding, and (8px) gaps; hover and keyboard focus brighten the text, rule, and surface. Section offsets clear the fixed header by (24px). Published screenshots open their original image in a new tab and show an outline on hover or keyboard focus.

### Identity Sleeve and Arrow

The sleeve preserves the original skull asset in a supporting desktop square with a (336px) maximum width. On mobile it becomes a horizontal identity strip: a (72px) skull beside the wordmark and location, with (20px) padding and a (112px) resulting minimum content height. Its sheen travels once on arrival (1.8s), then sweeps on hover with a (1s) transition. The shared easing is `cubic-bezier(.16, 1, .3, 1)`. Primary, project-detail, skill, capability, direct-contact, and secondary-action arrows shift (1px -1px) on hover and keyboard focus over (.2s). All decorative animation, transitions, and smooth scrolling stop under reduced motion; essential content is never gated by animation.

Arrow links use the shared inline SVG with round caps, (1.6) stroke width, and a default (14px) square size. Keep the arrow adjacent to its label using the compact control gap. Home social arrows use (13px); back links use the matching back path.

### Source mappings

| Module or snippet | Source of truth |
| --- | --- |
| Palette, type, radii, spacing, focus, breakpoints | `src/index.css`, `:root`, global rules, responsive media blocks |
| Font delivery | `src/index.css` font faces; `index.html` font preloads |
| Primary / secondary buttons | `src/index.css` controls; `src/components/pages/home/Home.tsx` actions |
| Input | `src/index.css` search/contact field rules |
| Navigation | `src/components/Navbar.tsx`; `src/index.css` navigation rules |
| Technology tag | `src/components/TechnologyTags.tsx`; `src/index.css` technology-chip rules |
| Project row / detail navigation | `src/components/pages/projects/ProjectCard.tsx`, `ProjectDetail.tsx`; `src/index.css` catalog and detail rules |
| Skill evidence / tiles | `src/components/pages/home/Home.tsx`, `src/components/pages/skills/Skills.tsx`; `src/index.css` skill rules |
| Contextual and direct actions | `src/components/pages/about/About.tsx`, `src/components/pages/contact/Contact.tsx`, `src/components/pages/resume/Resume.tsx` |
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
