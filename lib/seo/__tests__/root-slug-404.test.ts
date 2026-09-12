import { describe, expect, it } from 'vitest';

import {
  APPROVED_SERVICE_SLUGS,
  isApprovedServiceSlug,
} from '@/data/linking/approved-services';
import { CORE_SERVICE_SLUGS } from '@/lib/i18n/config';
import {
  dynamicParams,
  generateStaticParams,
} from '@/app/(marketing)/[slug]/page';

/** Static first-segment routes that must not be claimed by `[slug]`. */
const RESERVED_ROOT_SEGMENTS = [
  'cart',
  'checkout',
  'track-order',
  'services',
  'tools',
  'learn',
  'reviews',
  'contact',
  'faq',
  'about',
  'privacy-policy',
  'refund-policy',
  'terms-and-conditions',
  'cookie-policy',
  'disclaimer',
  'sitemap',
  'unavailable',
  'unsubscribe',
  'admin',
  'author',
  'order-success',
] as const;

describe('root [slug] soft-200 / real-404 routing contract', () => {
  it('keeps dynamicParams=false so unknown params are rejected by the router', () => {
    expect(dynamicParams).toBe(false);
  });

  it('generateStaticParams covers the complete approved service set', () => {
    const params = generateStaticParams().map((entry) => entry.slug).sort();
    const approved = [...APPROVED_SERVICE_SLUGS].sort();
    expect(params).toEqual(approved);
    expect(params).toHaveLength(APPROVED_SERVICE_SLUGS.length);
  });

  it('approved registry matches core service slugs (no missing root services)', () => {
    expect([...APPROVED_SERVICE_SLUGS].sort()).toEqual([...CORE_SERVICE_SLUGS].sort());
  });

  it('keeps required production service slugs approved and statically generated', () => {
    const required = [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-instagram-views',
      'buy-instagram-comments',
      'buy-tiktok-followers',
      'buy-tiktok-likes',
      'buy-tiktok-views',
      'buy-facebook-followers',
      'buy-facebook-page-likes',
      'buy-facebook-post-likes',
    ];
    const generated = new Set<string>(generateStaticParams().map((entry) => entry.slug));
    for (const slug of required) {
      expect(isApprovedServiceSlug(slug)).toBe(true);
      expect(generated.has(slug)).toBe(true);
    }
  });

  it('rejects nonsense and removed/unsupported service slugs from the static set', () => {
    const generated = new Set<string>(generateStaticParams().map((entry) => entry.slug));
    expect(generated.has('this-route-must-not-exist-323bcbd')).toBe(false);
    expect(isApprovedServiceSlug('this-route-must-not-exist-323bcbd')).toBe(false);
    expect(generated.has('buy-youtube-subscribers')).toBe(false);
    expect(isApprovedServiceSlug('buy-youtube-subscribers')).toBe(false);
  });

  it('does not put reserved static roots into generateStaticParams', () => {
    const generated = new Set<string>(generateStaticParams().map((entry) => entry.slug));
    for (const segment of RESERVED_ROOT_SEGMENTS) {
      expect(generated.has(segment)).toBe(false);
      expect(isApprovedServiceSlug(segment)).toBe(false);
    }
  });
});
