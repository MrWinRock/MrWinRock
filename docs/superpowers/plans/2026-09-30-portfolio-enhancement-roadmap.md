# Recruiter Portfolio Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for native execution, or superpowers:subagent-driven-development if the user chooses delegation. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio reliable, easy for recruiters to assess, and supported by credible project evidence.

**Architecture:** Deliver six independently reviewable phases. Keep the current React/Vite public site, API-owned OpenAPI contract, and authenticated admin workflow. Implement public-site corrections first; design additive content contracts before changing the API and admin, and treat static publishing as a separate subsystem.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Motion, i18next, Vitest, Playwright; sibling Bun/Elysia/Zod/MongoDB API and React admin.

**Spec:** [Project audit](../../project-audit-2026-09-30.md). This is a proposed delivery roadmap, not an approved detailed design for every later subsystem. Phase 3 content contracts and Phase 5 publishing policies require their own designs before implementation.

**Delivery status:** The user authorized implementation with “build all”. Current phase outcomes, verified checks, content limitations, and rollout instructions are recorded in the [execution ledger](2026-09-30-build-progress.md). The checklist below preserves the original delivery sequence; commits and production deployment are deferred.

## Global Constraints

- Optimize for recruiters assessing work; preserve English and Thai support.
- Use Bun 1.3.13 as required by the public repository README.
- Keep existing API error sanitization, request cancellation, contact input retention, and Blob URL cleanup.
- Preserve intentionally disabled sections; never enable sections automatically because settings failed.
- Keep admin authentication and write endpoints separate from the public surface.
- Generate client types from the API artifact; never edit generated OpenAPI TypeScript manually.
- Use only verified claims, outcomes, availability, and project ownership. Do not fabricate achievements or publish placeholders.
- Test contact with intercepted requests; no real messages in automated verification.
- Add regression coverage alongside the owning change, not only at final release.
- Check repository instructions and current working-tree changes again at execution time. Commit only the selected implementation files.

## Review Focus

1. Settings unavailable at first visit versus a known disabled section: Phase 1 must distinguish the two without exposing hidden content.
2. Thai preference with restricted localStorage or unsupported browser language: Phase 1 must retain a usable fallback.
3. Keyboard and reduced-motion visits: Phase 2 must show essential content immediately and keep focus visible.
4. Existing project records without new case-study fields: Phase 3 must remain readable and editable without destructive migrations.
5. Published content later disabled or removed: Phase 5 must define and test revocation before enabling snapshots or prerendering.

## Delivery sequence

| Phase | Main outcome | Depends on | Repository scope |
|---|---|---|---|
| 1 | Correct loading, language, links, and résumé handling | Existing site | Public site |
| 2 | Accessible navigation, motion, and responsive layout | Phase 1 | Public site |
| 3 | Recruiter home and three substantial case studies | Phases 1–2; verified source material | Public + API + admin |
| 4 | Smaller initial downloads and useful page metadata | Phase 3 routes/content | Public site |
| 5 | Resilient public publishing and complete bilingual content | Phase 3 contracts, Phase 4 metadata; publishing policy | Public + API + admin + CI |
| 6 | Production release verification and measured follow-up | Phases 1–5 | All affected repositories |

The first implementation is **settings failure recovery**, before layout changes. A single failed request currently removes every recruiter destination. Deliver it as a small, reviewable change, then continue through Phase 1.

## Phase 1 — Correctness and recovery

### Task 1.1: Separate unavailable settings from disabled content

**Files:** Modify `src/contexts/settingsConstants.ts`, `src/contexts/SettingsContext.tsx`, `src/components/SectionGuard.tsx`, `src/components/Navbar.tsx`, `src/components/pages/home/Home.tsx`, and locale JSON files. Extend `tests/settingsProvider.test.tsx`, `tests/sectionGuard.test.tsx`, and `tests/publicShell.ssr.test.tsx`.

**Interfaces:** Add `settingsStatus: 'loading' | 'ready' | 'unavailable'` and `retrySettings: () => void` to the context; retain `settings` and `isInitialLoading` for compatibility. `ready` means a successful settings response has been retained. Background revalidation failure preserves that response; initial failure becomes `unavailable`.

- [ ] Add regression cases: initial 503 shows unavailable with retry; retry success reveals allowed links; confirmed false remains disabled; background failure retains last successful flags; duplicate retries do not start concurrent requests.
- [ ] Run `bun run test:run -- tests/settingsProvider.test.tsx tests/sectionGuard.test.tsx tests/publicShell.ssr.test.tsx`; verify the new cases fail for the current behavior.
- [ ] Implement the context state and retry action; show a visible retry notice on Home/deep links without turning unknown flags on.
- [ ] Run the same tests and add a mocked browser recovery check. Acceptance: all cases pass and disabled URLs remain unchanged.
- [ ] Review and commit the task independently.

