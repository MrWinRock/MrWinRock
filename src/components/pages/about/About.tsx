import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{t("about.title")}</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <motion.h2 className="text-2xl font-semibold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>{t("about.myStory")}</motion.h2>
                        <motion.p className="text-gray-300 mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            {t('about.description1')}
                            <a href="https://github.com/MrWinRock/stringy" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Stringy</a>
                            {t('about.description2')}
                            <a href="https://github.com/MrWinRock/chadchat" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Chadchat</a>
                            {t('about.description3')}
                        </motion.p>
                    </div>
                    <div>
                        <motion.h2 className="text-2xl font-semibold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>{t("about.education")}</motion.h2>
                        <motion.p className="text-gray-300"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            {t('about.educationDesc')}
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;