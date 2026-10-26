import axe from 'axe-core';
import { screen, within } from '@testing-library/react';
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
  expect(screen.queryByRole('list', { name: 'Experience' })).toBeNull();
});

it('presents published milestones in order with machine-readable dates', async () => {
  vi.mocked(api.experiences).mockResolvedValue({ ok: true, data: [
    { title: 'Past role', company: 'Example', location: 'Bangkok', type: 'Internship', startDate: '2025-12', endDate: '2026-03', description: 'Published details.', achievements: [], tech: [], order: 0 },
    { title: 'Current role', company: 'Example', location: 'Bangkok', type: 'Contract', startDate: '2026-04', description: 'Published details.', achievements: [], tech: [], order: 1 },
  ] });
  const { container } = renderPublic(<Experience />);
  const timeline = await screen.findByRole('list', { name: 'Experience' });
  const milestones = within(timeline).getAllByRole('listitem');
  expect(milestones).toHaveLength(2);
  expect(within(milestones[0]).getByRole('heading', { name: 'Past role' })).toBeVisible();
  expect(within(milestones[1]).getByRole('heading', { name: 'Current role' })).toBeVisible();
  expect([...timeline.querySelectorAll('time')].map(time => time.dateTime)).toEqual(['2025-12', '2026-03', '2026-04']);
  expect(within(milestones[1]).getByText(/Present/)).toBeVisible();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
});
