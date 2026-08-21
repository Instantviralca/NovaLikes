import type { MetadataRoute } from 'next';

import { buildSitemapEntries } from '@/seo/sitemap';
import { listPublishedCmsPublicArticles } from '@/lib/cms/learn-bridge';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';

/**
 * Production XML sitemap — Document 14.08.
 * Registry routes plus published CMS Learn articles (never drafts/scheduled/trash/preview).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
