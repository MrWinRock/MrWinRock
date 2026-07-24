# Public Settings Initialization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure disabled public sections never render before the browser has loaded the admin-controlled settings.

**Architecture:** Keep the settings value fail-closed while the initial request is pending or fails, and expose an initial-loading flag through the settings context. Gate mounting of the public navigation and routes on that flag so route evaluation happens only after settings resolve; continue the existing refresh polling unchanged.

**Tech Stack:** React 19, TypeScript, React Router 7, Axios, Vite, ESLint.

## Global Constraints

- Do not change the backend API, encryption format, or the 403 section guard.
- A failed initial settings request must hide all configurable public sections.
- Preserve direct links by waiting to mount routes, rather than redirecting while settings are unknown.
- Do not add a test framework solely for this small UI-state change; this frontend currently has lint and build verification only.

---

### Task 1: Fail-closed settings initialization and public-app gate

**Files:**
- Modify: `src/contexts/settingsConstants.ts`
- Modify: `src/contexts/SettingsContext.tsx`
- Modify: `src/contexts/useSettings.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/pages/home/Home.tsx`

**Interfaces:**
- Consumes: `api.settings(): Promise<SettingsResponse>` from `src/lib/api.ts`.
- Produces: `useSettings(): { settings: SettingsDoc; isInitialLoading: boolean }`.
- Produces: an app that renders its routes only when `isInitialLoading` is `false`.

- [ ] **Step 1: Confirm the current failure**

Run the production build after checking that `SETTINGS_DEFAULTS` sets `showResume` and `showContact` to `true` and that `SettingsProvider` begins from those defaults:

```powershell
rg -n "SETTINGS_DEFAULTS|useState<SettingsDoc>|showResume|showContact" src/contexts
bun run build
```

Expected: the source shows all-true defaults and the pre-change build succeeds.

- [ ] **Step 2: Implement the fail-closed context value**

Replace the context's exposed value with an object that carries both settings and loading state. Use an all-false fallback while the first `api.settings()` call is pending or throws, and set `isInitialLoading` to `false` in the request's `finally` block. Keep the existing focus and interval refreshes; successful later responses replace the fallback.

```ts
export const HIDDEN_SETTINGS: SettingsDoc = {
    showAbout: false,
    showSkills: false,
    showProjects: false,
    showExperience: false,
    showResume: false,
    showContact: false,
};

export interface SettingsContextValue {
    settings: SettingsDoc;
    isInitialLoading: boolean;
}
```

- [ ] **Step 3: Gate routing and update consumers**

In `App`, return a semantic loading shell while `isInitialLoading` is true, before rendering `Navbar`, `Routes`, or the page components. Update `Navbar` and `Home` to read `settings` from the new context value.

```tsx
const { settings, isInitialLoading } = useSettings();

if (isInitialLoading) {
  return <div className="min-h-screen" role="status">Loading site…</div>;
}
```

Use `settings.showResume` and `settings.showContact` for the existing conditional navigation and route entries. Do not change the API calls in the Resume or Contact pages.

- [ ] **Step 4: Verify static behavior**

Run the full frontend verification suite:

```powershell
bun run lint
bun run build
```

Expected: both commands exit with status 0. The build must complete without TypeScript errors caused by the revised `useSettings()` value.

- [ ] **Step 5: Commit the implementation**

```powershell
git add src/contexts/settingsConstants.ts src/contexts/SettingsContext.tsx src/contexts/useSettings.ts src/App.tsx src/components/Navbar.tsx src/components/pages/home/Home.tsx
git commit -m "fix: wait for public settings before rendering routes"
```
