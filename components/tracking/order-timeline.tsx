import type { PublicOrderTimelineStep } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderTimelineProps = {
  steps: PublicOrderTimelineStep[];
  className?: string;
};

export function OrderTimeline({ steps, className }: OrderTimelineProps) {
  return (
    <ol className={cn('space-y-4', className)} aria-label="Order timeline">
      {steps.map((step) => {
        const done = step.status === 'complete';
        const current = step.status === 'current';
        const upcoming = step.status === 'upcoming';
        return (
          <li key={step.id} className="flex gap-3">
            <span
              className={cn(
                'mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full',
                done && 'bg-[var(--brand)]',
                current && 'border-2 border-[var(--brand)] bg-transparent',
                upcoming && 'bg-muted-foreground/35',
              )}
              aria-hidden
            />
            <div className="min-w-0">
              <p
                className={cn(
                  'text-sm',
                  done && 'font-bold text-foreground',
                  current && 'font-semibold text-foreground',
                  upcoming && 'font-normal text-muted-foreground',
                )}
              >
                <span className="sr-only">
                  {done ? 'Completed: ' : current ? 'Current: ' : 'Upcoming: '}
                </span>
                {step.label}
              </p>
              {step.message && !upcoming ? (
                <p className="text-sm text-muted-foreground">{step.message}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
