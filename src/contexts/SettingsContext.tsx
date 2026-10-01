import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { api } from '../lib/api';
import type { SettingsDoc } from '../lib/api';
import { HIDDEN_SETTINGS, SettingsContext } from './settingsConstants';
import { SETTINGS_POLL_INTERVAL_MS, settingsRetryDelayMs } from './settingsPolling';
import { getPublicSnapshot } from '../lib/publicSnapshot';

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsDoc>(HIDDEN_SETTINGS);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [settingsStatus, setSettingsStatus] = useState<'loading' | 'ready' | 'unavailable' | 'snapshot'>('loading');
    const reload = useRef<() => void>(() => {});
    const retrySettings = useCallback(() => reload.current(), []);

    useEffect(() => {
        let cancelled = false;
        let etag: string | undefined;
        let failures = 0;
        let hasSettings = false;
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
                    hasSettings = true;
                    setSettings(res.data);
                    etag = res.etag;
                } else if (res.etag) etag = res.etag;
                if (!hasSettings) throw new Error('Settings not initialized');
                setSettingsStatus('ready');
                failures = 0;
            } catch {
                if (!cancelled) {
                    failures += 1;
                    if (!hasSettings) {
                        const published = getPublicSnapshot();
                        if (published) { setSettings(published.settings); setSettingsStatus('snapshot'); }
                        else { setSettings(HIDDEN_SETTINGS); setSettingsStatus('unavailable'); }
                    }
                }
            } finally {
                active = undefined;
                if (!cancelled) {
                    setIsInitialLoading(false);
                    timer = setTimeout(load, failures ? settingsRetryDelayMs(failures) : SETTINGS_POLL_INTERVAL_MS);
                }
            }
        };

        reload.current = () => { void load(); };
        void load();

        const onVisible = () => {
            if (document.visibilityState === 'visible') load();
        };
        document.addEventListener('visibilitychange', onVisible);

        return () => {
            cancelled = true;
            reload.current = () => {};
            document.removeEventListener('visibilitychange', onVisible);
            clearTimeout(timer);
            active?.abort();
        };
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, isInitialLoading, settingsStatus, retrySettings }}>
            {children}
        </SettingsContext.Provider>
    );
}
