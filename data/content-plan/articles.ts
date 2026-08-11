/**
 * Planned article master list — Document 16.01.
 * Cleared for a fresh editorial start.
 */

import type { ArticleBrief } from '@/types/content-plan';

export const PLANNED_ARTICLES: readonly ArticleBrief[] = [];

export function getPlannedArticleBySlug(
  slug: string,
): ArticleBrief | undefined {
  return PLANNED_ARTICLES.find((article) => article.slug === slug);
}

export function getPlannedArticleById(id: string): ArticleBrief | undefined {
  return PLANNED_ARTICLES.find((article) => article.id === id);
}
