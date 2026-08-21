/**
 * Learn Search & Filters config — Document 15.05.
 */

import type {
  LearnReadingTimeFilter,
  LearnSortOption,
} from '@/types/learn-search';

export const LEARN_SEARCH_DEBOUNCE_MS = 275;

export const LEARN_SEARCH_PAGE_SIZE = 12;

export const LEARN_SEARCH_PARAM_KEYS = [
  'q',
  'category',
  'tag',
  'platform',
  'readingTime',
  'sort',
  'featured',
  'page',
] as const;

export const LEARN_SORT_OPTIONS: readonly {
  value: LearnSortOption;
  label: string;
}[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'shortest', label: 'Shortest Read' },
  { value: 'longest', label: 'Longest Read' },
] as const;

export const LEARN_READING_TIME_OPTIONS: readonly {
  value: LearnReadingTimeFilter;
  label: string;
}[] = [
  { value: 'under-5', label: 'Under 5 minutes' },
  { value: '5-10', label: '5–10 minutes' },
  { value: '10-15', label: '10–15 minutes' },
  { value: 'over-15', label: 'Over 15 minutes' },
] as const;

export const LEARN_PLATFORM_OPTIONS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'general', label: 'General' },
] as const;

export const LEARN_EMPTY_SEARCH_COPY = {
  heading: 'No articles found',
  body: 'Try a different search term, remove a filter, or browse one of the Learn categories.',
} as const;

/** Future dedicated route — prepared, not wired as indexable V1 surface. */
export const LEARN_DEDICATED_SEARCH_PATH = '/learn/search' as const;
