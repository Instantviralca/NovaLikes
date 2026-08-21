'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import { homepageAnalyticsEvents } from '@/lib/analytics';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';
import type { PlatformCTAProps } from '@/components/marketing/platform-selector/types';

function scrollToHash(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', href);
  return true;
}

/** Outline CTA into a platform destination — label/href from content. */
export function PlatformCTA({ label, href, className }: PlatformCTAProps) {
  const isInPageHash = href.startsWith('#');

  const handleHashClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isInPageHash) return;
    if (scrollToHash(href)) {
      event.preventDefault();
    }
  };

  return (
    <Button asChild variant="outline" className={cn('min-h-11 w-full', className)}>
      {isInPageHash ? (
        <a
          href={href}
          onClick={handleHashClick}
          data-analytics={homepageAnalyticsEvents.home_platform_click}
        >
          {label}
        </a>
      ) : (
        <Link href={href} prefetch={prefetchForHref(href)} data-analytics={homepageAnalyticsEvents.home_platform_click}>
          {label}
        </Link>
      )}
    </Button>
  );
}
