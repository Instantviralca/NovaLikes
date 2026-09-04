/**
 * Sitemap & Robots Finalization tests — Document 14.08.
 */

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import {
  SKIPPED_SERVICE_ROUTE_EXAMPLES,
  SITEMAP_PRODUCTION_ROUTES,
} from '@/data/seo/sitemap-routes';
import {
  buildSitemapEntries,
  findDuplicateSitemapUrls,
  findMissingSitemapEntries,
  findNoindexSitemapEntries,
  findOrphanSitemapPages,
  findSkippedRoutesInSitemap,
  getIndexableRoutes,
  getSitemapUrl,
  validateLastModified,
  validateRobotsRules,
  validateSitemapCanonicals,
  validateSitemapUrl,
  ROBOTS_DISALLOW,
} from '@/lib/seo/sitemap';
import { getRobotsRules } from '@/seo/robots';

describe('Sitemap & Robots Finalization', () => {
  const entries = buildSitemapEntries();
  const urls = entries.map((entry) => entry.url);

  it('uses the production hostname only', () => {
    expect(urls.every((url) => url.startsWith('https://novalikes.com'))).toBe(
      true,
    );
    expect(validateSitemapUrl('https://novalikes.com/').valid).toBe(true); // homepage trailing slash allowed
    expect(validateSitemapUrl('https://localhost/').valid).toBe(false);
    expect(
      validateSitemapUrl('https://novalikes-next.vercel.app/').valid,
    ).toBe(false);
    expect(validateSitemapUrl('https://preview.novalikes.com/').valid).toBe(
      false,
    );
  });

  it('includes the homepage and all approved service pages', () => {
    expect(urls).toContain('https://novalikes.com');
    for (const slug of APPROVED_SERVICE_SLUGS) {
      expect(urls).toContain(`https://novalikes.com/${slug}`);
    }
  });

  it('excludes skipped / unpublished services', () => {
    expect(findSkippedRoutesInSitemap(entries)).toHaveLength(0);
    for (const route of SKIPPED_SERVICE_ROUTE_EXAMPLES) {
      expect(urls).not.toContain(`https://novalikes.com${route}`);
    }
  });

  it('excludes noindex and non-production pages', () => {
    expect(findNoindexSitemapEntries(entries)).toHaveLength(0);
    expect(urls).not.toContain('https://novalikes.com/track-order');
    expect(urls).not.toContain('https://novalikes.com/cart');
    expect(urls).not.toContain('https://novalikes.com/checkout');
    expect(urls).not.toContain('https://novalikes.com/order-success');
    expect(urls).not.toContain('https://novalikes.com/admin');
  });

  it('has no duplicate URLs', () => {
    expect(findDuplicateSitemapUrls(entries)).toHaveLength(0);
  });

  it('has no orphan pages relative to the production allowlist', () => {
    expect(findOrphanSitemapPages(entries)).toHaveLength(0);
  });

  it('matches canonical URLs exactly', () => {
    expect(validateSitemapCanonicals(entries)).toHaveLength(0);
  });

  it('rejects invalid trailing-slash variants', () => {
    expect(validateSitemapUrl('https://novalikes.com/faq/').valid).toBe(false);
    expect(validateSitemapUrl('https://novalikes.com/').valid).toBe(true);
    expect(
      validateSitemapUrl('https://novalikes.com/ar/buy-instagram-followers').valid,
    ).toBe(true);
    expect(validateSitemapUrl('https://novalikes.com/FAQ').valid).toBe(false);
  });

  it('uses registry lastModified values (not build-time spam)', () => {
    expect(validateLastModified(entries)).toHaveLength(0);
    // Learn public dates must be truthful; safety layer may still omit a stamp
    // if a future date slips through. Every present lastModified is validated above.
    const stamped = entries.filter((entry) => entry.lastModified);
    expect(stamped.length).toBeGreaterThan(0);
    const now = Date.now();
    for (const entry of stamped) {
      const value =
        entry.lastModified instanceof Date
          ? entry.lastModified
          : new Date(entry.lastModified as string | number | Date);
      expect(value.getTime()).toBeLessThanOrEqual(now + 24 * 60 * 60 * 1000);
    }
  });

  it('includes every approved production route plus published Learn articles', () => {
    expect(findMissingSitemapEntries(entries)).toHaveLength(0);
    const indexable = getIndexableRoutes();
    expect(indexable.length).toBeGreaterThanOrEqual(SITEMAP_PRODUCTION_ROUTES.length);
    expect(entries.length).toBe(indexable.length + 72 + 54 + 18 + 30 + 44);
    // Truly retired legacy Learn slugs must not reappear (category hubs may still exist).
    // how-to-grow-instagram-followers-organically is intentionally published again.
    for (const route of [
      '/learn/instagram-algorithm-explained',
      '/learn/how-to-get-more-instagram-followers-without-ads',
    ]) {
      expect(indexable.some((r) => r.route === route)).toBe(false);
    }
    expect(indexable.some((r) => r.route === '/learn/how-to-grow-instagram-followers-organically')).toBe(
      true,
    );
    expect(indexable.some((r) => r.route.startsWith('/learn/') && r.route.endsWith('-canada'))).toBe(
      false,
    );
  });

  it('does not index locale-prefixed Learn URLs', () => {
    const localizedLearn = urls.filter((url) =>
      /https:\/\/novalikes\.com\/(es|de|fr|it|pt-br|ar)\/learn(?:\/|$)/.test(url),
    );
    expect(localizedLearn).toEqual([]);
    expect(urls).toContain('https://novalikes.com/learn');
  });

  it('configures robots with correct sitemap and disallow rules', () => {
    const report = validateRobotsRules();
    expect(report.valid).toBe(true);
    expect(getSitemapUrl()).toBe('https://novalikes.com/sitemap.xml');
    expect(report.sitemapUrl).toBe('https://novalikes.com/sitemap.xml');

    const rules = getRobotsRules()[0]!;
    for (const path of ROBOTS_DISALLOW) {
      expect(rules.disallow).toContain(path);
    }
  });
});
