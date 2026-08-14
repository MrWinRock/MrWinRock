# Platform Foundation Hardening — Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the public portfolio with the API-owned contract, remove AES, and give every network-backed experience a clear, accessible loading, live, empty, cached, unavailable, rate-limited, and retry state while preserving the current violet/cyan identity.

**Architecture:** A generated OpenAPI type module feeds a narrow typed API façade. The façade normalizes all failures into safe ApiError values, supports AbortSignal, deduplicates reads, and exposes ETag-aware settings. Reusable state hooks and accessible notices drive page UX. Vitest covers units/components; Playwright covers desktop/mobile keyboard smoke.

**Tech Stack:** React 19, TypeScript, Vite 7, Axios, Tailwind CSS 4, Motion, i18next, Vitest, React Testing Library, axe-core, openapi-typescript, Playwright.

## Global Constraints

- Work only on branch dev in D:\Coding\mrwinrock. Do not create, switch, merge, push, or deploy branches.
- Begin only after the API plan has committed D:\Coding\mrwinrock-app\docs\openapi.json on API dev.
- Treat that OpenAPI artifact as the sole request/response type source.
- Keep all existing routes, successful user flows, and violet/cyan visual identity.
- Remove browser-side AES and VITE_RESPONSE_ENCRYPTION_KEY completely.
- Do not expose raw server bodies, provider messages, stack traces, or configuration details.
- Use Bun for all plan commands and update bun.lock. Leave the existing package-lock.json untouched because lockfile-policy cleanup was not part of the approved design.
- Do not edit ignored local .env files. Remove obsolete deployment configuration only from tracked files.
- Use tests first for every behavior change and commit only the current task files.
- Before visual implementation in Tasks 5–8, invoke frontend-design and preserve the approved design direction.

## Consumed API contract

- Source: D:\Coding\mrwinrock-app\docs\openapi.json
- Generated output: src/generated/openapi.ts
- Public paths: /health, /fish, /api/about, /api/skills, /api/projects, /api/experiences, /api/contact, /api/resume, /api/settings
- Error envelope: { ok: false, error: string, details?: { fieldErrors, formErrors } }
- Settings supports ETag/If-None-Match and empty 304.
- Rate limiting exposes Retry-After and rate-limit headers.

---

### Task 1: Add the Vitest and generated-contract foundation

**Files**

- Modify: package.json
- Modify: bun.lock
- Create: vitest.config.ts
- Create: tests/setup.ts
- Create: tests/helpers/renderPublic.tsx
- Modify: tests/settingsConstants.test.ts
- Create: tsconfig.contract.json
- Create: scripts/generate-openapi-types.mjs
- Create: src/generated/openapi.ts
- Create: tests/contract.types.ts

**Dependencies**

- Add dev dependencies: openapi-typescript, vitest, jsdom, @testing-library/dom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, axe-core.
- Remove runtime dependencies @types/axios and @types/react-router-dom; Axios and React Router include their own current types.

**Interfaces**

- Consumes: D:\Coding\mrwinrock-app\docs\openapi.json.
- Produces: src/generated/openapi.ts, semantic contract checking, and the Vitest/jsdom harness.

~~~tsx
const ALL_SECTIONS_ENABLED: SettingsDoc = {
  showAbout: true,
  showSkills: true,
  showProjects: true,
  showExperience: true,
  showResume: true,
  showContact: true,
};

export function renderPublic(
  ui: ReactElement,
  options?: {
    route?: string;
    settings?: SettingsDoc;
  },
) {
  return render(
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={{
        settings: options?.settings ?? ALL_SECTIONS_ENABLED,
        isInitialLoading: false,
      }}>
        <MemoryRouter initialEntries={[options?.route ?? "/"]}>
          {ui}
        </MemoryRouter>
      </SettingsContext.Provider>
    </I18nextProvider>,
  );
}
~~~

**Scripts**

~~~json
{
  "test": "vitest",
  "test:run": "vitest run",
  "typecheck:contract": "tsc -p tsconfig.contract.json --noEmit",
  "contract:generate": "node scripts/generate-openapi-types.mjs",
  "contract:check": "node scripts/generate-openapi-types.mjs --check"
}
~~~

- [ ] Install the test/type-generation dependencies and configure Vitest with jsdom plus exclude: ["tests/e2e/**"]. This is harness setup, not the behavioral RED step.

~~~powershell
bun install
~~~

- [ ] Convert the existing Bun test import to Vitest and add a failing semantic type test. tsconfig.contract.json includes only this declaration test and src/generated/openapi.ts, and extends tsconfig.app.json.

~~~ts
import type { paths } from "@/generated/openapi";

type RequiredPublicPath =
  | "/"
  | "/health"
  | "/fish"
  | "/api/health"
  | "/api/health/ready"
  | "/api/about"
  | "/api/skills"
  | "/api/projects"
  | "/api/experiences"
  | "/api/contact"
  | "/api/resume"
  | "/api/settings";

