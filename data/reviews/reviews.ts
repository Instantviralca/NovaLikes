/**
 * Central reviews data source — Document 14.02.
 *
 * Authentic, consented customer reviews only.
 * Legacy marketing placeholders in data/content/testimonials.ts and
 * data/content/homepage-reviews.ts are NOT part of this system.
 */

import type { PlatformId } from '@/types/platform';
import type { Review, ReviewRating } from '@/types/reviews';

/** Catalogue publication timestamp for imported historical reviews (not claim of original write date). */
const CATALOGUE_PUBLISHED_AT = '2026-07-16T12:00:00.000Z';
const CATALOGUE_PUBLISHED_DATE = '2026-07-16';

type ReviewSeed = {
  id: string;
  customerName: string;
  customerInitials: string;
  reviewText: string;
  platform?: PlatformId;
  featured: boolean;
  displayOrder: number;
};

const FEATURED_LOCATIONS = ['homepage', 'service_page'] as const;
const SERVICE_LOCATIONS = ['service_page'] as const;

/**
 * Approved five-star customer reviews (final production import).
 * Platform tags: Instagram only where the review is Instagram-specific;
 * all others remain general (untagged).
 */
const REVIEW_SEEDS: ReviewSeed[] = [
  {
    id: 'review-mary-care',
    customerName: 'Mary Care',
    customerInitials: 'MC',
    platform: 'instagram',
    featured: true,
    displayOrder: 1,
    reviewText:
      'The package options were easy to compare, and the checkout process was straightforward. I appreciated being able to see the order details before completing payment.',
  },
  {
    id: 'review-nina-hartley',
    customerName: 'Nina Hartley',
    customerInitials: 'NH',
    platform: 'instagram',
    featured: true,
    displayOrder: 2,
    reviewText:
      'I selected a smaller package for my creator account. The process was clear, the status updates were helpful, and everything worked as expected.',
  },
  {
    id: 'review-johnny',
    customerName: 'Johnny',
    customerInitials: 'JO',
    platform: 'instagram',
    featured: false,
    displayOrder: 3,
    reviewText:
      'Choosing the right quantity was simple. The delivery information was easy to understand, and support answered my question quickly.',
  },
  {
    id: 'review-muntaha',
    customerName: 'Muntaha',
    customerInitials: 'MU',
    featured: true,
    displayOrder: 4,
    reviewText:
      "The team at NovaLikes really knows what they're doing. They made it simple to grow my social media accounts without any hassle. Excellent service!",
  },
  {
    id: 'review-niel',
    customerName: 'Niel',
    customerInitials: 'NI',
    featured: false,
    displayOrder: 5,
    reviewText:
      'Fantastic experience from start to finish. Delivery was clear, checkout was simple, and I could follow the order updates without confusion.',
  },
  {
    id: 'review-sherry',
    customerName: 'Sherry',
    customerInitials: 'SH',
    platform: 'instagram',
    featured: false,
    displayOrder: 6,
    reviewText:
      "The package matched what I needed for my account. I liked that no password was requested and that I could follow the order status.",
  },
  {
    id: 'review-eva',
    customerName: 'Eva',
    customerInitials: 'EV',
    platform: 'instagram',
    featured: true,
    displayOrder: 7,
    reviewText:
      'The pricing was clearly displayed, and the ordering process did not feel complicated. I would use the service again for a future campaign.',
  },
  {
    id: 'review-sheikh-hadi',
    customerName: 'Sheikh Hadi',
    customerInitials: 'SH',
    featured: true,
    displayOrder: 8,
    reviewText:
      'The service delivered exactly what I expected. The engagement looked natural, and the overall experience was smooth and professional.',
  },
  {
    id: 'review-abbas',
    customerName: 'Abbas',
    customerInitials: 'AB',
    featured: false,
    displayOrder: 9,
    reviewText:
      'Everything was handled professionally, and the results arrived exactly as promised.',
  },
  {
    id: 'review-lovely',
    customerName: 'Lovely',
    customerInitials: 'LO',
    featured: false,
    displayOrder: 10,
    reviewText:
      "Easy to use, quick delivery, and excellent results. I'd definitely recommend NovaLikes.",
  },
  {
    id: 'review-marvin',
    customerName: 'Marvin',
    customerInitials: 'MA',
    featured: false,
    displayOrder: 11,
    reviewText:
      "I've had a great experience using this platform. It was simple, reliable, and definitely worth trying.",
  },
  {
    id: 'review-ash',
    customerName: 'Ash',
    customerInitials: 'AS',
    featured: false,
    displayOrder: 12,
    reviewText:
      'The process was straightforward and everything worked exactly as expected.',
  },
  {
    id: 'review-anusha',
    customerName: 'Anusha',
    customerInitials: 'AN',
    featured: false,
    displayOrder: 13,
    reviewText:
      "I've tried several similar services before, but this one provided the best experience by far.",
  },
  {
    id: 'review-leah',
    customerName: 'Leah',
    customerInitials: 'LE',
    featured: false,
    displayOrder: 14,
    reviewText:
      'I liked being able to test the service before making a larger purchase. It gave me the confidence to continue.',
  },
  {
    id: 'review-sasha',
    customerName: 'Sasha',
    customerInitials: 'SA',
    platform: 'instagram',
    featured: false,
    displayOrder: 15,
    reviewText:
      'I had a good experience from package selection through delivery. The instructions were clear and the support team was responsive.',
  },
  {
    id: 'review-milka',
    customerName: 'Milka',
    customerInitials: 'MI',
    featured: false,
    displayOrder: 16,
    reviewText: 'The entire process was simple, smooth, and surprisingly fast.',
  },
  {
    id: 'review-mia',
    customerName: 'Mia',
    customerInitials: 'MI',
    featured: false,
    displayOrder: 17,
    reviewText: 'Delivery was much faster than I expected.',
  },
  {
    id: 'review-hazzel',
    customerName: 'Hazzel',
    customerInitials: 'HA',
    featured: false,
    displayOrder: 18,
    reviewText: 'Fast, reliable, and completely hassle-free.',
  },
  {
    id: 'review-alina',
    customerName: 'Alina',
    customerInitials: 'AL',
    featured: false,
    displayOrder: 19,
    reviewText: "I'm very happy with the overall experience.",
  },
  {
    id: 'review-lisa',
    customerName: 'Lisa',
    customerInitials: 'LI',
    featured: true,
    displayOrder: 20,
    reviewText:
      "I've used NovaLikes multiple times, and the service has been consistently reliable.",
  },
  {
    id: 'review-cris',
    customerName: 'Cris',
    customerInitials: 'CR',
    featured: false,
    displayOrder: 21,
    reviewText: 'The turnaround time was impressive.',
  },
];

function toReview(seed: ReviewSeed): Review {
  const rating: ReviewRating = 5;
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
 * Production review catalogue — 21 approved five-star reviews.
 */
export const reviews: Review[] = REVIEW_SEEDS.map(toReview);

export function getAllReviews(): Review[] {
  return reviews;
}

export function getReviewById(id: string): Review | undefined {
  return reviews.find((review) => review.id === id);
}
