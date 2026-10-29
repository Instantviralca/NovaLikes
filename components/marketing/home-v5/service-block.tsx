import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, Heart, MessageCircle, Plus, UserPlus, type LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

import { HOME_V5 } from '@/data/content/home-v5';
import type { HomeV5Content } from '@/data/content/home-v5-types';
import { ServiceStack } from '@/components/marketing/home-v5/service-stack';
import { SplitTitle } from '@/components/marketing/home-v5/split-title';
import { PLATFORM_ICONS, bulletIcon } from '@/components/marketing/home-v5/icons';
import type { Market } from '@/lib/market/config';
import { resolvePublicHref } from '@/lib/market/paths';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { applyFromPrice } from '@/lib/marketing/home-v5/from-price';

type Service = HomeV5Content['services'][number];

type Visual = { src: string; alt: string; width: number; height: number };

/** Hero visuals copied from the service page content (same paths/alts as home-v4 services.tsx). */
const SERVICE_VISUALS: Record<string, Visual> = {
  'buy-instagram-followers': {
    src: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
    alt: 'Instagram profile dashboard showing available follower packages',
    width: 1200,
    height: 900,
  },
  'buy-instagram-likes': {
    src: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
    alt: 'Instagram post engagement dashboard showing likes packages and delivery tracking',
    width: 1200,
    height: 900,
  },
  'buy-instagram-views': {
    src: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
    alt: 'Instagram views growth service dashboard illustration',
    width: 1200,
    height: 900,
  },
  'buy-instagram-comments': {
    src: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
    alt: 'Instagram comments conversation and community engagement dashboard',
    width: 1200,
    height: 900,
  },
  'buy-tiktok-followers': {
    src: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
    alt: 'TikTok followers growth service dashboard illustration',
    width: 1200,
    height: 900,
  },
  'buy-tiktok-likes': {
    src: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
    alt: 'TikTok video likes engagement dashboard illustration',
    width: 1200,
    height: 900,
  },
  'buy-tiktok-views': {
    src: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
    alt: 'TikTok video views and reach analytics illustration',
    width: 1200,
    height: 900,
  },
};

/** Colour chip cycles lilac / pink / mint / sun. */
const CHIP_COLORS = ['lilac', 'pink', 'mint', 'sun'] as const;

/** Floating chip icon on the service image, by metric. */
const METRIC_ICONS: Record<string, LucideIcon> = {
  followers: UserPlus,
  likes: Heart,
  views: Eye,
  comments: MessageCircle,
};

export function ServiceBlock({
  service,
  index,
  platformLabel,
  href,
  priceTemplate,
}: {
  service: Service;
  index: number;
  platformLabel: string;
  href: string;
  priceTemplate: string;
}) {
  const platform = service.platform as 'instagram' | 'tiktok';
  const PlatformIcon = PLATFORM_ICONS[platform];
  const MetricIcon = METRIC_ICONS[service.metric] ?? UserPlus;
  const visual = SERVICE_VISUALS[service.slug];
  const price = applyFromPrice(priceTemplate, service.slug);
  const color = CHIP_COLORS[index % CHIP_COLORS.length];
  const headingId = `${service.slug}-heading`;
  const bullets = (service.bullets as readonly string[])
    .map((bullet) => applyFromPrice(bullet, service.slug))
    .filter(Boolean);
  const questions = [service.why, service.how];

  return (
    <article className="svc-block" id={`${service.slug}-block`} aria-labelledby={headingId}>
      <div className="svc-grid">
        <div className="svc-text">
          <div className="svc-chips">
            <span className="pchip">
              <PlatformIcon className="ic" />
              {platformLabel}
            </span>
            {price ? <span className="pricechip">{price}</span> : null}
          </div>
          <SplitTitle title={service.title} className="h2 left" id={headingId} />
          <p className="body">{service.intro}</p>
          <ul className="bl">
            {bullets.map((bullet) => {
              const Icon = bulletIcon(bullet);
              return (
                <li key={bullet}>
                  <Icon className="ic" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              );
            })}
          </ul>
          <Link className="btn" href={href}>
            <span>{service.cta}</span>
            <span className="btn-tile">
              <ArrowRight className="ic" aria-hidden="true" />
            </span>
          </Link>
        </div>
        <div className={`svc-vis ${color}`}>
          <div className="blob" aria-hidden="true" />
          {visual ? (
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              sizes="(max-width: 1024px) 100vw, 520px"
              // First image loads first without next/image `priority` preload (that delayed H1 LCP).
              {...(index === 0
                ? { loading: 'eager' as const, fetchPriority: 'high' as const }
                : { loading: 'lazy' as const })}
            />
          ) : null}
          <span className="vis-chip" aria-hidden="true">
            <MetricIcon className="ic" aria-hidden="true" />
          </span>
          <svg className="doodle d-lines" viewBox="0 0 60 40" aria-hidden="true">
            <path d="M5 30 L20 8M22 34 L38 6M40 36 L55 14" />
          </svg>
        </div>
      </div>
      <div className="svc-qs">
        {questions.map((item) => (
          <details key={item.q}>
            <summary>
              <h3>{item.q}</h3>
              <Plus className="pl" aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </article>
  );
}

/** The seven stacked service blocks (`section.services > ol.stack`). */
export function HomeV5Services({
  content = HOME_V5,
  market = null,
  locale = DEFAULT_LOCALE,
}: {
  content?: HomeV5Content;
  market?: Market | null;
  locale?: Locale;
}) {
  return (
    <section className="services" aria-label="Services">
      <div className="wrap">
        <ServiceStack>
          {content.services.map((service, index) => {
            const platform = service.platform as 'instagram' | 'tiktok';
            return (
              <li
                key={service.slug}
                className="stack-item"
                style={{ '--i': index } as CSSProperties}
              >
                <ServiceBlock
                  service={service}
                  index={index}
                  platformLabel={content.hero.tabs[platform].label}
                  href={resolvePublicHref(`/${service.slug}`, { locale, market })}
                  priceTemplate={content.hero.cardPrice}
                />
              </li>
            );
          })}
        </ServiceStack>
      </div>
    </section>
  );
}
