'use client';

import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

import { homepageAnalyticsEvents, trackHomepageEvent } from '@/lib/analytics';
import type { FaqItem } from '@/types/components';

/** Answers may contain internal markdown links: [label](/path). */
function renderAnswer(answer: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRe.exec(answer)) !== null) {
    if (match.index > lastIndex) parts.push(answer.slice(lastIndex, match.index));
    const href = match[2];
    if (href.startsWith('/') && !href.startsWith('//')) {
      parts.push(
        <Link key={`faq-link-${key++}`} href={href}>
          {match[1]}
        </Link>,
      );
    } else {
      parts.push(match[1]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < answer.length) parts.push(answer.slice(lastIndex));
  return parts.length > 0 ? parts : [answer];
}

/** site-v2 FAQ (`.faq-list` native details); first item open. */
export function ToolFaqV2({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  function onSummaryClick(event: MouseEvent<HTMLElement>, faqId: string) {
    const details = event.currentTarget.parentElement as HTMLDetailsElement | null;
    // Clicking a closed item opens it.
    if (details && !details.open) {
      trackHomepageEvent(homepageAnalyticsEvents.home_faq_open, { faqId });
    }
  }

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.id} open={index === 0}>
          <summary onClick={(event) => onSummaryClick(event, item.id)}>
            <h3>{item.question}</h3>
            <span className="sq" aria-hidden="true">
              <Plus className="ic pl" />
              <Minus className="ic mi" />
            </span>
          </summary>
          <p>{renderAnswer(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}