### Task 1.2: Persist language and finish simple UI translations

**Files:** Modify `src/i18n.ts`, `src/components/Footer.tsx`, `src/components/pages/projects/ProjectActions.tsx`, `src/components/pages/experience/Experience.tsx`, and locale JSON files. Extend i18n integration tests and `tests/e2e/public-smoke.spec.ts`.

**Interfaces:** Supported detected languages are `en` and `th`; English remains the fallback. Keep document language synchronization. Type badges use locale keys while stored enum values remain unchanged.

- [ ] Add regression cases for Thai switch/reload, first visit with `th-TH`, unsupported language fallback, denied localStorage, and translated footer/action/type labels.
- [ ] Run the affected tests and verify the relevant cases fail before changing detection.
- [ ] Remove forced English initialization, constrain supported languages, and translate hardcoded UI labels.
- [ ] Verify persistence, accessible switch labels, and `<html lang>` in browser checks.
- [ ] Review and commit independently.

### Task 1.3: Correct the bundled live URL and reject invalid résumé bytes

**Files:** Modify `src/data/projects.ts` and `src/lib/api.ts`; extend `tests/api.client.test.ts`, `tests/api.security.test.ts`, `tests/projectActions.ssr.test.tsx`, and `tests/resume.test.tsx`.

**Interfaces:** Keep `safeExternalUrl(value: unknown): string | null` restricted to safe absolute HTTPS URLs. Keep `api.resume(options?): Promise<Blob>` but require nonempty PDF data; use `application/pdf` media type plus a `%PDF-` signature check. Handle structured JSON errors first.

- [ ] Add regression cases for the bundled canonical URL, unsafe URL rejection, valid PDF, HTML Blob with status 200, empty Blob, and mismatched MIME/signature.
- [ ] Run affected tests and verify the invalid payload/link cases fail against current behavior.
- [ ] Use `https://mrwinrock.com/` in bundled data and validate the résumé response before creating a Blob URL.
- [ ] Verify retry, input/error sanitization, and Blob URL revocation remain covered and passing.
- [ ] Review and commit independently.

**Phase exit:** a first-visit outage is recoverable, Thai persists, the bundled portfolio link works, and invalid résumé data cannot masquerade as a usable PDF.

## Phase 2 — Accessible and responsive presentation

**File map:** `Home.tsx` owns immediate hero content; `main.tsx` owns shared Motion configuration; `SpotLightCard.tsx`, Skills, Projects, and Experience own their remaining animation behavior; Navbar owns disclosure/focus behavior; `index.css` owns shared navigation/color styles. Existing page tests and browser specs cover behavior; create `tests/navbar.test.tsx` for disclosure interactions.

### Task 2.1: Remove content gates and honor reduced motion

- [ ] Add regression assertions: role/introduction/actions are visible without waiting for typing; the full accessible name is stable; switching language does not hide actions; reduced motion bypasses typing and nonessential transforms.
- [ ] Verify the behavioral tests fail, then decouple essential content from `isTypingComplete`, apply shared reduced-motion configuration, and explicitly bypass timer/repeating effects when requested.
- [ ] Verify normal and reduced-motion visits, keyboard focus, and loading/retry notices. Apply the same policy to card, skill, and timeline effects.
- [ ] Review and commit independently.

### Task 2.2: Repair the menu and navigation hierarchy

- [ ] Add tests for Escape closing with focus return, route-change closing, and all links reachable at 390×390 and 200% zoom.
- [ ] Implement a disclosure scroll region constrained to the space below the header; do not impose a modal focus trap on this nonmodal menu.
- [ ] Replace equal outlined navigation buttons with readable links, style `aria-current="page"`, and emphasize one recruiter action.
- [ ] Verify desktop/mobile and English/Thai labels, including 1024 px widths with the actual production font.
- [ ] Review and commit independently.

### Task 2.3: Improve spacing and readable text

- [ ] Reduce duplicated mobile page/card padding; keep desktop layouts coherent and action targets comfortable. Brighten contact/footer text to at least 4.5:1 for normal text.
- [ ] Verify Projects, Contact, Skills, and Experience at 320, 390, 768, 1024, and 1440 px; include long titles/tags and 200% zoom. Check no horizontal overflow or clipped controls.
- [ ] Run axe on stable, visible route content; manually check gradient labels and focus indicators that automated checks cannot reliably assess.
- [ ] Review and commit independently. Do not write tests mirroring class-name changes; test actual overflow, focus, and contrast outcomes.

