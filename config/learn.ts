/**
 * Learn Center configuration — Document 15.01.
 */

export const learnConfig = {
  /** Newsletter CTA stays off until a real provider is configured. */
  newsletterEnabled: false,
  newsletterHeading: 'Get growth tips in your inbox',
  newsletterDescription:
    'Practical social media guides from NovaLikes. No spam.',
  /** Index empty category pages for IA; articles only when published. */
  indexEmptyCategories: true,
  defaultReadingWordsPerMinute: 220,
} as const;

export type LearnConfig = typeof learnConfig;
