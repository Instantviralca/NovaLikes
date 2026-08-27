'use client';

import { useEffect, useState } from 'react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

/**
 * Compact requirement visual — Reel thumbnail, rising views, chart, progress.
 * Lazy-safe client illustration for ImageTextSplit.
 */
export function InstagramViewsRequirementVisual({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const accent = '#E1306C';
  const [views, setViews] = useState(1240);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setViews(1680);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const t = (now % 7000) / 7000;
      setViews(1240 + t * 440);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[18.5rem] rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
        <div
          className="relative aspect-[4/5] w-full"
          style={{
            background: 'linear-gradient(165deg,#fff7ed,#ffedd5 45%,#fdba74)',
          }}
        >
          <div className="absolute left-2 top-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            Reel
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-[var(--brand-primary)] shadow">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-current" aria-hidden>
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </div>
          <div className="absolute right-2 bottom-2 left-2 rounded-lg bg-white/90 px-2 py-1.5 backdrop-blur-sm">
            <p className="text-[8px] font-semibold text-stone-500 uppercase">{d('Views')}</p>
            <p className="text-sm font-bold tabular-nums text-stone-900">
              {new Intl.NumberFormat('en-US').format(Math.round(views))}
            </p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(92, 40 + ((views - 1240) / 440) * 52)}%`,
                  background: `linear-gradient(90deg, ${brand}, ${accent})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 rounded-xl border border-stone-100 bg-[var(--surface-muted)] p-2.5">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
            {d('Analytics')}
          </p>
          <span className="text-[9px] font-bold text-emerald-600">+12%</span>
        </div>
        <svg viewBox="0 0 160 42" className="h-auto w-full" role="presentation">
          <path
            d="M4 34 C28 30 40 22 58 20 C78 18 92 12 112 10 C132 8 146 6 156 4"
            fill="none"
            stroke={brand}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
