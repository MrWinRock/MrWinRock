import axe from 'axe-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import Home from '../src/components/pages/home/Home';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
import { HIDDEN_SETTINGS } from '../src/contexts/settingsConstants';
vi.mock('../src/lib/api', () => ({ api: { skills: vi.fn(), projects: vi.fn(), resume: vi.fn() } }));
beforeEach(() => { vi.resetAllMocks(); vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [] }); });
it('shows a stable full name and role immediately without a typing gate', () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: {} });
  renderPublic(<Home />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Pharthiwath Gristsoopharruth');
  expect(screen.getByText('Full-Stack Developer')).toBeVisible();
});
it('announces unavailability and retries without revealing failure details', async () => {
  vi.mocked(api.skills).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<Home />);
  expect(await screen.findByText(/temporarily unavailable/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  expect(screen.queryByText(/cached content/i)).toBeNull();
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.skills).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: {} });
  renderPublic(<Home />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
});
it('does not show skills or resource notices when skills are disabled', () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: {} });
  renderPublic(<Home />, { settings: HIDDEN_SETTINGS });
  expect(screen.queryByRole('heading', { name: /technologies/i })).toBeNull();
});
it('excludes typed company records from selected work even when flagged featured', async () => {
  vi.mocked(api.skills).mockResolvedValue({ ok: true, data: {} });
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [{ title: 'Company Portal', description: 'Private claim', order: 0, tech: [], workType: 'company', featured: true }, { title: 'Personal Work', description: 'Public work', order: 1, tech: [], featured: true }] });
  renderPublic(<Home />);
  expect(await screen.findByRole('heading', { name: 'Personal Work' })).toBeInTheDocument();
  expect(screen.queryByText('Company Portal')).toBeNull();
  expect(screen.queryByText('Private claim')).toBeNull();
});
