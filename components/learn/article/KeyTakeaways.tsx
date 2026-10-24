import { Check } from 'lucide-react';

type KeyTakeawaysProps = {
  title?: string;
  items: string[];
};

/**
 * Editorial summary box — Document 15.02, site-v2 `.glance`.
 * Renders only when items exist. Placed after the introduction.
 */
export function KeyTakeaways({
  title = 'At a glance',
  items,
}: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-key-takeaways" className="glance">
      <h2 id="article-key-takeaways">{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check className="ic" strokeWidth={3} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
