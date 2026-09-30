# Public publishing

The default build prerenders the verified Home introduction in English and Thai and writes a sitemap. Project prerendering and offline API fallback are opt-in: `src/data/publication.json` starts disabled to preserve administrator visibility decisions.

To publish approved content, set `enabled: true`, choose section flags and exact project slugs in the manifest, then run `bun run snapshot:generate -- --source <public-source.json>` and `bun run build`. The source contains `projects`, `skills`, `experiences`, and bilingual `about`, following the public API contract. Omitting `--source` uses bundled projects/skills; About and Experience require explicit source content. Use public exports only, never private database/admin exports.

Snapshots expire after `maxAgeHours` (1–168; default 72). New settings/content request failures can use a fresh snapshot, labeled Published content. An explicit live section-disabled 403 suppresses fallback. Contact POSTs and résumé files are never cached or queued.

Revocation requires removing/disabling the manifest entry, rebuilding, and redeploying. Both runtime fallback and prerendering apply the current manifest; regenerate the snapshot when publishing a revised selection. Already downloaded artifacts cannot be revoked instantaneously offline. Expired artifacts stop supplying fallback on new requests. Prerendered HTML stays public until replaced by deployment; expiry does not retract hosted HTML. Emergency removal must replace/purge hosting artifacts.

Deploy API schema support first, regenerate public/admin types, then deploy clients. Existing project/experience records remain valid. Roll back clients before removing API fields; no destructive database migration is needed.

Browser tests use installed Edge on Windows and Chromium in Linux CI; `PLAYWRIGHT_BROWSER_CHANNEL` overrides the channel. Tests intercept contact requests.


Locale URLs are `/` and `/th/`, with project pages under `/projects/<slug>/` and `/th/projects/<slug>/`. Prerendered pages contain canonical and language alternate links, localized titles and evidence, and corresponding sitemap entries. English evidence remains when a Thai field is absent. Selecting English from a Thai URL returns to the matching English route, preserving query and hash. Unpublished deep routes use the existing GitHub Pages 404 redirect, so they require JavaScript; published case-study directories serve their HTML directly.

Snapshot generation validates required fields and optional scalar fields, recursively exports only the public allowlist, groups companion repositories, and excludes company-project records. Carbon Footprint appears only as its separately defined public website link in the React Projects page. `SOURCE_DATE_EPOCH` can fix the generation timestamp for reproducibility. Generation fails before writing if the manifest or source is invalid. Builds validate the artifact again and omit expired, revoked, or incompatible snapshots.

The browser runner owns a direct Node preview process and stops only that process when tests finish. This avoids Windows shell-tree teardown hangs. To inspect layout with installed browsers and real fonts, start a built preview and run `node scripts/visual-check.mjs --url http://127.0.0.1:4173 --output test-results/visual`. Interaction analytics emit only `project_open` with a validated slug, `resume_download`, and `contact_intent`; they do not include form fields or contact addresses.
