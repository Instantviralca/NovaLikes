'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const SUB_KEYS = [12480, 12860, 13340, 13920, 14580, 15240] as const;
const LOOP_MS = 7800;

const LIVE_TOASTS = [
  { id: 'a', label: 'New subscriber', detail: '@north.studio joined' },
  { id: 'b', label: 'Channel growth', detail: '+18 this hour' },
  { id: 'c', label: 'Audience update', detail: 'Trending' },
] as const;

function formatSubs(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type YouTubeSubscribersHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * YouTube Subscribers hero — Creator Studio inspired channel dashboard.
 * Distinct from TikTok phone heroes and Instagram package dashboards.
 */
export function YouTubeSubscribersHeroDashboard({
  className,
  packagePreview,
}: YouTubeSubscribersHeroDashboardProps) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const [subs, setSubs] = useState<number>(SUB_KEYS[0]);
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
      setSubs(SUB_KEYS[SUB_KEYS.length - 1]);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = SUB_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = SUB_KEYS[i];
      const to = SUB_KEYS[i + 1];
      setSubs(from + (to - from) * local);
      frame = requestAnimationFrame(tick);
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
  const bars = [28, 36, 44, 52, 48, 66, 78, 88] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[28rem] overflow-visible sm:max-w-[30rem] lg:max-w-[32rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[6%] right-[8%] size-44 rounded-full bg-[#FF0000]/16 blur-3xl sm:size-52',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute bottom-[12%] left-[4%] size-28 rounded-full bg-[var(--brand-primary)]/16 blur-3xl" />

      {/* Live subscriber notification */}
      <div className="pointer-events-none absolute top-0 -right-2 z-[5] max-w-[11rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.5)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 items-center justify-center rounded-full text-[10px] font-black text-white"
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

      {/* Watch time floating card */}
      <div className="pointer-events-none absolute top-[22%] -left-3 z-[5] hidden w-[8.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite] sm:block sm:-left-4">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Watch time
        </p>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">1,284 hrs</p>
        <p className="text-[9px] font-semibold text-emerald-600">+9.4% this week</p>
      </div>

      {/* Growth chart floater */}
      <div className="pointer-events-none absolute right-0 bottom-[10%] z-[5] w-[9rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite] sm:-right-1">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Growth
          </p>
          <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[7px] font-bold text-red-600">
            Live
          </span>
        </div>
        <div className="mt-1.5 flex h-9 items-end gap-0.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-full max-w-[8px] rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === bars.length - 1
                    ? `linear-gradient(180deg, ${ytRed}, ${brand})`
                    : 'linear-gradient(180deg, #fecaca, #fca5a5)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Creator Studio panel */}
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
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Channel overview
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Analytics
          </span>
        </div>

        {/* Channel page header */}
        <div className="relative px-3.5 pt-3">
          <div
            className="h-16 overflow-hidden rounded-xl"
            style={{
              background:
                'linear-gradient(120deg, #7f1d1d 0%, #991b1b 35%, #1c1917 70%, #0c0a09 100%)',
            }}
          />
          <div className="relative z-[1] -mt-6 flex items-end gap-3 px-1">
            <div
              className="flex size-14 items-center justify-center rounded-full border-4 border-white text-sm font-black text-white shadow-md"
              style={{ background: `linear-gradient(145deg, ${ytRed}, #7f1d1d)` }}
            >
              YT
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="truncate text-sm font-bold text-stone-900">Creator Channel</p>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-sky-50 px-1.5 py-0.5 text-[8px] font-bold text-sky-700">
                  <span className="flex size-2.5 items-center justify-center rounded-full bg-sky-500 text-[6px] text-white">
                    ✓
                  </span>
                  Verified
                </span>
              </div>
              <p className="text-[10px] font-semibold text-stone-500">@creator · Public channel</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-3.5 pt-3">
          {/* Subscriber counter */}
          <div className="rounded-xl border border-stone-100 bg-[linear-gradient(145deg,#fffdfb,#fff7ed)] p-3 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                  Subscribers
                </p>
                <p className="mt-0.5 text-2xl font-black tabular-nums tracking-tight text-stone-900">
                  {formatSubs(subs)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
                  style={{ background: brand }}
                >
                  +{Math.max(12, Math.round((subs - SUB_KEYS[0]) / 40))} today
                </span>
                <p className="mt-1 text-[9px] font-semibold text-emerald-600">Increasing</p>
              </div>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(96, 42 + ((subs - SUB_KEYS[0]) / (SUB_KEYS[SUB_KEYS.length - 1] - SUB_KEYS[0])) * 50)}%`,
                  background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
                }}
              />
            </div>
          </div>

          {/* Analytics overview */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-stone-100 bg-white p-2 shadow-sm">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Views
              </p>
              <p className="text-sm font-black tabular-nums text-stone-900">84.2K</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white p-2 shadow-sm">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Watch
              </p>
              <p className="text-sm font-black tabular-nums text-stone-900">62%</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white p-2 shadow-sm">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Reach
              </p>
              <p className="text-sm font-black tabular-nums text-stone-900">+14%</p>
            </div>
          </div>

          {packagePreview ? (
            <div className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/80 px-3 py-2">
              <div>
                <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                  Selected package
                </p>
                <p className="text-[11px] font-bold text-stone-800">{packagePreview.title}</p>
              </div>
              <p className="text-[11px] font-bold text-[var(--brand-primary)]">
                {packagePreview.priceLabel}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/80 px-3 py-2">
              <p className="text-[11px] font-bold text-stone-700">Channel health: Strong</p>
              <span className="text-[9px] font-bold text-emerald-600">Stable growth</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
