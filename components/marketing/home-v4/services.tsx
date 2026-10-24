import Image from 'next/image';
import Link from 'next/link';
import { Camera, Check, Clock, Music2, RefreshCw, Shield, Tag, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeV4SplitTitle } from '@/components/marketing/home-v4/split-title';
import { HOME_V4 } from '@/data/content/home-v4';
import { applyFromPrice } from '@/lib/marketing/home-v4/from-price';
import { cn } from '@/lib/utils';

type Visual = { src: string; alt: string; width: number; height: number };

/** Hero visuals copied from the service page content (data/content/instagram.ts, tiktok.ts). */
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

const PLATFORM_ICONS = { instagram: Camera, tiktok: Music2 } as const;

/** Pick a bullet icon from the bullet's meaning (price, timing, refill, privacy), else a check. */
function bulletIcon(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (t.includes('packages from')) return Tag;
  if (t.includes('refill')) return RefreshCw;
  if (t.includes('starts') || t.includes('gradual')) return Clock;
  if (t.includes('password') || t.includes('login') || t.includes('username')) return Shield;
  return Check;
}

export function HomeV4Services() {
  const { services, hero } = HOME_V4;

  return (
    <section className="bg-white py-10 md:py-14 lg:py-16" aria-label={HOME_V4.intro.eyebrow}>
      <Container size="xl">
        <div className="space-y-6">
          {services.map((service, index) => {
            const visual = SERVICE_VISUALS[service.slug];
            const platformLabel = hero.tabs[service.platform].label;
            const PlatformIcon = PLATFORM_ICONS[service.platform];
            const firstOfPlatform = services.findIndex((s) => s.platform === service.platform) === index;
            const bullets = service.bullets
              .map((bullet) => applyFromPrice(bullet, service.slug))
              .filter(Boolean);
            const headingId = `v4-service-${service.slug}`;
            const imageRight = index % 2 === 0;

            return (
              <div key={service.slug} className="space-y-4">
                {firstOfPlatform ? (
                  <p className="v4-eyebrow">{`${platformLabel} services`}</p>
                ) : null}
                <article
                  className="v4-service-card p-6 md:p-8 lg:p-12"
                  aria-labelledby={headingId}
                >
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className={cn('space-y-5', imageRight ? 'lg:order-1' : 'lg:order-2')}>
                      <span className="v4-chip">
                        <PlatformIcon className="size-3.5 text-[var(--nl-orange)]" aria-hidden />
                        {platformLabel}
                      </span>
                      <HomeV4SplitTitle title={service.title} id={headingId} />
                      <p className="v4-body text-base sm:text-lg">{service.intro}</p>
                      <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                        {bullets.map((bullet) => {
                          const Icon = bulletIcon(bullet);
                          return (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-[var(--nl-ink)]">
                              <Icon className="mt-0.5 size-4 shrink-0 text-[var(--nl-orange)]" aria-hidden />
                              <span>{bullet}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="pt-1">
                        <Link href={`/${service.slug}`} className="v4-btn-primary">
                          {service.cta}
                        </Link>
                      </div>
                    </div>

                    {visual ? (
                      <div className={cn(imageRight ? 'lg:order-2' : 'lg:order-1')}>
                        <div className="v4-media">
                          <Image
                            src={visual.src}
                            alt={visual.alt}
                            width={visual.width}
                            height={visual.height}
                            loading={index === 0 ? undefined : 'lazy'}
                            className="h-auto w-full object-contain"
                            sizes="(max-width: 1024px) 90vw, 560px"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 grid gap-3 md:grid-cols-2">
                    {service.questions.map((item) => (
                      <details
                        key={item.q}
                        className="group rounded-2xl border border-[var(--nl-border)] bg-white px-4 shadow-sm sm:px-5"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-start text-sm font-semibold text-[var(--nl-ink)] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nl-orange)] md:text-base [&::-webkit-details-marker]:hidden">
                          <span>{item.q}</span>
                          <span
                            className="shrink-0 text-lg text-[var(--nl-muted)] transition group-open:rotate-45"
                            aria-hidden
                          >
                            +
                          </span>
                        </summary>
                        <p className="v4-body pb-4 text-sm">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
