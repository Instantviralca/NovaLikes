import { cn } from '@/lib/utils';

type ReviewsHeroVisualProps = {
  className?: string;
};

/**
 * Decorative review-summary composition for the reviews page hero.
 * Purely visual — no photos, fabricated stats, or fake review quotes.
 */
export function ReviewsHeroVisual({ className }: ReviewsHeroVisualProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] select-none lg:ml-auto lg:mr-0',
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute -top-6 -right-4 size-36 rounded-full bg-[var(--brand-primary)]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-6 size-40 rounded-full bg-[#FFE8D6] blur-2xl" />

      <div className="relative space-y-3">
        <div className="rounded-2xl border border-black/[0.05] bg-white/90 p-4 shadow-[0_10px_28px_-18px_rgba(50,30,20,0.4)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              {['A', 'M', 'J', 'S'].map((initial) => (
                <span
                  key={initial}
                  className="flex size-8 items-center justify-center rounded-full bg-[#FFF1E6] text-[11px] font-semibold text-[var(--text-primary)] ring-2 ring-white"
                >
                  {initial}
                </span>
              ))}
            </div>
            <span className="text-lg tracking-tight text-amber-600">★★★★★</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-[#FFF1E6] px-2.5 py-1 text-[10px] font-medium text-[#B45309] ring-1 ring-[#E1306C]/15">
              Instagram
            </span>
            <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-medium text-neutral-700 ring-1 ring-neutral-800/10">
              TikTok
            </span>
            <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-medium text-[#1D4ED8] ring-1 ring-[#1877F2]/20">
              Facebook
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-black/[0.04] bg-white/85 p-3 shadow-[0_8px_20px_-16px_rgba(50,30,20,0.35)]">
            <div className="h-2 w-3/4 rounded-full bg-[#FFF1E6]" />
            <div className="mt-2 h-2 w-full rounded-full bg-[#FFE8D6]/80" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-[#FFF1E6]" />
            <div className="mt-3 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#FFF1E6] text-[9px] font-semibold">
                ·
              </span>
              <span className="text-[10px] text-amber-600">★★★★★</span>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-black/[0.04] bg-[#FFFBF7] p-3 shadow-[0_8px_20px_-16px_rgba(50,30,20,0.35)]">
            <div className="h-2 w-full rounded-full bg-[#FFE8D6]" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-[#FFF1E6]" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-[#FFE8D6]/70" />
            <div className="mt-3 flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#FFE8D6] text-[9px] font-semibold">
                ·
              </span>
              <span className="text-[10px] text-amber-600">★★★★☆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
