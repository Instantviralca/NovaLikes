'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

import { JsonLdScript } from '@/components/common/json-ld';
import {
  linkingAnalyticsEvents,
  trackLinkingEvent,
} from '@/lib/analytics/linking-events';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  withSchema?: boolean;
  sourceSlug?: string;
  /** Compact utility style for heroes (default). */
  variant?: 'subtle' | 'default';
  showHomeIcon?: boolean;
};

/**
 * Subtle utility breadcrumb — visually secondary to H1.
 * Remains accessible + BreadcrumbList schema when enabled.
 */
export function Breadcrumb({
  items,
  className,
  withSchema = false,
  sourceSlug,
  variant = 'subtle',
  showHomeIcon = true,
}: BreadcrumbProps) {
  if (!items.length) return null;

  const schema = withSchema ? breadcrumbSchema(items) : null;

  return (
    <>
      <JsonLdScript id="breadcrumb-jsonld" data={schema} />
      <nav
        aria-label="Breadcrumb"
        className={cn(
          variant === 'subtle' &&
            'mb-3 max-w-full overflow-x-auto text-[12px] leading-none text-[var(--text-secondary)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          variant === 'default' && 'mb-4 text-sm text-muted-foreground',
          className,
        )}
      >
        <ol className="flex min-w-0 flex-nowrap items-center gap-1.5 whitespace-nowrap sm:flex-wrap sm:whitespace-normal">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isHome =
              index === 0 &&
              (item.href === '/' ||
                /^\/(es|de|fr|it|pt-br|ar)$/.test(item.href ?? '') ||
                item.label.toLowerCase() === 'home');
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight className="size-3 shrink-0 opacity-50 rtl:rotate-180" aria-hidden="true" />
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center gap-1 rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    {showHomeIcon && isHome ? (
                      <Home className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
                    ) : null}
                    <span className={showHomeIcon && isHome ? 'sr-only sm:not-sr-only' : undefined}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span
                    className={cn(
                      'inline-flex min-h-8 items-center',
                      isLast ? 'font-medium text-[var(--text-primary)]' : undefined,
                      !item.label.trim() && 'sr-only',
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label || 'Untitled'}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Alias for design-system naming. */
export const SubtleBreadcrumb = Breadcrumb;
