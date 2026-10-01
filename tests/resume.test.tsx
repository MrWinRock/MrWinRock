import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import Resume from '../src/components/pages/resume/Resume';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
vi.mock('../src/lib/api', () => ({ api: { resume: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
it('retries failure and owns the successful PDF URL', async () => {
  vi.mocked(api.resume).mockRejectedValueOnce({ status: 503 }).mockResolvedValueOnce(new Blob(['pdf'], { type: 'application/pdf' }));
  const { unmount } = renderPublic(<Resume />);
  fireEvent.click(await screen.findByRole('button', { name: /retry/i }));
  const download = await screen.findByRole('link', { name: /download/i });
  expect(download.getAttribute('href')).toMatch(/^blob:/);
  const revoke = vi.spyOn(URL, 'revokeObjectURL');
  unmount();
  expect(revoke).toHaveBeenCalledWith(download.getAttribute('href'));
});
it('aborts on unmount and never creates a URL for late completion', async () => {
  let finish!: (blob: Blob) => void;
  vi.mocked(api.resume).mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  const create = vi.spyOn(URL, 'createObjectURL');
  const { unmount } = renderPublic(<Resume />);
  await waitFor(() => expect(api.resume).toHaveBeenCalledTimes(1));
  unmount();
  expect(vi.mocked(api.resume).mock.calls[0][0]?.signal?.aborted).toBe(true);
  await act(async () => finish(new Blob(['late'])));
  expect(create).not.toHaveBeenCalled();
});
