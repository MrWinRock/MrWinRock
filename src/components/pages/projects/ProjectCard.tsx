import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../data/projects';
import { isInfoXP, projectSlug } from '../../../lib/portfolio';
import { ProjectActions } from './ProjectActions';
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { ArrowIcon } from '../../ArrowIcon';
import { TechnologyTags } from '../../TechnologyTags';
import { projectScreenshots } from './projectScreenshots';

const infoXPStack = ['React', 'TypeScript', 'React Native', 'Bun'];

export function ProjectCard({ project, number, variant, children }: { project: Project; number?: number; variant?: 'showcase'; children?: ReactNode }) {
    const { t } = useTranslation();
    const infoXP = isInfoXP(project);
    const screenshot = projectScreenshots(project, t)[0];
    const technologies = infoXP
        ? [...new Set([...infoXPStack.filter(tech => project.tech.includes(tech)), ...project.tech])].slice(0, 4)
        : project.tech;
    const detailPath = '/projects/' + projectSlug(project);
    const trackOpen = () => trackPortfolioEvent('project_open', projectSlug(project));
    return <article className={`project-card${variant === 'showcase' ? ' project-showcase' : ''}${screenshot ? ' project-with-cover' : ''}`} data-featured={number ? true : undefined}>
        <div className="project-card-body">
            <div className="project-info">
            <div className="project-summary">
                <div className="project-title-row">
                    {number !== undefined && <span className="project-index" aria-hidden="true">{String(number).padStart(2, '0')}</span>}
                    <h3><Link className="project-title-link" to={detailPath} onClick={trackOpen}>{project.title}</Link></h3>
                </div>
                <p>{project.description}</p>
                {infoXP && <p className="project-contribution">{t('projects.infoxp.cardContribution')}</p>}
                <TechnologyTags technologies={technologies} />
            </div>
            <div className="project-links">
                <Link className="project-detail-link" onClick={trackOpen} to={detailPath}>{t('projects.details')} <ArrowIcon /></Link>
                <ProjectActions url={project.url} repo={project.repo} />
            </div>
            </div>
            {screenshot && <Link className="project-cover-link" to={detailPath} onClick={trackOpen}><img src={screenshot.url} alt={screenshot.alt} loading="lazy" width={screenshot.width ?? 640} height={screenshot.height ?? 360} className="project-cover" /></Link>}
        </div>
        {children}
    </article>;
}
