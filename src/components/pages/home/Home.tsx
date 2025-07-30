import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileImage from '../../../assets/logo.jpg';

const Home = () => {
    const { t } = useTranslation();
    const [displayedName, setDisplayedName] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const fullName = t("home.name");

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullName.length) {
                setDisplayedName(fullName.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, 75);

        return () => clearInterval(typingInterval);
    }, [fullName]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="text-center md:text-left">
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {t("home.title")}{" "}
                            <br />
                            <span className="bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent inline-block">
                                {displayedName}
                                {!isTypingComplete && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        |
                                    </motion.span>
                                )}
                            </span>
                        </motion.h1>

                        {/* Rest of your content with conditional rendering */}
                        {isTypingComplete && (
                            <>
                                <motion.h2
                                    className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {t("home.subtitle")}
                                </motion.h2>

                                <motion.p
                                    className="text-lg text-gray-400 mb-8 leading-relaxed"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {t("home.description")}
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <Link to="/projects" className="s-button px-8 py-3 text-lg">
                                        {t("home.viewWork")}
                                    </Link>
                                    <Link to="/about" className="p-button px-8 py-3 text-lg">
                                        {t("home.aboutMe")}
                                    </Link>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="flex gap-6 justify-center md:justify-start mt-8"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <a
                                        href="https://github.com/MrWinRock"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="GitHub"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="LinkedIn"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Right Side - Profile Image */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] rounded-full blur-lg opacity-20"></div>
                            <img
                                src={profileImage}
                                alt="Pharthiwath Gristsoopharruth"
                                className="relative w-80 h-80 object-cover rounded-full border-4 border-gradient-to-r from-[#FF00FF] to-[#00FFFF]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Skills Preview - Show after typing is complete */}
                {isTypingComplete && (
                    <motion.div
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <h3 className="text-2xl font-semibold mb-8 text-gray-300">{t("home.techTitle")}</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {['React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'Docker'].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    className="px-4 py-2 bg-gray-800 rounded-full text-sm border border-gray-700"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                        <Link to="/skills" className="mt-6 inline-block text-blue-400 hover:underline">
                            {t("home.seeMore")}
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;