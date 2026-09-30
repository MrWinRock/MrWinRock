import type { ReactNode } from 'react';
import type { SettingsDoc } from '../lib/api';
import { useSettings } from '../contexts/useSettings';
import { PublicDataNotice } from './PublicDataNotice';
import { useTranslation } from 'react-i18next';

export function SectionGuard({ setting, children }: { setting: keyof SettingsDoc; children: ReactNode }) {
  const { settings, isInitialLoading, settingsStatus, retrySettings } = useSettings();
  const { t } = useTranslation();
  if (isInitialLoading) return <PublicDataNotice state={{ status: 'loading' }} />;
  if (settingsStatus === 'unavailable') return <PublicDataNotice state={{ status: 'unavailable', reason: 'unavailable' }} retry={retrySettings} />;
  if (!settings[setting]) return <PublicDataNotice state={{ status: 'disabled' }} />;
  return settingsStatus === 'snapshot' ? <><div className="my-4 border border-cyan-300/40 rounded-xl p-4"><p role="status">{t('resource.snapshot')}</p><button className="s-button mt-3" type="button" onClick={retrySettings}>{t('resource.retry')}</button></div>{children}</> : children;
}
