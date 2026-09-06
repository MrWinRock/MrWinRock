import { describe, expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import { ProjectActions } from "../src/components/pages/projects/ProjectActions";

const renderActions = (url: unknown, repo: unknown) => renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
        <ProjectActions url={url} repo={repo} />
    </I18nextProvider>,
);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const expectProtectedExternalAnchor = (html: string, href: string) => {
    expect(html).toMatch(new RegExp(
        `<a(?=[^>]*href="${escapeRegExp(href)}")(?=[^>]*target="_blank")(?=[^>]*rel="noopener noreferrer")[^>]*>`,
    ));
};

describe("ProjectActions SSR", () => {
    test("keeps each HTTPS project action as its own protected new-tab link", () => {
        const html = renderActions("https://live.example.com/demo", "https://github.com/example/demo");

        expectProtectedExternalAnchor(html, "https://live.example.com/demo");
        expectProtectedExternalAnchor(html, "https://github.com/example/demo");
    });

    test("keeps a safe live URL clickable when the repository URL is unsafe", () => {
        const html = renderActions("https://live.example.com/demo", "javascript:alert('repository')");

        expectProtectedExternalAnchor(html, "https://live.example.com/demo");
        expect(html).toContain("GitHub repository not available");
        expect(html).not.toContain("javascript:alert");
        expect(html.match(/<a\b/g)).toHaveLength(1);
    });

    test("keeps a safe repository URL clickable when the live URL is unsafe", () => {
        const html = renderActions("data:text/html,unsafe-live", "https://github.com/example/demo");

        expectProtectedExternalAnchor(html, "https://github.com/example/demo");
        expect(html).toContain("Not Available");
        expect(html).not.toContain("data:text/html,unsafe-live");
        expect(html.match(/<a\b/g)).toHaveLength(1);
    });

    test("renders two malicious project values without clickable links or unsafe markup", () => {
        const html = renderActions("javascript:alert('live')", "data:text/html,unsafe");

        expect(html).not.toContain("<a");
        expect(html).not.toContain("javascript:alert");
        expect(html).not.toContain("data:text/html,unsafe");
        expect(html).toContain("GitHub repository not available");
    });
});
