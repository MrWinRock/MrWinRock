import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";

const Resume = () => {
    const { t } = useTranslation();
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let objectUrl: string | null = null;
        
        const fetchResume = async () => {
            try {
                const blob = await api.resume();
                objectUrl = URL.createObjectURL(blob);
                setResumeUrl(objectUrl);
            } catch (err) {
                console.error("Failed to fetch resume:", err);
                setError(t("resume.error") || "Failed to load resume");
            } finally {
                setIsLoading(false);
            }
        };

        fetchResume();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [t]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !resumeUrl) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-500">
                {error || t("resume.error") || "Failed to load resume"}
            </div>
        );
    }

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
                        href={resumeUrl}
                        download="Pharthiwath_Gristsoopharruth_Resume.pdf"
                        className="p-button inline-flex items-center justify-center"
                    >
                        {t("resume.download")}
                    </a>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s-button inline-flex items-center justify-center"
                    >
                        {t("resume.newTab")}
                    </a>
                </div>

                <div className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900">
                    <object
                        data={resumeUrl}
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