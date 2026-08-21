'use client';

import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

export type ReviewsPlatformFilterId = 'all' | Extract<PlatformId, 'instagram' | 'tiktok' | 'facebook'>;

export type ReviewsPlatformFiltersProps = {
  active: ReviewsPlatformFilterId;
  onSelect: (filter: ReviewsPlatformFilterId) => void;
  counts: Record<ReviewsPlatformFilterId, number>;
  className?: string;
  allLabel?: string;
  ariaLabel?: string;
};

const FILTERS: { id: ReviewsPlatformFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
];

/**
 * Client-side platform filters for the reviews catalogue.
 * Counts must come from the live review dataset — never invented.
 */
export function ReviewsPlatformFilters({
  active,
  onSelect,
  counts,
  className,
  allLabel = 'All',
  ariaLabel = 'Filter reviews by platform',
}: ReviewsPlatformFiltersProps) {
  const filters = FILTERS.map((filter) =>
    filter.id === 'all' ? { ...filter, label: allLabel } : filter,
  );

  return (
    <nav aria-label={ariaLabel} className={cn(className)}>
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
        {filters.map((filter) => {
          const isActive = active === filter.id;
          const count = counts[filter.id];
          return (
            <li key={filter.id} className="shrink-0">
              <button
                type="button"
                className={cn(
                  'min-h-11 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'bg-[#FFF1E6] text-[var(--text-primary)] hover:bg-[#FFE4CC]',
                )}
                aria-pressed={isActive}
                onClick={() => onSelect(filter.id)}
              >
                {filter.label}
                <span className={cn('ms-1.5 tabular-nums', isActive ? 'text-white/90' : 'text-muted-foreground')}>
                  ({count})
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
