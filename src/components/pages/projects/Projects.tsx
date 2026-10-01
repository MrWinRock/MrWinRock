import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import { groupProjects, localizeProject, isCompanyProject, isFeaturedProject } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectCard } from './ProjectCard';
export default function Projects() {
    const { t, i18n } = useTranslation(); const resource = useProjects(); const [params, setParams] = useSearchParams();
    const query = params.get('tech') ?? '';
    const records = 'data' in resource.state ? groupProjects(resource.state.data).filter(project=>!isCompanyProject(project)).map(project => localizeProject({...project,featured:isFeaturedProject(project)}, i18n.language)) : [];
    const filtered = records.filter(project => !query || project.tech.some(tech => tech.toLowerCase().includes(query.toLowerCase())));
    const featured = filtered.filter(project => project.featured).slice(0,3);
    const archive = filtered.filter(project => !featured.includes(project));
    return <div className="page-shell"><p className="eyebrow">{t('projects.selected')}</p><h1 className="page-title">{t('projects.title')}</h1><p className="page-description">{t('projects.intro')}</p><PublicDataNotice {...resource} />
        {!!records.length && <div className="my-7 max-w-sm"><label htmlFor="tech-filter" className="block text-sm text-gray-300 mb-2">{t('projects.filter')}</label><input id="tech-filter" className="search-field" value={query} onChange={event => { const next = new URLSearchParams(params); if(event.target.value) next.set('tech', event.target.value); else next.delete('tech'); setParams(next, { replace: true }); }} /></div>}
        {!!featured.length && <section aria-label={t('projects.selected')}><div className="collection-heading"><h2>{t('projects.selected')}</h2><span className="collection-count">{featured.length}</span></div><div className="work-list">{featured.map((project,index) => <ProjectCard key={project._id ?? project.title} project={project} number={index + 1} />)}</div></section>}
        {!!archive.length && <section className="mt-12"><div className="collection-heading"><h2>{t('projects.archive')}</h2><span className="collection-count">{archive.length}</span></div><div className="work-list">{archive.map(project => <ProjectCard key={project._id ?? project.title} project={project} />)}</div></section>}
        {!!records.length && !filtered.length && <p role="status">{t('projects.noMatches')}</p>}
        {resource.state.status !== 'disabled' && <aside className="company-link"><p className="eyebrow">{t('projects.company')}</p><a href="https://carbon.devdeethailand.com" target="_blank" rel="noopener noreferrer">Carbon Footprint <span aria-hidden="true">↗</span></a><p>{t('projects.publicLink')}</p></aside>}
    </div>;
}
