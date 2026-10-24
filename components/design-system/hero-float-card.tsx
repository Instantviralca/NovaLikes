import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type HeroFloatCardProps = {
  label: string;
  value: string;
  Icon: LucideIcon;
  pink?: boolean;
  className?: string;
};

/** White floating chip — same pattern as homepage hero float cards. */
export function HeroFloatCard({
  label,
  value,
  Icon,
  pink,
  className,
}: HeroFloatCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-2xl border border-[var(--nl-border)] bg-white px-3 py-2.5 shadow-sm',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-[var(--nl-orange)]',
          pink ? 'bg-[color:rgb(252_231_243)]' : 'bg-[var(--nl-eyebrow-bg)]',
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[var(--nl-muted)]">
          {label}
        </span>
        <span className="block text-sm font-bold text-[var(--nl-ink)]">{value}</span>
      </span>
    </div>
  );
}
