'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  FileImage,
  Package,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';

const FLOW: ReadonlyArray<{ label: string; icon: LucideIcon }> = [
  { label: 'Post Selected', icon: FileImage },
  { label: 'Package Confirmed', icon: Package },
  { label: 'Checkout Complete', icon: CreditCard },
  { label: 'Likes Delivering', icon: ThumbsUp },
  { label: 'Order Complete', icon: CheckCircle2 },
];

/**
 * Horizontal How-To-Buy timeline for Facebook Post Likes.
 */
export function FacebookPostLikesProcessTimeline({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
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
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const progress = (active / (FLOW.length - 1)) * 100;

  return (
    <div
      className={cn(
        'mb-8 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white/90 p-4 shadow-[0_14px_32px_-24px_rgba(12,74,138,0.3)] sm:mb-10 sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="relative">
        <div className="absolute top-4 right-[6%] left-[6%] hidden h-1 rounded-full bg-stone-200 sm:block" />
        <div
          className="absolute top-4 left-[6%] hidden h-1 origin-left rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block"
          style={{
            width: `calc(${progress}% * 0.88)`,
            maxWidth: '88%',
            background: `linear-gradient(90deg, ${fbBlue}, #60a5fa)`,
          }}
        />
        <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-2">
          {FLOW.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === active;
            const isDone = index < active;
            return (
              <li key={step.label} className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    'mb-2 flex size-8 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300 sm:size-9',
                    isDone && 'bg-emerald-500 text-white',
                    isActive &&
                      'text-white shadow-[0_10px_20px_-10px_rgba(24,119,242,0.7)]',
                    !isDone && !isActive && 'border border-stone-200 bg-stone-50 text-stone-400',
                  )}
                  style={isActive ? { background: fbBlue } : undefined}
                >
                  {isDone || isActive ? <Icon className="size-3.5" strokeWidth={2.5} /> : index + 1}
                </span>
                <p
                  className={cn(
                    'text-[10px] font-semibold leading-snug sm:text-[11px]',
                    isActive || isDone ? 'text-stone-800' : 'text-stone-400',
                  )}
                >
                  {d(step.label)}
                </p>
                {index < FLOW.length - 1 ? (
                  <span className="mt-1 text-[10px] text-[var(--brand-primary)] sm:hidden" aria-hidden>
                    ↓
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
