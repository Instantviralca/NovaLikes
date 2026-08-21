import type { ArticleFaqItem } from '@/types/learn-article-blocks';

type ArticleFAQProps = {
  title?: string;
  items: ArticleFaqItem[];
};

/**
 * Visible article FAQ — Document 15.02.
 * FAQPage schema must only be emitted when this renders.
 */
export function ArticleFAQ({ title = 'Frequently asked questions', items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-faq-heading" className="space-y-3">
      <h2
        id="article-faq-heading"
        className="text-xl font-semibold tracking-tight text-[#1C1917]"
      >
        {title}
      </h2>
      <div className="divide-y divide-[#F0E4D8] overflow-hidden rounded-2xl border border-[#F0E4D8] bg-white">
        {items.map((item) => (
          <details key={item.id} className="group px-4 py-3">
            <summary className="cursor-pointer list-none text-[15px] font-medium text-[#1C1917] outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-[#E85D04] [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-[#57534E]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
