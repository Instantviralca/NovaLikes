/**
 * Centralized Review & AggregateRating schema engine — Document 14.03.
 * Generates structured data only from genuine, approved, visible, relevant reviews.
 */

import { reviewSchemaEngineConfig } from '@/config/review-schema';
import { sanitizeCustomerDisplayName, sanitizeReviewText } from '@/lib/reviews/sanitize';
import { isPubliclyEligible } from '@/lib/reviews/status';
import { isPlaceholderReview, looksLikePlaceholderText } from '@/lib/reviews/schema-engine/placeholders';
import { logSchemaEngineEvent } from '@/lib/reviews/schema-engine/logging';
import { aggregateRatingSchema, reviewSchema } from '@/schemas/review';
import type { JsonLd } from '@/schemas/organization';
import type {
  ReviewedEntity,
  ReviewSchemaAdminPreview,
  ReviewSchemaBuildResult,
  ReviewSchemaEngineOptions,
  SchemaEligibleReviewResult,
  SchemaExclusionReason,
} from '@/types/review-schema';
import type { AggregateRatingResult, Review } from '@/types/reviews';

export function validateRatingValue(
  rating: unknown,
  bestRating = reviewSchemaEngineConfig.bestRating,
  worstRating = reviewSchemaEngineConfig.worstRating,
): rating is number {
  if (typeof rating !== 'number' || Number.isNaN(rating)) return false;
  if (!Number.isFinite(rating)) return false;
  return rating >= worstRating && rating <= bestRating;
}

export function validateReviewedEntity(entity: ReviewedEntity): boolean {
  if (!entity.name?.trim()) return false;
  if (entity.kind === 'service') return Boolean(entity.serviceSlug?.trim());
  if (entity.kind === 'platform') return Boolean(entity.platform);
  if (entity.kind === 'organization') return true;
  return false;
}

/**
 * Entity matching:
 * - service: exact serviceSlug only (never mix other services)
 * - platform: matching platform reviews for a platform grouping page
 * - organization: general NovaLikes reviews (no conflicting service-only scope)
 */
export function matchesReviewedEntity(review: Review, entity: ReviewedEntity): boolean {
  if (entity.kind === 'service') {
    if (review.serviceSlug === entity.serviceSlug) return true;
    // Another service's exclusive review must never attach here.
    if (review.serviceSlug && review.serviceSlug !== entity.serviceSlug) return false;
    if (review.platform && entity.platform && review.platform === entity.platform) return true;
    // General NovaLikes reviews (no platform / service scope).
    if (!review.platform && !review.serviceSlug) return true;
    return false;
  }

  if (entity.kind === 'platform') {
    return review.platform === entity.platform;
  }

  // Organization: prefer reviews without a conflicting service-specific exclusive scope.
  // Service-linked reviews may still appear on org pages when explicitly placed for homepage/about.
  if (review.displayLocations.includes('homepage') || review.displayLocations.includes('about')) {
    return true;
  }
  if (!review.serviceSlug) return true;
  // Service-specific reviews without org/homepage/about placement do not count as org reviews.
  return false;
}

export function getPublicReviewAuthor(review: Review): string | null {
  if (!review.consentConfirmed) return null;
  const name = sanitizeCustomerDisplayName(review.customerName);
  if (!name) return null;
  if (looksLikePlaceholderText(name)) return null;
  return name;
}

export function sanitizeReviewForSchema(review: Review): {
  author: string;
  reviewBody: string;
  datePublished: string;
  ratingValue: number;
} | null {
  const author = getPublicReviewAuthor(review);
  if (!author) return null;

  const reviewBody = sanitizeReviewText(review.reviewText);
  if (!reviewBody) return null;

  if (!validateRatingValue(review.rating)) return null;

  return {
    author,
    reviewBody,
    datePublished: review.source === 'imported_historical' ? '' : review.reviewDate,
    ratingValue: review.rating,
  };
}

function collectExclusionReasons(
  review: Review,
  options: ReviewSchemaEngineOptions,
): SchemaExclusionReason[] {
  const reasons: SchemaExclusionReason[] = [];

  if (review.status !== 'approved') reasons.push('not_approved');
  if (!review.consentConfirmed) reasons.push('missing_consent');

  if (review.rating == null) {
    reasons.push('missing_rating');
  } else if (!validateRatingValue(review.rating)) {
    reasons.push('invalid_rating');
  }

  if (!matchesReviewedEntity(review, options.entity)) {
    reasons.push('entity_mismatch');
  }

  if (options.visibleReviewIds && !options.visibleReviewIds.includes(review.id)) {
    reasons.push('not_visible_on_page');
  }

  if (isPlaceholderReview(review)) {
    reasons.push('placeholder_detected');
  }

  if (!getPublicReviewAuthor(review)) {
    reasons.push('private_identity');
  }

  return reasons;
}