type MissingPath = Exclude<RequiredPublicPath, keyof paths>;
export const contractIsComplete:
  MissingPath extends never ? true : false = true;
~~~

- [ ] Run and confirm RED with Cannot find module '@/generated/openapi' because the generated file does not exist.

~~~powershell
bun run typecheck:contract
~~~

- [ ] Implement the generator with openapi-typescript's Node API. Default input is ..\mrwinrock-app\docs\openapi.json; allow one explicit input path. In --check mode compare generated bytes without writing.
- [ ] Generate with an ESLint-safe header and byte comparison:

~~~js
const header = [
  "/* eslint-disable */",
  "/** Generated from mrwinrock-app/docs/openapi.json. Do not edit. */",
  "",
].join("\n");
const ast = await openapiTS(pathToFileURL(inputPath));
const output = header + astToString(ast);
if (check && output !== await readFile(outputPath, "utf8")) process.exitCode = 1;
else if (!check) await writeFile(outputPath, output);
~~~

- [ ] Configure jsdom, jest-dom, cleanup, and stable URL/ResizeObserver test shims. Do not hand-edit src/generated/openapi.ts.
- [ ] Generate the contract and run tests/build; confirm GREEN.

~~~powershell
bun install
bun run contract:generate -- ..\mrwinrock-app\docs\openapi.json
bun run contract:check -- ..\mrwinrock-app\docs\openapi.json
bun run typecheck:contract
bun run test:run
bun run build
~~~

- [ ] Commit.

~~~powershell
git add package.json bun.lock vitest.config.ts tsconfig.contract.json tests/setup.ts tests/helpers/renderPublic.tsx tests/settingsConstants.test.ts tests/contract.types.ts scripts/generate-openapi-types.mjs src/generated/openapi.ts
git commit -m "test: add public contract and test foundation"
~~~

---

### Task 2: Remove AES and establish the typed safe API boundary

**Files**

- Delete: src/lib/responseEncryption.ts
- Modify: src/lib/api.ts
- Create: src/lib/apiTypes.ts
- Create: tests/helpers/axiosAdapter.ts
- Create: tests/api.client.test.ts
- Modify: src/components/pages/contact/Contact.tsx
- Modify: src/vite-env.d.ts
- Modify: .github/workflows/deploy.yml

**Generated aliases**

~~~ts
import type { paths } from "@/generated/openapi";

export type ProjectsResponse =
  paths["/api/projects"]["get"]["responses"][200]["content"]["application/json"];
export type ApiProject = ProjectsResponse["data"][number];
export type SkillsResponse =
  paths["/api/skills"]["get"]["responses"][200]["content"]["application/json"];
export type SettingsResponse =
  paths["/api/settings"]["get"]["responses"][200]["content"]["application/json"];
export type SettingsDoc = SettingsResponse["data"];
export type ContactInput =
  paths["/api/contact"]["post"]["requestBody"]["content"]["application/json"];

export type AboutResponse =
  paths["/api/about"]["get"]["responses"][200]["content"]["application/json"];
export type AboutDoc = AboutResponse["data"];
export type ApiSkill = SkillsResponse["data"][string]["skills"][number];
export type ApiSkillCategory = SkillsResponse["data"][string];
export type ApiExperience =
  paths["/api/experiences"]["get"]["responses"][200]["content"]["application/json"]["data"][number];
export type ExperiencesResponse =
  paths["/api/experiences"]["get"]["responses"][200]["content"]["application/json"];
export type ContactResponse =
  paths["/api/contact"]["post"]["responses"][200]["content"]["application/json"];
export type HealthResponse =
  paths["/health"]["get"]["responses"][200]["content"]["application/json"];
export type FishResponse =
  paths["/fish"]["get"]["responses"][200]["content"]["application/json"];
~~~

**Interfaces**

- Consumes: generated paths from Task 1 and AxiosAdapter.
- Produces:

~~~ts
export interface SafeValidationDetails {
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
}

export interface ApiErrorInit {
  status?: number;
  code: string;
  message: string;
  details?: SafeValidationDetails;
  retryAfterSeconds?: number;
  cancelled?: boolean;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: SafeValidationDetails;
  readonly retryAfterSeconds?: number;
  readonly cancelled: boolean;
  constructor(init: ApiErrorInit);
}

export interface ReadOptions {
  signal?: AbortSignal;
}

export interface MutationOptions {
  signal?: AbortSignal;
}

export type SettingsFetchResult =
  | { kind: "modified"; data: SettingsDoc; etag?: string }
  | { kind: "not-modified"; etag?: string };

