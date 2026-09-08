import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { useObjectUrl } from '../../../hooks/useObjectUrl';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { api } from "../../../lib/api";

const Resume = () => {
    const { t } = useTranslation();
    const resource = usePublicResource({
        key: 'resume', load: signal => api.resume({ signal }), isEmpty: blob => blob.size === 0,
    });
    const resumeUrl = useObjectUrl('data' in resource.state ? resource.state.data : null);

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

                <PublicDataNotice {...resource} />
                {resumeUrl && <>
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
                        aria-label={t("resume.title")}
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
                </>}
            </div>
        </motion.div>
    );
};

export default Resume;