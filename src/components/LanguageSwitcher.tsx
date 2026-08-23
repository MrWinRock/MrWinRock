import { useTranslation } from 'react-i18next';

import { documentLanguage } from '../lib/documentLanguage';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = documentLanguage(i18n.resolvedLanguage ?? i18n.language);
    const targetLanguage = currentLanguage === 'en' ? 'th' : 'en';

    const toggleLanguage = () => {
        i18n.changeLanguage(targetLanguage);
    };

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            className="p-button"
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
