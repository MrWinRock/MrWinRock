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
}

export const SettingsContext = createContext<SettingsContextValue>({
    settings: HIDDEN_SETTINGS,
    isInitialLoading: true,
});
