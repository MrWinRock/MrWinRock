import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

// jsdom does not implement layout observation or object URLs.
class ResizeObserverShim {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverShim);
let objectUrlId = 0;
if (!URL.createObjectURL) {
  URL.createObjectURL = () => `blob:http://localhost/test-${++objectUrlId}`;
}
if (!URL.revokeObjectURL) URL.revokeObjectURL = () => {};
