/**
 * SEO Asset Generator — Document 16.03.
 */

import { SEO_PRODUCTION_DOMAIN } from '@/config/seo';
import { learnArticlePath } from '@/config/routes';
import { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';
import type { ArticleBrief } from '@/types/content-plan';
import type {
  AssetValidationIssue,
  ContentPublishState,
  FaqAssets,
  SchemaAssets,
  SeoAssets,
} from '@/types/content-assets';

const KEYWORD_STUFF_PATTERN = /([a-z0-9]+(?:\s+\1){3,})/i;

export function estimateReadingTime(text: string): number {
  return estimateReadingTimeMinutes(text);
}

export function generateOpenGraph(
  brief: ArticleBrief,
  options: { image?: string | null; canonicalUrl: string },
): SeoAssets['openGraph'] {
  return {
    title: `${brief.workingTitle} | NovaLikes Learn`,
    description: brief.shortAnswer.slice(0, 200),
    url: options.canonicalUrl,
    type: 'article',
    image: options.image ?? null,
    imageWidth: 1200,
    imageHeight: 630,
  };
}

export function generateTwitterCard(
  brief: ArticleBrief,
  options: { image?: string | null },
): SeoAssets['twitter'] {
  return {
    card: 'summary_large_image',
    title: `${brief.workingTitle} | NovaLikes Learn`,
    description: brief.shortAnswer.slice(0, 200),
    image: options.image ?? null,
  };
}

export function generateArticleSchema(
  brief: ArticleBrief,
  seo: SeoAssets,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: brief.workingTitle,
    description: seo.metaDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.canonicalUrl,
    },
    author: brief.authorId
      ? { '@type': 'Person', name: brief.authorId }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'NovaLikes',
      url: SEO_PRODUCTION_DOMAIN,
    },
    datePublished: seo.publishState === 'published' ? seo.sitemap.lastModified : undefined,
    dateModified: seo.sitemap.lastModified ?? undefined,
    image: seo.openGraph.image ? [seo.openGraph.image] : undefined,
    articleSection: brief.category,
    keywords: [seo.primaryKeyword, ...seo.secondaryKeywords].join(', '),
  };
}

