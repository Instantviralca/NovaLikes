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
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { loadUi } from '@/lib/i18n/content/load';
import { applyFromPrice } from '@/lib/marketing/home-v5/from-price';

const PLATFORM_ORDER: PlatformKey[] = ['instagram', 'tiktok', 'facebook'];

type HeroCard = { slug: string; title: string; line: string; icon: string };

export function HomeV5Hero({
  content = HOME_V5,
  market = null,
  locale = DEFAULT_LOCALE,
}: {
  content?: HomeV5Content;
  market?: Market | null;
  locale?: Locale;
}) {
  const { hero } = content;
  const ui = loadUi(locale);
  const choosePlatform = ui.serviceV2Ui.choosePlatform;
  const heroJoiner = ui.homeV5Ui.heroJoiner;
  const [igName, ttName] = hero.title.highlight.split(' & ');

  const tabMeta = PLATFORM_ORDER.map((key) => {
    const tab = content.hero.tabs[key];
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
          {hero.title.lead ? <>{hero.title.lead}{' '}</> : null}
          <span className="hl">
            <span className="h1-tile t-ig" aria-hidden="true">
              <CameraSquare className="ic" />
            </span>
            {igName} {heroJoiner}{' '}
            <span className="h1-tile t-tt" aria-hidden="true">
              <Music2 className="ic" aria-hidden="true" />
            </span>
            {ttName}
          </span>
          {hero.title.tail ? (
            <>
              <br />
              {hero.title.tail}
            </>
          ) : null}
        </h1>
        <p className="lead">{hero.subtitle}</p>
        <PlatformTabs
          label={choosePlatform}
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
                const price = applyFromPrice(hero.cardPrice, card.slug, locale);
                return (
                  <Link
                    key={card.slug}
                    className="svc-card"
                    href={resolvePublicHref(`/${card.slug}`, { locale, market })}
                  >
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
