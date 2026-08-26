import { cn } from '@/lib/utils';

type QuickAnswerProps = {
  heading: string;
  text: string;
  id?: string;
  className?: string;
};

/**
 * Server-rendered concise intent answer for AI/search clarity.
 * Content lives in initial HTML — no client-only rendering.
 */
export function QuickAnswer({ heading, text, id = 'quick-answer', className }: QuickAnswerProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/60 px-5 py-4 sm:px-6 sm:py-5',
        className,
      )}
    >
      <h2
        id={`${id}-heading`}
        className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]"
      >
        {heading}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-primary)] sm:text-base">
        {text}
      </p>
    </section>
  );
}
