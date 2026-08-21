'use client';

import { useId, useState } from 'react';

import { Text } from '@/components/typography/text';
import { FAQRelatedLinks } from '@/components/faq/FAQRelatedLinks';
import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import { cn } from '@/lib/utils';
import type { PublicFaq } from '@/types/faq';

export type FAQItemProps = {
  faq: PublicFaq;
  headingLevel?: 'h3' | 'h4';
  onOpen?: (faqId: string) => void;
  className?: string;
};

/**
 * Single accessible FAQ accordion row — content from PublicFaq only.
 * Answers remain in the HTML for indexing; accordion only toggles visibility.
 */
export function FAQItem({
  faq,
  headingLevel = 'h3',
  onOpen,
  className,
}: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const buttonId = `${reactId}-question`;
  const panelId = `${reactId}-answer`;
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        'border-b border-border px-4 py-1 last:border-b-0 md:px-5',
        className,
      )}
    >
      <HeadingTag className="text-sm font-medium text-foreground">
        <button
          type="button"
          id={buttonId}
          className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between gap-4 py-3 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={open}
          aria-controls={panelId}
          data-analytics={faqAnalyticsEvents.faq_question_open}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) {
              trackFaqEvent(faqAnalyticsEvents.faq_question_open, {
                faqId: faq.id,
              });
              onOpen?.(faq.id);
            }
          }}
        >
          <span className="min-w-0 flex-1 break-words">{faq.question}</span>
          <span
            aria-hidden
            className={cn(
              'shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none',
              open && 'rotate-45',
            )}
          >
            +
          </span>
        </button>
      </HeadingTag>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <Text className="pb-2 text-muted-foreground whitespace-pre-line">
            {faq.answer}
          </Text>
          {faq.relatedLinks.length > 0 ? (
            <div className="pb-4">
              <FAQRelatedLinks links={faq.relatedLinks} faqId={faq.id} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
