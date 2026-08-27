'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ClipboardList,
  PackageCheck,
  Radar,
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
    description: 'Your page URL and selected package are verified before processing.',
    icon: ClipboardList,
  },
  {
    id: 'begins',
    title: 'Delivery Begins',
    description: 'Page likes begin according to the estimated delivery schedule.',
    icon: Truck,
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    description: 'Monitor your order using the tracking page.',
    icon: Radar,
  },
  {
    id: 'complete',
    title: 'Delivery Complete',
    description: 'The selected page likes package has been delivered.',
    icon: PackageCheck,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>;

type FacebookPageLikesDeliveryTimelineProps = {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
};

/**
 * Facebook Page Likes delivery stages as an animated visual timeline.
 */
export function FacebookPageLikesDeliveryTimeline({
  id = 'facebook-page-likes-delivery',
  title = 'Facebook Page Likes Delivery',
  description = 'Delivery begins after your order has been confirmed and reviewed. Processing time depends on the selected package and current demand. You can review available progress updates through the order tracking page until delivery is complete.',
  className,
}: FacebookPageLikesDeliveryTimelineProps) {
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
          <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)] sm:p-10">
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
                    <li
                      key={step.id}
                      className="group flex h-full flex-col items-center rounded-2xl border border-transparent p-4 text-center transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--border-subtle)] hover:bg-sky-50/50 hover:shadow-[var(--shadow-sm)] motion-reduce:hover:translate-y-0 sm:min-h-[13.5rem] sm:pt-0"
                    >
                      <span
                        className={cn(
                          'relative z-[1] flex size-14 items-center justify-center rounded-full border-2 transition-all duration-500 ease-out',
                          isDone &&
                            'border-transparent bg-emerald-500 text-white shadow-[0_12px_28px_-14px_rgba(16,185,129,0.85)]',
                          isActive &&
                            'scale-110 border-transparent text-white ring-4 ring-sky-100 motion-safe:animate-[order-step-pulse_2.4s_ease-in-out_infinite] motion-reduce:scale-100',
                          !isDone &&
                            !isActive &&
                            'border-stone-200 bg-stone-100 text-stone-400',
                        )}
                        style={
                          isActive
                            ? {
                                background: `linear-gradient(145deg, ${fbBlue}, #0c4a8a)`,
                                boxShadow: '0 16px 36px -12px rgba(24,119,242,0.55)',
                              }
                            : undefined
                        }
                      >
                        {isDone ? (
                          <Check className="size-6" strokeWidth={2.5} />
                        ) : (
                          <Icon className="size-6" strokeWidth={2} />
                        )}
                      </span>
                      <p
                        className={cn(
                          'mt-4 text-sm font-semibold transition-colors duration-300',
                          isActive && 'text-[var(--text-primary)]',
                          isDone && 'text-emerald-700',
                          !isDone && !isActive && 'text-stone-400',
                        )}
                      >
                        {d(step.title)}
                      </p>
                      <p
                        className={cn(
                          'mt-2 flex-1 text-xs leading-relaxed transition-colors duration-300 sm:text-[13px]',
                          isActive || isDone
                            ? 'text-[var(--text-secondary)]'
                            : 'text-stone-400',
                        )}
                      >
                        {d(step.description)}
                      </p>
                      {index < STEPS.length - 1 ? (
                        <span className="mt-3 text-[var(--brand-primary)] sm:hidden" aria-hidden>
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
