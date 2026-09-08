import { expect, test, type Locator, type Page } from '@playwright/test';

const settings = { showAbout: true, showSkills: true, showProjects: true, showExperience: true, showResume: true, showContact: true };
const project = { _id: '123', title: 'Live portfolio project', description: 'A real API project', url: 'https://example.com', repo: '', tech: ['TypeScript'], order: 1 };
async function tabTo(page: Page, target: Locator) {
  for (let count = 0; count < 45; count++) {
    if (await target.evaluate(node => node === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error('Control is not keyboard reachable');
}
async function fillContact(page: Page) {
  await page.getByLabel(/^name$/i).fill('Win');
  await page.getByLabel(/^email$/i).fill('win@example.com');
  await page.getByLabel(/^message$/i).fill('A valid test message');
}
test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { ok: false, error: 'Unavailable' } }));
  await page.route('**/api/settings', route => route.fulfill({ json: { ok: true, data: settings }, headers: { ETag: '"test-v1"' } }));
});
test('keyboard navigation, cached fallback, retry, language and responsive layout', async ({ page }, info) => {
  let available = false;
  await page.route('**/api/projects', route => route.fulfill(available
    ? { json: { ok: true, data: [project] } }
    : { status: 503, json: { ok: false, error: 'Internal provider secret' } }));
  await page.goto('/');
  if (info.project.name === 'mobile') {
    const menu = page.getByRole('button', { name: /open menu/i });
    await menu.focus(); await page.keyboard.press('Enter');
  }
  const link = page.getByRole('navigation').getByRole('link', { name: /^projects$/i });
  await link.focus(); await page.keyboard.press('Enter');
  await expect(page.getByText(/cached content/i)).toBeVisible();
  const retry = page.getByRole('button', { name: /^retry$/i });
  await tabTo(page, retry);
  await expect(retry).toBeFocused();
  available = true;
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: project.title })).toBeVisible();
  await expect(page.getByText(/cached content/i)).toHaveCount(0);
  await page.getByRole('button', { name: /switch language to thai/i }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
test('contact validation, safe 503, rate limit, and accepted delivery', async ({ page }) => {
  let status = 503;
  await page.route('**/api/contact', route => route.fulfill({ status,
    headers: { 'Retry-After': '2' },
    json: status === 200 ? { ok: true, message: 'Sent' } : { ok: false, error: 'Provider secret' },
  }));
  await page.goto('/contact');
  const send = page.getByRole('button', { name: /send message/i });
  await send.click();
  await expect(page.getByLabel(/^name$/i)).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel(/^name$/i)).toBeFocused();
  await fillContact(page); await send.click();
  await expect(page.getByRole('alert')).toContainText(/temporarily unavailable/i);
  await expect(page.getByText('Provider secret')).toHaveCount(0);
  status = 429; await send.click();
  await expect(send).toBeDisabled();
  await expect(send).toBeEnabled({ timeout: 4000 });
  status = 200; await send.click();
  await expect(page.getByRole('status')).toContainText(/sent/i);
  await expect(page.getByLabel(/^name$/i)).toHaveValue('');
});
test('resume recovers and disabled deep links stay on their route', async ({ page }) => {
  await page.goto('/resume');
  await expect(page.getByRole('button', { name: /retry/i })).toBeVisible();
  await page.route('**/api/resume', route => route.fulfill({ contentType: 'application/pdf', body: '%PDF-1.4\n%%EOF' }));
  await page.getByRole('button', { name: /retry/i }).click();
  await expect(page.getByRole('link', { name: /download/i })).toHaveAttribute('href', /^blob:/);
  await page.route('**/api/settings', route => route.fulfill({ json: { ok: true, data: { ...settings, showProjects: false } } }));
  await page.goto('/projects');
  await expect(page.getByRole('status')).toContainText(/section is currently unavailable/i);
  await expect(page).toHaveURL(/\/projects$/);
});
test('reduced motion disables control transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page.locator('.navbar-title').evaluate(element => getComputedStyle(element).transitionDuration);
  expect(duration.split(',').every(value => parseFloat(value) <= 0.001)).toBe(true);
});
