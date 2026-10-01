import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../lib/api';
import { useObjectUrl } from '../hooks/useObjectUrl';
import { trackPortfolioEvent } from '../lib/portfolioEvents';

export function ResumeDownloadButton() {
    const { t } = useTranslation();
    const [blob, setBlob] = useState<Blob | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const active = useRef<AbortController | null>(null);
    const link = useRef<HTMLAnchorElement>(null);
    const url = useObjectUrl(blob);
    useEffect(() => () => active.current?.abort(), []);
    useEffect(() => { if (url) link.current?.click(); }, [url]);
    async function download() {
        if (active.current) return;
        trackPortfolioEvent('resume_download');
        const controller = new AbortController(); active.current = controller; setStatus('loading');
        try { const result = await api.resume({ signal: controller.signal }); if (!controller.signal.aborted) { setBlob(result); setStatus('idle'); } }
        catch { if (!controller.signal.aborted) setStatus('error'); }
        finally { if (active.current === controller) active.current = null; }
    }
    return <div>{url ? <a className="s-button inline-flex" href={url} download="Pharthiwath_Gristsoopharruth_Resume.pdf">{t('resume.download')}</a> : <button type="button" className="s-button" disabled={status === 'loading'} onClick={download}>{t(status === 'loading' ? 'resource.loading' : 'resume.download')}</button>}
        {url && <a ref={link} className="hidden" tabIndex={-1} aria-hidden="true" href={url} download="Pharthiwath_Gristsoopharruth_Resume.pdf" />}
        {status === 'error' && <p role="alert" className="mt-2 text-sm text-rose-200">{t('resume.downloadError')}</p>}</div>;
}
