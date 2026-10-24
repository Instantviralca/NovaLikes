import {
  Briefcase,
  Clapperboard,
  Eye,
  Heart,
  Lock,
  Megaphone,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { HoverLift } from '@/components/motion/hover-lift';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

import type { BenefitItem } from '@/types/components';

export type BenefitsProps = {
  id?: string;
  title?: string;
  description?: string;
  items: BenefitItem[];
  /** Optional section visual (e.g. analytics illustration). */
  visual?: ReactNode;
  className?: string;
};

const DEFAULT_ICONS: LucideIcon[] = [Clapperboard, ShoppingBag, Briefcase, Megaphone];

function resolveBenefitIcon(title: string, fallback: LucideIcon): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes('engagement') || t.includes('like')) return Heart;
  if (t.includes('visibility') || t.includes('view')) return Eye;
  if (t.includes('campaign') || t.includes('support campaigns')) return Megaphone;
  if (t.includes('natural') || t.includes('gradual')) return TrendingUp;
  if (t.includes('creator') || t.includes('friendly')) return Sparkles;
  if (t.includes('public') || t.includes('password') || t.includes('login')) return Lock;
  return fallback;
}

export function Benefits({ id, title, description, items, visual, className }: BenefitsProps) {
  if (items.length === 0 && !title && !description) return null;

  const cols = items.length >= 4 ? 4 : 3;

  return (
    <Section id={id} className={cn('bg-white', className)} aria-label="Benefits">
      <Container>
        {(title || description || visual) && (
          <div
            className={cn(
              'mb-10 sm:mb-12 md:mb-14',
              visual
                ? 'grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10'
                : undefined,
            )}
          >
            <div className="max-w-2xl space-y-4 sm:space-y-5">
              {title ? (
                <Heading as="h2" size="h2">
                  {title}
                </Heading>
              ) : null}
              {description ? (
                <MutedText className="max-w-xl whitespace-pre-line text-base leading-relaxed">
                  {description}
                </MutedText>
              ) : null}
            </div>
            {visual ? (
              <FadeUp delay={0.06} className="mx-auto w-full max-w-[22rem] lg:mx-0 lg:justify-self-end">
                {visual}
              </FadeUp>
            ) : null}
          </div>
        )}
        {items.length > 0 ? (
          <Grid cols={cols} className="auto-rows-fr gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {items.map((item, index) => {
              const Fallback = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
              const Icon = resolveBenefitIcon(item.title, Fallback);
              return (
                <FadeUp key={item.id} delay={0.04 * index} className="h-full min-h-0">
                  <HoverLift className="h-full">
                    <FeatureCard
                      className="group flex h-full min-h-[15rem] flex-col border-[var(--nl-border)] shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--nl-border))] hover:shadow-[0_22px_48px_-24px_rgba(28,25,23,0.36)] motion-reduce:hover:translate-y-0 sm:min-h-[15.75rem]"
                      title={item.title}
                      description={item.description}
                      icon={
                        item.icon ?? (
                          <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--nl-bg-soft)] text-[var(--brand-primary)] transition-transform duration-300 group-hover:scale-105 motion-safe:group-hover:animate-iv-icon-bob">
                            <Icon className="size-6" aria-hidden />
                          </span>
                        )
                      }
                    />
                  </HoverLift>
                </FadeUp>
              );
            })}
          </Grid>
        ) : null}
      </Container>
    </Section>
  );
}