**Phase exit:** a recruiter can navigate and read every core screen with keyboard, reduced motion, a narrow viewport, or zoom.

## Phase 3 — Recruiter journey and project evidence

**Content prerequisite:** collect verified source material for three projects before publishing case studies. Suggested candidates are InfoXP, Stringy, and ChadChat, subject to evidence strength. Record screenshots, the problem, your role, architectural decisions, limitations, and outcomes. A result can be qualitative when no reliable numerical metric exists. Confirm target roles and availability; retain the skull brand unless an alternate identity treatment is selected.

**Proposed content contract:** optional case-study metadata extends existing project records, preserving old entries. Proposed fields are `slug`, `featured`, and `caseStudy` containing `problem`, `role`, `decisions: string[]`, `outcomes: string[]`, `screenshots: { url: string; alt: string }[]`, and `repositories: { label: string; url: string }[]`. Finalize grouping and locale representation in this phase's design before coding; this proposal is not an approved schema.

**File map:** API `src/features/projects/projects.schema.ts`, `projects.repo.ts`, `projects.routes.ts`, generated `docs/openapi.json`, and project route tests; admin project editor/form and API types; public API validator, generated types, project data, `Projects.tsx`, `Home.tsx`, and new `src/components/pages/projects/ProjectDetail.tsx` and `src/components/ResumeDownloadButton.tsx`.

### Task 3.1: Add compatible case-study authoring

- [ ] Write the API/admin/public contract design and review it before implementation. Existing records must remain valid; slug collisions must fail clearly; related repos appear within a single case study without deleting existing data automatically.
- [ ] Add API validation/compatibility tests and admin round-trip tests before implementing fields and editing controls. Preserve existing ordering and authenticated mutation boundaries.
- [ ] Generate OpenAPI and both clients' types; run contract checks and API/admin tests. Acceptance: old records can be read, edited, and saved without losing content; new case studies round-trip correctly.
- [ ] Review and commit separately in each repository; deploy API support before clients depend on it.

### Task 3.2: Build featured projects, details, and archive

- [ ] Add behavior tests for featured selection, legacy cards, unknown slugs, long descriptions, no screenshots, grouped repositories, and safe external links.
- [ ] Add `/projects/:slug` detail routes with complete descriptions and verified evidence; show three featured cases before a compact archive. Do not remove details behind description clamping.
- [ ] Verify direct navigation, disabled Projects settings, loading/error/retry states, and mobile reading. Publish only completed, verified content.
- [ ] Review and commit independently.

### Task 3.3: Build the recruiter home and skill evidence

- [ ] Show target role, concise capability summary, View Projects, Download Résumé, and Contact actions immediately, gated by known settings.
- [ ] Implement résumé download on explicit interaction using the validated API and owned Blob URL lifecycle; expose sending/loading/error/retry state and abort on unmount. Avoid downloading the PDF on every Home visit.
- [ ] Replace randomized skills with a stable curated selection linked to project evidence; remove pointer/button treatment from remaining noninteractive skill tiles.
- [ ] Choose hero image scale and identity treatment using the confirmed brand preference. Publish location/work preferences only when verified.
- [ ] Verify disabled settings, résumé failures, stable skill selection, and keyboard/mobile access. Review and commit.

**Phase exit:** recruiters can assess three credible projects, identify your contribution, and reach résumé/contact from Home with minimal effort.

## Phase 4 — Performance and metadata

