import { createContext } from 'react';
import type { SettingsDoc } from '../lib/api';

export const HIDDEN_SETTINGS: SettingsDoc = {
    showAbout: false,
    showSkills: false,
    showProjects: false,
    showExperience: false,
    showResume: false,
    showContact: false,
};

export interface SettingsContextValue {
    settings: SettingsDoc;
    isInitialLoading: boolean;
    settingsStatus: 'loading' | 'ready' | 'unavailable' | 'snapshot';
    retrySettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue>({
    settings: HIDDEN_SETTINGS,
    isInitialLoading: true,
    settingsStatus: 'loading',
    retrySettings: () => {},
});
