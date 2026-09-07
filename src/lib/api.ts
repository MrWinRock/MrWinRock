import { createInflightReadRegistry } from "./inflightReads";
import type { AboutResponse, SkillsResponse, ProjectsResponse, ExperiencesResponse, ContactInput, ContactResponse, SettingsResponse, SettingsDoc, HealthResponse, FishResponse } from "./apiTypes";
export type * from "./apiTypes";
import axios, {
    AxiosError,
    type AxiosAdapter,
    type AxiosRequestConfig,
    type AxiosResponse,
    isAxiosError,
} from "axios";

const RAW_BASE = import.meta.env.VITE_BASE_URL ?? "";
const BASE_URL = RAW_BASE.replace(/\/+$/, "");

type Primitive = string | number | boolean;

export interface RequestOptions {
    method?: AxiosRequestConfig["method"];
    query?: Record<string, Primitive | null | undefined>;
    json?: unknown;
    rawBody?: unknown;
    headers?: Record<string, string>;
    timeoutMs?: number;
    signal?: AbortSignal;
    responseType?: AxiosRequestConfig["responseType"];
}

export interface ValidationDetails {
    fieldErrors: Record<string, string[]>;
    formErrors: string[];
}

export type ApiErrorCode = string;
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
    readonly code: ApiErrorCode;
    readonly details?: SafeValidationDetails;
    readonly retryAfterSeconds?: number;
    readonly cancelled: boolean;

    constructor({
        status = 0,
        code,
        message,
        details,
        retryAfterSeconds,
        cancelled = false,
    }: ApiErrorInit) {
        super(message);
        delete this.stack;
        this.status = status;
        this.code = code;
        if (details) this.details = details;
        if (retryAfterSeconds !== undefined) this.retryAfterSeconds = retryAfterSeconds;
        this.cancelled = cancelled;
    }
}

export interface CreateApiClientOptions {
    baseURL?: string;
    adapter?: AxiosAdapter;
}

function buildParams(query?: RequestOptions["query"]) {
    if (!query) return undefined;
    const params: Record<string, string> = {};
    for (const [key, value] of Object.entries(query)) {
        if (value != null) params[key] = String(value);
    }
    return params;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === "string");
}

function optionalStrings(value: Record<string, unknown>, keys: string[]): boolean {
    return keys.every(key => value[key] === undefined || typeof value[key] === 'string');
}

function isProject(value: unknown): boolean {
    return isRecord(value) && typeof value.title === 'string' && typeof value.description === 'string'
        && typeof value.order === 'number' && Number.isFinite(value.order) && isStringArray(value.tech)
        && optionalStrings(value, ['_id', 'url', 'repo']);
}

function isExperience(value: unknown): boolean {
    return isRecord(value) && ['title', 'company', 'description', 'location', 'startDate'].every(key => typeof value[key] === 'string')
        && typeof value.order === 'number' && Number.isFinite(value.order)
        && isStringArray(value.tech) && isStringArray(value.achievements)
        && optionalStrings(value, ['_id', 'endDate'])
        && ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract', 'Bachelor', 'Master', 'PhD'].includes(String(value.type));
}

function isSkills(value: unknown): boolean {
    return isRecord(value) && Object.values(value).every(category => isRecord(category)
        && typeof category.order_flag === 'number' && Number.isFinite(category.order_flag)
        && Array.isArray(category.skills) && category.skills.every(skill => isRecord(skill)
            && typeof skill.name === 'string' && typeof skill.order === 'number' && Number.isFinite(skill.order)
            && optionalStrings(skill, ['_id', 'category', 'icon'])));
}

function validationDetails(value: unknown): ValidationDetails | undefined {
    if (!isRecord(value) || !isRecord(value.fieldErrors) || !isStringArray(value.formErrors)) {
        return undefined;
    }

    const fieldErrors: Record<string, string[]> = {};
    for (const [field, messages] of Object.entries(value.fieldErrors)) {
        if (!isStringArray(messages)) return undefined;
        fieldErrors[field] = [...messages];
    }

    return { fieldErrors, formErrors: [...value.formErrors] };
}

function retryAfterSeconds(headers: AxiosResponse["headers"] | undefined): number | undefined {
    const value = headers?.["retry-after"];
    const text = Array.isArray(value) ? value[0] : value;
    if (typeof text !== "string" || !/^\d+$/.test(text)) return undefined;

    const seconds = Number(text);
    return Number.isSafeInteger(seconds) ? seconds : undefined;
}

