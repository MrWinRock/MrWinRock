import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getSkillCategories } from "../../../data/skillCategories";
import profileImage from '../../../assets/logo.jpg';

interface SocialLinkProps {
    href: string;
    title: string;
    icon: React.ReactNode;
}

const Home: React.FC = () => {
    const { t } = useTranslation();
    const [displayedName, setDisplayedName] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const fullName: string = t("home.name");

    const skillCategories = getSkillCategories(t);
    const featuredSkills = [
        ...skillCategories[0].skills.slice(3, 6),
        ...skillCategories[1].skills.slice(2, 5),
        ...skillCategories[3].skills.slice(2, 4),
        ...skillCategories[4].skills.slice(0, 2),
    ];

    const startTypingEffect = useCallback((): (() => void) | undefined => {
        if (!fullName) return;

        let index = 0;
        setDisplayedName('');
        setIsTypingComplete(false);

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

    useEffect(() => {
        const cleanup = startTypingEffect();
        return cleanup;
    }, [startTypingEffect]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        className="text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            {t("home.title")}{" "}
                            <br />
                            <span className="bg-gradient-to-r from-[#FF00FF] via-[#8A2BE2] to-[#00FFFF] bg-clip-text text-transparent inline-block">
                                {displayedName}
                                {!isTypingComplete && (
                                    <motion.span
                                        className="text-white"
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

                        {/* Content appears after typing animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isTypingComplete ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.h2
                                className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-medium"
                                variants={itemVariants}
                            >
                                {t("home.subtitle")}
                            </motion.h2>

                            <motion.p
                                className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl"
                                variants={itemVariants}
                            >
                                {t("home.description")}
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8"
                                variants={itemVariants}
                            >
                                <Link
                                    to="/projects"
                                    className="group px-8 py-3 text-lg bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    <span className="group-hover:tracking-wide transition-all duration-300">
                                        {t("home.viewWork")}
                                    </span>
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-3 text-lg border-2 border-gray-600 text-gray-300 rounded-full font-semibold hover:border-white hover:text-white transition-all duration-300 hover:scale-105"
                                >
                                    {t("home.aboutMe")}
                                </Link>
                            </motion.div>

                            {/* Social Links with improved styling */}
                            <motion.div
                                className="flex gap-6 justify-center md:justify-start"
                                variants={itemVariants}
                            >
                                <SocialLink
                                    href="https://github.com/MrWinRock"
                                    title="GitHub"
                                    icon={<GitHubIcon />}
                                />
                                <SocialLink
                                    href="https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/"
                                    title="LinkedIn"
                                    icon={<LinkedInIcon />}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Profile Image with enhanced styling */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <div className="relative group">
                            {/* Animated background glow */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] via-[#8A2BE2] to-[#00FFFF] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Profile image with gradient border */}
                            <div className="relative p-1 bg-gradient-to-r from-[#FF00FF] via-[#8A2BE2] to-[#00FFFF] rounded-full">
                                <img
                                    src={profileImage}
                                    alt={t("home.name")}
                                    className="relative w-80 h-80 object-cover rounded-full bg-gray-900 transition-transform duration-500 group-hover:scale-105"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Skills Preview - Enhanced with real skill data and icons */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 50 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-300">
                        {t("home.techTitle")}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
                        {featuredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="flex flex-col items-center gap-2 px-4 py-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:bg-gray-700/50 group cursor-pointer"
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: isTypingComplete ? 1 : 0,
                                    scale: isTypingComplete ? 1 : 0,
                                    y: isTypingComplete ? 0 : 20
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.5 + index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{
                                    scale: 1.1,
                                }}
                            >
                                <motion.img
                                    src={skill.image}
                                    alt={skill.name}
                                    className="w-8 h-8 md:w-10 md:h-10"
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: 10,
                                        transition: { duration: 0.3 }
                                    }}
                                />
                                <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isTypingComplete ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 2.2 }}
                    >
                        <Link
                            to="/skills"
                            className="mt-8 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
                        >
                            {t("home.seeMore")}
                            <motion.span
                                className="ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, title, icon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-gray-800/50"
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
    >
        {icon}
    </motion.a>
);

const GitHubIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="GitHub">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="LinkedIn">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default Home;