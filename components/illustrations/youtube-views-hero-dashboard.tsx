'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const VIEW_KEYS = [48200, 52840, 59120, 66480, 74220] as const;
const LOOP_MS = 7600;

const LIVE_TOASTS = [
  { id: 'a', label: 'Realtime views', detail: '+312 in the last hour' },
  { id: 'b', label: 'Audience pulse', detail: 'Worldwide + Suggested' },
  { id: 'c', label: 'Watch session', detail: 'Retention holding steady' },
] as const;

function formatViews(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type YouTubeViewsHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Premium YouTube Views hero — Creator Studio video analytics dashboard.
 */
export function YouTubeViewsHeroDashboard({
  className,
  packagePreview,
}: YouTubeViewsHeroDashboardProps) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const [views, setViews] = useState<number>(VIEW_KEYS[0]);
  const [toastIndex, setToastIndex] = useState(0);
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
      setViews(VIEW_KEYS[VIEW_KEYS.length - 1]);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = VIEW_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = VIEW_KEYS[i];
      const to = VIEW_KEYS[i + 1];
      setViews(from + (to - from) * local);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setToastIndex((i) => (i + 1) % LIVE_TOASTS.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const toast = LIVE_TOASTS[toastIndex];
  const reachBars = [22, 34, 48, 42, 58, 70, 64, 86] as const;
  const traffic = [
    { label: 'Browse', pct: 42 },
    { label: 'Suggested', pct: 31 },
    { label: 'Search', pct: 18 },
    { label: 'External', pct: 9 },
  ] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[28rem] overflow-visible sm:max-w-[30rem] lg:max-w-[33rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[6%] right-[4%] size-48 rounded-full bg-[#FF0000]/16 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute bottom-[8%] left-[4%] size-32 rounded-full bg-[var(--brand-primary)]/14 blur-3xl" />

      {/* Floating realtime notification */}
      <div className="pointer-events-none absolute top-0 -right-1 z-[6] max-w-[11.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.5)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
            style={{ background: ytRed }}
          >
            ▶
          </span>
          <div className="min-w-0">
            <p className="text-[8px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              {toast.label}
            </p>
            <p className="truncate text-[11px] font-bold text-stone-800">{toast.detail}</p>
          </div>
        </div>
      </div>

      {/* Watch Time floating */}
      <div className="pointer-events-none absolute top-[22%] -left-3 z-[6] hidden w-[8.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite] sm:block sm:-left-5">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Watch time
        </p>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">842 hrs</p>
        <p className="text-[9px] font-semibold text-emerald-600">+11.2% this week</p>
      </div>

      {/* CTR floating */}
      <div className="pointer-events-none absolute top-[46%] -left-2 z-[6] hidden w-[7.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:block sm:-left-4">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">CTR</p>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">6.4%</p>
        <p className="text-[9px] font-semibold text-emerald-600">Thumbnail clicks</p>
      </div>

      {/* Audience reach floating */}
      <div className="pointer-events-none absolute right-0 bottom-[6%] z-[6] w-[9.25rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite] sm:-right-2">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Audience reach
          </p>
          <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[7px] font-bold text-red-600">
            Live
          </span>
        </div>
        <p className="mt-1 text-[13px] font-black tabular-nums text-stone-900">+18.6%</p>
        <div className="mt-1.5 flex h-8 items-end gap-0.5">
          {reachBars.map((h, i) => (
            <span
              key={i}
              className="w-full max-w-[8px] rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === reachBars.length - 1
                    ? `linear-gradient(180deg, ${ytRed}, ${brand})`
                    : 'linear-gradient(180deg, #fecaca, #fca5a5)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Creator Studio card */}
      <div className="relative z-[2] overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_28px_56px_-28px_rgba(28,25,23,0.45)] motion-safe:animate-iv-float-card">
        <div className="flex items-center justify-between border-b border-stone-100 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg text-[10px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[10px] font-bold text-stone-900">Creator Studio</p>
              <p className="text-[9px] text-stone-400">Video analytics</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Live
          </span>
        </div>

        <div className="space-y-2.5 p-3.5">
          <div className="overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
            <div
              className="relative flex aspect-[16/9] items-center justify-center"
              style={{
                background: `linear-gradient(145deg, #7f1d1d 0%, ${ytRed} 45%, #fb923c 100%)`,
              }}
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white/95 text-lg text-stone-900 shadow-lg">
                ▶
              </span>
              <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-white uppercase">
                Thumbnail
              </span>
              <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white">
                12:48
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div>
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  Live views
                </p>
                <p className="text-xl font-black tabular-nums text-stone-900">
                  {formatViews(views)}
                </p>
              </div>
              {packagePreview ? (
                <div className="rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 text-right">
                  <p className="text-[8px] font-semibold text-orange-600 uppercase">Package</p>
                  <p className="text-[11px] font-bold text-stone-800">{packagePreview.title}</p>
                  <p className="text-[10px] font-semibold text-stone-500">
                    {packagePreview.priceLabel}
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-red-100 bg-red-50/80 px-2.5 py-1.5 text-right">
                  <p className="text-[8px] font-semibold text-red-600 uppercase">Performance</p>
                  <p className="text-[12px] font-black text-stone-900">92 / 100</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Views graph
              </p>
              <div className="mt-1.5 flex h-8 items-end gap-0.5">
                {reachBars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i > 5 ? ytRed : '#fecaca',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Engagement
              </p>
              <p className="mt-1 text-sm font-black tabular-nums text-stone-900">4.8%</p>
              <p className="text-[8px] font-semibold text-emerald-600">Likes · Comments</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Score
              </p>
              <p className="mt-1 text-sm font-black tabular-nums text-stone-900">A+</p>
              <p className="text-[8px] font-semibold" style={{ color: brand }}>
                Video health
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-100 bg-white px-3 py-2.5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Traffic sources
              </p>
              <p className="text-[8px] font-bold text-stone-500">Last 7 days</p>
            </div>
            <div className="space-y-1.5">
              {traffic.map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <span className="w-14 shrink-0 text-[9px] font-semibold text-stone-600">
                    {row.label}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${row.pct}%`,
                        background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
                      }}
                    />
                  </div>
                  <span className="w-7 text-right text-[9px] font-bold tabular-nums text-stone-700">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
