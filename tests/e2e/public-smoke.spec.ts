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

test('settings failure recovers immediately without treating it as disabled', async ({ page }) => {
  let available = false;
  await page.route('**/api/settings', route => route.fulfill(available ? {json:{ok:true,data:settings}} : {status:503,json:{ok:false}}));
  await page.goto('/projects');
  await expect(page.getByRole('alert')).toContainText(/temporarily unavailable/i);
  await expect(page.getByText(/section is currently unavailable/i)).toHaveCount(0);
  available = true;
  await page.getByRole('button',{name:/retry/i}).click();
  await expect(page.getByRole('heading',{name:'My Projects',exact:true})).toBeVisible();
});

test('language survives reload and reduced motion keeps Home content immediately available', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Pharthiwath');
  await expect(page.getByText('Full-Stack Developer',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:/switch language to thai/i}).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang','th');
});

test('short viewport menu supports scrolling and Escape', async ({ page }) => {
  await page.setViewportSize({width:390,height:390});
  await page.goto('/');
  const toggle=page.getByRole('button',{name:/open menu/i}); await toggle.click();
  const resume=page.locator('#mobile-navigation').getByRole('link',{name:'Resume'});
  await resume.scrollIntoViewIfNeeded(); await expect(resume).toBeInViewport();
  await resume.focus(); await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded','false');
});
test('English selected from a Thai URL survives reload and keeps the route', async ({ page }) => {
 await page.goto('/th/projects');
 await expect(page.locator('html')).toHaveAttribute('lang','th');
 await page.getByRole('button',{name:/อังกฤษ|english/i}).click();
 await expect(page).toHaveURL(/\/projects$/);
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page).not.toHaveURL(/\/th\//);
});

test('API company work stays link-only and disappears after deletion or disablement', async ({ page }) => {
 const company = { _id: 'company-one', title: 'Company Portal', slug: 'company-portal', workType: 'company', url: 'https://company.example.com', description: 'Private contribution claim', order: 2, tech: ['PrivateTech'], featured: true, repo: 'https://github.com/example/private', caseStudy: { problem: 'Private problem', screenshots: [{ url: 'https://example.com/private.png', alt: 'Private screenshot' }] }, translations: { th: { title: 'เว็บไซต์บริษัท' } } };
 let records = [company, { ...company, _id: 'company-two', title: 'Public Tool', slug: 'public-tool', url: 'https://tool.example.com', order: 1, translations: { th: { title: 'เครื่องมือสาธารณะ' } } }];
 let status = 200;
 await page.route('**/api/projects', route => route.fulfill({ status, json: status === 200 ? { ok: true, data: records } : { ok: false } }));
 await page.goto('/projects?tech=Missing');
 const links = page.locator('.company-link a');
 await expect(links).toHaveCount(2);
 await expect(links.first()).toHaveText('Public Tool ↗');
 await expect(page.getByRole('link', { name: /Company Portal/ })).toHaveAttribute('href', 'https://company.example.com/');
 await expect(page.locator('.company-link img')).toHaveCount(0);
 await expect(page.getByText(/Private contribution|PrivateTech|Private problem/)).toHaveCount(0);
 await expect(page.locator('a[href="/projects/company-portal"], a[href="https://github.com/example/private"]')).toHaveCount(0);
 await page.getByRole('button', { name: /switch language to thai/i }).click();
 await expect(page.getByRole('link', { name: /เว็บไซต์บริษัท/ })).toHaveAttribute('href', 'https://company.example.com/');
 await page.goto('/projects/company-portal');
 await expect(page.getByRole('heading', { name: /not found|ไม่พบ/ })).toBeVisible();
 await expect(page.getByText(/Private contribution|Private problem/)).toHaveCount(0);
 records = [];
 await page.goto('/projects');
 await expect(page.getByRole('status')).toContainText(/no content|ยังไม่มี/);
 await expect(page.locator('.company-link')).toHaveCount(0);
 records = [company]; status = 403;
 await page.reload();
 await expect(page.getByRole('status')).toContainText(/currently unavailable|ไม่พร้อม/);
 await expect(page.locator('.company-link')).toHaveCount(0);
});

test('project matching preserves browsing, clears edited results and localizes fallback', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const storefront = { ...project, _id: 'store', slug: 'store', title: 'Web Store', description: 'An online storefront', translations: { th: { title: 'ร้านค้าเว็บ', description: 'หน้าร้านออนไลน์' } } };
  const chat = { ...project, _id: 'chat', slug: 'chat', title: 'Chat Tool', description: 'Live conversations', tech: ['Bun'], order: 2, translations: { th: { title: 'ระบบแชต', description: 'การสนทนาแบบเรียลไทม์' } } };
  let source: 'jev' | 'keyword' = 'jev';
  let status = 200;
  const queries: unknown[] = [];
  await page.route('**/api/projects', route => route.fulfill({ json: { ok: true, data: [storefront, chat] } }));
  await page.route('**/api/projects/match', route => {
    queries.push(route.request().postDataJSON());
    return route.fulfill({ status, headers: { 'Retry-After': '2' }, json: status === 200
      ? { ok: true, data: { source, matches: [{ project: chat, score: 1, confidence: source === 'jev' ? 0.9 : null }, { project: storefront, score: 0.5, confidence: source === 'jev' ? 0.6 : null }] } }
      : { ok: false, message: 'Private provider details' } });
  });
  await page.goto('/projects?tech=TypeScript');
  const query = page.getByLabel(/what do you need/i);
  const send = page.getByRole('button', { name: /find relevant projects/i });
  await expect(query).toHaveAccessibleDescription(/sent to an AI service/i);
  await send.click();
  await expect(query).toHaveAttribute('aria-invalid', 'true');
  await expect(query).toBeFocused();
  await query.fill('  I need a live chat application  ');
  expect(queries).toEqual([]);
  await page.evaluate(async () => { await document.fonts.ready; window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); });
  await page.screenshot({ path: info.outputPath(`jev-matcher-${info.project.name}-en.png`), fullPage: true });
  await send.click();
  const results = page.getByRole('region', { name: /^relevant projects$/i });
  await expect(results.getByRole('heading', { level: 3 })).toHaveText(['Chat Tool', 'Web Store']);
  expect(queries).toEqual([{ query: 'I need a live chat application' }]);
  await expect(page.getByLabel(/filter by technology/i)).toHaveValue('TypeScript');
  await query.fill('I now need an online storefront');
  await expect(results).toHaveCount(0);
  status = 429;
  await send.click();
  await expect(page.getByRole('alert')).toContainText(/please wait/i);
  await expect(send).toBeDisabled();
  await expect(query).toHaveValue('I now need an online storefront');
  await expect(page.getByText('Private provider details')).toHaveCount(0);
  await expect(send).toBeEnabled({ timeout: 4000 });
  status = 200; source = 'keyword';
  await page.getByRole('button', { name: /switch language to thai/i }).click();
  await page.getByRole('button', { name: 'ค้นหาโปรเจกต์ที่เกี่ยวข้อง', exact: true }).click();
  await expect(page.getByText(/ค้นหาด้วยคีย์เวิร์ด/)).toBeVisible();
  const thaiResults = page.getByRole('region', { name: 'โปรเจกต์ที่เกี่ยวข้อง', exact: true });
  await expect(thaiResults.getByRole('heading', { level: 3 })).toHaveText(['ระบบแชต', 'ร้านค้าเว็บ']);
  await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(async () => { await document.fonts.ready; window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); });
  await page.screenshot({ path: info.outputPath(`jev-matcher-${info.project.name}-th.png`), fullPage: true });
});
