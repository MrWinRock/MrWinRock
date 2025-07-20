import { motion } from "motion/react";

const Projects = () => {
    const projects = [
        { title: "MrWinRock", description: "My Portfolio Website.", url: "/", gh_url: "https://github.com/MrWinRock/MrWinRock", tags: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
        { title: "Stringy", description: "A Blog Platform Discussing about IT.", url: "https://stringy-b8c5e.web.app/", gh_url: "https://github.com/MrWinRock/Stringy", tags: ["React", "Javascript", "Node.js", "Express.js"] },
        { title: "SSRU Interactive Map", description: "An Interactive Map for SSRU.", url: "https://mrwinrock.github.io/ssru-inter-map/", gh_url: "https://github.com/MrWinRock/ssru-inter-map", tags: ["React", "Javascript", "Leaflet", "Interactive"] },
        { title: "ChadChat", description: "An Interactive Real-Time Chat Application.", gh_url: "https://github.com/MrWinRock/ChadChat", tags: ["React Native", "Typescript", "Nodejs", "Expressjs", "Socket.io"] },
        { title: "Chronobreak", description: "World clock, Time zone converter, Alarm, Stopwatch, Timer", gh_url: "https://github.com/MrWinRock/chronobreak", tags: ["React Native", "Javascript", "Typescript", "PHP"] },
        { title: "Todo App", description: "Basic Todo App.", url: "https://todo-react-group.web.app", gh_url: "https://github.com/MrWinRock/todoreact", tags: ["React", "Javascript"] },
        { title: "EarthMC Data Site", description: "EarthMC Server Data Site.", url: "https://mrwinrock.github.io/earthmc-web-data", gh_url: "https://github.com/MrWinRock/earthmc-web-data", tags: ["React", "Typescript", "Vite", "Tailwind CSS"] },
        { title: "EarthMC API Proxy", description: "EarthMC Proxy API Server For POST Requests.", gh_url: "https://github.com/MrWinRock/earthmc-api-proxy", tags: ["Node.js", "Express.js"] },
        { title: "Crazy Dad Lore 3D", description: "3D games development using Unity.", url: "https://marguro.itch.io/crazy-dad-lore", gh_url: "https://github.com/MrWinRock/summer-jam-2025?tab=readme-ov-file", tags: ["Unity", "C#", "Game Dev"] },
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
                    My Projects
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
                        // whileHover={{
                        //     y: -8,
                        //     scale: 1.02,
                        //     rotateY: 5,
                        //     boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        //     transition: { duration: 0.15 }
                        // }}
                        // whileTap={{ scale: 0.98 }}
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
                                        className="s-button px-4 py-2 text-sm font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Live
                                    </motion.a>
                                ) : (
                                    <span className="s-button px-4 py-2 text-sm font-medium opacity-50">Not Available</span>
                                )}
                                {project.gh_url && (
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
                                            src="https://cdn.worldvectorlogo.com/logos/github-icon.svg"
                                            alt="GitHub"
                                            className="w-6 h-6 filter invert"
                                        />
                                    </motion.a>
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