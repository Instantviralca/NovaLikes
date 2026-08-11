/**
 * Article SEO validation — Document 15.07.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

import { getAuthorById } from '@/lib/authors';
import { getLearnCategoryById } from '@/data/learn/categories';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { validateArticleCanonical } from '@/lib/learn/article-seo/canonical';
import { toArticleSeoRecord } from '@/lib/learn/article-seo/record';
import { buildArticleSchema } from '@/lib/learn/article-seo/schema';
import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type {
  ArticleSeoIssue,
  ArticleSeoRecord,
  ArticleSeoValidationResult,
} from '@/types/learn-article-seo';

function hasBlocker(issues: ArticleSeoIssue[]): boolean {
  return issues.some((issue) => issue.severity === 'blocker');
}

function hasError(issues: ArticleSeoIssue[]): boolean {
  return issues.some(
    (issue) => issue.severity === 'blocker' || issue.severity === 'error',
  );
}

export function validateArticleDates(
  seo: Pick<
    ArticleSeoRecord,
    'publishedAt' | 'updatedAt' | 'showModifiedDate' | 'slug' | 'articleId'
  >,
): ArticleSeoIssue[] {
  const issues: ArticleSeoIssue[] = [];
  const published = Date.parse(seo.publishedAt);
  const updated = Date.parse(seo.updatedAt);

  if (Number.isNaN(published)) {
    issues.push({
      severity: 'error',
      code: 'invalid_published_date',
      field: 'publishedAt',
      message: 'publishedAt must be a valid ISO date.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  if (Number.isNaN(updated)) {
    issues.push({
      severity: 'error',
      code: 'invalid_updated_date',
      field: 'updatedAt',
      message: 'updatedAt must be a valid ISO date.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  if (!Number.isNaN(published) && !Number.isNaN(updated) && updated < published) {
    issues.push({
      severity: 'error',
      code: 'updated_before_published',
      field: 'updatedAt',
      message: 'updatedAt must not precede publishedAt.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  if (
    seo.showModifiedDate &&
    !Number.isNaN(published) &&
    !Number.isNaN(updated) &&
    updated === published
  ) {
    issues.push({
      severity: 'warning',
      code: 'modified_date_same_as_published',
      field: 'showModifiedDate',
      message:
        'showModifiedDate is true but updatedAt equals publishedAt — only set after a meaningful revision.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  return issues;
}

export function validateArticleImage(
  seo: Pick<ArticleSeoRecord, 'featuredImage' | 'openGraphImage' | 'slug' | 'articleId'>,
): ArticleSeoIssue[] {
  const issues: ArticleSeoIssue[] = [];
  const image = seo.featuredImage;

  if (!image) {
    issues.push({
      severity: 'error',
      code: 'missing_featured_image',
      field: 'featuredImage',
      message: 'Featured image is required for published article SEO.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
    return issues;
  }

  if (!image.src?.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_image_src',
      field: 'featuredImage.src',
      message: 'Featured image src is required.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  } else if (image.src.startsWith('http') && !image.src.startsWith('https://')) {
    issues.push({
      severity: 'error',
      code: 'insecure_image_url',
      field: 'featuredImage.src',
      message: 'External featured images must use HTTPS.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  } else if (image.src.startsWith('/')) {
    const publicPath = path.join(process.cwd(), 'public', image.src);
    if (!existsSync(publicPath)) {
      issues.push({
        severity: 'error',
        code: 'missing_image_file',
        field: 'featuredImage.src',
        message: `Featured image file not found at public${image.src}.`,
        slug: seo.slug,
        articleId: seo.articleId,
      });
    }
  }

  if (!image.width || !image.height) {
    issues.push({
      severity: 'error',
      code: 'missing_image_dimensions',
      field: 'featuredImage',
      message: 'Featured image width and height are required.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  if (!image.decorative && !image.alt?.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_image_alt',
      field: 'featuredImage.alt',
      message: 'Informative featured images require alt text.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  if (!seo.openGraphImage && !image.src) {
    issues.push({
      severity: 'warning',
      code: 'missing_og_image',
      field: 'openGraphImage',
      message: 'Open Graph image is missing.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  return issues;
}

export function validateArticleSchema(
  article: LearnArticleRecord | PublicLearnArticle | ArticleSeoRecord,
): ArticleSeoIssue[] {
  const issues: ArticleSeoIssue[] = [];
  const seo =
    'metaTitle' in article
      ? (article as ArticleSeoRecord)
      : toArticleSeoRecord(article);

  try {
    const schemas = buildArticleSchema(seo, { visibleFaqs: [] });
    const serialized = JSON.stringify(schemas);
    if (serialized.includes('<script') || serialized.includes('</script')) {
      issues.push({
        severity: 'blocker',
        code: 'jsonld_injection',
        field: 'schema',
        message: 'JSON-LD contains potential script injection.',
        slug: seo.slug,
        articleId: seo.articleId,
      });
    }
    if (!serialized.includes('"@type":"Article"') && !serialized.includes('"@type": "Article"')) {
      // JSON.stringify may not add spaces
      if (!/"@type":"Article"|"@type":"BlogPosting"|"@type":"NewsArticle"/.test(serialized)) {
        issues.push({
          severity: 'blocker',
          code: 'invalid_jsonld',
          field: 'schema',
          message: 'Article schema type is missing or invalid.',
          slug: seo.slug,
          articleId: seo.articleId,
        });
      }
    }
    if (/"@type":"Review"|"@type":"AggregateRating"/.test(serialized)) {
      issues.push({
        severity: 'blocker',
        code: 'forbidden_review_schema',
        field: 'schema',
        message: 'Review/AggregateRating schema is not allowed on normal Learn articles.',
        slug: seo.slug,
        articleId: seo.articleId,
      });
    }
  } catch {
    issues.push({
      severity: 'blocker',
      code: 'invalid_jsonld',
      field: 'schema',
      message: 'Failed to build article JSON-LD.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  if (!getAuthorById(seo.authorId)) {
    issues.push({
      severity: 'blocker',
      code: 'missing_author_entity',
      field: 'authorId',
      message: 'Author entity is missing — do not invent credentials.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  return issues;
}

export function validateArticleSeo(
  article: LearnArticleRecord | PublicLearnArticle | ArticleSeoRecord,
): ArticleSeoValidationResult {
  const seo =
    'metaTitle' in article
      ? (article as ArticleSeoRecord)
      : toArticleSeoRecord(article);
  const issues: ArticleSeoIssue[] = [];

  if (!seo.metaTitle.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_title',
      field: 'metaTitle',
      message: 'Meta title is required.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  if (!seo.metaDescription.trim() || seo.metaDescription.trim().length < 40) {
    issues.push({
      severity: 'error',
      code: 'missing_description',
      field: 'metaDescription',
      message: 'Meta description must be present and substantive.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }
  if (
    seo.metaDescription &&
    /novalikes learn center guides and resources/i.test(seo.metaDescription)
  ) {
    issues.push({
      severity: 'warning',
      code: 'generic_description',
      field: 'metaDescription',
      message: 'Avoid generic duplicated descriptions across articles.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  issues.push(...validateArticleCanonical(seo.slug, seo.canonicalPath));
  issues.push(...validateArticleDates(seo));
  issues.push(...validateArticleImage(seo));
  issues.push(...validateArticleSchema(seo));

  if (!getLearnCategoryById(seo.categoryId)) {
    issues.push({
      severity: 'error',
      code: 'invalid_category',
      field: 'categoryId',
      message: 'Category is missing or inactive.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  if (seo.published && seo.robots.index && (hasBlocker(issues) || hasError(issues))) {
    issues.push({
      severity: 'blocker',
      code: 'incomplete_but_indexable',
      field: 'robots',
      message: 'Article must not be indexable while SEO blockers/errors remain.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  if (!seo.published && seo.robots.index) {
    issues.push({
      severity: 'blocker',
      code: 'draft_indexable',
      field: 'robots',
      message: 'Draft/unpublished articles must be noindex.',
      slug: seo.slug,
      articleId: seo.articleId,
    });
  }

  const indexable =
    seo.published &&
    seo.active &&
    !seo.noindex &&
    seo.robots.index &&
    !hasBlocker(issues) &&
    !issues.some((i) => i.code === 'draft_indexable');

  return {
    valid: !hasError(issues),
    indexable,
    issues,
  };
}

export function getIndexableArticles(
  articles: readonly LearnArticleRecord[] = LEARN_ARTICLES,
): LearnArticleRecord[] {
  return articles.filter((article) => {
    if (!isPublicLiveArticle(article)) return false;
    const seo = toArticleSeoRecord(article);
    if (seo.noindex || !seo.robots.index) return false;
    if (seo.scheduledFor) {
      const when = Date.parse(seo.scheduledFor);
      if (!Number.isNaN(when) && when > Date.now()) return false;
    }
    const result = validateArticleSeo(seo);
    return result.indexable && !hasBlocker(result.issues);
  });
}
