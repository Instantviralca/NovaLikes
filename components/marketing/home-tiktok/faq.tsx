import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

export function HomeTikTokFaq() {
  const { faq: copy } = HOME_TT;
  const mid = Math.ceil(copy.items.length / 2);
  const colA = copy.items.slice(0, mid);
  const colB = copy.items.slice(mid);

  const renderCol = (items: ReadonlyArray<{ question: string; answer: string }>) => (
    <div className="divide-y divide-[var(--nl-border)] rounded-2xl border border-[var(--nl-border)] bg-white px-4 shadow-sm sm:px-5">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-start text-sm font-semibold text-[var(--nl-ink)] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)] md:text-base [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="shrink-0 text-lg text-[var(--nl-muted)] transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="pb-4 text-sm leading-relaxed tt-body">{item.answer}</p>
        </details>
      ))}
    </div>
  );

  return (
    <section
      id={copy.id}
      className="tt-soft tt-glow-bg py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-faq-title"
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="tt-faq-title"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {renderCol(colA)}
          {renderCol(colB)}
        </div>
      </Container>
    </section>
  );
}
