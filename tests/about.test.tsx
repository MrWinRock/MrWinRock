import axe from 'axe-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import About from '../src/components/pages/about/About';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
vi.mock('../src/lib/api', () => ({ api: { about: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('announces unavailability and retries without revealing failure details', async () => {
  vi.mocked(api.about).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<About />);
  expect(await screen.findByText(/temporarily unavailable/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  expect(screen.queryByText(/cached content/i)).toBeNull();
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.about).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.about).mockResolvedValue({ ok: true, data: { story: '', background: '' } });
  renderPublic(<About />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
});
