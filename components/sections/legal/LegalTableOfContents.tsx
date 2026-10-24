'use client';

import { useState } from 'react';

import { Heading } from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/types/components';

export type LegalTableOfContentsProps = {
  title?: string;
  items: TocItem[];
  className?: string;
  /** Sticky sidebar on large screens when usable. */
  stickyDesktop?: boolean;
};

/**
 * Accessible legal-page table of contents.
 * Sticky on desktop when enabled; collapsible on smaller screens.
 */
export function LegalTableOfContents({
  title = 'On this page',
  items,
  className,
  stickyDesktop = true,
}: LegalTableOfContentsProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'rounded-2xl border border-[var(--nl-border)] bg-[var(--nl-bg-soft)] p-4 shadow-sm',
        stickyDesktop && 'lg:sticky lg:top-24 lg:self-start',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 lg:block">
        <Heading as="h2" size="h4" className="mb-0 lg:mb-3">
          {title}
        </Heading>
        <Button
          type="button"
          variant="outline"
          className="min-h-11 shrink-0 lg:hidden"
          aria-expanded={open}
          aria-controls="legal-toc-list"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide' : 'Show'}
        </Button>
      </div>

      <ol
        id="legal-toc-list"
        className={cn('mt-3 space-y-1 lg:mt-0 lg:block', open ? 'block' : 'hidden lg:block')}
      >
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="block min-h-11 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
