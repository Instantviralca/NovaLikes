/**
 * Sitemap XML presentation — Content-Type, declaration, and XSL PI.
 */

import { describe, expect, it } from 'vitest';

import {
  assertSitemapPartitionComplete,
  buildSitemapEntries,
  buildSitemapGroups,
  findOrphanSitemapPages,
  partitionSitemapEntries,
  serializeSitemapIndex,
  serializeUrlSet,
  sitemapXmlPreamble,
  SITEMAP_STYLESHEET_HREF,
  SITEMAP_XML_HEADERS,
  SITEMAP_XSL,
  SITEMAP_XSL_HEADERS,
  validateSitemapCanonicals,
} from '@/lib/seo/sitemap';

describe('Sitemap XML presentation (XSL)', () => {
  const entries = buildSitemapEntries();
  const groups = buildSitemapGroups(entries);
  const buckets = partitionSitemapEntries(entries);
  const partition = assertSitemapPartitionComplete(entries);

  it('emits XML declaration and stylesheet PI with no leading whitespace', () => {
    const preamble = sitemapXmlPreamble();
    expect(preamble.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true,
    );
    expect(preamble).toContain(
      `<?xml-stylesheet type="text/xsl" href="${SITEMAP_STYLESHEET_HREF}"?>`,
    );
    expect(SITEMAP_STYLESHEET_HREF).toBe('/sitemap.xsl');

    const indexXml = serializeSitemapIndex(groups);
    expect(indexXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true,
    );
    expect(indexXml).toContain(
      '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    );
    expect(indexXml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    const coreXml = serializeUrlSet(buckets.core);
    expect(coreXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true,
    );
    expect(coreXml).toContain(
      '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    );
    expect(coreXml).toContain('<urlset');
  });

  it('keeps sitemap and XSL Content-Type headers correct', () => {
    expect(SITEMAP_XML_HEADERS['Content-Type']).toBe(
      'application/xml; charset=utf-8',
    );
    expect(SITEMAP_XSL_HEADERS['Content-Type']).toBe('text/xsl; charset=utf-8');
  });

  it('ships a reusable XSL that supports sitemapindex and urlset namespaces', () => {
    expect(SITEMAP_XSL).toContain('xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(SITEMAP_XSL).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(SITEMAP_XSL).toContain('s:sitemapindex');
    expect(SITEMAP_XSL).toContain('s:urlset');
    expect(SITEMAP_XSL).toContain('NovaLikes XML Sitemap Index');
    expect(SITEMAP_XSL).toContain('NovaLikes XML Sitemap');
    expect(SITEMAP_XSL).toContain('Alternates:');
  });

  it('does not change inventory counts, hreflang, duplicates, or orphans', () => {
    expect(partition.ok).toBe(true);
    expect(partition.total).toBe(entries.length);
    expect(partition.sum).toBe(partition.total);
    expect(partition.duplicates).toEqual([]);
    expect(partition.missing).toEqual([]);
    expect(buckets.markets).toHaveLength(44);
    expect(validateSitemapCanonicals(entries)).toHaveLength(0);
    expect(findOrphanSitemapPages(entries)).toHaveLength(0);
    expect(
      entries.some(
        (entry) =>
          entry.url === 'https://novalikes.com/en' ||
          entry.url.startsWith('https://novalikes.com/en/'),
      ),
    ).toBe(false);

    const marketsXml = serializeUrlSet(buckets.markets);
    expect(marketsXml).toContain('hreflang="en-CA"');
    expect(marketsXml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect((marketsXml.match(/<url>/g) ?? []).length).toBe(44);
  });
});
