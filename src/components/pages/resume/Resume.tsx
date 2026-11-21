import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { useObjectUrl } from '../../../hooks/useObjectUrl';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { api } from "../../../lib/api";
import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { ArrowIcon } from '../../ArrowIcon';
import { PageIntro } from '../PageIntro';

const Resume = () => {
    const { t } = useTranslation();
    const resource = usePublicResource({
        key: 'resume', load: signal => api.resume({ signal }), isEmpty: blob => blob.size === 0,
    });
    const resumeUrl = useObjectUrl('data' in resource.state ? resource.state.data : null);
    const canPreviewPdf = typeof navigator === 'undefined' || navigator.pdfViewerEnabled !== false;

    return <div className="secondary-page resume-page">
        <PageIntro title={t('resume.title')} description={t('resume.intro')} actions={resumeUrl
            ? <div className="resume-toolbar">
                    <a
                        href={resumeUrl}
                        download="Pharthiwath_Gristsoopharruth_Resume.pdf"
                        onClick={()=>trackPortfolioEvent('resume_download')}
                        className="p-button"
                    >
                        {t("resume.download")}
                        <svg className="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" /></svg>
                    </a>
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s-button"
                    >
                        {t("resume.newTab")}
                        <ArrowIcon />
                    </a>
            </div> : undefined} />
        <PublicDataNotice {...resource} />
        {resumeUrl && <div className="resume-frame">
            <div className="resume-file">
                <span>{t('home.name')} {t('home.surname')}</span>
                <span>PDF</span>
            </div>
            {canPreviewPdf
                ? <object aria-label={t('resume.title')} data={resumeUrl} type="application/pdf" className="resume-preview">
                    <p className="resume-fallback">{t('resume.browserError')}</p>
                </object>
                : <p className="resume-fallback">{t('resume.browserError')}</p>}
        </div>}
    </div>;
};

export default Resume;
