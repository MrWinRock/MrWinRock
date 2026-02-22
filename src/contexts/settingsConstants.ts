import { createContext } from 'react';
import type { SettingsDoc } from '../lib/api';

export const SETTINGS_DEFAULTS: SettingsDoc = {
    showSkills: true,
    showProjects: true,
    showExperience: true,
    showResume: true,
    showContact: true,
};

export const SettingsContext = createContext<SettingsDoc>(SETTINGS_DEFAULTS);
