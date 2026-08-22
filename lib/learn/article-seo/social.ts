/**
 * Article Open Graph & Twitter builders — Document 15.07.
 */

import { seoSiteConfig } from '@/config/seo';
import { buildArticleCanonical } from '@/lib/learn/article-seo/canonical';
import { resolvePublicArticleTimestamps } from '@/lib/learn/article-seo/public-dates';
import { sanitizeJsonLdText } from '@/lib/learn/article-seo/sanitize';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';
import type { ArticleSeoRecord } from '@/types/learn-article-seo';
import type { Metadata } from 'next';

function resolveImage(seo: ArticleSeoRecord): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  const src =
    seo.openGraphImage ??
    seo.featuredImage?.src ??
    seoSiteConfig.defaultOpenGraphImage;
  const url = src.startsWith('http') ? src : absoluteUrl(src);
  return {
    url,
    width: seo.featuredImage?.width ?? seoSiteConfig.defaultOpenGraphImageWidth,
    height:
      seo.featuredImage?.height ?? seoSiteConfig.defaultOpenGraphImageHeight,
    alt: sanitizeMetadataText(
      seo.featuredImage?.alt ?? seo.openGraphTitle ?? seo.metaTitle,
    ),
  };
}

export function buildArticleOpenGraph(
  seo: ArticleSeoRecord,
  options?: { authorUrl?: string; articleSection?: string },
): NonNullable<Metadata['openGraph']> {
  const image = resolveImage(seo);
  const publicDates = resolvePublicArticleTimestamps({
    publishedAt: seo.publishedAt,
    updatedAt: seo.updatedAt,
    showModifiedDate: seo.showModifiedDate,
  });

  return {
    type: 'article',
    title: sanitizeMetadataText(seo.openGraphTitle ?? seo.metaTitle),
    description: sanitizeMetadataText(
      seo.openGraphDescription ?? seo.metaDescription,
    ),
    url: buildArticleCanonical(seo.slug),
    siteName: seoSiteConfig.siteName,
    locale: seoSiteConfig.defaultLocale,
    images: [
      {
        url: image.url,
        width: image.width,
        height: image.height,
        alt: image.alt,
      },
    ],
    publishedTime: publicDates.datePublished,
    modifiedTime: publicDates.dateModified,
    authors: options?.authorUrl ? [options.authorUrl] : undefined,
    section: options?.articleSection ?? seo.articleSection,
    tags: seo.tags.length ? [...seo.tags] : undefined,
  };
}

export function buildArticleTwitter(
  seo: ArticleSeoRecord,
): NonNullable<Metadata['twitter']> {
  const image = resolveImage(seo);
  const base: NonNullable<Metadata['twitter']> = {
    card: 'summary_large_image',
    title: sanitizeMetadataText(seo.twitterTitle ?? seo.metaTitle),
    description: sanitizeMetadataText(
      seo.twitterDescription ?? seo.metaDescription,
    ),
    images: [image.url],
  };

  if (seoSiteConfig.twitterHandle) {
    return { ...base, site: seoSiteConfig.twitterHandle };
  }

  return base;
}

/** Ensure social strings never carry injectable markup. */
export function sanitizeArticleSocialFields(seo: ArticleSeoRecord): ArticleSeoRecord {
  return {
    ...seo,
    metaTitle: sanitizeJsonLdText(seo.metaTitle),
    metaDescription: sanitizeJsonLdText(seo.metaDescription),
    openGraphTitle: seo.openGraphTitle
      ? sanitizeJsonLdText(seo.openGraphTitle)
      : undefined,
    openGraphDescription: seo.openGraphDescription
      ? sanitizeJsonLdText(seo.openGraphDescription)
      : undefined,
  };
}
