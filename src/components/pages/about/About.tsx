import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { useTranslation } from 'react-i18next';
import { api } from '../../../lib/api';
import { getPublicSnapshot } from '../../../lib/publicSnapshot';
import { Link } from 'react-router-dom';
import { useSettings } from '../../../contexts/useSettings';
import { ArrowIcon } from '../../ArrowIcon';
import { PageIntro } from '../PageIntro';

const About = () => {
    const { t, i18n } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const lang = i18n.language?.startsWith('th') ? 'th' : 'en';
    const resource = usePublicResource({
        key: 'about:' + lang,
        load: signal => api.about(lang, { signal }).then(response => response.data),
        snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showAbout ? published.about[lang] : undefined; },
        isEmpty: value => !value.story && !value.background,
    });
    const about = 'data' in resource.state ? resource.state.data : null;

    return <div className="secondary-page about-page">
        <PageIntro title={t('about.title')} />
        <PublicDataNotice {...resource} />
        {about && <div className="about-layout">
            <aside className="about-profile" aria-labelledby="about-profile-name">
                <div className="about-profile-art"><img src="/logo.jpg" alt="" width="512" height="512" decoding="async" /></div>
                <div className="about-profile-copy">
                    <h2 id="about-profile-name">{t('home.name')} {t('home.surname')}</h2>
                    <p>{t('home.subtitle')}</p>
                    <p>{t('home.location')}</p>
                </div>
            </aside>
            <div className="about-reading">
                {about.story && <section>
                    <h2>{t('about.myStory')}</h2>
                    <p>{about.story}</p>
                </section>}
                {about.background && <section>
                    <h2>{t('about.education')}</h2>
                    <p>{about.background}</p>
                </section>}
                {!isInitialLoading && (settings.showProjects || settings.showExperience) && <div className="about-actions">
                    {settings.showProjects && <Link className="primary-action" to="/projects">{t('home.viewWork')} <ArrowIcon /></Link>}
                    {settings.showExperience && <Link className="s-button" to="/experience">{t('nav.experience')}</Link>}
                </div>}
            </div>
        </div>}
    </div>;
};

export default About;
