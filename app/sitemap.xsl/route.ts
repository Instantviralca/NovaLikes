/**
 * Browser presentation stylesheet for sitemap XML documents.
 * Served at /sitemap.xsl — does not affect crawler sitemap semantics.
 */

import {
  SITEMAP_XSL,
  SITEMAP_XSL_HEADERS,
} from '@/lib/seo/sitemap/xsl-stylesheet';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  return new Response(SITEMAP_XSL, { headers: SITEMAP_XSL_HEADERS });
}
