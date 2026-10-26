import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/**', route => route.fulfill({ status: 503, json: { ok: false } }));
  await page.route('**/api/settings', route => route.fulfill({ json: { ok: true, data: { showAbout: true, showSkills: true, showProjects: true, showExperience: true, showResume: true, showContact: true } } }));
});

test('experience keeps dates beside a readable body on desktop and above it on mobile', async ({ page }, info) => {
  await page.route('**/api/experiences', route => route.fulfill({ json: { ok: true, data: [{ title: 'Software Developer', company: 'Example Company', location: 'Bangkok, Thailand', type: 'Contract', startDate: '2026-04', description: 'A published description with enough detail to check the reading column.', achievements: ['A published outcome.'], tech: ['React', 'TypeScript'], order: 1 }] } }));
  await page.goto('/experience');
  const title = page.getByRole('heading', { name: 'Software Developer', exact: true });
  await expect(title).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const date = await page.getByText(/Apr 2026/).boundingBox();
  const body = await title.boundingBox();
  if (!date || !body) throw new Error('Experience content has no layout');
  if (info.project.name === 'desktop') {
    expect(date.x).toBeLessThan(body.x);
    expect(Math.abs(date.y - body.y)).toBeLessThan(45);
    expect(body.width).toBeGreaterThan(500);
  } else {
    expect(date.y).toBeLessThan(body.y);
    expect(body.width).toBeGreaterThan(300);
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
