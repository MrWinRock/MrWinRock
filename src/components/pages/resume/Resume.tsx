import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const RESUME_URL = "/Pharthiwath_Gristsoopharruth_Resume.pdf";

const Resume = () => {
    const { t } = useTranslation();

    return (
        <motion.div
            className="min-h-screen p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    {t("resume.title")}
                </h1>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <a
                        href={RESUME_URL}
                        download="MrWinRock-Resume.pdf"
                        className="p-button inline-flex items-center justify-center"
                    >
                        {t("resume.download")}
                    </a>
                    <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s-button inline-flex items-center justify-center"
                    >
                        {t("resume.newTab")}
                    </a>
                </div>

                <div className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900">
                    <object
                        data={RESUME_URL}
                        type="application/pdf"
                        className="w-full h-[75vh]"
                    >
                        <div className="p-6 text-gray-300">
                            <p className="mb-3">
                                {t("resume.browserError")}
                            </p>
                        </div>
                    </object>
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;