export function getSchemaEligibleReviews(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): SchemaEligibleReviewResult {
  const eligible: Review[] = [];
  const excluded: SchemaEligibleReviewResult['excluded'] = [];

  if (options.reviewSectionVisible === false) {
    for (const review of reviews) {
      excluded.push({ review, reasons: ['section_hidden'] });
      logSchemaEngineEvent('review_excluded', 'Review section hidden', {
        reviewId: review.id,
        entityKind: options.entity.kind,
      });
    }
    return { eligible, excluded };
  }

  for (const review of reviews) {
    const reasons = collectExclusionReasons(review, options);

    // Primary gate: approved + consented (also covered in reasons)
    if (!isPubliclyEligible(review) && !reasons.includes('not_approved') && !reasons.includes('missing_consent')) {
      reasons.push('not_approved');
    }

    if (reasons.length > 0) {
      excluded.push({ review, reasons });
      for (const reason of reasons) {
        if (reason === 'missing_consent') {
          logSchemaEngineEvent('missing_consent', 'Review missing publication consent', {
            reviewId: review.id,
            entityKind: options.entity.kind,
          });
        } else if (reason === 'invalid_rating' || reason === 'missing_rating') {
          logSchemaEngineEvent('invalid_rating', 'Review rating invalid or missing', {
            reviewId: review.id,
            entityKind: options.entity.kind,
          });
        } else if (reason === 'entity_mismatch') {
          logSchemaEngineEvent('entity_mismatch', 'Review does not match reviewed entity', {
            reviewId: review.id,
            entityKind: options.entity.kind,
          });
        } else if (reason === 'placeholder_detected') {
          logSchemaEngineEvent('placeholder_detected', 'Placeholder review rejected', {
            reviewId: review.id,
            entityKind: options.entity.kind,
          });
        } else {
          logSchemaEngineEvent('review_excluded', `Review excluded: ${reason}`, {
            reviewId: review.id,
            entityKind: options.entity.kind,
            meta: { reason },
          });
        }
      }
      continue;
    }

    eligible.push(review);
  }

  return { eligible, excluded };
}

export function calculateAggregateRating(
  reviews: Review[],
  options?: Pick<ReviewSchemaEngineOptions, 'entity' | 'visibleReviewIds' | 'reviewSectionVisible'>,
): AggregateRatingResult | null {
  const entity = options?.entity ?? ({ kind: 'organization', name: 'NovaLikes' } as const);
  const { eligible } = getSchemaEligibleReviews(reviews, {
    entity,
    visibleReviewIds: options?.visibleReviewIds,
    reviewSectionVisible: options?.reviewSectionVisible,
  });

  if (eligible.length === 0) return null;

  const sum = eligible.reduce((total, review) => total + Number(review.rating), 0);
  const places = reviewSchemaEngineConfig.aggregateDecimalPlaces;
  const ratingValue = Number((sum / eligible.length).toFixed(places));

  const result: AggregateRatingResult = {
    ratingValue,
    reviewCount: eligible.length,
    bestRating: reviewSchemaEngineConfig.bestRating,
    worstRating: reviewSchemaEngineConfig.worstRating,
  };

  logSchemaEngineEvent('aggregate_recalculated', 'Aggregate rating calculated from eligible reviews', {
    entityKind: entity.kind,
    meta: {
      ratingValue: result.ratingValue,
      reviewCount: result.reviewCount,
    },
  });

  return result;
}

export function canGenerateReviewSchema(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): boolean {
  if (options.reviewSchemaEnabled === false) return false;
  if (options.reviewSectionVisible === false) return false;
  if (!validateReviewedEntity(options.entity)) return false;
  if (!reviewSchemaEngineConfig.reviewSchemaEnabled) return false;

  const { eligible } = getSchemaEligibleReviews(reviews, options);
  const minimum = options.requireMinimumCount ?? 1;
  return eligible.length >= minimum;
}

export function canGenerateAggregateRating(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): boolean {
  if (options.aggregateSchemaEnabled === false) return false;
  if (options.reviewSectionVisible === false) return false;
  if (!validateReviewedEntity(options.entity)) return false;
  if (!reviewSchemaEngineConfig.aggregateSchemaEnabled) return false;

  const aggregate = calculateAggregateRating(reviews, options);
  if (!aggregate) return false;

  const minimum =
    options.requireMinimumCount ?? reviewSchemaEngineConfig.minimumAggregateCount;
  return aggregate.reviewCount >= minimum;
}

function itemReviewedNode(entity: ReviewedEntity): JsonLd {
  if (entity.kind === 'service') {
    return {
      '@type': 'Service',
      name: entity.name,
      ...(entity.url ? { url: entity.url } : {}),
    };
  }
  if (entity.kind === 'platform') {
    return {
      '@type': 'Service',
      name: entity.name,
      ...(entity.url ? { url: entity.url } : {}),
    };
  }
  return {
    '@type': 'Organization',
    name: entity.name,
    ...(entity.url ? { url: entity.url } : {}),
  };
}

