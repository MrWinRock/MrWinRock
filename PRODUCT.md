# MrWinRock Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Recruiters and potential clients are equally important audiences, confirmed by the owner during init.
- Recruiters need to assess development skills, inspect project evidence, access the résumé, and make contact about opportunities.
- Potential clients need to understand relevant capabilities, explore comparable projects, and make contact about their needs.
- Support visitors reading English or Thai on desktop and mobile browsers.

## Product Purpose

MrWinRock is the public developer portfolio of Pharthiwath Gristsoopharruth, a full-stack developer based in Bangkok with an interest in cybersecurity.

Help visitors understand the developer's capabilities through verifiable work and reach an informed next step: résumé review, interview contact, or a project inquiry. No numerical conversion target is established.

## Positioning

Present personal web, mobile, and backend work through published project evidence and repositories. Optional project matching helps visitors relate their own ideas to existing work. An optional contact-brief review helps visitors articulate their needs.

Do not imply cybersecurity certification, guaranteed security, commercial results, or unique market superiority without supporting evidence.

## Operating Context

- Public routes cover Home, About, Skills, Projects, individual project overviews, Experience, Contact, and Résumé.
- Visitors can filter projects by technology, inspect available contribution and technical-decision evidence, and follow available repository or live-site links.
- English and Thai interface copy is maintained in `src/locales/`. Optional translated content retains English evidence when a Thai field is absent.
- This checkout is the public React/TypeScript/Vite client. The sibling `../mrwinrock-app` owns the API contract; `../admin-mrwinrock` manages content. This product record covers the public portfolio, not the sibling applications.
- Local development uses `bun run dev`. Repository documentation pins Bun 1.3.13 and describes the API-origin configuration in `README.md`.

## Capabilities and Constraints

- Preserve English and Thai support, verifiable personal project evidence, and company work shown only as approved public website links.
- Company links come only from successful live API responses. Do not expose internal company work, contribution claims, repositories, screenshots, or case-study details. Bundled data and snapshots do not supply company work.
- API-owned section visibility controls public destinations and content. Explicit disabled responses suppress fallback; disabled deep links retain their URLs and explain their state.
- Represent loading, empty, unavailable, disabled, rate-limited, retry, and fallback states honestly. Do not substitute invented biography or experience when data is unavailable.
- Static content publishing and outage snapshots require explicit approval through the publication manifest. Preserve expiry, revocation, and live-visibility rules documented in `docs/public-publishing.md`.
- Project matching sends the visitor's query to an AI service through the backend, discloses this use, and labels keyword fallback.
- Contact-brief review is optional, sends only the message, and never edits or submits the draft automatically. Normal contact submission remains available if review fails.
- Keep contact input on delivery failure and clear it only after accepted delivery. Never cache or queue contact submissions or résumé files.
- Generate `src/generated/openapi.ts` from the sibling API's OpenAPI artifact; do not edit generated contract types manually. Keep secrets out of browser configuration.

## Brand Commitments

- Preserve the MrWinRock name and existing skull identity, confirmed by the owner during init.
- Keep dark surfaces and gradients, explicitly required by the owner for the portfolio redesign on 2026-10-26.
- Present Pharthiwath as a full-stack developer with an interest in cybersecurity.
- Keep public claims factual and grounded in published personal work. No additional voice or aesthetic direction was selected during init.

## Evidence on Hand

- `README.md`, `src/locales/en.json`, and `src/locales/th.json` contain identity, biography, and interface copy. The current Home introduction describes a Computer Science graduate; older education copy contains a conflicting present-tense study description. Confirm current education details before reusing that older copy.
- `src/data/projects.ts` contains bundled personal project records. Existing project notes identify InfoXP, Stringy, and ChadChat as featured work; published API content and visibility remain authoritative.
- `src/components/pages/projects/` implements project overviews, available case-study fields, repository actions, and matching evidence.
- Existing skull assets include `src/assets/logo.webp`, `public/logo.jpg`, and `public/logo-small.webp`.
- `public/Pharthiwath_Gristsoopharruth_Resume.pdf` is a repository résumé asset; the live résumé workflow uses the API. Verify currency before treating either as current evidence.
- `docs/public-publishing.md` records public-content restrictions and publication behavior. `tests/` contains API, localization, accessibility, form, and browser coverage; historical test reports do not establish the current build's status.
- Verified contributions, outcomes, screenshots, testimonials, and performance claims must come from actual approved evidence. Their presence in a schema or test fixture is not evidence that they are true.

## Product Principles

1. Give recruiters and potential clients equal consideration in product decisions.
2. Make demonstrated capabilities and relevant personal work easy to assess.
3. Preserve publication boundaries and distinguish evidence from inference.
4. Keep the bilingual core journey useful during partial failures and make recovery clear.
5. Keep optional AI assistance transparent and under visitor control.

## Accessibility & Inclusion

Preserve the existing keyboard navigation, visible focus, skip link, document-language updates, reduced-motion behavior, responsive layouts, and accessible form and resource feedback. Keep essential content and actions available without waiting for decorative animation.

No additional audience-specific accessibility requirement or formal conformance target was established during init.
