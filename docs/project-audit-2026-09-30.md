# Portfolio audit — 30 September 2026

Goal: help recruiters assess the owner's work quickly.

Scope: the public React/Vite portfolio in `D:/Coding/mrwinrock`. Reviewed its routing, API boundary, settings, contact, résumé, translations, page composition, and tests. Inspected selected sibling API contracts and schemas to understand integration behavior. This is not a complete backend/admin review or a production security audit. No product code was changed.

## Confirmed bugs and usability defects

### 1. Initial settings failure hides all sections (P1)

Sources: `src/contexts/SettingsContext.tsx:9`, `:31`, `:36`; `src/contexts/settingsConstants.ts:4`; `src/components/SectionGuard.tsx:8`.

The provider starts with all settings false. A failed initial request still clears `isInitialLoading` without exposing an error state. Navigation removes every section, and deep links show the same disabled notice used for an intentional administrator decision. A mocked 503 at `/api/settings` produced “This section is currently unavailable” on `/projects` with zero retry controls. The first scheduled automatic retry is 120 seconds after failure.

Recommendation: represent unknown/unavailable settings separately from confirmed disabled settings, provide immediate retry, and retain the last successful settings where available. Keep unpublished content protected; do not simply turn all flags on after failure.

### 2. Language preference is lost on reload (P2)

Source: `src/i18n.ts:50`.

Explicit `lng: 'en'` overrides the configured language detector. Reproduction: switch to Thai, reload, and observe `<html lang="en">`. Browser-language preference is also bypassed.

Recommendation: let detection choose the supported language, use English as fallback, and test persistence and initial Thai-language visits.

### 3. Home introduction and actions are hidden during typing (P2)

Sources: `src/components/pages/home/Home.tsx:61`, `:71`, `:151`.

The English name takes more than two seconds to complete; the introduction then has an additional delayed fade. At 700 ms the CTA ancestor had opacity zero, while the View My Work link could still receive keyboard focus. This creates an invisible focus destination and delays the recruiter's first useful information. Switching language repeats the sequence.

Recommendation: show the role, introduction, and actions immediately; make the name effect decorative, with a stable accessible name. Never make content availability depend on animation completion.

### 4. Reduced motion only covers CSS animations (P2)

Sources: `src/index.css:152`; `src/components/pages/home/Home.tsx:71`; `src/components/cards/SpotLightCard.tsx:42`.

The CSS media query reduces CSS animation/transition durations, but there is no Motion configuration or reduced-motion hook, and the JavaScript typing timer still runs. With reduced motion enabled, the name was still partial and the CTA opacity was zero at 600 ms. The existing reduced-motion browser test only checks a navbar CSS transition.

Recommendation: apply reduced-motion behavior to Motion components and bypass the typing delay. Test visible content, transforms, and timers in addition to CSS duration.

### 5. Mobile menu fails in short viewports and ignores Escape (P2)

Source: `src/components/Navbar.tsx:62`.

The fixed navbar disclosure has `max-h-screen` without a scrolling region that accounts for the header. At 390×390, the Resume link occupied y=452–496, entirely below the viewport. Pressing Escape also left the disclosure open.

Recommendation: constrain the menu to the available viewport height, allow internal scrolling, close on Escape, and return focus to its toggle. Cover landscape phones and browser zoom.

### 6. Text contrast failures (P2)

Sources: `src/components/pages/contact/Contact.tsx:232`; `src/components/Footer.tsx:26`.

Local axe checks found the contact response note at 2.96:1 and footer technology text at 3.56:1, below the tool's expected 4.5:1 for normal text. These are measured text failures; gradient text and button backgrounds need additional manual checking.

Recommendation: brighten secondary text and verify readable gradient/button colors across their full backgrounds.

### 7. Portfolio project reports its live site unavailable (P2)

Sources: `src/data/projects.ts:15`; `src/lib/safeExternalUrl.ts:7`; `src/components/pages/projects/ProjectActions.tsx:14`.

The bundled portfolio project stores `url: '/'`, while the action helper accepts only absolute HTTPS URLs. When projects fall back to bundled data, its live action becomes “Not Available.” This was reproduced in the browser.

Recommendation: store the canonical absolute HTTPS URL, or provide an explicitly validated internal-link path. Preserve unsafe-scheme rejection.

## Recruiter-focused features and UI improvements

