import axe from 'axe-core';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Projects from '../src/components/pages/projects/Projects';
import { api } from '../src/lib/api';
import type { ApiProject, ProjectMatchResponse } from '../src/lib/apiTypes';
import i18n from '../src/i18n';
import { renderPublic } from './helpers/renderPublic';
import { deferred } from './helpers/deferred';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProjectDetail from '../src/components/pages/projects/ProjectDetail';

const web: ApiProject = { _id: 'web', slug: 'web', title: 'Web Store', description: 'Public storefront', order: 0, tech: ['React'], translations: { th: { title: 'ร้านค้าเว็บ', description: 'หน้าร้านออนไลน์' } } };
const chat: ApiProject = { _id: 'chat', slug: 'chat', title: 'Chat Tool', description: 'Live conversations', order: 1, tech: ['Bun'] };
const matches: ProjectMatchResponse = { ok: true, data: { source: 'jev', matches: [{ project: chat, score: 1, confidence: 0.9 }, { project: web, score: 0.5, confidence: 0.6 }] } };
vi.mock('../src/lib/api', () => ({ api: { projects: vi.fn(), matchProjects: vi.fn() } }));
beforeEach(async () => {
  vi.resetAllMocks();
  await i18n.changeLanguage('en');
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [web, chat] });
});
afterEach(async () => { vi.useRealTimers(); await i18n.changeLanguage('en'); });

function submit(query = 'I need a live chat application') {
  fireEvent.change(screen.getByLabelText(/what do you need/i), { target: { value: query } });
  fireEvent.click(screen.getByRole('button', { name: /find relevant projects/i }));
}

it('submits only explicitly, trims the query, and renders API ranking independently of the technology filter', async () => {
  vi.mocked(api.matchProjects).mockResolvedValue(matches);
  renderPublic(<Projects />, { route: '/projects?tech=React' });
  const input = screen.getByLabelText(/what do you need/i);
  fireEvent.change(input, { target: { value: '  I need a live chat application  ' } });
  expect(api.matchProjects).not.toHaveBeenCalled();
  expect(input).toHaveAccessibleDescription(/sent to an AI service/i);
  fireEvent.click(screen.getByRole('button', { name: /find relevant projects/i }));
  const results = await screen.findByRole('region', { name: /relevant projects/i });
  expect(within(results).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Chat Tool', 'Web Store']);
  expect(api.matchProjects).toHaveBeenCalledWith({ query: 'I need a live chat application' }, { signal: expect.any(AbortSignal) });
  expect(screen.getByLabelText(/filter by technology/i)).toHaveValue('React');
  expect(screen.getByRole('heading', { name: /more projects/i })).toBeInTheDocument();
});

it.each(['short', ' '.repeat(10), 'x'.repeat(1001)])('focuses and describes invalid input without sending', query => {
  renderPublic(<Projects />);
  submit(query);
  const input = screen.getByLabelText(/what do you need/i);
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAccessibleDescription(/10.*1000/);
  expect(input).toHaveFocus();
  expect(api.matchProjects).not.toHaveBeenCalled();
});

it.each([10, 1000])('accepts the trimmed length boundary %s', async length => {
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'keyword', matches: [] } });
  renderPublic(<Projects />);
  submit(`  ${'x'.repeat(length)}  `);
  expect(await screen.findByText(/no relevant projects/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/what do you need/i)).toHaveAttribute('aria-invalid', 'false');
});

it('clearly labels keyword fallback and announces empty results', async () => {
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'keyword', matches: [] } });
  renderPublic(<Projects />); submit();
  expect(await screen.findByText(/keyword matching/i)).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/no relevant projects/i);
});

it.each([400, 403, 429, 500, 503, 0])('retains input and displays a safe localized failure for HTTP %s', async status => {
  vi.mocked(api.matchProjects).mockRejectedValue({ status, message: 'JEV_API_KEY provider secret', details: { fieldErrors: { query: ['private upstream detail'] } }, retryAfterSeconds: 2 });
  renderPublic(<Projects />); submit();
  const alert = await screen.findByRole('alert');
  await waitFor(() => expect(alert).toHaveTextContent(status === 400 ? /10.*1000/ : status === 429 ? /wait.*2 seconds/i : /unavailable.*try again/i));
  expect(screen.getByLabelText(/what do you need/i)).toHaveValue('I need a live chat application');
  expect(document.body.textContent).not.toMatch(/provider secret|JEV_API_KEY|private upstream detail/);
});

