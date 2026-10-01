export const SETTINGS_POLL_INTERVAL_MS = 60_000;

export function settingsRetryDelayMs(failureCount: number): number {
    return Math.min(SETTINGS_POLL_INTERVAL_MS * 2 ** Math.max(0, failureCount), 900_000);
}
