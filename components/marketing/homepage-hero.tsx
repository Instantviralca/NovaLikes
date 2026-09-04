import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Tag, Truck, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { accentLastWord, HERO_HEADING_CLASS } from '@/components/typography/accent-title';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Button } from '@/components/ui/button';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';
import { cn } from '@/lib/utils';

const TRUST_FEATURE_ICONS = {
  shield: ShieldCheck,
  tag: Tag,
  truck: Truck,
} as const satisfies Record<string, LucideIcon>;

export function HomepageHero({
  hub = homepageHub,
  enhanced = false,
}: {
  hub?: HomepageHub;
  enhanced?: boolean;
}) {
  const hero = hub.hero;

  return (
    <Section
      id="homepage-hero"
      spacing="none"
      className={cn(
        'relative overflow-hidden bg-transparent',
        /* Tighter than body sections so the hero doesn’t balloon vertically. */
        enhanced ? 'py-10 md:py-12 lg:py-14' : 'py-9 md:py-12 lg:py-14',
      )}
      aria-labelledby="homepage-hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#FFE8D9]/40 blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl" className="relative z-10">
        <div
          className={cn(
            'grid items-center lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.95fr)]',
            enhanced ? 'gap-8 lg:gap-10 xl:gap-12' : 'gap-10 lg:gap-8 xl:gap-12',
          )}
        >
          <div className="min-w-0">
            <FadeUp immediate>
              <Eyebrow className="max-w-full text-pretty">{hero.eyebrow}</Eyebrow>
            </FadeUp>
            <FadeUp immediate delay={0.05}>
              <h1
                id="homepage-hero-heading"
                className={cn(
                  HERO_HEADING_CLASS,
                  'mt-4 max-w-[20ch] text-balance font-bold text-[#1A1A1A] sm:max-w-[24ch] lg:max-w-[26ch]',
                  /* Slightly calmer scale keeps long market H1s to ~2 lines on desktop. */
                  enhanced &&
                    '!text-[clamp(1.75rem,1.15rem+1.35vw,2.35rem)] sm:!text-[clamp(1.9rem,1.2rem+1.2vw,2.35rem)]',
                )}
              >
                {accentLastWord(hero.title)}
              </h1>
            </FadeUp>
            <FadeUp immediate delay={0.1}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#6B6560] sm:text-base">
                {hero.description}
              </p>
            </FadeUp>
            <FadeUp immediate delay={0.15}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full font-semibold">
                  <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
                  <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
                </Button>
              </div>
              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-0 sm:divide-x sm:divide-[#E7E0DA]">
                {hero.trustFeatures.map((item, index) => {
                  const Icon = TRUST_FEATURE_ICONS[item.icon];
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        'flex items-center gap-2.5',
                        index === 0
                          ? 'sm:pr-4'
                          : index === hero.trustFeatures.length - 1
                            ? 'sm:pl-4'
                            : 'sm:px-4',
                      )}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFE8D9]">
                        <Icon className="size-[18px] text-[#FF601C]" aria-hidden="true" />
                      </span>
                      <span className="text-[13px] font-semibold leading-tight text-[#1A1A1A]">
                        {item.line1}
                        <br />
                        {item.line2}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#FFF0E6] p-3 shadow-[0_22px_50px_-28px_rgba(50,30,20,0.35)] ring-1 ring-black/[0.04] sm:p-4">
              <Image
                src={hero.visual.src}
                alt={hero.visual.alt}
                width={hero.visual.width}
                height={hero.visual.height}
                className="h-auto w-full object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
