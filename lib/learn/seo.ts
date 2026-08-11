/**
 * Learn SEO helpers — Document 15.01 + 14.07 integration.
 */

import type { Metadata } from 'next';

import { learnArticlePath, routes } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata/build';
import { getPublicLearnArticleBySlug } from '@/lib/learn/getters';
import { buildArticleMetadata } from '@/lib/learn/article-seo';
import { getCategoryMetadata } from '@/lib/learn/taxonomy/seo';
import { learnIndexMetadata } from '@/seo/metadata';

export function getLearnIndexMetadata(): Metadata {
  return learnIndexMetadata();
}

export function getLearnCategoryMetadata(categorySlug: string): Metadata {
  return getCategoryMetadata(categorySlug);
}

export function getLearnArticlePageMetadata(articleSlug: string): Metadata {
  const article = getPublicLearnArticleBySlug(articleSlug);
  if (!article) {
    return buildPageMetadata({
      title: 'Learn | NovaLikes',
      description: 'NovaLikes Learn Center.',
      path: learnArticlePath(articleSlug),
      robots: { index: false, follow: false },
    });
  }

  return buildArticleMetadata(article);
}

export function getLearnHubCanonical(): string {
  return routes.learn;
}
