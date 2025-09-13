export const GA_ID: string = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? '');

const GA4_ID_RE = /^G-[A-Z0-9]{6,}$/i;
export const TRACKING_ENABLED: boolean = import.meta.env.PROD && GA4_ID_RE.test(GA_ID);
