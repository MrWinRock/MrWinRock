import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import SpotlightCard from "@/components/cards/SpotLightCard";
import { projects as staticProjects, type Project } from "../../../data/projects";
import { api } from "../../../lib/api";
import githubIcon from "../../../assets/icons/github-icon.svg";

const Projects = () => {
    const { t } = useTranslation();
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchProjects = async () => {
            try {
                const res = await api.projects();
                if (!cancelled && res.ok && res.data) {
                    const mapped: Project[] = res.data
                        .map((p) => ({
                            _id: p._id,
                            title: p.title,
                            description: p.description,
                            url: p.url || undefined,
                            repo: p.repo || undefined,
                            tech: p.tech,
                            order: p.order,
                        }))
                        .sort((a, b) => a.order - b.order);
                    setProjectList(mapped);
                }
            } catch {
                if (!cancelled) {
                    setProjectList(staticProjects);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchProjects();
        return () => { cancelled = true; };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <motion.div
                    className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

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

                                <motion.div
                                    className="flex justify-between items-center mt-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.15 + 0.7 }}
                                >
                                    {project.url ? (
                                        <motion.a
                                            href={project.url}
                                            className="s-button flex flex-row items-center gap-2 px-4 py-2 text-sm font-medium"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t("projects.viewLive")}
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="icon"
                                                whileHover={{ x: 2, y: -2 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <path d="M18 13V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </motion.svg>
                                        </motion.a>
                                    ) : (
                                        <span className="s-button px-4 py-2 text-sm font-medium opacity-50">
                                            {t("projects.notAvailable")}
                                        </span>
                                    )}

                                    {project.repo ? (
                                        <motion.a
                                            href={project.repo}
                                            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View on GitHub"
                                            whileHover={{
                                                rotate: 15
                                            }}
                                        >
                                            <motion.img
                                                src={githubIcon}
                                                alt="GitHub"
                                                className="w-8 h-8 filter invert"
                                            />
                                        </motion.a>
                                    ) : (
                                        <div
                                            className="p-2 rounded-full cursor-not-allowed opacity-30"
                                            title="GitHub repository not available"
                                        >
                                            <img
                                                src={githubIcon}
                                                alt="GitHub"
                                                className="w-8 h-8 filter invert"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;