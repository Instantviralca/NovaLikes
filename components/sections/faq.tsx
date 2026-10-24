'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { homepageAnalyticsEvents, trackHomepageEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

export type FaqProps = {
  title?: string;
  description?: string;
  items: FaqItem[];
  onItemOpen?: (faqId: string) => void;
  headingAs?: 'h2' | 'h3';
  titleId?: string;
  className?: string;
  /** Show search + category chips + help CTA (default true). */
  enhanced?: boolean;
  /** FAQ item ids that should start expanded. */
  defaultOpenIds?: string[];
  /** FAQ item ids that remain open and cannot be collapsed. */
  pinnedOpenIds?: string[];
};

const FAQ_FILTER_ORDER = [
  'All',
  'Packages',
  'Channel Requirements',
  'Video Requirements',
  'Page Requirements',
  'Post Requirements',
  'Delivery',
  'Orders',
  'Support',
  'General',
  'Safety',
  'Platforms',
] as const;
type FaqFilterCategory = Exclude<(typeof FAQ_FILTER_ORDER)[number], 'All'>;

type FaqAccordionItemProps = {
  item: FaqItem;
  open: boolean;
  onToggle: (faqId: string) => void;
};

/** Render FAQ answer text with safe internal markdown links: [label](/path). */
function FaqAnswerText({ answer }: { answer: string }) {
  const parts: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(answer)) !== null) {
    if (match.index > lastIndex) {
      parts.push(answer.slice(lastIndex, match.index));
    }
    const href = match[2];
    // Only allow same-origin relative paths (no protocol-relative //…).
    if (href.startsWith('/') && !href.startsWith('//')) {
      parts.push(
        <Link
          key={`faq-link-${key++}`}
          href={href}
          className="font-medium text-[var(--brand-primary)] underline-offset-2 hover:underline"
        >
          {match[1]}
        </Link>,
      );
    } else {
      parts.push(match[1]);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < answer.length) {
    parts.push(answer.slice(lastIndex));
  }

  return (
    <Text className="pb-4 whitespace-pre-line text-muted-foreground">
      {parts.length > 0 ? parts : answer}
    </Text>
  );
}

function FaqAccordionItem({ item, open, onToggle }: FaqAccordionItemProps) {
  const buttonId = `faq-q-${item.id}`;
  const panelId = `faq-a-${item.id}`;

  return (
    <div className="border-b border-[var(--nl-border)] px-4 py-1.5 transition-colors duration-200 last:border-b-0 hover:bg-[color-mix(in_srgb,var(--brand-accent-soft)_40%,transparent)] md:px-6 md:py-2">
      <h3 className="text-sm font-semibold text-foreground md:text-base">
        <button
          type="button"
          id={buttonId}
          className="group flex min-h-[4.25rem] w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:min-h-[4.5rem] md:py-6"
          aria-expanded={open}
          aria-controls={panelId}
          data-analytics={homepageAnalyticsEvents.home_faq_open}
          onClick={() => onToggle(item.id)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && open) {
              event.preventDefault();
              onToggle(item.id);
            }
          }}
        >
          <span className="pr-2">{item.question}</span>
          <span
            aria-hidden
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-muted-foreground transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--nl-bg-soft)] group-hover:text-[var(--brand-primary)] group-hover:shadow-sm motion-reduce:transition-none',
              open && 'rotate-180 bg-[var(--nl-bg-soft)] text-[var(--brand-primary)] shadow-sm',
            )}
          >
            <ChevronDown className="size-4" strokeWidth={2.25} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
              open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0',
            )}
          >
            <FaqAnswerText answer={item.answer} />
          </div>
        </div>
      </div>
    </div>
  );
}

function resolveFilterCategory(item: FaqItem): FaqFilterCategory {
  if (item.filterCategory) return item.filterCategory;
  const q = `${item.question} ${item.answer}`.toLowerCase();
  if (q.includes('password') || q.includes('safe') || q.includes('public account')) return 'Safety';
  if (
    q.includes('deliver') ||
    q.includes('refill') ||
    q.includes('money-back') ||
    q.includes('gradual')
  )
    return 'Delivery';
  if (q.includes('track') || q.includes('more than one') || q.includes('multiple')) return 'Orders';
  if (
    q.includes('instagram') ||
    q.includes('tiktok') ||
    q.includes('youtube') ||
    q.includes('facebook')
  )
    return 'Platforms';
  return 'General';
}

