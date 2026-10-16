import { expect, it, vi } from 'vitest';
import ScrollToTop from '../src/components/ScrollToTop';
import { renderPublic } from './helpers/renderPublic';

it('does not override a case-study evidence anchor with a scroll to the top', () => {
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  renderPublic(<ScrollToTop />, { route: '/projects/chat#decisions' });
  expect(scroll).not.toHaveBeenCalled();
  scroll.mockRestore();
});
