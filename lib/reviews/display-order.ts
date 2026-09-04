/**
 * Display-only review organization.
 * Does not rewrite review bodies or invent metadata.
 */

import type { PlatformId } from '@/types/platform';
import type { PublicReview } from '@/types/reviews';

/**
 * Homepage subset — three existing reviews with genuinely different subjects.
 * Ordering / delivery-status / repeat-use. Wording is unchanged.
 */
export const HOMEPAGE_REVIEW_IDS = [
  'review-mary-care',
  'review-nina-hartley',
  'review-lisa',
] as const;

export type ReviewDisplayTopic =
  | 'ordering'
  | 'pricing'
  | 'delivery'
  | 'support'
  | 'service'
  | 'repeat'
  | 'overall';

const TOPIC_ORDER: ReviewDisplayTopic[] = [
  'ordering',
  'delivery',
  'support',
  'pricing',
  'repeat',
  'service',
  'overall',
];

/** Classify from existing wording + stored platform only. */
export function classifyReviewTopic(
  reviewText: string,
  platform?: PlatformId,
): ReviewDisplayTopic {
  const text = reviewText.toLowerCase();

  if (
    /\b(twice|second time|third|few times|coming back|i.?ll use|would (use|buy|do) again|still coming|still reliable|used them|used novalikes a few|another tiktok|next month)\b/.test(
      text,
    )
  ) {
    return 'repeat';
  }
  if (/\b(support|replied|email|helped when|polite)\b/.test(text)) {
    return 'support';
  }
  if (/\b(pricing|price|budget|what i paid|total before paying)\b/.test(text)) {
    return 'pricing';
  }
  if (
    /\b(status|tracking|delivery|slow|wait|faster|turnaround|finished|took a (while|bit|little))\b/.test(
      text,
    )
  ) {
    return 'delivery';
  }
  if (
    /\b(checkout|ordering|place(d)? (the )?order|packages?|quantity|easy to place)\b/.test(text)
  ) {
    return 'ordering';
  }
  if (
    platform ||
    /\b(instagram|tiktok|facebook|ig |reel)\b/.test(text)
  ) {
    return 'service';
  }
  return 'overall';
}

/**
 * Round-robin mix so similar general-positive comments are less likely to sit in a row.
 * Stable within each topic (original relative order preserved).
 */
export function interleaveReviewsByTopic(reviews: PublicReview[]): PublicReview[] {
  const buckets = new Map<ReviewDisplayTopic, PublicReview[]>();
  for (const topic of TOPIC_ORDER) buckets.set(topic, []);

  for (const review of reviews) {
    const topic = classifyReviewTopic(review.reviewText, review.platform);
    buckets.get(topic)!.push(review);
  }

  const result: PublicReview[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const topic of TOPIC_ORDER) {
      const next = buckets.get(topic)!.shift();
      if (next) {
        result.push(next);
        added = true;
      }
    }
  }
  return result;
}