export interface PublicApi {
  health(options?: ReadOptions): Promise<HealthResponse>;
  fish(options?: ReadOptions): Promise<FishResponse>;
  about(lang: "en" | "th", options?: ReadOptions): Promise<AboutResponse>;
  skills(options?: ReadOptions): Promise<SkillsResponse>;
  projects(options?: ReadOptions): Promise<ProjectsResponse>;
  experiences(options?: ReadOptions): Promise<ExperiencesResponse>;
  contact(input: ContactInput, options?: MutationOptions): Promise<ContactResponse>;
  resume(options?: ReadOptions): Promise<Blob>;
  settings(options?: ReadOptions & { etag?: string }): Promise<SettingsFetchResult>;
}

export function createApiClient(options?: {
  baseURL?: string;
  adapter?: AxiosAdapter;
}): PublicApi;

export const api: PublicApi;
~~~

src/lib/api.ts re-exports AboutDoc, ApiExperience, ApiProject, ApiSkill, ApiSkillCategory, ExperiencesResponse, ProjectsResponse, SettingsDoc, and SkillsResponse so current consumers compile during the migration.

- [ ] Write failing client tests for plaintext, 2xx application failure, malformed envelopes, safe HTTP errors, Retry-After, cancellation, and JSON errors returned as Blob.

~~~ts
it("rejects a 2xx application failure without retaining raw data", async () => {
  const client = createApiClient({
    baseURL: "https://api.test",
    adapter: jsonAdapter(200, {
      ok: false,
      error: "Temporarily unavailable",
      internal: "must-not-leak",
    }),
  });

  const request = client.projects();
  await expect(request).rejects.toMatchObject({
    status: 200,
    code: "application_error",
    message: "Temporarily unavailable",
  });
  await expect(request).rejects.not.toHaveProperty("body");
});

it("normalizes Retry-After seconds", async () => {
  const client = createApiClient({
    baseURL: "https://api.test",
    adapter: jsonAdapter(429, { ok: false, error: "Too many requests" }, {
      "retry-after": "12",
    }),
  });
  await expect(client.projects()).rejects.toMatchObject({
    status: 429,
    retryAfterSeconds: 12,
  });
});
~~~

The adapter helper is concrete and reusable:

~~~ts
export function jsonAdapter(
  status: number,
  data: unknown,
  headers: Record<string, string> = {},
): AxiosAdapter {
  return vi.fn(async config => ({
    config,
    data,
    headers: AxiosHeaders.from(headers),
    status,
    statusText: String(status),
  }));
}
~~~

- [ ] Run and confirm RED because the current client decrypts responses, retains raw bodies, and accepts ok:false.

~~~powershell
bunx vitest run tests/api.client.test.ts
~~~

- [ ] Keep the existing high-level method names: health, fish, about, skills, projects, experiences, contact, resume, settings.
- [ ] Derive all method inputs and outputs from src/generated/openapi.ts through apiTypes.ts.
- [ ] Parse each success mode explicitly: health uses its documented JSON shape; fish preserves standalone { fish: "<><" }; about/skills/projects/experiences/contact use the ok discriminator; resume accepts binary success; settings accepts an enveloped 200 or empty 304.
- [ ] Implement separate parsers rather than forcing binary/standalone routes through the envelope parser:

~~~ts
function parseEnvelope<T>(data: unknown): T {
  if (!isRecord(data) || typeof data.ok !== "boolean") {
    throw new ApiError({
      status: 200,
      code: "malformed_response",
      message: "The server returned an invalid response.",
    });
  }
  if (!data.ok) throw applicationError(200, data);
  return data as T;
}

function parseFish(data: unknown): FishResponse {
  if (!isRecord(data) || typeof data.fish !== "string") {
    throw malformedResponse();
  }
  return data as FishResponse;
}
~~~

- [ ] Throw code malformed_response for an invalid route-specific success and application_error for 2xx ok:false.
- [ ] Normalize status-based codes and safe copy. Retain only validated field/form details and Retry-After; never attach the raw response body.
- [ ] For resume errors, inspect application/json Blob content only to normalize the safe envelope.
- [ ] Remove the decrypt interceptor/module, Vite key type, and workflow key injection. Obsolete type packages were removed with the Task 1 dependency update.
- [ ] Update Contact's transitional call site to await api.contact directly and remove its manual new ApiError(200, ...) branch; the localized state redesign remains Task 7.
- [ ] Keep Accept: application/json and no custom encryption headers.
- [ ] Run focused tests, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/api.client.test.ts
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/lib/api.ts src/lib/apiTypes.ts src/vite-env.d.ts src/components/pages/contact/Contact.tsx tests/api.client.test.ts tests/helpers/axiosAdapter.ts .github/workflows/deploy.yml
git rm src/lib/responseEncryption.ts
git commit -m "refactor: use typed plain-json API responses"
~~~

---

### Task 3: Add cancellation-aware read deduplication

