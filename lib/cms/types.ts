import type { ArticleContentBlock, ArticleFaqItem } from '@/types/learn-article-blocks';
import type { LearnCategoryId } from '@/types/learn';

export const CMS_ARTICLE_STATUSES = ['planned', 'draft', 'scheduled', 'published', 'trash'] as const;
export type CmsArticleStatus = (typeof CMS_ARTICLE_STATUSES)[number];

export const CMS_USER_ROLES = ['admin', 'author'] as const;
export type CmsUserRole = (typeof CMS_USER_ROLES)[number];

export const CMS_USER_STATUSES = ['active', 'disabled'] as const;
export type CmsUserStatus = (typeof CMS_USER_STATUSES)[number];

export type CmsUserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profileImage: string | null;
  bio: string | null;
  role: CmsUserRole;
  status: CmsUserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type CmsUserPublic = Omit<CmsUserRecord, 'passwordHash'>;

export type CmsArticleRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  contentJson: Record<string, unknown> | null;
  blocks: ArticleContentBlock[];
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  featuredImageWidth: number | null;
  featuredImageHeight: number | null;
  category: LearnCategoryId;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalPath: string | null;
  authorId: string | null;
  createdBy: string;
  updatedBy: string;
  status: CmsArticleStatus;
  /** Editorial target date (YYYY-MM-DD). Never an auto-publish trigger. */
  intendedPublishOn: string | null;
  publishAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  faqs: ArticleFaqItem[];
  keyTakeaways: string[];
  relatedServices: string[];
  relatedArticles: string[];
};

export type CmsMediaRecord = {
  id: string;
  url: string;
  storageKey: string;
  filename: string;
  mime: string;
  size: number;
  alt: string;
  width: number | null;
  height: number | null;
  uploadedBy: string;
  createdAt: string;
};

export type CmsArticleInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  contentHtml?: string;
  contentJson?: Record<string, unknown> | null;
  featuredImageUrl?: string | null;
  featuredImageAlt?: string | null;
  featuredImageWidth?: number | null;
  featuredImageHeight?: number | null;
  category?: string;
  tags?: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalPath?: string | null;
  authorId?: string | null;
  faqs?: ArticleFaqItem[];
  keyTakeaways?: string[];
  relatedServices?: string[];
  relatedArticles?: string[];
  intendedPublishOn?: string | null;
  status?: CmsArticleStatus;
};

export type CmsPublishAction =
  | { type: 'draft' }
  | { type: 'publish' }
  | { type: 'schedule'; publishAt: string }
  | { type: 'unpublish' }
  | { type: 'trash' }
  | { type: 'restore' }
  | { type: 'delete_permanent' }
  | { type: 'cancel_schedule' };

export function stripPasswordHash(user: CmsUserRecord): CmsUserPublic {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    bio: user.bio,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
  };
}

export function isCmsArticleStatus(value: string): value is CmsArticleStatus {
  return (CMS_ARTICLE_STATUSES as readonly string[]).includes(value);
}
