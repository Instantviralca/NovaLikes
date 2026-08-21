/**
 * Categories & Tags getters — Document 15.04.
 * Only active categories/tags surface publicly. Drafts never appear.
 */

import { DEFAULT_CATEGORY_PAGE_SIZE } from '@/config/learn-taxonomy';
import { LEARN_CATEGORIES } from '@/data/learn/categories';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { LEARN_TAGS } from '@/data/learn/tags';
import { learnArticlePath } from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn/categories';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import {
  toPublicCategory,
  toPublicTag,
} from '@/lib/learn/taxonomy/public';
import type {
  LearnArticleRecord,
  LearnCategory,
  LearnTag,
  PublicLearnArticle,
  PublicLearnCategory,
  PublicLearnTag,
} from '@/types/learn';
import type { TaxonomyPagination } from '@/types/learn-taxonomy';

function isPublished(article: LearnArticleRecord): boolean {
  return isPublicLiveArticle(article);
}

function publishedArticles(): LearnArticleRecord[] {
  return LEARN_ARTICLES.filter(isPublished);
}

function articleCountForCategory(categoryId: string): number {
  return publishedArticles().filter((article) => article.category === categoryId)
    .length;
}

function articleCountForTag(tagSlug: string): number {
  return publishedArticles().filter((article) =>
    article.tags.includes(tagSlug),
  ).length;
}

function toPublicArticle(article: LearnArticleRecord): PublicLearnArticle {
  const category = getLearnCategoryById(article.category);
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    blocks: [...article.blocks],
    category: article.category,
    categoryName: category?.name ?? article.category,
    tags: [...article.tags],
    authorId: article.authorId,
    featuredImage: article.featuredImage,
    readingTime: article.readingTime,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    showModifiedDate: article.showModifiedDate,
    seo: article.seo,
    relatedServices: [...article.relatedServices],
    relatedArticles: [...article.relatedArticles],
    featured: article.featured,
    href: learnArticlePath(article.slug),
    keyTakeaways: [...(article.keyTakeaways ?? [])],
    faqs: [...(article.faqs ?? [])],
    serviceCta: article.serviceCta,
    status: 'published',
  };
}

function sortByPublishedDesc(a: LearnArticleRecord, b: LearnArticleRecord) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** Active categories only, ordered. */
export function getCategories(): PublicLearnCategory[] {
  return LEARN_CATEGORIES.filter((category) => category.active)
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((category) =>
      toPublicCategory(category, articleCountForCategory(category.id)),
    );
}

export function getFeaturedCategories(): PublicLearnCategory[] {
  return getCategories().filter((category) => category.featured);
}

/** Active category by slug — undefined when missing or inactive. */
export function getCategoryBySlug(slug: string): PublicLearnCategory | undefined {
  const category = LEARN_CATEGORIES.find(
    (item) => item.slug === slug && item.active,
  );
  if (!category) return undefined;
  return toPublicCategory(category, articleCountForCategory(category.id));
}

export function getCategoryById(id: string): PublicLearnCategory | undefined {
  const category = LEARN_CATEGORIES.find((item) => item.id === id && item.active);
  if (!category) return undefined;
  return toPublicCategory(category, articleCountForCategory(category.id));
}

/** Raw registry lookup including inactive — never use for public pages. */
export function getCategoryRecordBySlug(slug: string): LearnCategory | undefined {
  return LEARN_CATEGORIES.find((category) => category.slug === slug);
}

/** Active tags only. */
export function getTags(): PublicLearnTag[] {
  return LEARN_TAGS.filter((tag) => tag.active)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((tag) => toPublicTag(tag, articleCountForTag(tag.slug)));
}

/** Active tag by slug. */
export function getTagBySlug(slug: string): PublicLearnTag | undefined {
  const tag = LEARN_TAGS.find((item) => item.slug === slug && item.active);
  if (!tag) return undefined;
  return toPublicTag(tag, articleCountForTag(tag.slug));
}

export function getTagRecordBySlug(slug: string): LearnTag | undefined {
  return LEARN_TAGS.find((tag) => tag.slug === slug);
}

/** Published articles in an active category. */
export function getArticlesByCategory(
  categoryIdOrSlug: string,
): PublicLearnArticle[] {
  const category =
    getCategoryById(categoryIdOrSlug) ?? getCategoryBySlug(categoryIdOrSlug);
  if (!category) return [];

  return publishedArticles()
    .filter((article) => article.category === category.id)
    .slice()
    .sort(sortByPublishedDesc)
    .map(toPublicArticle);
}

/** Published articles for an active tag slug. */
export function getArticlesByTag(tagSlug: string): PublicLearnArticle[] {
  const tag = getTagBySlug(tagSlug);
  if (!tag) return [];

  return publishedArticles()
    .filter((article) => article.tags.includes(tag.slug))
    .slice()
    .sort(sortByPublishedDesc)
    .map(toPublicArticle);
}

export function getFeaturedArticlesByCategory(
  categoryIdOrSlug: string,
): PublicLearnArticle[] {
  return getArticlesByCategory(categoryIdOrSlug).filter(
    (article) => article.featured,
  );
}

export function getLatestArticlesByCategory(
  categoryIdOrSlug: string,
  limit = DEFAULT_CATEGORY_PAGE_SIZE,
): PublicLearnArticle[] {
  return getArticlesByCategory(categoryIdOrSlug).slice(0, limit);
}

/** Related active categories (same platform affinity or featured peers). */
export function getRelatedCategories(
  categoryIdOrSlug: string,
  limit = 4,
): PublicLearnCategory[] {
  const current =
    getCategoryById(categoryIdOrSlug) ?? getCategoryBySlug(categoryIdOrSlug);
  if (!current) return [];

  return getCategories()
    .filter((category) => category.id !== current.id)
    .sort((a, b) => {
      const aScore =
        (current.platformId && a.platformId === current.platformId ? 2 : 0) +
        (a.featured ? 1 : 0);
      const bScore =
        (current.platformId && b.platformId === current.platformId ? 2 : 0) +
        (b.featured ? 1 : 0);
      if (bScore !== aScore) return bScore - aScore;
      return a.order - b.order;
    })
    .slice(0, limit);
}

/** Active tags that currently have at least one published, indexable article. */
export function getDiscoverableTags(): PublicLearnTag[] {
  return getTags().filter((tag) => tag.articleCount > 0);
}

/** Popular tags by published article count. Empty archives are never promoted. */
export function getPopularTags(limit = 8): PublicLearnTag[] {
  return getDiscoverableTags()
    .slice()
    .sort((a, b) => b.articleCount - a.articleCount || a.name.localeCompare(b.name))
    .slice(0, limit);
}

/** Resolve public tags for article tag slugs (skips unknown/inactive). */
export function getPublicTagsForSlugs(slugs: readonly string[]): PublicLearnTag[] {
  const seen = new Set<string>();
  const tags: PublicLearnTag[] = [];
  for (const slug of slugs) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const tag = getTagBySlug(slug);
    if (tag) tags.push(tag);
  }
  return tags;
}

export function paginateItems<T>(
  items: readonly T[],
  page = 1,
  pageSize = DEFAULT_CATEGORY_PAGE_SIZE,
): { items: T[]; pagination: TaxonomyPagination } {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;

  return {
    items: items.slice(start, start + safePageSize),
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
    },
  };
}

export function getActiveCategorySlugsForStaticParams(): { slug: string }[] {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export function getActiveTagSlugsForStaticParams(): { tag: string }[] {
  return getTags().map((tag) => ({ tag: tag.slug }));
}
