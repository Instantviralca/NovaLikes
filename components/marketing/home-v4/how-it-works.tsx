import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4 } from '@/data/content/home-v4';

export function HomeV4HowItWorks() {
  const { howItWorks: copy } = HOME_V4;

  return (
    <section
      id={copy.id}
      className="v4-soft v4-glow-bg py-14 md:py-18 lg:py-20"
      aria-labelledby="v4-how-title"
    >
      <Container size="xl">
        <HomeV4SectionHead eyebrow={copy.eyebrow} title={copy.title} titleId="v4-how-title" />
        <ol className="relative mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="v4-connector hidden md:block" aria-hidden />
          {copy.steps.map((step, index) => (
            <li key={step.title} className="v4-card relative space-y-3 p-6">
              <span className="v4-bg-grad inline-flex size-12 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold text-[var(--nl-ink)]">{step.title}</h3>
              <p className="v4-body text-sm">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
