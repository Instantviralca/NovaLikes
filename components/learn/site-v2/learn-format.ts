import { SITE_V2_COPY } from '@/data/content/site-v2-copy';

/** Short-month date used by the site-v2 Learn prototypes, e.g. "Oct 11, 2026". */
export function formatLearnDate(iso: string | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "{minutes} min read" from SITE_V2_COPY. */
export function formatLearnMinRead(minutes: number): string {
  return SITE_V2_COPY.learn.minRead.replace('{minutes}', String(minutes));
}

/** Short "11 min" variant used in sidebar lists (prototype). */
export function formatLearnMinShort(minutes: number): string {
  return `${minutes} min`;
}
