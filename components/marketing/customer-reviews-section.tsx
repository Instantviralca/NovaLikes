'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';
import type { AggregateRatingResult, PublicReview } from '@/types/reviews';

const PLATFORM_LABEL: Record<PlatformId, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5 text-[#FF6B00]"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden className="text-sm leading-none sm:text-base">
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

function AvatarPlaceholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFB574] text-sm font-bold text-white shadow-[0_6px_16px_-8px_rgba(255,107,0,0.7)]"
      aria-hidden="true"
      title={name}
    >
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <article
      className={cn(
        'flex h-full min-h-[17.5rem] flex-col rounded-[20px] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-md)]',
        'transition-[transform,box-shadow] duration-200 ease-out',
        'hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]',
        'focus-within:ring-2 focus-within:ring-[var(--brand-primary)] focus-within:ring-offset-2',
      )}
    >
      <div className="flex items-start gap-3">
        <AvatarPlaceholder initials={review.customerInitials} name={review.customerName} />
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {review.customerName}
          </h3>
          <p className="truncate text-xs text-[var(--text-secondary)]">
            {review.platform ? PLATFORM_LABEL[review.platform] : 'NovaLikes customer'}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {review.platform ? (
          <span className="rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-primary)]">
            {PLATFORM_LABEL[review.platform]}
          </span>
        ) : null}
        <Stars rating={review.rating} />
      </div>

      <blockquote className="mt-4 flex-1">
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          “{review.reviewText}”
        </p>
      </blockquote>
    </article>
  );
}

export type CustomerReviewsSectionProps = {
  reviews: PublicReview[];
  aggregate: AggregateRatingResult;
  className?: string;
  title?: string;
};

/**
 * Homepage Customer Reviews — lightweight CSS scroll-snap slider.
 * Reviews remain crawlable HTML. No heavy carousel libraries.
 */
export function CustomerReviewsSection({
  reviews,
  aggregate,
  className,
  title = 'Customer Reviews',
}: CustomerReviewsSectionProps) {
  const listId = useId();
  const headingId = 'home-customer-reviews-heading';
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateControls = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    return () => {
      el.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [updateControls, reviews.length]);

  if (reviews.length === 0) return null;

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <Section
      id="home-customer-reviews"
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={headingId}
    >
      <Container size="xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <Heading as="h2" size="h2" id={headingId}>
              {title}
            </Heading>
            <MutedText>
              {aggregate.ratingValue.toFixed(1)} out of {aggregate.bestRating} based on{' '}
              {aggregate.reviewCount} customer reviews
            </MutedText>
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Review slider controls">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 rounded-xl"
              aria-controls={listId}
              aria-label="Show previous reviews"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 rounded-xl"
              aria-controls={listId}
              aria-label="Show next reviews"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight className="size-5" aria-hidden />
            </Button>
          </div>
        </div>

        <div
          id={listId}
          ref={scrollerRef}
          className={cn(
            'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2',
            '[scrollbar-width:none] scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          )}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              scrollByCard(-1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              scrollByCard(1);
            }
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              data-review-card
              className="w-[min(100%,20rem)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Review ${index + 1} of ${reviews.length}`}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Stars rating={5} />
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {aggregate.ratingValue.toFixed(1)} / {aggregate.bestRating} from{' '}
              {aggregate.reviewCount} reviews
            </p>
          </div>
          <Link
            href={routes.reviews}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--brand-primary)] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Read All Reviews
          </Link>
        </div>
      </Container>
    </Section>
  );
}
