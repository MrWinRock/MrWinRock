import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import SpotlightCard from "@/components/cards/SpotLightCard";
import { api, type AboutDoc } from '../../../lib/api';

const About = () => {
    const { t, i18n } = useTranslation();
    const [about, setAbout] = useState<AboutDoc | null>(null);

    useEffect(() => {
        let cancelled = false;
        const lang = i18n.language?.startsWith('th') ? 'th' : 'en';

        (async () => {
            try {
                const res = await api.about(lang);
                if (!cancelled && res.ok) setAbout(res.data);
            } catch {
                // Keep the i18n static content as a fallback on failure.
                if (!cancelled) setAbout(null);
            }
        })();

        return () => { cancelled = true; };
    }, [i18n.language]);

    return (
        <motion.div
            className="min-h-screen p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold mb-10 text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {t("about.title")}
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    <SpotlightCard index={0} className="flex flex-col" spotlightColor="rgba(128, 0, 255, 0.3)">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="grid place-items-center w-10 h-10 rounded-xl bg-linear-to-br from-[#8000FF] to-[#00FFFF] text-white shrink-0">
                                <StoryIcon />
                            </span>
                            <h2 className="text-2xl font-semibold">{t("about.myStory")}</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {about ? about.story : (
                                <>
                                    {t('about.description1')}
                                    <a href="https://github.com/MrWinRock/stringy" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Stringy</a>
                                    {t('about.description2')}
                                    <a href="https://github.com/MrWinRock/chadchat" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Chadchat</a>
                                    {t('about.description3')}
                                </>
                            )}
                        </p>
                    </SpotlightCard>

                    <SpotlightCard index={1} className="flex flex-col" spotlightColor="rgba(0, 255, 255, 0.3)">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="grid place-items-center w-10 h-10 rounded-xl bg-linear-to-br from-[#00FFFF] to-[#8000FF] text-white shrink-0">
                                <EducationIcon />
                            </span>
                            <h2 className="text-2xl font-semibold">{t("about.education")}</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {about ? about.background : t('about.educationDesc')}
                        </p>
                    </SpotlightCard>
                </div>
            </div>
        </motion.div>
    );
};

const StoryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);
const EducationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
    </svg>
);

export default About;