export function buildReviewSchema(
  review: Review,
  entity: ReviewedEntity,
): JsonLd | null {
  const sanitized = sanitizeReviewForSchema(review);
  if (!sanitized) return null;
  if (!matchesReviewedEntity(review, entity)) return null;
  if (isPlaceholderReview(review)) return null;

  return {
    ...reviewSchema({
      author: sanitized.author,
      reviewBody: sanitized.reviewBody,
      ratingValue: sanitized.ratingValue,
      bestRating: reviewSchemaEngineConfig.bestRating,
      ...(sanitized.datePublished ? { datePublished: sanitized.datePublished } : {}),
      itemReviewed: itemReviewedNode(entity),
    }),
  };
}

export function buildAggregateRatingSchema(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): JsonLd | null {
  if (!canGenerateAggregateRating(reviews, options)) return null;

  const aggregate = calculateAggregateRating(reviews, options);
  if (!aggregate) return null;

  // No manual override — values come only from calculateAggregateRating.
  return aggregateRatingSchema({
    ratingValue: aggregate.ratingValue,
    reviewCount: aggregate.reviewCount,
    bestRating: reviewSchemaEngineConfig.bestRating,
    worstRating: reviewSchemaEngineConfig.worstRating,
  });
}

export function buildReviewSchemaBundle(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): ReviewSchemaBuildResult {
  const skippedReasons: SchemaExclusionReason[] = [];

  if (options.reviewSectionVisible === false) {
    skippedReasons.push('section_hidden');
  }
  if (options.reviewSchemaEnabled === false || !reviewSchemaEngineConfig.reviewSchemaEnabled) {
    skippedReasons.push('schema_disabled');
  }
  if (!validateReviewedEntity(options.entity)) {
    skippedReasons.push('entity_mismatch');
  }

  const { eligible, excluded } = getSchemaEligibleReviews(reviews, options);

  if (eligible.length === 0 && skippedReasons.length === 0) {
    skippedReasons.push('empty_review_set');
  }

  const canReviews = canGenerateReviewSchema(reviews, options);
  const canAggregate = canGenerateAggregateRating(reviews, options);

  const reviewNodes = canReviews
    ? eligible
        .map((review) => buildReviewSchema(review, options.entity))
        .filter((node): node is JsonLd => node !== null)
    : [];

  const aggregate = canAggregate ? buildAggregateRatingSchema(reviews, options) : null;
  const aggregateValues = canAggregate ? calculateAggregateRating(reviews, options) : null;

  const generated = reviewNodes.length > 0 || aggregate !== null;

  if (generated) {
    logSchemaEngineEvent('schema_generated', 'Review schema bundle generated', {
      entityKind: options.entity.kind,
      meta: {
        reviewCount: reviewNodes.length,
        hasAggregate: Boolean(aggregate),
      },
    });
  } else {
    logSchemaEngineEvent('schema_skipped', 'Review schema bundle skipped', {
      entityKind: options.entity.kind,
      meta: {
        reason: skippedReasons[0] ?? 'empty_review_set',
      },
    });
  }

  return {
    reviews: reviewNodes,
    aggregate,
    aggregateValues,
    eligibleReviewIds: eligible.map((review) => review.id),
    excluded: excluded.map((item) => ({
      reviewId: item.review.id,
      reasons: item.reasons,
    })),
    generated,
    skippedReasons,
  };
}

/**
 * Admin preview architecture — Document 14.03.
 * No backend CRUD; calculated values cannot be manually overridden in V1.
 */
export function buildReviewSchemaAdminPreview(
  reviews: Review[],
  options: ReviewSchemaEngineOptions,
): ReviewSchemaAdminPreview {
  const { eligible, excluded } = getSchemaEligibleReviews(reviews, options);
  const aggregate = calculateAggregateRating(reviews, options);

  return {
    reviewSchemaEnabled:
      options.reviewSchemaEnabled !== false && reviewSchemaEngineConfig.reviewSchemaEnabled,
    aggregateSchemaEnabled:
      options.aggregateSchemaEnabled !== false &&
      reviewSchemaEngineConfig.aggregateSchemaEnabled,
    eligibleReviews: eligible.map((review) => ({
      id: review.id,
      customerName: sanitizeCustomerDisplayName(review.customerName),
      rating: review.rating,
      serviceSlug: review.serviceSlug,
      platform: review.platform,
    })),
    excludedReviews: excluded.map((item) => ({
      id: item.review.id,
      customerName: sanitizeCustomerDisplayName(item.review.customerName),
      reasons: item.reasons,
    })),
    aggregate,
    entityValid: validateReviewedEntity(options.entity),
    canGenerateReviewSchema: canGenerateReviewSchema(reviews, options),
    canGenerateAggregateRating: canGenerateAggregateRating(reviews, options),
  };
}
