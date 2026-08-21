import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { PublicLearnTag } from '@/types/learn';

type TagBadgeProps = {
  tag: Pick<PublicLearnTag, 'name' | 'href'>;
  className?: string;
  asLink?: boolean;
};

/**
 * Accessible tag badge — Document 15.04.
 */
export function TagBadge({ tag, className, asLink = true }: TagBadgeProps) {
  const classes = cn(
    'inline-flex items-center rounded-full border border-[#E8DDD3] bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 outline-none transition-colors hover:border-[#F0C7A8] hover:bg-[#FFF8F3] hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2',
    className,
  );

  if (!asLink) {
    return (
      <span className={classes} data-tag-badge>
        {tag.name}
      </span>
    );
  }

  return (
    <Link href={tag.href} className={classes} data-tag-badge>
      {tag.name}
    </Link>
  );
}
