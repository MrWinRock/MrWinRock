import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../data/projects';
import { projectSlug } from '../../../lib/portfolio';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { ProjectActions } from './ProjectActions';
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
export function ProjectCard({ project, number, variant, children }: { project: Project; number?: number; variant?: 'showcase'; children?: ReactNode }) {
    const { t } = useTranslation();
    const screenshot = project.caseStudy?.screenshots?.find(item => safeExternalUrl(item.url));
    return <article className={`project-card${variant === 'showcase' ? ' project-showcase' : ''}`} data-featured={number ? true : undefined}>
        {variant === 'showcase' && <div className="project-filebar"><svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /></svg><span>./{project.title.toLowerCase().replace(/\s+/g, '-')}</span><span aria-hidden="true">↗</span></div>}
        <span className="project-number" aria-hidden="true">{number ? String(number).padStart(2, '0') : '↗'}</span>
        <div className="project-card-body"><div className="project-summary"><h3>{project.title}</h3><p>{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t('projects.technologies')}>{project.tech.map(tag => <li key={tag} className="tech-tag">{tag}</li>)}</ul></div>
            <div className="project-links"><Link className="project-detail-link" onClick={()=>trackPortfolioEvent('project_open',projectSlug(project))} to={'/projects/' + projectSlug(project)}>{t('projects.details')} <span aria-hidden="true">↗</span></Link><ProjectActions url={project.url} repo={project.repo} /></div>
        </div>
        {children}
        {screenshot && <img src={screenshot.url} alt={screenshot.alt} loading="lazy" width="640" height="360" className="project-cover" />}
    </article>;
}
