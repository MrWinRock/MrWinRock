import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../ArrowIcon';
import { PageIntro } from './PageIntro';
export default function NotFound() {
    const { t } = useTranslation();
    return <div className="page-shell not-found-page">
        <PageIntro title={t('notFound.title')} description={t('notFound.description')} />
        <Link className="primary-action" to="/"><ArrowIcon back /> {t('nav.home')}</Link>
    </div>;
}
