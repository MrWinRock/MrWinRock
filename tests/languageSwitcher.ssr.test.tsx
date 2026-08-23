import { describe, expect, test } from 'bun:test';
import { createInstance } from 'i18next';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import LanguageSwitcher from '../src/components/LanguageSwitcher';
import enTranslations from '../src/locales/en.json';
import thTranslations from '../src/locales/th.json';

const renderSwitcher = async (language: 'en' | 'th') => {
    const i18n = createInstance();
    await i18n.use(initReactI18next).init({
        resources: {
            en: { translation: enTranslations },
            th: { translation: thTranslations },
        },
        lng: language,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <LanguageSwitcher />
        </I18nextProvider>,
    );
};

describe('LanguageSwitcher SSR', () => {
    test('renders the Thai target with an English accessible label', async () => {
        const html = await renderSwitcher('en');

        expect(html).toContain('>TH</span>');
        expect(html).toContain('aria-label="Switch language to Thai"');
        expect(html).toContain('type="button"');
    });

    test('renders the English target with a Thai accessible label', async () => {
        const html = await renderSwitcher('th');

        expect(html).toContain('>EN</span>');
        expect(html).toContain('aria-label="เปลี่ยนภาษาเป็นภาษาอังกฤษ"');
        expect(html).toContain('type="button"');
    });
});
