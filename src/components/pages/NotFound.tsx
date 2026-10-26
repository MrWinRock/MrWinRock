import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../ArrowIcon';
export default function NotFound() {
    const { t } = useTranslation();
    return <div className="page-shell"><h1 className="page-title">{t('notFound.title')}</h1><p className="page-description mb-8">{t('notFound.description')}</p><Link className="primary-action" to="/">{t('nav.home')} <ArrowIcon /></Link></div>;
}
