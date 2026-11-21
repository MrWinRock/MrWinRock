import { useEffect, useRef } from 'react';
import { ArrowIcon } from '../../ArrowIcon';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useProjects } from '../../../hooks/useProjects';
import { featuredProjects, groupProjects, isCompanyProject, isFeaturedProject, localizeProject, projectSlug } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectCard } from './ProjectCard';
import { ProjectMatcher } from './ProjectMatcher';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { PageIntro } from '../PageIntro';

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
    const featured = featuredProjects(filtered);
    const primary = featured.length ? featured : filtered;
    const archive = featured.length ? filtered.filter(project => !featured.includes(project)) : [];
    const primaryTitle = t(featured.length ? 'projects.selected' : 'projects.archive');
    const results = useRef<HTMLDivElement>(null);
    const resultKey = filtered.map(projectSlug).join('\n');
    const previousResults = useRef({ query, resultKey });

    useEffect(() => {
        const previous = previousResults.current;
        previousResults.current = { query, resultKey };
        if (previous.query === query || previous.resultKey === resultKey || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        const groups = results.current?.querySelectorAll('.project-selection .work-list, .project-archive .work-list');
        const animations = Array.from(groups ?? [], group => group.animate?.(
            [{ opacity: 0.8, translate: '0 5px' }, { opacity: 1, translate: '0 0' }],
            { duration: 220, easing: 'ease-out' },
        ));
        return () => animations.forEach(animation => animation?.cancel());
    }, [query, resultKey]);

    return <div className="page-shell projects-page">
        <PageIntro title={t('projects.title')} description={t('projects.intro')} actions={records.length > 0
            ? <div className="project-filter">
                <label htmlFor="tech-filter">{t('projects.filter')}</label>
                <input id="tech-filter" type="search" className="search-field" placeholder={t('projects.filterPlaceholder')} value={query} onChange={event => {
                    const next = new URLSearchParams(params);
                    if (event.target.value) next.set('tech', event.target.value); else next.delete('tech');
                    setParams(next, { replace: true });
                }} />
            </div> : undefined} />
        <div className="projects-overview" ref={results}>
            <div className="project-selection">
                <PublicDataNotice {...resource} />
                {!!primary.length && <section aria-label={primaryTitle}>
                    <div className="collection-heading"><h2>{primaryTitle}</h2><span className="collection-count">{primary.length}</span></div>
                    <div className="work-list">{primary.map((project, index) => <ProjectCard key={project._id ?? project.title} project={project} number={project.featured ? index + 1 : undefined} />)}</div>
                </section>}
                {!!records.length && !filtered.length && <p role="status" className="public-notice">{t('projects.noMatches')}</p>}
            </div>
            {resource.state.status !== 'disabled' && <aside className="project-discovery" aria-label={t('projects.match.title')}><ProjectMatcher projects={'data' in resource.state ? resource.state.data : []} /></aside>}
            {!!archive.length && <section className="project-archive">
                <div className="collection-heading"><h2>{t('projects.archive')}</h2><span className="collection-count">{archive.length}</span></div>
                <div className="work-list">{archive.map(project => <ProjectCard key={project._id ?? project.title} project={project} />)}</div>
            </section>}
        </div>
        {!!companyLinks.length && <section className="company-work" aria-label={t('projects.company')}>
            <div className="collection-heading"><h2>{t('projects.company')}</h2><span className="collection-count">{companyLinks.length}</span></div>
            <ul className="company-links" role="list">{companyLinks.map(project => <li key={project.key} className="company-link"><a href={project.url} target="_blank" rel="noopener noreferrer">{project.title} <ArrowIcon /></a><p>{t('projects.publicLink')}</p></li>)}</ul>
        </section>}
    </div>;
}
