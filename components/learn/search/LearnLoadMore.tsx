'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LearnLoadMoreProps = {
  onLoadMore: () => void;
  disabled?: boolean;
  className?: string;
  /** `v2` renders the site-v2 `.more-row` + `.btn.ghost` (inside SiteV2Shell). */
  variant?: 'default' | 'v2';
};

/**
 * Optional Load More control — prepared architecture for Document 15.05.
 * Pagination is the Version 1 default.
 */
export function LearnLoadMore({
  onLoadMore,
  disabled,
  className,
  variant = 'default',
}: LearnLoadMoreProps) {
  if (variant === 'v2') {
    return (
      <div className={cn('more-row', className)}>
        <button
          type="button"
          className="btn ghost"
          disabled={disabled}
          onClick={onLoadMore}
        >
          Load More
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex justify-center', className)}>
      <Button
        type="button"
        variant="outline"
        className="min-h-11 rounded-full px-6"
        disabled={disabled}
        onClick={onLoadMore}
      >
        Load More
      </Button>
    </div>
  );
}
