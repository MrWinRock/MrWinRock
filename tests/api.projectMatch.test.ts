// @vitest-environment node
import { expect, it, vi } from 'vitest';
import type { AxiosAdapter } from 'axios';
import { createApiClient } from '../src/lib/api';
import { deferred } from './helpers/deferred';

const project = { title: 'Public project', description: 'A useful app', order: 0, tech: ['React'] };
const match = { project, score: 0.75, confidence: 0.8 };

it.each(['jev', 'keyword'])('accepts validated %s matching responses and uses an independent POST', async source => {
  const requests: { path: string | undefined; method: string | undefined; data: unknown }[] = [];
  const pending = deferred<void>();
  const adapter: AxiosAdapter = async config => {
    requests.push({ path: config.url, method: config.method, data: JSON.parse(config.data as string) });
    await pending.promise;
    return { config, status: 200, statusText: '200', headers: {}, data: { ok: true, data: { source, matches: [{ ...match, confidence: source === 'keyword' ? null : 0.8 }] } } };
  };
  const client = createApiClient({ adapter });
  const first = client.matchProjects({ query: 'Build a web app' });
  const second = client.matchProjects({ query: 'Build a web app' });
  pending.resolve();
  const result = await first;
  await second;
  expect(result.data.matches[0]).toEqual({ project, score: 0.75, confidence: source === 'keyword' ? null : 0.8 });
  expect(requests).toEqual([{ path: '/api/projects/match', method: 'post', data: { query: 'Build a web app' } }, { path: '/api/projects/match', method: 'post', data: { query: 'Build a web app' } }]);
});

it.each([
  { source: 'unknown', matches: [] },
  { source: 'jev', matches: null },
  { source: 'jev', matches: [match, match, match, match] },
  { source: 'jev', matches: [{ ...match, score: -0.1 }] },
  { source: 'jev', matches: [{ ...match, score: 1.1 }] },
  { source: 'jev', matches: [{ ...match, score: Number.NaN }] },
  { source: 'jev', matches: [{ ...match, confidence: -0.1 }] },
  { source: 'jev', matches: [{ ...match, confidence: 1.1 }] },
  { source: 'jev', matches: [{ ...match, confidence: Number.POSITIVE_INFINITY }] },
  { source: 'jev', matches: [{ project, score: 0.5 }] },
  { source: 'jev', matches: [{ ...match, project: { ...project, tech: null } }] },
  { source: 'jev', matches: [{ ...match, project: { ...project, workType: 'company' } }] },
  { source: 'jev', matches: [{ ...match, project: { ...project, translations: { th: { title: 4 } } } }] },
])('rejects malformed or company matching content: %j', async data => {
  const adapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: { ok: true, data } });
  await expect(createApiClient({ adapter }).matchProjects({ query: 'Build a web app' })).rejects.toMatchObject({ code: 'malformed_response' });
});

it('normalizes matching errors and exposes Retry-After without upstream details', async () => {
  const adapter: AxiosAdapter = async config => ({ config, status: 429, statusText: '429', headers: { 'retry-after': '3' }, data: { message: 'JEV private trace' } });
  const result = await createApiClient({ adapter }).matchProjects({ query: 'Build a web app' }).catch(error => error);
  expect(result).toMatchObject({ status: 429, retryAfterSeconds: 3, message: 'Request failed.' });
  expect(result).not.toHaveProperty('response');
  expect(JSON.stringify(result)).not.toMatch(/JEV private trace/);
});

it('passes cancellation through the matching mutation', async () => {
  const controller = new AbortController();
  controller.abort();
  const adapter: AxiosAdapter = vi.fn();
  await expect(createApiClient({ adapter }).matchProjects({ query: 'Build a web app' }, { signal: controller.signal })).rejects.toMatchObject({ cancelled: true });
  expect(adapter).not.toHaveBeenCalled();
});
