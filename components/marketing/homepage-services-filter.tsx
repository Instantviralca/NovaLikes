'use client';

import { useState, type ReactNode } from 'react';
import { LayoutGrid } from 'lucide-react';

import {
  PLATFORM_MARKS,
} from '@/components/marketing/platform-marks';
import { cn } from '@/lib/utils';

type FilterId = 'all' | 'instagram' | 'tiktok' | 'facebook';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
];

type HomepageServicesFilterProps = {
  intro: ReactNode;
  aside: ReactNode;
  children: ReactNode;
};

/**
 * Tiny client island for homepage platform chips.
 * Service cards stay server-rendered as children.
 */
export function HomepageServicesFilter({
  intro,
  aside,
  children,
}: HomepageServicesFilterProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:gap-10">
        <div>
          {intro}
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter services by platform"
          >
            {FILTERS.map((item) => {
              const active = filter === item.id;
              const Mark = item.id === 'all' ? null : PLATFORM_MARKS[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    'inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active
                      ? 'bg-[#FFF1E6] text-[#C2410C] ring-1 ring-[#F97316]'
                      : 'bg-white text-[#57534E] ring-1 ring-black/[0.06] hover:bg-[#FAFAF9]',
                  )}
                >
                  {item.id === 'all' ? (
                    <LayoutGrid className="size-3.5" aria-hidden="true" />
                  ) : Mark ? (
                    <span className="size-5 overflow-hidden rounded-md">
                      <Mark />
                    </span>
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        {aside}
      </div>
      <div className="mt-10 space-y-9" data-service-filter={filter}>
        {children}
      </div>
    </>
  );
}