**Files**

- Create: src/lib/inflightReads.ts
- Modify: src/lib/api.ts
- Create: tests/helpers/deferred.ts
- Create: tests/inflightReads.test.ts
- Modify: tests/api.client.test.ts

**Interfaces**

- Consumes: ApiError, PublicApi, and ReadOptions from Task 2.
- Produces:

~~~ts
export interface InflightReadRegistry {
  run<T>(
    key: string,
    request: (signal: AbortSignal) => Promise<T>,
    callerSignal?: AbortSignal,
  ): Promise<T>;
  clear(): void;
}

export function createInflightReadRegistry(): InflightReadRegistry;
~~~

The deferred test helper is:

~~~ts
export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
~~~

- [ ] Write failing tests for shared reads, independent subscriber cancellation, all-subscriber abort, settlement cleanup, and no POST deduplication.

~~~ts
it("deduplicates reads without canceling a surviving caller", async () => {
  const pending = deferred<ProjectsResponse>();
  const load = vi.fn((_signal: AbortSignal) => pending.promise);
  const registry = createInflightReadRegistry();
  const firstController = new AbortController();

  const first = registry.run("GET /api/projects", load, firstController.signal);
  const second = registry.run("GET /api/projects", load);

  firstController.abort();
  await expect(first).rejects.toMatchObject({ cancelled: true });
  expect(load).toHaveBeenCalledTimes(1);

  pending.resolve({ ok: true, data: [] });
  await expect(second).resolves.toEqual({ ok: true, data: [] });
});
~~~

- [ ] Run and confirm RED because the registry does not exist.

~~~powershell
bunx vitest run tests/inflightReads.test.ts
~~~

- [ ] Implement one underlying AbortController per key and one subscriber promise per caller.
- [ ] Abort the underlying request only after every active subscriber cancels.
- [ ] Remove entries on resolve/reject and when all subscribers cancel.
- [ ] Let all GET methods accept ReadOptions; key about by language and settings by ETag. Never deduplicate contact POST.
- [ ] Run focused tests, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/inflightReads.test.ts tests/api.client.test.ts
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/lib/inflightReads.ts src/lib/api.ts tests/helpers/deferred.ts tests/inflightReads.test.ts tests/api.client.test.ts
git commit -m "feat: deduplicate cancellable public reads"
~~~

---

### Task 4: Implement settings ETags, retention, visibility refresh, and backoff

**Files**

- Modify: src/lib/api.ts
- Modify: src/contexts/settingsConstants.ts
- Modify: src/contexts/SettingsContext.tsx
- Create: src/contexts/settingsPolling.ts
- Create: tests/settingsProvider.test.tsx

**Interfaces**

- Consumes: PublicApi.settings from Task 2, SettingsDoc, and AbortSignal.
- Produces:

~~~ts
export function settingsRetryDelayMs(failureCount: number): number;
~~~

- [ ] Write failing provider tests for initial loading, 200+ETag, 304 retention, failure retention, exponential backoff, visible refresh, and unmount abort.

~~~tsx
it("sends the stored ETag and retains settings on 304", async () => {
  const ENABLED: SettingsDoc = {
    showAbout: true,
    showSkills: true,
    showProjects: true,
    showExperience: true,
    showResume: true,
    showContact: true,
  };
  vi.mocked(api.settings)
    .mockResolvedValueOnce({ kind: "modified", etag: '"v1"', data: ENABLED })
    .mockResolvedValueOnce({ kind: "not-modified", etag: '"v1"' });

  render(
    <SettingsProvider>
      <SettingsProbe />
    </SettingsProvider>,
  );

  expect(await screen.findByText("projects:on")).toBeInTheDocument();
  setDocumentVisible();
  fireEvent(document, new Event("visibilitychange"));

  await waitFor(() => expect(api.settings).toHaveBeenLastCalledWith(
    expect.objectContaining({ etag: '"v1"' }),
  ));
  expect(screen.getByText("projects:on")).toBeInTheDocument();
});
~~~

SettingsProbe and setDocumentVisible are defined in the same test file:

~~~tsx
function SettingsProbe() {
  const { settings } = useSettings();
  return <span>projects:{settings.showProjects ? "on" : "off"}</span>;
}

function setDocumentVisible() {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: "visible",
  });
}
~~~

- [ ] Run and confirm RED because polling uses a fixed interval and ignores ETag/abort.

~~~powershell
bunx vitest run tests/settingsProvider.test.tsx
~~~

