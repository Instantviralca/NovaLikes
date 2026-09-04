/**
 * Serialize MetadataRoute.Sitemap entries to sitemap / sitemapindex XML.
 * Preserves xhtml:link hreflang alternates when present.
 * Adds a browser-only xml-stylesheet PI — crawlers ignore it.
 */

import type { MetadataRoute } from 'next';

import type { SitemapGroup } from '@/lib/seo/sitemap/groups';
import { SITEMAP_STYLESHEET_HREF } from '@/lib/seo/sitemap/xsl-stylesheet';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatLastMod(value: string | Date | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function hasXhtmlAlternates(entries: MetadataRoute.Sitemap): boolean {
  return entries.some(
    (entry) =>
      entry.alternates?.languages &&
      Object.keys(entry.alternates.languages).length > 0,
  );
}

/** XML declaration + browser XSL PI. Must be the first bytes of the response. */
export function sitemapXmlPreamble(): string {
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<?xml-stylesheet type="text/xsl" href="${SITEMAP_STYLESHEET_HREF}"?>\n`
  );
}

export function serializeUrlSet(entries: MetadataRoute.Sitemap): string {
  const xhtml = hasXhtmlAlternates(entries);
  const ns = xhtml
    ? 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

  const body = entries
    .map((entry) => {
      const parts = [`  <url>`, `    <loc>${escapeXml(entry.url)}</loc>`];
      const lastmod = formatLastMod(
        entry.lastModified as string | Date | undefined,
      );
      if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
      if (entry.changeFrequency) {
        parts.push(
          `    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>`,
        );
      }
      if (typeof entry.priority === 'number') {
        parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      const languages = entry.alternates?.languages;
      if (languages) {
        for (const [code, href] of Object.entries(languages)) {
          if (typeof href !== 'string' || !href) continue;
          parts.push(
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(code)}" href="${escapeXml(href)}" />`,
          );
        }
      }
      parts.push(`  </url>`);
      return parts.join('\n');
    })
    .join('\n');

  return `${sitemapXmlPreamble()}<urlset ${ns}>\n${body}\n</urlset>\n`;
}

export function serializeSitemapIndex(groups: SitemapGroup[]): string {
  const body = groups
    .map((group) => {
      const lastmods = group.entries
        .map((entry) => formatLastMod(entry.lastModified as string | Date | undefined))
        .filter(Boolean)
        .map((iso) => new Date(iso as string).getTime());
      const latest =
        lastmods.length > 0
          ? new Date(Math.max(...lastmods)).toISOString()
          : null;
      const lines = [
        `  <sitemap>`,
        `    <loc>${escapeXml(group.loc)}</loc>`,
      ];
      if (latest) lines.push(`    <lastmod>${latest}</lastmod>`);
      lines.push(`  </sitemap>`);
      return lines.join('\n');
    })
    .join('\n');

  return (
    `${sitemapXmlPreamble()}` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</sitemapindex>\n`
  );
}

export const SITEMAP_XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
} as const;