export function generateFaqSchema(faq: FaqAssets): Record<string, unknown> | null {
  const eligible = faq.items.filter(
    (item) => item.schemaEligible && item.question.trim() && item.answer.trim(),
  );
  if (eligible.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eligible.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateFaqAssets(brief: ArticleBrief): FaqAssets {
  return {
    slug: brief.slug,
    items: brief.faqOpportunities.map((question, index) => ({
      id: `faq-${index + 1}`,
      question,
      answer: '',
      schemaEligible: false,
    })),
  };
}

export type GenerateSeoAssetsInput = {
  brief: ArticleBrief;
  publishState?: ContentPublishState;
  bodyText?: string;
  ogImage?: string | null;
  tags?: string[];
  lastModified?: string | null;
};

export function generateSeoAssets(input: GenerateSeoAssetsInput): {
  seo: SeoAssets;
  faq: FaqAssets;
  schema: SchemaAssets;
} {
  const publishState = input.publishState ?? 'draft';
  const isLive = publishState === 'published';
  const canonicalPath = learnArticlePath(input.brief.slug);
  const canonicalUrl = `${SEO_PRODUCTION_DOMAIN}${canonicalPath}`;
  const readingSource =
    input.bodyText?.trim() ||
    [input.brief.shortAnswer, ...input.brief.proposedH2s, ...input.brief.keyTakeaways].join(
      ' ',
    );
  const readingTimeMinutes = estimateReadingTime(readingSource);
  const image = input.ogImage ?? null;

  const seo: SeoAssets = {
    slug: input.brief.slug,
    metaTitle: `${input.brief.workingTitle} | Learn | NovaLikes`,
    metaDescription:
      input.brief.shortAnswer.length >= 40
        ? input.brief.shortAnswer.slice(0, 160)
        : `${input.brief.shortAnswer} Practical guidance for NovaLikes Learn readers.`,
    canonicalPath,
    canonicalUrl,
    robots: {
      index: isLive,
      follow: isLive,
    },
    openGraph: generateOpenGraph(input.brief, { image, canonicalUrl }),
    twitter: generateTwitterCard(input.brief, { image }),
    primaryKeyword: input.brief.primaryKeyword,
    secondaryKeywords: [...input.brief.secondaryKeywords],
    readingTimeMinutes,
    category: input.brief.category,
    tags: input.tags ?? [...input.brief.secondaryKeywords.slice(0, 3)],
    publishState,
    sitemap: {
      eligible: isLive,
      lastModified: isLive ? (input.lastModified ?? new Date().toISOString()) : null,
      changefreq: 'monthly',
      priority: input.brief.priority === 'P1' ? 0.8 : 0.6,
    },
  };

  const faq = generateFaqAssets(input.brief);
  const schema: SchemaAssets = {
    slug: input.brief.slug,
    article: generateArticleSchema(input.brief, seo),
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Learn',
          item: `${SEO_PRODUCTION_DOMAIN}/learn`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: input.brief.category,
          item: `${SEO_PRODUCTION_DOMAIN}/learn/${input.brief.category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: input.brief.workingTitle,
          item: canonicalUrl,
        },
      ],
    },
    faq: generateFaqSchema(faq),
  };

  return { seo, faq, schema };
}

export function validateSeoAssets(
  seo: SeoAssets,
  options: { peers?: SeoAssets[] } = {},
): AssetValidationIssue[] {
  const issues: AssetValidationIssue[] = [];

  if (!seo.metaTitle.trim()) {
    issues.push({
      severity: 'blocker',
      code: 'missing_title',
      field: 'metaTitle',
      message: 'Meta title is required.',
    });
  }
  if (!seo.metaDescription.trim() || seo.metaDescription.length < 40) {
    issues.push({
      severity: 'blocker',
      code: 'missing_description',
      field: 'metaDescription',
      message: 'Meta description must be substantive.',
    });
  }
  if (!seo.canonicalPath.startsWith('/learn/')) {
    issues.push({
      severity: 'blocker',
      code: 'missing_canonical',
      field: 'canonicalPath',
      message: 'Canonical must be a self-referencing /learn/{slug} path.',
    });
  }
  if (seo.canonicalPath !== learnArticlePath(seo.slug)) {
    issues.push({
      severity: 'error',
      code: 'canonical_mismatch',
      field: 'canonicalPath',
      message: 'Canonical does not match article slug.',
    });
  }
  if (KEYWORD_STUFF_PATTERN.test(seo.metaTitle) || KEYWORD_STUFF_PATTERN.test(seo.metaDescription)) {
    issues.push({
      severity: 'error',
      code: 'keyword_stuffing',
      message: 'Possible keyword stuffing detected in metadata.',
    });
  }
  if (seo.publishState !== 'published' && seo.robots.index) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_robots',
      field: 'robots',
      message: 'Draft/scheduled assets must be noindex.',
    });
  }
  if (seo.publishState === 'published' && !seo.openGraph.image) {
    issues.push({
      severity: 'error',
      code: 'missing_og_image',
      field: 'openGraph.image',
      message: 'Published articles require an Open Graph image.',
    });
  }
  if (seo.sitemap.eligible && seo.publishState !== 'published') {
    issues.push({
      severity: 'blocker',
      code: 'invalid_sitemap_eligibility',
      field: 'sitemap',
      message: 'Sitemap eligibility requires published state.',
    });
  }

  const peers = options.peers ?? [];
  for (const peer of peers) {
    if (peer.slug === seo.slug) continue;
    if (peer.metaTitle === seo.metaTitle) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_title',
        field: 'metaTitle',
        message: `Duplicate meta title with "${peer.slug}".`,
      });
    }
    if (peer.metaDescription === seo.metaDescription) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_description',
        field: 'metaDescription',
        message: `Duplicate meta description with "${peer.slug}".`,
      });
    }
  }

  try {
    JSON.stringify(seo);
  } catch {
    issues.push({
      severity: 'blocker',
      code: 'invalid_json',
      message: 'SEO assets are not JSON-serializable.',
    });
  }

  return issues;
}
