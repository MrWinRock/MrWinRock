import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePublicResource } from '../../../hooks/usePublicResource';
import { useProjects } from '../../../hooks/useProjects';
import { PublicDataNotice } from '../../PublicDataNotice';
import { api } from '../../../lib/api';
import { useSettings } from '../../../contexts/useSettings';
import { HIDDEN_SETTINGS } from '../../../contexts/settingsConstants';
import { featuredProjects, groupProjects, localizeProject } from '../../../lib/portfolio';
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
    const featured = 'data' in projects.state ? featuredProjects(groupProjects(projects.state.data)) : [];
    const skills = 'data' in resource.state ? priorities.flatMap(name => resource.state.status === 'ready' || resource.state.status === 'stale' ? resource.state.data.filter(skill => skill.name.toLowerCase() === name.toLowerCase()).slice(0, 1) : []) : [];
    const renderIdentityCard = (position: 'hero' | 'after-work') => <div className={`hero-stage hero-stage-${position}`}>
        <div className="hero-stage-emblem">
            <div className="hero-signature">
                <img src="/logo.jpg" alt={t('home.brandAlt')} width="512" height="512" loading={position === 'after-work' ? 'lazy' : undefined} decoding="async" />
            </div>
            <div className="hero-stage-meta">
                <span className="hero-stage-mark">mrwinrock<span aria-hidden="true">.</span></span>
                <span className="hero-stage-label">{t('home.portfolioLabel')}</span>
            </div>
        </div>
        <div className="hero-socials">
            <a href="https://github.com/MrWinRock" target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a>
            <a href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a>
            {visible.showAbout && <Link to="/about">{t('home.aboutMe')} <ArrowIcon /></Link>}
            {visible.showContact && <Link onClick={() => trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')} <ArrowIcon /></Link>}
        </div>
    </div>;
    return <div className="home-page">
        <section className="hero" aria-labelledby="home-title">
            <div className="hero-grid">
                <div className="hero-panel">
                    <div className="hero-panel-top">
                        <h1 id="home-title" className="hero-name"><span className="hero-given">{t('home.name')}</span>{' '}<span className="hero-family">{t('home.surname')}</span></h1>
                        <div className="hero-meta">
                            <p className="hero-role">{t('home.subtitle')}</p>
                            <span className="hero-meta-dot" aria-hidden="true" />
                            <p className="hero-location">{t('home.location')}</p>
                        </div>
                        <p className="hero-description">{t('home.description')}</p>
                    </div>
                    <div className="hero-actions">
                        {visible.showProjects && <Link className="primary-action" to="/projects">{t('home.viewWork')} <ArrowIcon /></Link>}
                        {visible.showResume && <ResumeDownloadButton />}
                    </div>
                </div>
                {renderIdentityCard('hero')}
            </div>
        </section>
        {settingsStatus === 'unavailable' && <PublicDataNotice state={{ status: 'unavailable', reason: 'unavailable' }} retry={retrySettings} />}
        {settingsStatus === 'snapshot' && <div className="public-notice"><p role="status">{t('resource.snapshot')}</p><button type="button" className="s-button mt-3" onClick={retrySettings}>{t('resource.retry')}</button></div>}
        {visible.showProjects && projects.state.status !== 'empty' && <section className="home-section selected-work">
            <div className="section-heading"><h2>{t('home.selectedTitle')}</h2><Link to="/projects">{t('projects.all')} <ArrowIcon /></Link></div>
            <PublicDataNotice {...projects} />
            {!!featured.length && <div className="showcase-grid">{featured.map((project, index) => <ProjectCard key={project._id ?? project.title} project={localizeProject(project, i18n.language)} number={index + 1} variant="showcase" />)}</div>}
        </section>}
        {renderIdentityCard('after-work')}
        <div className="home-bento-lower">
            <BuildFocus />
            {visible.showSkills && <section className="home-stack-panel" aria-labelledby="home-tech-title">
                <div className="bento-panel-header">
                    <h2 id="home-tech-title">{t('home.techTitle')}</h2>
                    <Link to="/skills">{t('home.seeMore')} <ArrowIcon /></Link>
                </div>
                <PublicDataNotice {...resource} />
                {!!skills.length && <div className="developer-stack">{skills.map(skill => {
                    const icon = skill.icon ? <span className="skill-evidence-icon"><img src={skill.icon} alt="" width="20" height="20" /></span> : null;
                    return visible.showProjects
                        ? <Link className="skill-evidence" key={skill.name} to={'/projects?tech=' + encodeURIComponent(skill.name)}>{icon}<span className="skill-evidence-name">{skill.name}</span><ArrowIcon /></Link>
                        : <span className="skill-evidence" key={skill.name}>{icon}<span className="skill-evidence-name">{skill.name}</span></span>;
                })}</div>}
            </section>}
        </div>
        {visible.showContact && <section className="contact-rail"><h2>{t('home.contactTitle')}</h2><Link className="primary-action" onClick={()=>trackPortfolioEvent('contact_intent')} to="/contact">{t('nav.contact')} <ArrowIcon /></Link></section>}
    </div>;
}
