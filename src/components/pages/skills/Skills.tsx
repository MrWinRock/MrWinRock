import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { getSkillCategories } from "../../../data/skillCategories";

const Skills = () => {
    const { t } = useTranslation();

    // Get skill categories with translations
    const skillCategories = getSkillCategories(t);

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

                <div className="space-y-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
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
                                {category.title}
                            </motion.h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
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
                                            src={skill.image}
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