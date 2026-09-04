import { Grid } from '@/components/layout/grid';
import { TestimonialCard, type TestimonialCardVariant } from '@/components/reviews/TestimonialCard';
import { cn } from '@/lib/utils';
import type { PublicReview } from '@/types/reviews';

export type TestimonialsGridProps = {
  reviews: PublicReview[];
  className?: string;
  showSource?: boolean;
  surface?: string;
  serviceHrefFor?: (review: PublicReview) => string | undefined;
  variant?: TestimonialCardVariant;
  /**
   * `masonry` — CSS columns, natural card height (reviews catalogue).
   * `natural` — CSS grid, no stretch.
   * `equal` — CSS grid, stretched cards.
   */
  layout?: 'equal' | 'natural' | 'masonry';
  readMoreLabel?: string;
  showLessLabel?: string;
};

/**
 * Responsive testimonials grid — 3 / 2 / 1 columns.
 * No carousel; no horizontal swipe required.
 */
export function TestimonialsGrid({
  reviews,
  className,
  showSource,
  surface,
  serviceHrefFor,
  variant = 'default',
  layout = 'equal',
  readMoreLabel,
  showLessLabel,
}: TestimonialsGridProps) {
  if (reviews.length === 0) return null;

  const cards = reviews.map((review) => (
    <TestimonialCard
      key={review.id}
      review={review}
      showSource={showSource}
      surface={surface}
      variant={variant}
      serviceHref={serviceHrefFor?.(review)}
      readMoreLabel={readMoreLabel}
      showLessLabel={showLessLabel}
    />
  ));

  if (layout === 'masonry') {
    return (
      <div
        className={cn(
          'columns-1 gap-0 sm:columns-2 xl:columns-3',
          className,
        )}
      >
        {cards}
      </div>
    );
  }

  return (
    <Grid
      cols={3}
      className={cn('gap-4', layout === 'natural' && 'items-start', className)}
    >
      {cards}
    </Grid>
  );
}
