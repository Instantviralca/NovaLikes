import { describe, expect, it } from 'vitest';

import { applyPublishAction, hasPublishableBody, isPublicCmsArticle } from '@/lib/cms/articles';
import { NOVALIKES_EDITORIAL_PLAN } from '@/lib/cms/editorial-plan';
import { getEditorialCalendarRows, seedEditorialPlan } from '@/lib/cms/seed-editorial-plan';
import { resetCmsMemoryForTests } from '@/lib/cms/store';
import type { CmsArticleRecord } from '@/lib/cms/types';

function emptyPlanned(overrides: Partial<CmsArticleRecord> = {}): CmsArticleRecord {
  return {
    id: 'art_plan',
    slug: 'planned-topic',
    title: 'Planned',
    excerpt: '',
    contentHtml: '',
    contentJson: null,
    blocks: [],
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
    status: 'planned',
    intendedPublishOn: '2026-10-23',
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

describe('editorial plan', () => {
  it('includes 30 unique slugs', () => {
    const slugs = NOVALIKES_EDITORIAL_PLAN.map((item) => item.slug);
    expect(slugs).toHaveLength(30);
    expect(new Set(slugs).size).toBe(30);
  });

  it('keeps the four remaining planned CMS topics on Oct 23–30 dates', () => {
    const planned = NOVALIKES_EDITORIAL_PLAN.slice(-4);
    expect(planned.map((item) => item.date)).toEqual([
      '2026-10-23',
      '2026-10-26',
      '2026-10-28',
      '2026-10-30',
    ]);
    expect(planned.map((item) => item.slug)).toEqual([
      'facebook-page-likes-vs-followers',
      'how-to-save-tiktok-profile-picture-full-size',
      'how-to-download-public-tiktok-video',
      'how-to-download-instagram-videos-reels',
    ]);
  });

  it('seeds missing CMS planned rows and links existing Learn registry slugs', async () => {
    resetCmsMemoryForTests();
    const result = await seedEditorialPlan('usr_1');
    expect(result.created + result.linkedRegistry + result.reusedCms).toBe(30);
    expect(result.created).toBeGreaterThan(0);
    const calendar = await getEditorialCalendarRows();
    expect(calendar).toHaveLength(30);
    expect(calendar.every((row) => Boolean(row.intendedPublishOn))).toBe(true);
    expect(calendar.some((row) => row.status === 'planned' && row.cmsId)).toBe(true);
    expect(calendar.some((row) => row.source === 'learn-registry')).toBe(true);
  });
});

describe('planned is not publishable', () => {
  const now = new Date('2026-10-24T00:00:00.000Z');

  it('rejects scheduling or publishing empty planned articles', () => {
    expect(hasPublishableBody(emptyPlanned())).toBe(false);
    expect(applyPublishAction(emptyPlanned(), { type: 'publish' }, 'usr_1', now).ok).toBe(false);
    expect(
      applyPublishAction(emptyPlanned(), { type: 'schedule', publishAt: '2026-11-01T12:00:00.000Z' }, 'usr_1', now).ok,
    ).toBe(false);
    expect(isPublicCmsArticle(emptyPlanned(), now)).toBe(false);
  });

  it('can move planned to draft without publishing', () => {
    const result = applyPublishAction(emptyPlanned(), { type: 'draft' }, 'usr_1', now);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.article.status).toBe('draft');
      expect(isPublicCmsArticle(result.article, now)).toBe(false);
    }
  });
});
