import type { ReactNode } from 'react';
import type { SettingsDoc } from '../lib/api';
import { useSettings } from '../contexts/useSettings';
import { PublicDataNotice } from './PublicDataNotice';

export function SectionGuard({ setting, children }: { setting: keyof SettingsDoc; children: ReactNode }) {
  const { settings, isInitialLoading } = useSettings();
  if (isInitialLoading) return <PublicDataNotice state={{ status: 'loading' }} />;
  if (!settings[setting]) return <PublicDataNotice state={{ status: 'disabled' }} />;
  return children;
}
