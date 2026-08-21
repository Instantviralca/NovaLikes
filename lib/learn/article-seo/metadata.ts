/**
 * Article Next.js Metadata — Document 15.07.
 */

import type { Metadata } from 'next';

import { getAuthorById } from '@/lib/authors';
import { getLearnCategoryById } from '@/data/learn/categories';
import { buildArticleCanonical } from '@/lib/learn/article-seo/canonical';
import {
  resolveArticleSection,
  toArticleSeoRecord,
} from '@/lib/learn/article-seo/record';
import {
  buildArticleOpenGraph,
  buildArticleTwitter,
  sanitizeArticleSocialFields,
} from '@/lib/learn/article-seo/social';
import { buildRobotsMetadata } from '@/lib/seo/metadata/robots';
import { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { seoSiteConfig } from '@/config/seo';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type { ArticleSeoRecord } from '@/types/learn-article-seo';

export type BuildArticleMetadataOptions = {
  /** Force preview/draft noindex regardless of record flags. */
  preview?: boolean;
};

function isIndexableSeo(seo: ArticleSeoRecord, preview?: boolean): boolean {
  if (preview || seo.noindex) return false;
  if (!seo.published || !seo.active) return false;
  return seo.robots.index && seo.robots.follow;
}

export function buildArticleMetadata(
  article: LearnArticleRecord | PublicLearnArticle | ArticleSeoRecord,
  options?: BuildArticleMetadataOptions,
): Metadata {
  const seo =
    'metaTitle' in article
      ? (article as ArticleSeoRecord)
      : toArticleSeoRecord(article);
  const safe = sanitizeArticleSocialFields(seo);
  const indexable = isIndexableSeo(safe, options?.preview);
  const author = getAuthorById(safe.authorId);
  const category = getLearnCategoryById(safe.categoryId);
  const section = resolveArticleSection(safe, category?.name);
  const canonical = buildArticleCanonical(safe.slug);
  const keywords = [
    ...(safe.primaryKeyword ? [safe.primaryKeyword] : []),
    ...safe.secondaryKeywords,
  ];

  return {
    title: { absolute: sanitizeMetadataText(safe.metaTitle) },
    description: sanitizeMetadataText(safe.metaDescription),
    metadataBase: new URL(seoSiteConfig.productionDomain),
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical,
    },
    robots: buildRobotsMetadata(
      indexable
        ? { index: true, follow: true }
        : { index: false, follow: false },
    ),
    openGraph: buildArticleOpenGraph(safe, {
      authorUrl: author ? absoluteUrl(author.profilePath) : undefined,
      articleSection: section,
    }),
    twitter: buildArticleTwitter(safe),
  };
}

export function buildPreviewArticleMetadata(slug: string): Metadata {
  return {
    title: { absolute: 'Preview | NovaLikes Learn' },
    description: 'Authorized article preview.',
    metadataBase: new URL(seoSiteConfig.productionDomain),
    alternates: {
      canonical: buildArticleCanonical(slug),
    },
    robots: buildRobotsMetadata({ index: false, follow: false }),
  };
}
