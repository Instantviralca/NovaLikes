'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import type { LearnTocItem } from '@/types/learn';

type TableOfContentsProps = {
  title?: string;
  items: LearnTocItem[];
  /** Sticky-header offset in px for scroll-margin / active tracking. */
  headerOffset?: number;
};

/**
 * Article TOC — Document 15.02.
 * Collapsible on mobile; always expanded in the desktop sidebar.
 */
export function TableOfContents({
  title = 'On this page',
  items,
  headerOffset = 96,
}: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0]?.target;
        if (first?.id) setActiveId(first.id);
      },
      {
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [headerOffset, items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="overflow-hidden rounded-2xl border border-[#F0E4D8] bg-white"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#1C1917] outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04] lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      <div className={cn('px-4 pb-4 lg:block lg:pt-4', open ? 'block' : 'hidden')}>
        <p className="mb-3 hidden text-[11px] font-semibold tracking-[0.14em] text-[#E85D04] uppercase lg:block">
          {title}
        </p>
        <ol className="space-y-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? 'pl-3' : undefined}>
                <a
                  href={item.href}
                  className={cn(
                    'block text-sm leading-snug outline-none hover:text-[#E85D04] focus-visible:ring-2 focus-visible:ring-[#E85D04]',
                    isActive ? 'font-medium text-[#E85D04]' : 'text-[#57534E]',
                  )}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
