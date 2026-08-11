/**
 * Editorial QA System tests — Document 15.09.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import {
  EditorialWarnings,
  QAIssueList,
  QAStatusBadge,
  QASummaryCard,
  QAValidationChecklist,
} from '@/components/learn/qa';
import type { PublicAuthor } from '@/types/author';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';
import type { LearnArticleRecordMutable } from '@/types/learn-editorial';

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

vi.mock('@/lib/authors', () => ({
  getAuthorById: (id: string) => (id === 'author-1' ? mockAuthor : undefined),
}));

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
  publishArticle,
  runArticleQA,
  validateAccessibility,
  validateContent,
  validateImages,
  validateLinks,
  validateSEO,
} from '@/lib/learn';

function makeBlocks(): ArticleContentBlock[] {
  return [
    {
      id: 'h2-1',
      type: 'heading',
      headingLevel: 2,
      text: 'Building sustainable habits',
      order: 1,
    },
    {
      id: 'p-1',
      type: 'paragraph',
      text: 'Creators who publish consistently learn faster than those who chase overnight spikes. Focus on audience research, clear packaging, and iterative improvement across each upload cycle.',
      order: 2,
    },
    {
      id: 'h2-2',
      type: 'heading',
      headingLevel: 2,
      text: 'Measuring progress',
      order: 3,
    },
    {
      id: 'p-2',
      type: 'paragraph',
      text: 'Track retention, saves, and returning viewers instead of vanity metrics alone. Pair qualitative comments with a simple weekly review so strategy stays grounded in evidence.',
      order: 4,
    },
  ];
}

function makeArticle(
  overrides: Partial<LearnArticleRecordMutable> = {},
): LearnArticleRecordMutable {
  return {
    id: 'art-qa-1',
    slug: 'youtube-growth-habits',
    title: 'YouTube Growth Habits',
    excerpt:
      'Practical habits for sustainable YouTube channel growth without unsupported shortcuts.',
    content:
      'Creators who publish consistently learn faster than those who chase overnight spikes.',
    blocks: makeBlocks(),
    category: 'guides',
    tags: ['followers', 'engagement'],
    authorId: 'author-1',
    featuredImage: {
      src: '/og-default.png',
      alt: 'Abstract NovaLikes branded cover',
      width: 1600,
      height: 900,
    },
    readingTime: 4,
    publishedAt: '2026-06-01T00:00:00.000Z',
    updatedAt: '2026-06-01T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title: 'YouTube Growth Habits | Learn | NovaLikes',
      description:
        'Practical YouTube growth habits for creators who want sustainable channel progress over time.',
      canonicalPath: '/learn/youtube-growth-habits',
    },
    relatedServices: ['buy-instagram-followers'],
    relatedArticles: ['instagram-profile-checklist'],
    featured: false,
    published: false,
    status: 'approved',
    seoReviewed: true,
    contentReviewed: true,
    keyTakeaways: [
      'Publish on a realistic cadence',
      'Review retention weekly',
      'Avoid unsupported growth claims',
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Who is this for?',
        answer: 'Creators building consistent publishing habits.',
        schemaEligible: true,
      },
    ],
    serviceCta: {
      serviceSlug: 'buy-instagram-followers',
      label: 'Explore Instagram Followers Packages',
    },
    ...overrides,
  };
}

describe('Editorial QA System', () => {
  it('passes successful QA for a complete article', () => {
    const report = runArticleQA(makeArticle(), { peers: [] });

    expect(report.canPublish).toBe(true);
    expect(report.counts.blocker).toBe(0);
    expect(report.counts.error).toBe(0);
    expect(report.passed).toBe(true);
    expect(['passed', 'requires_review']).toContain(report.status);
    expect(report.checklist.every((item) => !item.required || item.passed)).toBe(
      true,
    );
  });

  it('fails QA when required fields are missing', () => {
    const report = runArticleQA(
      makeArticle({
        title: '',
        seo: { title: '', description: '' },
        seoReviewed: false,
        contentReviewed: false,
        tags: [],
        relatedArticles: [],
        featuredImage: undefined,
        authorId: '',
      }),
      { peers: [] },
    );

    expect(report.canPublish).toBe(false);
    expect(report.status).toBe('failed');
    expect(report.counts.blocker).toBeGreaterThan(0);
    expect(report.issues.some((i) => i.code === 'missing_h1')).toBe(true);
  });

  it('flags missing metadata', () => {
    const issues = validateSEO(
      makeArticle({
        seo: { title: '', description: 'short' },
        seoReviewed: false,
      }),
      { peers: [] },
    );

    expect(issues.some((i) => i.code === 'missing_meta_title')).toBe(true);
    expect(issues.some((i) => i.code === 'missing_meta_description')).toBe(true);
    expect(issues.some((i) => i.code === 'seo_not_reviewed')).toBe(true);
  });

  it('flags broken and insecure links', () => {
    const issues = validateLinks(
      makeArticle({
        relatedServices: ['not-a-real-service'],
        serviceCta: undefined,
        blocks: [
          ...makeBlocks(),
          {
            id: 'cta-bad',
            type: 'internal_cta',
            href: 'http://example.com/insecure',
            label: 'Click',
            order: 9,
          },
        ],
      }),
    );

    expect(issues.some((i) => i.code === 'invalid_service')).toBe(true);
    expect(issues.some((i) => i.code === 'insecure_external_link')).toBe(true);
  });

  it('flags missing featured image', () => {
    const issues = validateImages(makeArticle({ featuredImage: undefined }));
    expect(issues.some((i) => i.code === 'missing_featured_image')).toBe(true);
  });

  it('flags accessibility failures for missing alt text', () => {
    const issues = validateAccessibility(
      makeArticle({
        featuredImage: {
          src: '/og-default.png',
          alt: '',
          width: 1600,
          height: 900,
        },
      }),
    );

    expect(
      issues.some(
        (i) =>
          i.code === 'missing_featured_alt' ||
          i.message.toLowerCase().includes('alt'),
      ),
    ).toBe(true);
  });

  it('detects duplicate titles against peers', () => {
    const issues = validateContent(makeArticle(), {
      peers: [
        {
          id: 'art-other',
          slug: 'other-guide',
          title: 'YouTube Growth Habits',
          seo: {
            title: 'Other Guide | Learn | NovaLikes',
            description: 'A different description for the peer article content.',
          },
        },
      ],
    });

    expect(issues.some((i) => i.code === 'duplicate_title')).toBe(true);
    expect(issues.find((i) => i.code === 'duplicate_title')?.severity).toBe(
      'blocker',
    );
  });

  it('blocks publishing when QA blockers exist', () => {
    const article = makeArticle({
      content:
        'This guide promises guaranteed monetization and 10000 followers overnight.',
      blocks: [
        {
          id: 'p-claim',
          type: 'paragraph',
          text: 'Get guaranteed monetization and 5000 followers overnight with this method.',
          order: 1,
        },
      ],
    });

    const qa = runArticleQA(article, { peers: [] });
    expect(qa.canPublish).toBe(false);
    expect(qa.issues.some((i) => i.code === 'unsupported_claim')).toBe(true);

    const published = publishArticle(article);
    expect(published.ok).toBe(false);
    expect(
      published.issues.some(
        (i) =>
          i.severity === 'blocker' &&
          (i.code.includes('qa_') || i.code.includes('editorial_qa')),
      ),
    ).toBe(true);
  });

  it('renders QA UI components', () => {
    const report = runArticleQA(
      makeArticle({ title: '', featuredImage: undefined }),
      { peers: [] },
    );

    expect(
      renderToStaticMarkup(createElement(QAStatusBadge, { status: 'failed' })),
    ).toContain('Failed');
    expect(
      renderToStaticMarkup(createElement(QASummaryCard, { report })),
    ).toContain('Blocked');
    expect(
      renderToStaticMarkup(createElement(QAIssueList, { issues: report.issues })),
    ).toContain('blocker');
    expect(
      renderToStaticMarkup(
        createElement(QAValidationChecklist, { items: report.checklist }),
      ),
    ).toContain('One H1');
    expect(
      renderToStaticMarkup(
        createElement(EditorialWarnings, {
          issues: [
            {
              severity: 'warning',
              area: 'readability',
              code: 'low_word_count',
              message: 'Body appears very short',
            },
          ],
        }),
      ),
    ).toContain('Editorial warnings');
  });
});
