import Link from 'next/link';
import {
  ArrowRight,
  ClipboardList,
  Headphones,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { HomepagePromoVisual } from '@/components/marketing/homepage-promo-visual';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';
import { homepageSectionPadding } from '@/lib/market/homepage-design';
import { cn } from '@/lib/utils';

const TRUST_ICONS = {
  shield: ShieldCheck,
  bolt: Zap,
  headset: Headphones,
} as const;

function AccentTitle({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/);
  const tail = parts.splice(-2);
  return (
    <>
      {parts.length ? `${parts.join(' ')} ` : null}
      <span className="text-[#F97316]">{tail.join(' ')}</span>
    </>
  );
}

export function HomepageFinalCta({
  hub = homepageHub,
  enhanced = false,
}: {
  hub?: HomepageHub;
  enhanced?: boolean;
}) {
  const section = hub.finalCta;

  return (
    <Section
      id={section.id}
      spacing="none"
      className={cn('bg-transparent', enhanced ? homepageSectionPadding(hub.market) : 'py-12 md:py-16')}
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <FadeUp>
          <div className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[0_22px_50px_-28px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04] sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-10">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#E85D04]">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {section.eyebrow}
                </p>
                <h2
                  id={`${section.id}-heading`}
                  className={cn(
                    'text-balance text-[2rem] font-bold leading-[1.12] tracking-tight text-[#1C1917] sm:text-[2.45rem]',
                    enhanced ? 'mt-5' : 'mt-4',
                  )}
                >
                  <AccentTitle title={section.title} />
                </h2>
                <p
                  className={cn(
                    'max-w-xl text-[15px] leading-relaxed text-[#6B6560]',
                    enhanced ? 'mt-5' : 'mt-3',
                  )}
                >
                  {section.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={section.primaryCta.href}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#F97316] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(249,115,22,0.65)] transition hover:bg-[#EA580C]"
                  >
                    <Rocket className="size-4" aria-hidden="true" />
                    {section.primaryCta.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={section.secondaryCta.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1917] underline decoration-[#F97316] decoration-2 underline-offset-[6px] transition hover:text-[#E85D04]"
                  >
                    <ClipboardList className="size-4 text-[#44403C]" aria-hidden="true" />
                    {section.secondaryCta.label}
                  </Link>
                </div>
                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#E7E0DA] pt-5">
                  {section.trustItems.map((item) => {
                    const Icon = TRUST_ICONS[item.icon];
                    return (
                      <li
                        key={item.id}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#44403C]"
                      >
                        <Icon className="size-4 text-[#E85D04]" aria-hidden="true" />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="hidden lg:block">
                <HomepagePromoVisual />
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
