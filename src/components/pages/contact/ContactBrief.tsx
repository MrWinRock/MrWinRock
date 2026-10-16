import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api, type ContactBriefResponse } from '../../../lib/api';
import { useRetryCountdown } from '../../../hooks/useRetryCountdown';

export function ContactBrief({ message, sending, onInvalid }: { message: string; sending: boolean; onInvalid(): void }) {
    const { t } = useTranslation();
    const id = useId();
    const [status, setStatus] = useState<'idle' | 'loading' | 'complete' | 'error'>('idle');
    const [result, setResult] = useState<ContactBriefResponse['data'] | null>(null);
    const [retryAt, setRetryAt] = useState<number>();
    const seconds = useRetryCountdown(retryAt);
    const active = useRef<AbortController | null>(null);
    useEffect(() => {
        active.current?.abort();
        active.current = null;
        setResult(null);
        setStatus('idle');
        return () => { active.current?.abort(); active.current = null; };
    }, [message, sending]);

    async function review() {
        if (active.current || sending || seconds > 0) return;
        const trimmed = message.trim();
        if (trimmed.length < 10 || trimmed.length > 5000) { onInvalid(); return; }
        const controller = new AbortController();
        active.current = controller;
        setStatus('loading'); setResult(null);
        try {
            const response = await api.reviewContactBrief({ message: trimmed }, { signal: controller.signal });
            if (controller.signal.aborted) return;
            setResult(response.data); setStatus('complete');
        } catch (error) {
            if (controller.signal.aborted) return;
            const failure = error as { status?: number; retryAfterSeconds?: number } | null;
            if (failure?.status === 429) setRetryAt(Date.now() + Math.max(0, failure.retryAfterSeconds ?? 60) * 1000);
            setStatus('error');
        } finally {
            if (active.current === controller) active.current = null;
        }
    }

    return <div className="brief-assistant">
        <div className="brief-actions">
            <div><p className="brief-label">{t('contact.brief.title')}</p><p id={`${id}-privacy`} className="matcher-privacy">{t('contact.brief.privacy')}</p></div>
            <button type="button" className="s-button" onClick={review} disabled={sending || status === 'loading' || seconds > 0} aria-describedby={`${id}-privacy`}>
                {t(status === 'loading' ? 'contact.brief.loading' : 'contact.brief.review')}
            </button>
        </div>
        <div role={status === 'loading' || status === 'complete' ? 'status' : undefined} aria-live="polite" className="brief-status">{status === 'loading' ? t('contact.brief.loading') : status === 'complete' ? t('contact.brief.ready') : null}</div>
        {status === 'error' && <p role="alert" className="matcher-error">{seconds > 0 ? t('projects.match.rateLimited', { count: seconds }) : t('contact.brief.unavailable')}</p>}
        {seconds > 0 && status !== 'error' && <p className="matcher-privacy">{t('projects.match.rateLimited', { count: seconds })}</p>}
        {result && <section className="brief-result" aria-labelledby={`${id}-result`}>
            <h3 id={`${id}-result`}>{t('contact.brief.results')}</h3>
            {result.source === 'unavailable' ? <p>{t('contact.brief.unavailable')}</p> : <>
                {result.category && <p className="brief-category">{t('contact.brief.category')}: <strong>{t(`contact.brief.categories.${result.category}`)}</strong></p>}
                <ul className="brief-checks">{(['audience', 'scope', 'deadline'] as const).map(field => <li key={field} data-check={result.checks[field]}>
                    <span className="brief-check-symbol" aria-hidden="true">{result.checks[field] === 'present' ? '✓' : result.checks[field] === 'missing' ? '+' : '?'}</span>
                    <span><strong>{t(`contact.brief.fields.${field}`)}</strong><span>{t(`contact.brief.states.${result.checks[field]}`)}</span>{result.checks[field] !== 'present' && <span>{t(`contact.brief.hints.${field}`)}</span>}</span>
                </li>)}</ul>
            </>}
            <p className="matcher-privacy">{t('contact.brief.advisory')}</p>
        </section>}
    </div>;
}
