import { useContext } from 'react';
import { SettingsContext } from './settingsConstants';

export function useSettings() {
    return useContext(SettingsContext);
}
