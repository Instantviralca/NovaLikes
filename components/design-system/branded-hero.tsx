import Link from 'next/link';

import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { TrustStrip } from '@/components/design-system/trust-strip';
import { HeroVisualStack } from '@/components/design-system/hero-visual-stack';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { HeroTrustLabel, HeroVisualContent } from '@/types/content';
import type { BreadcrumbItem } from '@/types/shared';
import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
  YouTubeDashboardVariant,
} from '@/components/illustrations/dashboards';
import type { PlatformId } from '@/types/platform';

export type BrandedHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  trustLabels?: HeroTrustLabel[];
  visual?: HeroVisualContent;
  platform?: PlatformId;
  packagePreview?: { title: string; priceLabel: string } | null;
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  youtubeVariant?: YouTubeDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
  className?: string;
  priorityImage?: boolean;
};

/**
 * Premium branded hero with integrated subtle breadcrumb + layered visual.
 */
export function BrandedHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  trustLabels,
  visual,
  platform,
  packagePreview,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
  className,
  priorityImage = true,
}: BrandedHeroProps) {
  const isPremiumDashboardHero =
    instagramVariant === 'views' ||
    instagramVariant === 'comments' ||
    youtubeVariant === 'subscribers' ||
    youtubeVariant === 'views' ||
    facebookVariant === 'followers' ||
    facebookVariant === 'page-likes' ||
    facebookVariant === 'post-likes' ||
    tiktokVariant === 'followers' ||
    tiktokVariant === 'likes' ||
    tiktokVariant === 'views';
  return (
    <Section
      spacing="lg"
      className={cn('relative overflow-x-clip bg-hero-wash', className)}
      aria-label="Page hero"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 90% 10%, rgb(232 93 4 / 0.06), transparent)',
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div
          className={cn(
            'grid items-center gap-8 lg:gap-10',
            isPremiumDashboardHero
              ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-6'
              : instagramVariant === 'likes'
                ? 'lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]'
                : 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]',
          )}
        >
          <div
            className={cn(
              isPremiumDashboardHero
                ? 'flex flex-col gap-0'
                : 'space-y-4',
            )}
          >
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <Breadcrumb items={breadcrumbs} variant="subtle" />
            ) : null}
            {eyebrow ? (
              <Eyebrow
                className={cn(
                  'text-[var(--brand-primary)]',
                  isPremiumDashboardHero && 'mt-5 sm:mt-6',
                )}
              >
                {eyebrow}
              </Eyebrow>
            ) : null}
            <Heading
              as="h1"
              size="display"
              className={cn(
                'text-balance tracking-tight',
                isPremiumDashboardHero
                  ? 'mt-4 max-w-[22ch] sm:mt-5 lg:text-[clamp(2.85rem,4.4vw,3.65rem)]'
                  : 'max-w-[16ch]',
              )}
            >
              {title}
            </Heading>
            {description ? (
              <Lead
                className={cn(
                  'text-pretty text-[var(--text-secondary)]',
                  isPremiumDashboardHero
                    ? 'mt-5 max-w-[40rem] text-lg leading-relaxed sm:mt-6'
                    : 'max-w-md',
                )}
              >
                {description}
              </Lead>
            ) : null}
            {(primaryCta || secondaryCta) && (
              <div
                className={cn(
                  'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap',
                  isPremiumDashboardHero ? 'mt-6 sm:mt-7' : 'pt-2',
                )}
              >
                {primaryCta ? (
                  <Button
                    asChild
                    size="lg"
                    className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] px-8 text-base font-semibold shadow-[0_14px_32px_-14px_rgba(249,115,22,0.85)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-primary-hover)] hover:shadow-[0_18px_36px_-14px_rgba(249,115,22,0.95)] motion-reduce:hover:translate-y-0 sm:w-auto"
                  >
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="min-h-12 w-full rounded-xl border-[var(--border-strong)] bg-white/70 px-8 text-base font-semibold backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white motion-reduce:hover:translate-y-0 sm:w-auto"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
            {trustLabels && trustLabels.length > 0 ? (
              <TrustStrip
                className={cn(
                  '[&_svg]:size-5',
                  isPremiumDashboardHero
                    ? 'mt-6 gap-x-4 gap-y-2.5 rounded-2xl border border-white/80 bg-white/80 px-4 py-4 shadow-[0_16px_36px_-22px_rgba(28,25,23,0.38)] backdrop-blur-md sm:mt-7 sm:gap-x-5 sm:px-5'
                    : 'pt-2',
                )}
                items={trustLabels.map((t) => ({
                  id: t.id,
                  label: t.label,
                  icon:
                    t.id.includes('password') || t.id.includes('lock')
                      ? 'lock'
                      : t.id.includes('checkout') || t.id.includes('secure')
                        ? 'shield'
                        : t.id.includes('track')
                          ? 'track'
                          : t.id.includes('2018') || t.id.includes('trusted')
                            ? 'star'
                            : 'check',
                }))}
              />
            ) : (
              <TrustStrip className="pt-2 [&_svg]:size-5" variant="compact" />
            )}
          </div>
          {visual ? (
            <div
              className={cn(
                'min-w-0 lg:justify-self-end lg:w-full',
                instagramVariant === 'likes' ||
                  instagramVariant === 'views' ||
                  instagramVariant === 'comments' ||
                  instagramVariant === 'followers' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views'
                  ? 'mx-auto max-w-[24rem] sm:max-w-[25.5rem] lg:mx-0 lg:max-w-[27rem]'
                  : youtubeVariant === 'subscribers' ||
                      youtubeVariant === 'views' ||
                      facebookVariant === 'followers' || facebookVariant === 'page-likes' || facebookVariant === 'post-likes'
                    ? 'mx-auto max-w-[26rem] sm:max-w-[28rem] lg:mx-0 lg:max-w-[32rem]'
                    : 'lg:max-w-none',
                (instagramVariant === 'comments' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views' ||
                  youtubeVariant === 'subscribers' ||
                  youtubeVariant === 'views' ||
                  facebookVariant === 'followers' || facebookVariant === 'page-likes' || facebookVariant === 'post-likes') &&
                  'overflow-visible px-2 sm:px-3',
              )}
            >
              <HeroVisualStack
                src={visual.src}
                alt={visual.alt}
                width={visual.width}
                height={visual.height}
                platform={platform}
                priority={priorityImage}
                packagePreview={packagePreview}
                instagramVariant={instagramVariant}
                tiktokVariant={tiktokVariant}
                youtubeVariant={youtubeVariant}
                facebookVariant={facebookVariant}
                className={
                  instagramVariant === 'likes' ||
                  instagramVariant === 'views' ||
                  instagramVariant === 'comments' ||
                  instagramVariant === 'followers' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views' ||
                  youtubeVariant === 'subscribers' ||
                  youtubeVariant === 'views' ||
                  facebookVariant === 'followers' || facebookVariant === 'page-likes' || facebookVariant === 'post-likes'
                    ? 'w-full max-w-full'
                    : 'max-w-none'
                }
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
