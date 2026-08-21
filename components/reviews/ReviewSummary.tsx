import { RatingDisplay } from '@/components/reviews/RatingDisplay';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';
import type { AggregateRatingResult } from '@/types/reviews';

export type ReviewSummaryProps = {
  aggregate: AggregateRatingResult;
  className?: string;
  /** Hero stacked summary for the reviews page. */
  variant?: 'inline' | 'hero';
  summaryLabel?: string;
};

/**
 * Visible aggregate summary calculated from eligible approved reviews only.
 */
export function ReviewSummary({
  aggregate,
  className,
  variant = 'inline',
  summaryLabel,
}: ReviewSummaryProps) {
  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'inline-flex flex-col rounded-2xl border border-black/[0.05] bg-white/80 px-4 py-3 shadow-[0_8px_24px_-18px_rgba(50,30,20,0.35)]',
          className,
        )}
      >
        <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {aggregate.ratingValue.toFixed(1)}
        </p>
        <RatingDisplay rating={aggregate.ratingValue} className="mt-1" />
        <Text className="mt-1.5 text-sm text-muted-foreground">
          {summaryLabel ??
            `Based on ${aggregate.reviewCount} customer ${
              aggregate.reviewCount === 1 ? 'review' : 'reviews'
            }`}
        </Text>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <RatingDisplay rating={aggregate.ratingValue} />
      <Text className="text-sm text-muted-foreground">
        {aggregate.ratingValue.toFixed(1)} out of {aggregate.bestRating} based on{' '}
        {aggregate.reviewCount} customer{' '}
        {aggregate.reviewCount === 1 ? 'review' : 'reviews'}
      </Text>
    </div>
  );
}
