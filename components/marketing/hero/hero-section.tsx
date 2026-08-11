import Link from 'next/link';

import { HeroActions } from '@/components/marketing/hero/hero-actions';
import { HeroContent } from '@/components/marketing/hero/hero-content';
import { HeroStats } from '@/components/marketing/hero/hero-stats';
import { HeroTrustBar } from '@/components/marketing/hero/hero-trust-bar';
import { HeroVisual } from '@/components/marketing/hero/hero-visual';
import type { HeroSectionProps, PlatformBadgeProps } from '@/components/marketing/hero/types';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { routes } from '@/config/routes';
import { getHomepageContent } from '@/data/content/homepage';
import { getStatsByIds } from '@/data/content/stats';
import { getSafePublicReviews, summarizePublicReviews } from '@/lib/reviews';
import { cn } from '@/lib/utils';

/**
 * Homepage Hero — Buy Instagram Followers.
 * Every string comes from data/content/homepage.ts.
 */
export function HeroSection({ className, visualSlot }: HeroSectionProps) {
  const content = getHomepageContent();
  const { hero, trustBar, platformGrid, heroStats } = content;
  const aggregate = summarizePublicReviews(getSafePublicReviews());
  const stats = getStatsByIds(heroStats?.statIds ?? []);

  const platforms: PlatformBadgeProps[] = (platformGrid.internalLinks ?? []).map((link, index) => ({
    id: platformGrid.platformIds[index] ?? link.label.toLowerCase(),
    label: link.label,
    href: link.href,
  }));

  if (!hero.visual) {
    throw new Error('homepageContent.hero.visual is required for HeroSection.');
  }

  return (
    <Section
      id="homepage-hero"
      spacing="lg"
      className={cn('relative overflow-hidden bg-hero-wash', className)}
      aria-labelledby="homepage-hero-heading"
    >
      <div
        className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-[var(--brand-primary)]/15 blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
          <Stack gap="lg" className="min-w-0 lg:max-w-none">
            <HeroContent
              eyebrow={hero.eyebrow}
              title={hero.title}
              description={hero.description}
            />
            <HeroActions
              primaryCta={hero.primaryCta}
              secondaryCta={hero.secondaryCta}
              microcopy={hero.microcopy}
              className="mt-2"
            />
            {aggregate ? (
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)]" aria-hidden>
                  ★★★★★
                </span>{' '}
                {aggregate.ratingValue.toFixed(1)} out of {aggregate.bestRating} based on{' '}
                <Link
                  href={routes.reviews}
                  className="font-semibold text-[var(--text-primary)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {aggregate.reviewCount} customer reviews
                </Link>
              </p>
            ) : null}
            <HeroTrustBar items={trustBar.items} className="mt-1" />
            <HeroStats items={stats} className="mt-1" />
          </Stack>

          <div className="min-w-0">
            {visualSlot ?? <HeroVisual visual={hero.visual} platforms={platforms} />}
          </div>
        </div>
      </Container>
    </Section>
  );
}
