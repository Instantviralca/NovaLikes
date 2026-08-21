/**
 * Approved production service scope for internal linking — Document 14.05.
 * Skipped services remain in the Service Registry but must not receive links.
 */

export const APPROVED_SERVICE_SLUGS = [
  'buy-instagram-followers',
  'buy-instagram-likes',
  'buy-instagram-views',
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-tiktok-likes',
  'buy-tiktok-views',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
] as const;

export type ApprovedServiceSlug = (typeof APPROVED_SERVICE_SLUGS)[number];

const APPROVED_SET = new Set<string>(APPROVED_SERVICE_SLUGS);

export function isApprovedServiceSlug(slug: string): boolean {
  return APPROVED_SET.has(slug);
}

/** Purchase-journey order within a platform (lower = earlier). */
export const SERVICE_JOURNEY_ORDER: Record<string, number> = {
  followers: 1,
  subscribers: 1,
  'page-likes': 2,
  likes: 3,
  'post-likes': 3,
  views: 4,
  comments: 5,
};

/** Customer intent buckets for related-service scoring. */
export const SERVICE_INTENT_BY_CATEGORY: Record<string, string> = {
  followers: 'audience',
  subscribers: 'audience',
  'page-likes': 'audience',
  likes: 'engagement',
  'post-likes': 'engagement',
  comments: 'engagement',
  views: 'reach',
};

export const RELATED_SERVICE_LIMITS = {
  servicePage: 3,
  homepage: 4,
} as const;
