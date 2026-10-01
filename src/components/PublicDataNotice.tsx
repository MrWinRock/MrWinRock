import { useTranslation } from 'react-i18next';
import type { PublicResourceState } from '../hooks/usePublicResource';
import { useRetryCountdown } from '../hooks/useRetryCountdown';

export function PublicDataNotice<T>({ state, retry }: { state: PublicResourceState<T>; retry?: () => void }) {
  const { t } = useTranslation();
  const seconds = useRetryCountdown('retryAt' in state ? state.retryAt : undefined);
  if (state.status === 'ready') return null;
  const failed = state.status === 'unavailable' || state.status === 'stale';
  return (
    <div className="public-notice">
      <p role={state.status === 'unavailable' ? 'alert' : 'status'}>
        {t(`resource.${state.status === 'stale' && state.source === 'snapshot' ? 'snapshot' : state.status}`)}
      </p>
      {failed && state.reason === 'rate-limited' && <p aria-live="off">{t('resource.rateLimited', { count: seconds })}</p>}
      {failed && retry && <button type="button" onClick={retry} disabled={seconds > 0}
        className="s-button mt-3 disabled:opacity-60 disabled:cursor-not-allowed">
        {t('resource.retry')}
      </button>}
    </div>
  );
}
