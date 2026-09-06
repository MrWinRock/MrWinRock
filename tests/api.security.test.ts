// @vitest-environment node
import { describe, expect, test } from "vitest";
import { createApiClient } from "../src/lib/api";
import { axiosAdapter, networkFailure } from "./helpers/axiosAdapter";

const safeErrorKeys = [
    "status",
    "code",
    "message",
    "details",
    "retryAfterSeconds",
    "cancelled",
];

function expectSafeError(error: unknown) {
    expect(error).toBeInstanceOf(Error);
    expect(error).not.toHaveProperty("body");
    expect(error).not.toHaveProperty("response");
    expect(error).not.toHaveProperty("request");
    expect(error).not.toHaveProperty("config");
    expect(error).not.toHaveProperty("stack");
    expect(Object.keys(error as object).every(key => safeErrorKeys.includes(key))).toBe(true);
}

describe("API security boundary", () => {
    test("accepts plaintext health JSON and sends only the JSON accept header", async () => {
        const requests = [];
        const client = createApiClient({
            baseURL: "https://api.example.test/",
            adapter: axiosAdapter({ status: 200, data: { ok: true, status: "live" } }, requests),
        });

        await expect(client.health()).resolves.toEqual({ ok: true, status: "live" });
        expect(requests).toHaveLength(1);
        expect(requests[0]?.headers).toMatchObject({ Accept: "application/json" });
        expect(requests[0]?.headers).not.toHaveProperty("X-Response-Encryption");
    });

    test("rejects a 2xx application error without exposing its body", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({
                status: 200,
                data: { ok: false, message: "Provider secret", stack: "sensitive stack" },
            }),
        });

        try {
            await client.contact({ name: "Ada", email: "ada@example.test", message: "Hello there" });
            throw new Error("Expected contact to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 200,
                code: "application_error",
                message: "Application error.",
                cancelled: false,
            });
        }
    });

    test("preserves a non-200 2xx status for an application error", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({ status: 201, data: { ok: false } }),
        });

        try {
            await client.contact({ name: "Ada", email: "ada@example.test", message: "Hello there" });
            throw new Error("Expected contact to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 201,
                code: "application_error",
                message: "Application error.",
            });
        }
    });

    test("rejects malformed successful JSON", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({ status: 200, data: { fish: 7 } }),
        });

        try {
            await client.fish();
            throw new Error("Expected fish to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 200,
                code: "malformed_response",
                message: "Malformed response.",
                cancelled: false,
            });
        }
    });

    test("preserves a non-200 2xx status for malformed JSON", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({ status: 204, data: { fish: 7 } }),
        });

        try {
            await client.fish();
            throw new Error("Expected fish to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 204,
                code: "malformed_response",
                message: "Malformed response.",
            });
        }
    });

    test("normalizes HTTP failures and retains only validated details", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({
                status: 400,
                data: {
                    error: "provider_error",
                    message: "Database password: secret",
                    stack: "provider stack",
                    details: {
                        fieldErrors: { email: ["Invalid email"] },
                        formErrors: ["Try again"],
                        providerMessage: "sensitive",
                    },
                },
            }),
        });

        try {
            await client.contact({ name: "Ada", email: "ada@example.test", message: "Hello there" });
            throw new Error("Expected contact to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 400,
                code: "http_error",
                message: "Request failed.",
                details: {
                    fieldErrors: { email: ["Invalid email"] },
                    formErrors: ["Try again"],
                },
                cancelled: false,
            });
            expect(error).not.toHaveProperty("details.providerMessage");
        }
    });

    test("parses a non-negative integer Retry-After value", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({
                status: 429,
                data: { error: "rate_limited" },
                headers: { "retry-after": "30" },
            }),
        });

        try {
            await client.settings();
            throw new Error("Expected settings to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({ retryAfterSeconds: 30 });
        }
    });

    test("normalizes cancellation without Axios internals", async () => {
        const controller = new AbortController();
        controller.abort();
        const client = createApiClient({
            adapter: axiosAdapter(networkFailure()),
        });

        try {
            await client.health({ signal: controller.signal });
            throw new Error("Expected health to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 0,
                code: "cancelled",
                message: "Request cancelled.",
                cancelled: true,
            });
        }
    });

    test("normalizes a JSON error carried in a resume Blob", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({
                status: 500,
                data: new Blob([
                    JSON.stringify({
                        message: "Provider trace",
                        details: { fieldErrors: {}, formErrors: ["Unable to prepare resume"] },
                        raw: "do not retain",
                    }),
                ], { type: "application/json" }),
            }),
        });

        try {
            await client.resume();
            throw new Error("Expected resume to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 500,
                code: "http_error",
                message: "Request failed.",
                details: { fieldErrors: {}, formErrors: ["Unable to prepare resume"] },
                cancelled: false,
            });
        }
    });

    test("normalizes a structured JSON error carried in a resume Blob", async () => {
        const client = createApiClient({
            adapter: axiosAdapter({
                status: 500,
                data: new Blob([
                    JSON.stringify({
                        details: { fieldErrors: { resume: ["Unavailable"] }, formErrors: [] },
                    }),
                ], { type: "application/problem+json" }),
            }),
        });

        try {
            await client.resume();
            throw new Error("Expected resume to reject");
        } catch (error) {
            expectSafeError(error);
            expect(error).toMatchObject({
                status: 500,
                code: "http_error",
                message: "Request failed.",
                details: { fieldErrors: { resume: ["Unavailable"] }, formErrors: [] },
            });
        }
    });
});
