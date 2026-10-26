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
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { getPublicSnapshot } from '../../../lib/publicSnapshot';
import { BuildFocus } from './BuildFocus';
import { ArrowIcon } from '../../ArrowIcon';

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
            <div className="hero-content">
                <h1 className="hero-name"><span>{t('home.name')}</span>{' '}<span className="hero-surname">{t('home.surname')}</span></h1>
                <p className="hero-role">{t('home.subtitle')}</p>
                <p className="hero-description">{t('home.description')}</p>
                <div className="hero-actions">
                    {visible.showProjects && <Link className="primary-action" to="/projects">{t('home.viewWork')} <ArrowIcon /></Link>}
                    {visible.showResume && <ResumeDownloadButton />}
                    {visible.showContact && <Link className="s-button" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')}</Link>}
                </div>
                <div className="hero-socials">
                    <a href="https://github.com/MrWinRock" target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
                    <a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
                    {visible.showAbout && <Link to="/about">{t('home.aboutMe')} <ArrowIcon /></Link>}
                </div>
            </div>
            <figure className="identity-sleeve">
                <div className="sleeve-top"><span>MrWinRock</span><span>{t('home.portfolioLabel')}</span></div>
                <div className="sleeve-art"><img src="/logo.jpg" alt={t('home.brandAlt')} width="512" height="512" fetchPriority="high" decoding="async" /></div>
                <figcaption className="sleeve-caption"><span>{t('home.location')}</span><span>EN / TH</span></figcaption>
            </figure>
        </section>
        <BuildFocus />
        {settingsStatus === 'unavailable' && <PublicDataNotice state={{ status: 'unavailable', reason: 'unavailable' }} retry={retrySettings} />}
        {settingsStatus === 'snapshot' && <div className="public-notice"><p role="status">{t('resource.snapshot')}</p><button type="button" className="s-button mt-3" onClick={retrySettings}>{t('resource.retry')}</button></div>}
        {visible.showProjects && projects.state.status !== 'empty' && <section className="home-section">
            <div className="section-heading"><h2>{t('home.selectedTitle')}</h2><Link to="/projects">{t('projects.all')} <ArrowIcon /></Link></div>
            <PublicDataNotice {...projects} />
            {!!featured.length && <div className="showcase-grid">{featured.map((project, index) => <ProjectCard key={project._id ?? project.title} project={localizeProject(project, i18n.language)} number={index + 1} variant="showcase" />)}</div>}
        </section>}
        {visible.showSkills && <section className="home-section">
            <div className="section-heading"><h2>{t('home.techTitle')}</h2><Link to="/skills">{t('home.seeMore')} <ArrowIcon /></Link></div>
            <PublicDataNotice {...resource} />
            <div className="developer-stack">{skills.map(skill => visible.showProjects ? <Link className="skill-evidence" key={skill.name} to={'/projects?tech=' + encodeURIComponent(skill.name)}>{skill.icon && <img src={skill.icon} alt="" width="24" height="24" />}{skill.name} <ArrowIcon /></Link> : <span className="skill-evidence" key={skill.name}>{skill.name}</span>)}</div>
        </section>}
        {visible.showContact && <section className="contact-rail"><h2>{t('home.contactTitle')}</h2><Link className="primary-action" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')} <ArrowIcon /></Link></section>}
    </div>;
}
