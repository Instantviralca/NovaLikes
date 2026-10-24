'use client';

import Link from 'next/link';

import {
  linkingAnalyticsEvents,
  trackLinkingEvent,
} from '@/lib/analytics/linking-events';
import type { BreadcrumbItem } from '@/types/shared';

type LearnCrumbsProps = {
  items: BreadcrumbItem[];
  sourceSlug?: string;
};

/**
 * Site-v2 `.crumbs` breadcrumb. Keeps the existing breadcrumb click analytics.
 * No JSON-LD is emitted here (BreadcrumbList stays in the page graph).
 */
export function LearnCrumbs({ items, sourceSlug }: LearnCrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} style={{ display: 'contents' }}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                data-analytics={linkingAnalyticsEvents.breadcrumb_click}
                onClick={() =>
                  trackLinkingEvent(linkingAnalyticsEvents.breadcrumb_click, {
                    href: item.href,
                    label: item.label,
                    sourceSlug,
                    surface: 'breadcrumb',
                  })
                }
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
