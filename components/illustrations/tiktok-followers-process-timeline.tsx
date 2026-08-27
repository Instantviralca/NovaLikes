'use client';

import { useEffect, useState } from 'react';
import {
  CreditCard,
  Package,
  Truck,
  UserRound,
  Loader2,
  MapPinned,
  type LucideIcon,
} from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const FLOW: Array<{ label: string; icon: LucideIcon }> = [
  { label: 'Choose Package', icon: Package },
  { label: 'Enter Username', icon: UserRound },
  { label: 'Secure Checkout', icon: CreditCard },
  { label: 'Order Processing', icon: Loader2 },
  { label: 'Delivery Started', icon: Truck },
  { label: 'Order Tracking', icon: MapPinned },
];

/**
 * Horizontal 16:9 process illustration — How to Buy TikTok Followers.
 */
export function TikTokFollowersProcessTimeline({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(FLOW.length - 1);
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % FLOW.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  const progress = (active / (FLOW.length - 1)) * 100;

  return (
    <div
      className={cn(
        'relative mb-6 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] sm:mb-8 sm:p-7 lg:p-8',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(249,115,22,0.12),transparent_50%)]" />
      <div className="relative flex h-full flex-col justify-center">
        <p className="mb-5 text-center text-[11px] font-bold tracking-[0.14em] text-stone-400 uppercase sm:mb-7">
          TikTok ordering workflow
        </p>
        <div className="relative">
          <div className="absolute top-6 right-[3%] left-[3%] hidden h-1.5 rounded-full bg-stone-100 sm:block" />
          <div
            className="absolute top-6 left-[3%] hidden h-1.5 origin-left rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block"
            style={{
              width: `calc(${progress}% * 0.94)`,
              maxWidth: '94%',
              background: `linear-gradient(90deg, #fdba74, ${brand})`,
            }}
          />
          <ol className="relative grid grid-cols-2 gap-4 sm:grid-cols-6 sm:gap-3">
            {FLOW.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === active;
              const isDone = index < active;
              return (
                <li key={step.label} className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      'mb-2.5 flex size-12 items-center justify-center rounded-2xl border transition-all duration-300 sm:size-14',
                      isDone && 'border-emerald-200 bg-emerald-50 text-emerald-600 scale-100',
                      isActive &&
                        'scale-110 border-transparent text-white shadow-[0_16px_32px_-10px_rgba(249,115,22,0.85)]',
                      !isDone &&
                        !isActive &&
                        'border-stone-200 bg-stone-50 text-stone-400',
                    )}
                    style={
                      isActive
                        ? { background: `linear-gradient(145deg, ${brand}, #ea580c)` }
                        : undefined
                    }
                  >
                    <Icon className="size-5 sm:size-6" strokeWidth={2.25} />
                  </span>
                  <p
                    className={cn(
                      'max-w-[7.5rem] text-[11px] font-semibold leading-snug sm:text-xs',
                      isActive || isDone ? 'text-stone-800' : 'text-stone-400',
                    )}
                  >
                    {d(step.label)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
