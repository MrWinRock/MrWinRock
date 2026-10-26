import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { expect, it } from 'vitest';

const inlineScript = (path: string) => readFileSync(path, 'utf8').match(/<script type="text\/javascript">([\s\S]*?)<\/script>/)?.[1] ?? '';

function restore(input: string) {
  let result: string | undefined;
  const url = new URL(input);
  runInNewContext(inlineScript('index.html'), { window: { location: url, history: { replaceState: (_state: unknown, _title: string, target: string) => { result = target; } } } });
  return result;
}

it.each(['/projects', '/experience', '/th/projects?tech=React%26Bun#work', '/projects/infoxp?source=portfolio&tech=React#decisions'])('restores GitHub Pages deep link %s', path => {
  let redirect = '';
  const location = Object.assign(new URL('https://mrwinrock.com' + path), { replace: (target: string) => { redirect = target; } });
  runInNewContext(inlineScript('public/404.html'), { window: { location } });
  expect(restore(redirect)).toBe(path);
});

it('preserves legacy p/q redirects', () => {
  expect(restore('https://mrwinrock.com/?p=/experience&q=lang=en#work')).toBe('/experience?lang=en#work');
});

it('leaves ordinary query strings alone', () => {
  expect(restore('https://mrwinrock.com/?tech=React')).toBeUndefined();
});
