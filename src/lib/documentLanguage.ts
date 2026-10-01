type LanguageRoot = {
    lang: string;
};

export const documentLanguage = (value: unknown): 'en' | 'th' => {
    if (typeof value !== 'string') {
        return 'en';
    }

    const [language] = value.trim().replaceAll('_', '-').split('-');
    const normalized = language.toLowerCase();

    if (normalized === 'th') {
        return 'th';
    }

    return 'en';
};

export const syncDocumentLanguage = (root: LanguageRoot, language: unknown) => {
    root.lang = documentLanguage(language);
};
