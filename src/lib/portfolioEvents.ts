import { TRACKING_ENABLED } from '../config/analytics';

export function trackPortfolioEvent(event: 'project_open' | 'resume_download' | 'contact_intent', slug?: string) {
    if (!TRACKING_ENABLED || typeof window === 'undefined' || !window.gtag) return;
    const params = slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? { project_slug: slug } : {};
    try { window.gtag('event', event, params); } catch { /* Analytics must not block the interaction. */ }
}
