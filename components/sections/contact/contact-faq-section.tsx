'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type ContactFaqSectionProps = {
  eyebrow?: string;
  title: ReactNode;
  items: FaqItem[];
  titleId?: string;
};

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${item.id}-panel`}
        id={`${item.id}-trigger`}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#FFF9F5]"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-[0.95rem]">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-[var(--text-secondary)] transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-trigger`}
        className={cn(
          'grid transition-[grid-template-rows] duration-300',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-[var(--border-subtle)] px-5 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Two-column FAQ accordion matching the Contact mockup. */
export function ContactFaqSection({
  eyebrow,
  title,
  items,
  titleId = 'contact-faq-heading',
}: ContactFaqSectionProps) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-3xl space-y-2 text-center">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--brand-primary)] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={titleId}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        <div className="space-y-3">
          {left.map((item) => (
            <FaqRow key={item.id} item={item} />
          ))}
        </div>
        <div className="space-y-3">
          {right.map((item) => (
            <FaqRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
