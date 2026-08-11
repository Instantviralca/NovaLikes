'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const VIEW_KEYS = [8420, 8680, 8940, 9210] as const;
const LOOP_MS = 9000;

const PARTICLES = [
  { top: '8%', left: '12%', size: 4, delay: '0s', duration: '5.2s' },
  { top: '18%', right: '8%', size: 3, delay: '0.6s', duration: '6.1s' },
  { top: '42%', left: '4%', size: 5, delay: '1.1s', duration: '4.8s' },
  { top: '58%', right: '6%', size: 3, delay: '1.8s', duration: '5.6s' },
  { top: '72%', left: '18%', size: 4, delay: '0.3s', duration: '6.4s' },
  { top: '34%', right: '22%', size: 2, delay: '2.2s', duration: '4.4s' },
  { top: '86%', right: '28%', size: 3, delay: '1.4s', duration: '5.9s' },
] as const;

function formatViews(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type InstagramViewsHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Compact Instagram Views hero — Reel preview, rising views, Watching Now pulse, analytics.
 */
export function InstagramViewsHeroDashboard({
  className,
  packagePreview,
}: InstagramViewsHeroDashboardProps) {
  const accent = '#E1306C';
  const brand = '#F97316';
  const [views, setViews] = useState<number>(VIEW_KEYS[0]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0.45);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setViews(VIEW_KEYS[VIEW_KEYS.length - 1]);
      setProgress(0.78);
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = VIEW_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOutCubic(raw - i);
      const from = VIEW_KEYS[i];
      const to = VIEW_KEYS[i + 1];
      setViews(from + (to - from) * local);
      setProgress(0.4 + easeInOutCubic(raw / segments) * 0.45);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const bars = [
    { x: 18, h: 34, delay: '0s' },
    { x: 44, h: 46, delay: '0.08s' },
    { x: 70, h: 40, delay: '0.16s' },
    { x: 96, h: 58, delay: '0.24s' },
    { x: 122, h: 70, delay: '0.32s' },
    { x: 148, h: 62, delay: '0.4s' },
    { x: 174, h: 84, delay: '0.48s' },
  ] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[23rem] sm:max-w-[25rem] lg:max-w-[26.5rem]',
        className,
      )}
      aria-hidden="true"
    >
      {/* Soft orange glow behind device */}
      <div
        className={cn(
          'pointer-events-none absolute top-[18%] left-1/2 size-48 -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/30 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute top-[48%] left-[8%] size-28 rounded-full bg-[#E1306C]/14 blur-3xl" />

      {/* Floating particles around phone */}
      {!reduceMotion
        ? PARTICLES.map((p, i) => (
            <span
              key={i}
              className="pointer-events-none absolute z-[1] rounded-full bg-[var(--brand-primary)]/55 motion-safe:animate-iv-particle"
              style={{
                top: p.top,
                left: 'left' in p ? p.left : undefined,
                right: 'right' in p ? p.right : undefined,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))
        : null}

      <div className="relative mx-auto w-[74%] max-w-[15.4rem] motion-safe:animate-iv-float-card sm:max-w-[16.5rem]">
        <div className="relative z-[2] rounded-[2rem] border border-stone-800/90 bg-stone-900 p-2 shadow-[0_28px_56px_-28px_rgba(28,25,23,0.7)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-white">
            <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1.5">
              <p className="text-[10px] font-semibold text-stone-800">9:41</p>
              <div className="mx-auto h-1.5 w-14 rounded-full bg-stone-200" />
              <div className="flex gap-0.5">
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
              </div>
            </div>

            <div className="px-3 pb-3.5">
              <div
                className="relative mt-1 aspect-[4/5] overflow-hidden rounded-xl"
                style={{
                  background:
                    'linear-gradient(165deg,#fff7ed 0%,#ffedd5 40%,#fb923c 100%)',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
                <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
                  <span
                    className="flex size-7 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg,#f09433,#dc2743,#bc1888)',
                    }}
                  >
                    IV
                  </span>
                  <p className="text-[10px] font-bold text-white drop-shadow">novalikes</p>
                </div>

                <span
                  className={cn(
                    'absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm',
                    !reduceMotion &&
                      'motion-safe:animate-[order-step-pulse_2.6s_ease-in-out_infinite]',
                  )}
                >
                  <span className="size-1.5 rounded-full bg-red-400" />
                  Watching Now
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white/90 text-[var(--brand-primary)] shadow-md">
                    <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-current" aria-hidden>
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </span>
                </div>

                <div className="absolute right-2.5 bottom-2.5 left-2.5 rounded-lg border border-white/70 bg-white/85 px-2.5 py-2 shadow-sm backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex size-7 items-center justify-center rounded-full text-white"
                      style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}
                    >
                      <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold tracking-wide text-stone-500 uppercase">
                        Views
                      </p>
                      <p className="text-sm font-bold tabular-nums tracking-tight text-stone-900">
                        {formatViews(views)}
                      </p>
                    </div>
                    <div className="ml-auto h-1.5 w-12 overflow-hidden rounded-full bg-stone-200">
                      <div
                        className="h-full rounded-full transition-[width] duration-500 ease-out"
                        style={{
                          width: `${Math.round(progress * 100)}%`,
                          background: `linear-gradient(90deg, ${brand}, ${accent})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-6 -left-[48%] z-[3] hidden w-[9.5rem] overflow-hidden rounded-xl border border-white/85 bg-white/95 p-2.5 shadow-[0_16px_32px_-18px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:block">
          <div className="mb-1.5 flex items-center justify-between gap-1">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Analytics
            </p>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-600">
              +14.8%
            </span>
          </div>
          <svg viewBox="0 0 200 72" className="h-auto w-full" role="presentation">
            <defs>
              <linearGradient id="ig-views-bar-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
                <stop offset="100%" stopColor={brand} stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {bars.map((bar, idx) => (
              <rect
                key={bar.x}
                className={cn(!reduceMotion && 'animate-iv-chart-rise')}
                style={{ animationDelay: bar.delay }}
                x={bar.x}
                y={66 - bar.h * 0.65}
                width="14"
                height={bar.h * 0.65}
                rx="3.5"
                fill="url(#ig-views-bar-fill)"
                opacity={idx === bars.length - 1 ? 1 : 0.72}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute top-[0%] -left-2 z-[4] max-w-[8rem] rounded-lg border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.2s_ease-in-out_infinite] sm:-left-4">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">Views</p>
        <p className="mt-0.5 text-xs font-bold tabular-nums text-stone-800">
          +{formatViews(views - VIEW_KEYS[0])} today
        </p>
      </div>

      <div className="pointer-events-none absolute top-[2%] -right-2 z-[4] max-w-[8rem] rounded-lg border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:-right-4">
        <p className="text-[8px] font-semibold text-emerald-600 uppercase">Order confirmed</p>
        <p className="mt-0.5 text-[11px] font-bold text-stone-800">Views delivering</p>
      </div>

      <div className="pointer-events-none absolute top-[40%] -right-3 z-[4] rounded-full border border-white/90 bg-white/95 px-2 py-1 text-[9px] font-bold text-stone-700 shadow-[0_8px_20px_-10px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_7s_ease-in-out_infinite] sm:-right-5">
        Live tracking
      </div>

      {packagePreview ? (
        <div className="absolute -bottom-8 left-1/2 z-[5] hidden w-[min(100%,11rem)] -translate-x-1/2 rounded-lg border border-[var(--border-subtle)] bg-white px-2.5 py-1.5 shadow-[0_12px_28px_-16px_rgba(28,25,23,0.38)] motion-safe:animate-[iv-float-card_5.5s_ease-in-out_infinite] sm:block">
          <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">Selected</p>
          <p className="truncate text-[11px] font-bold text-[var(--text-primary)]">
            {packagePreview.title}
          </p>
          <p className="text-xs font-bold text-[var(--brand-primary)]">{packagePreview.priceLabel}</p>
        </div>
      ) : null}
    </div>
  );
}
