/**
 * Learn internal-linking helpers — Document 15.01 + 14.05.
 */

import { learnCategoryPath, routes } from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { buildBreadcrumb } from '@/lib/linking/breadcrumbs';
import {
  getPublicLearnArticleBySlug,
  getRelatedPublicArticles,
  listPublicLearnCategories,
} from '@/lib/learn/getters';
import { getCategoryBreadcrumbs } from '@/lib/learn/taxonomy/schema';
import type { PublicLearnArticle } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';
import type { InternalLink } from '@/types/linking';

export function getLearnIndexBreadcrumbs(): BreadcrumbItem[] {
  const fromRegistry = buildBreadcrumb('learn');
  if (fromRegistry.length > 1) return fromRegistry;
  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn' },
  ];
}

export function getLearnCategoryBreadcrumbs(categorySlug: string): BreadcrumbItem[] {
  const category = listPublicLearnCategories().find((item) => item.slug === categorySlug);
  if (category) {
    return getCategoryBreadcrumbs(category);
  }
  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn', href: routes.learn },
    { label: categorySlug },
  ];
}

export function getLearnArticleBreadcrumbs(articleSlug: string): BreadcrumbItem[] {
  const article = getPublicLearnArticleBySlug(articleSlug);
  if (!article) {
    return [
      { label: 'Home', href: routes.home },
      { label: 'Learn', href: routes.learn },
    ];
  }

  const category = getLearnCategoryById(article.category);

  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn', href: routes.learn },
    {
      label: article.categoryName,
      href: category ? learnCategoryPath(category.slug) : undefined,
    },
    { label: article.title },
  ];
}

export function getLearnRelatedServicesForArticle(
  article: PublicLearnArticle,
): InternalLink[] {
  const links: InternalLink[] = [];
  const seen = new Set<string>();

  for (const slug of article.relatedServices) {
    if (seen.has(slug) || !isApprovedServiceSlug(slug)) continue;
    const service = getServiceBySlug(slug);
    if (!service || service.comingSoon || service.platform === 'youtube') {
      continue;
    }
    seen.add(slug);
    const platform =
      service.platform === 'tiktok'
        ? 'TikTok'
        : service.platform === 'instagram'
          ? 'Instagram'
          : service.platform === 'facebook'
            ? 'Facebook'
            : service.platform;
    links.push({
      slug: service.slug,
      href: service.url,
      label: `${platform} ${service.shortName}`,
    });
  }

  return links;
}

export function getLearnRelatedArticlesForArticle(
  article: PublicLearnArticle,
  limit = 4,
): PublicLearnArticle[] {
  return getRelatedPublicArticles(article, limit);
}
