import Link from 'next/link';

import { PopularTags } from '@/components/learn/taxonomy/PopularTags';
import { cn } from '@/lib/utils';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type { InternalLink } from '@/types/linking';

type CategorySidebarProps = {
  category: PublicLearnCategory;
  relatedCategories: PublicLearnCategory[];
  relatedServices: InternalLink[];
  popularTags?: PublicLearnTag[];
  className?: string;
};

/**
 * Category sidebar — Document 15.04.
 * Related links come from taxonomy + linking helpers (never hardcoded).
 */
export function CategorySidebar({
  category,
  relatedCategories,
  relatedServices,
  popularTags = [],
  className,
}: CategorySidebarProps) {
  const hasLinks =
    relatedCategories.length > 0 ||
    relatedServices.length > 0 ||
    popularTags.length > 0;

  if (!hasLinks) return null;

  return (
    <aside
      className={cn('flex flex-col gap-6', className)}
      aria-label={`${category.name} details`}
    >
      {relatedCategories.length > 0 ? (
        <nav aria-label="Related categories">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
            More topics
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {relatedCategories.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="inline-flex h-8 items-center rounded-full border border-[#E8DDD3] bg-white px-3 text-[13px] font-medium text-neutral-700 outline-none transition-colors hover:border-[#F0C7A8] hover:bg-[#FFF8F3] focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {relatedServices.length > 0 ? (
        <nav aria-label="Related services">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E85D04]">
            Related
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {relatedServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="text-sm text-neutral-600 underline-offset-2 outline-none hover:text-neutral-900 hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {popularTags.length > 0 ? (
        <PopularTags tags={popularTags} title="Popular topics" />
      ) : null}
    </aside>
  );
}
