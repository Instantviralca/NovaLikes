/**
 * Child sitemap urlsets — /sitemaps/{group}.xml
 * Groups: core | services | markets | locales | tools | learn | taxonomy
 */

import { notFound } from 'next/navigation';

import {
  getSitemapGroupById,
  SITEMAP_GROUP_IDS,
} from '@/lib/seo/sitemap/groups';
import { getProductionSitemapEntries } from '@/lib/seo/sitemap/production-entries';
import {
  serializeUrlSet,
  SITEMAP_XML_HEADERS,
} from '@/lib/seo/sitemap/serialize';

export const dynamic = 'force-static';
export const revalidate = 3600;

type RouteContext = {
  params: Promise<{ group: string }>;
};

export function generateStaticParams() {
  return SITEMAP_GROUP_IDS.map((group) => ({ group: `${group}.xml` }));
}

export async function GET(_request: Request, context: RouteContext) {
  const { group: raw } = await context.params;
  const entries = await getProductionSitemapEntries();
  const group = getSitemapGroupById(raw, entries);
  if (!group) notFound();
  const xml = serializeUrlSet(group.entries);
  return new Response(xml, { headers: SITEMAP_XML_HEADERS });
}
