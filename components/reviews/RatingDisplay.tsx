import { cn } from '@/lib/utils';

export type RatingDisplayProps = {
  rating: number;
  bestRating?: number;
  className?: string;
  size?: 'sm' | 'md';
};

/**
 * Accessible star rating — Document 14.02.
 * Screen-reader text announces the numeric rating; stars are aria-hidden.
 * Fractional ratings (e.g. 4.8) fill floor(rating) stars so a 4.8 aggregate
 * does not look identical to a perfect 5.0.
 */
export function RatingDisplay({
  rating,
  bestRating = 5,
  className,
  size = 'md',
}: RatingDisplayProps) {
  const clamped = Math.min(bestRating, Math.max(0, rating));
  const fullStars = Math.min(bestRating, Math.floor(clamped));
  const emptyStars = Math.max(0, bestRating - fullStars);
  const label =
    Number.isInteger(clamped) || Math.abs(clamped - Math.round(clamped)) < 1e-9
      ? `${clamped} out of ${bestRating} stars`
      : `${clamped.toFixed(1)} out of ${bestRating} stars`;
  const starClass = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div
      className={cn('inline-flex items-center gap-1 text-foreground', className)}
      role="img"
      aria-label={`Rated ${label}`}
    >
      <span className={cn('tracking-tight text-amber-600', starClass)} aria-hidden>
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
