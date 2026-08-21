/**
 * Article template helpers — Document 15.02.
 */

import { learnCategoryPath } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import {
  getLearnArticleRecordBySlug,
  getLearnCategoryById,
  getPublishedLearnArticleBySlug,
} from '@/data/learn';
import { getServiceBySlug } from '@/data/services';
import { getAuthorById } from '@/lib/authors';
import {
  buildArticleMetadata,
  buildArticleSchema,
  buildPreviewArticleMetadata,
} from '@/lib/learn/article-seo';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import {
  getRelatedPublicArticles,
  toPublicLearnArticle,
} from '@/lib/learn/getters';
import { getLearnRelatedServicesForArticle } from '@/lib/learn/linking';
import { applyContextualLinksToBlocks } from '@/lib/learn/contextual-links';
import { getRelatedCategories } from '@/lib/learn/taxonomy';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';
import type {
  ArticleContentBlock,
  HeadingBlock,
} from '@/types/learn-article-blocks';
import type {
  ArticleValidationIssue,
  LearnArticleRecord,
  LearnTocItem,
  PublicLearnArticle,
  PublicLearnCategory,
} from '@/types/learn';
import type { Metadata } from 'next';
import type { JsonLd } from '@/schemas/organization';
import type { InternalLink } from '@/types/linking';

const UNSAFE_HTML_PATTERN =
  /<\/?[a-z][^>]*>|javascript:|data:text\/html|on\w+\s*=/i;

const GENERIC_CTA = /^(click here|here|read more|learn more|this link)$/i;

/** Published articles only — drafts never return. */
export function getPublishedArticleBySlug(
  slug: string,
): PublicLearnArticle | undefined {
  const record = getPublishedLearnArticleBySlug(slug);
  if (!record || !isPublicLiveArticle(record)) {
    return undefined;
  }
  return toPublicLearnArticle(record);
}

/** Non-public article lookup for authorized preview only — never for public routes. */
export function getDraftArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  const record = getLearnArticleRecordBySlug(slug);
  if (!record || isPublicLiveArticle(record)) return undefined;
  return record;
}

export function calculateReadingTime(
  textOrBlocks: string | ArticleContentBlock[],
): number {
  if (typeof textOrBlocks === 'string') {
    return estimateReadingTimeMinutes(textOrBlocks);
  }
  const text = textOrBlocks
    .map((block) => extractBlockPlainText(block))
    .filter(Boolean)
    .join(' ');
  return estimateReadingTimeMinutes(text);
}

export function createHeadingId(text: string, used = new Set<string>()): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  const fallback = base || 'section';
  let candidate = fallback;
  let i = 2;
  while (used.has(candidate)) {
    candidate = `${fallback}-${i}`;
    i += 1;
  }
  used.add(candidate);
  return candidate;
}

/** Article TOC — H2 section headings only. H3s and substeps stay out. */
export function generateTableOfContents(
  blocks: ArticleContentBlock[],
): LearnTocItem[] {
  const used = new Set<string>();
  const items: LearnTocItem[] = [];

  for (const block of blocks) {
    if (block.type !== 'heading') continue;
    if (block.headingLevel !== 2) continue;
    const text = block.text.trim();
    if (!text) continue;
    const id = block.anchorId
      ? ensureUniqueId(block.anchorId, used)
      : createHeadingId(text, used);
    items.push({
      id,
      label: text,
      href: `#${id}`,
      level: block.headingLevel,
    });
  }

  return items;
}

function ensureUniqueId(id: string, used: Set<string>): string {
  let candidate = id;
  let i = 2;
  while (used.has(candidate)) {
    candidate = `${id}-${i}`;
    i += 1;
  }
  used.add(candidate);
  return candidate;
}

