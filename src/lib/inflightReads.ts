import { ApiError } from './api';

export interface InflightReadRegistry {
    run<T>(key: string, request: (signal: AbortSignal) => Promise<T>, callerSignal?: AbortSignal): Promise<T>;
    clear(): void;
}

type Subscriber = { resolve(value: unknown): void; reject(reason: unknown): void; detach(): void };
type Entry = { controller: AbortController; subscribers: Set<Subscriber> };
const cancelled = () => new ApiError({ code: 'cancelled', message: 'Request cancelled.', cancelled: true });

export function createInflightReadRegistry(): InflightReadRegistry {
    const entries = new Map<string, Entry>();
    function remove(key: string, entry: Entry) {
        if (entries.get(key) === entry) entries.delete(key);
    }
    return {
        run<T>(key: string, request: (signal: AbortSignal) => Promise<T>, signal?: AbortSignal): Promise<T> {
            if (signal?.aborted) return Promise.reject(cancelled());
            let entry = entries.get(key);
            const start = !entry;
            if (!entry) {
                entry = { controller: new AbortController(), subscribers: new Set() };
                entries.set(key, entry);
            }
            const current = entry;
            const result = new Promise<T>((resolve, reject) => {
                const abort = () => {
                    subscriber.detach();
                    current.subscribers.delete(subscriber);
                    reject(cancelled());
                    if (current.subscribers.size === 0) {
                        remove(key, current);
                        current.controller.abort();
                    }
                };
                const subscriber: Subscriber = { resolve: value => resolve(value as T), reject, detach: () => signal?.removeEventListener('abort', abort) };
                current.subscribers.add(subscriber);
                signal?.addEventListener('abort', abort, { once: true });
            });
            if (start) {
                const settle = (value: unknown, failed: boolean) => {
                    remove(key, current);
                    for (const subscriber of current.subscribers) {
                        subscriber.detach();
                        if (failed) subscriber.reject(value);
                        else subscriber.resolve(value);
                    }
                    current.subscribers.clear();
                };
                try { request(current.controller.signal).then(value => settle(value, false), error => settle(error, true)); }
                catch (error) { settle(error, true); }
            }
            return result;
        },
        clear() {
            for (const entry of entries.values()) {
                for (const subscriber of entry.subscribers) { subscriber.detach(); subscriber.reject(cancelled()); }
                entry.subscribers.clear();
                entry.controller.abort();
            }
            entries.clear();
        },
    };
}
