# Portfolio Redesign Implementation Plan

> **For agentic workers:** Execute inline in the current checkout. Use superpowers:executing-plans for implementation. The owner has delegated creative choices; preserve all product behavior.

**Goal:** Replace the portfolio's visual world while retaining dark surfaces, gradients, skull identity, and all working bilingual journeys.

**Architecture:** Recompose Home and shared chrome, replace the global stylesheet with one coherent token system, and carry it through the existing secondary-page classes. Keep data hooks, API contracts, publishing boundaries, and forms intact.

**Tech Stack:** Existing React, TypeScript, Vite, Tailwind, Motion; self-hosted Sora and Noto Sans Thai.

**Spec:** `.impeccable/surfaces/src-components-pages-home-home-tsx.md`.

## Global Constraints

- Dark surfaces and gradients are mandatory. Retain skull identity and EN/TH support.
- No invented proof, outcomes, availability claims, or company details.
- No dependency additions or backend/admin changes.
- Essential content stays visible immediately; reduced motion remains supported.

## Review Focus

- Long English surname and Thai headings must fit at 320–1440px.
- API disabled and unavailable states must remain honest and readable.
- Keyboard users must reach every destination and close the mobile menu with Escape.
- Contact drafts and résumé failures retain existing recovery behavior.
- Real project rows, optional screenshot evidence, and empty/filtered states must keep clear reading order.

## Tasks

- [x] Replace Home composition, navigation details, project presentation, and global visual tokens; preserve existing interfaces and assertions.
- [x] Apply the system to About, Skills, Experience, Projects, Contact, Resume, disabled and missing routes; remove redundant labels and decorative section numbering.
- [x] Run existing unit, lint, build and browser suites. Capture one combined desktop/mobile/Thai inspection; batch material corrections, then confirm once.
- [x] Run the mechanical detector once, obtain a fresh finish review, resolve its material findings, and document built tokens in DESIGN.md and `.impeccable/design.json`.

## Verification ledger

- Full unit suite: 173 passed after the initial composition update. Browser suite: 26 passed across desktop and mobile.
- Final reviewer fixes: removed the Home greeting eyebrow; replaced remaining project glyph arrows with the shared SVG component. The reviewer scored both resolved and returned `ship` for the two fixes.
- Existing company-link ordering assertion included a decorative Unicode arrow. Updated it to assert ordered accessible names, retaining the original link-only/privacy coverage.
- Combined visual checks covered English and Thai, desktop/mobile, and 320/768/1024 widths without horizontal overflow. Both initial and verdict-round axe checks reported zero violations in the inspected states.
- The detector ran once and returned an empty finding list. Fonts are self-hosted with licenses. Raster provenance scan: four existing assets, zero missing origins.
- No production publication or backend/admin change is part of this task.
- Final unit rerun: 173/173 pass after updating the semantic company-link assertion. Final production build and lint pass. DESIGN.md and schemaVersion 2 sidecar are written and checked against the built source.
