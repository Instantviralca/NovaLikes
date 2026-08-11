/**
 * Learn articles registry — Document 15.01.
 * Published Learn Center articles only — no placeholders.
 *
 * Add new manually written articles here when editorial approves them.
 * Each entry should be a LearnArticleRecord (≈1000–2000 words).
 *
 * To publish a new article:
 * 1. Create data/learn/articles/<slug>.ts exporting *_ARTICLE
 * 2. Import it below and add it to LEARN_ARTICLES
 * 3. Add images under public/assets/images/learn/<slug>/
 */

import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import type { LearnArticleRecord } from '@/types/learn';

export const LEARN_ARTICLES: readonly LearnArticleRecord[] = [];

export function getAllLearnArticleRecords(): LearnArticleRecord[] {
  return [...LEARN_ARTICLES];
}

/** Live public articles only (`published` | `updated`). */
export function getPublishedLearnArticleRecords(): LearnArticleRecord[] {
  return LEARN_ARTICLES.filter(isPublicLiveArticle);
}

export function getLearnArticleRecordBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}

export function getPublishedLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && isPublicLiveArticle(article),
  );
}

export function getDraftLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && article.status === 'draft',
  );
}

export function getFeaturedLearnArticles(): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter((article) => article.featured);
}

export function getLearnArticlesByCategory(
  categoryId: string,
): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter(
    (article) => article.category === categoryId,
  );
}

export function getPublishedLearnArticleSlugs(): string[] {
  return getPublishedLearnArticleRecords().map((article) => article.slug);
}