export function validateHeadingHierarchy(
  blocks: ArticleContentBlock[],
): ArticleValidationIssue[] {
  const issues: ArticleValidationIssue[] = [];
  const headings = blocks.filter((b): b is HeadingBlock => b.type === 'heading');
  const used = new Set<string>();
  let sawH2 = false;

  for (const heading of headings) {
    const id = heading.anchorId ?? createHeadingId(heading.text);
    if (used.has(id)) {
      issues.push({
        code: 'duplicate_heading_id',
        field: heading.id,
        detail: `Duplicate heading id "${id}"`,
      });
    } else {
      used.add(id);
    }

    if (heading.headingLevel === 2) {
      sawH2 = true;
    } else if (heading.headingLevel === 3 && !sawH2) {
      issues.push({
        code: 'heading_hierarchy',
        field: heading.id,
        detail: 'H3 appears before any H2',
      });
    }
  }

  return issues;
}

export function sanitizeArticleContent(
  blocks: ArticleContentBlock[],
): { blocks: ArticleContentBlock[]; issues: ArticleValidationIssue[] } {
  const issues: ArticleValidationIssue[] = [];
  const sanitized: ArticleContentBlock[] = [];

  for (const block of blocks) {
    const clone = structuredClone(block);
    const texts = collectStrings(clone);
    let unsafe = false;
    for (const value of texts) {
      if (UNSAFE_HTML_PATTERN.test(value)) {
        unsafe = true;
        issues.push({
          code: 'unsafe_html',
          field: block.id,
          detail: 'Block contains disallowed HTML-like content',
        });
        break;
      }
    }
    if (unsafe) continue;

    if (clone.type === 'heading') {
      // TOC ids applied later; strip empty headings
      if (!clone.text.trim()) continue;
    }

    sanitized.push(clone);
  }

  return { blocks: sanitized, issues };
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectStrings(item, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((item) =>
      collectStrings(item, out),
    );
  }
  return out;
}

function extractBlockPlainText(block: ArticleContentBlock): string {
  switch (block.type) {
    case 'paragraph':
    case 'blockquote':
    case 'callout':
    case 'tip':
    case 'warning':
      return block.text;
    case 'heading':
      return block.text;
    case 'bulleted_list':
    case 'numbered_list':
      return [block.leadIn, ...block.items].filter(Boolean).join(' ');
    case 'definition':
      return `${block.term} ${block.definition}`;
    case 'key_takeaway_box':
      return block.items.join(' ');
    case 'faq_group':
      return block.items.map((item) => `${item.question} ${item.answer}`).join(' ');
    case 'step_process':
      return block.steps.map((step) => `${step.title} ${step.text}`).join(' ');
    case 'code':
      return block.code;
    case 'comparison_table':
    case 'data_table':
      return [...block.headers, ...block.rows.flat()].join(' ');
    case 'service_cluster_cta':
      return `${block.heading} ${block.text}`;
    case 'internal_cta':
      return `${block.heading ?? ''} ${block.label} ${block.description ?? ''}`;
    default:
      return '';
  }
}

/** Assign unique anchor IDs onto heading blocks (immutable copy). */
export function withHeadingAnchors(
  blocks: ArticleContentBlock[],
): ArticleContentBlock[] {
  const used = new Set<string>();
  return blocks.map((block) => {
    if (block.type !== 'heading') return block;
    const anchorId = block.anchorId
      ? ensureUniqueId(block.anchorId, used)
      : createHeadingId(block.text, used);
    return { ...block, anchorId };
  });
}

export function getArticleMetadata(article: PublicLearnArticle): Metadata {
  return buildArticleMetadata(article);
}

export function getDraftArticleMetadata(slug: string): Metadata {
  return buildPreviewArticleMetadata(slug);
}

export function getArticleSchema(
  article: PublicLearnArticle,
  options?: { includeFaq?: boolean },
): JsonLd[] {
  const visibleFaqs =
    options?.includeFaq === true
      ? article.faqs
          .filter((faq) => faq.schemaEligible === true)
          .map((faq) => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            schemaEligible: true as const,
          }))
      : [];

  return buildArticleSchema(article, { visibleFaqs });
}

