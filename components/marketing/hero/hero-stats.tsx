import { FadeUp } from '@/components/motion/fade-up';
import { cn } from '@/lib/utils';
import type { StatItem } from '@/types/components';

export type HeroStatsProps = {
  items: StatItem[];
  className?: string;
};

/**
 * Compact verified metrics under the homepage hero trust bar.
 */
export function HeroStats({ items, className }: HeroStatsProps) {
  if (!items.length) return null;

  return (
    <FadeUp immediate delay={0.24} className={cn(className)}>
      <dl
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        aria-label="NovaLikes verified metrics"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-white/80 px-3.5 py-3 shadow-[var(--shadow-sm)] backdrop-blur-sm"
          >
            <dt className="text-[0.6875rem] font-semibold tracking-[0.08em] text-[var(--text-secondary)] uppercase">
              {item.label}
            </dt>
            <dd className="mt-1 text-base font-semibold tracking-tight text-[var(--text-primary)] sm:text-lg">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </FadeUp>
  );
}
