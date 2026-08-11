/**
 * Review selection helpers — Document 14.02.
 * Public selectors return only Approved + consented reviews.
 */

import { getAllReviews } from '@/data/reviews';
import { toPublicReviews } from '@/lib/reviews/public';
import { isPubliclyEligible } from '@/lib/reviews/status';
import type { PlatformId } from '@/types/platform';
import type { PublicReview, Review } from '@/types/reviews';

export function sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
  });
}

/** Deterministic rotation so service pages do not share an identical review set. */
export function rotateDeterministic<T>(items: T[], seed: string): T[] {
  if (items.length <= 1) return items;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const offset = hash % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export function getApprovedReviews(source: Review[] = getAllReviews()): Review[] {
  return sortReviews(source.filter(isPubliclyEligible));
}

export function getFeaturedReviews(source: Review[] = getAllReviews()): Review[] {
  return getApprovedReviews(source).filter((review) => review.featured);
}

export function getReviewsByPlatform(
  platform: PlatformId,
  source: Review[] = getAllReviews(),
): Review[] {
  return getApprovedReviews(source).filter((review) => review.platform === platform);
}

export function getReviewsByService(
  serviceSlug: string,
  source: Review[] = getAllReviews(),
): Review[] {
  return getApprovedReviews(source).filter((review) => review.serviceSlug === serviceSlug);
}

/**
 * Homepage: featured approved reviews first, then other approved homepage placements.
 * Returns empty when none exist — callers must hide the section.
 */
export function getHomepageReviews(
  limit = 3,
  source: Review[] = getAllReviews(),
): PublicReview[] {
  const approved = getApprovedReviews(source);
  const homepageEligible = approved.filter(
    (review) =>
      review.featured ||
      review.displayLocations.includes('homepage') ||
      review.displayLocations.length === 0,
  );
  const featured = homepageEligible.filter((review) => review.featured);
  const rest = homepageEligible.filter((review) => !review.featured);
  return toPublicReviews([...featured, ...rest]).slice(0, limit);
}

/**
 * Service-page priority:
 * 1. Exact service reviews
 * 2. Platform reviews
 * 3. General NovaLikes reviews
 */
export function getServicePageReviews(input: {
  serviceSlug: string;
  platform?: PlatformId;
  limit?: number;
  source?: Review[];
}): PublicReview[] {
  const limit = input.limit ?? 6;
  const source = input.source ?? getAllReviews();
  const approved = getApprovedReviews(source);

  const exact = approved.filter((review) => review.serviceSlug === input.serviceSlug);
  const platformReviews =
    input.platform != null
      ? approved.filter(
          (review) =>
            review.serviceSlug !== input.serviceSlug && review.platform === input.platform,
        )
      : [];
  /** Untagged NovaLikes reviews only — never promote another platform's reviews as general. */
  const general = approved.filter((review) => {
    const alreadyIncluded =
      exact.some((item) => item.id === review.id) ||
      platformReviews.some((item) => item.id === review.id);
    if (alreadyIncluded) return false;
    if (review.platform != null) return false;
    if (review.serviceSlug != null && review.serviceSlug !== input.serviceSlug) return false;
    return (
      review.displayLocations.includes('service_page') ||
      review.displayLocations.includes('platform_group') ||
      !review.serviceSlug
    );
  });

  const seed = `${input.serviceSlug}:${input.platform ?? 'general'}`;
  const ordered = [
    ...rotateDeterministic(exact, seed),
    ...rotateDeterministic(platformReviews, seed),
    ...rotateDeterministic(general, seed),
  ];

  return toPublicReviews(ordered).slice(0, limit);
}

export function getAboutPageReviews(
  limit = 6,
  source: Review[] = getAllReviews(),
): PublicReview[] {
  const approved = getApprovedReviews(source).filter(
    (review) =>
      review.displayLocations.includes('about') ||
      review.featured ||
      review.displayLocations.length === 0,
  );
  return toPublicReviews(approved).slice(0, limit);
}

/** Safe public output for any caller. */
export function getSafePublicReviews(source: Review[] = getAllReviews()): PublicReview[] {
  return toPublicReviews(getApprovedReviews(source));
}

export function hasPublicReviews(reviews: PublicReview[]): boolean {
  return reviews.length > 0;
}
