/**
 * Learn Center types — Document 15.01 / 15.02.
 * Scalable for 100+ articles. No content hardcoded in page components.
 */

import type {
  ArticleContentBlock,
  ArticleFaqItem,
  ArticleImageMeta,
} from '@/types/learn-article-blocks';
import type { PlatformId } from '@/types/platform';

/** Initial + future Learn categories. */
export type LearnCategoryId =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'social-media-marketing'
  | 'guides'
  | 'news';

export type LearnCategoryStatus = 'active' | 'future';

/**
 * Editorial lifecycle statuses — Document 15.08.
 * Only `published` and `updated` are publicly live / indexable.
 */
export type LearnArticleStatus =
  | 'draft'
  | 'in_review'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'updated'
  | 'archived';

export type LearnSeoFields = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  keywords?: string[];
  /** When true, force noindex/nofollow regardless of status. */
  noindex?: boolean;
};

export type LearnFeaturedImage = ArticleImageMeta;

export type LearnAuthor = {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatarSrc?: string;
  role?: string;
  active: boolean;
  profilePath?: string;
};

/**
 * Learn category registry record — Documents 15.01 + 15.04.
 * Prefer importing CategoryRecord from `@/types/learn-taxonomy` for new code.
 */
export type LearnCategory = {
  id: LearnCategoryId;
  slug: string;
  name: string;
  description: string;
  seo: LearnSeoFields;
  featuredImage?: string;
  icon?: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  platformId?: PlatformId;
  order: number;
  /**
   * @deprecated Prefer `active`. Kept for callers that still filter on status.
   * `status === 'active'` iff `active === true`.
   */
  status: LearnCategoryStatus;
};

export type LearnTag = {
  id: string;
  slug: string;
  name: string;
  description: string;
  active: boolean;
};

export type LearnArticleServiceCta = {
  serviceSlug: string;
  label: string;
  description?: string;
};

/**
 * Canonical Learn article record in the shared content registry.
 * Pages must read from the data layer — never hardcode articles.
 */
export type LearnArticleRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Plain-text fallback / search corpus. Structured body lives in `blocks`. */
  content: string;
  /** Typed content blocks — no unsanitized HTML. */
  blocks: ArticleContentBlock[];
  category: LearnCategoryId;
  tags: string[];
  authorId: string;
  featuredImage?: LearnFeaturedImage;
  readingTime: number;
  publishedAt: string;
  /**
   * Meaningful content revision timestamp.
   * Must not change for builds or formatting-only edits.
   */
  updatedAt: string;
  /** When true, UI/schema may show the modified date. */
  showModifiedDate: boolean;
  seo: LearnSeoFields;
  relatedServices: string[];
  relatedArticles: string[];
  featured: boolean;
  /**
   * Synced boolean for legacy filters.
   * True only when status is `published` or `updated`.
   * @deprecated Prefer `status` + `isPublicLiveArticle()`.
   */
  published: boolean;
  status: LearnArticleStatus;
  keyTakeaways?: string[];
  faqs?: ArticleFaqItem[];
  /** At most one prominent related-service CTA in the article body. */
  serviceCta?: LearnArticleServiceCta;
  /** Future publish timestamp — article stays private until activated. */
  scheduledAt?: string;
  /** Internal editorial — never expose publicly. */
  approvedBy?: string;
  /** Internal editorial — never expose publicly. */
  reviewedBy?: string;
  /** Internal editorial — never expose publicly. */
  reviewNotes?: string;
  seoReviewed?: boolean;
  contentReviewed?: boolean;
  lastEditorialUpdate?: string;
  /**
   * Explicit editorial approval gate.
   * Public visibility requires `editorialApproved: true` AND a live status
   * (`published` | `updated`). Drafts and unapproved records stay private.
   */
  editorialApproved?: boolean;
};

/** Safe public projection of a published article (template-ready). */
export type PublicLearnArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  blocks: ArticleContentBlock[];
  category: LearnCategoryId;
  categoryName: string;
  platformId?: PlatformId;
  tags: string[];
  authorId: string;
  featuredImage?: LearnFeaturedImage;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  showModifiedDate: boolean;
  seo: LearnSeoFields;
  relatedServices: string[];
  relatedArticles: string[];
  featured: boolean;
  href: string;
  keyTakeaways: string[];
  faqs: ArticleFaqItem[];
  serviceCta?: LearnArticleServiceCta;
  status: 'published';
  /** Optional CMS overlay author for the existing AuthorBox. */
  author?: import('@/types/author').PublicAuthor;
};

export type PublicLearnCategory = {
  id: LearnCategoryId;
  slug: string;
  name: string;
  description: string;
  seo: LearnSeoFields;
  featuredImage?: string;
  icon?: string;
  featured: boolean;
  active: true;
  createdAt: string;
  updatedAt: string;
  platformId?: PlatformId;
  order: number;
  href: string;
  articleCount: number;
};

export type PublicLearnTag = {
  id: string;
  slug: string;
  name: string;
  description: string;
  active: true;
  articleCount: number;
  href: string;
};

export type LearnTocItem = {
  id: string;
  label: string;
  href: string;
  level: 2 | 3;
};

export type LearnSegmentKind = 'category' | 'article' | 'unknown';

export type LearnSegmentResolution =
  | { kind: 'category'; category: PublicLearnCategory }
  | { kind: 'article'; article: PublicLearnArticle }
  | { kind: 'unknown'; slug: string };

export type LegacyLearnArticle = {
  slug: string;
  title: string;
  platformId?: PlatformId;
  relatedServiceSlugs: string[];
};

export type ArticleValidationIssue = {
  code:
    | 'draft'
    | 'missing_author'
    | 'missing_featured_image'
    | 'invalid_date'
    | 'invalid_link'
    | 'invalid_image'
    | 'heading_hierarchy'
    | 'duplicate_heading_id'
    | 'unsafe_html'
    | 'invalid_service'
    | 'generic_cta';
  field?: string;
  detail: string;
};
