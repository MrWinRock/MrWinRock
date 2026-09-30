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
        <section className="hero">
            <div><p className="eyebrow">{t('home.subtitle')}</p><h1 className="hero-name">{t('home.name')} <br />{t('home.surname')}</h1>
            <p className="hero-description">{t('home.description')}</p>
            <div className="flex flex-wrap gap-3 mt-7">{visible.showProjects && <Link className="primary-action" to="/projects">{t('home.viewWork')} <span aria-hidden="true">↗</span></Link>}{visible.showResume && <ResumeDownloadButton />}{visible.showContact && <Link className="s-button inline-flex items-center" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')}</Link>}</div>
            <div className="flex flex-wrap gap-5 mt-6 text-gray-300"><a href="https://github.com/MrWinRock" target="_blank" rel="noopener noreferrer" className="inline-flex py-2 hover:text-cyan-200">GitHub ↗</a><a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" target="_blank" rel="noopener noreferrer" className="inline-flex py-2 hover:text-cyan-200">LinkedIn ↗</a>{visible.showAbout && <Link className="inline-flex py-2 hover:text-cyan-200" to="/about">{t('home.aboutMe')} →</Link>}</div>
            </div>
            <div className="hero-identity"><img src={profileImage} width="256" height="256" alt={t('home.brandAlt')} fetchPriority="high" decoding="async" /><p>MrWinRock <span aria-hidden="true">/</span> Bangkok</p></div>
        </section>
        {settingsStatus === 'unavailable' && <PublicDataNotice state={{ status: 'unavailable', reason: 'unavailable' }} retry={retrySettings} />}
        {settingsStatus === 'snapshot' && <div className="my-6 rounded-xl border border-cyan-300/40 p-5"><p role="status">{t('resource.snapshot')}</p><button type="button" className="s-button mt-3" onClick={retrySettings}>{t('resource.retry')}</button></div>}
        {visible.showProjects && projects.state.status !== 'empty' && <section className="home-section"><div className="section-heading"><div><p className="eyebrow">{t('projects.selected')}</p><h2>{t('home.selectedTitle')}</h2></div><Link to="/projects" className="text-cyan-200 py-2">{t('projects.all')} →</Link></div><PublicDataNotice {...projects} />{!!featured.length && <div className="grid md:grid-cols-3 gap-5">{featured.map((project, index) => <ProjectCard key={project._id ?? project.title} project={localizeProject(project, i18n.language)} number={index + 1} />)}</div>}</section>}
        {visible.showSkills && <section className="home-section"><div className="section-heading"><div><p className="eyebrow">{t('home.evidence')}</p><h2>{t('home.techTitle')}</h2></div>{visible.showSkills && <Link className="text-cyan-200 py-2" to="/skills">{t('home.seeMore')} →</Link>}</div><PublicDataNotice {...resource} /><div className="flex flex-wrap gap-3">{skills.map(skill => visible.showProjects ? <Link className="skill-evidence" key={skill.name} to={'/projects?tech=' + encodeURIComponent(skill.name)}>{skill.icon && <img src={skill.icon} alt="" width="24" height="24" />}{skill.name} <span aria-hidden="true">↗</span></Link> : <span className="skill-evidence" key={skill.name}>{skill.name}</span>)}</div></section>}
        {visible.showContact && <section className="contact-rail"><h2>{t('home.contactTitle')}</h2><Link className="primary-action" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')} ↗</Link></section>}
    </div>;
}
