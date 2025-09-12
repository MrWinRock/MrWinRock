import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type GAEventParams = Record<string, unknown>;

interface Gtag {
    (command: 'js', date: Date): void;
    (command: 'config', targetId: string, config?: Record<string, unknown>): void;
    (command: 'event', eventName: string, params?: GAEventParams): void;
    (command: 'set', params: Record<string, unknown>): void;
    (command: 'consent', action: 'default' | 'update', params: Record<string, 'granted' | 'denied'>): void;
    (command: 'get', targetId: string, fieldName: string, callback: (value: unknown) => void): void;
    (command: string, ...args: unknown[]): void;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
        __gaInitialized?: boolean;
    }
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
