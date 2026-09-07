import { expect, it, vi } from 'vitest';
import { createInflightReadRegistry } from '../src/lib/inflightReads';
import { deferred } from './helpers/deferred';

it('shares a read while independently cancelling subscribers', async () => {
    const registry = createInflightReadRegistry();
    const pending = deferred<string>();
    const load = vi.fn((signal: AbortSignal) => { expect(signal.aborted).toBe(false); return pending.promise; });
    const controller = new AbortController();
    const first = registry.run('a', load, controller.signal);
    const second = registry.run('a', load);
    controller.abort();
    await expect(first).rejects.toMatchObject({ cancelled: true });
    expect(load).toHaveBeenCalledTimes(1);
    expect(load.mock.calls[0][0].aborted).toBe(false);
    pending.resolve('live');
    await expect(second).resolves.toBe('live');
    await registry.run('a', load);
    expect(load).toHaveBeenCalledTimes(2);
});

it('aborts abandoned reads and prevents old settlement from removing a replacement', async () => {
    const registry = createInflightReadRegistry();
    const old = deferred<string>();
    const fresh = deferred<string>();
    let signal!: AbortSignal;
    const controller = new AbortController();
    const first = registry.run('a', s => { signal = s; return old.promise; }, controller.signal);
    controller.abort();
    await expect(first).rejects.toMatchObject({ cancelled: true });
    expect(signal.aborted).toBe(true);
    const load = vi.fn(() => fresh.promise);
    const second = registry.run('a', load);
    old.resolve('obsolete');
    await Promise.resolve();
    const third = registry.run('a', load);
    fresh.resolve('fresh');
    await expect(Promise.all([second, third])).resolves.toEqual(['fresh', 'fresh']);
    expect(load).toHaveBeenCalledTimes(1);
});

it('cleans rejected reads and clear cancels all subscribers', async () => {
    const registry = createInflightReadRegistry();
    await expect(registry.run('a', () => Promise.reject(new Error('failed')))).rejects.toThrow('failed');
    await expect(registry.run('a', () => Promise.resolve('retry'))).resolves.toBe('retry');
    const pending = registry.run('b', () => new Promise(() => {}));
    registry.clear();
    await expect(pending).rejects.toMatchObject({ cancelled: true });
});
