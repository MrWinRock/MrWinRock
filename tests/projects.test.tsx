import axe from 'axe-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import Projects from '../src/components/pages/projects/Projects';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
import { Route, Routes } from 'react-router-dom';
import ProjectDetail from '../src/components/pages/projects/ProjectDetail';
import type { ApiProject } from '../src/lib/apiTypes';
import i18n from '../src/i18n';
const company: ApiProject & { workType: 'company' } = {
  _id: 'company-one', title: 'Company Portal', slug: 'company-portal', workType: 'company',
  url: 'https://company.example.com', description: 'Internal contribution claim', order: 2, tech: ['PrivateTech'], featured: true,
  repo: 'https://github.com/example/private', caseStudy: { problem: 'Private company problem', role: 'Private role', screenshots: [{ url: 'https://example.com/private.png', alt: 'Private screenshot' }] },
  translations: { th: { title: 'เว็บไซต์บริษัท', description: 'Private translation' } },
};
vi.mock('../src/lib/api', () => ({ api: { projects: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('announces cached fallback and retries without revealing failure details', async () => {
  vi.mocked(api.projects).mockRejectedValue({ status: 503, message: 'provider secret' });
  const { container } = renderPublic(<Projects />);
  expect(await screen.findByText(/cached content/i)).toBeInTheDocument();
  expect(screen.queryByText('provider secret')).toBeNull();
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
  
  await userEvent.setup().click(screen.getByRole('button', { name: /retry/i }));
  expect(api.projects).toHaveBeenCalledTimes(2);
});
it('shows a live empty state', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [] });
  renderPublic(<Projects />);
  expect(await screen.findByText(/no content has been published/i)).toBeInTheDocument();
  expect(screen.queryByText(/cached content/i)).toBeNull();
  expect(screen.queryByText(/company work/i)).toBeNull();
});
it('renders ordered API company links independently of tech filters without private detail', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [company, { ...company, _id: 'company-two', slug: 'public-tool', title: 'Public Tool', url: 'https://tool.example.com', order: 1 }, { title: 'Personal Project', description: 'Personal', tech: ['React'], order: 0 }] });
  const { container } = renderPublic(<Projects />, { route: '/projects?tech=Missing' });
  const link = await screen.findByRole('link', { name: /Company Portal/ });
  expect(link).toHaveAttribute('href', 'https://company.example.com/');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(Array.from(container.querySelectorAll('.company-link a')).map(item => item.textContent)).toEqual(['Public Tool ↗', 'Company Portal ↗']);
  expect(container.querySelectorAll('img')).toHaveLength(0);
  expect(container.querySelector('a[href*="/projects/company-portal"]')).toBeNull();
  expect(container.querySelector('a[href*="github.com/example/private"]')).toBeNull();
  expect(container.textContent).not.toMatch(/Internal contribution|Private company|Private role|PrivateTech/);
});
it('uses the translated company title while keeping the canonical URL', async () => {
  await i18n.changeLanguage('th');
  try {
    vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [company] });
    renderPublic(<Projects />);
    expect(await screen.findByRole('link', { name: /เว็บไซต์บริษัท/ })).toHaveAttribute('href', 'https://company.example.com/');
    expect(screen.queryByText('Private translation')).toBeNull();
  } finally { await i18n.changeLanguage('en'); }
});
it('omits company cards with unsafe public URLs', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [{ ...company, url: 'javascript:alert(1)' }] });
  const { container } = renderPublic(<Projects />);
  await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
  expect(container.querySelector('.company-link')).toBeNull();
});
it('does not retain company links after a live deletion', async () => {
  vi.mocked(api.projects).mockResolvedValueOnce({ ok: true, data: [company] }).mockResolvedValueOnce({ ok: true, data: [] });
  const first = renderPublic(<Projects />);
  await screen.findByRole('link', { name: /Company Portal/ });
  first.unmount();
  renderPublic(<Projects />);
  await screen.findByText(/no content has been published/i);
  expect(screen.queryByRole('link', { name: /Company Portal/ })).toBeNull();
  expect(screen.queryByText(/company work/i)).toBeNull();
});
it.each([403, 503])('does not invent company links when the API returns %s', async status => {
  vi.mocked(api.projects).mockRejectedValue({ status });
  const { container } = renderPublic(<Projects />);
  await screen.findByText(status === 403 ? /currently unavailable/i : /cached content/i);
  expect(container.querySelector('.company-link')).toBeNull();
});
it('does not publish a case study route for a typed company record', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [company] });
  const { container } = renderPublic(<Routes><Route path="/projects/:slug" element={<ProjectDetail />} /></Routes>, { route: '/projects/company-portal' });
  expect(await screen.findByRole('heading', { name: /not found/i })).toBeInTheDocument();
  expect(container.textContent).not.toMatch(/Internal contribution|Private company|Private role/);
  expect(container.querySelector('img')).toBeNull();
});
