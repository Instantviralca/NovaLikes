type KeyTakeawaysProps = {
  title?: string;
  items: string[];
};

/**
 * Editorial summary box — Document 15.02.
 * Renders only when items exist. Placed after the introduction.
 */
export function KeyTakeaways({
  title = 'At a glance',
  items,
}: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="article-key-takeaways"
      className="rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3] px-5 py-5 sm:px-6"
    >
      <h2
        id="article-key-takeaways"
        className="text-[11px] font-semibold tracking-[0.16em] text-[#E85D04] uppercase"
      >
        {title}
      </h2>
      <ul className="mt-3 space-y-2 text-[16px] leading-relaxed text-[#44403C]">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-[#E85D04]"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