export function getArticleRelatedLinks(article: PublicLearnArticle): {
  articles: PublicLearnArticle[];
  services: InternalLink[];
  categoryHref: string;
  relatedCategories: PublicLearnCategory[];
} {
  const category = getLearnCategoryById(article.category);
  return {
    articles: getRelatedPublicArticles(article, 6).filter(
      (item) => item.slug !== article.slug,
    ),
    services: getLearnRelatedServicesForArticle(article).slice(0, 4),
    categoryHref: category ? learnCategoryPath(category.slug) : '/learn',
    relatedCategories: getRelatedCategories(article.category, 3),
  };
}

export function validateArticleLinks(
  article: Pick<
    LearnArticleRecord | PublicLearnArticle,
    'relatedServices' | 'relatedArticles' | 'serviceCta' | 'blocks' | 'slug'
  >,
): ArticleValidationIssue[] {
  const issues: ArticleValidationIssue[] = [];

  for (const slug of article.relatedServices) {
    if (!isApprovedServiceSlug(slug) || !getServiceBySlug(slug)) {
      issues.push({
        code: 'invalid_service',
        field: 'relatedServices',
        detail: `Invalid or inactive service "${slug}"`,
      });
    }
  }

  if (article.serviceCta) {
    if (
      !isApprovedServiceSlug(article.serviceCta.serviceSlug) ||
      !getServiceBySlug(article.serviceCta.serviceSlug)
    ) {
      issues.push({
        code: 'invalid_service',
        field: 'serviceCta',
        detail: `Invalid service CTA "${article.serviceCta.serviceSlug}"`,
      });
    }
    if (GENERIC_CTA.test(article.serviceCta.label.trim())) {
      issues.push({
        code: 'generic_cta',
        field: 'serviceCta.label',
        detail: 'Service CTA label is too generic',
      });
    }
  }

  for (const related of article.relatedArticles) {
    if (related === article.slug) {
      issues.push({
        code: 'invalid_link',
        field: 'relatedArticles',
        detail: 'Related articles must not include the current article',
      });
    }
  }

  for (const block of article.blocks) {
    if (block.type === 'internal_cta') {
      if (GENERIC_CTA.test(block.label.trim())) {
        issues.push({
          code: 'generic_cta',
          field: block.id,
          detail: 'Internal CTA label is too generic',
        });
      }
      if (block.href.startsWith('http://')) {
        issues.push({
          code: 'invalid_link',
          field: block.id,
          detail: 'Insecure external http link',
        });
      }
    }
    if (block.type === 'related_service_card') {
      if (!isApprovedServiceSlug(block.serviceSlug)) {
        issues.push({
          code: 'invalid_service',
          field: block.id,
          detail: `Invalid service card "${block.serviceSlug}"`,
        });
      }
    }
    if (block.type === 'service_cluster_cta') {
      for (const slug of block.serviceSlugs) {
        if (!isApprovedServiceSlug(slug) || !getServiceBySlug(slug)) {
          issues.push({
            code: 'invalid_service',
            field: block.id,
            detail: `Invalid service cluster slug "${slug}"`,
          });
        }
      }
    }
    if (
      (block.type === 'image' || block.type === 'figure') &&
      block.image.sourceUrl?.startsWith('http://')
    ) {
      issues.push({
        code: 'invalid_link',
        field: block.id,
        detail: 'Insecure image source URL',
      });
    }
  }

  return issues;
}

