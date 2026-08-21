/**
 * Categories & Tags System public API — Document 15.04.
 */

export {
  getCategories,
  getFeaturedCategories,
  getCategoryBySlug,
  getCategoryById,
  getCategoryRecordBySlug,
  getTags,
  getTagBySlug,
  getTagRecordBySlug,
  getArticlesByCategory,
  getArticlesByTag,
  getFeaturedArticlesByCategory,
  getLatestArticlesByCategory,
  getRelatedCategories,
  getPopularTags,
  getDiscoverableTags,
  getPublicTagsForSlugs,
  paginateItems,
  getActiveCategorySlugsForStaticParams,
  getActiveTagSlugsForStaticParams,
} from '@/lib/learn/taxonomy/getters';

export { toPublicCategory, toPublicTag } from '@/lib/learn/taxonomy/public';

export {
  validateCategory,
  validateTag,
  detectDuplicateCategories,
  detectDuplicateTags,
  validateLearnTaxonomy,
} from '@/lib/learn/taxonomy/validate';

export { getCategoryMetadata, getTagMetadata } from '@/lib/learn/taxonomy/seo';

export {
  getCategoryBreadcrumbs,
  getTagBreadcrumbs,
  getCategoryCollectionSchema,
  getTagCollectionSchema,
  getCategoryPageJsonLd,
  getTagPageJsonLd,
} from '@/lib/learn/taxonomy/schema';

export {
  getCategoryRelatedServices,
  getCategoryRelatedCategoryLinks,
} from '@/lib/learn/taxonomy/linking';

export { categoryPath, tagPath, learnIndexPath } from '@/lib/learn/taxonomy/paths';
