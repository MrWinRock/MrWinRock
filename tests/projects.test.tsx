import axe from 'axe-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import Projects from '../src/components/pages/projects/Projects';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
vi.mock('../src/lib/api', () => ({ api: { projects: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('announces cached fallback and retries without revealing failure details', async () => {
  vi.mocked(api.projects).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<Projects />);
  expect(await screen.findByText(/cached content/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.projects).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [] });
  renderPublic(<Projects />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
});
