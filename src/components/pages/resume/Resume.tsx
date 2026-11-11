import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { useObjectUrl } from '../../../hooks/useObjectUrl';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { api } from "../../../lib/api";
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { ArrowIcon } from '../../ArrowIcon';

const Resume = () => {
    const { t } = useTranslation();
    const resource = usePublicResource({
        key: 'resume', load: signal => api.resume({ signal }), isEmpty: blob => blob.size === 0,
    });
    const resumeUrl = useObjectUrl('data' in resource.state ? resource.state.data : null);

    return (
        <motion.div
            className="secondary-page"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
        >
            <div>
                <h1 className="page-title">
                    {t("resume.title")}
                </h1>

                <PublicDataNotice {...resource} />
                {resumeUrl && <>
                <div className="resume-toolbar flex flex-wrap gap-3 mb-6">
                    <a
                        href={resumeUrl}
                        download="Pharthiwath_Gristsoopharruth_Resume.pdf"
                        onClick={()=>trackPortfolioEvent('resume_download')}
                        className="p-button inline-flex items-center justify-center"
                    >
                        {t("resume.download")}
                        <svg className="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" /></svg>
                    </a>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s-button inline-flex items-center justify-center"
                    >
                        {t("resume.newTab")}
                        <ArrowIcon />
                    </a>
                </div>

                <div className="resume-frame border overflow-hidden">
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