export function validateArticleDates(
  article: Pick<
    LearnArticleRecord | PublicLearnArticle,
    'publishedAt' | 'updatedAt' | 'showModifiedDate'
  >,
): ArticleValidationIssue[] {
  const issues: ArticleValidationIssue[] = [];
  const published = Date.parse(article.publishedAt);
  const updated = Date.parse(article.updatedAt);

  if (Number.isNaN(published)) {
    issues.push({
      code: 'invalid_date',
      field: 'publishedAt',
      detail: 'publishedAt is not a valid ISO date',
    });
  }
  if (Number.isNaN(updated)) {
    issues.push({
      code: 'invalid_date',
      field: 'updatedAt',
      detail: 'updatedAt is not a valid ISO date',
    });
  }
  if (
    !Number.isNaN(published) &&
    !Number.isNaN(updated) &&
    updated < published
  ) {
    issues.push({
      code: 'invalid_date',
      field: 'updatedAt',
      detail: 'updatedAt cannot be earlier than publishedAt',
    });
  }
  if (
    article.showModifiedDate &&
    !Number.isNaN(published) &&
    !Number.isNaN(updated) &&
    updated === published
  ) {
    issues.push({
      code: 'invalid_date',
      field: 'showModifiedDate',
      detail:
        'showModifiedDate is true but updatedAt equals publishedAt — no meaningful revision',
    });
  }

  return issues;
}

export function validateArticleImages(
  article: Pick<LearnArticleRecord | PublicLearnArticle, 'featuredImage' | 'blocks'>,
): ArticleValidationIssue[] {
  const issues: ArticleValidationIssue[] = [];

  const checkImage = (
    image: { src: string; alt: string; width: number; height: number; decorative?: boolean },
    field: string,
  ) => {
    if (!image.src.startsWith('/')) {
      issues.push({
        code: 'invalid_image',
        field,
        detail: 'External hotlinked images are not permitted — use local /public assets',
      });
    }
    if (!image.decorative && !image.alt.trim()) {
      issues.push({
        code: 'invalid_image',
        field,
        detail: 'Non-decorative images require alt text',
      });
    }
    if (!image.width || !image.height) {
      issues.push({
        code: 'invalid_image',
        field,
        detail: 'Images require width and height',
      });
    }
  };

  if (article.featuredImage) {
    checkImage(article.featuredImage, 'featuredImage');
  }

  for (const block of article.blocks) {
    if (block.type === 'image' || block.type === 'figure') {
      checkImage(block.image, block.id);
    }
  }

  return issues;
}

export function isArticlePubliclyRenderable(
  slug: string,
): { ok: true; article: PublicLearnArticle } | { ok: false; reason: string } {
  const article = getPublishedArticleBySlug(slug);
  if (!article) {
    return { ok: false, reason: 'Article is missing, draft, or unpublished' };
  }
  return { ok: true, article };
}

/** Preview gate — requires LEARN_ARTICLE_PREVIEW_SECRET or an author/admin session. */
export function canAccessArticlePreview(token: string | null | undefined): boolean {
  const secret = process.env.LEARN_ARTICLE_PREVIEW_SECRET?.trim();
  if (!secret || !token) return false;
  return token === secret;
}

export function prepareArticleForRender(
  article: PublicLearnArticle,
): {
  article: PublicLearnArticle;
  toc: LearnTocItem[];
  blocks: ArticleContentBlock[];
  issues: ArticleValidationIssue[];
} {
  const { blocks: sanitized, issues: sanitizeIssues } = sanitizeArticleContent(
    article.blocks,
  );
  const blocksWithAnchors = withHeadingAnchors(sanitized);
  const { blocks } = applyContextualLinksToBlocks(article, blocksWithAnchors);
  const toc = generateTableOfContents(blocks);
  const issues = [
    ...sanitizeIssues,
    ...validateHeadingHierarchy(blocks),
    ...validateArticleDates(article),
    ...validateArticleImages({ ...article, blocks }),
    ...validateArticleLinks({ ...article, blocks }),
  ];

  if (!getAuthorById(article.authorId)) {
    issues.push({
      code: 'missing_author',
      field: 'authorId',
      detail: 'Author record is missing — do not fabricate credentials',
    });
  }

  if (!article.featuredImage) {
    issues.push({
      code: 'missing_featured_image',
      field: 'featuredImage',
      detail: 'Featured image is missing',
    });
  }

  return {
    article: { ...article, blocks },
    toc,
    blocks,
    issues,
  };
}
