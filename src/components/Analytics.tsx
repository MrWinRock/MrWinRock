import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsProps {
    gaId: string;
}

export default function Analytics({ gaId }: AnalyticsProps): null {
    const location = useLocation();

    useEffect(() => {
        if (!import.meta.env.PROD) return;
        if (!window.gtag || !gaId) return;

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: `${location.pathname}${location.search}${location.hash}`,
        });
    }, [location.pathname, location.search, location.hash, gaId]);

    return null;
}
