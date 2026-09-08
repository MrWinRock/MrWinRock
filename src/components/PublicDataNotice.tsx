import { useTranslation } from 'react-i18next';
import type { PublicResourceState } from '../hooks/usePublicResource';
import { useRetryCountdown } from '../hooks/useRetryCountdown';

export function PublicDataNotice<T>({ state, retry }: { state: PublicResourceState<T>; retry?: () => void }) {
  const { t } = useTranslation();
  const seconds = useRetryCountdown('retryAt' in state ? state.retryAt : undefined);
  if (state.status === 'ready') return null;
  const failed = state.status === 'unavailable' || state.status === 'stale';
  return (
    <div className="my-6 rounded-xl border border-violet-400/40 bg-[#20182c] px-5 py-4 text-gray-100">
      <p role={state.status === 'unavailable' ? 'alert' : 'status'}>
        {t(`resource.${state.status}`)}
      </p>
      {failed && state.reason === 'rate-limited' && <p aria-live="off">{t('resource.rateLimited', { count: seconds })}</p>}
      {failed && retry && <button type="button" onClick={retry} disabled={seconds > 0}
        className="mt-3 rounded-lg border border-cyan-300 px-4 py-2 font-semibold text-cyan-100 hover:bg-cyan-300/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed">
        {t('resource.retry')}
      </button>}
    </div>
  );
}
