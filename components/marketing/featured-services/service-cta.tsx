import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { homepageAnalyticsEvents } from '@/lib/analytics';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';
import type { ServiceCTAProps } from '@/components/marketing/featured-services/types';

/** Secondary-style explore CTA into a service page. */
export function ServiceCTA({ label, href, ariaLabel, className }: ServiceCTAProps) {
  return (
    <Button asChild variant="outline" className={cn('min-h-11 w-full', className)}>
      <Link
        href={href}
        prefetch={prefetchForHref(href)}
        aria-label={ariaLabel ?? label}
        data-analytics={homepageAnalyticsEvents.home_service_click}
      >
        {label}
      </Link>
    </Button>
  );
}
