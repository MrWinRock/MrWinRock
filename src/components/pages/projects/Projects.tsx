import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { usePublicResource } from '../../../hooks/usePublicResource';
import { PublicDataNotice } from '../../../components/PublicDataNotice';
import SpotlightCard from "@/components/cards/SpotLightCard";
import { projects as staticProjects, type Project } from "../../../data/projects";
import { api } from "../../../lib/api";
import { ProjectActions } from "./ProjectActions";

const Projects = () => {
    const { t } = useTranslation();
    const resource = usePublicResource<Project[]>({
        key: 'projects',
        load: signal => api.projects({ signal }).then(response => response.data.map(p => ({ ...p, url: p.url || undefined, repo: p.repo || undefined })).sort((a, b) => a.order - b.order)),
        fallback: staticProjects,
        isEmpty: value => value.length === 0,
    });
    const projectList = 'data' in resource.state ? resource.state.data : [];

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
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 120
                    }}
                >
                    {t("projects.title")}
                </motion.h1>

                <PublicDataNotice {...resource} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectList.map((project, index) => (
                        <SpotlightCard
                            key={project._id || index}
                            className="flex flex-col h-full"
                            index={index}
                            spotlightColor="rgba(255, 0, 255, 0.3)"
                            motionProps={{ whileHover: { transition: { duration: 0.3 } } }}
                        >
                            <div className="flex flex-col">
                                <motion.h2
                                    className="text-xl font-bold text-white h-14 flex items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.3 }}
                                >
                                    <span className="line-clamp-2">{project.title}</span>
                                </motion.h2>

                                <motion.p
                                    className="text-gray-300 text-sm leading-relaxed h-18 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.4 }}
                                >
                                    <span className="line-clamp-3">{project.description}</span>
                                </motion.p>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <motion.div
                                    className="flex flex-wrap gap-2 min-h-24 content-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.5 }}
                                >
                                    {project.tech.map((tag, tagIndex) => (
                                        <motion.span
                                            key={tagIndex}
                                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium border border-gray-600 hover:bg-gray-600 hover:border-purple-500 transition-colors duration-300 h-fit"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: index * 0.15 + 0.6 + tagIndex * 0.1,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                <ProjectActions
                                    url={project.url}
                                    repo={project.repo}
                                    delay={index * 0.15 + 0.7}
                                />
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;
