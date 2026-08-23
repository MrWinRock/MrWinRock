import { describe, expect, test } from 'bun:test';
import type { i18n as I18next } from 'i18next';

type DocumentLanguageSyncState = {
    handler: (language: unknown) => void;
    dispose: () => void;
};

let importSequence = 0;
const documentLanguageSyncStateKey = Symbol.for('mrwinrock.document-language-sync');

const importI18n = () => import(`../src/i18n.ts?document-language-test=${importSequence++}`);

const waitForInitialization = async (instance: I18next) => {
    if (!instance.isInitialized) {
        await new Promise<void>((resolve) => {
            const onInitialized = () => {
                instance.off('initialized', onInitialized);
                resolve();
            };

            instance.on('initialized', onInitialized);
        });
    }
};

const waitForScheduledInitialization = () => new Promise<void>((resolve) => {
    setTimeout(resolve, 0);
});

describe('i18n document language integration', () => {
    test('synchronizes the singleton document root once per language event and remains safe without document', async () => {
        const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
        let i18n: I18next | undefined;
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
        const getDocumentLanguageSyncState = (instance: I18next) => {
            const i18nWithDocumentLanguageSync = instance as I18next & {
                [key: symbol]: DocumentLanguageSyncState | undefined;
            };

            return i18nWithDocumentLanguageSync[documentLanguageSyncStateKey];
        };

        try {
            Object.defineProperty(globalThis, 'document', {
                configurable: true,
                value: { documentElement: documentRoot },
            });

            ({ default: i18n } = await importI18n());
            await waitForInitialization(i18n);
            expect(documentRoot.lang).toBe('en');

            await i18n.changeLanguage('TH_th');
            expect(documentRoot.lang).toBe('th');

            const originalState = getDocumentLanguageSyncState(i18n);
            await importI18n();
            await waitForScheduledInitialization();
            const replacementState = getDocumentLanguageSyncState(i18n);

            expect(replacementState?.handler).not.toBe(originalState?.handler);
            writes = 0;
            i18n.emit('languageChanged', 'EN_us');

            expect(documentRoot.lang).toBe('en');
            expect(writes).toBe(1);

            expect(typeof replacementState?.dispose).toBe('function');
            replacementState?.dispose();
            writes = 0;
            i18n.emit('languageChanged', 'TH_th');
            expect(writes).toBe(0);

            if (replacementState) {
                i18n.off('languageChanged', replacementState.handler);
            }
            Reflect.deleteProperty(i18n, documentLanguageSyncStateKey);

            Reflect.deleteProperty(globalThis, 'document');
            const { default: ssrI18n } = await importI18n();
            i18n = ssrI18n;
            await waitForScheduledInitialization();
            expect(ssrI18n).toBeDefined();
        } finally {
            if (i18n) {
                const documentLanguageSyncState = getDocumentLanguageSyncState(i18n);

                if (documentLanguageSyncState) {
                    i18n.off('languageChanged', documentLanguageSyncState.handler);
                    Reflect.deleteProperty(i18n, documentLanguageSyncStateKey);
                }
            }

            if (originalDocument) {
                Object.defineProperty(globalThis, 'document', originalDocument);
            } else {
                Reflect.deleteProperty(globalThis, 'document');
            }
        }
    });
});
