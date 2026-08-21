'use client';

import { FAQItem } from '@/components/faq/FAQItem';
import { cn } from '@/lib/utils';
import type { PublicFaq } from '@/types/faq';

export type FAQAccordionProps = {
  items: PublicFaq[];
  headingLevel?: 'h3' | 'h4';
  onItemOpen?: (faqId: string) => void;
  className?: string;
};

/**
 * Accessible FAQ accordion list — no hardcoded Q&A.
 */
export function FAQAccordion({
  items,
  headingLevel = 'h3',
  onItemOpen,
  className,
}: FAQAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('overflow-hidden rounded-[1.25rem] bg-white shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]', className)}>
      {items.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          headingLevel={headingLevel}
          onOpen={onItemOpen}
        />
      ))}
    </div>
  );
}
