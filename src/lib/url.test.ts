import { describe, expect, it } from 'vitest';
import { displayUrl } from './url';

describe('displayUrl', () => {
  it.each([
    ['https://www.linkedin.com/in/rjdilig/', 'linkedin.com/in/rjdilig'],
    ['https://github.com/balbonits', 'github.com/balbonits'],
    [
      'https://games.jdilig.me/games/running-man/index.html',
      'games.jdilig.me/games/running-man',
    ],
    ['http://example.com/', 'example.com'],
  ])('%s → %s', (url, expected) => {
    expect(displayUrl(url)).toBe(expected);
  });
});
