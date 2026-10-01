import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { SectionGuard } from '../src/components/SectionGuard';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';
import { renderPublic } from './helpers/renderPublic';

it('shows a disabled deep link without mounting its content', () => {
  renderPublic(<SectionGuard setting="showProjects"><h1>Private content</h1></SectionGuard>, { route: '/projects', settings: HIDDEN_SETTINGS });
  expect(screen.getByRole('status')).toHaveTextContent(/section is currently unavailable/i);
  expect(screen.queryByText('Private content')).toBeNull();
});
