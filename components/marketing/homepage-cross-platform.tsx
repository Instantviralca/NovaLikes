import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { FacebookMark, TikTokMark } from '@/components/marketing/platform-marks';
import type { HomepageHub } from '@/data/content/homepage-hub';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { homepageSectionPadding } from '@/lib/market/homepage-design';
import { cn } from '@/lib/utils';

const MARKS = {
  tiktok: TikTokMark,
  facebook: FacebookMark,
} as const;

export function HomepageCrossPlatform({
  hub,
  enhanced = false,
}: {
  hub: HomepageHub;
  enhanced?: boolean;
}) {
  const section = hub.crossPlatform;
  if (!section) return null;

  return (
    <Section
      id={section.id}
      spacing="none"
      className={cn('bg-transparent', enhanced ? homepageSectionPadding(hub.market) : 'py-8 md:py-11 lg:py-12')}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[12px] font-semibold text-[#E85D04]">
            {section.eyebrow}
          </p>
          <h2
            id={`${section.id}-heading`}
            className={cn(
              'text-balance text-[2rem] font-bold leading-tight tracking-tight text-[#1C1917] sm:text-[2.35rem]',
              enhanced ? 'mt-5' : 'mt-4',
            )}
          >
            {section.title}
          </h2>
          <p
            className={cn(
              'text-pretty text-[15px] leading-relaxed text-[#6B6560]',
              enhanced ? 'mt-5' : 'mt-3',
            )}
          >
            {section.description}
          </p>
        </FadeUp>
        <div className={cn('grid gap-4 md:grid-cols-2', enhanced ? 'mt-6 gap-5' : 'mt-8')}>
          {section.platforms.map((platform, index) => {
            const Mark = MARKS[platform.id];
            return (
              <FadeUp key={platform.id} delay={index * 0.05}>
                <div className="flex h-full flex-col rounded-[1.35rem] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]">
                  <span className="inline-flex size-12 overflow-hidden rounded-xl">
                    <Mark />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#1C1917]">{platform.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B6560]">
                    {platform.description}
                  </p>
                  <Link
                    href={platform.cta.href}
                    prefetch={prefetchForHref(platform.cta.href)}
                    className={cn(
                      'mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#E85D04] hover:underline',
                    )}
                  >
                    {platform.cta.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
