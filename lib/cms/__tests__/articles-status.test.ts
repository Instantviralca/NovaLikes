import { describe, expect, it } from 'vitest';

import { applyPublishAction, isPublicCmsArticle } from '@/lib/cms/articles';
import type { CmsArticleRecord } from '@/lib/cms/types';

function article(overrides: Partial<CmsArticleRecord> = {}): CmsArticleRecord {
  return {
    id: 'art_1',
    slug: 'test-guide',
    title: 'Test',
    excerpt: 'A short excerpt for status tests.',
    contentHtml: '<p>Draft body with enough characters to satisfy publishable content checks.</p>',
    contentJson: null,
    blocks: [
      {
        id: 'p-1',
        order: 1,
        type: 'paragraph',
        text: 'Draft body with enough characters to satisfy publishable content checks.',
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
    status: 'draft',
    intendedPublishOn: null,
    publishAt: null,
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

describe('cms article status machine', () => {
  const now = new Date('2026-08-21T00:00:00.000Z');

  it('publishes drafts', () => {
    const result = applyPublishAction(article(), { type: 'publish' }, 'usr_1', now);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.article.status).toBe('published');
      expect(isPublicCmsArticle(result.article, now)).toBe(true);
    }
  });

  it('keeps future scheduled articles private', () => {
    const result = applyPublishAction(
      article(),
      { type: 'schedule', publishAt: '2026-09-01T12:00:00.000Z' },
      'usr_1',
      now,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.article.status).toBe('scheduled');
      expect(isPublicCmsArticle(result.article, now)).toBe(false);
    }
  });

  it('rejects past schedule times', () => {
    const result = applyPublishAction(
      article(),
      { type: 'schedule', publishAt: '2020-01-01T00:00:00.000Z' },
      'usr_1',
      now,
    );
    expect(result.ok).toBe(false);
  });

  it('trashes and restores', () => {
    const trashed = applyPublishAction(article({ status: 'published' }), { type: 'trash' }, 'usr_1', now);
    expect(trashed.ok).toBe(true);
    if (trashed.ok) {
      expect(trashed.article.status).toBe('trash');
      expect(isPublicCmsArticle(trashed.article, now)).toBe(false);
      const restored = applyPublishAction(trashed.article, { type: 'restore' }, 'usr_1', now);
      expect(restored.ok).toBe(true);
      if (restored.ok) expect(restored.article.status).toBe('draft');
    }
  });
});
