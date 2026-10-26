---
version: 1
slug: "experience-timeline"
primary_target: "src/components/pages/experience/Experience.tsx"
related_targets: ["src/index.css"]
---

# Experience timeline

Read mode. Refine the Independent Catalog into a connected vertical timeline, retaining the dark field, typography, published content and API ordering. Dates lead into the role, organization, description, achievements and technologies. Preserve EN/TH and resource states.

Spatial thesis: preserve the shared left-aligned page title and center only the maximum 1120px timeline. Desktop uses two equal columns around a central gradient rail, with a 96px gap: dates sit opposite role details, alternating sides with each entry. Make the distinction explicit: dates use a compact calendar treatment with the brand wash and cyan text, while information uses full-width, identically padded surface panels. Put employment/education type with the role heading, not the date. Short horizontal connectors pair each panel with its milestone. Keep body copy left-aligned for reading. Below 1024px use one centered reading column, a left-edge rail and a 32px content inset; dates sit above each panel and horizontal connectors disappear. Historical milestones are hollow; ongoing entries use the existing gradient fill, supported by the translated Present date. No interaction or motion is needed for decoration.

Use an ordered list and semantic date elements. Rail geometry belongs to pseudo-elements, preventing decorative children from changing grid placement. Render no empty timeline when data is loading, unavailable, disabled or empty. Preserve source order and facts; no inferred career claims.

Verify desktop/mobile English and Thai with actual published content, intermediate and 320px widths, long content, empty/error states, accessible structure and route geometry tests for alternating sides. Leave the requested local backend and frontend running for owner review; close only temporary verification browsers.

Verified 2026-10-26: inspected desktop and mobile captures of published content; EN/TH at 320, 390, 768 and 1440px had no horizontal overflow or axe findings. Build, lint, 180 unit tests and the standard 30-test browser suite passed. An initial custom browser run used the production API origin and hid the mocked Retry-After header across origins; rerunning with the repository's standard test-origin build resolved all four cooldown failures without product changes. Temporary previews and browsers were closed.

Centered revision: inspected the running local backend's content in EN/TH at 320, 390, 768, 1024 and 1440px; no overflow or axe findings. Desktop rail is at the viewport midpoint, with opposite metadata and role columns alternating by entry. The revised geometry test failed on the previous layout, then all four route-layout cases passed on desktop/mobile. Build and lint passed. Local development servers remain running as requested.

Clarity revision: the initial measured columns and bodies were equal at 512px, but unbounded text did not make their shared boundaries apparent. Information now has explicit matching surface panels, while compact calendar blocks distinguish dates; type badges belong to the role panel. Desktop connectors identify each date/panel pairing. Verified identical panel widths and mirrored rail spacing in the browser tests. The combined EN/TH inspection at all five widths had no overflow or axe findings; build, lint, 180 unit tests and four route-layout tests passed. Development servers remain running.
