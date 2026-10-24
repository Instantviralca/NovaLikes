import { Minus, Plus } from 'lucide-react';

import type { ArticleFaqItem } from '@/types/learn-article-blocks';

type ArticleFAQProps = {
  title?: string;
  items: ArticleFaqItem[];
};

/**
 * Visible article FAQ — Document 15.02, site-v2 `.faq-list` (first item open).
 * FAQPage schema must only be emitted when this renders.
 */
export function ArticleFAQ({ title = 'Frequently asked questions', items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-faq-heading" className="art-faq">
      <h2 id="article-faq-heading">{title}</h2>
      <div className="faq-list">
        {items.map((item, index) => (
          <details key={item.id} open={index === 0}>
            <summary>
              <h3>{item.question}</h3>
              <span className="sq">
                <Plus className="ic pl" strokeWidth={2.5} aria-hidden="true" />
                <Minus className="ic mi" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
