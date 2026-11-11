import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../contexts/useSettings';

export function TechnologyTags({ technologies }: { technologies: string[] }) {
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const canBrowse = !isInitialLoading && settings.showProjects;
    return <ul className="tech-list" aria-label={t('projects.technologies')}>
        {[...new Set(technologies)].map(technology => <li className="tech-tag" key={technology}>
            {canBrowse
                ? <Link className="tech-chip" to={'/projects?tech=' + encodeURIComponent(technology)}>{technology}</Link>
                : <span className="tech-chip">{technology}</span>}
        </li>)}
    </ul>;
}
