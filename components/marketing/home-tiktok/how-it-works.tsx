import { Container } from '@/components/layout/container';
import { HomeTtSectionHead } from '@/components/marketing/home-tiktok/section-head';
import { HOME_TT } from '@/data/content/home-tiktok-v2';

export function HomeTikTokHowItWorks() {
  const { howItWorks: copy } = HOME_TT;

  return (
    <section
      id={copy.id}
      className="tt-soft tt-glow-bg py-14 md:py-18 lg:py-20"
      aria-labelledby="tt-how-title"
    >
      <Container size="xl">
        <HomeTtSectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="tt-how-title"
        />
        <ol className="relative mt-10 grid gap-4 md:grid-cols-3">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-[var(--nl-border)] md:block"
            aria-hidden
          />
          {copy.steps.map((step, index) => (
            <li key={step.title} className="tt-card relative space-y-3 p-5">
              <span className="tt-bg-grad inline-flex size-10 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-[var(--nl-ink)]">{step.title}</h3>
              <p className="tt-body text-sm">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
