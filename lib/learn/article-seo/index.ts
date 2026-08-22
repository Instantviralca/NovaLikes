/**
 * Article SEO & Schema Engine — Document 15.07.
 */

export { toArticleSeoRecord, resolveArticleSection } from '@/lib/learn/article-seo/record';
export {
  buildArticleCanonical,
  validateArticleCanonical,
} from '@/lib/learn/article-seo/canonical';
export {
  buildArticleMetadata,
  buildPreviewArticleMetadata,
} from '@/lib/learn/article-seo/metadata';
export {
  buildArticleOpenGraph,
  buildArticleTwitter,
} from '@/lib/learn/article-seo/social';
export {
  buildArticleSchema,
  buildArticleAuthorSchema,
  buildArticleBreadcrumbSchema,
  buildArticleFaqSchema,
  buildArticleHowToSchema,
  buildArticlePublisherSchema,
  buildArticlePageJsonLd,
} from '@/lib/learn/article-seo/schema';
export {
  resolvePublicArticleTimestamps,
  publicIsoTimestamp,
  publicDateTimestamp,
} from '@/lib/learn/article-seo/public-dates';
export {
  validateArticleSeo,
  validateArticleSchema,
  validateArticleDates,
  validateArticleImage,
  getIndexableArticles,
} from '@/lib/learn/article-seo/validate';
export {
  findDuplicateArticleMetadata,
  findArticleKeywordConflicts,
  findOrphanArticles,
  buildArticleSeoEditorialReport,
} from '@/lib/learn/article-seo/report';
export { sanitizeJsonLdText, stripPrivateSeoFields } from '@/lib/learn/article-seo/sanitize';
