import Link from 'next/link';
import {
  ArrowUpRight,
  Eye,
  Heart,
  Headphones,
  LayoutGrid,
  MessageCircle,
  ShieldCheck,
  ThumbsUp,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { HomepageServicesFilter } from '@/components/marketing/homepage-services-filter';
import { FadeUp } from '@/components/motion/fade-up';
import {
  FacebookMark,
  InstagramMark,
  PLATFORM_MARKS,
  TikTokMark,
} from '@/components/marketing/platform-marks';
import { homepageHub, type HomepageHub, type HubServiceMini } from '@/data/content/homepage-hub';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { formatMoney } from '@/lib/pricing/format';
import { homepageSectionPadding, isCanadaHomepageDesign } from '@/lib/market/homepage-design';
import type { Market } from '@/lib/market/config';
import { cn } from '@/lib/utils';

const PLATFORM_THEME: Record<
  'instagram' | 'tiktok' | 'facebook',
  {
    bar: string;
    iconWrap: string;
    icon: string;
    arrow: string;
    label: string;
  }
> = {
  instagram: {
    bar: 'bg-[#E1306C]',
    iconWrap: 'bg-[#FCE7F3]',
    icon: 'text-[#E1306C]',
    arrow: 'bg-[#E1306C] text-white hover:bg-[#C2255C]',
    label: 'Instagram',
  },
  tiktok: {
    bar: 'bg-[#111111]',
    iconWrap: 'bg-[#F4F4F5]',
    icon: 'text-[#111111]',
    arrow: 'bg-[#111111] text-white hover:bg-black',
    label: 'TikTok',
  },
  facebook: {
    bar: 'bg-[#1877F2]',
    iconWrap: 'bg-[#DBEAFE]',
    icon: 'text-[#1877F2]',
    arrow: 'bg-[#1877F2] text-white hover:bg-[#166FE5]',
    label: 'Facebook',
  },
};

const FEATURE_ICONS = {
  users: Users,
  bolt: Zap,
  headset: Headphones,
  shield: ShieldCheck,
} as const;

function serviceIcon(slug: string): LucideIcon {
  if (slug.includes('comments')) return MessageCircle;
  if (slug.includes('page-likes')) return ThumbsUp;
  if (slug.includes('post-likes') || slug.includes('likes')) return Heart;
  if (slug.includes('views')) return Eye;
  return UserPlus;
}

function startingFromLabel(slug: string): string | null {
  const packages = getActivePackagesByServiceSlug(slug);
  if (!packages.length) return null;
  const min = Math.min(...packages.map((pkg) => pkg.price));
  const currency = packages[0]?.currency ?? 'USD';
  return `From ${formatMoney(min, currency)}`;
}

function AccentTitle({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/);
  const last = parts.pop() ?? title;
  return (
    <>
      {parts.length ? `${parts.join(' ')} ` : null}
      <span className="text-[#F97316]">{last}</span>
    </>
  );
}

function ServiceCard({ service }: { service: HubServiceMini }) {
  const theme = PLATFORM_THEME[service.platform as keyof typeof PLATFORM_THEME];
  const Icon = serviceIcon(service.slug);
  const from = startingFromLabel(service.slug);

  return (
    <Link
      href={service.href}
      prefetch={prefetchForHref(service.href)}
      className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-[#EDE8E3] transition hover:-translate-y-0.5 hover:ring-[#E5DDD5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        className={cn(
          'inline-flex size-11 items-center justify-center rounded-2xl',
          theme.iconWrap,
        )}
      >
        <Icon className={cn('size-5', theme.icon)} aria-hidden="true" />
      </span>
      <h4 className="mt-4 text-[1.05rem] font-bold tracking-tight text-[#1C1917]">{service.name}</h4>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#6B6560]">{service.cardBlurb}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        {from ? (
          <p className="text-sm font-semibold text-[#F97316]">{from}</p>
        ) : (
          <span />
        )}
        <span
          className={cn(
            'inline-flex size-9 shrink-0 items-center justify-center rounded-full transition',
            theme.arrow,
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

function PlatformLogoStack() {
  return (
    <div className="relative mx-auto h-[11.5rem] w-[16.5rem]">
      <span className="absolute left-8 top-2 size-28 rounded-full bg-[#FF7A59]/35 blur-2xl" aria-hidden="true" />
      <span className="absolute right-2 top-10 size-4 font-bold text-[#F97316]" aria-hidden="true">
        +
      </span>
      <span className="absolute right-10 top-2 size-2 rounded-full bg-[#C4B5FD]" aria-hidden="true" />
      <span className="absolute bottom-8 left-4 size-1.5 rounded-full bg-[#F97316]" aria-hidden="true" />
      <div className="absolute left-8 top-0 z-20 size-[4.75rem] -rotate-6 rounded-[1.35rem] bg-white p-2.5 shadow-[0_18px_30px_-14px_rgba(225,29,72,0.45)]">
        <InstagramMark />
      </div>
      <div className="absolute right-3 top-6 z-10 size-[4.75rem] rotate-[8deg] rounded-[1.35rem] bg-white p-2.5 shadow-[0_18px_30px_-14px_rgba(0,0,0,0.28)]">
        <TikTokMark />
      </div>
      <div className="absolute bottom-3 left-[4.75rem] z-30 size-[4.75rem] -rotate-[4deg] rounded-[1.35rem] bg-white p-2.5 shadow-[0_18px_30px_-14px_rgba(24,119,242,0.4)]">
        <FacebookMark />
      </div>
    </div>
  );
}

export function HomepageServicesOverview({
  hub = homepageHub,
  instagramOnly = false,
  market,
}: {
  hub?: HomepageHub;
  instagramOnly?: boolean;
  market?: Market;
}) {
  const section = hub.servicesOverview;
  const enhanced = isCanadaHomepageDesign(market);
  const platforms: Array<'instagram' | 'tiktok' | 'facebook'> = instagramOnly
    ? ['instagram']
    : ['instagram', 'tiktok', 'facebook'];

  return (
    <Section
      id={section.id}
      spacing="none"
      className={cn('relative overflow-hidden bg-transparent', homepageSectionPadding(market))}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <HomepageServicesFilter
          hideFilters={instagramOnly}
          intro={
            <FadeUp className={cn(enhanced && 'w-full text-center')}>
              <p
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[12px] font-semibold text-[#E85D04]',
                  enhanced && 'mx-auto',
                )}
              >
                <LayoutGrid className="size-3.5" aria-hidden="true" />
                {section.eyebrow}
              </p>
              <h2
                id={`${section.id}-heading`}
                className={cn(
                  'text-balance text-[2.05rem] font-bold leading-[1.15] tracking-tight text-[#1C1917] sm:text-[2.45rem]',
                  enhanced ? 'mt-5' : 'mt-4',
                )}
              >
                <AccentTitle title={section.title} />
              </h2>
              <p
                className={cn(
                  'text-pretty text-[15px] leading-relaxed text-[#6B6560]',
                  enhanced ? 'mt-5 w-full' : 'mt-3 max-w-[38rem]',
                )}
              >
                {section.description}
              </p>
            </FadeUp>
          }
          aside={
            instagramOnly ? null : (
            <FadeUp delay={0.06} className="hidden justify-self-end lg:block">
              <PlatformLogoStack />
              <p className="mx-auto mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#F3EDE7] px-3 py-1.5 text-[12px] font-medium text-[#57534E]">
                <ShieldCheck className="size-3.5 text-[#E85D04]" aria-hidden="true" />
                {section.trustNote}
              </p>
            </FadeUp>
            )
          }
        >
          {platforms.map((platform) => {
            const services = hub.services.filter((item) => item.platform === platform);
            const Mark = PLATFORM_MARKS[platform];
            return (
              <div key={platform} data-platform-group={platform}>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className={cn('h-6 w-1 rounded-full', PLATFORM_THEME[platform].bar)} />
                  <span className="size-7 overflow-hidden rounded-lg">
                    <Mark />
                  </span>
                  <h3 className="text-lg font-bold text-[#1C1917]">{PLATFORM_THEME[platform].label}</h3>
                </div>
                <div
                  className={cn(
                    'grid gap-4 sm:grid-cols-2',
                    /* Avoid cramped 4-up cards at 1024 — open full row from xl. */
                    platform === 'instagram' ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3',
                    enhanced && 'gap-5',
                  )}
                >
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </HomepageServicesFilter>

        <FadeUp delay={0.08} className={enhanced ? 'mt-6' : 'mt-10'}>
          <ul
            className={cn(
              'grid gap-3 rounded-2xl bg-[#FAF7F4] px-5 py-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6',
              enhanced && 'gap-2.5',
            )}
          >
            {section.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li
                  key={feature.id}
                  className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#3F3A36]"
                >
                  <Icon className="size-5 shrink-0 text-[#E85D04]" aria-hidden="true" />
                  {feature.label}
                </li>
              );
            })}
          </ul>
        </FadeUp>
      </Container>
    </Section>
  );
}
