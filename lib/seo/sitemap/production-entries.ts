/**
 * Gather the full production sitemap inventory used by HTTP sitemap routes.
 * Starts from buildSitemapEntries() and merges published CMS Learn articles
 * (same behavior as the previous app/sitemap.ts).
 */

import type { MetadataRoute } from 'next';

import { listPublishedCmsPublicArticles } from '@/lib/cms/learn-bridge';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { buildSitemapEntries } from '@/lib/seo/sitemap/build';

export async function getProductionSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const entries = buildSitemapEntries();
  const seen = new Set(entries.map((entry) => entry.url));

  try {
    const cms = await listPublishedCmsPublicArticles();
    for (const article of cms) {
      const url = absoluteUrl(`/learn/${article.slug}`);
      if (seen.has(url) || article.seo.noindex) continue;
      seen.add(url);
      entries.push({
        url,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  } catch {
    // CMS database may be unavailable at build time; keep registry sitemap.
  }

  return entries;
}