- [ ] Accept 304 in the Axios request and send If-None-Match when an ETag exists.
- [ ] Retain the current settings on 304 or transient failure. Do not flash all sections off after a successful load.
- [ ] Schedule recursively with setTimeout: 60s after success, then 120s, 240s, 480s, capped at 15 minutes after consecutive failures.
- [ ] Refresh immediately when the page becomes visible. Reset failures on 200 or 304. Abort on unmount.
- [ ] Keep the existing hidden initial default and isInitialLoading semantics.
- [ ] Run focused tests, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/settingsProvider.test.tsx tests/settingsConstants.test.ts
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/lib/api.ts src/contexts/settingsConstants.ts src/contexts/SettingsContext.tsx src/contexts/settingsPolling.ts tests/settingsProvider.test.tsx
git commit -m "feat: revalidate public settings with backoff"
~~~

---

### Task 5: Build accessible resource-state primitives and disabled route guards

**Files**

- Create: src/hooks/usePublicResource.ts
- Create: src/hooks/useRetryCountdown.ts
- Create: src/components/PublicDataNotice.tsx
- Create: src/components/SectionGuard.tsx
- Modify: src/App.tsx
- Modify: src/locales/en.json
- Modify: src/locales/th.json
- Create: tests/publicResource.test.tsx
- Create: tests/sectionGuard.test.tsx
- Create: tests/publicDataNotice.test.tsx

**Interfaces**

- Consumes: ApiError, SettingsDoc, and AbortSignal from Tasks 2–4.
- Produces:

~~~ts
type RateLimited = { reason: "rate-limited"; retryAt: number };
type Unavailable = { reason: "unavailable" };

export type PublicResourceState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T; source: "live" }
  | { status: "empty" }
  | { status: "disabled" }
  | ({ status: "stale"; data: T } & (RateLimited | Unavailable))
  | ({ status: "unavailable" } & (RateLimited | Unavailable));

export function usePublicResource<T>(options: {
  key: string;
  load(signal: AbortSignal): Promise<T>;
  fallback?: T;
  isEmpty(value: T): boolean;
}): {
  state: PublicResourceState<T>;
  retry(): void;
};

export interface SectionGuardProps {
  setting: keyof SettingsDoc;
  children: ReactNode;
}
~~~

- [ ] Write failing tests for loading, empty, disabled, stale, unavailable, required 429 retryAt, canceled requests, replacement abort, and Retry.

~~~tsx
it("aborts an obsolete request before starting Retry", async () => {
  const signals: AbortSignal[] = [];
  const first = deferred<string[]>();
  const second = deferred<string[]>();
  const load = vi.fn((signal: AbortSignal) => {
    signals.push(signal);
    return signals.length === 1 ? first.promise : second.promise;
  });

  const { result } = renderHook(() => usePublicResource({
    key: "projects",
    load,
    isEmpty: value => value.length === 0,
  }));
  act(() => result.current.retry());

  expect(signals[0].aborted).toBe(true);
  second.resolve(["live"]);
  await waitFor(() => expect(result.current.state).toMatchObject({
    status: "ready",
    data: ["live"],
  }));
});
~~~

- [ ] Write a failing SectionGuard test proving a hidden deep link renders a disabled state instead of redirecting home.
- [ ] Run and confirm RED because the hook, notice, and guard do not exist.

~~~powershell
bunx vitest run tests/publicResource.test.tsx tests/sectionGuard.test.tsx tests/publicDataNotice.test.tsx
~~~

- [ ] Invoke frontend-design before implementing the visual treatment.
- [ ] Keep the latest load callback in a ref, start work only when key/retry generation changes, and abort the active controller before every replacement:

~~~ts
const loadRef = useRef(options.load);
loadRef.current = options.load;

useEffect(() => {
  const controller = new AbortController();
  run(loadRef.current, controller.signal);
  return () => controller.abort();
}, [options.key, retryGeneration]);
~~~

- [ ] Map 403 to disabled, 429 to a required absolute retryAt, cancellation to no visible failure, and other failures to stale only when fallback exists.
- [ ] Build PublicDataNotice with native buttons, visible focus, concise EN/TH copy, status/alert live regions, and the existing violet/cyan tokens.
- [ ] Keep every content route mounted. Hide disabled navigation links, but wrap deep-link elements with SectionGuard so disabled sections are distinguishable.
- [ ] Run focused tests with axe, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/publicResource.test.tsx tests/sectionGuard.test.tsx tests/publicDataNotice.test.tsx
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/hooks/usePublicResource.ts src/hooks/useRetryCountdown.ts src/components/PublicDataNotice.tsx src/components/SectionGuard.tsx src/App.tsx src/locales/en.json src/locales/th.json tests/publicResource.test.tsx tests/sectionGuard.test.tsx tests/publicDataNotice.test.tsx
git commit -m "feat: add public resource state primitives"
~~~

---

### Task 6: Adopt resilient states across public content pages

**Files**

