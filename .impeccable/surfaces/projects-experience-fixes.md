---
version: 1
slug: "projects-experience-fixes"
primary_target: "src/components/pages/projects/Projects.tsx"
related_targets: ["src/components/pages/experience/Experience.tsx", "src/index.css", "index.html"]
---

# Projects and Experience layout repairs

Scope: refine the existing catalog system without replacing its visual world. Projects is Experience mode: personal work leads, optional matching supports. Experience is Read mode: dates, role, organization, and evidence form a reliable reading sequence.

Evidence: live desktop/mobile screenshots under `.impeccable/review/route-fixes/`; independent layout assessment; mechanical layout scan returned no findings. The empty Experience marker is an unintended grid child. GitHub Pages emits `?/path` while the entry HTML restores only legacy `?p=path`.

Spatial thesis: align Experience metadata and content on the same desktop row, stack them without an empty row on mobile. Give Projects selected work the main column and an always-available matcher a supporting column. Stack the matcher after selected work and before the archive on smaller screens. Keep filters with the page introduction, published group order and company privacy intact. Do not alter the global palette, typography, Home composition, or factual content.

Project hover/focus treatment: reserve side padding at rest as well as on highlight (24px desktop, 16px mobile). The background must not touch the content, and changing hover or keyboard-focus state must not move the text. Confirmed at 1440px, 390px, and 320px with stable geometry and no overflow.

Verification: regression tests for real grid positions, project/form reading order, and 404-to-entry URL restoration including locale, query, hash, and legacy links. Capture both routes together at desktop/mobile and Thai/narrow sizes; batch corrections once. Keep empty, disabled, error, filtering and assistant-result states working. Stop temporary local processes after verification, honoring the owner's prior shutdown request.
