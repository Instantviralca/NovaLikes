import Link from 'next/link';
import { Check, Eye, Heart, Music2, Shield, UserPlus } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { HomeTtSplitTitle } from '@/components/marketing/home-tiktok/split-title';
import { HOME_TT, type TikTokServiceKey } from '@/data/content/home-tiktok-v2';
import { formatFloatingPackageLine } from '@/lib/marketing/home-tiktok/packages';
import { cn } from '@/lib/utils';

const FLOAT_ICONS = {
  followers: UserPlus,
  likes: Heart,
  views: Eye,
} as const;

function FloatCard({
  label,
  value,
  Icon,
  pink,
  className,
}: {
  label: string;
  value: string;
  Icon: typeof UserPlus;
  pink?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('tt-card flex items-center gap-2 px-3 py-2.5', className)}>
      <span className={cn('tt-icon-tile', pink && 'tt-icon-tile-pink')}>
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--nl-muted)]">
          {label}
        </span>
        <span className="block text-sm font-bold text-[var(--nl-ink)]">{value}</span>
      </span>
    </div>
  );
}

export function HomeTikTokHero() {
  const { hero } = HOME_TT;
  const card = (key: TikTokServiceKey) => ({
    label: hero.floating[key].label,
    value: formatFloatingPackageLine(key, hero.floating[key].template),
    Icon: FLOAT_ICONS[key],
  });
  const followers = card('followers');
  const likes = card('likes');
  const views = card('views');

  return (
    <section
      id="homepage-hero"
      className="tt-glow-bg relative overflow-hidden pb-6 pt-12 md:pb-10 md:pt-16 lg:pb-12 lg:pt-20"
    >
      <Container size="xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-6">
            <p className="tt-eyebrow">{hero.eyebrow}</p>
            <HomeTtSplitTitle title={hero.title} as="h1" />
            <p className="tt-body max-w-xl text-base sm:text-lg">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={hero.primaryCta.href} className="tt-btn-primary">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} className="tt-btn-secondary">
                {hero.secondaryCta.label}
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--nl-body)]">
                  <Check className="size-4 shrink-0 text-[var(--nl-orange)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative mx-auto flex w-full max-w-[440px] flex-col items-center lg:min-h-[420px] lg:justify-center"
            aria-hidden="true"
          >
            {/* Desktop composition: tile + absolute floats */}
            <div className="relative hidden w-full items-center justify-center lg:flex lg:h-[380px]">
              <div className="tt-hero-blob" />
              <div className="absolute size-[300px] rounded-full border border-[var(--nl-border)] opacity-50" />
              <div className="absolute size-[240px] rounded-full border border-[var(--nl-border)] opacity-35" />
              <div className="tt-bg-grad relative z-[1] flex size-[260px] items-center justify-center rounded-3xl shadow-[0_24px_48px_-20px_rgba(234,88,12,0.55)]">
                <Music2 className="size-20 text-white" strokeWidth={1.6} />
              </div>

              <FloatCard
                {...followers}
                className="tt-float absolute left-0 top-6 z-[2]"
              />
              <FloatCard
                {...likes}
                pink
                className="tt-float tt-float-delay absolute right-0 top-14 z-[2]"
              />
              <FloatCard
                {...views}
                className="tt-float absolute bottom-10 left-2 z-[2]"
              />
              <FloatCard
                label={hero.floating.safe.label}
                value={hero.floating.safe.value}
                Icon={Shield}
                className="tt-float tt-float-delay absolute bottom-8 right-0 z-[2]"
              />
            </div>

            {/* Mobile composition: tile + 2 cards below, no overlap */}
            <div className="flex w-full flex-col items-center pb-[72px] lg:hidden">
              <div className="relative flex h-[220px] w-full items-center justify-center">
                <div className="tt-hero-blob tt-hero-blob-sm" />
                <div className="absolute size-[200px] rounded-full border border-[var(--nl-border)] opacity-45" />
                <div className="tt-bg-grad relative z-[1] flex size-[180px] items-center justify-center rounded-3xl shadow-[0_20px_40px_-18px_rgba(234,88,12,0.5)]">
                  <Music2 className="size-16 text-white" strokeWidth={1.7} />
                </div>
              </div>
              <div className="mt-4 grid w-full grid-cols-2 gap-3">
                <FloatCard {...followers} />
                <FloatCard {...likes} pink />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
