import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ServiceFaqInteraction } from '@/components/sections/service/service-faq-interaction';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

export type InstagramFollowersServiceFaqProps = {
  id?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  analyticsServiceSlug?: string;
  defaultOpenIds?: string[];
  pinnedOpenIds?: string[];
  contactHref?: string;
  contactLabel?: string;
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
    if (href.startsWith('/') && !href.startsWith('//')) {
      parts.push(
        <Link
          key={`faq-link-${key++}`}
          href={href}
          className="font-medium text-[var(--nl-orange)] underline-offset-2 hover:underline"
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
    <p className="pb-5 text-[15px] leading-relaxed text-[var(--nl-muted)] whitespace-pre-line md:text-base">
      {parts.length > 0 ? parts : answer}
    </p>
  );
}

/**
 * Buy Instagram Followers FAQ — Buzzoid-style split layout (left intro + right accordion).
 * Other service pages keep the shared ServiceFaq card list.
 */
export function InstagramFollowersServiceFaq({
  id,
  title,
  description,
  items,
  analyticsServiceSlug,
  defaultOpenIds,
  pinnedOpenIds,
  contactHref = '/contact',
  contactLabel = 'Contact us',
}: InstagramFollowersServiceFaqProps) {
  if (items.length === 0) return null;

  const initiallyOpen = new Set([...(defaultOpenIds ?? []), ...(pinnedOpenIds ?? [])]);
  const pinnedIds = pinnedOpenIds ?? [];
  const headingId = id ? `${id}-heading` : 'ig-followers-faq-heading';

  return (
    <Section
      id={id}
      spacing="none"
      className="bg-white py-14 md:py-18 lg:py-20"
      aria-labelledby={headingId}
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            {title ? (
              <div className="relative max-w-md">
                <span
                  className="pointer-events-none absolute -top-3 left-[4.5rem] flex gap-0.5 sm:left-[5.5rem]"
                  aria-hidden
                >
                  <span className="block h-2.5 w-0.5 -rotate-[18deg] rounded-full bg-[var(--nl-orange)]" />
                  <span className="block h-3.5 w-0.5 rotate-[8deg] rounded-full bg-[var(--nl-orange)]" />
                  <span className="block h-2 w-0.5 -rotate-[12deg] rounded-full bg-[var(--nl-orange)]" />
                </span>
                <h2
                  id={headingId}
                  className="text-3xl font-extrabold tracking-tight text-[var(--nl-ink)] sm:text-4xl sm:leading-[1.15]"
                >
                  {title}
                </h2>
              </div>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--nl-muted)]">
                {description}
              </p>
            ) : null}
            <Link
              href={contactHref}
              className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#F3F4F6] py-1.5 pe-1.5 ps-5 text-sm font-semibold text-[var(--nl-ink)] transition hover:bg-[#E8EAED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)]"
            >
              {contactLabel}
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--nl-ink)] text-white">
                <ArrowRight className="size-3.5" strokeWidth={2.5} aria-hidden />
              </span>
            </Link>
          </div>

          <div
            className="min-w-0"
            data-service-faq
            data-analytics-service={analyticsServiceSlug ?? ''}
          >
            {items.map((item) => {
              const buttonId = `faq-q-${item.id}`;
              const panelId = `faq-a-${item.id}`;
              return (
                <details
                  key={item.id}
                  data-faq-id={item.id}
                  className="group border-b border-[var(--nl-border)] first:border-t first:border-[var(--nl-border)]"
                  open={initiallyOpen.has(item.id) || undefined}
                >
                  <summary
                    id={buttonId}
                    className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-start marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(249_115_22_/_0.35)] focus-visible:ring-offset-2 md:py-6 [&::-webkit-details-marker]:hidden"
                    aria-controls={panelId}
                  >
                    <span className="min-w-0 flex-1 pe-2 text-[15px] font-bold leading-snug text-[var(--nl-ink)] md:text-base">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'relative flex size-8 shrink-0 items-center justify-center rounded-md transition-colors duration-200',
                        'bg-[#EEF0F3] text-[var(--nl-ink)]',
                        'group-open:bg-[var(--nl-ink)] group-open:text-white',
                      )}
                    >
                      <Plus className="size-3.5 group-open:hidden" strokeWidth={2.5} />
                      <Minus className="absolute size-3.5 hidden group-open:block" strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div id={panelId}>
                    <FaqAnswerText answer={item.answer} />
                  </div>
                </details>
              );
            })}
          </div>
        </div>
        <ServiceFaqInteraction serviceSlug={analyticsServiceSlug} pinnedIds={pinnedIds} />
      </Container>
    </Section>
  );
}
