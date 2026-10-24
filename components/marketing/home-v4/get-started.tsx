import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { HomeV4SectionHead } from '@/components/marketing/home-v4/section-head';
import { HOME_V4, type PlatformKey } from '@/data/content/home-v4';

const TAB_ORDER: PlatformKey[] = ['instagram', 'tiktok', 'facebook'];

export function HomeV4GetStarted() {
  const { getStarted: copy, hero } = HOME_V4;

  return (
    <section id={copy.id} className="v4-soft py-14 md:py-18 lg:py-20" aria-labelledby="v4-get-started-title">
      <Container size="xl">
        <HomeV4SectionHead title={copy.title} subtitle={copy.subtitle} titleId="v4-get-started-title" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {TAB_ORDER.map((key) => {
            const tab = hero.tabs[key];
            return (
              <div key={key} className="v4-card space-y-4 p-6">
                <h3 className="text-lg font-bold text-[var(--nl-ink)]">{tab.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {tab.cards.map((card) => (
                    <li key={card.slug}>
                      <Link
                        href={`/${card.slug}`}
                        className="inline-flex min-h-10 items-center rounded-full border border-[var(--nl-border)] bg-[var(--nl-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--nl-ink)] transition hover:border-[var(--nl-orange)] hover:text-[var(--nl-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)]"
                      >
                        {`${tab.label} ${card.title}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
