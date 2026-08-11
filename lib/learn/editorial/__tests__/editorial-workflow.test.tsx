/**
 * Editorial Publishing Workflow tests — Document 15.08.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import {
  ArticleWorkflowTimeline,
  EditorialChecklist,
  EditorialStatusBadge,
  PublishingValidationSummary,
  ScheduledPublishNotice,
} from '@/components/learn/editorial';
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
  activateScheduledArticles,
  archiveArticle,
  assertPublicArticleAccess,
  buildPublishingEffects,
  canTransitionEditorialStatus,
  getEditorialRobots,
  getEditorialStatus,
  getIndexableArticles,
  getPublishingChecklist,
  isPublicLiveArticle,
  publishArticle,
  scheduleArticle,
  stripEditorialFields,
  updatePublishedArticle,
  validateArticleForPublishing,
  validatePublishingState,
} from '@/lib/learn';
import { toArticleSeoRecord } from '@/lib/learn/article-seo';

function makeBlocks(): ArticleContentBlock[] {
  return [
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
  ];
}

function makeArticle(
  overrides: Partial<LearnArticleRecordMutable> = {},
): LearnArticleRecordMutable {
  return {
    id: 'art-1',
    slug: 'youtube-growth-habits',
    title: 'YouTube Growth Habits',
    excerpt: 'Practical habits for sustainable YouTube channel growth.',
    content: 'A short paragraph about growth habits for creators.',
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
    keyTakeaways: ['Habit one', 'Habit two', 'Habit three'],
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

describe('Editorial Publishing Workflow', () => {
  it('publishes a valid approved article', () => {
    const article = makeArticle();
    const result = publishArticle(article, {
      publishedAt: '2026-07-01T12:00:00.000Z',
    });

    expect(result.ok).toBe(true);
    expect(result.nextStatus).toBe('published');
    expect(result.article?.status).toBe('published');
    expect(result.article?.published).toBe(true);
    expect(result.article?.editorialApproved).toBe(true);
    expect(result.article?.publishedAt).toBe('2026-07-01T12:00:00.000Z');
    expect(result.effects.publicVisible).toBe(true);
    expect(result.effects.sitemapEligible).toBe(true);
    expect(result.effects.robotsIndex).toBe(true);
    expect(isPublicLiveArticle(result.article!)).toBe(true);
  });

  it('blocks publish when validation fails', () => {
    const article = makeArticle({
      title: '',
      seoReviewed: false,
      contentReviewed: false,
      featuredImage: undefined,
      relatedArticles: [],
      tags: [],
    });
    const result = publishArticle(article);

    expect(result.ok).toBe(false);
    expect(result.nextStatus).toBe('approved');
    expect(result.issues.some((i) => i.severity === 'blocker')).toBe(true);
    expect(result.article?.status).toBe('approved');
  });

  it('schedules for a future date and keeps private', () => {
    const article = makeArticle();
    const scheduledAt = '2099-03-01T15:00:00.000Z';
    const result = scheduleArticle(article, { scheduledAt });

    expect(result.ok).toBe(true);
    expect(result.article?.status).toBe('scheduled');
    expect(result.article?.scheduledAt).toBe(scheduledAt);
    expect(result.article?.published).toBe(false);
    expect(result.effects.publicVisible).toBe(false);
    expect(result.effects.sitemapEligible).toBe(false);
    expect(result.effects.robotsIndex).toBe(false);
    expect(isPublicLiveArticle(result.article!)).toBe(false);
    expect(assertPublicArticleAccess(result.article)).toBe(false);
  });

  it('activates scheduled articles when due', () => {
    const scheduled = makeArticle({
      status: 'scheduled',
      published: false,
      scheduledAt: '2026-01-01T00:00:00.000Z',
    });
    const [result] = activateScheduledArticles([scheduled], '2026-01-02T00:00:00.000Z');

    expect(result?.ok).toBe(true);
    expect(result?.article?.status).toBe('published');
    expect(result?.article?.publishedAt).toBe('2026-01-01T00:00:00.000Z');
    expect(result?.effects.sitemapEligible).toBe(true);
  });

  it('protects drafts from public access and indexing', () => {
    const draft = makeArticle({ status: 'draft', published: false });
    expect(isPublicLiveArticle(draft)).toBe(false);
    expect(assertPublicArticleAccess(draft)).toBe(false);
    expect(getEditorialRobots('draft')).toEqual({ index: false, follow: false });
    expect(getIndexableArticles([draft as never])).toEqual([]);
  });

  it('protects archived articles from Learn, sitemap, and robots', () => {
    const live = makeArticle({
      status: 'published',
      published: true,
      editorialApproved: true,
      publishedAt: '2026-06-01T00:00:00.000Z',
    });
    const result = archiveArticle(live);

    expect(result.ok).toBe(true);
    expect(result.article?.status).toBe('archived');
    expect(result.article?.published).toBe(false);
    expect(result.effects.publicVisible).toBe(false);
    expect(result.effects.sitemapEligible).toBe(false);
    expect(result.effects.robotsIndex).toBe(false);
    expect(result.effects.redirectPrepared?.strategy).toBe('manual_future');
    expect(isPublicLiveArticle(result.article!)).toBe(false);
    expect(getIndexableArticles([result.article as never])).toEqual([]);
  });

  it('rejects invalid status transitions', () => {
    expect(canTransitionEditorialStatus('draft', 'published')).toBe(false);
    expect(validatePublishingState('draft', 'published')).toHaveLength(1);
    expect(publishArticle(makeArticle({ status: 'draft' })).ok).toBe(false);
    expect(archiveArticle(makeArticle({ status: 'approved' })).ok).toBe(false);
  });

  it('updates published articles without changing datePublished', () => {
    const live = makeArticle({
      status: 'published',
      published: true,
      editorialApproved: true,
      publishedAt: '2026-06-01T00:00:00.000Z',
      updatedAt: '2026-06-01T00:00:00.000Z',
    });
    const result = updatePublishedArticle(live, {
      updatedAt: '2026-07-10T08:00:00.000Z',
      meaningfulRevision: true,
    });

    expect(result.ok).toBe(true);
    expect(result.article?.status).toBe('updated');
    expect(result.article?.publishedAt).toBe('2026-06-01T00:00:00.000Z');
    expect(result.article?.updatedAt).toBe('2026-07-10T08:00:00.000Z');
    expect(result.article?.showModifiedDate).toBe(true);
    expect(result.effects.relatedArticlesDirty).toBe(true);
    expect(result.effects.sitemapEligible).toBe(true);
    expect(isPublicLiveArticle(result.article!)).toBe(true);
  });

  it('preserves canonical across publish and update', () => {
    const article = makeArticle();
    const published = publishArticle(article);
    expect(published.ok).toBe(true);
    const seo = toArticleSeoRecord(published.article as never);
    expect(seo.canonicalPath).toBe('/learn/youtube-growth-habits');

    const updated = updatePublishedArticle(published.article!, {
      updatedAt: '2026-08-01T00:00:00.000Z',
    });
    expect(updated.ok).toBe(true);
    const updatedSeo = toArticleSeoRecord(updated.article as never);
    expect(updatedSeo.canonicalPath).toBe('/learn/youtube-growth-habits');
  });

  it('updates sitemap and robots effects for live vs non-live states', () => {
    const publishedEffects = buildPublishingEffects('published', {
      slug: 'a',
      category: 'guides',
      editorialApproved: true,
    });
    const unapprovedPublished = buildPublishingEffects('published', {
      slug: 'a',
      category: 'guides',
      editorialApproved: false,
    });
    const scheduledEffects = buildPublishingEffects('scheduled', {
      slug: 'a',
      category: 'guides',
    });
    const archivedEffects = buildPublishingEffects('archived', {
      slug: 'a',
      category: 'guides',
    });

    expect(publishedEffects.sitemapEligible).toBe(true);
    expect(publishedEffects.robotsIndex).toBe(true);
    expect(unapprovedPublished.sitemapEligible).toBe(false);
    expect(unapprovedPublished.publicVisible).toBe(false);
    expect(scheduledEffects.sitemapEligible).toBe(false);
    expect(getEditorialRobots('scheduled')).toEqual({
      index: false,
      follow: false,
    });
    expect(archivedEffects.sitemapEligible).toBe(false);
    expect(archivedEffects.robotsIndex).toBe(false);
  });

  it('strips private editorial fields from public projections', () => {
    const article = makeArticle({
      reviewNotes: 'Needs softer claims',
      reviewedBy: 'editor-1',
      approvedBy: 'editor-2',
      scheduledAt: '2099-01-01T00:00:00.000Z',
    });
    const stripped = stripEditorialFields(article as never);
    expect('reviewNotes' in stripped).toBe(false);
    expect('reviewedBy' in stripped).toBe(false);
    expect('approvedBy' in stripped).toBe(false);
    expect('scheduledAt' in stripped).toBe(false);

    const status = getEditorialStatus(article);
    expect(status).not.toHaveProperty('reviewNotes');
    expect(status).not.toHaveProperty('reviewedBy');
  });

  it('builds checklist and validation summary for incomplete articles', () => {
    const incomplete = makeArticle({
      seoReviewed: false,
      contentReviewed: false,
      relatedArticles: [],
    });
    const checklist = getPublishingChecklist(incomplete);
    const validation = validateArticleForPublishing(incomplete);

    expect(checklist.some((i) => i.id === 'seo_reviewed' && !i.passed)).toBe(
      true,
    );
    expect(validation.ok).toBe(false);

    const html = renderToStaticMarkup(
      createElement(PublishingValidationSummary, {
        ok: validation.ok,
        issues: validation.issues,
        checklist: validation.checklist,
      }),
    );
    expect(html).toContain('Publishing blocked');
    expect(
      renderToStaticMarkup(createElement(EditorialChecklist, { items: checklist })),
    ).toContain('SEO complete');
  });

  it('renders editorial UI components', () => {
    expect(
      renderToStaticMarkup(
        createElement(EditorialStatusBadge, { status: 'in_review' }),
      ),
    ).toContain('In Review');
    expect(
      renderToStaticMarkup(
        createElement(ScheduledPublishNotice, {
          scheduledAt: '2099-01-01T00:00:00.000Z',
        }),
      ),
    ).toContain('Scheduled for publication');
    expect(
      renderToStaticMarkup(
        createElement(ArticleWorkflowTimeline, { status: 'published' }),
      ),
    ).toContain('Published');
  });
});
