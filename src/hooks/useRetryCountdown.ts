import { useEffect, useState } from 'react';

export function useRetryCountdown(retryAt?: number): number {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (retryAt === undefined) return;
    const initial = window.setTimeout(() => setNow(Date.now()), 0);
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, [retryAt]);
  return retryAt === undefined ? 0 : Math.max(0, Math.ceil((retryAt - now) / 1000));
}
