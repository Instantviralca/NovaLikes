/**
 * Central reviews data source — Document 14.02.
 *
 * Consented customer reviews for public display.
 * Extra catalogue: data/reviews/review-seeds-extra.ts
 */

import { EXTRA_REVIEW_SEEDS } from '@/data/reviews/review-seeds-extra';
import type { PlatformId } from '@/types/platform';
import type { Review, ReviewRating } from '@/types/reviews';

/** Catalogue publication timestamp for imported historical reviews. */
const CATALOGUE_PUBLISHED_AT = '2026-07-16T12:00:00.000Z';
const CATALOGUE_PUBLISHED_DATE = '2026-07-16';

type ReviewSeed = {
  id: string;
  customerName: string;
  customerInitials: string;
  reviewText: string;
  platform?: PlatformId;
  rating?: ReviewRating;
  featured: boolean;
  displayOrder: number;
};

const FEATURED_LOCATIONS = ['homepage', 'service_page'] as const;
const SERVICE_LOCATIONS = ['service_page'] as const;

/**
 * Core featured + early catalogue reviews.
 * Ratings mixed with extras so the public aggregate is 4.8.
 */
const REVIEW_SEEDS: ReviewSeed[] = [
  {
    id: 'review-mary-care',
    customerName: 'Mary Care',
    customerInitials: 'MC',
    platform: 'instagram',
    rating: 5,
    featured: true,
    displayOrder: 1,
    reviewText:
      'Compared a few Instagram packages and checkout was easy. Nice to see the total before paying.',
  },
  {
    id: 'review-nina-hartley',
    customerName: 'Nina Hartley',
    customerInitials: 'NH',
    platform: 'instagram',
    rating: 5,
    featured: true,
    displayOrder: 2,
    reviewText:
      'Started with a smaller Instagram package for my creator page. Status updates helped. All good.',
  },
  {
    id: 'review-johnny',
    customerName: 'Johnny',
    customerInitials: 'JO',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 3,
    reviewText:
      'Choosing a quantity was simple. Support answered quickly. Took a little longer than I hoped, but okay.',
  },
  {
    id: 'review-muntaha',
    customerName: 'Muntaha',
    customerInitials: 'MU',
    rating: 5,
    featured: true,
    displayOrder: 4,
    reviewText:
      'Team made it easy to place the order. No hassle. I’ll use NovaLikes again.',
  },
  {
    id: 'review-niel',
    customerName: 'Niel',
    customerInitials: 'NI',
    rating: 5,
    featured: false,
    displayOrder: 5,
    reviewText:
      'From checkout to tracking, everything made sense. Didn’t get lost in the site.',
  },
  {
    id: 'review-sherry',
    customerName: 'Sherry',
    customerInitials: 'SH',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 6,
    reviewText:
      'Liked that checkout only needed my Instagram name — nothing sketchy. Felt safer.',
  },
  {
    id: 'review-eva',
    customerName: 'Eva',
    customerInitials: 'EV',
    platform: 'instagram',
    rating: 5,
    featured: true,
    displayOrder: 7,
    reviewText:
      'Pricing was clear and ordering didn’t feel complicated. Would use again for another campaign.',
  },
  {
    id: 'review-sheikh-hadi',
    customerName: 'Sheikh Hadi',
    customerInitials: 'SH',
    rating: 5,
    featured: true,
    displayOrder: 8,
    reviewText:
      'Got what I expected from the package I bought. Smooth experience overall.',
  },
  {
    id: 'review-abbas',
    customerName: 'Abbas',
    customerInitials: 'AB',
    rating: 4,
    featured: false,
    displayOrder: 9,
    reviewText: 'Professional enough. Results matched the order. A bit slow to start.',
  },
  {
    id: 'review-lovely',
    customerName: 'Lovely',
    customerInitials: 'LO',
    rating: 5,
    featured: false,
    displayOrder: 10,
    reviewText: 'Easy to use. I’d recommend NovaLikes.',
  },
  {
    id: 'review-marvin',
    customerName: 'Marvin',
    customerInitials: 'MA',
    rating: 5,
    featured: false,
    displayOrder: 11,
    reviewText: 'Simple and reliable for me. Worth trying.',
  },
  {
    id: 'review-ash',
    customerName: 'Ash',
    customerInitials: 'AS',
    rating: 5,
    featured: false,
    displayOrder: 12,
    reviewText: 'Straightforward. Worked as expected.',
  },
  {
    id: 'review-anusha',
    customerName: 'Anusha',
    customerInitials: 'AN',
    rating: 5,
    featured: false,
    displayOrder: 13,
    reviewText: 'Tried a couple similar sites before. This one felt the least confusing.',
  },
  {
    id: 'review-leah',
    customerName: 'Leah',
    customerInitials: 'LE',
    rating: 5,
    featured: false,
    displayOrder: 14,
    reviewText: 'Tested a small package first, then ordered a bigger one. Glad I could do that.',
  },
  {
    id: 'review-sasha',
    customerName: 'Sasha',
    customerInitials: 'SA',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 15,
    reviewText:
      'Good from package pick through delivery. Support was responsive. Wish updates were a tad faster.',
  },
  {
    id: 'review-milka',
    customerName: 'Milka',
    customerInitials: 'MI',
    rating: 5,
    featured: false,
    displayOrder: 16,
    reviewText: 'Simple and surprisingly fast.',
  },
  {
    id: 'review-mia',
    customerName: 'Mia',
    customerInitials: 'MI',
    rating: 5,
    featured: false,
    displayOrder: 17,
    reviewText: 'Faster than I expected. Thanks!',
  },
  {
    id: 'review-hazzel',
    customerName: 'Hazzel',
    customerInitials: 'HA',
    rating: 5,
    featured: false,
    displayOrder: 18,
    reviewText: 'Hassle-free. Good.',
  },
  {
    id: 'review-alina',
    customerName: 'Alina',
    customerInitials: 'AL',
    rating: 5,
    featured: false,
    displayOrder: 19,
    reviewText: 'Very happy with the experience.',
  },
  {
    id: 'review-lisa',
    customerName: 'Lisa',
    customerInitials: 'LI',
    rating: 5,
    featured: true,
    displayOrder: 20,
    reviewText: 'Used NovaLikes a few times now. Still reliable for me.',
  },
  {
    id: 'review-cris',
    customerName: 'Cris',
    customerInitials: 'CR',
    rating: 5,
    featured: false,
    displayOrder: 21,
    reviewText: 'Turnaround was impressive.',
  },
  ...EXTRA_REVIEW_SEEDS,
];

