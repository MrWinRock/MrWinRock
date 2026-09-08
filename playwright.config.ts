import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'bun run build && bun run preview -- --host 127.0.0.1 --port 4173',
    env: { ...process.env, VITE_BASE_URL: 'http://127.0.0.1:4173' },
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
});
