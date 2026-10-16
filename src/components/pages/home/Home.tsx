import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePublicResource } from '../../../hooks/usePublicResource';
import { useProjects } from '../../../hooks/useProjects';
import { PublicDataNotice } from '../../PublicDataNotice';
import { api } from '../../../lib/api';
import { useSettings } from '../../../contexts/useSettings';
import { HIDDEN_SETTINGS } from '../../../contexts/settingsConstants';
import { groupProjects, localizeProject, isFeaturedProject } from '../../../lib/portfolio';
import { ProjectCard } from '../projects/ProjectCard';
import { ResumeDownloadButton } from '../../ResumeDownloadButton';
import profileImage from '../../../assets/logo.webp';
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { getPublicSnapshot } from '../../../lib/publicSnapshot';
import { BuildFocus } from './BuildFocus';

const priorities = ['TypeScript', 'React', 'Node.js', 'Bun', 'MongoDB', 'Docker'];
export default function Home() {
    const { t, i18n } = useTranslation();
    const { settings, isInitialLoading, settingsStatus, retrySettings } = useSettings();
    const visible = isInitialLoading ? HIDDEN_SETTINGS : settings;
    const resource = usePublicResource({
        key: 'home-skills', load: signal => api.skills({ signal }).then(response => Object.values(response.data).flatMap(group => group.skills)),
        snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showSkills ? Object.values(published.skills).flatMap(group=>group.skills) : undefined; },
        isEmpty: value => value.length === 0,
    });
    const projects = useProjects();
    const featured = 'data' in projects.state ? groupProjects(projects.state.data).filter(isFeaturedProject).slice(0, 3) : [];
    const skills = 'data' in resource.state ? priorities.flatMap(name => resource.state.status === 'ready' || resource.state.status === 'stale' ? resource.state.data.filter(skill => skill.name.toLowerCase() === name.toLowerCase()).slice(0, 1) : []) : [];
    return <div className="home-page">
        <section className="hero developer-hero">
            <div className="hero-content"><div className="developer-identity"><img src={profileImage} width="80" height="80" alt={t('home.brandAlt')} fetchPriority="high" decoding="async" /><div><p>MrWinRock<span aria-hidden="true">_</span></p><span>{t('home.location')}</span></div></div><p className="developer-greeting"><span aria-hidden="true">// </span>{t('home.title')}</p><h1 className="hero-name"><span>{t('home.name')}</span>{' '}<span className="hero-surname">{t('home.surname')}</span></h1><p className="hero-role"><span aria-hidden="true">&lt;</span><span className="role-title">{t('home.subtitle')}</span><span aria-hidden="true"> /&gt;</span></p>
            <p className="hero-description">{t('home.description')}</p>
            <div className="hero-actions">{visible.showProjects && <Link className="primary-action" to="/projects">{t('home.viewWork')} <span aria-hidden="true">↗</span></Link>}{visible.showResume && <ResumeDownloadButton />}{visible.showContact && <Link className="s-button inline-flex items-center" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')}</Link>}</div>
            <div className="hero-socials"><a href="https://github.com/MrWinRock" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>{visible.showAbout && <Link to="/about">{t('home.aboutMe')} <span aria-hidden="true">→</span></Link>}</div>
            </div>
            <BuildFocus />
        </section>
        {settingsStatus === 'unavailable' && <PublicDataNotice state={{ status: 'unavailable', reason: 'unavailable' }} retry={retrySettings} />}
        {settingsStatus === 'snapshot' && <div className="public-notice"><p role="status">{t('resource.snapshot')}</p><button type="button" className="s-button mt-3" onClick={retrySettings}>{t('resource.retry')}</button></div>}
        {visible.showProjects && projects.state.status !== 'empty' && <section className="home-section"><div className="section-heading"><div><p className="eyebrow"><span aria-hidden="true">01 / </span>{t('projects.selected')}</p><h2>{t('home.selectedTitle')}<span className="heading-dot" aria-hidden="true">.</span></h2></div><Link to="/projects" className="text-cyan-200 py-2">{t('projects.all')} →</Link></div><PublicDataNotice {...projects} />{!!featured.length && <div className="showcase-grid">{featured.map((project, index) => <ProjectCard key={project._id ?? project.title} project={localizeProject(project, i18n.language)} number={index + 1} variant="showcase" />)}</div>}</section>}
        {visible.showSkills && <section className="home-section"><div className="section-heading"><div><p className="eyebrow"><span aria-hidden="true">02 / </span>{t('home.evidence')}</p><h2>{t('home.techTitle')}<span className="heading-dot" aria-hidden="true">.</span></h2></div>{visible.showSkills && <Link className="text-cyan-200 py-2" to="/skills">{t('home.seeMore')} →</Link>}</div><PublicDataNotice {...resource} /><div className="developer-stack">{skills.map(skill => visible.showProjects ? <Link className="skill-evidence" key={skill.name} to={'/projects?tech=' + encodeURIComponent(skill.name)}>{skill.icon && <img src={skill.icon} alt="" width="24" height="24" />}{skill.name} <span aria-hidden="true">↗</span></Link> : <span className="skill-evidence" key={skill.name}>{skill.name}</span>)}</div></section>}
        {visible.showContact && <section className="contact-rail"><span className="contact-code-mark" aria-hidden="true">&lt;/&gt;</span><div><p className="eyebrow"><span aria-hidden="true">03 / </span>{t('home.startConversation')}</p><h2>{t('home.contactTitle')}</h2></div><Link className="primary-action" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')} <span aria-hidden="true">↗</span></Link></section>}
    </div>;
}
