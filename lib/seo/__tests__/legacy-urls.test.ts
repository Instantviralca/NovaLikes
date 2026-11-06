import { describe, expect, it } from 'vitest';

import {
  normalizeLegacyPathname,
  resolveLegacyUrl,
} from '@/lib/seo/legacy-urls';

describe('legacy URL handling', () => {
  const cases: [string, { kind: string; path?: string; status?: number }][] = [
    ['/product/buy-100-tiktok-followers/', { kind: 'redirect', path: '/buy-tiktok-followers', status: 301 }],
    ['/product/buy-25000-instagram-followers', { kind: 'redirect', path: '/buy-instagram-followers', status: 301 }],
    ['/product/buy-100-youtube-subscribers/', { kind: 'gone' }],
    ['/product/buy-1000-twitter-followers/', { kind: 'gone' }],
    ['/product/buy-100-twitter-retweets/', { kind: 'gone' }],
    ['/instagram-services-prices/', { kind: 'redirect', path: '/buy-instagram-followers', status: 301 }],
    ['/youtube-services-prices/', { kind: 'gone' }],
    ['/buy-instagram-followers', { kind: 'pass' }],
    ['/de/instagram-follower-kaufen', { kind: 'pass' }],
  ];

  it.each(cases)('%s → expected decision', (raw, expected) => {
    const norm = normalizeLegacyPathname(raw);
    const d = resolveLegacyUrl(norm);
    if (expected.kind === 'pass') {
      expect(d.kind).toBe('pass');
      return;
    }
    if (expected.kind === 'gone') {
      expect(d.kind).toBe('gone');
      return;
    }
    expect(d.kind).toBe('redirect');
    if (d.kind === 'redirect') {
      expect(d.pathname).toBe(expected.path);
      expect(d.status).toBe(301);
    }
  });
});
