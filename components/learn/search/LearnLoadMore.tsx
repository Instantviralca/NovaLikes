'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LearnLoadMoreProps = {
  onLoadMore: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Optional Load More control — prepared architecture for Document 15.05.
 * Pagination is the Version 1 default.
 */
export function LearnLoadMore({
  onLoadMore,
  disabled,
  className,
}: LearnLoadMoreProps) {
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
