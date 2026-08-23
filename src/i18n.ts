import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { syncDocumentLanguage } from './lib/documentLanguage';
import enTranslations from './locales/en.json';
import thTranslations from './locales/th.json';

const synchronizeDocumentLanguage = (language: unknown) => {
    if (typeof document !== 'undefined') {
        syncDocumentLanguage(document.documentElement, language);
    }
};

i18n.on('languageChanged', synchronizeDocumentLanguage);

void i18n
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

export default i18n;
