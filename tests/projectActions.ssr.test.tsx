import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import { ProjectActions } from "../src/components/pages/projects/ProjectActions";

const renderActions = (url: unknown, repo: unknown) => renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
        <ProjectActions url={url} repo={repo} />
    </I18nextProvider>,
);

describe("ProjectActions SSR", () => {
    test("keeps HTTPS project actions as protected new-tab links", () => {
        const html = renderActions("https://live.example.com/demo", "https://github.com/example/demo");

        expect(html).toContain('href="https://live.example.com/demo"');
        expect(html).toContain('href="https://github.com/example/demo"');
        expect(html).toContain('target="_blank"');
        expect(html).toContain('rel="noopener noreferrer"');
    });

    test("renders malicious project values without clickable links or unsafe markup", () => {
        const html = renderActions("javascript:alert('live')", "data:text/html,unsafe");

        expect(html).not.toContain("<a");
        expect(html).not.toContain("javascript:alert");
        expect(html).not.toContain("data:text/html,unsafe");
        expect(html).toContain("GitHub repository not available");
    });
});
