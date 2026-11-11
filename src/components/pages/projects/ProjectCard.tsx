import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../data/projects';
import { projectSlug } from '../../../lib/portfolio';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { ProjectActions } from './ProjectActions';
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { ArrowIcon } from '../../ArrowIcon';
import { TechnologyTags } from '../../TechnologyTags';

export function ProjectCard({ project, number, variant, children }: { project: Project; number?: number; variant?: 'showcase'; children?: ReactNode }) {
    const { t } = useTranslation();
    const screenshot = project.caseStudy?.screenshots?.find(item => safeExternalUrl(item.url));
    const detailPath = '/projects/' + projectSlug(project);
    const trackOpen = () => trackPortfolioEvent('project_open', projectSlug(project));
    return <article className={`project-card${variant === 'showcase' ? ' project-showcase' : ''}${screenshot ? ' project-with-cover' : ''}`} data-featured={number ? true : undefined}>
        <div className="project-card-body">
            <div className="project-info">
            <div className="project-summary">
                <h3><Link className="project-title-link" to={detailPath} onClick={trackOpen}>{project.title}</Link></h3>
                <p>{project.description}</p>
                <TechnologyTags technologies={project.tech} />
            </div>
            <div className="project-links">
                <Link className="project-detail-link" onClick={trackOpen} to={detailPath}>{t('projects.details')} <ArrowIcon /></Link>
                <ProjectActions url={project.url} repo={project.repo} />
            </div>
            </div>
            {screenshot && <Link className="project-cover-link" to={detailPath} onClick={trackOpen}><img src={screenshot.url} alt={screenshot.alt} loading="lazy" width="640" height="360" className="project-cover" /></Link>}
        </div>
        {children}
    </article>;
}