1. **Feature three substantial case studies.** Show a screenshot, the problem, your contribution, architecture, one difficult decision, and a verified result. Add a detail page so the current three-line description clamp does not hide useful evidence. Do not invent metrics or client endorsements.
2. **Group related repositories into one project.** InfoXP and ChadChat currently occupy separate frontend, mobile, and backend cards. One case study with clearly labeled repository links better communicates full-stack ownership. Put experiments and older projects in a secondary archive.
3. **Create a direct recruiter path on Home.** Add visible View Projects, Download Résumé, and Contact actions; include target roles, Bangkok/location preferences, and availability only when confirmed. Replace generic claims with a concise statement of the problems you can solve.
4. **Curate skills and connect them to evidence.** Home currently selects random technologies from fixed categories. Use a stable selection of strongest relevant skills, each linked to a case study or experience. Avoid self-assigned percentage bars. Skill tiles currently look clickable but have no action; give them an action or remove the pointer/button styling.
5. **Improve navigation hierarchy.** Every desktop destination has the same outlined-button treatment, with no visual active-page styling despite NavLink providing `aria-current`. Use simpler navigation links, a visible current-page state, and one emphasized résumé/contact action. A recruiter should identify the current page at a glance.
6. **Use mobile spacing deliberately.** At 390 px the Projects grid is 294 px wide after the main and page padding; cards add another 64 px of horizontal padding. Contact uses the same nested spacing. Reduce mobile padding, retain comfortable action targets, and use a compact project archive. The 20-card bundled project page measured 7,856 px tall.
7. **Strengthen personal identity.** The home hero devotes substantial space to a skull illustration. If comfortable, a professional photo or a smaller brand illustration alongside project imagery may communicate identity and work more directly. This is an editorial choice, not a functional defect.
8. **Add shareable page metadata.** All routes retain the title “MrWinRock”; `index.html` has no description, Open Graph, or Twitter metadata. Give projects descriptive titles and previews. Use prerendered/static public content if reliable previews and first-load availability are goals. Browser-only metadata changes do not guarantee social crawlers will render it.

## Engineering enhancements

- **Reduce initial downloads.** All pages are imported eagerly in App. The build emitted 524.87 kB of JavaScript (170.22 kB gzip) and a 286.43 kB JPG, with Vite's chunk warning. Split routes, resize/compress the hero asset, and request only needed font weights/styles. Measure after changes; bundle size alone is not a user performance score.
- **Protect the first visit from API outages.** Most core routes cannot show useful content without settings and live data. Consider publishing a versioned public snapshot at build time, with clear freshness semantics and deliberate handling of disabled sections. This needs a content/privacy design across public site, API, and admin.
- **Extend regression coverage where behavior failed.** Add initial-settings failure/recovery, language reload, invisible focus, true reduced motion, landscape menu access, contrast, and bundled live-link checks. Existing smoke tests exercise a narrow set of viewport sizes and mocked responses.
- **Improve résumé boundary validation.** `validateResume` accepts any Blob, not specifically a PDF. JSON error blobs receive separate handling, but a successful HTML/non-PDF response could still produce a broken viewer and a `.pdf` download. Treat this as a robustness gap rather than an observed production failure.
- **Finish localization.** Footer “and,” GitHub action titles, and experience type badges remain English in Thai mode; project/experience APIs have no language argument. Make the bilingual content scope explicit before adding API fields.

## Suggested order

1. Correct settings error state, language persistence, invisible CTA focus, and reduced motion.
2. Repair short-screen navigation, contrast, and the bundled live-site link.
3. Publish three featured case studies and add prominent résumé/contact actions.
4. Refine mobile spacing/navigation, split routes, and improve metadata.
5. Extend snapshots and richer bilingual content if needed.

## Verification and limits

- Vitest: 22 files, 71 tests passed.
- ESLint and production TypeScript/Vite build passed; build emitted a chunk-size warning.
- OpenAPI contract check against the sibling artifact, contract typecheck, and E2E typecheck passed.
- All 8 existing Playwright tests passed using installed Edge with a temporary configuration and the local Vite development server. API traffic was intercepted; no contact messages were sent.
- The default Chromium test attempt marked tests failed immediately and then stalled; it was interrupted. Do not interpret the Edge result as a successful default Chromium/production-preview run.
- Additional Edge probes reproduced the defects above; axe checked Projects and Contact for selected WCAG A/AA rules. This is not a complete accessibility certification.
- External requests, including analytics and Google Fonts, were blocked during the custom browser probes. Screenshots therefore use fallback fonts, and live infrastructure/content, font-dependent layout, WebKit/Firefox, real mobile PDF support, and production analytics were not verified.

Screenshots are available in the chat visualization directory: `audit-home-desktop.png`, `audit-contact-mobile.png`, and `audit-settings-failure.png`. Long full-page project captures can include offscreen animation artifacts; use the measured page/card dimensions above for layout conclusions.
