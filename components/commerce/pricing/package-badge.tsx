'use client';

import { Badge } from '@/components/ui/badge';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { getBadgeLabel } from '@/data/pricing/badges';
import { cn } from '@/lib/utils';
import type { PackageBadgeProps } from '@/components/commerce/pricing/types';

export function PackageBadge({ badge, className }: PackageBadgeProps) {
  const { ui } = useI18nChrome();
  const label =
    badge === 'most-popular'
      ? ui.commerce.mostPopular
      : badge === 'best-value'
        ? ui.commerce.bestValue
        : badge === 'recommended'
          ? ui.commerce.recommended
          : getBadgeLabel(badge);
  return (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-full border-0 bg-[var(--brand-accent-soft)] px-3 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase',
        className,
      )}
      aria-label={`Package badge: ${label}`}
    >
      {label}
    </Badge>
  );
}
