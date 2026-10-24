import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4 } from '@/data/content/home-v4';

type FaqEntry = { question: string; answer: string };

export function HomeV4Faq() {
  const { faq: copy } = HOME_V4;
  const items: ReadonlyArray<FaqEntry> = copy.items;
  const mid = Math.ceil(items.length / 2);

  const renderCol = (col: ReadonlyArray<FaqEntry>) => (
    <div className="divide-y divide-[var(--nl-border)] self-start rounded-2xl border border-[var(--nl-border)] bg-white px-4 shadow-sm sm:px-5">
      {col.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-start text-sm font-semibold text-[var(--nl-ink)] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)] md:text-base [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="shrink-0 text-lg text-[var(--nl-muted)] transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="v4-body pb-4 text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );

  return (
    <section
      id={copy.id}
      className="v4-soft v4-glow-bg py-14 md:py-18 lg:py-20"
      aria-labelledby="v4-faq-title"
    >
      <Container size="xl">
        <HomeV4SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="v4-faq-title" />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {renderCol(items.slice(0, mid))}
          {renderCol(items.slice(mid))}
        </div>
      </Container>
    </section>
  );
}
