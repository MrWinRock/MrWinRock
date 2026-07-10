import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SpotlightCard from "@/components/cards/SpotLightCard";
import { api, ApiError } from "@/lib/api";

const CONTACT_EMAIL = "mrwinrock11@gmail.com";
const GITHUB_URL = "https://github.com/MrWinRock";
const LINKEDIN_URL = "https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/";

type SubmitStatus = "idle" | "sending" | "success" | "error";

const Contact = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "sending") return;

        setStatus("sending");
        setErrorMessage(null);
        try {
            const res = await api.contact({
                name: form.name.trim(),
                email: form.email.trim(),
                message: form.message.trim(),
            });
            if (!res.ok) throw new ApiError(200, res, res.message ?? "Send failed");
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof ApiError ? err.message : t("contact.error"));
        }
    };

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const fieldClass =
        "w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-white/10 text-white placeholder-gray-500 " +
        "focus:outline-none focus:border-[#8A2BE2] focus:ring-2 focus:ring-[#8A2BE2]/30 transition-colors duration-200";

    return (
        <motion.div
            className="min-h-screen p-8"
            initial="hidden"
            animate="visible"
            variants={container}
        >
            <div className="max-w-5xl mx-auto">
                <motion.h1 className="text-4xl font-bold mb-3 text-center" variants={item}>
                    <span className="bg-linear-to-r from-[#8000FF] via-[#8A2BE2] to-[#00FFFF] bg-clip-text text-transparent">
                        {t("contact.title")}
                    </span>
                </motion.h1>
                <motion.p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto" variants={item}>
                    {t("contact.subtitle")}
                </motion.p>

                <div className="grid md:grid-cols-5 gap-6 items-stretch">
                    {/* Form */}
                    <motion.div className="md:col-span-3" variants={item}>
                        <SpotlightCard index={0} className="flex flex-col">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                                        {t("contact.name")}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        disabled={status === "sending"}
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className={`${fieldClass} disabled:opacity-60`}
                                        placeholder={t("contact.namePlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                                        {t("contact.email")}
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        disabled={status === "sending"}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={`${fieldClass} disabled:opacity-60`}
                                        placeholder={t("contact.emailPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                                        {t("contact.message")}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        required
                                        minLength={10}
                                        maxLength={5000}
                                        disabled={status === "sending"}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className={`${fieldClass} resize-y disabled:opacity-60`}
                                        placeholder={t("contact.messagePlaceholder")}
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-linear-to-r from-[#8000FF] to-[#00FFFF] text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                    whileHover={status === "sending" ? undefined : { scale: 1.02, boxShadow: "0 8px 24px rgba(128,0,255,0.35)" }}
                                    whileTap={status === "sending" ? undefined : { scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {status === "sending" ? t("contact.sending") : t("contact.send")}
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    {status === "success" && (
                                        <motion.p
                                            key="success"
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            role="status"
                                            className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3"
                                        >
                                            {t("contact.success")}
                                        </motion.p>
                                    )}
                                    {status === "error" && (
                                        <motion.p
                                            key="error"
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            role="alert"
                                            className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                                        >
                                            {errorMessage || t("contact.error")}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </form>
                        </SpotlightCard>
                    </motion.div>

                    {/* Direct contact methods */}
                    <motion.div className="md:col-span-2" variants={item}>
                        <SpotlightCard index={1} spotlightColor="rgba(0, 255, 255, 0.3)" className="flex flex-col">
                            <h2 className="text-lg font-semibold text-white mb-1">{t("contact.directTitle")}</h2>
                            <p className="text-sm text-gray-400 mb-6">{t("contact.directSubtitle")}</p>

                            <div className="flex flex-col gap-3">
                                <ContactLink
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    label={t("contact.emailMe")}
                                    value={CONTACT_EMAIL}
                                    icon={<MailIcon />}
                                />
                                <ContactLink
                                    href={GITHUB_URL}
                                    label="GitHub"
                                    value="@MrWinRock"
                                    icon={<GitHubIcon />}
                                    external
                                />
                                <ContactLink
                                    href={LINKEDIN_URL}
                                    label="LinkedIn"
                                    value="Pharthiwath G."
                                    icon={<LinkedInIcon />}
                                    external
                                />
                            </div>

                            <p className="text-xs text-gray-500 mt-auto pt-6">{t("contact.responseNote")}</p>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

interface ContactLinkProps {
    href: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    external?: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, label, value, icon, external }) => (
    <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-white/[0.06] transition-colors duration-200 group"
        whileHover={{ x: 3 }}
    >
        <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/[0.05] text-gray-300 group-hover:text-white transition-colors shrink-0">
            {icon}
        </span>
        <span className="min-w-0">
            <span className="block text-sm font-medium text-white">{label}</span>
            <span className="block text-xs text-gray-400 truncate">{value}</span>
        </span>
    </motion.a>
);

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
    </svg>
);
const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default Contact;
