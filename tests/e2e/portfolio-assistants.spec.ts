import { expect, test } from '@playwright/test';

const settings = { showAbout: true, showSkills: true, showProjects: true, showExperience: true, showResume: true, showContact: true };
const project = {
  _id: 'chat', slug: 'chat', title: 'Chat Tool', order: 0, tech: ['TypeScript', 'WebSocket'], description: 'A real-time messaging application.',
  caseStudy: { problem: 'Messages needed to arrive without refreshing.', role: 'Built the client and API.', decisions: ['Used WebSocket events for live messages.'], outcomes: ['Messages update without a page reload.'] },
  translations: { th: { title: 'ระบบแชต', description: 'แอปพลิเคชันส่งข้อความแบบเรียลไทม์', caseStudy: { decisions: ['ใช้ WebSocket ส่งข้อความทันที'] } } },
};
test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { ok: false, error: 'Unavailable' } }));
  await page.route('**/api/settings', route => route.fulfill({ json: { ok: true, data: settings } }));
});

test('match evidence is localized and opens its published section', async ({ page }, info) => {
  await page.route('**/api/projects', route => route.fulfill({ json: { ok: true, data: [project] } }));
  await page.route('**/api/projects/match', route => route.fulfill({ json: { ok: true, data: { source: 'jev', matches: [{ project, score: 0.9, confidence: 0.8, evidence: [{ field: 'decisions', index: 0 }, { field: 'tech', index: 1 }] }] } } }));
  await page.goto('/projects');
  await page.getByLabel('What do you need?').fill('I need a real-time chat application');
  await page.getByRole('button', { name: 'Find relevant projects' }).click();
  const evidence = page.getByRole('link', { name: 'Used WebSocket events for live messages.' });
  await expect(evidence).toBeVisible();
  const card = page.locator('.project-matcher .project-card');
  await card.scrollIntoViewIfNeeded();
  await card.screenshot({ path: info.outputPath('evidence-card-en.png') });
  await page.screenshot({ path: info.outputPath('evidence-en.png'), fullPage: true });
  await page.getByRole('button', { name: /switch language to thai/i }).click();
  await expect(page.getByRole('link', { name: 'ใช้ WebSocket ส่งข้อความทันที' })).toBeVisible();
  await card.screenshot({ path: info.outputPath('evidence-card-th.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('evidence-th.png'), fullPage: true });
  await page.getByRole('link', { name: 'ใช้ WebSocket ส่งข้อความทันที' }).click();
  await expect(page).toHaveURL(/\/projects\/chat#decisions$/);
  const section = page.locator('#decisions');
  await expect(section).toBeInViewport();
  await expect(section).toContainText('ใช้ WebSocket ส่งข้อความทันที');
});

test('brief suggestions stay advisory and sending remains explicit', async ({ page }, info) => {
  let sent = 0;
  let reviews = 0;
  await page.route('**/api/contact/brief', async route => {
    reviews++;
    expect(route.request().postDataJSON()).toEqual({ message: 'Build a booking application with a shared calendar' });
    await route.fulfill({ json: { ok: true, data: { source: 'jev', category: 'web-app', checks: { audience: 'missing', scope: 'present', deadline: 'uncertain' } } } });
  });
  await page.route('**/api/contact', route => { sent++; return route.fulfill({ json: { ok: true, message: 'Sent' } }); });
  await page.goto('/contact');
  await page.getByLabel(/^name$/i).fill('Win');
  await page.getByLabel(/^email$/i).fill('win@example.com');
  await page.getByLabel(/^message$/i).fill('Build a booking application with a shared calendar');
  expect(reviews).toBe(0);
  const review = page.getByRole('button', { name: 'Review my brief' });
  await review.focus(); await page.keyboard.press('Enter');
  const result = page.getByRole('region', { name: 'Brief review' });
  await expect(result).toContainText('Who will use the project?');
  expect(sent).toBe(0);
  await expect(page.getByRole('button', { name: 'Send Message' })).toBeEnabled();
  await page.locator('.brief-assistant').screenshot({ path: info.outputPath('brief-panel-en.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('brief-en.png'), fullPage: true });
  await page.getByRole('button', { name: /switch language to thai/i }).click();
  await expect(page.getByRole('region', { name: 'ผลการตรวจบรีฟ' })).toBeVisible();
  await expect(page.getByText('ใครจะเป็นผู้ใช้งานโปรเจกต์นี้')).toBeVisible();
  await page.locator('.brief-assistant').screenshot({ path: info.outputPath('brief-panel-th.png') });
  await page.screenshot({ path: info.outputPath('brief-th.png'), fullPage: true });
  await page.getByLabel('ข้อความ', { exact: true }).fill('Build a booking application for students');
  await expect(page.getByRole('region', { name: 'ผลการตรวจบรีฟ' })).toHaveCount(0);
  await page.getByRole('button', { name: 'ส่งข้อความ', exact: true }).click();
  await expect(page.getByLabel('ข้อความ', { exact: true })).toHaveValue('');
  expect(sent).toBe(1);
});
