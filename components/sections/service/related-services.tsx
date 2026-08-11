'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Eye, Heart, Play, Share2, Users, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { PlatformIcon } from '@/components/marketing/platform-selector/platform-icon';
import { FadeUp } from '@/components/motion/fade-up';
import { HoverLift } from '@/components/motion/hover-lift';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { getServicePageAnalytics } from '@/lib/analytics';
import {
  linkingAnalyticsEvents,
  trackLinkingEvent,
} from '@/lib/analytics/linking-events';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { Service } from '@/types/service';

export type RelatedServicesProps = {
  id?: string;
  title?: string;
  description?: string;
  services: Service[];
  cta?: CtaProps;
  analyticsServiceSlug?: string;
  className?: string;
  footerLinks?: Array<{ label: string; href: string }>;
};

function relatedBlurb(service: Service): string {
  switch (service.slug) {
    case 'buy-instagram-followers':
      return 'Grow a steadier public audience so future comment threads and posts reach more people who already know your brand.';
    case 'buy-instagram-likes':
      return 'Compare like quantities for selected posts when you want to support visible reaction activity alongside your account presentation.';
    case 'buy-instagram-views':
      return 'Review view package sizes for Reels and videos when your content campaign needs additional visibility.';
    case 'buy-instagram-comments':
      return 'Explore comment options for posts where visible discussion is relevant to the campaign.';
    case 'buy-tiktok-followers':
      return "Strengthen your profile's visible audience with TikTok follower packages.";
    case 'buy-tiktok-likes':
      return 'Increase the visible engagement on your public videos with TikTok like packages.';
    case 'buy-tiktok-views':
      return 'Increase the visible watch count on public videos with TikTok view packages.';
    case 'buy-youtube-views':
      return 'Choose a views package for a public YouTube video and review pricing, delivery information and tracking before ordering.';
    case 'buy-youtube-subscribers':
      return 'Build a stronger YouTube audience alongside increased video visibility with subscriber packages designed for creators and businesses.';
    case 'buy-facebook-followers':
      return 'Increase the visible audience connected to your Facebook page and strengthen your overall community presence.';
    case 'buy-facebook-page-likes':
      return "Increase the visible Page Like count to strengthen your brand's overall social proof.";
    case 'buy-facebook-post-likes':
      return 'Support engagement on individual Facebook posts with targeted Post Like packages for campaigns and promotions.';
    default:
      break;
  }
  const base = service.description?.trim();
  if (base && !base.toLowerCase().includes('placeholder')) {
    return base;
  }
  return `Compare packages and place an order for ${service.navigationLabel}.`;
}

function relatedCardTitle(service: Service): string {
  switch (service.slug) {
    case 'buy-instagram-likes':
      return 'Instagram Likes Packages';
    case 'buy-instagram-views':
      return 'Instagram Views Packages';
    case 'buy-instagram-comments':
      return 'Instagram Comments Packages';
    case 'buy-tiktok-followers':
      return 'TikTok Followers';
    case 'buy-tiktok-likes':
      return 'TikTok Likes';
    case 'buy-tiktok-views':
      return 'TikTok Views';
    case 'buy-youtube-views':
      return 'YouTube Views Packages';
    case 'buy-youtube-subscribers':
      return 'Buy YouTube Subscribers';
    case 'buy-facebook-followers':
      return 'Facebook Followers';
    case 'buy-facebook-page-likes':
      return 'Facebook Page Likes';
    case 'buy-facebook-post-likes':
      return 'Facebook Post Likes';
    default:
      return service.navigationLabel;
  }
}

function relatedCtaLabel(service: Service): string {
  switch (service.slug) {
    case 'buy-instagram-followers':
      return 'View Followers Packages';
    case 'buy-instagram-likes':
      return 'View Likes Packages';
    case 'buy-instagram-views':
      return 'View Views Packages';
    case 'buy-instagram-comments':
      return 'View Comments Packages';
    case 'buy-tiktok-followers':
      return 'View TikTok Followers';
    case 'buy-tiktok-likes':
      return 'View TikTok Likes';
    case 'buy-tiktok-views':
      return 'View TikTok Views';
    case 'buy-youtube-views':
      return 'View YouTube Views Packages';
    case 'buy-youtube-subscribers':
      return 'View Subscriber Packages';
    case 'buy-facebook-followers':
      return 'Explore Service';
    case 'buy-facebook-page-likes':
      return 'Explore Service';
    case 'buy-facebook-post-likes':
      return 'Explore Service';
    default:
      return `View ${service.navigationLabel.toLowerCase()} packages`;
  }
}

