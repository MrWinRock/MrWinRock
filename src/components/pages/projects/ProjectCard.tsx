import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../data/projects';
import { projectSlug } from '../../../lib/portfolio';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { ProjectActions } from './ProjectActions';
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
export function ProjectCard({ project, number }: { project: Project; number?: number }) {
    const { t } = useTranslation();
    const screenshot = project.caseStudy?.screenshots?.find(item => safeExternalUrl(item.url));
    return <article className="project-card" data-featured={number ? true : undefined}>
        <span className="project-number" aria-hidden="true">{number ? String(number).padStart(2, '0') : '↗'}</span>
        <div className="project-card-body"><div className="project-summary"><h3>{project.title}</h3><p>{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t('projects.technologies')}>{project.tech.map(tag => <li key={tag} className="tech-tag">{tag}</li>)}</ul></div>
            <div className="project-links"><Link className="project-detail-link" onClick={()=>trackPortfolioEvent('project_open',projectSlug(project))} to={'/projects/' + projectSlug(project)}>{t('projects.details')} <span aria-hidden="true">↗</span></Link><ProjectActions url={project.url} repo={project.repo} /></div>
        </div>
        {screenshot && <img src={screenshot.url} alt={screenshot.alt} loading="lazy" width="640" height="360" className="project-cover" />}
    </article>;
}
