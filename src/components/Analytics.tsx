import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TRACKING_ENABLED } from '@/config/analytics';

export default function Analytics(): null {
    const location = useLocation();

    useEffect(() => {
        if (!TRACKING_ENABLED || !window.gtag) return;

        const gtag = window.gtag as Gtag;
        const raf = requestAnimationFrame(() => {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: `${location.pathname}${location.search}${location.hash}`,
            });
        });
        return () => cancelAnimationFrame(raf);
    }, [location.pathname, location.search, location.hash]);

    return null;
}
