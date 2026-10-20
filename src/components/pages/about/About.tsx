import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import SpotlightCard from "@/components/cards/SpotLightCard";
import { api } from '../../../lib/api';
import { getPublicSnapshot } from '../../../lib/publicSnapshot';

const About = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language?.startsWith('th') ? 'th' : 'en';
    const resource = usePublicResource({
        key: 'about:' + lang,
        load: signal => api.about(lang, { signal }).then(response => response.data),
        snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showAbout ? published.about[lang] : undefined; },
        isEmpty: value => !value.story && !value.background,
    });
    const about = 'data' in resource.state ? resource.state.data : null;

    return (
        <motion.div
            className="secondary-page"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
        >
            <div>
                <p className="eyebrow"><span aria-hidden="true">01 / </span>{t("nav.about")}</p>
                <motion.h1
                    className="page-title"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    {t("about.title")}
                </motion.h1>

                <PublicDataNotice {...resource} />
                {about && <div className="grid md:grid-cols-2 gap-6 items-stretch mt-8">
                    <SpotlightCard index={0} className="flex flex-col" spotlightColor="rgba(128, 0, 255, 0.24)">
                        <div className="flex items-center gap-3.5 mb-5">
                            <span className="neutral-icon">
                                <StoryIcon />
                            </span>
                            <h2 className="text-2xl font-semibold tracking-tight">{t("about.myStory")}</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {about.story}
                        </p>
                    </SpotlightCard>

                    <SpotlightCard index={1} className="flex flex-col" spotlightColor="rgba(0, 255, 255, 0.2)">
                        <div className="flex items-center gap-3.5 mb-5">
                            <span className="neutral-icon">
                                <EducationIcon />
                            </span>
                            <h2 className="text-2xl font-semibold tracking-tight">{t("about.education")}</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {about.background}
                        </p>
                    </SpotlightCard>
                </div>}
            </div>
        </motion.div>
    );
};

const StoryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);
const EducationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
    </svg>
);

export default About;
