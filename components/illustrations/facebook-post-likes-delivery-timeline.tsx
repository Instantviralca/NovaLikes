'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ClipboardList,
  PackageCheck,
  ThumbsUp,
  Truck,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 'review',
    title: 'Order Review',
    description: 'Your post URL and selected package are verified.',
    icon: ClipboardList,
  },
  {
    id: 'begins',
    title: 'Delivery Begins',
    description: 'Post likes begin according to the delivery estimate.',
    icon: Truck,
  },
  {
    id: 'progress',
    title: 'Likes Increasing',
    description: 'Review your order status through the tracking page.',
    icon: ThumbsUp,
  },
  {
    id: 'complete',
    title: 'Order Complete',
    description: 'The selected post likes package has been delivered.',
    icon: PackageCheck,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

type FacebookPostLikesDeliveryTimelineProps = {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
};

/**
 * Facebook Post Likes delivery stages — Business Suite style timeline.
 */
export function FacebookPostLikesDeliveryTimeline({
  id = 'facebook-post-likes-delivery',
  title = 'Facebook Post Likes Delivery',
  description = 'Delivery begins after your order has been reviewed and confirmed. Processing time depends on the selected package and current demand. Progress updates remain available through order tracking until delivery is complete.',
  className,
}: FacebookPostLikesDeliveryTimelineProps) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(STEPS.length - 1);
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const progress = (active / (STEPS.length - 1)) * 100;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('surface-muted', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-10 max-w-2xl space-y-3">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {d(title)}
          </Heading>
          <MutedText>{description}</MutedText>
        </FadeUp>

        <FadeUp>
          <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(12,74,138,0.32)] sm:p-10">
            <div className="relative mx-auto max-w-5xl pt-2">
              <div className="absolute top-8 right-10 left-10 hidden h-1.5 rounded-full bg-stone-200/90 sm:block" />
              <div
                className="absolute top-8 left-10 hidden h-1.5 origin-left rounded-full shadow-[0_0_16px_-2px_rgba(24,119,242,0.45)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block"
                style={{
                  width: `calc(${progress}%)`,
                  maxWidth: 'calc(100% - 5rem)',
                  background: `linear-gradient(90deg, ${fbBlue} 0%, #60a5fa 55%, #F97316 100%)`,
                }}
              />

              <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-5">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === active;
                  const isDone = index < active;
                  return (
                    <li key={step.id} className="flex flex-col items-center text-center sm:px-1">
                      <span
                        className={cn(
                          'relative z-[1] mb-4 flex size-14 items-center justify-center rounded-2xl border text-sm font-bold transition-all duration-300',
                          isDone && 'border-emerald-200 bg-emerald-500 text-white',
                          isActive &&
                            'border-transparent text-white shadow-[0_14px_28px_-14px_rgba(24,119,242,0.75)]',
                          !isDone &&
                            !isActive &&
                            'border-stone-200 bg-stone-50 text-stone-400',
                        )}
                        style={isActive ? { background: fbBlue } : undefined}
                      >
                        {isDone ? <Check className="size-5" strokeWidth={2.5} /> : <Icon className="size-5" />}
                      </span>
                      <p
                        className={cn(
                          'text-sm font-bold',
                          isActive || isDone ? 'text-stone-900' : 'text-stone-500',
                        )}
                      >
                        {d(step.title)}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-500">{d(step.description)}</p>
                      {index < STEPS.length - 1 ? (
                        <span className="mt-3 text-sm text-[var(--brand-primary)] sm:hidden" aria-hidden>
                          ↓
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
