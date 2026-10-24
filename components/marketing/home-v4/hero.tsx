import { Check } from 'lucide-react';

import { Container } from '@/components/layout/container';
import {
  PlatformTabPanel,
  type PlatformTabData,
} from '@/components/marketing/home-v4/hero-tabs';
import { HomeV4SplitTitle } from '@/components/marketing/home-v4/split-title';
import { HOME_V4, type PlatformKey } from '@/data/content/home-v4';
import { formatCardPrice } from '@/lib/marketing/home-v4/from-price';

const TAB_ORDER: PlatformKey[] = ['instagram', 'tiktok', 'facebook'];

export function HomeV4Hero() {
  const { hero } = HOME_V4;

  // Resolve prices on the server; the client tab component only receives strings.
  const tabs: PlatformTabData[] = TAB_ORDER.map((key) => ({
    key,
    label: hero.tabs[key].label,
    cards: hero.tabs[key].cards.map((card) => ({
      slug: card.slug,
      title: card.title,
      line: card.line,
      priceLabel: formatCardPrice(card.slug),
      href: `/${card.slug}`,
    })),
  }));

  return (
    <section
      id="homepage-hero"
      className="v4-soft v4-glow-bg pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-20 lg:pt-20"
    >
      <Container size="xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-5 text-center">
          <p className="v4-eyebrow">{hero.eyebrow}</p>
          <HomeV4SplitTitle title={hero.title} as="h1" />
          <p className="v4-body max-w-2xl text-sm sm:text-lg">{hero.subtitle}</p>
        </div>

        <div className="mt-8 md:mt-10">
          <PlatformTabPanel tabs={tabs} defaultKey="instagram" />
        </div>

        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2">
          {hero.trust.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-[var(--nl-body)]">
              <Check className="size-4 shrink-0 text-[var(--nl-orange)]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
