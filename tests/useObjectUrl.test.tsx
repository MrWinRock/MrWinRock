import { renderHook } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useObjectUrl } from '../src/hooks/useObjectUrl';
afterEach(() => vi.restoreAllMocks());
it('revokes owned URLs on replacement, clearing and unmount', () => {
  vi.spyOn(URL, 'createObjectURL').mockReturnValueOnce('blob:first').mockReturnValueOnce('blob:second');
  const revoke = vi.spyOn(URL, 'revokeObjectURL');
  const { result, rerender, unmount } = renderHook(({ blob }) => useObjectUrl(blob), { initialProps: { blob: new Blob(['a']) as Blob | null } });
  expect(result.current).toBe('blob:first');
  rerender({ blob: new Blob(['b']) });
  expect(revoke).toHaveBeenCalledWith('blob:first');
  expect(result.current).toBe('blob:second');
  rerender({ blob: null });
  expect(result.current).toBeNull();
  expect(revoke).toHaveBeenCalledWith('blob:second');
  unmount();
  expect(revoke).toHaveBeenCalledTimes(2);
});
