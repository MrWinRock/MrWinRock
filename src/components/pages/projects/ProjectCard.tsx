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
    return <article className="project-card">
        {screenshot ? <img src={screenshot.url} alt={screenshot.alt} loading="lazy" width="640" height="360" className="project-cover" /> : <div className="project-wordmark" aria-hidden="true"><span>{number ? String(number).padStart(2, '0') : '↗'}</span><strong>{project.title}</strong></div>}
        <div className="project-card-body"><h3 className="text-xl font-semibold">{project.title}</h3><p className="text-gray-300 leading-relaxed text-sm">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t('projects.technologies')}>{project.tech.map(tag => <li key={tag} className="tech-tag">{tag}</li>)}</ul>
            <div className="mt-auto space-y-4"><Link className="text-cyan-200 inline-flex py-2 font-semibold" onClick={()=>trackPortfolioEvent('project_open',projectSlug(project))} to={'/projects/' + projectSlug(project)}>{t('projects.details')} <span aria-hidden="true">↗</span></Link><ProjectActions url={project.url} repo={project.repo} /></div>
        </div></article>;
}
