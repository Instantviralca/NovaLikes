'use client';

import { useMemo, useState } from 'react';

import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ReviewsExploreCTA } from '@/components/reviews/ReviewsExploreCTA';
import {
  ReviewsPlatformFilters,
  type ReviewsPlatformFilterId,
} from '@/components/reviews/ReviewsPlatformFilters';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { TestimonialsGrid } from '@/components/reviews/TestimonialsGrid';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { ReviewsPageOverlay } from '@/lib/i18n/content/company-english';
import type { AggregateRatingResult, PublicReview } from '@/types/reviews';

const INITIAL_BATCH = 24;
const LOAD_MORE_BATCH = 24;

export type ReviewsPageViewProps = {
  reviews: PublicReview[];
  aggregate: AggregateRatingResult | null;
  copy?: ReviewsPageOverlay;
  locale?: Locale;
  homeLabel?: string;
  homeHref?: string;
  reviewsHref?: string;
};

function filterReviews(
  reviews: PublicReview[],
  filter: ReviewsPlatformFilterId,
): PublicReview[] {
  if (filter === 'all') return reviews;
  return reviews.filter((review) => review.platform === filter);
}

function countByPlatform(reviews: PublicReview[]): Record<ReviewsPlatformFilterId, number> {
  return {
    all: reviews.length,
    instagram: reviews.filter((review) => review.platform === 'instagram').length,
    tiktok: reviews.filter((review) => review.platform === 'tiktok').length,
    facebook: reviews.filter((review) => review.platform === 'facebook').length,
  };
}

/**
 * Client reviews catalogue — filters + progressive reveal.
 * Review content is rendered exactly as provided; this view does not alter copy.
 */
export function ReviewsPageView({
  reviews,
  aggregate,
  copy,
  locale = 'en',
  homeLabel = 'Home',
  homeHref = routes.home,
  reviewsHref = routes.reviews,
}: ReviewsPageViewProps) {
  const [filter, setFilter] = useState<ReviewsPlatformFilterId>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const counts = useMemo(() => countByPlatform(reviews), [reviews]);
  const filtered = useMemo(() => filterReviews(reviews, filter), [reviews, filter]);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterSelect = (next: ReviewsPlatformFilterId) => {
    setFilter(next);
    setVisibleCount(INITIAL_BATCH);
  };

  return (
    <>
      <Section
        spacing="lg"
        className="relative overflow-hidden bg-[#FFFBFA]"
        aria-labelledby="reviews-page-heading"
      >
        <Container size="xl">
          <div className="max-w-2xl">
            <Breadcrumb
              items={[
                { label: homeLabel, href: homeHref },
                { label: copy?.chrome.breadcrumb ?? 'Reviews', href: reviewsHref },
              ]}
            />
            <div className="mt-5 space-y-4">
              {copy?.eyebrow ? <Eyebrow>{copy.eyebrow}</Eyebrow> : null}
              <Heading as="h1" size="h1" id="reviews-page-heading" className={HERO_HEADING_CLASS}>
                {accentLastWord(copy?.h1 ?? 'Customer Reviews')}
              </Heading>
              <MutedText>
                {copy?.intro ??
                  "Customer reviews from NovaLikes' published review catalogue. Ratings below reflect that catalogue and may include both 4-star and 5-star feedback."}
              </MutedText>
              {aggregate ? (
                <ReviewSummary
                  aggregate={aggregate}
                  variant="hero"
                  summaryLabel={
                    copy
                      ? copy.basedOnTemplate
                          .replace('{count}', String(aggregate.reviewCount))
                          .replace(
                            '{word}',
                            aggregate.reviewCount === 1 ? copy.reviewSingular : copy.reviewPlural,
                          )
                      : undefined
                  }
                />
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        spacing="lg"
        className="bg-[#FFFBFA]"
        aria-labelledby="reviews-catalogue-heading"
      >
        <Container size="xl">
          <h2 id="reviews-catalogue-heading" className="sr-only">
            {copy?.catalogueHeading ?? 'Customer review catalogue'}
          </h2>

          {reviews.length > 0 ? (
            <>
              <ReviewsPlatformFilters
                active={filter}
                onSelect={handleFilterSelect}
                counts={counts}
                allLabel={copy?.filterAll}
                ariaLabel={copy?.filterAria}
              />

              <div className="mt-6">
                {visible.length > 0 ? (
                  <TestimonialsGrid
                    reviews={visible}
                    surface="reviews-page"
                    variant="catalogue"
                    layout="masonry"
                    readMoreLabel={copy?.readMore}
                    showLessLabel={copy?.showLess}
                  />
                ) : (
                  <p className="rounded-2xl bg-white/80 px-4 py-8 text-center text-sm text-muted-foreground ring-1 ring-black/[0.04]">
                    {copy?.emptyFilter ?? 'No reviews match this platform filter.'}
                  </p>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="mt-8 flex flex-col items-center gap-3">
                  <p className="text-sm text-muted-foreground tabular-nums">
                    {copy
                      ? copy.showingTemplate
                          .replace('{visible}', String(visible.length))
                          .replace('{total}', String(filtered.length))
                          .replace(
                            '{word}',
                            filtered.length === 1 ? copy.reviewSingular : copy.reviewPlural,
                          )
                      : `Showing ${visible.length} of ${filtered.length} ${
                          filtered.length === 1 ? 'review' : 'reviews'
                        }`}
                  </p>
                  {hasMore ? (
                    <Button
                      type="button"
                      variant="secondary"
                      className={cn('min-w-[12rem] sm:min-w-[14rem]')}
                      onClick={() =>
                        setVisibleCount((current) =>
                          Math.min(current + LOAD_MORE_BATCH, filtered.length),
                        )
                      }
                    >
                      {copy?.loadMore ?? 'Load More Reviews'}
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {copy?.emptyCatalogue ??
                'Customer reviews will appear here when approved feedback is available.'}
            </p>
          )}

          <aside className="mt-12 max-w-2xl rounded-2xl border border-black/[0.06] bg-white px-5 py-5 sm:px-6">
            <h2 className="text-sm font-semibold text-foreground">
              {copy?.collectTitle ?? 'How we collect reviews'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy?.collectBody ??
                'These comments are customer feedback published in the NovaLikes review catalogue. They were imported as historical customer comments. They are not matched to a live order record and are not independently verified by a third party.'}
            </p>
          </aside>
        </Container>
      </Section>

      <ReviewsExploreCTA
        locale={locale}
        title={copy?.exploreTitle}
        intro={copy?.exploreIntro}
        labels={
          copy
            ? {
                instagram: copy.exploreInstagram,
                tiktok: copy.exploreTikTok,
                facebook: copy.exploreFacebook,
              }
            : undefined
        }
      />
    </>
  );
}
