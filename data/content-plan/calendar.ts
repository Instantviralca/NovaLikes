/**
 * Publishing calendar + update schedule — Document 16.01.
 */

import {
  nextReviewDateFromCadence,
  shiftDays,
} from '@/data/content-plan/brief-defaults';
import { draftAndReviewDates } from '@/data/content-plan/build-brief';
import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import type {
  ContentUpdateCadence,
  PublishingCalendarEntry,
} from '@/types/content-plan';

export const PUBLISHING_CALENDAR: readonly PublishingCalendarEntry[] =
  PLANNED_ARTICLES.map((article) => {
    const { draftDueDate, reviewDate } = draftAndReviewDates(
      article.plannedPublicationDate,
    );
    return {
      articleId: article.id,
      slug: article.slug,
      workingTitle: article.workingTitle,
      platform: article.platform,
      cluster: article.topicCluster,
      priority: article.priority,
      batch: article.batch,
      status: article.status,
      authorId: article.authorId,
      draftDueDate,
      reviewDate,
      plannedPublicationDate: article.plannedPublicationDate,
      nextReviewDate: nextReviewDateFromCadence(
        article.plannedPublicationDate,
        article.updateCadence,
      ),
    };
  });

export type UpdateScheduleRule = {
  cadence: ContentUpdateCadence;
  label: string;
  guidance: string;
  exampleSlugs: string[];
};

export const UPDATE_SCHEDULE_RULES: readonly UpdateScheduleRule[] = [
  {
    cadence: 'algorithm_3_to_6_months',
    label: 'Platform algorithm / feature articles',
    guidance: 'Review every 3–6 months or when platforms publish material ranking changes. Do not bump dateModified without meaningful edits.',
    exampleSlugs: PLANNED_ARTICLES.filter(
      (a) => a.updateCadence === 'algorithm_3_to_6_months',
    ).map((a) => a.slug),
  },
  {
    cadence: 'evergreen_6_to_12_months',
    label: 'Evergreen guides',
    guidance: 'Review every 6–12 months for accuracy and internal links.',
    exampleSlugs: PLANNED_ARTICLES.filter(
      (a) => a.updateCadence === 'evergreen_6_to_12_months',
    )
      .slice(0, 8)
      .map((a) => a.slug),
  },
  {
    cadence: 'policy_on_change',
    label: 'Policy-sensitive content',
    guidance: 'Update when platform rules, safety policies, or NovaLikes legal pages change.',
    exampleSlugs: PLANNED_ARTICLES.filter(
      (a) => a.updateCadence === 'policy_on_change',
    ).map((a) => a.slug),
  },
  {
    cadence: 'statistics_on_source_update',
    label: 'Statistics-based articles',
    guidance: 'Update when cited source data changes. Never invent replacement statistics.',
    exampleSlugs: PLANNED_ARTICLES.filter(
      (a) => a.updateCadence === 'statistics_on_source_update',
    ).map((a) => a.slug),
  },
];

export function getCalendarByBatch(batch: 1 | 2 | 3 | 4): PublishingCalendarEntry[] {
  return PUBLISHING_CALENDAR.filter((entry) => entry.batch === batch);
}

export function getCalendarDateRange(): { start: string; end: string } {
  const dates = PUBLISHING_CALENDAR.map((e) => e.plannedPublicationDate).sort();
  return { start: dates[0] ?? '', end: dates[dates.length - 1] ?? '' };
}

/** Ensures no more than one planned publication shares the same UTC date. */
export function findSameDayPublicationConflicts(): string[] {
  const counts = new Map<string, string[]>();
  for (const entry of PUBLISHING_CALENDAR) {
    const list = counts.get(entry.plannedPublicationDate) ?? [];
    list.push(entry.slug);
    counts.set(entry.plannedPublicationDate, list);
  }
  return [...counts.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([date, slugs]) => `${date}: ${slugs.join(', ')}`);
}

export { shiftDays };
