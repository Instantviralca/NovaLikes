import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { PublicLearnCategory } from '@/types/learn';

type CategoryCardProps = {
  category: PublicLearnCategory;
  className?: string;
};

const PLATFORM_ICON: Record<string, string> = {
  instagram: '/assets/platforms/instagram.svg',
  tiktok: '/assets/platforms/tiktok.svg',
  facebook: '/assets/platforms/facebook.svg',
  youtube: '/assets/platforms/youtube.svg',
};

/**
 * Category card — Document 15.04.
 * Href comes from the shared registry projection.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
  const iconSrc =
    (category.platformId && PLATFORM_ICON[category.platformId]) ||
    (category.icon && PLATFORM_ICON[category.icon]);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5 sm:p-6',
        className,
      )}
      data-category-id={category.id}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4ED] ring-1 ring-[#F0E4D8]">
          {iconSrc ? (
            <Image src={iconSrc} alt="" width={28} height={28} className="h-7 w-7" />
          ) : (
            <span className="text-sm font-bold text-[#E85D04]">
              {category.name.slice(0, 1)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-neutral-900">
            <Link
              href={category.href}
              className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              <span className="group-hover:underline">{category.name}</span>
            </Link>
          </h3>
          <p className="mt-0.5 text-xs font-medium text-neutral-500">
            {category.articleCount === 0
              ? 'Guides coming soon'
              : `${category.articleCount} article${category.articleCount === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
        {category.description}
      </p>
      <p className="mt-4 text-sm font-semibold text-[#E85D04]">Browse guides →</p>
    </article>
  );
}
