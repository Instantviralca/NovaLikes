import Link from 'next/link';
import { Check, ChevronRight, Music2 } from 'lucide-react';

import {
  CameraSquare,
  PLATFORM_ICONS,
  cardIcon,
  type PlatformKey,
} from '@/components/marketing/home-v5/icons';
import { PlatformTabPanel, PlatformTabs } from '@/components/marketing/home-v5/platform-tabs';
import { HOME_V5 } from '@/data/content/home-v5';
import { formatCardPrice } from '@/lib/marketing/home-v5/from-price';

const PLATFORM_ORDER: PlatformKey[] = ['instagram', 'tiktok', 'facebook'];

type HeroCard = { slug: string; title: string; line: string; icon: string };

export function HomeV5Hero() {
  const { hero } = HOME_V5;
  const [igName, ttName] = hero.title.highlight.split(' & ');

  const tabMeta = PLATFORM_ORDER.map((key) => {
    const tab = HOME_V5.hero.tabs[key];
    const Icon = PLATFORM_ICONS[key];
    const cards: readonly HeroCard[] = tab.cards;
    return {
      key,
      label: tab.label,
      icon: <Icon className="ic" />,
      panelClass: cards.length === 4 ? 'cols-4' : 'cols-3',
      cards,
    };
  });

  return (
    <section id="homepage-hero" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap center">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="h1">
          {hero.title.lead}{' '}
          <span className="hl">
            <span className="h1-tile t-ig" aria-hidden="true">
              <CameraSquare className="ic" />
            </span>
            {igName} &{' '}
            <span className="h1-tile t-tt" aria-hidden="true">
              <Music2 className="ic" aria-hidden="true" />
            </span>
            {ttName}
          </span>
          <br />
          {hero.title.tail}
        </h1>
        <p className="lead">{hero.subtitle}</p>
        <PlatformTabs
          label="Choose a platform"
          tabs={tabMeta.map(({ key, label, icon, panelClass }) => ({
            key,
            label,
            icon,
            panelClass,
          }))}
        >
          {tabMeta.map((tab) => (
            <PlatformTabPanel key={tab.key} tabKey={tab.key} panelClass={tab.panelClass}>
              {tab.cards.map((card) => {
                const CardIcon = cardIcon(card.icon);
                const price = formatCardPrice(card.slug);
                return (
                  <Link key={card.slug} className="svc-card" href={`/${card.slug}`}>
                    <span className="svc-ic">
                      <CardIcon className="ic" />
                    </span>
                    <span className="svc-t">{card.title}</span>
                    <span className="svc-l">{card.line}</span>
                    {price ? <span className="svc-p">{price}</span> : null}
                    <ChevronRight className="chev" aria-hidden="true" />
                  </Link>
                );
              })}
            </PlatformTabPanel>
          ))}
        </PlatformTabs>
        <ul className="trust">
          {hero.trust.map((item) => (
            <li key={item}>
              <Check className="ic" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
