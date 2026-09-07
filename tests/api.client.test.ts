// @vitest-environment node
import { expect, it, vi } from 'vitest';
import type { AxiosAdapter } from 'axios';
import { createApiClient } from '../src/lib/api';
import { deferred } from './helpers/deferred';
import type { ProjectsResponse, SkillsResponse, ExperiencesResponse } from '../src/lib/apiTypes';

it('accepts generated-contract content shapes', async () => {
    const projects: ProjectsResponse = { ok: true, data: [{ title: 'Project', description: '', order: 0, tech: [] }] };
    const skills: SkillsResponse = { ok: true, data: { Languages: { order_flag: 0, skills: [{ name: 'TypeScript', order: 0 }] } } };
    const experiences: ExperiencesResponse = { ok: true, data: [{ title: 'Engineer', company: 'Example', description: '', location: '', startDate: '2026-01', order: 0, tech: [], achievements: [], type: 'Full-time' }] };
    const responses = { '/api/projects': projects, '/api/skills': skills, '/api/experiences': experiences };
    const adapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: responses[config.url as keyof typeof responses] });
    const client = createApiClient({ adapter });
    await expect(client.projects()).resolves.toEqual(projects);
    await expect(client.skills()).resolves.toEqual(skills);
    await expect(client.experiences()).resolves.toEqual(experiences);
});

it.each([
    ['projects', [{ title: 'Broken project', tech: null }]],
    ['experiences', [null]],
    ['skills', { Languages: { order_flag: 0, skills: [null] } }],
] as const)('rejects malformed nested %s content', async (method, data) => {
    const adapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: { ok: true, data } });
    await expect(createApiClient({ adapter })[method]()).rejects.toMatchObject({ code: 'malformed_response' });
});

it('returns settings ETags and accepts an empty 304', async () => {
    const adapter: AxiosAdapter = vi.fn(async config => ({ config, status: 304, statusText: '304', headers: { etag: '"v1"' }, data: '' }));
    const client = createApiClient({ adapter });
    await expect(client.settings({ etag: '"v1"' })).resolves.toEqual({ kind: 'not-modified', etag: '"v1"' });
    expect(vi.mocked(adapter).mock.calls[0][0].headers.get('If-None-Match')).toBe('"v1"');
});

it('deduplicates GETs but submits each POST independently', async () => {
    const pending = deferred<void>();
    const adapter: AxiosAdapter = vi.fn(async config => { await pending.promise; return { config, status: 200, statusText: '200', headers: {}, data: { ok: true, data: [], message: 'accepted' } }; });
    const client = createApiClient({ adapter });
    const requests = [client.projects(), client.projects(), client.contact({ name: 'A', email: 'a@b.co', message: 'hello' }), client.contact({ name: 'A', email: 'a@b.co', message: 'hello' })];
    pending.resolve();
    await Promise.all(requests);
    expect(adapter).toHaveBeenCalledTimes(3);
});

it('rejects a contact success without delivery confirmation and a JSON resume failure', async () => {
    const adapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: { ok: true } });
    await expect(createApiClient({ adapter }).contact({ name: 'A', email: 'a@b.co', message: 'hello' })).rejects.toMatchObject({ code: 'malformed_response' });
    const blobAdapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: new Blob(['{"ok":false,"error":"secret"}'], { type: 'application/json' }) });
    await expect(createApiClient({ adapter: blobAdapter }).resume()).rejects.toMatchObject({ code: 'application_error', message: 'Application error.' });
});

it('rejects invalid route-specific success payloads and HTTP responses from custom adapters safely', async () => {
    const adapter: AxiosAdapter = async config => ({ config, status: 200, statusText: '200', headers: {}, data: { ok: true } });
    await expect(createApiClient({ adapter }).projects()).rejects.toMatchObject({ code: 'malformed_response' });
    const errorAdapter: AxiosAdapter = async config => ({ config, status: 503, statusText: '503', headers: {}, data: { error: 'secret' } });
    await expect(createApiClient({ adapter: errorAdapter }).projects()).rejects.toMatchObject({ status: 503, message: 'Request failed.' });
});
