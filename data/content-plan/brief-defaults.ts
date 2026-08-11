/**
 * Shared brief defaults — Document 16.01.
 */

import type {
  ContentImageRequirements,
  ContentUpdateCadence,
} from '@/types/content-plan';

export const DEFAULT_IMAGE_REQUIREMENTS: ContentImageRequirements = {
  featuredImageRequired: true,
  altTextRequired: true,
  preferredFormat: 'webp',
  minWidth: 1200,
  minHeight: 630,
  notes:
    'Use an original NovaLikes Learn cover. Verify rights. Prefer WebP. Provide meaningful alt text. No hotlinked screenshots without permission.',
};

export function nextReviewDateFromCadence(
  publicationIso: string,
  cadence: ContentUpdateCadence,
): string {
  const base = Date.parse(publicationIso);
  if (Number.isNaN(base)) return publicationIso;
  const date = new Date(base);
  switch (cadence) {
    case 'algorithm_3_to_6_months':
      date.setUTCMonth(date.getUTCMonth() + 4);
      break;
    case 'evergreen_6_to_12_months':
      date.setUTCMonth(date.getUTCMonth() + 9);
      break;
    case 'policy_on_change':
      date.setUTCMonth(date.getUTCMonth() + 6);
      break;
    case 'statistics_on_source_update':
      date.setUTCMonth(date.getUTCMonth() + 6);
      break;
  }
  return date.toISOString().slice(0, 10);
}

export function shiftDays(isoDate: string, days: number): string {
  const ms = Date.parse(`${isoDate}T00:00:00.000Z`);
  if (Number.isNaN(ms)) return isoDate;
  const date = new Date(ms);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
