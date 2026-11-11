import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { skills as staticSkills, type Skill } from "../../../data/skills";
import { api } from "../../../lib/api";
import { getPublicSnapshot } from '../../../lib/publicSnapshot';
import { Link } from 'react-router-dom';
import { useSettings } from '../../../contexts/useSettings';
import { ArrowIcon } from '../../ArrowIcon';

interface CategoryGroup {
    id: string;
    title: string;
    orderFlag: number;
    skills: Skill[];
}

const Skills = () => {
    const { t } = useTranslation();
    const { settings, isInitialLoading } = useSettings();
    const canExplore = !isInitialLoading && settings.showProjects;

    const categoryTitles: Record<string, string> = {
        programming: t("skills.categories.programming"),
        web: t("skills.categories.web"),
        mobile: t("skills.categories.mobile"),
        backend: t("skills.categories.backend"),
        databases: t("skills.categories.databases"),
        cloud: t("skills.categories.cloud"),
        devtools: t("skills.categories.devtools"),
        game: t("skills.categories.game"),
        design: t("skills.categories.design"),
        other: t("skills.categories.other"),
    };

    const resource = usePublicResource<CategoryGroup[]>({
        key: 'skills',
        snapshot: () => { const published = getPublicSnapshot(); return published?.settings.showSkills ? Object.entries(published.skills).map(([id, cat]) => ({ id, title: id, orderFlag: cat.order_flag, skills: cat.skills.map(skill => ({ ...skill, category: skill.category ?? id, icon: skill.icon ?? '' })) })).sort((a,b)=>a.orderFlag-b.orderFlag) : undefined; },
        load: signal => api.skills({ signal }).then(response => Object.entries(response.data).map(([id, cat]) => ({
            id, title: id, orderFlag: cat.order_flag,
            skills: cat.skills.map(skill => ({ ...skill, category: skill.category ?? id, icon: skill.icon ?? '' })).sort((a, b) => a.order - b.order),
        })).sort((a, b) => a.orderFlag - b.orderFlag)),
        fallback: Object.keys(categoryTitles).map((id, index) => ({
            id, title: id, orderFlag: index + 1,
            skills: staticSkills.filter(skill => skill.category === id).sort((a, b) => a.order - b.order),
        })).filter(group => group.skills.length > 0),
        isEmpty: groups => groups.every(group => group.skills.length === 0),
    });
    const categoryGroups = 'data' in resource.state ? resource.state.data : [];

    return (
        <motion.div
            className="secondary-page"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
        >
            <div>
                <motion.h1
                    className="page-title"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    {t("skills.title")}
                </motion.h1>

                <PublicDataNotice {...resource} />
                <div className="space-y-10 mt-8">
                    {categoryGroups.map((category, categoryIndex) => (
                        <motion.section
                            key={category.id}
                            className="skill-category-section"
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: Math.min(categoryIndex * 0.05, 0.25)
                            }}
                        >
                            <div className="skill-category-header">
                                <h2 className="skill-category-title">
                                    {categoryTitles[category.id] || category.id}
                                </h2>
                                <span className="collection-count" aria-hidden="true">{category.skills.length}</span>
                            </div>

                            <div className="public-skill-grid">
                                {category.skills.map(skill => {
                                    const content = <>
                                        {skill.icon && <span className="skill-icon-well"><img src={skill.icon} alt="" loading="lazy" width="28" height="28" /></span>}
                                        <span className="text-sm font-semibold">{skill.name}</span>
                                        {canExplore && <span className="skill-tile-arrow"><ArrowIcon /></span>}
                                    </>;
                                    return canExplore
                                        ? <Link key={skill._id || skill.name} className="skill-tile" to={'/projects?tech=' + encodeURIComponent(skill.name)}>{content}</Link>
                                        : <div key={skill._id || skill.name} className="skill-tile">{content}</div>;
                                })}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Skills;
