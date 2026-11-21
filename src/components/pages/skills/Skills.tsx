import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { skills as staticSkills, type Skill } from "../../../data/skills";
import { api } from "../../../lib/api";
import { getPublicSnapshot } from '../../../lib/publicSnapshot';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../../../contexts/useSettings';
import { ArrowIcon } from '../../ArrowIcon';
import { PageIntro } from '../PageIntro';

interface CategoryGroup {
    id: string;
    title: string;
    orderFlag: number;
    skills: Skill[];
}

const Skills = () => {
    const { t } = useTranslation();
    const { hash } = useLocation();
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
    const categoryGroups = 'data' in resource.state ? resource.state.data.filter(group => group.skills.length > 0).map(group => ({
        ...group,
        title: categoryTitles[group.id] || group.title,
        sectionId: 'skills-' + encodeURIComponent(group.id),
    })) : [];
    const activeSection = categoryGroups.find(category => '#' + encodeURIComponent(category.sectionId) === hash)?.sectionId;

    useEffect(() => {
        if (!activeSection) return;
        const frame = requestAnimationFrame(() => document.getElementById(activeSection)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
        return () => cancelAnimationFrame(frame);
    }, [activeSection]);

    return <div className="secondary-page skills-page">
        <PageIntro title={t('skills.title')} description={t('skills.intro')} />
        <PublicDataNotice {...resource} />
        {!!categoryGroups.length && <div className="skills-layout">
            {categoryGroups.length > 1 && <nav className="skills-nav" aria-label={t('skills.categoryNavigation')}>
                {categoryGroups.map(category => <a key={category.id} href={'#' + encodeURIComponent(category.sectionId)}
                    aria-current={category.sectionId === activeSection ? 'location' : undefined}>{category.title}</a>)}
            </nav>}
            <div className="skill-categories">
                {categoryGroups.map(category => <section key={category.id} id={category.sectionId} className="skill-category-section">
                    <div className="skill-category-header">
                        <h2 className="skill-category-title">{category.title}</h2>
                        <span className="collection-count" aria-hidden="true">{category.skills.length}</span>
                    </div>
                    <ul className="public-skill-grid" role="list">
                        {category.skills.map(skill => {
                            const content = <>
                                {skill.icon && <span className="skill-icon-well"><img src={skill.icon} alt="" loading="lazy" width="28" height="28" /></span>}
                                <span>{skill.name}</span>
                            </>;
                            return <li key={skill._id || skill.name}>
                                {canExplore ? <Link className="skill-tile" to={'/projects?tech=' + encodeURIComponent(skill.name)}>
                                    {content}<span className="skill-tile-arrow"><ArrowIcon /></span>
                                </Link> : <span className="skill-tile">{content}</span>}
                            </li>;
                        })}
                    </ul>
                </section>)}
            </div>
        </div>}
    </div>;
}

export default Skills;