async function safeErrorBody(value: unknown): Promise<unknown> {
    if (!(value instanceof Blob) || !/^application\/(?:[a-z0-9!#$&^_.+-]+\+)?json(?:\s*;|$)/i.test(value.type)) {
        return value;
    }

    try {
        return JSON.parse(await value.text()) as unknown;
    } catch {
        return undefined;
    }
}

async function normalizeError(error: unknown): Promise<ApiError> {
    if (axios.isCancel(error) || (isAxiosError(error) && error.code === "ERR_CANCELED")) {
        return new ApiError({
            status: 0,
            code: "cancelled",
            message: "Request cancelled.",
            cancelled: true,
        });
    }

    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<unknown>;
        const response = axiosError.response;
        if (!response) {
            return new ApiError({
                status: 0,
                code: "network_error",
                message: "Network request failed.",
            });
        }

        const data = await safeErrorBody(response.data);
        return new ApiError({
            status: response.status,
            code: "http_error",
            message: "Request failed.",
            details: validationDetails(isRecord(data) ? data.details : undefined),
            retryAfterSeconds: retryAfterSeconds(response.headers),
        });
    }

    return new ApiError({
        status: 0,
        code: "network_error",
        message: "Network request failed.",
    });
}

function malformedResponse(status: number): ApiError {
    return new ApiError({
        status,
        code: "malformed_response",
        message: "Malformed response.",
    });
}

function applicationError(status: number): ApiError {
    return new ApiError({
        status,
        code: "application_error",
        message: "Application error.",
    });
}

function validateHealth(value: unknown, status: number): { ok: true; status: "live" } {
    if (isRecord(value) && value.ok === true && value.status === "live") {
        return { ok: true, status: "live" };
    }
    throw malformedResponse(status);
}

function validateFish(value: unknown, status: number): { fish: string } {
    if (isRecord(value) && typeof value.fish === "string") return { fish: value.fish };
    throw malformedResponse(status);
}

function validateApplicationSuccess<T>(value: unknown, status: number): T {
    if (!isRecord(value)) throw malformedResponse(status);
    if (value.ok === false) throw applicationError(status);
    if (value.ok !== true) throw malformedResponse(status);
    return value as T;
}

function validateResume(value: unknown, status: number): Blob {
    if (value instanceof Blob) return value;
    throw malformedResponse(status);
}

export interface ReadOptions { signal?: AbortSignal; }
export interface MutationOptions { signal?: AbortSignal; }
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

export function createApiClient({ baseURL = BASE_URL, adapter }: CreateApiClientOptions = {}): PublicApi {
    const reads = createInflightReadRegistry();
    const normalizedBaseURL = baseURL.replace(/\/+$/, "");
    const instance = axios.create({
        baseURL: normalizedBaseURL || undefined,
        timeout: 15_000,
        adapter,
        validateStatus: status => (status >= 200 && status < 300) || status === 304,
    });

    async function request(path: string, options: RequestOptions = {}): Promise<{ data: unknown; status: number; headers: AxiosResponse["headers"] }> {
        if (!normalizedBaseURL && !adapter) {
            throw new ApiError({
                status: 0,
                code: "network_error",
                message: "Network request failed.",
            });
        }
        if (options.json !== undefined && options.rawBody !== undefined) {
            throw new ApiError({
                status: 0,
                code: "malformed_response",
                message: "Malformed response.",
            });
        }

        const { query, json, rawBody, timeoutMs, headers, method = "GET", signal, responseType } = options;
        try {
            const response = await instance.request({
                url: path.startsWith("/") ? path : `/${path}`,
                method,
                params: buildParams(query),
                timeout: timeoutMs ?? 15_000,
                responseType,
                headers: {
                    Accept: "application/json",
                    ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
                    ...headers,
                },
                data: json !== undefined ? json : rawBody,
                signal,
            });
            if ((response.status < 200 || response.status >= 300) && !(path === "/api/settings" && response.status === 304)) {
                throw new AxiosError("Request failed", undefined, response.config, undefined, response);
            }
            return { data: response.data, status: response.status, headers: response.headers };
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw await normalizeError(error);
        }
    }

    async function validated<T>(
        path: string,
        validator: (value: unknown, status: number) => T,
        options?: RequestOptions,
    ): Promise<T> {
        const response = await request(path, options);
        return validator(response.data, response.status);
    }

    function read<T>(path: string, validator: (value: unknown, status: number) => T, options: RequestOptions = {}, key = path): Promise<T> {
        return reads.run(key, signal => validated(path, validator, { ...options, signal }), options.signal);
    }
    function envelope<T>(shape: (value: unknown) => boolean) {
        return (value: unknown, status: number): T => {
            const result = validateApplicationSuccess<T>(value, status);
            if (!shape(value)) throw malformedResponse(status);
            return result;
        };
    }
    return {
        health: options => read("/health", validateHealth, options),
        fish: options => read("/fish", validateFish, options),
        about: (lang, options) => read("/api/about", envelope<AboutResponse>(v => isRecord(v) && isRecord(v.data) && typeof v.data.story === "string" && typeof v.data.background === "string"), { ...options, query: { lang } }, `about:${lang}`),
        skills: options => read("/api/skills", envelope<SkillsResponse>(v => isRecord(v) && isSkills(v.data)), options),
        projects: options => read("/api/projects", envelope<ProjectsResponse>(v => isRecord(v) && Array.isArray(v.data) && v.data.every(isProject)), options),
        experiences: options => read("/api/experiences", envelope<ExperiencesResponse>(v => isRecord(v) && Array.isArray(v.data) && v.data.every(isExperience)), options),
        contact: (input, options) => validated("/api/contact", envelope<ContactResponse>(v => isRecord(v) && typeof v.message === "string"), { ...options, method: "POST", json: input }),
        resume: options => reads.run('/api/resume', async signal => {
            const response = await request('/api/resume', { signal, responseType: 'blob' });
            const parsed = await safeErrorBody(response.data);
            if (parsed !== response.data) {
                if (isRecord(parsed) && parsed.ok === false) throw applicationError(response.status);
                throw malformedResponse(response.status);
            }
            return validateResume(response.data, response.status);
        }, options?.signal),
        settings: (options = {}) => reads.run(`settings:${options.etag ?? ""}`, async signal => {
            const response = await request("/api/settings", { signal, headers: options.etag ? { "If-None-Match": options.etag } : undefined });
            const etag = typeof response.headers.etag === "string" ? response.headers.etag : undefined;
            if (response.status === 304) return { kind: "not-modified", etag };
            const result = envelope<SettingsResponse>(v => isRecord(v) && isRecord(v.data) && ["showAbout", "showSkills", "showProjects", "showExperience", "showResume", "showContact"].every(key => typeof (v.data as Record<string, unknown>)[key] === "boolean"))(response.data, response.status);
            return { kind: "modified", data: result.data, etag };
        }, options.signal),
    };
}

export const api: PublicApi = createApiClient();