function RelatedMiniIllustration({ service }: { service: Service }) {
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  let Icon: LucideIcon = Heart;
  let accent = tiktokRed;
  let label = 'Engagement';

  if (service.slug.includes('followers') || service.slug.includes('subscribers')) {
    Icon = Users;
    accent = tiktokCyan;
    label = 'Audience';
  } else if (service.slug.includes('views')) {
    Icon = Eye;
    accent = '#F97316';
    label = 'Views';
  } else if (service.slug.includes('shares')) {
    Icon = Share2;
    accent = tiktokCyan;
    label = 'Shares';
  } else if (service.slug.includes('likes')) {
    Icon = Heart;
    accent = tiktokRed;
    label = 'Likes';
  }

  if (service.slug === 'buy-youtube-views') {
    return (
      <div
        className="relative flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_12px_24px_-16px_rgba(28,25,23,0.35)] transition-transform duration-300 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,0,0.14),transparent_60%)]" />
        <div className="relative flex w-full flex-col items-center gap-1 px-2">
          <Play className="size-5 text-[#FF0000]" fill="#FF0000" strokeWidth={0} />
          <div className="flex h-3.5 w-full items-end justify-center gap-0.5">
            {[40, 62, 48, 78].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === 3
                      ? 'linear-gradient(180deg, #FF0000, #F97316)'
                      : 'linear-gradient(180deg, #fecaca, #f87171)',
                }}
              />
            ))}
          </div>
          <span className="text-[7px] font-bold tracking-wide text-stone-500 uppercase">
            Plays
          </span>
        </div>
      </div>
    );
  }

  if (service.slug === 'buy-youtube-subscribers') {
    return (
      <div
        className="relative flex size-[4.75rem] items-center justify-center overflow-hidden rounded-2xl border border-red-100 shadow-[0_12px_28px_-14px_rgba(185,28,28,0.55)] transition-transform duration-300 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100 sm:size-20"
        aria-hidden
        style={{
          background: 'linear-gradient(145deg, #7f1d1d 0%, #FF0000 48%, #fb923c 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="relative flex w-full flex-col items-center gap-1 px-2 text-white">
          <Users className="size-5 drop-shadow-sm" strokeWidth={2.25} />
          <p className="text-[10px] font-black tabular-nums drop-shadow-sm">12.4K</p>
          <span className="text-[7px] font-bold tracking-wide uppercase opacity-90">
            Subscribers
          </span>
        </div>
      </div>
    );
  }

  if (service.slug === 'buy-facebook-page-likes') {
    const fbBlue = '#1877F2';
    return (
      <div
        className="relative flex size-[4.75rem] items-center justify-center overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_14px_28px_-14px_rgba(24,119,242,0.4)] transition-transform duration-300 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100 sm:size-20"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 28% 18%, ${fbBlue}30, transparent 58%), linear-gradient(165deg, #eff6ff 0%, #ffffff 55%)`,
          }}
        />
        <div className="absolute top-1.5 right-1.5 rounded-full px-1.5 py-0.5 text-[6px] font-bold text-white" style={{ background: fbBlue }}>
          Live
        </div>
        <div className="relative flex w-full flex-col items-center gap-1 px-2 pt-1">
          <div className="flex items-center gap-1">
            <span
              className="flex size-5 items-center justify-center rounded-md text-[9px] font-black text-white"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <Heart className="size-4" style={{ color: fbBlue }} strokeWidth={2.25} />
          </div>
          <p className="text-[10px] font-black tabular-nums text-stone-900">6.2K</p>
          <div className="flex h-3.5 w-full items-end justify-center gap-0.5 px-1">
            {[42, 58, 50, 68, 76].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === 4
                      ? `linear-gradient(180deg, ${fbBlue}, #F97316)`
                      : 'linear-gradient(180deg, #bfdbfe, #60a5fa)',
                }}
              />
            ))}
          </div>
          <span className="text-[7px] font-bold tracking-wide text-stone-500 uppercase">
            Likes
          </span>
        </div>
      </div>
    );
  }

  if (service.platform !== 'tiktok') {
    return (
      <PlatformIcon
        platformId={service.platform}
        iconKey={service.platform}
        className="size-14 rounded-2xl shadow-[0_12px_24px_-16px_rgba(28,25,23,0.35)] transition-transform duration-300 group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
      />
    );
  }

  return (
    <div
      className="relative flex size-[4.75rem] items-center justify-center overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_14px_28px_-14px_rgba(28,25,23,0.4)] transition-transform duration-300 group-hover:scale-[1.08] motion-reduce:group-hover:scale-100 sm:size-20"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 28% 18%, ${tiktokCyan}40, transparent 55%), radial-gradient(circle at 78% 82%, ${tiktokRed}32, transparent 50%), linear-gradient(145deg, ${tiktokCyan}18, ${tiktokRed}14)`,
        }}
      />
      <div className="relative flex w-full flex-col items-center gap-1 px-2">
        <Icon className="size-6 drop-shadow-sm" style={{ color: accent }} strokeWidth={2.25} />
        <div className="flex h-3.5 w-full items-end justify-center gap-0.5">
          {[40, 62, 48, 78].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === 3
                    ? `linear-gradient(180deg, #F97316, ${tiktokRed})`
                    : 'linear-gradient(180deg, #fed7aa, #fdba74)',
              }}
            />
          ))}
        </div>
        <span className="text-[7px] font-bold tracking-wide text-stone-500 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Related services from Internal Linking Engine / Service Registry. */
