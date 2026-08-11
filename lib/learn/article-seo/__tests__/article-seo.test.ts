/**
 * Article SEO & Schema Engine tests — Document 15.07.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { LearnArticleRecord } from '@/types/learn';
import type { ArticleSeoRecord } from '@/types/learn-article-seo';
import type { PublicAuthor } from '@/types/author';

const mockAuthor: PublicAuthor = {
  id: 'author-1',
  slug: 'jordan-lee',
  name: 'Jordan Lee',
  role: 'Content Strategist',
  bio: 'Jordan writes NovaLikes Learn guides on social growth topics.',
  expertise: ['Instagram'],
  joinedAt: '2024-01-01T00:00:00.000Z',
  active: true,
  featured: false,
  seo: {
    title: 'Jordan Lee',
    description: 'Author profile',
    canonicalPath: '/authors/jordan-lee',
  },
  articleCount: 1,
  profilePath: '/authors/jordan-lee',
};

vi.mock('@/lib/authors/getters', () => ({
  getAuthorById: (id: string) => (id === 'author-1' ? mockAuthor : undefined),
  getAuthorBySlug: () => undefined,
  getActiveAuthors: () => [mockAuthor],
  getFeaturedAuthors: () => [],
  getAuthorArticles: () => [],
  getAuthorRelatedCategories: () => [],
  getAuthorsForCategory: () => [],
  getAuthorProfilePath: (slug: string) => `/authors/${slug}`,
  getAllAuthorSlugsForStaticParams: () => [],
  getAuthorRecordById: () => undefined,
  getAuthorRecordBySlug: () => undefined,
}));

import {
  buildArticleAuthorSchema,
  buildArticleCanonical,
  buildArticleFaqSchema,
  buildArticleMetadata,
  buildArticleOpenGraph,
  buildArticleSchema,
  buildArticleTwitter,
  buildPreviewArticleMetadata,
  findArticleKeywordConflicts,
  findDuplicateArticleMetadata,
  getIndexableArticles,
  sanitizeJsonLdText,
  toArticleSeoRecord,
  validateArticleCanonical,
  validateArticleDates,
  validateArticleImage,
  validateArticleSchema,
  validateArticleSeo,
} from '@/lib/learn/article-seo';

function makeSeo(overrides: Partial<ArticleSeoRecord> = {}): ArticleSeoRecord {
  return {
    title: 'YouTube Growth Guide',
    metaTitle: 'YouTube Growth Guide | NovaLikes Learn',
    metaDescription:
      'Practical YouTube growth habits for creators who want sustainable channel progress.',
    canonicalPath: '/learn/youtube-growth-guide',
    openGraphTitle: 'YouTube Growth Guide | NovaLikes Learn',
    openGraphDescription:
      'Practical YouTube growth habits for creators who want sustainable channel progress.',
    openGraphImage: '/og-default.png',
    twitterTitle: 'YouTube Growth Guide | NovaLikes Learn',
    twitterDescription:
      'Practical YouTube growth habits for creators who want sustainable channel progress.',
    twitterImage: '/og-default.png',
    robots: { index: true, follow: true },
    primaryKeyword: 'youtube growth',
    secondaryKeywords: ['youtube', 'creators'],
    articleSection: 'YouTube',
    publishedAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
    showModifiedDate: false,
    featuredImage: {
      src: '/og-default.png',
      alt: 'YouTube growth guide cover',
      width: 1200,
      height: 630,
    },
    authorId: 'author-1',
    schemaType: 'Article',
    faqIds: [],
    active: true,
    published: true,
    noindex: false,
    slug: 'youtube-growth-guide',
    articleId: 'yt-1',
    categoryId: 'youtube',
    tags: ['subscribers', 'analytics'],
    excerpt: 'A practical overview of YouTube growth fundamentals.',
    href: '/learn/youtube-growth-guide',
    ...overrides,
  };
}

function makeRecord(
  overrides: Partial<LearnArticleRecord> = {},
): LearnArticleRecord {
  return {
    id: 'yt-1',
    slug: 'youtube-growth-guide',
    title: 'YouTube Growth Guide',
    excerpt: 'A practical overview of YouTube growth fundamentals.',
    content: 'Body',
    blocks: [
      {
        id: 'p-1',
        type: 'paragraph',
        text: 'A practical overview of YouTube growth fundamentals.',
        order: 1,
      },
    ],
    category: 'youtube',
    tags: ['subscribers'],
    authorId: 'author-1',
    featuredImage: {
      src: '/og-default.png',
      alt: 'YouTube growth guide cover',
      width: 1200,
      height: 630,
    },
    readingTime: 5,
    publishedAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title: 'YouTube Growth Guide | NovaLikes Learn',
      description:
        'Practical YouTube growth habits for creators who want sustainable channel progress.',
      canonicalPath: '/learn/youtube-growth-guide',
      keywords: ['youtube growth', 'youtube'],
      ogImage: '/og-default.png',
    },
    relatedServices: [],
    relatedArticles: [],
    featured: false,
    published: true,
    status: 'published',
    faqs: [],
    ...overrides,
  };
}

describe('Article SEO & Schema Engine — Document 15.07', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds valid published article metadata', () => {
    const metadata = buildArticleMetadata(makeSeo());
    expect(metadata.title).toEqual({
      absolute: 'YouTube Growth Guide | NovaLikes Learn',
    });
    expect(metadata.description).toContain('YouTube growth');
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it('uses a unique self-referencing canonical', () => {
    expect(buildArticleCanonical('YouTube-Growth-Guide')).toBe(
      'https://novalikes.com/learn/youtube-growth-guide',
    );
    const metadata = buildArticleMetadata(makeSeo());
    expect(metadata.alternates?.canonical).toBe(
      'https://novalikes.com/learn/youtube-growth-guide',
    );
    expect(validateArticleCanonical('youtube-growth-guide', '/learn')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'canonical_not_self' }),
      ]),
    );
  });

  it('builds Open Graph article metadata', () => {
    const og = buildArticleOpenGraph(makeSeo(), {
      authorUrl: 'https://novalikes.com/authors/jordan-lee',
      articleSection: 'YouTube',
    }) as Record<string, unknown>;
    expect(og.type).toBe('article');
    expect(og.url).toBe('https://novalikes.com/learn/youtube-growth-guide');
    expect(og.publishedTime).toBe('2024-06-01T00:00:00.000Z');
    const images = og.images as Array<{ width: number; height: number }>;
    expect(images[0]?.width).toBe(1200);
    expect(images[0]?.height).toBe(630);
  });

  it('builds Twitter summary_large_image without inventing a handle', () => {
    const twitter = buildArticleTwitter(makeSeo()) as Record<string, unknown>;
    expect(twitter.card).toBe('summary_large_image');
    expect(twitter).not.toHaveProperty('site');
  });

  it('builds Article schema with Person author and Organization publisher', () => {
    const schemas = buildArticleSchema(makeSeo());
    const article = schemas.find((item) => item['@type'] === 'Article');
    expect(article).toBeDefined();
    expect(article?.author).toMatchObject({
      '@type': 'Person',
      name: 'Jordan Lee',
    });
    expect(JSON.stringify(article?.author)).not.toContain('email');
    expect(article?.publisher).toMatchObject({
      '@type': 'Organization',
      name: expect.any(String),
    });
    expect(article).not.toHaveProperty('aggregateRating');
  });

  it('builds Person author schema without private email', () => {
    const person = buildArticleAuthorSchema('author-1');
    expect(person?.['@type']).toBe('Person');
    expect(person).not.toHaveProperty('email');
    expect(buildArticleAuthorSchema('missing')).toBeNull();
  });

  it('includes FAQ schema only when visible and schemaEligible', () => {
    const visible = buildArticleFaqSchema([
      {
        id: '1',
        question: 'How do I start?',
        answer: 'Begin with a consistent posting habit.',
        schemaEligible: true,
      },
    ]);
    expect(visible?.['@type']).toBe('FAQPage');

    const hidden = buildArticleFaqSchema([
      {
        id: '2',
        question: 'Hidden?',
        answer: 'No schema.',
        schemaEligible: false,
      },
    ]);
    expect(hidden).toBeNull();
  });

  it('forces noindex for drafts and previews', () => {
    const draft = buildArticleMetadata(
      makeSeo({ published: false, active: false, robots: { index: false, follow: false } }),
    );
    expect(draft.robots).toMatchObject({ index: false, follow: false });

    const preview = buildPreviewArticleMetadata('draft-slug');
    expect(preview.robots).toMatchObject({ index: false, follow: false });

    const forced = buildArticleMetadata(makeSeo(), { preview: true });
    expect(forced.robots).toMatchObject({ index: false, follow: false });
  });

  it('excludes future-scheduled articles from indexability', () => {
    const future = makeSeo({
      scheduledFor: '2099-01-01T00:00:00.000Z',
    });
    const metadata = buildArticleMetadata(future);
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
  });

  it('validates published and modified date rules', () => {
    expect(validateArticleDates(makeSeo())).toHaveLength(0);
    const bad = validateArticleDates(
      makeSeo({
        publishedAt: '2024-06-01T00:00:00.000Z',
        updatedAt: '2024-05-01T00:00:00.000Z',
      }),
    );
    expect(bad.some((i) => i.code === 'updated_before_published')).toBe(true);

    const warn = validateArticleDates(
      makeSeo({
        showModifiedDate: true,
        updatedAt: '2024-06-01T00:00:00.000Z',
      }),
    );
    expect(warn.some((i) => i.code === 'modified_date_same_as_published')).toBe(
      true,
    );
  });

  it('flags missing author and missing featured image', () => {
    const missingAuthor = validateArticleSchema(
      makeSeo({ authorId: 'missing-author' }),
    );
    expect(missingAuthor.some((i) => i.code === 'missing_author_entity')).toBe(
      true,
    );

    const missingImage = validateArticleImage(
      makeSeo({ featuredImage: undefined }),
    );
    expect(missingImage.some((i) => i.code === 'missing_featured_image')).toBe(
      true,
    );
  });

  it('detects duplicate canonicals, titles, and keyword conflicts', () => {
    const articles = [
      makeRecord(),
      makeRecord({
        id: 'yt-2',
        slug: 'youtube-growth-guide-copy',
        seo: {
          title: 'YouTube Growth Guide | NovaLikes Learn',
          description:
            'Practical YouTube growth habits for creators who want sustainable channel progress.',
          canonicalPath: '/learn/youtube-growth-guide',
          keywords: ['youtube growth'],
        },
      }),
    ];
    const duplicates = findDuplicateArticleMetadata(articles);
    expect(duplicates.duplicateTitles.length).toBeGreaterThan(0);
    expect(duplicates.duplicateCanonicals.length).toBeGreaterThan(0);

    const conflicts = findArticleKeywordConflicts(articles);
    expect(conflicts.some((c) => c.primaryKeyword === 'youtube growth')).toBe(
      true,
    );
  });

  it('excludes incomplete articles from sitemap eligibility', () => {
    const indexable = getIndexableArticles([
      makeRecord({ authorId: 'missing' }),
      makeRecord({ published: false, status: 'draft' }),
    ]);
    expect(indexable).toHaveLength(0);
  });

  it('protects JSON-LD from script injection', () => {
    const cleaned = sanitizeJsonLdText('<script>alert(1)</script>Safe text');
    expect(cleaned).not.toContain('<script');
    expect(cleaned).toContain('Safe text');

    const schemas = buildArticleSchema(
      makeSeo({
        title: 'Safe <script>nope</script> Title',
        excerpt: 'Clean excerpt',
      }),
    );
    expect(JSON.stringify(schemas)).not.toContain('<script');
  });

  it('does not invent YouTube monetization guarantees in schema', () => {
    const schemas = buildArticleSchema(
      makeSeo({
        title: 'YouTube Subscribers Guide',
        metaDescription:
          'Learn sustainable YouTube growth without guaranteed monetization claims.',
      }),
    );
    const serialized = JSON.stringify(schemas).toLowerCase();
    expect(serialized).not.toContain('guaranteed income');
    expect(serialized).not.toContain('aggregaterating');
    expect(serialized).not.toContain('"@type":"review"');
  });

  it('maps registry records into the SEO model', () => {
    const seo = toArticleSeoRecord(makeRecord());
    expect(seo.metaTitle).toContain('YouTube Growth Guide');
    expect(seo.primaryKeyword).toBe('youtube growth');
    expect(seo.canonicalPath).toBe('/learn/youtube-growth-guide');
  });

  it('reports SEO validation for a complete published article', () => {
    const result = validateArticleSeo(makeSeo());
    expect(result.issues.some((i) => i.severity === 'blocker')).toBe(false);
    expect(result.indexable).toBe(true);
  });
});
