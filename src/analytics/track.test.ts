import { describe, expect, it, vi } from 'vitest';

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(() => {
    throw new Error('blocked');
  }),
}));

import { eventsForClick, trackEvent } from '@/analytics/track';

describe('click tracking', () => {
  it('never throws, even when analytics does', () => {
    expect(() => trackEvent('resume_download')).not.toThrow();
  });

  it.each([
    [{ href: '/Reuel_John_Dilig_Resume.pdf' }, '/', [['resume_download', undefined]]],
    [{ href: 'https://github.com/balbonits' }, '/', [['outbound_click', { target: 'github' }]]],
    [{ href: 'mailto:a@b.c' }, '/', [['outbound_click', { target: 'email' }]]],
    [
      { href: 'https://www.linkedin.com/in/x/' },
      '/contact',
      [
        ['outbound_click', { target: 'linkedin' }],
        ['contact_action', { method: 'linkedin' }],
      ],
    ],
    [{ href: 'tel:+19095550100' }, '/contact', [['contact_action', { method: 'phone' }]]],
    [{ project: 'squanto' }, '/', [['project_click', { slug: 'squanto' }]]],
    [{ href: '#work', cta: 'see-the-work' }, '/', [['cta_click', { id: 'see-the-work' }]]],
    [{ href: '/projects' }, '/', []],
  ])('%o on %s', (info, path, expected) => {
    expect(eventsForClick(info, path)).toEqual(expected);
  });
});
