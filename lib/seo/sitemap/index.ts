/**
 * Sitemap & Robots Finalization — Document 14.08.
 */

export { getIndexableRoutes, getFutureLearnSitemapRoutes, getAuthorSitemapRoutes, getTagSitemapRoutes, isSitemapProductionRoute } from '@/lib/seo/sitemap/routes';
export { buildSitemapEntries } from '@/lib/seo/sitemap/build';
export { validateSitemapUrl } from '@/lib/seo/sitemap/validate-url';
export {
  validateSitemapCanonicals,
  findNoindexSitemapEntries,
  findMissingSitemapEntries,
  findSkippedRoutesInSitemap,
  validateLastModified,
  findDuplicateSitemapUrls,
  findIndexableRoutesNotInSitemapAllowlist,
} from '@/lib/seo/sitemap/validate';
export {
  findOrphanSitemapPages,
  findUnsafeInternalLinks,
} from '@/lib/seo/sitemap/orphans';
export {
  getRobotsRules,
  getSitemapUrl,
  validateRobotsRules,
  ROBOTS_DISALLOW,
  isPathAllowedForCrawler,
  isOaiSearchBotAllowedOnPublicPages,
} from '@/lib/seo/sitemap/robots';
export {
  SITEMAP_GROUP_IDS,
  classifySitemapPath,
  partitionSitemapEntries,
  buildSitemapGroups,
  getSitemapGroupById,
  assertSitemapPartitionComplete,
  getSitemapIndexLocs,
  type SitemapGroupId,
  type SitemapGroup,
} from '@/lib/seo/sitemap/groups';
export {
  serializeUrlSet,
  serializeSitemapIndex,
  sitemapXmlPreamble,
  SITEMAP_XML_HEADERS,
} from '@/lib/seo/sitemap/serialize';
export {
  SITEMAP_STYLESHEET_HREF,
  SITEMAP_STYLESHEET_PATH,
  SITEMAP_XSL,
  SITEMAP_XSL_HEADERS,
} from '@/lib/seo/sitemap/xsl-stylesheet';
export { getProductionSitemapEntries } from '@/lib/seo/sitemap/production-entries';

export {
  SITEMAP_PRODUCTION_ROUTES,
  SITEMAP_EXCLUSION_PREFIXES,
  LEARN_SITEMAP_ENABLED,
  SKIPPED_SERVICE_ROUTE_EXAMPLES,
} from '@/data/seo/sitemap-routes';
