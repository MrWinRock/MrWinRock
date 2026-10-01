import axios, {
    AxiosError,
    AxiosHeaders,
    type AxiosAdapter,
    type AxiosRequestConfig,
    type AxiosResponse,
    type RawAxiosResponseHeaders,
} from "axios";

export interface AdapterReply {
    status: number;
    data: unknown;
    headers?: RawAxiosResponseHeaders;
}

function toResponse(config: AxiosRequestConfig, reply: AdapterReply): AxiosResponse {
    return {
        config,
        data: reply.data,
        headers: AxiosHeaders.from(reply.headers),
        status: reply.status,
        statusText: String(reply.status),
    };
}

export function axiosAdapter(reply: AdapterReply | Error, requests?: AxiosRequestConfig[]): AxiosAdapter {
    return async config => {
        requests?.push(config);
        if (reply instanceof Error) throw reply;

        const response = toResponse(config, reply);
        if (reply.status >= 200 && reply.status < 300) return response;

        throw new AxiosError(
            "Untrusted provider error",
            "ERR_BAD_RESPONSE",
            config,
            undefined,
            response,
        );
    };
}

export function networkFailure(): AxiosError {
    return new AxiosError("Provider connection details", "ERR_NETWORK");
}

export { axios };
