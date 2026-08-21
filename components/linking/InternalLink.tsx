'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  linkingAnalyticsEvents,
  trackLinkingEvent,
} from '@/lib/analytics/linking-events';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';
import type { InternalLink } from '@/types/linking';

type InternalLinkProps = {
  link: InternalLink;
  sourceSlug?: string;
  surface?: 'related_service' | 'policy' | 'general' | 'breadcrumb';
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children'>;

/**
 * Registry-driven internal link — descriptive anchors, focus styles, analytics.
 */
export function InternalLinkAnchor({
  link,
  sourceSlug,
  surface = 'general',
  className,
  children,
  onClick,
  ...props
}: InternalLinkProps) {
  const label = children ?? link.label;

  return (
    <Link
      href={link.href}
      prefetch={prefetchForHref(link.href)}
      className={cn(
        'min-h-11 inline-flex items-center underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      data-analytics={
        surface === 'related_service'
          ? linkingAnalyticsEvents.related_service_click
          : surface === 'policy'
            ? linkingAnalyticsEvents.policy_link_click
            : linkingAnalyticsEvents.internal_link_click
      }
      onClick={(event) => {
        const eventName =
          surface === 'related_service'
            ? linkingAnalyticsEvents.related_service_click
            : surface === 'policy'
              ? linkingAnalyticsEvents.policy_link_click
              : linkingAnalyticsEvents.internal_link_click;

        trackLinkingEvent(eventName, {
          href: link.href,
          label: link.label,
          slug: link.slug,
          sourceSlug,
          surface,
        });
        onClick?.(event);
      }}
      {...props}
    >
      {label}
    </Link>
  );
}
