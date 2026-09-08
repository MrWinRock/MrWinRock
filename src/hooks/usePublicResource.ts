import { useEffect, useRef, useState } from 'react';

type Failure = { reason: 'rate-limited'; retryAt: number } | { reason: 'unavailable' };
export type PublicResourceState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T; source: 'live' }
  | { status: 'empty' }
  | { status: 'disabled' }
  | ({ status: 'stale'; data: T } & Failure)
  | ({ status: 'unavailable' } & Failure);

export function usePublicResource<T>(options: {
  key: string; load(signal: AbortSignal): Promise<T>; fallback?: T; isEmpty(value: T): boolean;
}) {
  const latest = useRef(options);
  useEffect(() => { latest.current = options; });
  const [generation, setGeneration] = useState(0);
  const [snapshot, setSnapshot] = useState<{ key: string; state: PublicResourceState<T> }>({ key: options.key, state: { status: 'loading' } });
  useEffect(() => {
    const controller = new AbortController();
    const current = latest.current;
    const publish = (state: PublicResourceState<T>) => {
      if (!controller.signal.aborted) setSnapshot({ key: current.key, state });
    };
    publish({ status: 'loading' });
    const request = async () => current.load(controller.signal);
    request().then(data => {
      publish(current.isEmpty(data) ? { status: 'empty' } : { status: 'ready', source: 'live', data });
    }).catch((error: unknown) => {
      if (controller.signal.aborted) return;
      const failure = error as { status?: number; cancelled?: boolean; retryAfterSeconds?: number } | null;
      if (failure?.cancelled) return;
      if (failure?.status === 403) { publish({ status: 'disabled' }); return; }
      const reason: Failure = failure?.status === 429
        ? { reason: 'rate-limited', retryAt: Date.now() + Math.max(0, failure.retryAfterSeconds ?? 60) * 1000 }
        : { reason: 'unavailable' };
      publish(current.fallback !== undefined
        ? { status: 'stale', data: current.fallback, ...reason }
        : { status: 'unavailable', ...reason });
    });
    return () => controller.abort();
  }, [options.key, generation]);
  return {
    state: snapshot.key === options.key ? snapshot.state : { status: 'loading' as const },
    retry: () => setGeneration(value => value + 1),
  };
}
