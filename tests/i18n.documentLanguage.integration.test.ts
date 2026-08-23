import { describe, expect, test } from 'bun:test';
import type { i18n as I18next } from 'i18next';

type DocumentLanguageSyncState = {
    handler: (language: unknown) => void;
};

let importSequence = 0;

const importI18n = () => import(`../src/i18n.ts?document-language-test=${importSequence++}`);

const waitForInitialization = async (instance: I18next) => {
    if (!instance.isInitialized) {
        await new Promise<void>((resolve) => {
            instance.on('initialized', () => resolve());
        });
    }
};

const waitForScheduledInitialization = () => new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
});

describe('i18n document language integration', () => {
    test('synchronizes the singleton document root once per language event and remains safe without document', async () => {
        const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
        let value = 'unsupported';
        let writes = 0;
        const documentRoot = {
            get lang() {
                return value;
            },
            set lang(next: string) {
                value = next;
                writes += 1;
            },
        };

        try {
            Object.defineProperty(globalThis, 'document', {
                configurable: true,
                value: { documentElement: documentRoot },
            });

            const { default: i18n } = await importI18n();
            await waitForInitialization(i18n);
            expect(documentRoot.lang).toBe('en');

            await i18n.changeLanguage('TH_th');
            expect(documentRoot.lang).toBe('th');

            await importI18n();
            await waitForScheduledInitialization();
            writes = 0;
            i18n.emit('languageChanged', 'EN_us');

            expect(documentRoot.lang).toBe('en');
            expect(writes).toBe(1);

            const documentLanguageSyncStateKey = Symbol.for('mrwinrock.document-language-sync');
            const i18nWithDocumentLanguageSync = i18n as I18next & {
                [key: symbol]: DocumentLanguageSyncState | undefined;
            };
            const documentLanguageSyncState = i18nWithDocumentLanguageSync[documentLanguageSyncStateKey];

            if (documentLanguageSyncState) {
                i18n.off('languageChanged', documentLanguageSyncState.handler);
                Reflect.deleteProperty(i18nWithDocumentLanguageSync, documentLanguageSyncStateKey);
            }

            Reflect.deleteProperty(globalThis, 'document');
            const { default: ssrI18n } = await importI18n();
            await waitForScheduledInitialization();
            expect(ssrI18n).toBeDefined();
        } finally {
            if (originalDocument) {
                Object.defineProperty(globalThis, 'document', originalDocument);
            } else {
                Reflect.deleteProperty(globalThis, 'document');
            }
        }
    });
});
