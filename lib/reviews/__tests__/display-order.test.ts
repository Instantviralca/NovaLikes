/**
 * Display-order helpers — mix existing reviews without rewriting them.
 */

import { describe, expect, it } from 'vitest';

import { getHomepageReviews, getSafePublicReviews } from '@/lib/reviews';
import {
  HOMEPAGE_REVIEW_IDS,
  classifyReviewTopic,
  interleaveReviewsByTopic,
} from '@/lib/reviews/display-order';

describe('Review display order', () => {
  it('keeps homepage IDs to three existing catalogue reviews', () => {
    expect([...HOMEPAGE_REVIEW_IDS]).toEqual([
      'review-mary-care',
      'review-nina-hartley',
      'review-lisa',
    ]);
    expect(getHomepageReviews()).toHaveLength(3);
  });

  it('does not rewrite review bodies when interleaving', () => {
    const original = getSafePublicReviews();
    const mixed = interleaveReviewsByTopic(original);
    expect(mixed).toHaveLength(original.length);
    expect(new Set(mixed.map((review) => review.id)).size).toBe(original.length);
    const byId = new Map(original.map((review) => [review.id, review.reviewText]));
    for (const review of mixed) {
      expect(review.reviewText).toBe(byId.get(review.id));
    }
  });

  it('classifies from existing wording only', () => {
    expect(
      classifyReviewTopic(
        'I’ve used NovaLikes a few times now, and it’s still been reliable for me.',
      ),
    ).toBe('repeat');
    expect(
      classifyReviewTopic(
        'I compared a few Instagram packages before ordering, and checkout was easy. I also liked being able to see the full total before I paid.',
      ),
    ).toBe('ordering');
  });
});
