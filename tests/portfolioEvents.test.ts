import { afterEach, expect, it, vi } from 'vitest';
vi.mock('../src/config/analytics', () => ({ TRACKING_ENABLED: true }));
import { trackPortfolioEvent } from '../src/lib/portfolioEvents';
afterEach(() => { delete window.gtag; });
it('tracks only intent names and sanitized project slugs without personal input', () => {
 window.gtag = vi.fn();
 trackPortfolioEvent('project_open', 'infoxp');
 expect(window.gtag).toHaveBeenCalledWith('event', 'project_open', {project_slug:'infoxp'});
 trackPortfolioEvent('contact_intent');
 expect(window.gtag).toHaveBeenLastCalledWith('event','contact_intent',{});
 trackPortfolioEvent('project_open','email@example.com');
 expect(window.gtag).toHaveBeenLastCalledWith('event','project_open',{});
});
it('works when analytics is absent', () => { expect(() => trackPortfolioEvent('resume_download')).not.toThrow(); });
