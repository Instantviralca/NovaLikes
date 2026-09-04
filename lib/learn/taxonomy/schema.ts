/**
 * Category & tag JSON-LD — Document 15.04.
 */

import { absoluteUrl } from '@/seo/canonical';
import { learnIndexPath } from '@/lib/learn/taxonomy/paths';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';
import { WEBSITE_ID, type JsonLd } from '@/schemas/organization';
import { breadcrumbSchema } from '@/schemas/breadcrumb';

export function getCategoryBreadcrumbs(
  category: PublicLearnCategory,
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: learnIndexPath() },
    { label: category.name, href: category.href },
  ];
}

export function getTagBreadcrumbs(tag: PublicLearnTag): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: learnIndexPath() },
    { label: 'Tags', href: learnIndexPath() },
    { label: tag.name, href: tag.href },
  ];
}

export function getCategoryCollectionSchema(
  category: PublicLearnCategory,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: absoluteUrl(category.href),
    isPartOf: { '@id': WEBSITE_ID },
    about: {
      '@type': 'Thing',
      name: category.name,
    },
  };
}

export function getTagCollectionSchema(tag: PublicLearnTag): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: tag.name,
    description: tag.description,
    url: absoluteUrl(tag.href),
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function getCategoryPageJsonLd(category: PublicLearnCategory): JsonLd[] {
  const crumbs = breadcrumbSchema(getCategoryBreadcrumbs(category));
  return [
    getCategoryCollectionSchema(category),
    ...(crumbs ? [crumbs] : []),
  ];
}

export function getTagPageJsonLd(tag: PublicLearnTag): JsonLd[] {
  const crumbs = breadcrumbSchema(getTagBreadcrumbs(tag));
  return [
    getTagCollectionSchema(tag),
    ...(crumbs ? [crumbs] : []),
  ];
}