- Modify: src/components/pages/skills/Skills.tsx
- Modify: src/components/pages/projects/Projects.tsx
- Modify: src/components/pages/home/Home.tsx
- Modify: src/components/pages/about/About.tsx
- Modify: src/components/pages/experience/Experience.tsx
- Modify: src/locales/en.json
- Modify: src/locales/th.json
- Create: tests/projects.test.tsx
- Create: tests/skills.test.tsx
- Create: tests/home.test.tsx
- Create: tests/about.test.tsx
- Create: tests/experience.test.tsx

**Interfaces**

- Consumes: usePublicResource and PublicDataNotice from Task 5; PublicApi from Task 2.
- Produces: explicit page rendering for live, empty, disabled, rate-limited, stale, and unavailable states.

- [ ] Write failing focused page tests. Skills and Projects use their bundled fallback only; About, Home, and Experience show unavailable/retry rather than claiming bundled copy is cached.

~~~tsx
it("labels the Projects fallback as cached and exposes Retry", async () => {
  vi.mocked(api.projects).mockRejectedValueOnce(
    new ApiError({
      status: 503,
      code: "service_unavailable",
      message: "Service temporarily unavailable",
    }),
  );
  const { container } = renderPublic(<Projects />);

  expect(await screen.findByText(/cached content/i)).toBeInTheDocument();
  expect(screen.getByText("MrWinRock")).toBeInTheDocument();
  await userEvent.setup().click(screen.getByRole("button", { name: /retry/i }));
  expect(api.projects).toHaveBeenCalledTimes(2);
  expect((await axe.run(container)).violations).toEqual([]);
});
~~~

- [ ] Run and confirm RED because current failures are silent, blank, or unlabeled.

~~~powershell
bunx vitest run tests/projects.test.tsx tests/skills.test.tsx tests/home.test.tsx tests/about.test.tsx tests/experience.test.tsx
~~~

- [ ] Pass a stable key and unwrap generated envelopes inside each loader:

~~~tsx
const resource = usePublicResource({
  key: "projects",
  load: signal => api.projects({ signal }).then(response => response.data),
  fallback: staticProjects,
  isEmpty: projects => projects.length === 0,
});
~~~

- [ ] Use bundled stale fallback only for Skills and Projects and label it Cached content. Live empty arrays get purpose-written empty states.
- [ ] About/Home and Experience show unavailable/rate-limit Retry states without a cached label; canceled reads remain silent.
- [ ] Preserve layout and violet/cyan identity while making notices keyboard reachable at mobile and desktop widths.
- [ ] Run all five page tests, axe checks, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/projects.test.tsx tests/skills.test.tsx tests/home.test.tsx tests/about.test.tsx tests/experience.test.tsx
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/components/pages/skills/Skills.tsx src/components/pages/projects/Projects.tsx src/components/pages/home/Home.tsx src/components/pages/about/About.tsx src/components/pages/experience/Experience.tsx src/locales/en.json src/locales/th.json tests/projects.test.tsx tests/skills.test.tsx tests/home.test.tsx tests/about.test.tsx tests/experience.test.tsx
git commit -m "feat: adopt resilient public content states"
~~~

---

### Task 7: Harden accessible contact states

**Files**

- Create: src/components/pages/contact/contactValidation.ts
- Modify: src/components/pages/contact/Contact.tsx
- Modify: src/locales/en.json
- Modify: src/locales/th.json
- Create: tests/contact.test.tsx

**Interfaces**

- Consumes: ContactInput, MutationOptions, ApiError, and useRetryCountdown.
- Produces:

~~~ts
export type ContactField = "name" | "email" | "message";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function validateContact(input: ContactInput): ContactFieldErrors;

type ContactStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "rate-limited"; retryAt: number }
  | { kind: "unavailable" }
  | { kind: "error" };
~~~

- [ ] Write failing tests for field validation, duplicate-submit prevention, 429 countdown, 503 copy, safe generic errors, success reset, and unmount abort.

