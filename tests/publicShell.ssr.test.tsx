import { describe, expect, test } from 'vitest';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';
import { renderStaticPublic } from './helpers/renderStaticPublic';

describe('public shell SSR', () => {
    test('keeps the public shell and Home available while settings are unresolved', () => {
        const html = renderStaticPublic({
            isInitialLoading: true,
            settings: {
                showAbout: true,
                showSkills: true,
                showProjects: true,
                showExperience: true,
                showResume: true,
                showContact: true,
            },
        });

        expect(html).toContain('<nav');
        expect(html).toContain('<main');
        expect(html).toContain('<footer');
        expect(html).toContain('Hi, I&#x27;m');
        expect(html).toContain('role="status"');
        expect(html).toContain('Navigation is updating.');
        expect(html).not.toContain('Loading site…');
        expect(html).not.toContain('href="/about"');
        expect(html).not.toContain('href="/skills"');
        expect(html).not.toContain('href="/projects"');
        expect(html).not.toContain('href="/experience"');
        expect(html).not.toContain('href="/contact"');
        expect(html).not.toContain('href="/resume"');
    });

    test('renders project and skill destinations only when their settings are enabled', () => {
        const enabledHtml = renderStaticPublic({
            settings: { ...HIDDEN_SETTINGS, showProjects: true, showSkills: true },
        });
        const disabledHtml = renderStaticPublic({ settings: HIDDEN_SETTINGS });

        expect(enabledHtml).toContain('href="/projects"');
        expect(enabledHtml).toContain('href="/skills"');
        expect(enabledHtml).toContain('View My Work');
        expect(enabledHtml).toContain('See More');
        expect(disabledHtml).not.toContain('href="/projects"');
        expect(disabledHtml).not.toContain('href="/skills"');
        expect(disabledHtml).not.toContain('View My Work');
        expect(disabledHtml).not.toContain('See More');
    });

    test('provides a skip link to the focusable main landmark', () => {
        const html = renderStaticPublic();

        expect(html).toContain('href="#main-content"');
        expect(html).toContain('<main id="main-content" tabindex="-1"');
    });

    test('renders the closed mobile disclosure without hidden focusable navigation', () => {
        const html = renderStaticPublic();

        expect(html).toContain('aria-label="Open menu"');
        expect(html).toContain('type="button"');
        expect(html).toContain('aria-expanded="false"');
        expect(html).toContain('aria-controls="mobile-navigation"');
        expect(html).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/"/);
        expect(html).not.toContain('id="mobile-navigation"');
    });
});
