import { describe, expect, test } from 'vitest';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';

describe('HIDDEN_SETTINGS', () => {
    test('does not expose configurable sections while settings are unresolved', () => {
        expect(HIDDEN_SETTINGS).toEqual({
            showAbout: false,
            showSkills: false,
            showProjects: false,
            showExperience: false,
            showResume: false,
            showContact: false,
        });
    });
});
