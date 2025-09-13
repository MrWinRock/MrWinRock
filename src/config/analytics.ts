export const GA_ID: string = String(import.meta.env.VITE_GA_MEASUREMENT_ID ?? "");
export const TRACKING_ENABLED: boolean = import.meta.env.PROD && GA_ID.length > 0;
