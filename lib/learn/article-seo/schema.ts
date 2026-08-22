/**
 * Article JSON-LD builders — Document 15.07.
 * Never invent authors, ratings, or FAQ schema without eligibility.
 */

import { site } from '@/config/site';
import { getAuthorById } from '@/lib/authors';
import { getAuthorSchema } from '@/lib/authors/schema';
import { getLearnCategoryById } from '@/data/learn/categories';
import { buildArticleCanonical } from '@/lib/learn/article-seo/canonical';
import { resolvePublicArticleTimestamps } from '@/lib/learn/article-seo/public-dates';
import {
  resolveArticleSection,
  toArticleSeoRecord,
} from '@/lib/learn/article-seo/record';
import { sanitizeJsonLdText } from '@/lib/learn/article-seo/sanitize';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { getLearnArticleBreadcrumbs } from '@/lib/learn/linking';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { ORGANIZATION_ID, type JsonLd } from '@/schemas/organization';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type {
  ArticleFaqSchemaItem,
  ArticleSeoRecord,
  BuildArticleSchemaOptions,
} from '@/types/learn-article-seo';

/** Publisher reference — reuse the site Organization entity, do not duplicate it. */
export function buildArticlePublisherSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
  };
}

export function buildArticleAuthorSchema(authorId: string): JsonLd | null {
  const author = getAuthorById(authorId);
  if (!author) return null;
  const person = getAuthorSchema(author);
  // Nested Person must not re-declare @context or private fields
  const { '@context': _ctx, ...rest } = person;
  void _ctx;
  return rest;
}

export function buildArticleBreadcrumbSchema(articleSlug: string): JsonLd | null {
  return breadcrumbSchema(getLearnArticleBreadcrumbs(articleSlug));
}

/**
 * FAQPage schema only for visible, schema-eligible FAQs.
 * Questions/answers must match rendered content exactly.
 */
export function buildArticleFaqSchema(
  faqs: readonly ArticleFaqSchemaItem[],
): JsonLd | null {
  const eligible = faqs.filter(
    (faq) =>
      faq.schemaEligible &&
      sanitizeJsonLdText(faq.question) &&
      sanitizeJsonLdText(faq.answer),
  );
  if (eligible.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eligible.map((faq) => ({
      '@type': 'Question',
      name: sanitizeJsonLdText(faq.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: sanitizeJsonLdText(faq.answer),
      },
    })),
  };
}

/**
 * HowTo prepared for future use — never auto-generated from numbered lists.
 */
export function buildArticleHowToSchema(_input: {
  name: string;
  steps: Array<{ name: string; text: string }>;
}): JsonLd | null {
  void _input;
  return null;
}

export function buildArticleSchema(
  article: LearnArticleRecord | PublicLearnArticle | ArticleSeoRecord,
  options?: BuildArticleSchemaOptions,
): JsonLd[] {
  const seo =
    'metaTitle' in article
      ? (article as ArticleSeoRecord)
      : toArticleSeoRecord(article);
  const category = getLearnCategoryById(seo.categoryId);
  const section = resolveArticleSection(seo, category?.name);
  const publicDates = resolvePublicArticleTimestamps({
    publishedAt: seo.publishedAt,
    updatedAt: seo.updatedAt,
    showModifiedDate: seo.showModifiedDate,
  });
  const authorNode = buildArticleAuthorSchema(seo.authorId);
  const keywords = [
    ...(seo.primaryKeyword ? [seo.primaryKeyword] : []),
    ...seo.secondaryKeywords,
  ];

  const schemaType =
    seo.schemaType === 'BlogPosting' ||
    seo.schemaType === 'NewsArticle' ||
    seo.schemaType === 'Article'
      ? seo.schemaType
      : 'BlogPosting';

  const articleNode: JsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: sanitizeJsonLdText(seo.title),
    description: sanitizeJsonLdText(seo.excerpt || seo.metaDescription),
    image: seo.featuredImage
      ? absoluteUrl(seo.featuredImage.src)
      : undefined,
    author: authorNode ?? {
      '@type': 'Organization',
      name: site.name,
    },
    publisher: buildArticlePublisherSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildArticleCanonical(seo.slug),
    },
    articleSection: section,
    keywords: keywords.length ? keywords.join(', ') : undefined,
    inLanguage: 'en',
    isAccessibleForFree: true,
    about: section
      ? {
          '@type': 'Thing',
          name: sanitizeJsonLdText(section),
        }
      : undefined,
  };
  if (publicDates.datePublished) {
    articleNode.datePublished = publicDates.datePublished;
  }
  if (publicDates.dateModified) {
    articleNode.dateModified = publicDates.dateModified;
  }

  const schemas: JsonLd[] = [articleNode];

  const visibleFaqs = options?.visibleFaqs ?? [];
  const faqSchema = buildArticleFaqSchema(visibleFaqs);
  if (faqSchema) schemas.push(faqSchema);

  if (options?.includeHowTo) {
    const howTo = buildArticleHowToSchema({ name: seo.title, steps: [] });
    if (howTo) schemas.push(howTo);
  }

  return schemas;
}

/** Full page graph: Organization + Article (+ FAQ) + BreadcrumbList. */
export function buildArticlePageJsonLd(
  article: PublicLearnArticle,
  options?: BuildArticleSchemaOptions,
): JsonLd[] {
  const crumbs = buildArticleBreadcrumbSchema(article.slug);
  return [
    ...buildArticleSchema(article, options),
    ...(crumbs ? [crumbs] : []),
  ];
}