~~~tsx
it("announces a 503 safely and never renders provider details", async () => {
  vi.mocked(api.contact).mockRejectedValueOnce(
    new ApiError({
      status: 503,
      code: "service_unavailable",
      message: "Contact service is temporarily unavailable",
    }),
  );

  renderPublic(<Contact />);
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/name/i), "Win");
  await user.type(screen.getByLabelText(/email/i), "win@example.com");
  await user.type(screen.getByLabelText(/message/i), "A valid message");
  await user.click(screen.getByRole("button", { name: /send message/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent(/temporarily unavailable/i);
  expect(screen.queryByText(/resend|api key|configuration/i)).toBeNull();
});
~~~

- [ ] Run and confirm RED because current form rendering uses server-derived messages and lacks explicit states.

~~~powershell
bunx vitest run tests/contact.test.tsx
~~~

- [ ] Use generated ContactInput and mirror API field constraints without replacing server validation.
- [ ] Submit with a per-attempt AbortController and map only known status/code values:

~~~ts
const controller = new AbortController();
activeRequest.current?.abort();
activeRequest.current = controller;
await api.contact(input, { signal: controller.signal });
~~~

- [ ] Add aria-invalid, aria-describedby, inline field errors, polite sending/success status, and assertive failure status.
- [ ] Disable submission while sending and during a 429 countdown. Preserve user input on failure; enter the success state and clear fields only after the API confirms accepted delivery with its successful envelope.
- [ ] Map 429, 503, validation, and unknown errors to localized safe copy. Never render ApiError.message directly.
- [ ] Abort the request on unmount.
- [ ] Run focused tests, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/contact.test.tsx
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/components/pages/contact/Contact.tsx src/components/pages/contact/contactValidation.ts src/locales/en.json src/locales/th.json tests/contact.test.tsx
git commit -m "feat: make contact failures accessible"
~~~

---

### Task 8: Make Resume cancellation and Blob URL ownership deterministic

**Files**

- Create: src/hooks/useObjectUrl.ts
- Modify: src/components/pages/resume/Resume.tsx
- Modify: src/locales/en.json
- Modify: src/locales/th.json
- Create: tests/useObjectUrl.test.tsx
- Create: tests/resume.test.tsx

**Interfaces**

- Consumes: PublicApi.resume, ReadOptions, and PublicDataNotice.
- Produces:

~~~ts
export function useObjectUrl(blob: Blob | null): string | null;
api.resume(options?: ReadOptions): Promise<Blob>;
~~~

- [ ] Write failing URL lifecycle and Resume retry/cancel tests.

~~~tsx
it("revokes URLs on replacement and unmount", () => {
  vi.spyOn(URL, "createObjectURL")
    .mockReturnValueOnce("blob:first")
    .mockReturnValueOnce("blob:second");
  const revoke = vi.spyOn(URL, "revokeObjectURL");

  const { result, rerender, unmount } = renderHook(
    ({ blob }) => useObjectUrl(blob),
    { initialProps: { blob: new Blob(["first"]) } },
  );

  expect(result.current).toBe("blob:first");
  rerender({ blob: new Blob(["second"]) });
  expect(revoke).toHaveBeenCalledWith("blob:first");
  unmount();
  expect(revoke).toHaveBeenCalledWith("blob:second");
});
~~~

- [ ] Run and confirm RED because URL ownership is local to the fetch effect and replacement is untested.

~~~powershell
bunx vitest run tests/useObjectUrl.test.tsx tests/resume.test.tsx
~~~

- [ ] Create one URL per Blob, revoke the prior URL on replacement, and revoke on unmount.
- [ ] Keep URL ownership entirely inside the hook:

~~~ts
useEffect(() => {
  if (!blob) {
    setUrl(null);
    return;
  }
  const next = URL.createObjectURL(blob);
  setUrl(next);
  return () => URL.revokeObjectURL(next);
}, [blob]);
~~~

- [ ] Abort the resume GET on cleanup. Ignore cancellation and prevent post-unmount state updates.
- [ ] Use the shared loading/unavailable/retry presentation and localized copy.
- [ ] Run focused tests, lint, and build; confirm GREEN.

~~~powershell
bunx vitest run tests/useObjectUrl.test.tsx tests/resume.test.tsx
bun run lint
bun run build
~~~

- [ ] Commit.

~~~powershell
git add src/hooks/useObjectUrl.ts src/components/pages/resume/Resume.tsx src/locales/en.json src/locales/th.json tests/useObjectUrl.test.tsx tests/resume.test.tsx
git commit -m "fix: clean up resume Blob URLs"
~~~

---

### Task 9: Enforce responsive/accessibility CI and browser smoke

**Files**

- Modify: package.json
- Modify: bun.lock
- Create: playwright.config.ts
- Create: tsconfig.e2e.json
- Create: tests/e2e/public-smoke.spec.ts
- Create: .github/workflows/ci.yml
- Modify: .github/workflows/deploy.yml
- Modify: README.md
- Modify: .gitignore
- Modify: src/index.css

**Interfaces**

- Consumes: all public behaviors from Tasks 4–8 and the sibling API artifact.
- Produces: test:e2e, a reusable CI gate, and desktop/mobile browser evidence.

~~~json
{
  "test:e2e": "playwright test",
  "typecheck:e2e": "tsc -p tsconfig.e2e.json --noEmit"
}
~~~

~~~json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "types": ["node", "@playwright/test"],
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.e2e.tsbuildinfo",
    "noEmit": true
  },
  "include": ["playwright.config.ts", "tests/e2e/**/*.ts"]
}
~~~

- [ ] Add @playwright/test, the test:e2e script, and a Playwright config before the behavioral RED run:

~~~ts
export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "bun run build && bun run preview -- --host 127.0.0.1 --port 4173",
    env: { ...process.env, VITE_BASE_URL: "http://127.0.0.1:4173" },
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
~~~

