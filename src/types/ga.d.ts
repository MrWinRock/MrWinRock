export { };

declare global {
    type GAEventParams = Record<string, unknown>;

    interface Gtag {
        (command: 'js', date: Date): void;
        (command: 'config', targetId: string, config?: Record<string, unknown>): void;
        (command: 'event', eventName: string, params?: GAEventParams): void;
        (command: 'set', params: Record<string, unknown>): void;
        (command: 'consent', action: 'default' | 'update', params: Record<string, 'granted' | 'denied'>): void;
        (command: 'get', targetId: string, fieldName: string, callback: (value: unknown) => void): void;
        (command: string, ...args: unknown[]): void;
    }

    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
        __gaInitialized?: boolean;
    }
}
