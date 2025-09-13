import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TRACKING_ENABLED } from '../config/analytics';

export default function Analytics(): null {
    const location = useLocation();

    useEffect(() => {
        if (!TRACKING_ENABLED) return;
        if (!window.gtag) return;

        const gtag = window.gtag as Gtag;
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: `${location.pathname}${location.search}${location.hash}`,
        });
    }, [location.pathname, location.search, location.hash]);

    return null;
}
