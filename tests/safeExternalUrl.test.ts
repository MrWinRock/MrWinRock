import { describe, expect, test } from "vitest";
import { safeExternalUrl } from "../src/lib/safeExternalUrl";

describe("safeExternalUrl", () => {
    test("normalizes an absolute HTTPS URL", () => {
        expect(safeExternalUrl("HTTPS://Example.COM:443/a/../docs?tab=one#intro"))
            .toBe("https://example.com/docs?tab=one#intro");
    });

    test("rejects values outside the HTTPS external URL boundary", () => {
        for (const value of [
            undefined,
            null,
            42,
            "",
            "   ",
            "/projects",
            "//example.com/projects",
            "https://",
            "http://example.com",
            "javascript:alert(1)",
            "data:text/html,unsafe",
            "file:///etc/passwd",
            "https://user@example.com",
            "https://user:secret@example.com",
        ]) {
            expect(safeExternalUrl(value)).toBeNull();
        }
    });
});
