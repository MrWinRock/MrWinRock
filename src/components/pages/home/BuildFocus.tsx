import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSettings } from '../../../contexts/useSettings';
import { ArrowIcon } from '../../ArrowIcon';

const areas = ['web', 'api', 'ai'] as const;
const destinations = { web: '/projects?tech=React', api: '/projects?tech=Bun', ai: '/projects' };

export function BuildFocus() {
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    return <section className="build-focus" aria-labelledby="build-focus-title">
        <div className="build-focus-header">
            <h2 id="build-focus-title">{t('home.buildFocus.title')}</h2>
        </div>
        <ul className="build-focus-list">{areas.map(area => <li key={area} className="build-focus-area">
            <div className="build-focus-copy">
                <h3>{!isInitialLoading && settings.showProjects
                    ? <Link className="build-focus-link" to={destinations[area]}>{t(`home.buildFocus.${area}.title`)} <ArrowIcon /></Link>
                    : t(`home.buildFocus.${area}.title`)}</h3>
                <p>{t(`home.buildFocus.${area}.description`)}</p>
            </div>
        </li>)}</ul>
    </section>;
}
