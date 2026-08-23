import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { syncDocumentLanguage } from './lib/documentLanguage';
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';

type DocumentLanguageSyncState = {
    handler: (language: unknown) => void;
    initialization?: Promise<unknown>;
};

const documentLanguageSyncStateKey = Symbol.for('mrwinrock.document-language-sync');
const i18nWithDocumentLanguageSync = i18n as typeof i18n & {
    [key: symbol]: DocumentLanguageSyncState | undefined;
};

const synchronizeDocumentLanguage = (language: unknown) => {
    if (typeof document !== 'undefined') {
        syncDocumentLanguage(document.documentElement, language);
    }
};

let documentLanguageSyncState = i18nWithDocumentLanguageSync[documentLanguageSyncStateKey];

if (!documentLanguageSyncState) {
    documentLanguageSyncState = {
        handler: synchronizeDocumentLanguage,
    };
    i18nWithDocumentLanguageSync[documentLanguageSyncStateKey] = documentLanguageSyncState;
    i18n.on('languageChanged', documentLanguageSyncState.handler);
}

if (!documentLanguageSyncState.initialization) {
    documentLanguageSyncState.initialization = i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: enTranslations },
                th: { translation: thTranslations }
            },
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false
            },
            detection: {
                order: ['localStorage', 'navigator', 'htmlTag'],
                caches: ['localStorage']
            }
        })
        .then(() => synchronizeDocumentLanguage(i18n.language));
}

void documentLanguageSyncState.initialization;

export default i18n;
