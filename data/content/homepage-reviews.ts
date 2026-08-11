/**
 * Homepage Customer Reviews — legacy marketing pool (deprecated).
 *
 * Production homepage and service pages now use `data/reviews/reviews.ts`
 * via `getHomepageReviews` / `getServicePageReviews`.
 * Do not emit Review / AggregateRating JSON-LD from this file.
 * Do not treat these entries as approved authentic reviews.
 */

import type { PlatformId } from '@/types/platform';

export type HomepageCustomerReview = {
  id: string;
  customerName: string;
  role: string;
  platform: PlatformId;
  rating: 5;
  reviewText: string;
  initials: string;
};

/** Intentionally empty — authentic reviews live in data/reviews/reviews.ts. */
export const homepageCustomerReviews: HomepageCustomerReview[] = [];

export const homepageCustomerReviewsMeta = {
  id: 'home-customer-reviews',
  title: 'Customer Reviews',
  description: 'Approved customer feedback from the NovaLikes review catalogue.',
  averageRatingLabel: '5.0/5 Average Rating',
  stats: [
    { id: 'rating', label: '5.0 out of 5 based on customer reviews', showStars: true },
  ],
} as const;
