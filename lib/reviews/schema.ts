/**
 * Review schema helpers — Document 14.02 compatibility layer.
 * Prefer Document 14.03 engine APIs from `@/lib/reviews/schema-engine`.
 */

export {
  validateRatingValue,
  validateReviewedEntity,
  matchesReviewedEntity,
  getPublicReviewAuthor,
  sanitizeReviewForSchema,
  getSchemaEligibleReviews,
  calculateAggregateRating,
  canGenerateReviewSchema,
  canGenerateAggregateRating,
  buildReviewSchema,
  buildAggregateRatingSchema,
  buildReviewSchemaBundle,
  buildReviewSchemaAdminPreview,
} from '@/lib/reviews/schema-engine/engine';

export { isPlaceholderReview, looksLikePlaceholderText } from '@/lib/reviews/schema-engine/placeholders';
export {
  logSchemaEngineEvent,
  getSchemaEngineLogs,
  clearSchemaEngineLogs,
} from '@/lib/reviews/schema-engine/logging';

import type { AggregateRatingResult, PublicReview, Review } from '@/types/reviews';
import type { ReviewedEntity } from '@/types/review-schema';
import type { JsonLd } from '@/schemas/organization';
import {
  buildAggregateRatingSchema,
  buildReviewSchema,
  canGenerateReviewSchema,
  getSchemaEligibleReviews,
} from '@/lib/reviews/schema-engine/engine';

/** @deprecated Prefer buildReviewSchemaBundle with an explicit ReviewedEntity. */
export function buildPublicReviewSchemas(
  reviews: Review[],
  entity: ReviewedEntity = { kind: 'organization', name: 'NovaLikes' },
): JsonLd[] {
  if (!canGenerateReviewSchema(reviews, { entity })) return [];
  const { eligible } = getSchemaEligibleReviews(reviews, { entity });
  return eligible
    .map((review) => buildReviewSchema(review, entity))
    .filter((node): node is JsonLd => node !== null);
}

/** @deprecated Prefer buildAggregateRatingSchema with ReviewSchemaEngineOptions. */
export function buildAggregateRatingSchemaNode(
  reviews: Review[],
  entity: ReviewedEntity = { kind: 'organization', name: 'NovaLikes' },
): JsonLd | null {
  return buildAggregateRatingSchema(reviews, { entity });
}

export function summarizePublicReviews(reviews: PublicReview[]): AggregateRatingResult | null {
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return {
    ratingValue: Number((sum / reviews.length).toFixed(1)),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
