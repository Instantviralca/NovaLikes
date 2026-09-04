/**
 * Sitemap index architecture tests — child partition integrity.
 */

import { describe, expect, it } from 'vitest';

import { CORE_SERVICE_SLUGS, LOCALIZED_LOCALES } from '@/lib/i18n/config';
import { MARKETS } from '@/lib/market/config';
import {
  assertSitemapPartitionComplete,
  buildSitemapEntries,
  buildSitemapGroups,
  classifySitemapPath,
  findDuplicateSitemapUrls,
  findOrphanSitemapPages,
  getSitemapIndexLocs,
  getSitemapUrl,
  partitionSitemapEntries,
  serializeSitemapIndex,
  serializeUrlSet,
  SITEMAP_GROUP_IDS,
  validateRobotsRules,
  validateSitemapCanonicals,
} from '@/lib/seo/sitemap';

describe('Sitemap index architecture', () => {
  const entries = buildSitemapEntries();
  const groups = buildSitemapGroups(entries);
  const partition = assertSitemapPartitionComplete(entries);
  const buckets = partitionSitemapEntries(entries);

  it('exposes the seven expected child sitemap groups', () => {
    expect(SITEMAP_GROUP_IDS).toEqual([
      'core',
      'services',
      'markets',
      'locales',
      'tools',
      'learn',
      'taxonomy',
    ]);
    expect(groups.map((group) => group.id)).toEqual([...SITEMAP_GROUP_IDS]);
    expect(getSitemapIndexLocs()).toEqual([
      'https://novalikes.com/sitemaps/core.xml',
      'https://novalikes.com/sitemaps/services.xml',
      'https://novalikes.com/sitemaps/markets.xml',
      'https://novalikes.com/sitemaps/locales.xml',
      'https://novalikes.com/sitemaps/tools.xml',
      'https://novalikes.com/sitemaps/learn.xml',
      'https://novalikes.com/sitemaps/taxonomy.xml',
    ]);
  });

  it('keeps the sitemap index loc as the only robots sitemap target', () => {
    expect(getSitemapUrl()).toBe('https://novalikes.com/sitemap.xml');
    expect(validateRobotsRules().sitemapUrl).toBe('https://novalikes.com/sitemap.xml');
    expect(validateRobotsRules().valid).toBe(true);
  });

  it('partitions the full inventory with no missing or cross-group duplicates', () => {
    expect(partition.ok).toBe(true);
    expect(partition.missing).toEqual([]);
    expect(partition.duplicates).toEqual([]);
    expect(partition.sum).toBe(partition.total);
    expect(partition.total).toBe(entries.length);
    expect(findDuplicateSitemapUrls(entries)).toHaveLength(0);
  });

  it('places exactly 44 market URLs in markets.xml and nowhere else', () => {
    expect(buckets.markets).toHaveLength(44);
    for (const market of MARKETS) {
      expect(
        buckets.markets.some((entry) => entry.url === `https://novalikes.com/${market}`),
      ).toBe(true);
      for (const slug of CORE_SERVICE_SLUGS) {
        expect(
          buckets.markets.some(
            (entry) => entry.url === `https://novalikes.com/${market}/${slug}`,
          ),
        ).toBe(true);
      }
    }
    expect(
      [...buckets.core, ...buckets.services, ...buckets.locales, ...buckets.tools, ...buckets.learn, ...buckets.taxonomy].filter(
        (entry) => /novalikes\.com\/(ca|au|us|uk)(\/|$)/.test(entry.url),
      ),
    ).toHaveLength(0);
  });

  it('keeps localized routes only in locales.xml and never creates /en/', () => {
    for (const entry of buckets.locales) {
      const path = new URL(entry.url).pathname;
      expect(LOCALIZED_LOCALES.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`))).toBe(
        true,
      );
    }
    const allUrls = entries.map((entry) => entry.url);
    expect(allUrls.some((url) => url === 'https://novalikes.com/en' || url.startsWith('https://novalikes.com/en/'))).toBe(
      false,
    );
    expect(buckets.locales.length).toBeGreaterThan(0);
  });

  it('keeps default-English services and tools in their own children', () => {
    expect(buckets.services).toHaveLength(CORE_SERVICE_SLUGS.length);
    for (const slug of CORE_SERVICE_SLUGS) {
      expect(buckets.services.some((entry) => entry.url === `https://novalikes.com/${slug}`)).toBe(
        true,
      );
    }
    expect(buckets.tools.every((entry) => {
      const path = new URL(entry.url).pathname;
      return path === '/tools' || path.startsWith('/tools/');
    })).toBe(true);
    expect(buckets.tools.some((entry) => entry.url === 'https://novalikes.com/tools')).toBe(true);
  });

  it('classifies Learn articles vs taxonomy supporting routes correctly', () => {
    expect(buckets.learn.every((entry) => {
      const path = new URL(entry.url).pathname;
      return path.startsWith('/learn/') && !path.startsWith('/learn/tag/') && classifySitemapPath(path) === 'learn';
    })).toBe(true);
    expect(buckets.taxonomy.some((entry) => entry.url === 'https://novalikes.com/learn')).toBe(true);
    expect(buckets.taxonomy.some((entry) => entry.url === 'https://novalikes.com/authors')).toBe(true);
    expect(buckets.taxonomy.some((entry) => entry.url === 'https://novalikes.com/sitemap')).toBe(true);
    expect(buckets.learn.some((entry) => entry.url === 'https://novalikes.com/learn')).toBe(false);
  });

  it('preserves hreflang alternates on partitioned service/market/locale rows', () => {
    const withAlternates = [
      ...buckets.services,
      ...buckets.markets,
      ...buckets.locales,
    ].filter((entry) => entry.alternates?.languages);
    expect(withAlternates.length).toBeGreaterThan(0);
    for (const entry of withAlternates.slice(0, 20)) {
      const languages = entry.alternates!.languages!;
      expect(languages.en).toBeTruthy();
      expect(languages['x-default']).toBeTruthy();
      expect(languages['pt-BR']).toBeTruthy();
    }
  });

  it('serializes a valid sitemap index and child urlset XML', () => {
    const indexXml = serializeSitemapIndex(groups);
    expect(indexXml).toContain('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
    expect(indexXml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    for (const group of groups) {
      expect(indexXml).toContain(`<loc>${group.loc}</loc>`);
    }
    expect(indexXml).not.toContain('/en/');

    const marketsXml = serializeUrlSet(buckets.markets);
    expect(marketsXml).toContain('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
    expect(marketsXml).toContain('<urlset');
    expect(marketsXml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(marketsXml).toContain('hreflang="en-CA"');
    expect(marketsXml).toContain('https://novalikes.com/ca/buy-instagram-followers');
  });

  it('keeps canonical and orphan guarantees on the full inventory', () => {
    expect(validateSitemapCanonicals(entries)).toHaveLength(0);
    expect(findOrphanSitemapPages(entries)).toHaveLength(0);
  });
});
