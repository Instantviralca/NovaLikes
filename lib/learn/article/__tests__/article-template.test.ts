/**
 * Article Template System tests — Document 15.02.
 * Fixtures live only in tests — production LEARN_ARTICLES stays empty.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ArticleContent } from '@/components/learn/article/ArticleContent';
import { ArticleFAQ } from '@/components/learn/article/ArticleFAQ';
import { ArticleHero } from '@/components/learn/article/ArticleHero';
import { ArticlePage } from '@/components/learn/article/ArticlePage';
import { RelatedArticles } from '@/components/learn/article/RelatedArticles';
import { AuthorBox } from '@/components/learn/article/AuthorBox';
import {
  calculateReadingTime,
  canAccessArticlePreview,
  createHeadingId,
  generateTableOfContents,
  getArticleMetadata,
  getArticleRelatedLinks,
  getArticleSchema,
  getPublishedArticleBySlug,
  isArticlePubliclyRenderable,
  prepareArticleForRender,
  sanitizeArticleContent,
  validateArticleDates,
  validateArticleImages,
  validateArticleLinks,
  validateHeadingHierarchy,
  withHeadingAnchors,
} from '@/lib/learn/article';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { PublicLearnArticle } from '@/types/learn';

function makeArticle(
  overrides: Partial<PublicLearnArticle> = {},
): PublicLearnArticle {
  const blocks: ArticleContentBlock[] = overrides.blocks ?? [
    {
      id: 'h2-1',
      type: 'heading',
      headingLevel: 2,
      text: 'Getting started',
      order: 1,
    },
    {
      id: 'p-1',
      type: 'paragraph',
      text: 'A short paragraph about growth habits for creators.',
      order: 2,
    },
    {
      id: 'h3-1',
      type: 'heading',
      headingLevel: 3,
      text: 'First steps',
      order: 3,
    },
    {
      id: 'p-2',
      type: 'paragraph',
      text: 'More practical detail for the subsection.',
      order: 4,
    },
  ];

  return {
    id: 'test-article-1',
    slug: 'test-growth-guide',
    title: 'Test Growth Guide',
    excerpt: 'A test excerpt for the article template.',
    content: 'A short paragraph about growth habits for creators.',
    blocks,
    category: 'guides',
    categoryName: 'Guides',
    tags: ['guides'],
    authorId: 'missing-author',
    featuredImage: {
      src: '/og-default.png',
      alt: 'Abstract NovaLikes branded cover',
      width: 1600,
      height: 900,
    },
    readingTime: 3,
    publishedAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-15T00:00:00.000Z',
    showModifiedDate: true,
    seo: {
      title: 'Test Growth Guide | Learn | NovaLikes',
      description: 'A test excerpt for the article template.',
      canonicalPath: '/learn/test-growth-guide',
    },
    relatedServices: ['buy-instagram-followers'],
    relatedArticles: ['other-article'],
    featured: false,
    href: '/learn/test-growth-guide',
    keyTakeaways: ['Takeaway one', 'Takeaway two', 'Takeaway three'],
    faqs: [
      {
        id: 'faq-1',
        question: 'Who is this for?',
        answer: 'Creators learning foundational habits.',
        schemaEligible: true,
      },
    ],
    serviceCta: {
      serviceSlug: 'buy-instagram-followers',
      label: 'Explore Instagram Followers Packages',
    },
    status: 'published',
    ...overrides,
  };
}

describe('Article Template System', () => {
  it('renders a published article template with one H1', () => {
    const article = makeArticle();
    const html = renderToStaticMarkup(
      createElement(ArticlePage, { article }),
    );
    expect(html).toContain('Test Growth Guide');
    expect(html.match(/<h1\b/g)?.length).toBe(1);
    expect(html).toContain('data-learn-article');
    expect(html).toContain('At a glance');
    expect(html).not.toContain('Browse growth services');
    expect(html).not.toContain('Explore Services');
    expect(html).not.toContain('article-related-services');
  });

  it('renders a mid-article service cluster without pricing cards', () => {
    const html = renderToStaticMarkup(
      createElement(ArticleContent, {
        blocks: [
          {
            id: 'cta-cluster',
            type: 'service_cluster_cta',
            order: 1,
            heading: 'Compare TikTok Growth Options',
            text: 'Followers, likes and views measure different parts of a TikTok presence.',
            serviceSlugs: [
              'buy-tiktok-followers',
              'buy-tiktok-likes',
              'buy-tiktok-views',
            ],
          },
        ],
      }),
    );
    expect(html).toContain('Compare TikTok Growth Options');
    expect(html).toContain('/buy-tiktok-followers');
    expect(html).toContain('/buy-tiktok-likes');
    expect(html).toContain('/buy-tiktok-views');
    expect(html).not.toContain('guaranteed growth');
    expect(html).not.toContain('$');
  });

  it('does not expose drafts via public getters', () => {
    expect(getPublishedArticleBySlug('any-draft')).toBeUndefined();
    expect(isArticlePubliclyRenderable('missing-slug').ok).toBe(false);
  });

  it('validates heading hierarchy and generates TOC', () => {
    const blocks = withHeadingAnchors(makeArticle().blocks);
    const toc = generateTableOfContents(blocks);
    expect(toc).toHaveLength(1);
    expect(toc[0]?.level).toBe(2);
    expect(toc[0]?.label).toBe('Getting started');
    expect(toc.some((item) => item.level === 3)).toBe(false);
    expect(validateHeadingHierarchy(blocks)).toHaveLength(0);
  });

  it('detects duplicate heading IDs', () => {
    const blocks: ArticleContentBlock[] = [
      {
        id: 'a',
        type: 'heading',
        headingLevel: 2,
        text: 'Same',
        anchorId: 'same',
        order: 1,
      },
      {
        id: 'b',
        type: 'heading',
        headingLevel: 2,
        text: 'Same again',
        anchorId: 'same',
        order: 2,
      },
    ];
    const issues = validateHeadingHierarchy(blocks);
    expect(issues.some((issue) => issue.code === 'duplicate_heading_id')).toBe(
      true,
    );
  });

  it('creates unique heading ids', () => {
    const used = new Set<string>();
    const first = createHeadingId('Getting Started', used);
    const second = createHeadingId('Getting Started', used);
    expect(first).toBe('getting-started');
    expect(second).toBe('getting-started-2');
  });

  it('calculates reading time from text and blocks', () => {
    expect(calculateReadingTime('word '.repeat(440))).toBeGreaterThanOrEqual(2);
    expect(calculateReadingTime(makeArticle().blocks)).toBeGreaterThanOrEqual(1);
  });

  it('reports missing author without fabricating data', () => {
    const html = renderToStaticMarkup(
      createElement(AuthorBox, { authorId: 'does-not-exist' }),
    );
    expect(html).toContain('data-author-missing');
    expect(html).not.toContain('Dr.');
  });

  it('allows missing featured image without crashing', () => {
    const article = makeArticle({ featuredImage: undefined });
    const prepared = prepareArticleForRender(article);
    expect(
      prepared.issues.some((issue) => issue.code === 'missing_featured_image'),
    ).toBe(true);
    const html = renderToStaticMarkup(
      createElement(ArticlePage, { article }),
    );
    expect(html).toContain('Test Growth Guide');
  });

  it('excludes the current article from related articles', () => {
    const article = makeArticle({
      relatedArticles: ['test-growth-guide', 'other-article'],
    });
    const related = getArticleRelatedLinks(article).articles;
    expect(related.every((item) => item.slug !== article.slug)).toBe(true);
  });

  it('hides related guides when fewer than two published articles exist', () => {
    const empty = renderToStaticMarkup(
      createElement(RelatedArticles, {
        articles: [makeArticle()],
        currentSlug: 'other',
      }),
    );
    expect(empty).toBe('');
  });

  it('validates related service routes', () => {
    const issues = validateArticleLinks(
      makeArticle({
        relatedServices: ['not-a-real-service'],
        serviceCta: {
          serviceSlug: 'not-a-real-service',
          label: 'Explore Packages',
        },
      }),
    );
    expect(issues.some((issue) => issue.code === 'invalid_service')).toBe(true);
  });

  it('builds article schema and FAQ schema only when FAQs are schema-eligible', () => {
    const withFaq = getArticleSchema(makeArticle(), { includeFaq: true });
    expect(withFaq.some((item) => item['@type'] === 'BlogPosting')).toBe(true);
    expect(withFaq.some((item) => item['@type'] === 'FAQPage')).toBe(true);

    const hiddenFaq = getArticleSchema(
      makeArticle({
        faqs: [
          {
            id: 'faq-hidden',
            question: 'Hidden?',
            answer: 'Not schema eligible.',
            schemaEligible: false,
          },
        ],
      }),
      { includeFaq: true },
    );
    expect(hiddenFaq.some((item) => item['@type'] === 'FAQPage')).toBe(false);

    const withoutFaq = getArticleSchema(makeArticle({ faqs: [] }), {
      includeFaq: false,
    });
    expect(withoutFaq.some((item) => item['@type'] === 'FAQPage')).toBe(false);
  });

  it('matches FAQ schema visibility to rendered FAQ', () => {
    const article = makeArticle();
    const html = renderToStaticMarkup(
      createElement(ArticleFAQ, { items: article.faqs }),
    );
    expect(html).toContain('Who is this for?');
    const empty = renderToStaticMarkup(createElement(ArticleFAQ, { items: [] }));
    expect(empty).toBe('');
  });

  it('uses a self-referencing canonical URL', () => {
    const metadata = getArticleMetadata(makeArticle());
    expect(metadata.alternates?.canonical).toBe(
      'https://novalikes.com/learn/test-growth-guide',
    );
  });

  it('enforces meaningful modified-date logic', () => {
    const ok = validateArticleDates(makeArticle());
    expect(ok).toHaveLength(0);

    const bad = validateArticleDates(
      makeArticle({
        publishedAt: '2026-06-01T00:00:00.000Z',
        updatedAt: '2026-06-01T00:00:00.000Z',
        showModifiedDate: true,
      }),
    );
    expect(bad.some((issue) => issue.code === 'invalid_date')).toBe(true);
  });

  it('sanitizes unsafe HTML-like content from blocks', () => {
    const { blocks, issues } = sanitizeArticleContent([
      {
        id: 'bad',
        type: 'paragraph',
        text: 'Hello <script>alert(1)</script>',
        order: 1,
      },
      {
        id: 'good',
        type: 'paragraph',
        text: 'Safe text only.',
        order: 2,
      },
    ]);
    expect(issues.some((issue) => issue.code === 'unsafe_html')).toBe(true);
    expect(blocks).toHaveLength(1);
    expect(blocks[0]?.id).toBe('good');
  });

  it('wraps tables for responsive overflow', () => {
    const html = renderToStaticMarkup(
      createElement(ArticleContent, {
        blocks: [
          {
            id: 'table-1',
            type: 'data_table',
            order: 1,
            caption: 'Example',
            headers: ['A', 'B'],
            rows: [['1', '2']],
          },
        ],
      }),
    );
    expect(html).toContain('data-article-table');
    expect(html).toContain('overflow-x-auto');
    expect(html).toContain('scope="col"');
  });

  it('rejects invalid external http image sources', () => {
    const issues = validateArticleImages(
      makeArticle({
        featuredImage: {
          src: 'http://evil.example/image.jpg',
          alt: 'Bad',
          width: 1600,
          height: 900,
        },
      }),
    );
    expect(issues.some((issue) => issue.code === 'invalid_image')).toBe(true);
  });

  it('rejects invalid external http links in CTAs', () => {
    const issues = validateArticleLinks(
      makeArticle({
        blocks: [
          {
            id: 'cta-bad',
            type: 'internal_cta',
            order: 1,
            href: 'http://example.com',
            label: 'Explore Instagram Followers Packages',
          },
        ],
      }),
    );
    expect(issues.some((issue) => issue.code === 'invalid_link')).toBe(true);
  });

  it('keeps preview access closed without a configured secret', () => {
    expect(canAccessArticlePreview('anything')).toBe(false);
    expect(canAccessArticlePreview(undefined)).toBe(false);
  });

  it('renders hero with semantic time elements', () => {
    const html = renderToStaticMarkup(
      createElement(ArticleHero, { article: makeArticle() }),
    );
    expect(html).toContain('<time dateTime=');
    expect(html.match(/<h1\b/g)?.length).toBe(1);
  });
});
