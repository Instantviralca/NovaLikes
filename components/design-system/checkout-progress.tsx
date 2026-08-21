'use client';

import { cn } from '@/lib/utils';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';

export type CheckoutStepId = 'package' | 'details' | 'review' | 'payment';

type CheckoutProgressProps = {
  current: CheckoutStepId;
  className?: string;
};

export function CheckoutProgress({ current, className }: CheckoutProgressProps) {
  const { ui } = useI18nChrome();
  const steps = [
    { id: 'package', label: ui.checkout.stepPackage },
    { id: 'details', label: ui.checkout.stepDetails },
    { id: 'review', label: ui.checkout.stepReview },
    { id: 'payment', label: ui.checkout.stepPayment },
  ] as const;
  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <nav aria-label={ui.checkout.progressAria} className={cn('w-full', className)}>
      <ol className="flex items-center gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const active = index === currentIndex;
          const done = index < currentIndex;
          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  'flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl px-1 py-2 sm:px-2',
                  active && 'bg-[var(--brand-accent-soft)]',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 items-center justify-center rounded-full text-xs font-bold sm:size-8 sm:text-sm',
                    active && 'bg-[var(--brand-primary)] text-white shadow-[var(--shadow-glow)]',
                    done && !active && 'bg-[var(--brand-secondary)] text-white',
                    !active && !done && 'bg-[var(--surface-muted)] text-[var(--text-secondary)]',
                  )}
                  aria-current={active ? 'step' : undefined}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'truncate text-center text-[10px] font-medium sm:text-xs',
                    active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <span
                  className={cn(
                    'mb-4 hidden h-0.5 w-2 shrink-0 rounded-full sm:block sm:w-4',
                    done ? 'bg-[var(--brand-primary)]' : 'bg-[var(--border-subtle)]',
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