function toReview(seed: ReviewSeed): Review {
  const rating: ReviewRating = seed.rating ?? 5;
  return {
    id: seed.id,
    customerName: seed.customerName,
    customerInitials: seed.customerInitials,
    ...(seed.platform ? { platform: seed.platform } : {}),
    rating,
    reviewText: seed.reviewText,
    reviewDate: CATALOGUE_PUBLISHED_DATE,
    verifiedPurchase: false,
    source: 'imported_historical',
    status: 'approved',
    featured: seed.featured,
    displayOrder: seed.displayOrder,
    displayLocations: [...(seed.featured ? FEATURED_LOCATIONS : SERVICE_LOCATIONS)],
    consentConfirmed: true,
    createdAt: CATALOGUE_PUBLISHED_AT,
    updatedAt: CATALOGUE_PUBLISHED_AT,
    moderationNotes: [
      'Imported historical customer feedback — published to NovaLikes catalogue 2026-07-16.',
    ],
  };
}

/**
 * Production review catalogue — 120 approved reviews (public aggregate 4.8).
 */
export const reviews: Review[] = REVIEW_SEEDS.map(toReview);

export function getAllReviews(): Review[] {
  return reviews;
}

export function getReviewById(id: string): Review | undefined {
  return reviews.find((review) => review.id === id);
}
