import { ArrowIcon } from '../../ArrowIcon';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import { groupProjects, localizeProject, isCompanyProject, isFeaturedProject } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectCard } from './ProjectCard';
import { ProjectMatcher } from './ProjectMatcher';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';

export default function Projects() {
    const { t, i18n } = useTranslation();
    const resource = useProjects();
    const [params, setParams] = useSearchParams();
    const query = params.get('tech') ?? '';
    const companyLinks = resource.state.status === 'ready' ? resource.state.data.filter(isCompanyProject).sort((a, b) => a.order - b.order).flatMap(project => {
        const url = safeExternalUrl(project.url);
        const title = i18n.language.startsWith('th') ? project.translations?.th?.title ?? project.title : project.title;
        return url ? [{ key: project._id ?? project.slug ?? url, title, url }] : [];
    }) : [];
    const records = 'data' in resource.state ? groupProjects(resource.state.data).filter(project => !isCompanyProject(project)).map(project => localizeProject({ ...project, featured: isFeaturedProject(project) }, i18n.language)) : [];
    const filtered = records.filter(project => !query || project.tech.some(tech => tech.toLowerCase().includes(query.toLowerCase())));
    const featured = filtered.filter(project => project.featured).slice(0, 3);
    const primary = featured.length ? featured : filtered;
    const archive = featured.length ? filtered.filter(project => !featured.includes(project)) : [];
    const primaryTitle = t(featured.length ? 'projects.selected' : 'projects.archive');

    return <div className="page-shell projects-page">
        <header className="projects-header">
            <div><h1 className="page-title">{t('projects.title')}</h1><p className="page-description">{t('projects.intro')}</p></div>
            {!!records.length && <div className="project-filter">
                <label htmlFor="tech-filter">{t('projects.filter')}</label>
                <input id="tech-filter" className="search-field" value={query} onChange={event => {
                    const next = new URLSearchParams(params);
                    if (event.target.value) next.set('tech', event.target.value); else next.delete('tech');
                    setParams(next, { replace: true });
                }} />
            </div>}
        </header>
        <div className="projects-overview">
            <div className="project-selection">
                <PublicDataNotice {...resource} />
                {!!primary.length && <section aria-label={primaryTitle}>
                    <div className="collection-heading"><h2>{primaryTitle}</h2><span className="collection-count">{primary.length}</span></div>
                    <div className="work-list">{primary.map((project, index) => <ProjectCard key={project._id ?? project.title} project={project} number={project.featured ? index + 1 : undefined} />)}</div>
                </section>}
                {!!records.length && !filtered.length && <p role="status" className="public-notice">{t('projects.noMatches')}</p>}
            </div>
            {resource.state.status !== 'disabled' && <aside className="project-discovery" aria-label={t('projects.match.title')}><ProjectMatcher projects={'data' in resource.state ? resource.state.data : []} /></aside>}
        </div>
        {!!archive.length && <section className="project-archive">
            <div className="collection-heading"><h2>{t('projects.archive')}</h2><span className="collection-count">{archive.length}</span></div>
            <div className="work-list">{archive.map(project => <ProjectCard key={project._id ?? project.title} project={project} />)}</div>
        </section>}
        {!!companyLinks.length && <section className="company-work" aria-label={t('projects.company')}>
            <div className="collection-heading"><h2>{t('projects.company')}</h2><span className="collection-count">{companyLinks.length}</span></div>
            <div>{companyLinks.map(project => <aside key={project.key} className="company-link"><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title} <ArrowIcon /></a><p>{t('projects.publicLink')}</p></aside>)}</div>
        </section>}
    </div>;
}
