import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import githubIcon from "../../../assets/icons/github-icon.svg";

const Projects = () => {
    const { t } = useTranslation();

    const projects = [
        { title: "MrWinRock", description: "My Portfolio Website.", url: "/", gh_url: "https://github.com/MrWinRock/MrWinRock", tags: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
        { title: "Stringy", description: "A Blog Platform Discussing about IT.", url: "https://stringy-b8c5e.web.app/", gh_url: "https://github.com/MrWinRock/Stringy", tags: ["React", "Javascript"] },
        { title: "Stringy Backend", description: "Backend for the Stringy application.", url: "", gh_url: "", tags: ["Node.js", "Express.js", "JWT", "Google Cloud SQL", "Google Cloud Platform"] },
        { title: "SSRU Interactive Map", description: "An Interactive Map for SSRU.", url: "https://mrwinrock.github.io/ssru-inter-map/", gh_url: "https://github.com/MrWinRock/ssru-inter-map", tags: ["React", "Javascript", "Zoom Pan Pitch"] },
        { title: "ChadChat", description: "An Interactive Real-Time Chat Application.", url: "", gh_url: "https://github.com/MrWinRock/ChadChat", tags: ["React Native", "Typescript"] },
        { title: "ChadChat Backend", description: "Backend for the ChadChat application.", url: "", gh_url: "https://github.com/MrWinRock/chadchat-backend", tags: ["Node.js", "Express.js", "Socket.io", "MongoDB"] },
        { title: "Chronobreak", description: "World clock, Time zone converter, Alarm, Stopwatch, Timer", url: "", gh_url: "https://github.com/MrWinRock/chronobreak", tags: ["React Native", "Javascript", "Typescript", "PHP"] },
        { title: "Todo App", description: "Basic Todo App.", url: "https://todo-react-group.web.app", gh_url: "https://github.com/MrWinRock/todoreact", tags: ["React", "Javascript"] },
        { title: "EarthMC Data Site", description: "EarthMC Server Data Site.", url: "https://mrwinrock.github.io/earthmc-web-data", gh_url: "https://github.com/MrWinRock/earthmc-web-data", tags: ["React", "Typescript", "Vite", "Tailwind CSS"] },
        { title: "EarthMC API Proxy", description: "EarthMC Proxy API Server For POST Requests.", url: "", gh_url: "https://github.com/MrWinRock/earthmc-api-proxy", tags: ["Node.js", "Express.js"] },
        { title: "Crazy Dad Lore 3D", description: "A 3D Road game created for the Thailand Summer Jam 2025.", url: "https://marguro.itch.io/crazy-dad-lore", gh_url: "https://github.com/MrWinRock/summer-jam-2025?tab=readme-ov-file", tags: ["Unity 3D", "C#"] },
        { title: "Horror Company", description: "A 2D game created for the Thailand Horror Jam 2024.", url: "https://marguro.itch.io/horror-company", gh_url: "https://github.com/MrWinRock/project-H-jam", tags: ["Unity", "C#"] },
    ]

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
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col justify-between bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <motion.h2
                                className="text-xl font-bold mb-3 text-white"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                            >
                                {project.title}
                            </motion.h2>
                            <motion.p
                                className="text-gray-300 mb-4 text-sm leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.15 + 0.4 }}
                            >
                                {project.description}
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-2 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.15 + 0.5 }}
                            >
                                {project.tags.map((tag, tagIndex) => (
                                    <motion.span
                                        key={tagIndex}
                                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium border border-gray-600"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: index * 0.15 + 0.6 + tagIndex * 0.1,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                        whileHover={{ scale: 1.1 }}
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
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t("projects.viewLive")}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                                            <path d="M18 13V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </motion.a>
                                ) : (
                                    <span className="s-button px-4 py-2 text-sm font-medium opacity-50">{t("projects.notAvailable")}</span>
                                )}
                                {project.gh_url ? (
                                    <motion.a
                                        href={project.gh_url}
                                        className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="View on GitHub"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 15
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <img
                                            src={githubIcon}
                                            alt="GitHub"
                                            className="w-8 h-8 filter invert"
                                        />
                                    </motion.a>
                                ) : (
                                    <div
                                        className="p-2 rounded-full cursor-not-allowed opacity-30"
                                        title="View on GitHub"
                                    >
                                        <img
                                            src={githubIcon}
                                            alt="GitHub"
                                            className="w-8 h-8 filter invert"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Projects;