- [ ] Write a complete browser smoke test. Define fixtures and keyboard helper in the same file.

~~~ts
const ALL_SECTIONS_ENABLED = {
  showAbout: true,
  showSkills: true,
  showProjects: true,
  showExperience: true,
  showResume: true,
  showContact: true,
};

async function tabTo(page: Page, target: Locator) {
  for (let count = 0; count < 30; count += 1) {
    if (await target.evaluate(node => node === document.activeElement)) return;
    await page.keyboard.press("Tab");
  }
  throw new Error("Target was not reachable by keyboard");
}

test("mobile keyboard navigation reaches a resilient Projects page", async ({ page }) => {
  await page.route("http://127.0.0.1:4173/api/settings", route =>
    route.fulfill({ json: { ok: true, data: ALL_SECTIONS_ENABLED } }),
  );
  await page.route("http://127.0.0.1:4173/api/projects", route =>
    route.fulfill({ status: 503, json: { ok: false, error: "Unavailable" } }),
  );

  await page.goto("/");
  await page.getByRole("button", { name: /toggle menu/i }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("link", { name: /projects/i }).focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText(/cached content/i)).toBeVisible();
  const retry = page.getByRole("button", { name: /retry/i });
  await tabTo(page, retry);
  await expect(retry).toBeFocused();
});
~~~

- [ ] Add a reduced-motion assertion against a transition-bearing control, then run after Chromium is installed; confirm RED because the current stylesheet leaves a nonzero transition duration under reduced motion.

~~~powershell
bunx playwright install chromium
bun run test:e2e
~~~

- [ ] Cover navigation, language switch, live project load, cached fallback, contact validation/503/429, resume retry, focus order, and no horizontal overflow.
- [ ] Add visible :focus-visible treatment and prefers-reduced-motion behavior in src/index.css without changing the violet/cyan identity.
- [ ] Create .github/workflows/ci.yml with this exact sibling layout and gate:

~~~yaml
name: CI
on:
  push:
    branches: [dev]
  pull_request:
  workflow_call:

jobs:
  verify:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: mrwinrock
    steps:
      - uses: actions/checkout@v4
        with:
          path: mrwinrock
      - uses: actions/checkout@v4
        with:
          repository: MrWinRock/mrwinrock-app
          ref: dev
          path: mrwinrock-app
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.13
      - run: bun install --frozen-lockfile
      - run: bun run contract:check -- ../mrwinrock-app/docs/openapi.json
      - run: bun run typecheck:contract
      - run: bun run test:run
      - run: bun run lint
      - run: bun run build
      - run: bun run typecheck:e2e
      - run: bunx playwright install --with-deps chromium
      - run: bun run test:e2e
~~~
- [ ] Add the exact reusable gate to deploy:

~~~yaml
jobs:
  verify:
    uses: ./.github/workflows/ci.yml

  deploy:
    needs: verify
    # retain the existing deployment steps unchanged below this line
~~~

- [ ] In Linux CI install the browser with bunx playwright install --with-deps chromium.
- [ ] Document supported env variables, contract generate/check commands, resource-state semantics, test matrix, and API ownership.
- [ ] Run the full public release gate; confirm GREEN.

~~~powershell
bun install --frozen-lockfile
bun run contract:check -- ..\mrwinrock-app\docs\openapi.json
bun run typecheck:contract
bun run test:run
bun run lint
bun run build
bun run typecheck:e2e
bunx playwright install chromium
bun run test:e2e
~~~

- [ ] Commit.

~~~powershell
git add package.json bun.lock playwright.config.ts tsconfig.e2e.json tests/e2e/public-smoke.spec.ts .github/workflows/ci.yml .github/workflows/deploy.yml README.md .gitignore src/index.css
git commit -m "ci: enforce public contract and browser gates"
~~~

## Final public verification

- [ ] Invoke superpowers:verification-before-completion.
- [ ] Run fresh verification against the committed API artifact:

~~~powershell
git branch --show-current
bun install --frozen-lockfile
bun run contract:check -- ..\mrwinrock-app\docs\openapi.json
bun run typecheck:contract
bun run test:run
bun run lint
bun run build
bun run typecheck:e2e
bun run test:e2e
$legacy = rg -n "VITE_RESPONSE_ENCRYPTION_KEY|responseEncryption|decryptResponse" src README.md package.json .github
if ($LASTEXITCODE -eq 0) { $legacy; throw "Legacy encryption references remain" }
if ($LASTEXITCODE -gt 1) { throw "Legacy-reference scan failed" }
git status --short
~~~

- [ ] Confirm branch dev, a clean generated contract, all tests/builds passing, no unintended env/deployment changes, and the residue search has no matches.
- [ ] Do not push or deploy.
