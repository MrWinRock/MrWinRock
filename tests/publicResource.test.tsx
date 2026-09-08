import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePublicResource } from '../src/hooks/usePublicResource';

describe('public resources', () => {
  it('replaces language keys and ignores the prior language response', async () => {
    let finish!: (value: string[]) => void;
    let firstSignal!: AbortSignal;
    const { result, rerender } = renderHook(({ key }) => usePublicResource({
      key,
      load: signal => key === 'en' ? new Promise<string[]>(resolve => { firstSignal = signal; finish = resolve; }) : Promise.resolve(['Thai']),
      isEmpty: values => !values.length,
    }), { initialProps: { key: 'en' } });
    rerender({ key: 'th' });
    expect(firstSignal.aborted).toBe(true);
    await waitFor(() => expect(result.current.state).toMatchObject({ data: ['Thai'] }));
    await act(async () => finish(['English']));
    expect(result.current.state).toMatchObject({ data: ['Thai'] });
  });
  it('starts loading and distinguishes an empty live response', async () => {
    const { result } = renderHook(() => usePublicResource({ key: 'empty', load: async () => [], isEmpty: x => !x.length }));
    expect(result.current.state.status).toBe('loading');
    await waitFor(() => expect(result.current.state.status).toBe('empty'));
  });
  it.each([
    [403, true, 'disabled'], [503, true, 'stale'], [503, false, 'unavailable'],
    [429, true, 'stale'], [429, false, 'unavailable'],
  ])('maps %s with fallback %s to %s', async (status, fallback, expected) => {
    const before = Date.now();
    const { result } = renderHook(() => usePublicResource({
      key: 'failure', load: async () => { throw { status, retryAfterSeconds: 12 }; },
      fallback: fallback ? ['bundled'] : undefined, isEmpty: x => !x.length,
    }));
    await waitFor(() => expect(result.current.state.status).toBe(expected));
    if (status === 429) expect(result.current.state).toMatchObject({ reason: 'rate-limited', retryAt: expect.any(Number) });
    if ('retryAt' in result.current.state) expect(result.current.state.retryAt).toBeGreaterThanOrEqual(before + 12000);
  });
  it('aborts replacement and ignores obsolete completion, then aborts on unmount', async () => {
    const signals: AbortSignal[] = [];
    let finish!: (data: string[]) => void;
    const load = vi.fn((signal: AbortSignal) => {
      signals.push(signal);
      return signals.length === 1 ? new Promise<string[]>(resolve => { finish = resolve; }) : Promise.resolve(['live']);
    });
    const { result, unmount } = renderHook(() => usePublicResource({ key: 'data', load, isEmpty: x => !x.length }));
    act(() => result.current.retry());
    expect(signals[0].aborted).toBe(true);
    await waitFor(() => expect(result.current.state).toMatchObject({ status: 'ready', data: ['live'], source: 'live' }));
    await act(async () => finish(['obsolete']));
    expect(result.current.state).toMatchObject({ data: ['live'] });
    unmount();
    expect(signals[1].aborted).toBe(true);
  });
  it('keeps cancellation silent and does not restart for a new callback identity', async () => {
    const load = vi.fn(async () => { throw { cancelled: true }; });
    const { result, rerender } = renderHook(() => usePublicResource({ key: 'cancel', load: signal => load(signal), isEmpty: () => false }));
    await act(async () => {});
    rerender();
    expect(load).toHaveBeenCalledTimes(1);
    expect(result.current.state.status).toBe('loading');
  });
});
