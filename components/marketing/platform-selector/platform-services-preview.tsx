import Link from 'next/link';
import { Check } from 'lucide-react';

import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';
import type { PlatformServicesPreviewProps } from '@/components/marketing/platform-selector/types';

/** Top services preview list — labels/hrefs from Service Registry via content mapper. */
export function PlatformServicesPreview({ items, className }: PlatformServicesPreviewProps) {
  if (!items.length) return null;

  return (
    <ul className={cn('space-y-2 text-sm text-muted-foreground', className)}>
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <Check
            className="size-3.5 shrink-0 text-foreground/55"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <Link
            href={item.href}
            prefetch={prefetchForHref(item.href)}
            className="leading-none underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
