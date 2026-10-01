# Execution ledger — 2026-09-30-portfolio-enhancement-roadmap.md

Authorization: user requested “build all”. Execute across the public, API, and admin checkouts. These are existing dev branches, with no tracked changes at start. Preserve the untracked audit/roadmap and backend local configuration files. Keep changes reviewable in the existing sibling checkouts; do not publish or alter production content automatically.

Design decisions: retain the dark cyan/violet brand and skull identity; make project evidence and recruiter actions the visual priority. Extend project metadata additively and keep legacy records supported. Authoring controls ship without inventing unverified case-study outcomes or screenshots. Translation uses optional per-record Thai content with English base fields. Static publishing uses an explicit manifest, timestamp/expiry, and rebuild-based revocation; online 403 always wins over cached content.

Preflight: Phase 1 context additions require updating test providers. Phase 3 adds API-owned fields before regenerating both clients. Phase 4 routes feed Phase 5 prerendering. Phase 5 static artifacts cannot guarantee immediate offline revocation; document the deployment requirement and make caching opt-in.

Task status: implementation and local verification complete. Changes remain reviewable in the three existing checkouts; no commit, push, database migration, content write, or production deployment was performed.

| Phase | Delivered | Remaining content or release work |
|---|---|---|
| 1 | Distinct initial settings outage/retry, retained successful settings, persistent language, corrected live URL, validated PDF signature/MIME | None in local implementation |
| 2 | Immediate hero/actions, reduced-motion policy, keyboard/scrollable mobile navigation, responsive spacing and readable notices | Real mobile Safari/PDF viewer verification during release |
| 3 | Recruiter Home, stable skills linked to filtered projects, three featured project overviews, grouped repositories, detail routes, additive API/admin case-study editors, collision-safe slugs | Verified personal contributions, outcomes, and approved screenshots must be authored; no fabricated claims were added |
| 4 | Lazy secondary routes, smaller images/fonts, page titles/descriptions/canonical/social metadata, 404/project recovery | None in local implementation |
| 5 | Explicit opt-in manifest, versioned/expiring snapshot generation, recursive public allowlist, runtime authorization, live 403 precedence, bilingual editors/fallback, Home/project prerendering, sitemap and language alternates | Publication starts disabled; choose approved content, generate and deploy before offline snapshots or static case studies become public |
| 6 | Three-suite verification, both production browser engines, responsive/axe QA, intent-only interaction analytics, release and rollback documentation | Hosted CI/production rollout remains to be run |

Confirmed content decisions: Home and README say Full-Stack Developer and Computer Science graduate. Carbon Footprint is a public website link only, with no company screenshots, descriptions of internal work, or contribution claims. InfoXP, Stringy, and ChadChat remain featured. English and Thai interface copy is complete; content translation fields are optional and retain English evidence when absent.

Final evidence:

- Public: 90 tests in 27 files pass; lint, build, generated contract, contract typecheck, and E2E typecheck pass.
- Admin: 66 tests in 21 files pass; lint/build/contract and E2E typechecks pass. Includes actual editor save preservation of existing English and Thai evidence.
- API: 303 tests in 31 files pass; typecheck and deterministic OpenAPI check pass. Candidate contract is compatible with `HEAD:docs/openapi.json`.
- Production-preview browser suite: 16 Edge checks and 16 Chromium checks pass, both runners exit 0. Chromium required sandbox escalation to launch the cached executable; the earlier launch failure was `spawn EPERM`. Windows teardown hang was fixed by owning a direct Node preview server instead of asking Playwright to terminate a shell process tree.
- Visual QA: 50 route/locale/viewport combinations at 320, 390, 768, 1024, and 1440 px have no horizontal overflow. Five representative screenshots have no axe WCAG A/AA findings, with real production fonts loaded. This does not assert universal accessibility or physical mobile-device coverage.
- Publishing integration verifies nested field stripping, approved slug selection, companion repository grouping, exclusion of company details, bilingual static HTML, canonical/alternate links, and disabled-manifest revocation. Resource regressions confirm a live 403 suppresses snapshot and bundled fallback.
- Fresh read-only review found eight concrete integration/privacy bugs; all were fixed and the reviewer verified no identified important issue remains unresolved.
- Performance: entry JS gzip 170.22 → 126.10 kB (about 26% smaller); hero asset 286.43 → 5.52 kB (about 98% smaller). This measures artifacts rather than claiming a Lighthouse score.

Local runtime is installed Bun 1.4.2; the repository and CI remain pinned to Bun 1.3.13. Hosted CI on that pinned runtime has not been executed here. Admin build retains an existing local `.env` NODE_ENV warning without changing private configuration.

Rollout order: publish the additive API contract first, then regenerate and release admin/public clients. Author verified case-study and Thai content through admin. Enable only approved manifest sections/slugs, generate a snapshot, rebuild and deploy. Keep the previous clients/artifact for rollback. To revoke, disable/remove manifest entries and replace hosted artifacts; previously downloaded offline copies cannot be recalled. See [publishing instructions](../../public-publishing.md).

The roadmap's historical commit checkboxes remain unchecked because this delivery leaves local changes for review. Deployment and stronger evidence content are explicit follow-up work, not implied by passing local checks.

Follow-up handoff: the user authorized committing all implementation changes to the existing development branches and starting the applications locally. Fresh suites again passed (public 90, admin 66, API 303). API changes are committed on `dev` as `afc5535`; admin changes are committed on `dev` as `d7a0167`. The public changes are being committed on its existing `dev` branch. Local testing uses an isolated database; pre-existing private environment and local tool configuration files are excluded from commits. No remote push or production deployment is part of this handoff.
