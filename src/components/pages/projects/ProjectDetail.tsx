import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../../hooks/useProjects';
import { groupProjects, isCompanyProject, isInfoXP, localizeProject, projectSlug } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectActions } from './ProjectActions';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { PageMetadata } from '../../PageMetadata';
import { ArrowIcon } from '../../ArrowIcon';
import { TechnologyTags } from '../../TechnologyTags';
import { PageIntro } from '../PageIntro';
import { projectScreenshots } from './projectScreenshots';

export default function ProjectDetail() {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const resource = useProjects();
    const project = 'data' in resource.state ? groupProjects(resource.state.data).find(item => projectSlug(item) === slug && !isCompanyProject(item)) : undefined;
    const { hash } = useLocation();
    useEffect(() => {
        if (!project || !hash) return;
        const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView?.({ block: 'start', behavior: 'instant' }));
        return () => cancelAnimationFrame(frame);
    }, [project, hash]);
    if (!project) return <div className="page-shell">
        {(resource.state.status === 'ready' || resource.state.status === 'stale' || resource.state.status === 'empty') &&
            <PageIntro title={t('projects.notFound')} actions={<Link className="s-button" to="/projects"><ArrowIcon back /> {t('projects.back')}</Link>} />}
        <PublicDataNotice {...resource} />
    </div>;

    const content = localizeProject(project, i18n.language);
    const study = content.caseStudy;
    const infoXP = isInfoXP(project);
    const problem = study?.problem || (infoXP ? t('projects.infoxp.problem') : '');
    const role = study?.role || (infoXP ? t('projects.infoxp.role') : '');
    const decisions = study?.decisions?.length ? study.decisions : infoXP ? [t('projects.infoxp.decision')] : [];
    const repositories = (study?.repositories ?? []).filter(item => safeExternalUrl(item.url));
    const screenshots = projectScreenshots(content, t);
    const media = { id: 'screenshots', body: screenshots.length > 0 && <div className="detail-screenshots">
        {screenshots.map(item => <figure key={item.url}>
            <a className="detail-screenshot-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.alt}>
                <img className="project-screenshot" src={item.url} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
            </a>
            <figcaption>{item.caption}</figcaption>
        </figure>)}
    </div> };
    const technologies = { id: 'technologies', body: content.tech.length > 0 && <TechnologyTags technologies={content.tech} /> };
    const sections = [
        infoXP ? media : technologies,
        { id: 'problem', body: problem && <p>{problem}</p> },
        { id: 'role', body: role && <p>{role}</p> },
        { id: 'decisions', body: decisions.length > 0 && <ul className="detail-points">{decisions.map((text, index) => <li key={index}>{text}</li>)}</ul> },
        { id: 'outcomes', body: !!study?.outcomes?.length && <ul className="detail-points">{study.outcomes.map((text, index) => <li key={index}>{text}</li>)}</ul> },
        infoXP ? technologies : media,
        { id: 'repositories', body: repositories.length > 0 && <div className="detail-repositories">
            {repositories.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="s-button detail-repository-link">{item.label} <ArrowIcon /></a>)}
        </div> },
    ].filter(section => section.body);

    return <article className="page-shell project-detail">
        <PageMetadata title={content.title} description={content.description} />
        <Link className="detail-back-link" to="/projects"><ArrowIcon back /> {t('projects.back')}</Link>
        <PageIntro title={content.title} description={content.description} descriptionId="description"
            actions={<ProjectActions url={content.url} repo={content.repo} />} />
        <PublicDataNotice {...resource} />
        {!!sections.length && <div className="detail-layout">
            {sections.length > 1 && <nav className="detail-nav" aria-label={t('projects.caseStudy')}>
                <p>{t('projects.caseStudy')}</p>
                {sections.map(({ id }) => <a key={id} href={'#' + id}>{t('projects.' + id)}</a>)}
            </nav>}
            <div className="detail-contents">
                {sections.map(({ id, body }) => <section key={id} id={id} className="detail-section">
                    <h2>{t('projects.' + id)}</h2>
                    <div className="detail-section-body">{body}</div>
                </section>)}
            </div>
        </div>}
    </article>;
}
