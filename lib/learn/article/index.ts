/**
 * Article template helpers barrel — Document 15.02.
 */

export {
  getPublishedArticleBySlug,
  getDraftArticleBySlug,
  calculateReadingTime,
  createHeadingId,
  generateTableOfContents,
  validateHeadingHierarchy,
  sanitizeArticleContent,
  withHeadingAnchors,
  getArticleMetadata,
  getDraftArticleMetadata,
  getArticleSchema,
  getArticleRelatedLinks,
  validateArticleLinks,
  validateArticleDates,
  validateArticleImages,
  isArticlePubliclyRenderable,
  canAccessArticlePreview,
  prepareArticleForRender,
} from '@/lib/learn/article/template';
export { splitArticleIntro } from '@/lib/learn/article/layout';
export { getLearnArticleClosingCta } from '@/lib/learn/article/closing-cta';
