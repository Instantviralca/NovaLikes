/**
 * Production sitemap index — /sitemap.xml
 * Lists child sitemaps under /sitemaps/*.xml
 */

import {
  buildSitemapGroups,
} from '@/lib/seo/sitemap/groups';
import { getProductionSitemapEntries } from '@/lib/seo/sitemap/production-entries';
import {
  serializeSitemapIndex,
  SITEMAP_XML_HEADERS,
} from '@/lib/seo/sitemap/serialize';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const entries = await getProductionSitemapEntries();
  const groups = buildSitemapGroups(entries);
  const xml = serializeSitemapIndex(groups);
  return new Response(xml, { headers: SITEMAP_XML_HEADERS });
}
