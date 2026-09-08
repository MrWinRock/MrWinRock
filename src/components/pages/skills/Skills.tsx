import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import { skills as staticSkills, type Skill } from "../../../data/skills";
import { api } from "../../../lib/api";

interface CategoryGroup {
    id: string;
    title: string;
    orderFlag: number;
    skills: Skill[];
}

const Skills = () => {
    const { t } = useTranslation();

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
            className="min-h-screen p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {t("skills.title")}
                </motion.h1>

                <PublicDataNotice {...resource} />
                <div className="space-y-12">
                    {categoryGroups.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: categoryIndex * 0.2 + 0.4
                            }}
                        >
                            <motion.h2
                                className="text-2xl font-semibold mb-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: categoryIndex * 0.2 + 0.5 }}
                            >
                                {categoryTitles[category.id] || category.id}
                            </motion.h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill._id || skill.name}
                                        className="p-button p-4 flex flex-col gap-2 items-center justify-center text-center"
                                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.6
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <motion.img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-10 h-10"
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.6 }
                                            }}
                                        />
                                        <span className="text-sm font-semibold">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Skills;