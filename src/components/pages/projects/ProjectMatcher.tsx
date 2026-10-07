import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useRetryCountdown } from '../../../hooks/useRetryCountdown';
import { api, type ApiProject, type ProjectMatchResponse } from '../../../lib/api';
import { canonicalMatchedProjects, localizeProject } from '../../../lib/portfolio';
import { ProjectCard } from './ProjectCard';

type MatchStatus = 'idle' | 'loading' | 'complete' | 'validation' | 'unavailable' | 'rate-limited';

export function ProjectMatcher({ projects }: { projects: ApiProject[] }) {
    const { t, i18n } = useTranslation();
    const id = useId();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<MatchStatus>('idle');
    const [result, setResult] = useState<ProjectMatchResponse['data'] | null>(null);
    const [retryAt, setRetryAt] = useState<number>();
    const seconds = useRetryCountdown(retryAt);
    const input = useRef<HTMLTextAreaElement>(null);
    const active = useRef<AbortController | null>(null);
    useEffect(() => () => active.current?.abort(), []);

    function edit(value: string) {
        active.current?.abort();
        active.current = null;
        setQuery(value);
        setResult(null);
        setStatus(retryAt !== undefined && Date.now() < retryAt ? 'rate-limited' : 'idle');
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (active.current || (retryAt !== undefined && Date.now() < retryAt)) return;
        const trimmed = query.trim();
        setResult(null);
        if (trimmed.length < 10 || trimmed.length > 1000) {
            setStatus('validation');
            input.current?.focus();
            return;
        }
        const controller = new AbortController();
        active.current = controller;
        setStatus('loading');
        try {
            const response = await api.matchProjects({ query: trimmed }, { signal: controller.signal });
            if (controller.signal.aborted) return;
            setResult(response.data);
            setStatus('complete');
        } catch (error) {
            if (controller.signal.aborted) return;
            const failure = error as { status?: number; cancelled?: boolean; retryAfterSeconds?: number } | null;
            if (failure?.cancelled) { setStatus('idle'); return; }
            if (failure?.status === 429) {
                setRetryAt(Date.now() + Math.max(0, failure.retryAfterSeconds ?? 60) * 1000);
                setStatus('rate-limited');
            } else if (failure?.status === 400) {
                setStatus('validation');
                input.current?.focus();
            } else {
                setStatus('unavailable');
            }
        } finally {
            if (active.current === controller) active.current = null;
        }
    }

    const error = status === 'validation' ? t('projects.match.validation')
        : status === 'unavailable' ? t('projects.match.unavailable')
        : status === 'rate-limited' && seconds > 0 ? t('projects.match.rateLimited', { count: seconds }) : null;
    const matchedProjects = result ? canonicalMatchedProjects(result.matches.map(match => match.project), projects) : [];

    return <section className="project-matcher" aria-labelledby={`${id}-title`}>
        <div className="matcher-panel">
            <p className="eyebrow">{t('projects.match.eyebrow')}</p>
            <h2 id={`${id}-title`}>{t('projects.match.title')}</h2>
            <p className="matcher-intro">{t('projects.match.intro')}</p>
            <form noValidate onSubmit={submit}>
                <label htmlFor={`${id}-query`}>{t('projects.match.query')}</label>
                <textarea ref={input} id={`${id}-query`} className="contact-field" rows={3} required
                    value={query} onChange={event => edit(event.target.value)}
                    placeholder={t('projects.match.placeholder')}
                    aria-invalid={status === 'validation'}
                    aria-describedby={`${id}-privacy${status === 'validation' ? ` ${id}-error` : ''}`} />
                <div className="matcher-actions">
                    <p id={`${id}-privacy`} className="matcher-privacy">{t('projects.match.privacy')}</p>
                    <button type="submit" className="p-button" disabled={status === 'loading' || seconds > 0}>
                        {t(status === 'loading' ? 'projects.match.loading' : 'projects.match.submit')}
                        <span aria-hidden="true">↗</span>
                    </button>
                </div>
            </form>
            {error && <p id={`${id}-error`} className="matcher-error" role="alert">{error}</p>}
            <div role={status === 'loading' || status === 'complete' ? 'status' : undefined} aria-live="polite" aria-atomic="true" className="matcher-status">
                {status === 'loading' && t('projects.match.loading')}
                {status === 'complete' && result && (matchedProjects.length
                    ? t('projects.match.found', { count: matchedProjects.length }) : t('projects.match.empty'))}
            </div>
        </div>
        {result && <>
            {result.source === 'keyword' && <p className="matcher-fallback">{t('projects.match.keyword')}</p>}
            {!!matchedProjects.length && <section aria-labelledby={`${id}-results`}>
                <div className="collection-heading"><h2 id={`${id}-results`}>{t('projects.match.results')}</h2><span className="collection-count">{matchedProjects.length}</span></div>
                <div className="work-list">{matchedProjects.map((project, index) => <ProjectCard
                    key={project._id ?? project.slug ?? project.title} project={localizeProject(project, i18n.language)} number={index + 1} />)}</div>
            </section>}
        </>}
    </section>;
}
