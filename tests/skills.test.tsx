import axe from 'axe-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import Skills from '../src/components/pages/skills/Skills';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';
vi.mock('../src/lib/api', () => ({ api: { skills: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('announces cached fallback and retries without revealing failure details', async () => {
  vi.mocked(api.skills).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<Skills />);
  expect(await screen.findByText(/cached content/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.skills).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: {} });
  renderPublic(<Skills />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
});
it('opens a project filter from a skill tile', async () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: { web: { order_flag: 0, skills: [{ name: 'C++', order: 0 }] } } });
  renderPublic(<Skills />);
  expect(await screen.findByRole('link', { name: 'C++', exact: true })).toHaveAttribute('href', '/projects?tech=C%2B%2B');
});
it('keeps skill information without project links when projects are hidden', async () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: { web: { order_flag: 0, skills: [{ name: 'React', order: 0 }] } } });
  renderPublic(<Skills />, { settings: { ...HIDDEN_SETTINGS, showSkills: true } });
  expect(await screen.findByText('React')).toBeVisible();
  expect(screen.queryByRole('link', { name: 'React', exact: true })).toBeNull();
});
