---
version: 1
slug: "src-components-pages-home-home-tsx"
primary_target: "src/components/pages/home/Home.tsx"
related_targets: ["src/index.css","src/components/Navbar.tsx","src/components/Footer.tsx","src/components/pages/home/BuildFocus.tsx","src/components/pages/projects/ProjectCard.tsx","src/components/pages/projects/Projects.tsx","src/components/pages/projects/ProjectDetail.tsx","src/components/pages/about/About.tsx","src/components/pages/skills/Skills.tsx","src/components/pages/experience/Experience.tsx","src/components/pages/contact/Contact.tsx","src/components/pages/resume/Resume.tsx"]
---

# Portfolio redesign — Asymmetric Bento & Floating Dock (2026-11-21)

Scope: Overall layout architecture overhaul across all public portfolio routes (Home, Projects, Project Detail, About, Experience, Skills, Contact, Resume) plus shared Navigation and Footer. Visitor mode: Experience. Recruiters and potential clients remain equal audiences.

Owner confirmation:
- Asymmetric Bento Grid + Floating Nav Dock overall layout (floating centered nav pill on desktop; bento Home with 2-up featured project grid and What I Build paired side-by-side with Technologies; open editorial interior headers).
- Keep the current live color palette unchanged (`#121212` ground, `#1B1B1B`/`#252525` surfaces, `#0E0E0E` recessed fields, `#F4F4F4` ink, `#B9B9B9` muted, `#373737`/`#777777` borders, `#A6EEEB` mint-cyan brand ink, `#33FFFF` cyan to `#CB4EFF` magenta spectrum accent, `#D9FAF7` primary hover, `#F4A4BB` error, `#A1E2BC` success).
- Preserve all bilingual EN/TH copy, API visibility guards, company link-only privacy rules, AI disclosure/fallback behavior, keyboard accessibility, and E2E layout contracts.

## Direction contract

THESIS: Replace the traditional top-bar + single-column vertical stack with a floating obsidian pill dock and an asymmetric bento-grid monograph—pairing a wide lead showcase with side-by-side secondary projects, placing capabilities and technologies side-by-side in one hairline-divided horizontal band, and opening interior routes with unboxed monumental typography directly on the dark canvas.

OWN-WORLD: Continuous `#121212` obsidian canvas with a floating centered `#1B1B1B` pill navigation dock, crisp `20–24px` bento plates (`1px solid #373737`), `#252525` interactive surface lifts, and `#0E0E0E` recessed media and input wells. Solid `#F4F4F4` Sora display lettering (`-0.04em` tracking floor; relaxed Thai `:lang(th)` headings) and Noto Sans Thai body text; `#A6EEEB` mint-cyan for roles, indices, counts, and arrows; `#33FFFF` to `#CB4EFF` spectrum gradient rationed strictly to 2px structural rims, active dock indicator, timeline spine, and the circular skull emblem ring.

STORY: Visitors land on a detached floating dock above an asymmetric bento hero pairing Pharthiwath's statement plate with the MrWinRock skull identity and social dock, scan an asymmetric lead-plus-pair Selected Work grid, inspect capabilities and core technologies side-by-side without endless vertical scrolling, and reach résumé review or direct inquiry in one step.

FIRST VIEWPORT: Floating centered pill navigation dock (`14px` top offset) hovering over an asymmetric 12-column hero bento. Left (8 cols): framed `#1B1B1B` statement plate opening directly on the full-name H1 (no eyebrow above it), inline role/location strip, biography, and primary/secondary action buttons. Right (4 cols): framed skull identity stage with circular emblem in its spectrum ring, brand caption, and integrated quick-link social footer (`GitHub`, `LinkedIn`, `About Me`, `Contact`). Below, Selected Work enters with a full-width `01` lead plate above `02` & `03` side-by-side. On mobile (`<=767px`), the floating bar spans the gutter and the bento collapses cleanly to single-column plates.

FORM: Asymmetric Bento Monograph & Floating Navigation Dock, keeping the owner-pinned dark charcoal and cyan-magenta palette. seed: none (unavailable)

Signature interaction and motion: One subtle diagonal light sheen across the Hero skull identity stage on arrival and hover, paired with a unified tactile interaction grammar across interactive links, bento bays, and project plates (`220ms cubic-bezier(.16, 1, .3, 1)`). Zero motion under `prefers-reduced-motion: reduce`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
