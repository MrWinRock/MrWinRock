import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { ok: false } }));
  await page.route('**/api/settings', route => route.fulfill({ json: { ok: true, data: { showAbout: true, showSkills: true, showProjects: true, showExperience: true, showResume: true, showContact: true } } }));
});

test('experience alternates around the center on desktop and follows one column on mobile', async ({ page }, info) => {
  const entry = { company: 'Example Company', location: 'Bangkok, Thailand', type: 'Contract', description: 'A published description with enough detail to check the reading column.', achievements: ['A published outcome.'], tech: ['React', 'TypeScript'] };
  await page.route('**/api/experiences', route => route.fulfill({ json: { ok: true, data: [
    { ...entry, title: 'Earlier Role', startDate: '2025-12', endDate: '2026-03', order: 0 },
    { ...entry, title: 'Software Developer', startDate: '2026-04', order: 1 },
  ] } }));
  await page.goto('/experience');
  const title = page.getByRole('heading', { name: 'Software Developer', exact: true });
  await expect(title).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const entries = page.getByRole('article');
  for (let index = 0; index < 2; index++) {
    const date = await entries.nth(index).locator('.experience-period').boundingBox();
    const body = await entries.nth(index).locator('.experience-body').boundingBox();
    if (!date || !body) throw new Error('Experience content has no layout');
    if (info.project.name === 'desktop') {
      const center = page.viewportSize()!.width / 2;
      if (index === 0) {
        expect(date.x + date.width).toBeLessThan(center);
        expect(body.x).toBeGreaterThan(center);
      } else {
        expect(body.x + body.width).toBeLessThan(center);
        expect(date.x).toBeGreaterThan(center);
      }
      expect(Math.abs(date.y - body.y)).toBeLessThan(45);
      expect(body.width).toBeGreaterThan(440);
    } else {
      expect(date.y).toBeLessThan(body.y);
      expect(body.width).toBeGreaterThan(300);
    }
  }
  const firstPanel = await entries.nth(0).locator('.experience-body').boundingBox();
  const secondPanel = await entries.nth(1).locator('.experience-body').boundingBox();
  if (!firstPanel || !secondPanel) throw new Error('Experience panels have no layout');
  expect(Math.abs(firstPanel.width - secondPanel.width)).toBeLessThan(1);
  if (info.project.name === 'desktop') {
    const center = page.viewportSize()!.width / 2;
    expect(Math.abs((firstPanel.x - center) - (center - secondPanel.x - secondPanel.width))).toBeLessThan(1);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('projects makes published work visible before the optional matching form', async ({ page }) => {
  await page.route('**/api/projects', route => route.fulfill({ json: { ok: true, data: [{ title: 'Published Project', description: 'A public personal project.', tech: ['TypeScript'], featured: true, order: 1 }] } }));
  await page.goto('/projects');
  const work = page.getByRole('heading', { name: 'Published Project', exact: true });
  await expect(work).toBeVisible();
  const workBox = await work.boundingBox();
  const matcherBox = await page.getByRole('heading', { name: 'Find a project for your idea', exact: true }).boundingBox();
  if (!workBox || !matcherBox) throw new Error('Project content has no layout');
  expect(workBox.y).toBeLessThan(matcherBox.y + 120);
  expect(workBox.y).toBeLessThan(800);
  await expect(page.getByLabel('What do you need?', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
