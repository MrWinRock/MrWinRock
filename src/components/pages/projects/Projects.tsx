import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import { groupProjects, localizeProject, isCompanyProject, isFeaturedProject } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectCard } from './ProjectCard';
import { ProjectMatcher } from './ProjectMatcher';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
export default function Projects() {
    const { t, i18n } = useTranslation(); const resource = useProjects(); const [params, setParams] = useSearchParams();
    const query = params.get('tech') ?? '';
    const companyLinks = resource.state.status === 'ready' ? resource.state.data.filter(isCompanyProject).sort((a, b) => a.order - b.order).flatMap(project => {
        const url = safeExternalUrl(project.url);
        const title = i18n.language.startsWith('th') ? project.translations?.th?.title ?? project.title : project.title;
        return url ? [{ key: project._id ?? project.slug ?? url, title, url }] : [];
    }) : [];
    const records = 'data' in resource.state ? groupProjects(resource.state.data).filter(project=>!isCompanyProject(project)).map(project => localizeProject({...project,featured:isFeaturedProject(project)}, i18n.language)) : [];
    const filtered = records.filter(project => !query || project.tech.some(tech => tech.toLowerCase().includes(query.toLowerCase())));
    const featured = filtered.filter(project => project.featured).slice(0,3);
    const archive = filtered.filter(project => !featured.includes(project));
    return <div className="page-shell"><p className="eyebrow">{t('projects.selected')}</p><h1 className="page-title">{t('projects.title')}</h1><p className="page-description">{t('projects.intro')}</p><PublicDataNotice {...resource} />
        {resource.state.status !== 'disabled' && <ProjectMatcher projects={'data' in resource.state ? resource.state.data : []} />}
        {!!records.length && <div className="my-7 max-w-sm"><label htmlFor="tech-filter" className="block text-sm text-gray-300 mb-2">{t('projects.filter')}</label><input id="tech-filter" className="search-field" value={query} onChange={event => { const next = new URLSearchParams(params); if(event.target.value) next.set('tech', event.target.value); else next.delete('tech'); setParams(next, { replace: true }); }} /></div>}
        {!!featured.length && <section aria-label={t('projects.selected')}><div className="collection-heading"><h2>{t('projects.selected')}</h2><span className="collection-count">{featured.length}</span></div><div className="work-list">{featured.map((project,index) => <ProjectCard key={project._id ?? project.title} project={project} number={index + 1} />)}</div></section>}
        {!!archive.length && <section className="mt-12"><div className="collection-heading"><h2>{t('projects.archive')}</h2><span className="collection-count">{archive.length}</span></div><div className="work-list">{archive.map(project => <ProjectCard key={project._id ?? project.title} project={project} />)}</div></section>}
        {!!records.length && !filtered.length && <p role="status">{t('projects.noMatches')}</p>}
        {!!companyLinks.length && <section className="mt-12" aria-label={t('projects.company')}><div className="collection-heading"><h2>{t('projects.company')}</h2><span className="collection-count">{companyLinks.length}</span></div><div className="grid gap-4">{companyLinks.map(project => <aside key={project.key} className="company-link"><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title} <span aria-hidden="true">↗</span></a><p>{t('projects.publicLink')}</p></aside>)}</div></section>}
    </div>;
}
