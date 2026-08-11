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
    expect(validateSitemapUrl('https://novalikes.com/').valid).toBe(false);
    expect(validateSitemapUrl('https://localhost/').valid).toBe(false);
    expect(
      validateSitemapUrl('https://novalikes-next.vercel.app/').valid,
    ).toBe(false);
    expect(validateSitemapUrl('https://preview.novalikes.com/').valid).toBe(
      false,
    );
  });

  it('includes the homepage and all 12 approved service pages', () => {
    expect(urls).toContain('https://novalikes.com');
    for (const slug of APPROVED_SERVICE_SLUGS) {
      expect(urls).toContain(`https://novalikes.com/${slug}`);
    }
    expect(
      urls.filter((url) => {
        try {
          const path = new URL(url).pathname;
          return path.startsWith('/buy-') && !path.startsWith('/learn/');
        } catch {
          return false;
        }
      }).length,
    ).toBe(12);
  });

  it('includes company, support, and legal routes', () => {
    for (const route of [
      '/about',
      '/contact',
      '/faq',
      '/track-order',
      '/privacy-policy',
      '/terms-and-conditions',
      '/refund-policy',
      '/cookie-policy',
      '/disclaimer',
    ]) {
      expect(urls).toContain(
        route === '/' ? 'https://novalikes.com' : `https://novalikes.com${route}`,
      );
    }
  });

  it('excludes skipped services and private/transactional routes', () => {
    for (const route of SKIPPED_SERVICE_ROUTE_EXAMPLES) {
      expect(urls.some((url) => url.endsWith(route))).toBe(false);
    }
    for (const route of [
      '/cart',
      '/checkout',
      '/order-success',
      '/admin',
      '/api/orders',
      '/search',
      '/preview/test',
      '/draft/test',
      '/track-order/result',
    ]) {
      expect(urls.some((url) => url.includes(route))).toBe(false);
    }
    // Learn hub and reviews are indexable production routes.
    expect(urls).toContain('https://novalikes.com/learn');
    expect(urls).toContain('https://novalikes.com/reviews');
    expect(findSkippedRoutesInSitemap(entries)).toHaveLength(0);
    expect(findNoindexSitemapEntries(entries)).toHaveLength(0);
  });

  it('includes published Learn articles when Learn sitemap is enabled', () => {
    expect(urls).toContain(
      'https://novalikes.com/learn/how-to-grow-instagram-followers-organically',
    );
    expect(urls).toContain('https://novalikes.com/learn/instagram-algorithm-explained');
    expect(urls).toContain(
      'https://novalikes.com/learn/how-to-get-more-instagram-followers-without-ads',
    );
    expect(urls.some((url) => url.includes('/learn/buy-instagram-followers-global'))).toBe(false);
  });

  it('has no duplicate sitemap URLs', () => {
    expect(findDuplicateSitemapUrls(entries)).toHaveLength(0);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('matches canonical URLs exactly', () => {
    expect(validateSitemapCanonicals(entries)).toHaveLength(0);
  });

  it('rejects invalid trailing-slash variants', () => {
    expect(validateSitemapUrl('https://novalikes.com/faq/').valid).toBe(false);
    expect(validateSitemapUrl('https://novalikes.com/').valid).toBe(true);
  });

  it('uses registry lastModified values (not build-time spam)', () => {
    expect(validateLastModified(entries)).toHaveLength(0);
    expect(entries.every((entry) => entry.lastModified)).toBe(true);
  });

  it('includes every approved production route plus published Learn articles', () => {
    expect(findMissingSitemapEntries(entries)).toHaveLength(0);
    const indexable = getIndexableRoutes();
    expect(indexable.length).toBeGreaterThanOrEqual(SITEMAP_PRODUCTION_ROUTES.length);
    expect(entries.length).toBe(indexable.length);
    expect(
      indexable.some((r) => r.route === '/learn/how-to-grow-instagram-followers-organically'),
    ).toBe(true);
    expect(indexable.some((r) => r.route === '/learn/instagram-algorithm-explained')).toBe(true);
    expect(
      indexable.some(
        (r) => r.route === '/learn/how-to-get-more-instagram-followers-without-ads',
      ),
    ).toBe(true);
    expect(indexable.some((r) => r.route.startsWith('/learn/') && r.route.endsWith('-canada'))).toBe(
      false,
    );
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
    expect(rules.allow).toContain('/');
    expect(rules.disallow.some((rule) => rule.includes('/_next'))).toBe(false);
    expect(rules.disallow.some((rule) => rule.includes('/assets'))).toBe(false);
  });

  it('reports orphan sitemap pages without failing the allowlist', () => {
    const orphans = findOrphanSitemapPages(entries);
    expect(Array.isArray(orphans)).toBe(true);
    // With global chrome links from home, orphans should be empty
    expect(orphans).toHaveLength(0);
  });
});
