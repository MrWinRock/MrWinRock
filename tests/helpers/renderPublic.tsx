import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/i18n';
import { SettingsContext } from '../../src/contexts/settingsConstants';
import type { SettingsDoc } from '../../src/lib/api';

const ALL_SECTIONS_ENABLED: SettingsDoc = {
  showAbout: true, showSkills: true, showProjects: true,
  showExperience: true, showResume: true, showContact: true,
};

export function renderPublic(
  ui: ReactElement,
  options?: { route?: string; settings?: SettingsDoc },
) {
  return render(
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={{
        settings: options?.settings ?? ALL_SECTIONS_ENABLED,
        isInitialLoading: false,
      }}>
        <MemoryRouter initialEntries={[options?.route ?? '/']}>
          {ui}
        </MemoryRouter>
      </SettingsContext.Provider>
    </I18nextProvider>,
  );
}