it('honors Retry-After even when the query changes and enables submission after expiry', async () => {
  vi.useFakeTimers();
  vi.mocked(api.matchProjects).mockRejectedValue({ status: 429, retryAfterSeconds: 2 });
  renderPublic(<Projects />);
  await act(async () => submit());
  const button = screen.getByRole('button', { name: /find relevant projects/i });
  expect(button).toBeDisabled();
  fireEvent.change(screen.getByLabelText(/what do you need/i), { target: { value: 'Now I need a storefront' } });
  expect(button).toBeDisabled();
  await act(async () => vi.advanceTimersByTime(2000));
  expect(button).toBeEnabled();
});

it('announces loading, prevents duplicate submission and aborts on unmount', async () => {
  const pending = deferred<ProjectMatchResponse>();
  vi.mocked(api.matchProjects).mockReturnValue(pending.promise);
  const { unmount } = renderPublic(<Projects />); submit();
  const button = screen.getByRole('button', { name: /finding projects/i });
  expect(button).toBeDisabled();
  expect(within(screen.getByRole('region', { name: /find a project for your idea/i })).getByRole('status')).toHaveTextContent(/finding projects/i);
  fireEvent.click(button);
  expect(api.matchProjects).toHaveBeenCalledTimes(1);
  const signal = vi.mocked(api.matchProjects).mock.calls[0][1]?.signal;
  expect(signal?.aborted).toBe(false);
  unmount();
  expect(signal?.aborted).toBe(true);
});

it('clears completed results immediately when the query is edited', async () => {
  vi.mocked(api.matchProjects).mockResolvedValue(matches);
  renderPublic(<Projects />); submit();
  await screen.findByRole('region', { name: /relevant projects/i });
  fireEvent.change(screen.getByLabelText(/what do you need/i), { target: { value: 'I now need a storefront' } });
  expect(screen.queryByRole('region', { name: /relevant projects/i })).toBeNull();
});

it('aborts edited queries and ignores old completions after a new submission', async () => {
  const old = deferred<ProjectMatchResponse>();
  const next = deferred<ProjectMatchResponse>();
  vi.mocked(api.matchProjects).mockReturnValueOnce(old.promise).mockReturnValueOnce(next.promise);
  renderPublic(<Projects />); submit();
  const signal = vi.mocked(api.matchProjects).mock.calls[0][1]?.signal;
  submit('I now need a storefront');
  expect(signal?.aborted).toBe(true);
  await act(async () => next.resolve({ ok: true, data: { source: 'keyword', matches: [{ project: web, score: 0.5, confidence: null }] } }));
  await act(async () => old.resolve(matches));
  const results = screen.getByRole('region', { name: /relevant projects/i });
  expect(within(results).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Web Store']);
  expect(screen.getByText(/keyword matching/i)).toBeInTheDocument();
});

it('does not present intentional cancellation as a failure', async () => {
  vi.mocked(api.matchProjects).mockRejectedValue({ cancelled: true });
  renderPublic(<Projects />); submit();
  await screen.findByRole('button', { name: /find relevant projects/i });
  expect(screen.queryByRole('alert')).toBeNull();
});

it('hides matching when the Projects resource is disabled', async () => {
  vi.mocked(api.projects).mockRejectedValue({ status: 403 });
  renderPublic(<Projects />);
  await screen.findByText(/currently unavailable/i);
  expect(screen.queryByRole('button', { name: /find relevant projects/i })).toBeNull();
});

it('keeps the resource empty announcement unambiguous before a search', async () => {
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [] });
  renderPublic(<Projects />);
  await screen.findByText(/no content has been published/i);
  expect(screen.getByRole('status')).toHaveTextContent(/no content has been published/i);
});

it('localizes the form, privacy copy, fallback and project cards in Thai', async () => {
  await i18n.changeLanguage('th');
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'keyword', matches: [{ project: web, score: 0.5, confidence: null }] } });
  renderPublic(<Projects />);
  const input = screen.getByLabelText('คุณกำลังมองหาอะไร');
  expect(input).toHaveAccessibleDescription(/บริการ AI/);
  fireEvent.change(input, { target: { value: 'ต้องการระบบร้านค้าออนไลน์' } });
  fireEvent.click(screen.getByRole('button', { name: 'ค้นหาโปรเจกต์ที่เกี่ยวข้อง' }));
  const results = await screen.findByRole('region', { name: 'โปรเจกต์ที่เกี่ยวข้อง' });
  expect(within(results).getByRole('heading', { name: 'ร้านค้าเว็บ' })).toBeInTheDocument();
  expect(within(results).getByText('หน้าร้านออนไลน์')).toBeInTheDocument();
  expect(screen.getByText(/ค้นหาด้วยคีย์เวิร์ด/)).toBeInTheDocument();
});

it('keeps the matching form and result cards accessible', async () => {
  vi.mocked(api.matchProjects).mockResolvedValue(matches);
  const { container } = renderPublic(<Projects />); submit();
  await screen.findByRole('region', { name: /relevant projects/i });
  expect((await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })).violations).toEqual([]);
});

