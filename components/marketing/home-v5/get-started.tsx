import Link from 'next/link';
import { BookOpen, ChevronRight, Wrench } from 'lucide-react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';
import { type PlatformKey } from '@/components/marketing/home-v5/icons';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import type { Market } from '@/lib/market/config';
import { loadUi } from '@/lib/i18n/content/load';
import { resolvePublicHref } from '@/lib/market/paths';
import {
  calculateAggregateRating,
  getApprovedReviews,
  getReviewsByPlatform,
} from '@/lib/reviews';
import type { PlatformId } from '@/types/platform';

const PLATFORM_ORDER: PlatformKey[] = ['instagram', 'tiktok', 'facebook'];

const PLATFORM_ICON_SRC: Record<PlatformKey, string> = {
  instagram: '/assets/platforms/instagram.svg',
  tiktok: '/assets/platforms/tiktok.svg',
  facebook: '/assets/platforms/facebook.svg',
};

type LinkItem = { label: string; href: string };

/** Approx label width (px) at 16px semi-bold — drives the Buzzoid-style auto-fill grid. */
function labelWordPx(title: string): number {
  return Math.max(48, Math.ceil(title.length * 9.2));
}

function platformAggregate(platform: PlatformKey) {
  const scoped = getReviewsByPlatform(platform as PlatformId);
  const source = scoped.length >= 8 ? scoped : getApprovedReviews();
  const agg = calculateAggregateRating(source);
  return {
    score: agg?.ratingValue?.toFixed(1) ?? '4.8',
    count: String(agg?.reviewCount ?? 0),
  };
}

function LinkList({ links }: { links: readonly LinkItem[] }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>
            {link.label}
            <ChevronRight className="chev" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ArrowDisc() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 13 13" aria-hidden="true" focusable="false">
      <path
        d="M6.5 0.8 8.2 4.3 12 4.8 9.2 7.5 9.9 11.3 6.5 9.5 3.1 11.3 3.8 7.5 1 4.8 4.8 4.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HomeV5GetStarted({
  content = HOME_V5,
  market = null,
  locale = DEFAULT_LOCALE,
}: {
  content?: HomeV5Content;
  market?: Market | null;
  locale?: Locale;
}) {
  const { getStarted, hero } = content;
  const buyServiceAria = loadUi(locale).serviceV2Ui.buyServiceAria;
  const toolLinks = getStarted.tools.links.map((link) => ({
    ...link,
    href: link.href.startsWith('/')
      ? resolvePublicHref(link.href, { locale, market })
      : link.href,
  }));
  const showGuides = getStarted.guides.links.length > 0;

  return (
    <section id={getStarted.id} className="start">
      <div className="wrap">
        <div className="center narrow">
          <SplitTitle title={getStarted.title} pen />
          <p className="body">{getStarted.body}</p>
        </div>

        <nav className="start-grid" aria-label="Choose a service">
          {PLATFORM_ORDER.map((key) => {
            const tab = hero.tabs[key];
            const cards = tab.cards;
            const rating = platformAggregate(key);
            const word = Math.max(...cards.map((c) => labelWordPx(c.title)));
            return (
              <section key={key} className="sg-group" data-platform={key}>
                <h3 className="sg-head">
                  <span className="sg-tile" aria-hidden="true">
                    <img src={PLATFORM_ICON_SRC[key]} alt="" width={20} height={20} decoding="async" />
                  </span>
                  <span className="sg-name">{tab.label}</span>
                  <span className="sg-rating" aria-hidden="true">
                    <span className="sg-score">
                      <StarIcon />
                      {rating.score}
                    </span>
                    <span className="sg-count">
                      <span>{rating.count}</span>
                    </span>
                  </span>
                </h3>
                <div className="sg-keys" style={{ ['--sg-word' as string]: `${word}px` }}>
                  {cards.map((card, index) => (
                    <Link
                      key={card.slug}
                      className={index === 0 ? 'sg-key primary' : 'sg-key'}
                      href={resolvePublicHref(`/${card.slug}`, { locale, market })}
                      data-platform={key}
                      data-service={card.title.toLowerCase().replace(/\s+/g, '-')}
                    >
                      <span className="sr-only">
                        {buyServiceAria
                          .replace('{platform}', tab.label)
                          .replace('{service}', card.title)}
                      </span>
                      <span className="sg-label" aria-hidden="true">
                        {card.title}
                      </span>
                      <span className="sg-disc" aria-hidden="true">
                        <ArrowDisc />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </nav>

        {/* No rv-up: these sit at the page bottom where view() timelines often stall mid-fade. */}
        <div className="start-extras">
          <div className="start-card list">
            <div className="sc-head">
              <span className="sc-ic">
                <Wrench className="ic" aria-hidden="true" />
              </span>
              <h3>{getStarted.tools.title}</h3>
            </div>
            <LinkList links={toolLinks} />
          </div>
          {showGuides ? (
            <div className="start-card list">
              <div className="sc-head">
                <span className="sc-ic">
                  <BookOpen className="ic" aria-hidden="true" />
                </span>
                <h3>{getStarted.guides.title}</h3>
              </div>
              <LinkList links={getStarted.guides.links} />
              <Link className="more" href={getStarted.guides.cta.href}>
                {`${getStarted.guides.cta.label} →`}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
