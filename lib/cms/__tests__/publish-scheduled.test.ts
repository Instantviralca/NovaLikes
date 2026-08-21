import { describe, expect, it } from 'vitest';

import { applyPublishAction, isPublicCmsArticle, publishDueScheduledArticles } from '@/lib/cms/articles';
import { resetCmsMemoryForTests } from '@/lib/cms/store';
import { cmsInsertArticle, cmsGetArticleById } from '@/lib/cms/store';
import type { CmsArticleRecord } from '@/lib/cms/types';

function article(overrides: Partial<CmsArticleRecord> = {}): CmsArticleRecord {
  return {
    id: overrides.id ?? 'art_due',
    slug: 'due-guide',
    title: 'Due',
    excerpt: '',
    contentHtml: '<p>Scheduled article body with enough characters to publish safely now.</p>',
    contentJson: null,
    blocks: [
      {
        id: 'p-1',
        order: 1,
        type: 'paragraph',
        text: 'Scheduled article body with enough characters to publish safely now.',
      },
    ],
    featuredImageUrl: null,
    featuredImageAlt: null,
    featuredImageWidth: null,
    featuredImageHeight: null,
    category: 'guides',
    tags: [],
    seoTitle: null,
    seoDescription: null,
    canonicalPath: null,
    authorId: 'usr_1',
    createdBy: 'usr_1',
    updatedBy: 'usr_1',
    status: 'scheduled',
    intendedPublishOn: null,
    publishAt: '2026-08-20T00:00:00.000Z',
    publishedAt: null,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
    deletedAt: null,
    faqs: [],
    keyTakeaways: [],
    relatedServices: [],
    relatedArticles: [],
    ...overrides,
  };
}

describe('scheduled publisher', () => {
  it('publishes due scheduled articles idempotently', async () => {
    resetCmsMemoryForTests();
    await cmsInsertArticle(article());
    const now = new Date('2026-08-21T00:00:00.000Z');
    const first = await publishDueScheduledArticles(now);
    const second = await publishDueScheduledArticles(now);
    expect(first).toEqual(['art_due']);
    expect(second).toEqual([]);
    const saved = await cmsGetArticleById('art_due');
    expect(saved?.status).toBe('published');
    expect(isPublicCmsArticle(saved!, now)).toBe(true);
  });

  it('does not publish future items', async () => {
    resetCmsMemoryForTests();
    await cmsInsertArticle(
      article({
        id: 'art_future',
        slug: 'future-guide',
        publishAt: '2026-12-01T00:00:00.000Z',
      }),
    );
    const ids = await publishDueScheduledArticles(new Date('2026-08-21T00:00:00.000Z'));
    expect(ids).toEqual([]);
    const saved = await cmsGetArticleById('art_future');
    expect(saved?.status).toBe('scheduled');
  });

  it('does not auto-publish planned items even if a due timestamp is present', async () => {
    resetCmsMemoryForTests();
    await cmsInsertArticle(
      article({
        id: 'art_planned',
        slug: 'planned-guide',
        status: 'planned',
        intendedPublishOn: '2026-08-20',
        publishAt: '2026-08-20T00:00:00.000Z',
        blocks: [{ id: 'p-1', order: 1, type: 'paragraph', text: 'Enough planned body text to look complete for safety checks.' }],
      }),
    );
    const ids = await publishDueScheduledArticles(new Date('2026-08-21T00:00:00.000Z'));
    expect(ids).toEqual([]);
    const saved = await cmsGetArticleById('art_planned');
    expect(saved?.status).toBe('planned');
    expect(isPublicCmsArticle(saved!, new Date('2026-08-21T00:00:00.000Z'))).toBe(false);
  });

  it('does not auto-publish drafts or trash', async () => {
    resetCmsMemoryForTests();
    await cmsInsertArticle(article({ id: 'art_draft', slug: 'draft-guide', status: 'draft', publishAt: '2026-08-20T00:00:00.000Z' }));
    await cmsInsertArticle(article({ id: 'art_trash', slug: 'trash-guide', status: 'trash', publishAt: '2026-08-20T00:00:00.000Z' }));
    const ids = await publishDueScheduledArticles(new Date('2026-08-21T00:00:00.000Z'));
    expect(ids).toEqual([]);
  });

  it('skips scheduled rows that have no publishable body', async () => {
    resetCmsMemoryForTests();
    await cmsInsertArticle(
      article({
        id: 'art_empty',
        slug: 'empty-scheduled',
        status: 'scheduled',
        publishAt: '2026-08-20T00:00:00.000Z',
        blocks: [],
        contentHtml: '',
      }),
    );
    const ids = await publishDueScheduledArticles(new Date('2026-08-21T00:00:00.000Z'));
    expect(ids).toEqual([]);
    expect((await cmsGetArticleById('art_empty'))?.status).toBe('scheduled');
  });
});

describe('applyPublishAction unused import guard', () => {
  it('keeps helper exported', () => {
    expect(typeof applyPublishAction).toBe('function');
  });
});
