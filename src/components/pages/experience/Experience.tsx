import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { type ApiExperience as ExperienceType, api } from "../../../lib/api";
import SpotlightCard from "@/components/cards/SpotLightCard";

const Experience = () => {
    const { t, i18n } = useTranslation();
    const [experienceList, setExperienceList] = useState<ExperienceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const localeMap: Record<string, string> = { en: "en-US", th: "th-TH" };

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await api.experiences();
                if (response.ok && response.data) {
                    setExperienceList(response.data);
                } else {
                    setError("Failed to load generic error");
                }
            } catch (err) {
                console.error("Failed to fetch experiences:", err);
                setError("Failed to load experience error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const formatDate = (dateStr: string) => {
        const [year, month] = dateStr.split("-");
        const date = new Date(Number(year), Number(month) - 1);
        const locale = localeMap[i18n.language] ?? i18n.language;
        return date.toLocaleDateString(locale, {
            month: "short",
            year: "numeric",
        });
    };

    const getDateRange = (start: string, end?: string) => {
        return `${formatDate(start)} — ${end ? formatDate(end) : t("experience.present")}`;
    };

    const getTypeBadgeColor = (type: ExperienceType["type"]) => {
        const colors: Record<string, string> = {
            "Full-time": "from-purple-500 to-pink-500",
            "Part-time": "from-blue-500 to-cyan-500",
            Internship: "from-green-500 to-emerald-500",
            Freelance: "from-amber-500 to-orange-500",
            Contract: "from-rose-500 to-red-500",
            Bachelor: "from-blue-500 to-cyan-500",
            Master: "from-cyan-500 to-teal-500",
            PhD: "from-indigo-500 to-purple-500",
        };
        return colors[type] ?? "from-gray-500 to-gray-400";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-500">
                {t("experience.error")}
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
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold mb-16 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {t("experience.title")}
                </motion.h1>

                {/* Timeline */}
                <div className="relative">
                    {/* Gradient timeline line */}
                    <motion.div
                        className="absolute left-2 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2"
                        style={{
                            background:
                                "linear-gradient(to bottom, #8000FF, #00FFFF, #8000FF)",
                        }}
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    />

                    <div className="space-y-12 md:space-y-16">
                        {experienceList.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={exp._id || `${exp.company}-${exp.title}-${exp.startDate}`}
                                    className={`relative flex items-start ${isLeft
                                            ? "md:flex-row"
                                            : "md:flex-row-reverse"
                                        }`}
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.25 + 0.6,
                                        type: "spring",
                                        stiffness: 80,
                                    }}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        className="absolute left-2 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            delay: index * 0.25 + 0.8,
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-[#1b1b1b] border-[3px] border-transparent"
                                            style={{
                                                borderImage: "linear-gradient(135deg, #8000FF, #00FFFF) 1",
                                                borderRadius: "50%",
                                                borderStyle: "solid",
                                            }}
                                        />
                                        <div className="absolute w-4 h-4 rounded-full animate-ping opacity-20"
                                            style={{
                                                background: "linear-gradient(135deg, #8000FF, #00FFFF)",
                                            }}
                                        />
                                    </motion.div>

                                    {/* Spacer for opposite side */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Card */}
                                    <div
                                        className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"
                                            }`}
                                    >
                                        <SpotlightCard
                                            className="flex flex-col gap-4"
                                            index={index}
                                            spotlightColor="rgba(255, 0, 255, 0.3)"
                                        >
                                            {/* Header */}
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <motion.span
                                                        className={`px-3 py-0.5 rounded-full text-xs font-bold text-white bg-linear-to-r ${getTypeBadgeColor(
                                                            exp.type
                                                        )}`}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            delay: index * 0.25 + 1,
                                                            type: "spring",
                                                            stiffness: 200,
                                                        }}
                                                    >
                                                        {exp.type}
                                                    </motion.span>
                                                    <span className="text-xs text-gray-400">
                                                        {getDateRange(
                                                            exp.startDate,
                                                            exp.endDate
                                                        )}
                                                    </span>
                                                </div>

                                                <h2 className="text-xl font-bold text-white leading-tight">
                                                    {exp.title}
                                                </h2>

                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <svg
                                                        className="w-4 h-4 shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        />
                                                    </svg>
                                                    <span className="font-medium">{exp.company}</span>
                                                    <span className="text-gray-600">•</span>
                                                    <svg
                                                        className="w-4 h-4 shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                {exp.description}
                                            </p>

                                            {/* Achievements */}
                                            {exp.achievements.length > 0 && (
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-200 mb-2">
                                                        {t("experience.achievements")}
                                                    </h3>
                                                    <ul className="space-y-1.5">
                                                        {exp.achievements.map(
                                                            (achievement, aIdx) => (
                                                                <motion.li
                                                                    key={aIdx}
                                                                    className="flex items-start gap-2 text-sm text-gray-400"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        x: -10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        x: 0,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            index * 0.25 +
                                                                            1.1 +
                                                                            aIdx * 0.08,
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                                                        style={{
                                                                            background:
                                                                                "linear-gradient(135deg, #8000FF, #00FFFF)",
                                                                        }}
                                                                    />
                                                                    <span>{achievement}</span>
                                                                </motion.li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Tech tags */}
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {exp.tech.map((tag, tagIdx) => (
                                                    <motion.span
                                                        key={tagIdx}
                                                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium border border-gray-600 hover:bg-gray-600 hover:border-purple-500 transition-colors duration-300"
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.25 +
                                                                1.3 +
                                                                tagIdx * 0.06,
                                                            type: "spring",
                                                            stiffness: 200,
                                                        }}
                                                    >
                                                        {tag}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </SpotlightCard>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;