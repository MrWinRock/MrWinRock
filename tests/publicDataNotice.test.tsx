import { act, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import axe from 'axe-core';
import { PublicDataNotice } from '../src/components/PublicDataNotice';
import { renderPublic } from './helpers/renderPublic';

afterEach(() => vi.useRealTimers());
it('blocks Retry during rate limiting and unlocks at the deadline', async () => {
  vi.useFakeTimers();
  renderPublic(<PublicDataNotice state={{ status: 'unavailable', reason: 'rate-limited', retryAt: Date.now() + 2000 }} retry={() => {}} />);
  expect(screen.getByRole('button', { name: /retry/i })).toBeDisabled();
  expect(screen.getByRole('alert')).not.toHaveTextContent(/seconds/i);
  await act(async () => vi.advanceTimersByTime(2000));
  expect(screen.getByRole('button', { name: /retry/i })).toBeEnabled();
});
it('labels bundled fallback and provides an accessible retry', async () => {
  const { container } = renderPublic(<PublicDataNotice state={{ status: 'stale', data: [], reason: 'unavailable' }} retry={() => {}} />);
  expect(screen.getByRole('status')).toHaveTextContent(/cached content/i);
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
});
