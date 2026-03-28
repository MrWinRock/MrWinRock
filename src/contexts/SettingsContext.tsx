import { useEffect, useState, type ReactNode } from 'react';
import { api, type SettingsDoc } from '../lib/api';
import { SETTINGS_DEFAULTS, SettingsContext } from './settingsConstants';

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsDoc>(SETTINGS_DEFAULTS);

    useEffect(() => {
        const es = api.settingsStream();

        es.onmessage = (event: MessageEvent) => {
            try {
                const newSettings = JSON.parse(event.data);
                setSettings(newSettings);
            } catch (err) {
                console.error("Error parsing settings stream data:", err);
            }
        };

        es.onerror = (err: Event) => {
            console.error("Settings stream error:", err);
        };

        return () => {
            es.close();
        };
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

