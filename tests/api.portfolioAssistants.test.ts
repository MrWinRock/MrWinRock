// @vitest-environment node
import { expect, it } from 'vitest';
import type { AxiosAdapter } from 'axios';
import { createApiClient } from '../src/lib/api';

const project = { title: 'Chat', description: 'Live chat', order: 0, tech: ['Bun'] };
const response = (data: unknown): AxiosAdapter => async config => ({ config, status: 200, statusText: '200', headers: {}, data: { ok: true, data } });

it.each([
  [{ field: 'invented' }], [{ field: 'tech', index: -1 }], [{ field: 'tech', index: 1 }],
  [{ field: 'description', index: 0 }], [{ field: 'role' }], [{ field: 'outcomes', index: 0 }], 'private explanation',
])('rejects malformed or nonexistent match evidence %j', async evidence => {
  const client = createApiClient({ adapter: response({ source: 'jev', matches: [{ project, score: 1, confidence: 0.9, evidence }] }) });
  await expect(client.matchProjects({ query: 'Need a live chat app' })).rejects.toMatchObject({ code: 'malformed_response' });
});

it('accepts valid match references and a typed brief review', async () => {
  const client = createApiClient({ adapter: async config => response(config.url?.endsWith('/brief')
    ? { source: 'jev', category: 'api-integration', checks: { audience: 'missing', scope: 'present', deadline: 'uncertain' } }
    : { source: 'jev', matches: [{ project, score: 1, confidence: 0.9, evidence: [{ field: 'tech', index: 0 }] }] })(config) });
  expect((await client.matchProjects({ query: 'Need a live chat app' })).data.matches[0].evidence).toEqual([{ field: 'tech', index: 0 }]);
  expect((await client.reviewContactBrief({ message: 'Need an API for bookings' })).data.checks.audience).toBe('missing');
});

it.each([
  { source: 'jev', category: 'invented', checks: { audience: 'missing', scope: 'present', deadline: 'uncertain' } },
  { source: 'jev', category: null, checks: { audience: 'missing', scope: 'present', deadline: 0.5 } },
  { source: 'unavailable', category: 'website', checks: { audience: 'missing', scope: 'present', deadline: 'uncertain' } },
])('rejects unsafe brief review data', async data => {
  await expect(createApiClient({ adapter: response(data) }).reviewContactBrief({ message: 'Need a useful website' })).rejects.toMatchObject({ code: 'malformed_response' });
});
