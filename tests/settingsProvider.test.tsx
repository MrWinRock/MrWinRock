import { act, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { api } from '../src/lib/api';
import { SettingsProvider } from '../src/contexts/SettingsContext';
import { HIDDEN_SETTINGS, SettingsContext } from '../src/contexts/settingsConstants';
import { deferred } from './helpers/deferred';
import { settingsRetryDelayMs } from '../src/contexts/settingsPolling';
vi.mock('../src/lib/api', () => ({ api: { settings: vi.fn() } }));
function Probe() { const { settings, isInitialLoading } = useContext(SettingsContext); return <span>{isInitialLoading ? 'loading' : settings.showProjects ? 'visible' : 'hidden'}</span>; }
afterEach(() => { vi.useRealTimers(); vi.resetAllMocks(); });

it('retains settings through 304 and failures, backs off, and resets after success', async () => {
    vi.useFakeTimers();
    vi.mocked(api.settings)
        .mockResolvedValueOnce({ kind: 'modified', data: { ...HIDDEN_SETTINGS, showProjects: true }, etag: '"v1"' })
        .mockResolvedValueOnce({ kind: 'not-modified' })
        .mockRejectedValueOnce(new Error('failure'))
        .mockRejectedValueOnce(new Error('failure'))
        .mockResolvedValue({ kind: 'not-modified' });
    render(<SettingsProvider><Probe /></SettingsProvider>);
    expect(screen.getByText('loading')).toBeInTheDocument();
    await act(async () => {});
    expect(screen.getByText('visible')).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(api.settings).toHaveBeenLastCalledWith(expect.objectContaining({ etag: '"v1"', signal: expect.any(AbortSignal) }));
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(screen.getByText('visible')).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(api.settings).toHaveBeenCalledTimes(4);
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(api.settings).toHaveBeenCalledTimes(4);
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(api.settings).toHaveBeenCalledTimes(5);
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(api.settings).toHaveBeenCalledTimes(6);
});

it('doubles failure delay from two minutes and caps at fifteen minutes', () => {
    expect([1, 2, 3, 4, 100].map(settingsRetryDelayMs)).toEqual([120_000, 240_000, 480_000, 900_000, 900_000]);
});

it('aborts pending work on unmount and refreshes on visible without overlap', async () => {
    const pending = deferred<never>();
    vi.mocked(api.settings).mockReturnValue(pending.promise);
    const { unmount } = render(<SettingsProvider><Probe /></SettingsProvider>);
    act(() => document.dispatchEvent(new Event('visibilitychange')));
    expect(api.settings).toHaveBeenCalledTimes(1);
    const signal = vi.mocked(api.settings).mock.calls[0][0]?.signal;
    unmount();
    expect(signal?.aborted).toBe(true);
});

it('refreshes when visible and retains hidden defaults on an initial failure', async () => {
    vi.mocked(api.settings).mockRejectedValueOnce(new Error('failure')).mockResolvedValue({ kind: 'modified', data: { ...HIDDEN_SETTINGS, showProjects: true } });
    render(<SettingsProvider><Probe /></SettingsProvider>);
    await act(async () => {});
    expect(screen.getByText('hidden')).toBeInTheDocument();
    await act(async () => document.dispatchEvent(new Event('visibilitychange')));
    expect(screen.getByText('visible')).toBeInTheDocument();
});