**Files:** `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, assets, `vite.config.ts` as needed; create `src/components/PageMetadata.tsx` and route metadata tests.

### Task 4.1: Reduce initial downloads

- [ ] Record production baseline: entry JavaScript gzip size, image bytes, font requests, and cold-load network timing on Home and a direct project link.
- [ ] Lazy-load secondary routes with an accessible Suspense/loading boundary. Optimize the hero asset into appropriately sized modern image variants and request only font styles/weights actually used in English and Thai.
- [ ] Verify nested direct routes, loading focus, font glyphs, and failures. Compare production artifacts and network requests. Aim below the current 170.22 kB gzip entry bundle and 286.43 kB image; use measured results rather than a guessed score.
- [ ] Review and commit independently.

### Task 4.2: Add route metadata and useful unknown-route handling

- [ ] Add descriptive page titles, descriptions, canonical URLs, Open Graph/Twitter fields, and a meaningful unknown-project/unknown-page state with recovery links.
- [ ] Test title updates on route/language changes, unknown slugs, URL construction, and correct analytics page titles without duplicate page views.
- [ ] Inspect built HTML and explain the remaining limitation: client-updated metadata is not sufficient for every preview crawler. Phase 5 supplies prerendered pages.
- [ ] Review and commit independently.

**Phase exit:** initial downloads measurably improve and page/analytics titles are useful; dynamic preview limitations are documented until Phase 5.

## Phase 5 — Resilient publishing and complete bilingual content

This is an architectural phase. Create a separate publishing spec and implementation plan before changing CI or caching. Public snapshots can preserve material that an administrator intended to remove, so their validity/revocation policy is part of the feature itself.

**File map:** proposed public `scripts/build-public-snapshot.mjs`, `src/lib/publicSnapshot.ts`, generated public snapshot, prerender script, `vite.config.ts`, public CI/deploy workflows; API project/experience/about schemas and serializers; corresponding admin locale editors. Keep public artifacts separate from private admin/API configuration.

### Task 5.1: Define and build versioned public snapshots

- [ ] Define schema version, publication timestamp, allowed public fields, freshness limit, and revocation behavior. Explicitly decide whether emergency removal requires a new deployment or online authority; do not promise instantaneous removal from an offline artifact.
- [ ] Build snapshots from validated public responses and an explicit publication manifest. Exclude contact submissions, secrets, private source information, and disabled sections.
- [ ] Add tests for offline startup, stale snapshots, incompatible versions, explicit live 403 responses, and missing/corrupt files. A live confirmed disabled response must override cached content.
- [ ] Show live/published-snapshot/unavailable states accurately. Never submit contact via an offline queue without a separate product decision.
- [ ] Verify deterministic generation, CI failure behavior, rollback, and removal procedure; review and commit.

### Task 5.2: Complete content localization and prerendering

- [ ] Add a backward-compatible locale model and admin editing for project/experience content; define English fallback for missing Thai content. Preserve existing identifiers and links when languages change.
- [ ] Add contract, editor round-trip, and public rendering tests for both complete and partially translated records.
- [ ] Prerender Home and published case studies from the validated publication artifact with useful metadata in HTML before JavaScript executes. Define locale URLs, canonical/alternate links, sitemap entries, and static-host deep-link behavior in the publishing spec.
- [ ] Test preview HTML without JavaScript, route refresh, API outages, language links, and disabled publication behavior. Review and commit.

**Phase exit:** approved public content remains useful during a defined outage window, full bilingual content can be maintained, and published pages have crawler-readable previews.

## Phase 6 — Release verification and measurement

- [ ] Run unit, lint, build, contract, and E2E typechecks in every changed repository. Run API tests and compatibility generation checks for changed contracts.
- [ ] Restore a reproducible default Chromium production-preview test run; diagnose the earlier stalled attempt rather than treating the alternate Edge development run as equivalent. Keep Edge as an additional check where supported.
- [ ] Extend browser checks to first-visit settings recovery, preference reload, early visible focus, reduced motion, short landscape menus, long translated content, grouped cases, valid/invalid résumé, and published-snapshot behavior.
- [ ] Verify real production fonts and static-host direct routes; inspect mobile screenshots, contrast/focus, and PDFs in target mobile browsers. Test contact with intercepted requests, then use only an explicitly authorized real submission if required for delivery verification.
- [ ] Record production performance and verify analytics events for project detail, résumé, and contact intent without collecting message content or email addresses.
- [ ] Prepare release notes, per-repository rollout order, rollback instructions, and known limitations. Roll out API changes before dependent clients; regenerate snapshots after content changes. Use the current CI gate and chosen hosting workflow.

**Phase exit:** production artifacts, publishing policy, compatibility, and recruiter journeys are verified. Any observed follow-up improvements go into a separate backlog.

## Coverage of the audit

| Audit item | Owning task |
|---|---|
| Settings failure / initial outage | 1.1; publishing extension 5.1 |
| Language persistence / hardcoded UI labels | 1.2 |
| Invisible home actions / reduced motion | 2.1 |
| Landscape menu / active navigation | 2.2 |
| Contrast / mobile padding | 2.3 |
| Bundled URL / résumé Blob validation | 1.3 |
| Case studies / repository grouping / archive | 3.1–3.2 |
| Recruiter actions / curated evidence / identity | 3.3 |
| Initial bundle / image / font sizes | 4.1 |
| Metadata / sharing / prerendering | 4.2; 5.2 |
| Versioned snapshots / revocation | 5.1 |
| Full bilingual project and experience content | 5.2 |
| Regression coverage / production checks | Owning task plus Phase 6 |

## Execution handoff

Recommended approach: execute natively, one task and reviewable commit at a time, starting with Task 1.1. Review each architectural design before proceeding into Phases 3 and 5. The user has requested a phased plan; implementation and deployment are not started by this document. Delegation remains available if the user selects it.
