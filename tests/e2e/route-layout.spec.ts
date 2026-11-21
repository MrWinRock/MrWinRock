import { expect, test, type Page } from '@playwright/test';

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

const showcaseProjects = [
  { title: 'Published Project', description: 'A public personal project.', tech: ['Python'], featured: true, order: 0 },
  { title: 'InfoXP', slug: 'infoxp', description: 'Game knowledge platform.', tech: ['React', 'TypeScript', 'React Native', 'Bun', 'MongoDB'], featured: true, order: 1 },
];

test('the InfoXP lead and identity card are ordered for the viewport', async ({ page }, info) => {
  await page.route('**/api/projects', route => route.fulfill({ json: { ok: true, data: showcaseProjects } }));
  await page.goto('/');
  const lead = page.locator('.selected-work article').first();
  const work = lead.getByRole('heading', { name: 'InfoXP', exact: true });
  const identity = page.locator('.hero-stage:visible');
  await expect(work).toBeInViewport();
  await expect(identity).toHaveCount(1);
  const workBox = await work.boundingBox();
  const identityBox = await identity.boundingBox();
  if (!workBox || !identityBox) throw new Error('Home sections have no layout');
  if (info.project.name === 'desktop') expect(identityBox.y + identityBox.height).toBeLessThan(workBox.y);
  else expect(workBox.y).toBeLessThan(identityBox.y);

  await work.getByRole('link').click();
  await expect(page).toHaveURL(/\/projects\/infoxp$/);
  await expect(page.getByRole('heading', { name: 'InfoXP', level: 1, exact: true })).toBeVisible();
  const catalog = page.locator('.project-detail').getByRole('img', { name: /InfoXP game catalog/i });
  await catalog.scrollIntoViewIfNeeded();
  await expect.poll(() => catalog.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});

test('project filtering animates changed results and respects reduced motion', async ({ page }) => {
  await page.route('**/api/projects', route => route.fulfill({ json: { ok: true, data: showcaseProjects } }));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (...args: Parameters<typeof animate>) {
      if (this.matches('.project-selection .work-list')) document.documentElement.dataset.filterMotion = 'played';
      return animate.apply(this, args);
    };
  });
  await page.goto('/projects');
  const otherProject = page.getByRole('heading', { name: 'Published Project', exact: true });
  await expect(otherProject).toBeVisible();
  const filter = page.getByRole('searchbox', { name: 'Filter by technology' });
  await filter.fill('MongoDB');
  await expect(otherProject).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-filter-motion', 'played');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { delete document.documentElement.dataset.filterMotion; });
  await filter.clear();
  await expect(otherProject).toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-filter-motion');
});

test('skills category deep links scroll after the skill list loads', async ({ page }) => {
  let allowSkills = () => {};
  const skillsReady = new Promise<void>(resolve => { allowSkills = resolve; });
  await page.route('**/api/skills', async route => {
    await skillsReady;
    await route.fulfill({ json: { ok: true, data: {
      programming: { order_flag: 0, skills: Array.from({ length: 60 }, (_, order) => ({ name: 'Tool ' + (order + 1), order })) },
      backend: { order_flag: 1, skills: [{ name: 'Bun', order: 0 }] },
    } } });
  });
  await page.goto('/skills#skills-backend');
  allowSkills();

  const target = page.locator('#skills-backend');
  await expect(target.getByRole('heading')).toBeInViewport();
  await expect(page.locator('.skills-nav a[href$="#skills-backend"]')).toHaveAttribute('aria-current', 'location');
});

async function mockLongSkills(page: Page) {
  const categories = ['programming', 'web', 'backend', 'cloud'];
  const data = Object.fromEntries(categories.map((category, order_flag) => [category, {
    order_flag,
    skills: Array.from({ length: 30 }, (_, order) => ({ name: category + ' tool ' + (order + 1), order })),
  }]));
  await page.route('**/api/skills', route => route.fulfill({ json: { ok: true, data } }));
}

test('skills category clicks use one scroll and preserve fragment history', async ({ page }) => {
  await mockLongSkills(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/skills?source=portfolio');
  const backend = page.locator('.skills-nav a[href$="#skills-backend"]');
  await expect(backend).toBeVisible();
  await page.evaluate(() => {
    let scrollCalls = 0;
    const original = window.scrollTo;
    window.scrollTo = (...args: [options?: ScrollToOptions] | [x: number, y: number]) => {
      document.documentElement.dataset.windowScrollCalls = String(++scrollCalls);
      Reflect.apply(original, window, args);
    };
  });

  await backend.click();
  await expect(page.locator('#skills-backend h2')).toBeInViewport();
  await expect(backend).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('html')).not.toHaveAttribute('data-window-scroll-calls');
  await expect(page).toHaveURL(/\/skills\?source=portfolio#skills-backend$/);

  await page.locator('.skills-nav a[href$="#skills-cloud"]').click();
  await expect(page).toHaveURL(/#skills-cloud$/);
  await page.goBack();
  await expect(page).toHaveURL(/#skills-backend$/);
  await expect(page.locator('#skills-backend h2')).toBeInViewport();
});

test('modified clicks open a skills category in a new tab', async ({ page }) => {
  await mockLongSkills(page);
  await page.goto('/skills');
  const [categoryTab] = await Promise.all([
    page.context().waitForEvent('page', { timeout: 5000 }),
    page.locator('.skills-nav a[href$="#skills-web"]').click({ modifiers: ['ControlOrMeta'] }),
  ]);
  await categoryTab.waitForURL(/\/skills#skills-web$/);
  await expect(page).toHaveURL(/\/skills$/);
  await categoryTab.close();
});

test('the active skills category follows the viewport after a scroll is interrupted', async ({ page }) => {
  await mockLongSkills(page);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/skills');
  const backend = page.locator('.skills-nav a[href$="#skills-backend"]');
  await expect(backend).toBeVisible();
  const start = await page.evaluate(() => scrollY);
  await backend.click();
  await expect(page).toHaveURL(/#skills-backend$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(start + 25);
  await page.evaluate(() => {
    window.dispatchEvent(new WheelEvent('wheel'));
    document.getElementById('skills-cloud')?.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
  await expect(page.locator('.skills-nav a[href$="#skills-cloud"]')).toHaveAttribute('aria-current', 'location');
});
