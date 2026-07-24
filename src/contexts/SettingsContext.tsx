import { useEffect, useState, type ReactNode } from 'react';
import { api } from '../lib/api';
import type { SettingsDoc } from '../lib/api';
import { HIDDEN_SETTINGS, SettingsContext } from './settingsConstants';

const POLL_INTERVAL_MS = 60_000;

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsDoc>(HIDDEN_SETTINGS);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await api.settings();
                if (!cancelled && res.ok) setSettings(res.data);
            } catch (err) {
                console.error('Failed to load settings:', err);
            } finally {
                if (!cancelled) setIsInitialLoading(false);
            }
        };

        load();

        const onVisible = () => {
            if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisible);
        const interval = window.setInterval(load, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            document.removeEventListener('visibilitychange', onVisible);
            window.clearInterval(interval);
        };
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, isInitialLoading }}>
            {children}
        </SettingsContext.Provider>
    );
}
