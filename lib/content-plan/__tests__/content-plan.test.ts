/**
 * SEO Content Production Plan tests — Document 16.01.
 */

import { describe, expect, it } from 'vitest';

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { TOPIC_CLUSTERS } from '@/data/content-plan/clusters';
import { findSameDayPublicationConflicts } from '@/data/content-plan/calendar';
import { isSkippedServiceSlug } from '@/data/content-plan/services';
import {
  buildContentCalendar,
  buildPublishingQueue,
  detectIntentConflicts,
  detectKeywordOverlap,
  detectMissingServiceSupport,
  getArticlesByBatch,
  getArticlesByPlatform,
  getArticlesByPriority,
  getBatchTotals,
  getPlannedArticles,
  getPlatformTotals,
  validateArticleBrief,
  validateContentPlan,
} from '@/lib/content-plan';

describe('SEO Content Production Plan', () => {
  it('plans exactly 50 articles with correct platform and batch totals', () => {
    expect(getPlannedArticles()).toHaveLength(50);
    expect(getPlatformTotals()).toEqual({
      instagram: 12,
      tiktok: 10,
      facebook: 8,
      youtube: 10,
      general: 10,
    });
    expect(getBatchTotals()).toEqual({ 1: 10, 2: 12, 3: 14, 4: 14 });
  });

  it('keeps Batch 1 as P1 brief_ready foundation titles', () => {
    const batch1 = getArticlesByBatch(1);
    expect(batch1).toHaveLength(10);
    expect(batch1.every((a) => a.priority === 'P1')).toBe(true);
    expect(batch1.every((a) => a.status === 'brief_ready')).toBe(true);
    expect(batch1.map((a) => a.workingTitle).sort()).toEqual(
      [
        'Facebook Page Optimization Guide',
        'How the Instagram Algorithm Works',
        'How to Get More Facebook Followers',
        'How to Get More Instagram Followers',
        'How to Get More TikTok Followers',
        'How to Get More Views on TikTok',
        'How to Get More Views on YouTube',
        'How to Get More YouTube Subscribers',
        'Social Media Growth Strategy for Beginners',
        'Social Media Metrics That Matter',
      ].sort(),
    );
  });

  it('uses only planned or brief_ready statuses and no article bodies', () => {
    for (const article of PLANNED_ARTICLES) {
      expect(['planned', 'brief_ready']).toContain(article.status);
      expect(article).not.toHaveProperty('content');
      expect(article).not.toHaveProperty('blocks');
      expect(article.shortAnswer.length).toBeGreaterThan(40);
    }
  });

  it('never targets skipped services', () => {
    for (const article of PLANNED_ARTICLES) {
      for (const service of article.relatedServices) {
        expect(isSkippedServiceSlug(service)).toBe(false);
      }
      if (article.ctaStrategy.prominentServiceSlug) {
        expect(
          isSkippedServiceSlug(article.ctaStrategy.prominentServiceSlug),
        ).toBe(false);
      }
    }
  });

  it('has unique slugs and no primary keyword cannibalization blockers', () => {
    const slugs = PLANNED_ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(50);
    expect(
      detectKeywordOverlap().filter((i) => i.severity === 'blocker'),
    ).toEqual([]);
    expect(
      detectIntentConflicts().filter((i) => i.code === 'duplicate_title'),
    ).toEqual([]);
  });

  it('covers all approved services with at least one relationship', () => {
    const missing = detectMissingServiceSupport().filter(
      (i) => i.severity === 'error',
    );
    expect(missing).toEqual([]);
  });

  it('reports missing authors without inventing them', () => {
    const sample = PLANNED_ARTICLES[0]!;
    const issues = validateArticleBrief(sample);
    expect(issues.some((i) => i.code === 'missing_author')).toBe(true);
    expect(sample.authorId).toBe('');
  });

  it('builds publishing queue and calendar', () => {
    const queue = buildPublishingQueue({ batch: 1 });
    expect(queue).toHaveLength(10);
    expect(queue[0]?.priority).toBe('P1');

    const calendar = buildContentCalendar(1);
    expect(calendar).toHaveLength(10);
    expect(calendar[0]?.plannedPublicationDate <= calendar[9]!.plannedPublicationDate).toBe(
      true,
    );
    expect(findSameDayPublicationConflicts()).toEqual([]);
  });

  it('exposes topic clusters and priority helpers', () => {
    expect(TOPIC_CLUSTERS.length).toBeGreaterThanOrEqual(8);
    expect(getArticlesByPriority('P1').length).toBe(10);
    expect(getArticlesByPlatform('instagram')).toHaveLength(12);
  });

  it('validateContentPlan reports expected architecture health', () => {
    const report = validateContentPlan();
    expect(report.articleCount).toBe(50);
    expect(report.issues.some((i) => i.severity === 'blocker')).toBe(false);
    expect(report.issues.some((i) => i.code === 'missing_author')).toBe(true);
    // Authors intentionally unassigned until Author System has real records.
    expect(report.valid).toBe(false);
  });
});
