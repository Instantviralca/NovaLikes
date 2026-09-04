import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { ServiceFaqInteraction } from '@/components/sections/service/service-faq-interaction';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

export type ServiceFaqProps = {
  id?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  analyticsServiceSlug?: string;
  className?: string;
  defaultOpenIds?: string[];
  pinnedOpenIds?: string[];
  enhanced?: boolean;
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
    <Text className="pb-4 text-muted-foreground whitespace-pre-line">
      {parts.length > 0 ? parts : answer}
    </Text>
  );
}

/**
 * Service-page FAQ — native disclosure, crawlable in the initial HTML.
 * Search/filter stays on the dedicated /faq page.
 */
export function ServiceFaq({
  id,
  title,
  description,
  items,
  analyticsServiceSlug,
  className,
  defaultOpenIds,
  pinnedOpenIds,
  enhanced = false,
}: ServiceFaqProps) {
  if (items.length === 0) return null;

  const initiallyOpen = new Set([...(defaultOpenIds ?? []), ...(pinnedOpenIds ?? [])]);
  const pinnedIds = pinnedOpenIds ?? [];

  return (
    <Section
      id={id}
      spacing="none"
      className={cn(
        enhanced ? 'py-12 md:py-16 lg:py-20' : undefined,
        className,
      )}
      aria-label="Service FAQ"
    >
      <Container>
        {title || description ? (
          <div
            className={cn(
              'mb-8 space-y-2',
              enhanced ? 'w-full text-center' : 'max-w-2xl',
            )}
          >
            {title ? (
              <Heading as="h2" size="h2">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </div>
        ) : null}

        <div
          className={cn(
            'overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white',
            enhanced
              ? 'ring-1 ring-[#EDE8E3]'
              : 'shadow-[0_18px_40px_-24px_rgba(28,25,23,0.32)]',
          )}
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
                className="group border-b border-[var(--border-subtle)] px-4 py-1.5 last:border-b-0 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--brand-accent-soft)_40%,transparent)] md:px-6 md:py-2"
                open={initiallyOpen.has(item.id) || undefined}
              >
                <summary
                  id={buttonId}
                  className="flex min-h-[4.25rem] cursor-pointer list-none items-center justify-between gap-4 py-5 text-start text-sm font-semibold text-foreground marker:content-none hover:text-[var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:min-h-[4.5rem] md:py-6 md:text-base [&::-webkit-details-marker]:hidden"
                  aria-controls={panelId}
                >
                  <span className="min-w-0 flex-1 break-words pe-2">{item.question}</span>
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-muted-foreground transition-[transform,background-color,color] duration-300 group-open:rotate-180 group-open:bg-[var(--brand-accent-soft)] group-open:text-[var(--brand-primary)] group-hover:bg-[var(--brand-accent-soft)] group-hover:text-[var(--brand-primary)]"
                  >
                    <ChevronDown className="size-4" strokeWidth={2.25} />
                  </span>
                </summary>
                <div id={panelId} className="pb-1">
                  <FaqAnswerText answer={item.answer} />
                </div>
              </details>
            );
          })}
        </div>
        <ServiceFaqInteraction
          serviceSlug={analyticsServiceSlug}
          pinnedIds={pinnedIds}
        />
      </Container>
    </Section>
  );
}
