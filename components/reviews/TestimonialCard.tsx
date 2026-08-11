'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { RatingDisplay } from '@/components/reviews/RatingDisplay';
import { ReviewSourceLabel } from '@/components/reviews/ReviewSourceLabel';
import { VerifiedPurchaseBadge } from '@/components/reviews/VerifiedPurchaseBadge';
import { Text } from '@/components/typography/text';
import {
  trackReviewEvent,
  reviewAnalyticsEvents,
} from '@/lib/analytics/review-events';
import { cn } from '@/lib/utils';
import type { PublicReview } from '@/types/reviews';

export type TestimonialCardProps = {
  review: PublicReview;
  className?: string;
  showSource?: boolean;
  serviceHref?: string;
  surface?: string;
};

function formatReviewDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsed);
}

/**
 * Public testimonial card — Document 14.02.
 * Never receives or displays internal order references.
 */
export function TestimonialCard({
  review,
  className,
  showSource = false,
  serviceHref,
  surface,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.reviewText.length > 220;
  const body =
    !expanded && isLong ? `${review.reviewText.slice(0, 220).trim()}…` : review.reviewText;

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-none',
        className,
      )}
      aria-labelledby={`review-${review.id}-author`}
    >
      <div className="flex items-start gap-3">
        {review.customerAvatar ? (
          <Image
            src={review.customerAvatar}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground"
            aria-hidden
          >
            {review.customerInitials}
          </div>
        )}
        <div className="min-w-0 space-y-1">
          <h3 id={`review-${review.id}-author`} className="text-sm font-semibold text-foreground">
            {review.customerName}
          </h3>
          <RatingDisplay rating={review.rating} size="sm" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <VerifiedPurchaseBadge verified={review.verifiedPurchase} />
        {review.platform ? (
          <span className="text-xs capitalize text-muted-foreground">{review.platform}</span>
        ) : null}
      </div>

      {review.title ? (
        <p className="mt-3 text-sm font-medium text-foreground">{review.title}</p>
      ) : null}

      <Text className="mt-2 flex-1 text-pretty text-muted-foreground">{body}</Text>

      {isLong ? (
        <button
          type="button"
          className="mt-2 min-h-11 self-start text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={expanded}
          onClick={() => {
            const next = !expanded;
            setExpanded(next);
            if (next) {
              trackReviewEvent(reviewAnalyticsEvents.review_expand, {
                reviewId: review.id,
                surface,
              });
            }
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      ) : null}

      <footer className="mt-4 space-y-1 border-t border-border pt-3">
        {review.source === 'imported_historical' ? null : (
          <time className="text-xs text-muted-foreground" dateTime={review.reviewDate}>
            {formatReviewDate(review.reviewDate)}
          </time>
        )}
        {showSource ? <ReviewSourceLabel source={review.source} /> : null}
        {serviceHref && review.serviceSlug ? (
          <Link
            href={serviceHref}
            className="block min-h-11 py-2 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-analytics={reviewAnalyticsEvents.testimonial_service_click}
            onClick={() =>
              trackReviewEvent(reviewAnalyticsEvents.testimonial_service_click, {
                reviewId: review.id,
                serviceSlug: review.serviceSlug,
                href: serviceHref,
                surface,
              })
            }
          >
            View related service
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
