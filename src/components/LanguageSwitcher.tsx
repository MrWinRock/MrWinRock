import { useTranslation } from 'react-i18next';

import { documentLanguage } from '../lib/documentLanguage';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = documentLanguage(i18n.resolvedLanguage ?? i18n.language);
    const targetLanguage = currentLanguage === 'en' ? 'th' : 'en';

    const toggleLanguage = () => {
        i18n.changeLanguage(targetLanguage);
        if (targetLanguage === 'en' && /^\/th(?:\/|$)/.test(window.location.pathname)) {
            window.location.assign((window.location.pathname.replace(/^\/th(?=\/|$)/, '') || '/') + window.location.search + window.location.hash);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="p-button language-switcher"
            aria-label={targetLanguage === 'th'
                ? t('accessibility.switchLanguageToThai')
                : t('accessibility.switchLanguageToEnglish')}
        >
            <span className="font-bold">
                {targetLanguage === 'th' ? 'TH' : 'EN'}
            </span>
        </button>
    );
};

export default LanguageSwitcher;
