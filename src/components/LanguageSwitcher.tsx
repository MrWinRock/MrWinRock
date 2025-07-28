import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'th' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="p-button"
        >
            <span className="font-bold">
                {i18n.language === 'en' ? 'TH' : 'EN'}
            </span>
        </button>
    );
};

export default LanguageSwitcher;