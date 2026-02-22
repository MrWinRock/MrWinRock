import { useEffect, useState, type ReactNode } from 'react';
import { api, type SettingsDoc } from '../lib/api';
import { SETTINGS_DEFAULTS, SettingsContext } from './settingsConstants';

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SettingsDoc>(SETTINGS_DEFAULTS);

    useEffect(() => {
        api.settings()
            .then((res) => {
                if (res.ok && res.data) setSettings(res.data);
            })
            .catch(() => {
                // keep defaults on error — all pages visible
            });
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

