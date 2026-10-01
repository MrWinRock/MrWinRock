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

    const getDateRange = (start: string, end?: string) => {
        return `${formatDate(start)} — ${end ? formatDate(end) : t("experience.present")}`;
    };

    return <div className="secondary-page">
        <h1>{t('experience.title')}</h1><PublicDataNotice {...resource} />
        <div className="experience-list">{experienceList.map(exp => <article className="experience-row" key={exp._id || `${exp.company}-${exp.title}-${exp.startDate}`}>
            <span className="experience-marker" aria-hidden="true" />
            <div className="experience-meta"><p className="experience-period">{getDateRange(exp.startDate,exp.endDate)}</p><span className="experience-kind">{t('experience.types.'+exp.type,{defaultValue:exp.type})}</span></div>
            <div className="experience-body"><h2>{exp.title}</h2><p className="experience-company">{exp.company} · {exp.location}</p><p>{exp.description}</p>
                {!!exp.achievements.length && <div><h3>{t('experience.achievements')}</h3><ul>{exp.achievements.map((achievement,index)=><li key={index}>{achievement}</li>)}</ul></div>}
                <div className="flex flex-wrap gap-2">{exp.tech.map((tag,index)=><span className="tech-tag" key={index}>{tag}</span>)}</div>
            </div>
        </article>)}</div>
    </div>;
};
export default Experience;
