import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag?: (command: string, target: string, params?: Record<string, unknown>) => void;
    }
}

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', 'G-HC7GXBF73Z', {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default Analytics;