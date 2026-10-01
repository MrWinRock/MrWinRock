import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../../hooks/useProjects';
import { groupProjects, localizeProject, projectSlug, isCompanyProject } from '../../../lib/portfolio';
import { PublicDataNotice } from '../../PublicDataNotice';
import { ProjectActions } from './ProjectActions';
import { safeExternalUrl } from '../../../lib/safeExternalUrl';
import { PageMetadata } from '../../PageMetadata';
export default function ProjectDetail() {
    const { slug } = useParams(); const { t, i18n } = useTranslation(); const resource = useProjects();
    const project = 'data' in resource.state ? groupProjects(resource.state.data).find(item => projectSlug(item) === slug && !isCompanyProject(item)) : undefined;
    if (!project) return <div className="page-shell"><PublicDataNotice {...resource} />{(resource.state.status === 'ready' || resource.state.status === 'stale' || resource.state.status === 'empty') && <><h1 className="page-title">{t('projects.notFound')}</h1><Link className="s-button inline-flex" to="/projects">{t('projects.back')}</Link></>}</div>;
    const content = localizeProject(project, i18n.language); const study = content.caseStudy;
    return <article className="page-shell"><PageMetadata title={content.title} description={content.description} /><Link className="text-cyan-200 inline-flex mb-6 py-2" to="/projects">← {t('projects.back')}</Link><p className="eyebrow">{t('projects.caseStudy')}</p><h1 className="page-title">{content.title}</h1><p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{content.description}</p><PublicDataNotice {...resource} /><div className="my-8 max-w-md"><ProjectActions url={content.url} repo={content.repo} /></div>
        <ul className="flex flex-wrap gap-2 mb-10" aria-label={t('projects.technologies')}>{content.tech.map(tag => <li key={tag} className="tech-tag">{tag}</li>)}</ul>
        <div className="grid md:grid-cols-2 gap-6">{study?.problem && <section className="evidence-panel"><h2>{t('projects.problem')}</h2><p>{study.problem}</p></section>}{study?.role && <section className="evidence-panel"><h2>{t('projects.role')}</h2><p>{study.role}</p></section>}
        {!!study?.decisions?.length && <section className="evidence-panel"><h2>{t('projects.decisions')}</h2><ul>{study.decisions.map((text, index) => <li key={index}>{text}</li>)}</ul></section>}
        {!!study?.outcomes?.length && <section className="evidence-panel"><h2>{t('projects.outcomes')}</h2><ul>{study.outcomes.map((text, index) => <li key={index}>{text}</li>)}</ul></section>}</div>
        {!!study?.repositories?.length && <section className="mt-10"><h2 className="text-2xl mb-4">{t('projects.repositories')}</h2><div className="flex flex-wrap gap-3">{study.repositories.map(item => safeExternalUrl(item.url) && <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="s-button">{item.label} ↗</a>)}</div></section>}
        {!!study?.screenshots?.length && <section className="grid gap-6 mt-10">{study.screenshots.map(item => safeExternalUrl(item.url) && <figure key={item.url}><img className="project-screenshot w-full" src={item.url} alt={item.alt} loading="lazy" /><figcaption className="mt-2 text-gray-300">{item.alt}</figcaption></figure>)}</section>}
        </article>;
}
