/**
 * Category & tag SEO metadata — Documents 15.04 + 14.07.
 */

import type { Metadata } from 'next';

import { LEARN_TAG_PAGES_ENABLED } from '@/config/learn-taxonomy';
import {
  getCategoryBySlug,
  getTagBySlug,
} from '@/lib/learn/taxonomy/getters';
import { categoryPath, tagPath } from '@/lib/learn/taxonomy/paths';
import { buildPageMetadata } from '@/lib/seo/metadata/build';

export function getCategoryMetadata(slug: string): Metadata {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return buildPageMetadata({
      title: 'Learn | NovaLikes',
      description: 'NovaLikes Learn Center.',
      path: categoryPath(slug),
      robots: { index: false, follow: false },
    });
  }

  return buildPageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: category.seo.canonicalPath ?? categoryPath(category.slug),
    type: 'website',
    images: category.seo.ogImage
      ? [category.seo.ogImage]
      : category.featuredImage
        ? [category.featuredImage]
        : undefined,
    keywords: category.seo.keywords,
    robots:
      category.articleCount > 0
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}

export function getTagMetadata(slug: string): Metadata {
  const tag = getTagBySlug(slug);
  if (!tag || !LEARN_TAG_PAGES_ENABLED) {
    return buildPageMetadata({
      title: 'Learn | NovaLikes',
      description: 'NovaLikes Learn Center.',
      path: tagPath(slug),
      robots: { index: false, follow: false },
    });
  }

  return buildPageMetadata({
    title: `${tag.name} Guides | Learn | NovaLikes`,
    description: tag.description,
    path: tagPath(tag.slug),
    type: 'website',
    robots:
      tag.articleCount > 0
        ? { index: true, follow: true }
        : { index: false, follow: true },
  });
}