it.each([
  ['InfoXP', 'InfoXP Backend'],
  ['InfoXP', 'InfoXP Mobile'],
  ['ChadChat', 'ChadChat Backend'],
  ['Stringy', 'Stringy Backend'],
])('opens the canonical %s case study from a matched %s companion', async (parentTitle, childTitle) => {
  const parent = { ...web, _id: 'parent', slug: 'parent', title: parentTitle, description: 'Canonical public case study', repo: 'https://github.com/example/parent' };
  const child = { ...chat, _id: 'child', slug: 'child', title: childTitle, tech: ['CompanionTech'], repo: 'https://github.com/example/child' };
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [parent, child] });
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'jev', matches: [{ project: child, score: 1, confidence: 0.9 }] } });
  renderPublic(<Routes><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} /></Routes>, { route: '/projects' });
  await screen.findByRole('heading', { name: parentTitle, exact: true });
  submit('I need the companion technology');
  const results = await screen.findByRole('region', { name: /relevant projects/i });
  await userEvent.setup().click(within(results).getByRole('link', { name: /explore project/i }));
  expect(await screen.findByRole('heading', { level: 1, name: parentTitle, exact: true })).toBeInTheDocument();
  expect(screen.getByText('Canonical public case study')).toBeInTheDocument();
  expect(screen.getByText('CompanionTech')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: new RegExp(childTitle) })).toHaveAttribute('href', 'https://github.com/example/child');
  expect(screen.queryByRole('heading', { name: /project not found/i })).toBeNull();
});

it('opens a standalone matched companion when its parent is absent', async () => {
  const child = { ...chat, _id: 'child', slug: 'child', title: 'InfoXP Backend' };
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [child] });
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'keyword', matches: [{ project: child, score: 0.5, confidence: null }] } });
  renderPublic(<Routes><Route path="/projects" element={<Projects />} /><Route path="/projects/:slug" element={<ProjectDetail />} /></Routes>, { route: '/projects' });
  submit('I need a standalone backend');
  const results = await screen.findByRole('region', { name: /relevant projects/i });
  await userEvent.setup().click(within(results).getByRole('link', { name: /explore project/i }));
  expect(await screen.findByRole('heading', { level: 1, name: 'InfoXP Backend', exact: true })).toBeInTheDocument();
});

it('deduplicates canonical parents at their first match rank while merging public evidence', async () => {
  const parent: ApiProject = { ...web, _id: 'parent', slug: 'parent', title: 'InfoXP', caseStudy: { problem: 'Authored problem', repositories: [{ label: 'Authored evidence', url: 'https://github.com/example/authored' }] } };
  const child = { ...chat, _id: 'child', slug: 'child', title: 'InfoXP Backend', repo: 'https://github.com/example/child' };
  const privateChild: ApiProject = { ...chat, _id: 'private', slug: 'private', title: 'InfoXP Mobile', workType: 'company', tech: ['PrivateTech'], repo: 'https://github.com/example/private' };
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [web, parent, child, privateChild] });
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'jev', matches: [{ project: child, score: 1, confidence: 0.9 }, { project: web, score: 0.75, confidence: 0.8 }, { project: parent, score: 0.5, confidence: 0.7 }] } });
  renderPublic(<Projects />); submit();
  const results = await screen.findByRole('region', { name: /relevant projects/i });
  expect(within(results).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['InfoXP', 'Web Store']);
  expect(within(results).getByText('Bun')).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/found 2 relevant projects/i);
  expect(results.textContent).not.toMatch(/PrivateTech|InfoXP Mobile/);
  expect(results.querySelector('a[href*="example/private"]')).toBeNull();
});

it('announces one displayed project when two matched companions share a canonical parent', async () => {
  const parent = { ...web, _id: 'parent', slug: 'parent', title: 'InfoXP' };
  const backend = { ...chat, _id: 'backend', slug: 'backend', title: 'InfoXP Backend' };
  const mobile = { ...chat, _id: 'mobile', slug: 'mobile', title: 'InfoXP Mobile' };
  vi.mocked(api.projects).mockResolvedValue({ ok: true, data: [parent, backend, mobile] });
  vi.mocked(api.matchProjects).mockResolvedValue({ ok: true, data: { source: 'jev', matches: [{ project: backend, score: 1, confidence: 0.9 }, { project: mobile, score: 0.75, confidence: 0.8 }] } });
  renderPublic(<Projects />); submit();
  const results = await screen.findByRole('region', { name: /relevant projects/i });
  expect(within(results).getAllByRole('heading', { level: 3 })).toHaveLength(1);
  expect(screen.getByRole('status')).toHaveTextContent('Found 1 relevant project.');
  expect(within(results).getByText('1', { selector: '.collection-count' })).toBeInTheDocument();
});
