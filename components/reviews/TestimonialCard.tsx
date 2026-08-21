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
import type { PlatformId } from '@/types/platform';
import type { PublicReview } from '@/types/reviews';

export type TestimonialCardVariant = 'default' | 'catalogue';

export type TestimonialCardProps = {
  review: PublicReview;
  className?: string;
  showSource?: boolean;
  serviceHref?: string;
  surface?: string;
  /** Catalogue variant is for /reviews only — compact, no footer divider. */
  variant?: TestimonialCardVariant;
  readMoreLabel?: string;
  showLessLabel?: string;
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

function platformLabel(platform: PlatformId): string {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'tiktok':
      return 'TikTok';
    case 'facebook':
      return 'Facebook';
    case 'youtube':
      return 'YouTube';
    default:
      return platform;
  }
}

function platformChipClass(platform: PlatformId): string {
  switch (platform) {
    case 'instagram':
      return 'bg-[#FFF1E6] text-[#9A3412] ring-[#E1306C]/15';
    case 'tiktok':
      return 'bg-[#F4F4F5] text-neutral-700 ring-neutral-800/10';
    case 'facebook':
      return 'bg-[#EFF6FF] text-[#1D4ED8] ring-[#1877F2]/20';
    default:
      return 'bg-muted text-muted-foreground ring-black/5';
  }
}

function platformAccentClass(platform: PlatformId | undefined): string {
  if (!platform) return '';
  switch (platform) {
    case 'instagram':
      return 'border-l-[#E1306C]/35';
    case 'tiktok':
      return 'border-l-neutral-800/25';
    case 'facebook':
      return 'border-l-[#1877F2]/30';
    default:
      return 'border-l-transparent';
  }
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
  variant = 'default',
  readMoreLabel = 'Read more',
  showLessLabel = 'Show less',
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isCatalogue = variant === 'catalogue';
  const isLong = review.reviewText.length > 220;
  const body =
    !expanded && isLong ? `${review.reviewText.slice(0, 220).trim()}…` : review.reviewText;

  if (isCatalogue) {
    return (
      <article
        className={cn(
          'rounded-2xl border border-black/[0.05] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(50,30,20,0.35)] transition-shadow duration-200 hover:shadow-[0_12px_28px_-16px_rgba(50,30,20,0.4)] sm:p-5',
          review.platform ? 'border-l-[3px]' : null,
          platformAccentClass(review.platform),
          className,
        )}
        aria-labelledby={`review-${review.id}-author`}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFF1E6] text-xs font-semibold text-[var(--text-primary)]"
            aria-hidden
          >
            {review.customerInitials}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <h3
                id={`review-${review.id}-author`}
                className="text-sm font-semibold text-foreground"
              >
                <span dir="ltr" className="[unicode-bidi:isolate]">
                  {review.customerName}
                </span>
              </h3>
              <RatingDisplay rating={review.rating} size="sm" />
            </div>
            {review.platform ? (
              <span
                className={cn(
                  'inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1',
                  platformChipClass(review.platform),
                )}
              >
                {platformLabel(review.platform)}
              </span>
            ) : null}
          </div>
        </div>

        {review.title ? (
          <p className="mt-3 text-sm font-medium text-foreground">{review.title}</p>
        ) : null}

        <Text className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-[var(--text-primary)]/80">
          {body}
        </Text>

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
            {expanded ? showLessLabel : readMoreLabel}
          </button>
        ) : null}
      </article>
    );
  }

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-[1.25rem] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]',
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
            <span dir="ltr" className="[unicode-bidi:isolate]">
              {review.customerName}
            </span>
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
          {expanded ? showLessLabel : readMoreLabel}
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
