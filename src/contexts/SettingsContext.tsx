import { useEffect, useState, type ReactNode } from 'react';
import { api } from '../lib/api';
import type { SettingsDoc } from '../lib/api';
import { HIDDEN_SETTINGS, SettingsContext } from './settingsConstants';
import { SETTINGS_POLL_INTERVAL_MS, settingsRetryDelayMs } from './settingsPolling';

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsDoc>(HIDDEN_SETTINGS);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        let etag: string | undefined;
        let failures = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let active: AbortController | undefined;

        const load = async () => {
            if (cancelled || active) return;
            clearTimeout(timer);
            const controller = new AbortController();
            active = controller;
            try {
                const res = await api.settings({ etag, signal: controller.signal });
                if (cancelled) return;
                if (res.kind === 'modified') {
                    setSettings(res.data);
                    etag = res.etag;
                } else if (res.etag) etag = res.etag;
                failures = 0;
            } catch {
                if (!cancelled) failures += 1;
            } finally {
                active = undefined;
                if (!cancelled) {
                    setIsInitialLoading(false);
                    timer = setTimeout(load, failures ? settingsRetryDelayMs(failures) : SETTINGS_POLL_INTERVAL_MS);
                }
            }
        };

        load();

        const onVisible = () => {
            if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            document.removeEventListener('visibilitychange', onVisible);
            clearTimeout(timer);
            active?.abort();
        };
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, isInitialLoading }}>
            {children}
        </SettingsContext.Provider>
    );
}