/**
 * Shared FAQ accordion — reusable on homepage, service, contact, and FAQ hub pages.
 * Content comes entirely from props (no hardcoded FAQ answers).
 */
export function Faq({
  title,
  description,
  items,
  onItemOpen,
  headingAs = 'h2',
  titleId,
  className,
  enhanced = true,
  defaultOpenIds,
  pinnedOpenIds,
}: FaqProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set([...(defaultOpenIds ?? []), ...(pinnedOpenIds ?? [])]),
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const categories = useMemo(() => {
    const present = new Set(items.map(resolveFilterCategory));
    return FAQ_FILTER_ORDER.filter((chip) => chip === 'All' || present.has(chip));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const cat = resolveFilterCategory(item);
      if (category !== 'All' && cat !== category) return false;
      if (!q) return true;
      const searchableAnswer = item.answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
      return item.question.toLowerCase().includes(q) || searchableAnswer.toLowerCase().includes(q);
    });
  }, [items, query, category]);

  const handleToggle = (faqId: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.has(faqId);
      if (isOpen && pinnedOpenIds?.includes(faqId)) {
        return prev;
      }
      if (isMobile) {
        if (isOpen) {
          return new Set(pinnedOpenIds ?? []);
        }
        return new Set([...(pinnedOpenIds ?? []), faqId]);
      }
      const next = new Set(prev);
      if (isOpen) next.delete(faqId);
      else next.add(faqId);
      for (const pinnedId of pinnedOpenIds ?? []) {
        next.add(pinnedId);
      }
      return next;
    });

    if (!openIds.has(faqId)) {
      if (onItemOpen) {
        onItemOpen(faqId);
        return;
      }
      trackHomepageEvent(homepageAnalyticsEvents.home_faq_open, { faqId });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={cn('w-full', className)}>
      {title || description ? (
        <div className="mb-8 max-w-2xl space-y-2 md:mb-8">
          {title ? (
            <Heading as={headingAs} size="h2" id={titleId}>
              {title}
            </Heading>
          ) : null}
          {description ? <MutedText>{description}</MutedText> : null}
        </div>
      ) : null}

      {enhanced ? (
        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[var(--brand-primary)]/70"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="h-14 min-h-14 rounded-2xl border-[var(--nl-border)] bg-white py-3.5 pl-12 text-base shadow-[0_14px_32px_-18px_rgba(28,25,23,0.3)] transition-[box-shadow,border-color,transform] duration-200 placeholder:text-[var(--text-muted)] hover:border-[var(--brand-primary)]/30 focus-visible:border-[var(--brand-primary)]/50 focus-visible:shadow-[0_18px_40px_-18px_rgba(249,115,22,0.42)] focus-visible:ring-0 md:text-base"
              aria-label="Search FAQs"
            />
          </div>
          <div className="flex flex-wrap gap-3" role="group" aria-label="FAQ categories">
            {categories.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setCategory(chip)}
                className={cn(
                  'min-h-11 rounded-full border px-5 py-2.5 text-xs font-semibold transition-[transform,colors,box-shadow] duration-200',
                  category === chip
                    ? 'border-transparent bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white shadow-[0_12px_24px_-12px_rgba(249,115,22,0.9)]'
                    : 'border-[var(--nl-border)] bg-white text-[var(--text-secondary)] shadow-[0_6px_14px_-12px_rgba(28,25,23,0.25)] hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/45 hover:shadow-[0_10px_20px_-12px_rgba(249,115,22,0.35)] motion-reduce:hover:translate-y-0',
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[var(--nl-border)] bg-white shadow-[0_18px_40px_-24px_rgba(28,25,23,0.32)]">
        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No questions match your search.</p>
        ) : (
          filtered.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              open={openIds.has(item.id)}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>

      {enhanced ? (
        <div className="mt-6 grid gap-4 rounded-2xl border border-[var(--nl-border)] bg-[var(--surface-muted)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-[var(--shadow-xs)]">
              <HelpCircle className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Still Have Questions?</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Our support team can help with package selection, checkout, delivery and order
                details.
              </p>
            </div>
          </div>
          <Button asChild className="min-h-11 rounded-xl">
            <Link href={routes.contact}>Contact Support</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
