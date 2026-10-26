import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { api } from "../../../lib/api";
import { localizeExperience } from '../../../lib/portfolio';
import { getPublicSnapshot } from '../../../lib/publicSnapshot';

const Experience = () => {
    const { t, i18n } = useTranslation();
    const localeMap: Record<string, string> = { en: 'en-US', th: 'th-TH' };
    const resource = usePublicResource({
        key: 'experiences', load: signal => api.experiences({ signal }).then(response => response.data),
        snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showExperience ? published.experiences : undefined; },
        isEmpty: value => value.length === 0,
    });
    const experienceList = 'data' in resource.state ? resource.state.data.map(item => localizeExperience(item, i18n.language)) : [];

    const formatDate = (dateStr: string) => {
        const [year, month] = dateStr.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        const locale = localeMap[i18n.language] ?? i18n.language;
        return date.toLocaleDateString(locale, {
            month: "short",
            year: "numeric",
        });
    };

    return <div className="secondary-page">
        <h1 className="page-title" id="experience-title">{t('experience.title')}</h1>
        <PublicDataNotice {...resource} />
        {!!experienceList.length && <ol className="experience-list" role="list" aria-labelledby="experience-title">
            {experienceList.map(exp => <li key={exp._id || `${exp.company}-${exp.title}-${exp.startDate}`}>
                <article className="experience-row" data-current={!exp.endDate}>
                    <div className="experience-meta">
                        <p className="experience-period">
                            <svg className="experience-calendar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                <path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" />
                            </svg>
                            <span>
                                <time dateTime={exp.startDate}>{formatDate(exp.startDate)}</time>
                                {' — '}
                                {exp.endDate ? <time dateTime={exp.endDate}>{formatDate(exp.endDate)}</time> : t('experience.present')}
                            </span>
                        </p>
                    </div>
                    <div className="experience-body">
                        <div className="experience-heading">
                            <h2>{exp.title}</h2>
                            <span className="experience-kind">{t('experience.types.' + exp.type, { defaultValue: exp.type })}</span>
                        </div>
                        <p className="experience-company">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                        <p>{exp.description}</p>
                        {!!exp.achievements.length && <div>
                            <h3>{t('experience.achievements')}</h3>
                            <ul>{exp.achievements.map((achievement, index) => <li key={index}>{achievement}</li>)}</ul>
                        </div>}
                        {!!exp.tech.length && <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tag, index) => <span className="tech-tag" key={index}>{tag}</span>)}
                        </div>}
                    </div>
                </article>
            </li>)}
        </ol>}
    </div>;
};
export default Experience;
