import axios, {
    type AxiosAdapter,
    type AxiosError,
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

export type ApiErrorCode =
    | "application_error"
    | "cancelled"
    | "http_error"
    | "malformed_response"
    | "network_error";

export class ApiError extends Error {
    readonly status: number;
    readonly code: ApiErrorCode;
    readonly details?: ValidationDetails;
    readonly retryAfterSeconds?: number;
    readonly cancelled: boolean;

    constructor({
        status,
        code,
        message,
        details,
        retryAfterSeconds,
        cancelled = false,
    }: {
        status: number;
        code: ApiErrorCode;
        message: string;
        details?: ValidationDetails;
        retryAfterSeconds?: number;
        cancelled?: boolean;
    }) {
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
    if (!(value instanceof Blob) || !/(^|\/)json($|;|\+)/i.test(value.type)) return value;

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

function malformedResponse(): ApiError {
    return new ApiError({
        status: 200,
        code: "malformed_response",
        message: "Malformed response.",
    });
}

function applicationError(): ApiError {
    return new ApiError({
        status: 200,
        code: "application_error",
        message: "Application error.",
    });
}

function validateHealth(value: unknown): { ok: true; status: "live" } {
    if (isRecord(value) && value.ok === true && value.status === "live") {
        return { ok: true, status: "live" };
    }
    throw malformedResponse();
}

function validateFish(value: unknown): { fish: string } {
    if (isRecord(value) && typeof value.fish === "string") return { fish: value.fish };
    throw malformedResponse();
}

function validateApplicationSuccess<T>(value: unknown): T {
    if (!isRecord(value)) throw malformedResponse();
    if (value.ok === false) throw applicationError();
    if (value.ok !== true) throw malformedResponse();
    return value as T;
}

function validateResume(value: unknown): Blob {
    if (value instanceof Blob) return value;
    throw malformedResponse();
}

export interface ApiSkill {
    _id: string;
    name: string;
    category: string;
    icon: string;
    order: number;
}

export interface ApiSkillCategory {
    order_flag: number;
    skills: ApiSkill[];
}

export interface SkillsResponse {
    ok: true;
    data: Record<string, ApiSkillCategory>;
}

export interface ApiProject {
    _id: string;
    title: string;
    description: string;
    url: string;
    repo: string;
    tech: string[];
    order: number;
}

export interface ProjectsResponse {
    ok: true;
    data: ApiProject[];
}

export interface ApiExperience {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract" | "Bachelor" | "Master" | "PhD";
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    tech: string[];
    order: number;
}

export interface ExperiencesResponse {
    ok: true;
    data: ApiExperience[];
}

export interface SettingsDoc {
    showAbout: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showExperience: boolean;
    showResume: boolean;
    showContact: boolean;
}

export interface SettingsResponse {
    ok: true;
    data: SettingsDoc;
}

export interface AboutDoc {
    story: string;
    background: string;
}

export interface AboutResponse {
    ok: true;
    data: AboutDoc;
}

export interface ContactResponse {
    ok: true;
    message?: string;
}

export function createApiClient({ baseURL = BASE_URL, adapter }: CreateApiClientOptions = {}) {
    const normalizedBaseURL = baseURL.replace(/\/+$/, "");
    const instance = axios.create({
        baseURL: normalizedBaseURL || undefined,
        timeout: 15_000,
        adapter,
        validateStatus: status => status >= 200 && status < 300,
    });

    async function request(path: string, options: RequestOptions = {}): Promise<unknown> {
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
            return response.data;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw await normalizeError(error);
        }
    }

    return {
        health: async (options?: Pick<RequestOptions, "signal" | "timeoutMs">) =>
            validateHealth(await request("/health", options)),
        fish: async () => validateFish(await request("/fish")),
        about: async (lang: "en" | "th") =>
            validateApplicationSuccess<AboutResponse>(await request("/api/about", { query: { lang } })),
        skills: async () => validateApplicationSuccess<SkillsResponse>(await request("/api/skills")),
        projects: async () => validateApplicationSuccess<ProjectsResponse>(await request("/api/projects")),
        experiences: async () => validateApplicationSuccess<ExperiencesResponse>(await request("/api/experiences")),
        contact: async (data: { name: string; email: string; message: string }) =>
            validateApplicationSuccess<ContactResponse>(await request("/api/contact", { method: "POST", json: data })),
        resume: async () => validateResume(await request("/api/resume", { responseType: "blob" })),
        settings: async () => validateApplicationSuccess<SettingsResponse>(await request("/api/settings")),
    };
}

export const api = createApiClient();
