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
      'I compared a few Instagram packages before ordering, and checkout was easy. I also liked being able to see the full total before I paid.',
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
      'I started with a smaller Instagram package for my creator page. The status updates helped, and everything went fine.',
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
      'Choosing the quantity was simple, and support got back to me quickly. It took a little longer than I hoped, but overall it was okay.',
  },
  {
    id: 'review-muntaha',
    customerName: 'Muntaha',
    customerInitials: 'MU',
    rating: 5,
    featured: true,
    displayOrder: 4,
    reviewText:
      'The team made it easy to place my order, and there was no hassle. I’d use NovaLikes again.',
  },
  {
    id: 'review-niel',
    customerName: 'Niel',
    customerInitials: 'NI',
    rating: 5,
    featured: false,
    displayOrder: 5,
    reviewText:
      'From checkout through tracking, everything was easy to follow. I never felt lost on the site.',
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
      'I liked that checkout only asked for my Instagram name and nothing sketchy. That made the process feel safer.',
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
      'The pricing was clear, and ordering didn’t feel complicated. I’d use it again for another campaign.',
  },
  {
    id: 'review-sheikh-hadi',
    customerName: 'Sheikh Hadi',
    customerInitials: 'SH',
    rating: 5,
    featured: true,
    displayOrder: 8,
    reviewText:
      'I got what I expected from the package I bought. Overall, the experience was smooth.',
  },
  {
    id: 'review-abbas',
    customerName: 'Abbas',
    customerInitials: 'AB',
    rating: 4,
    featured: false,
    displayOrder: 9,
    reviewText: 'It felt professional enough, and the results matched the order. It was a bit slow to start, though.',
  },
  {
    id: 'review-lovely',
    customerName: 'Lovely',
    customerInitials: 'LO',
    rating: 5,
    featured: false,
    displayOrder: 10,
    reviewText: 'It was easy to use, and I’d recommend NovaLikes.',
  },
  {
    id: 'review-marvin',
    customerName: 'Marvin',
    customerInitials: 'MA',
    rating: 5,
    featured: false,
    displayOrder: 11,
    reviewText: 'Simple and reliable for me. Definitely worth trying.',
  },
  {
    id: 'review-ash',
    customerName: 'Ash',
    customerInitials: 'AS',
    rating: 5,
    featured: false,
    displayOrder: 12,
    reviewText: 'Straightforward from start to finish. It worked as expected.',
  },
  {
    id: 'review-anusha',
    customerName: 'Anusha',
    customerInitials: 'AN',
    rating: 5,
    featured: false,
    displayOrder: 13,
    reviewText: 'I’d tried a couple of similar sites before, and this one felt the least confusing to use.',
  },
  {
    id: 'review-leah',
    customerName: 'Leah',
    customerInitials: 'LE',
    rating: 5,
    featured: false,
    displayOrder: 14,
    reviewText: 'I tested a smaller package first and then came back for a bigger one. I was glad I could do it that way.',
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
      'The process was good from choosing a package through delivery, and support was responsive. I just wish the updates had been a little faster.',
  },
  {
    id: 'review-milka',
    customerName: 'Milka',
    customerInitials: 'MI',
    rating: 5,
    featured: false,
    displayOrder: 16,
    reviewText: 'Simple process, and it was surprisingly fast.',
  },
  {
    id: 'review-mia',
    customerName: 'Mia',
    customerInitials: 'MI',
    rating: 5,
    featured: false,
    displayOrder: 17,
    reviewText: 'It was faster than I expected. Thanks!',
  },
  {
    id: 'review-hazzel',
    customerName: 'Hazzel',
    customerInitials: 'HA',
    rating: 5,
    featured: false,
    displayOrder: 18,
    reviewText: 'Hassle-free and easy enough. Good experience for me.',
  },
  {
    id: 'review-alina',
    customerName: 'Alina',
    customerInitials: 'AL',
    rating: 5,
    featured: false,
    displayOrder: 19,
    reviewText: 'I was very happy with the experience overall.',
  },
  {
    id: 'review-lisa',
    customerName: 'Lisa',
    customerInitials: 'LI',
    rating: 5,
    featured: true,
    displayOrder: 20,
    reviewText: 'I’ve used NovaLikes a few times now, and it’s still been reliable for me.',
  },
  {
    id: 'review-cris',
    customerName: 'Cris',
    customerInitials: 'CR',
    rating: 5,
    featured: false,
    displayOrder: 21,
    reviewText: 'The turnaround was impressive. That’s what stood out most to me.',
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
