import { describe, expect, test } from 'vitest';
import { documentLanguage, syncDocumentLanguage } from '../src/lib/documentLanguage';

describe('documentLanguage', () => {
    test('normalizes supported language variants and falls back to English', () => {
        expect(documentLanguage('th')).toBe('th');
        expect(documentLanguage('TH_th')).toBe('th');
        expect(documentLanguage('en-GB')).toBe('en');
        expect(documentLanguage('fr')).toBe('en');
        expect(documentLanguage(undefined)).toBe('en');
    });

    test('synchronizes a structural root with the normalized language', () => {
        const root = { lang: '' };

        syncDocumentLanguage(root, 'TH-th');
        expect(root.lang).toBe('th');

        syncDocumentLanguage(root, 'unsupported');
        expect(root.lang).toBe('en');
    });
});
