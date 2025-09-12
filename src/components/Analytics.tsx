import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag?: (command: string, target: string, params?: Record<string, unknown>) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag && GA_MEASUREMENT_ID) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default Analytics;