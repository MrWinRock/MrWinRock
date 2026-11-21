import { trackPortfolioEvent } from '../../../lib/portfolioEvents';
import { useEffect, useRef, useState } from 'react';
import type { ContactInput } from '../../../lib/apiTypes';
import { validateContact, type ContactFieldErrors } from './contactValidation';
import { useRetryCountdown } from '../../../hooks/useRetryCountdown';
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import { ContactBrief } from './ContactBrief';
import { ArrowIcon } from '../../ArrowIcon';
import { PageIntro } from '../PageIntro';

const CONTACT_EMAIL = "mrwinrock11@gmail.com";
const GITHUB_URL = "https://github.com/MrWinRock";
const LINKEDIN_URL = "https://www.linkedin.com/in/pharthiwath-gristsoopharruth-232301240/";

type SubmitStatus = "idle" | "sending" | "success" | "error" | "unavailable" | "rate-limited";

const Contact = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState<ContactInput>({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const [errors, setErrors] = useState<ContactFieldErrors>({});
    const [retryAt, setRetryAt] = useState<number>();
    const seconds = useRetryCountdown(retryAt);
    const active = useRef<AbortController | null>(null);
    useEffect(() => () => active.current?.abort(), []);
    useEffect(() => {
        const firstInvalid = (['name', 'email', 'message'] as const).find(field => errors[field]);
        if (firstInvalid) document.getElementById(firstInvalid)?.focus();
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (active.current || (retryAt !== undefined && Date.now() < retryAt)) return;
        const input = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
        const invalid = validateContact(input);
        setErrors(invalid);
        if (Object.keys(invalid).length) return;
        const controller = new AbortController();
        active.current = controller;
        setStatus('sending');
        try {
            await api.contact(input, { signal: controller.signal });
            if (controller.signal.aborted) return;
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            if (controller.signal.aborted) return;
            const failure = error as { status?: number; cancelled?: boolean; retryAfterSeconds?: number; details?: { fieldErrors?: Record<string, string[]> } } | null;
            if (failure?.cancelled) { setStatus('idle'); return; }
            if (failure?.status === 429) {
                setRetryAt(Date.now() + Math.max(0, failure.retryAfterSeconds ?? 60) * 1000);
                setStatus('rate-limited');
            } else {
                setStatus(failure?.status === 503 ? 'unavailable' : 'error');
                if (failure?.status === 400 && failure.details?.fieldErrors) {
                    const fields: ContactFieldErrors = {};
                    for (const key of ['name', 'email', 'message'] as const) {
                        if (failure.details.fieldErrors[key]?.length) fields[key] = 'contact.validation.' + key;
                    }
                    setErrors(fields);
                }
            }
        } finally {
            if (active.current === controller) active.current = null;
        }
    };

    return <div className="secondary-page contact-page">
        <PageIntro title={t('contact.title')} description={t('contact.subtitle')} />
        <div className="contact-layout">
            <form noValidate onSubmit={handleSubmit} aria-busy={status === 'sending'} className="contact-form">
                <div className="contact-identity-fields">
                    <div className="contact-form-field">
                        <label htmlFor="name">{t('contact.name')}</label>
                        <input id="name" name="name" type="text" autoComplete="name" required disabled={status === 'sending'}
                            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                            className="contact-field" placeholder={t('contact.namePlaceholder')} value={form.name}
                            onChange={event => setForm({ ...form, name: event.target.value })} />
                        {errors.name && <p id="name-error" className="contact-field-error">{t(errors.name)}</p>}
                    </div>
                    <div className="contact-form-field">
                        <label htmlFor="email">{t('contact.email')}</label>
                        <input id="email" name="email" type="email" autoComplete="email" required disabled={status === 'sending'}
                            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                            className="contact-field" placeholder={t('contact.emailPlaceholder')} value={form.email}
                            onChange={event => setForm({ ...form, email: event.target.value })} />
                        {errors.email && <p id="email-error" className="contact-field-error">{t(errors.email)}</p>}
                    </div>
                </div>
                <div className="contact-form-field">
                    <label htmlFor="message">{t('contact.message')}</label>
                    <textarea id="message" name="message" rows={5} required minLength={10} maxLength={5000} disabled={status === 'sending'}
                        aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                        className="contact-field" placeholder={t('contact.messagePlaceholder')} value={form.message}
                        onChange={event => {
                            setForm({ ...form, message: event.target.value });
                            setErrors(previous => ({ ...previous, message: undefined }));
                        }} />
                    {errors.message && <p id="message-error" className="contact-field-error">{t(errors.message)}</p>}
                </div>
                <ContactBrief message={form.message} sending={status === 'sending'} onInvalid={() => setErrors(previous => ({ ...previous, message: 'contact.validation.message' }))} />
                <button type="submit" disabled={status === 'sending' || seconds > 0} className="primary-action contact-submit">
                    {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>
                {status === 'sending' && <p role="status" className="contact-feedback">{t('contact.sending')}</p>}
                {status === 'rate-limited' && <div className="contact-feedback">
                    <p role="alert">{t('contact.rateLimited')}</p><p aria-live="off">{t('resource.rateLimited', { count: seconds })}</p>
                </div>}
                {status === 'success' && <p role="status" className="contact-feedback contact-feedback-success">{t('contact.success')}</p>}
                {(status === 'error' || status === 'unavailable') && <p role="alert" className="contact-feedback contact-feedback-error">
                    {t(status === 'unavailable' ? 'contact.unavailable' : 'contact.error')}
                </p>}
            </form>
            <aside className="contact-direct" aria-labelledby="contact-direct-title">
                <h2 id="contact-direct-title">{t('contact.directTitle')}</h2>
                <div className="contact-direct-list">
                    <ContactLink href={`mailto:${CONTACT_EMAIL}`} label={t('contact.emailMe')} value={CONTACT_EMAIL} icon={<MailIcon />} />
                    <ContactLink href={GITHUB_URL} label="GitHub" value="@MrWinRock" icon={<GitHubIcon />} external />
                    <ContactLink href={LINKEDIN_URL} label="LinkedIn" value="Pharthiwath G." icon={<LinkedInIcon />} external />
                </div>
                <p className="contact-response">{t('contact.responseNote')}</p>
            </aside>
        </div>
    </div>;
};

interface ContactLinkProps {
    href: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    external?: boolean;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, label, value, icon, external }) => (
    <a
        href={href}
        onClick={()=>trackPortfolioEvent('contact_intent')}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="direct-link"
    >
        <span className="direct-link-icon">{icon}</span>
        <span className="direct-link-copy">
            <span>{label}</span>
            <span className="direct-link-value">{value}</span>
        </span>
        <ArrowIcon />
    </a>
);

const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
