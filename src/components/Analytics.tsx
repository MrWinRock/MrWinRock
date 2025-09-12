import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type GAEventParams = Record<string, unknown>;
type Gtag = (command: 'event', eventName: string, params?: GAEventParams) => void;

declare global {
    interface Window { gtag?: Gtag; }
}

const GA_ID: string = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? '');

export default function Analytics(): null {
    const location = useLocation();

    useEffect(() => {
        if (!import.meta.env.PROD) return;
        if (!window.gtag || !GA_ID) return;

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: `${location.pathname}${location.search}${location.hash}`,
        });
    }, [location.pathname, location.search, location.hash]);

    return null;
}