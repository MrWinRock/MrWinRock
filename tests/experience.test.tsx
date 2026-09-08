import axe from 'axe-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import Experience from '../src/components/pages/experience/Experience';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
vi.mock('../src/lib/api', () => ({ api: { experiences: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('announces unavailability and retries without revealing failure details', async () => {
  vi.mocked(api.experiences).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<Experience />);
  expect(await screen.findByText(/temporarily unavailable/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  expect(screen.queryByText(/cached content/i)).toBeNull();
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.experiences).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.experiences).mockResolvedValue({ ok: true, data: [] });
  renderPublic(<Experience />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
});
