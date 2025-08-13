import axios, {
    type AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
    isAxiosError as axiosIsAxiosError,
} from "axios";

const RAW_BASE = import.meta.env.VITE_BASE_URL ?? "";
const BASE_URL = RAW_BASE.replace(/\/+$/, "");
if (!BASE_URL) console.warn("VITE_BASE_URL is not defined. API calls will fail.");

export class ApiError<T = unknown> extends Error {
    status: number;
    body: T | string | null;
    constructor(status: number, body: T | string | null, message?: string) {
        super(message ?? `API Error ${status}`);
        this.status = status;
        this.body = body;
    }
}

type Primitive = string | number | boolean;
export interface RequestOptions {
    method?: "GET";
    query?: Record<string, Primitive | null | undefined>;
    json?: unknown;
    rawBody?: unknown;
    headers?: Record<string, string>;
    timeoutMs?: number;
    signal?: AbortSignal;
    responseType?: AxiosRequestConfig["responseType"];
}

const instance = axios.create({
    baseURL: BASE_URL || undefined,
    timeout: 15_000,
    validateStatus: (s) => s >= 200 && s < 300,
});

instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(err)
);

function buildParams(query?: RequestOptions["query"]) {
    if (!query) return undefined;
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(query)) {
        if (v == null) continue;
        params[k] = String(v);
    }
    return params;
}

function isAxiosError(e: unknown): e is AxiosError {
    return axiosIsAxiosError(e);
}

async function req<T = unknown>(
    path: string,
    opts: RequestOptions & { method?: AxiosRequestConfig["method"] } = {}
): Promise<T> {
    if (!BASE_URL) throw new Error("VITE_BASE_URL is not defined");
    if (opts.json !== undefined && opts.rawBody !== undefined) {
        throw new Error("Provide either 'json' or 'rawBody', not both.");
    }

    const {
        query,
        json,
        rawBody,
        timeoutMs,
        headers,
        method = "GET",
        signal,
        responseType,
    } = opts;

    const config: AxiosRequestConfig = {
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
    };

    try {
        const res: AxiosResponse<T> = await instance.request<T>(config);
        return res.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status ?? 0;
            const data = (error.response?.data ?? null) as T | string | null;


            const msg =
                (typeof data === "object" &&
                    data &&
                    (() => {
                        const record = data as Record<string, unknown>;
                        if ("message" in record && record.message != null) return String(record.message);
                        if ("error" in record && record.error != null) return String(record.error);
                        return undefined;
                    })()) ||
                error.message ||
                `API Error ${status}`;

            throw new ApiError<T>(status, data, msg);
        }
        throw error;
    }
}

const get = <T = unknown>(
    path: string,
    opts?: Omit<RequestOptions, "method" | "json" | "rawBody">
) => req<T>(path, { ...opts, method: "GET" });

export const api = {
    health: () => get<{ ok: boolean; status?: string }>("/health"),
    get,
    raw: req,
};
