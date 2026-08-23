import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { mock } from 'bun:test';
import type { SettingsDoc } from '../../src/lib/api';
import i18n from '../../src/i18n';
import { HIDDEN_SETTINGS, SettingsContext } from '../../src/contexts/settingsConstants';

mock.module('@/components/cards/SpotLightCard', () => ({ default: () => null }));
mock.module('@/lib/api', () => ({ api: {} }));

const { default: App } = await import('../../src/App');

interface RenderStaticPublicOptions {
    isInitialLoading?: boolean;
    settings?: SettingsDoc;
    route?: string;
}

export function renderStaticPublic({
    isInitialLoading = false,
    settings = HIDDEN_SETTINGS,
    route = '/',
}: RenderStaticPublicOptions = {}) {
    return renderToStaticMarkup(
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18n}>
                <SettingsContext.Provider value={{ settings, isInitialLoading }}>
                    <App />
                </SettingsContext.Provider>
            </I18nextProvider>
        </MemoryRouter>,
    );
}