export function RelatedServices({
  id,
  title,
  description,
  services,
  cta,
  analyticsServiceSlug,
  className,
  footerLinks,
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  const analytics = analyticsServiceSlug
    ? getServicePageAnalytics(analyticsServiceSlug)
    : null;
  const isSingleWide = services.length === 1;
  const isTwoCol = services.length === 2;
  const isYtSubscribersFeature =
    isSingleWide && services[0]?.slug === 'buy-youtube-subscribers';

  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-label="Related services">
      <Container size="xl">
        {(title || description) && (
          <FadeUp className="mb-10 max-w-2xl space-y-3">
            {title ? (
              <Heading as="h2" size="h2" className="tracking-tight">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText className="leading-relaxed">{description}</MutedText> : null}
          </FadeUp>
        )}
        <Grid
          cols={isSingleWide ? 1 : isTwoCol ? 2 : 3}
          className={cn(
            'auto-rows-fr gap-5 sm:gap-6 lg:gap-7',
            isSingleWide && 'max-w-4xl',
            isTwoCol && 'max-w-4xl',
          )}
        >
          {services.map((service, index) => (
            <FadeUp key={service.id} delay={0.04 * index} className="h-full">
              <HoverLift className="h-full">
                <Link
                  href={service.url}
                  className={cn(
                    'group flex h-full cursor-pointer flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-7 shadow-[0_18px_40px_-24px_rgba(28,25,23,0.32)] transition-[border-color,box-shadow,transform,background-color] duration-300 hover:-translate-y-2.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_42%,var(--border-subtle))] hover:bg-[color-mix(in_srgb,var(--brand-accent-soft)_32%,white)] hover:shadow-[0_32px_60px_-24px_rgba(28,25,23,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0',
                    isSingleWide
                      ? 'min-h-[13rem] sm:flex-row sm:items-center sm:gap-6 sm:p-8'
                      : isTwoCol
                        ? 'min-h-[20rem]'
                        : 'min-h-[18.5rem]',
                    isYtSubscribersFeature &&
                      'border-red-100 bg-[linear-gradient(135deg,#fffdfb_0%,#fff5f5_45%,#ffffff_100%)] hover:border-red-200 hover:bg-[linear-gradient(135deg,#fff7f7_0%,#ffecec_50%,#ffffff_100%)] hover:shadow-[0_28px_56px_-24px_rgba(185,28,28,0.35)]',
                  )}
                  onClick={() => {
                    analytics?.relatedServiceClick({
                      href: service.url,
                      serviceSlug: analyticsServiceSlug,
                    });
                    trackLinkingEvent(linkingAnalyticsEvents.related_service_click, {
                      href: service.url,
                      label: relatedCardTitle(service),
                      slug: service.slug,
                      sourceSlug: analyticsServiceSlug,
                      surface: 'related_services',
                    });
                  }}
                >
                  <div
                    className={cn(
                      'flex items-start justify-between gap-3',
                      isSingleWide && 'sm:shrink-0',
                    )}
                  >
                    <span className="[&>div]:!size-[5.25rem] sm:[&>div]:!size-24 [&>div]:rounded-[1.25rem]">
                      <RelatedMiniIllustration service={service} />
                    </span>
                    {!isSingleWide ? (
                      <span
                        className="flex size-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white text-[var(--text-muted)] opacity-85 transition-[background-color,color,border-color,transform,opacity] duration-200 group-hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] group-hover:bg-[var(--brand-accent-soft)] group-hover:text-[var(--brand-primary)] group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                        aria-hidden
                      >
                        <ArrowUpRight className="size-4" strokeWidth={2.25} />
                      </span>
                    ) : null}
                  </div>
                  <div className={cn('flex min-w-0 flex-1 flex-col', isSingleWide && 'sm:mt-0')}>
                    <h3
                      className={cn(
                        'text-lg font-semibold tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-primary)]',
                        isSingleWide ? 'mt-0 sm:mt-0' : 'mt-6',
                      )}
                    >
                      {relatedCardTitle(service)}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {relatedBlurb(service)}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0">
                      {relatedCtaLabel(service)}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                        aria-hidden
                      />
                    </p>
                  </div>
                </Link>
              </HoverLift>
            </FadeUp>
          ))}
        </Grid>
        {footerLinks && footerLinks.length > 0 ? (
          <FadeUp className="mt-8">
            <ul className="flex flex-wrap gap-2.5" role="list">
              {footerLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-white px-4 text-sm font-semibold text-[var(--text-primary)] transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-primary)] motion-reduce:hover:translate-y-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeUp>
        ) : null}
        {cta ? (
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-11 w-full rounded-xl border-[var(--border-strong)] bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] motion-reduce:hover:translate-y-0 sm:w-auto"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
