'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [8420, 9180, 9960, 10840, 11720] as const;
const LOOP_MS = 7600;

const LIVE_TOASTS = [
  { id: 'a', label: 'New follower', detail: 'Jordan followed your Page' },
  { id: 'b', label: 'New follower', detail: 'Sam joined your community' },
  { id: 'c', label: 'Audience Insights', detail: '+14.2% active this week' },
] as const;

function formatFollowers(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type FacebookFollowersHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Premium Facebook Followers hero — Meta Business Suite dashboard.
 */
export function FacebookFollowersHeroDashboard({
  className,
  packagePreview,
}: FacebookFollowersHeroDashboardProps) {
  const fbBlue = '#1877F2';
  const brand = '#F97316';
  const [followers, setFollowers] = useState<number>(FOLLOWER_KEYS[0]);
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
      setFollowers(FOLLOWER_KEYS[FOLLOWER_KEYS.length - 1]);
      return;
    }
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = (now - start) % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = FOLLOWER_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = FOLLOWER_KEYS[i];
      const to = FOLLOWER_KEYS[i + 1];
      setFollowers(from + (to - from) * local);
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
  const growthBars = [28, 36, 44, 40, 54, 62, 58, 78] as const;
  const weeklyBars = [34, 42, 48, 55, 61, 70, 78] as const;

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
          'pointer-events-none absolute top-[6%] right-[4%] size-48 rounded-full blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
        style={{ background: `${fbBlue}28` }}
      />
      <div className="pointer-events-none absolute bottom-[8%] left-[2%] size-36 rounded-full bg-[var(--brand-primary)]/16 blur-3xl" />

      {/* New follower notification */}
      <div className="pointer-events-none absolute top-0 -right-1 z-[7] max-w-[12rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(24,119,242,0.35)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
            style={{ background: fbBlue }}
          >
            f
          </span>
          <div className="min-w-0">
            <p
              className="text-[8px] font-semibold tracking-wide uppercase"
              style={{ color: fbBlue }}
            >
              {toast.label}
            </p>
            <p className="truncate text-[11px] font-bold text-stone-800">{toast.detail}</p>
          </div>
        </div>
      </div>

      {/* Audience Insights floating */}
      <div className="pointer-events-none absolute top-[22%] -left-3 z-[7] hidden w-[9.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(24,119,242,0.28)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite] sm:block sm:-left-6">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Audience Insights
        </p>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">+14.2%</p>
        <p className="text-[9px] font-semibold text-emerald-600">Active community</p>
        <div className="mt-1.5 flex h-5 items-end gap-0.5">
          {[40, 52, 48, 68, 74].map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm"
              style={{
                height: `${h}%`,
                background: i === 4 ? fbBlue : '#bfdbfe',
              }}
            />
          ))}
        </div>
      </div>

      {/* Weekly growth floating */}
      <div className="pointer-events-none absolute top-[46%] -left-1 z-[6] hidden w-[8.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_7.1s_ease-in-out_infinite] sm:block sm:-left-4">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Weekly growth
        </p>
        <p className="mt-0.5 text-[12px] font-black tabular-nums text-stone-900">+1.8K</p>
        <div className="mt-1.5 flex h-6 items-end gap-0.5">
          {weeklyBars.map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === weeklyBars.length - 1
                    ? `linear-gradient(180deg, ${fbBlue}, ${brand})`
                    : 'linear-gradient(180deg, #dbeafe, #93c5fd)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Page Reach floating */}
      <div className="pointer-events-none absolute right-0 bottom-[6%] z-[7] w-[9.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(24,119,242,0.32)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Page Reach
          </p>
          <span
            className="rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white"
            style={{ background: fbBlue }}
          >
            Live
          </span>
        </div>
        <p className="mt-1 text-[13px] font-black tabular-nums text-stone-900">28.6K</p>
        <div className="mt-1.5 flex h-8 items-end gap-0.5">
          {growthBars.map((h, i) => (
            <span
              key={i}
              className="w-full max-w-[8px] rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === growthBars.length - 1
                    ? `linear-gradient(180deg, ${fbBlue}, ${brand})`
                    : 'linear-gradient(180deg, #bfdbfe, #60a5fa)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Business dashboard */}
      <div className="relative z-[2] overflow-hidden rounded-2xl border border-sky-100/90 bg-white shadow-[0_28px_56px_-28px_rgba(24,119,242,0.35)] motion-safe:animate-iv-float-card">
        <div
          className="absolute inset-x-0 top-0 h-24 opacity-90"
          style={{
            background: `linear-gradient(180deg, ${fbBlue}14 0%, transparent 100%)`,
          }}
        />
        <div className="relative flex items-center justify-between border-b border-stone-100 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg text-[11px] font-black text-white shadow-sm"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <div>
              <p className="text-[10px] font-bold text-stone-900">Meta Business Suite</p>
              <p className="text-[9px] text-stone-400">Page insights · Global</p>
            </div>
          </div>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[9px] font-bold text-sky-700">
            Live
          </span>
        </div>

        <div className="relative space-y-2.5 p-3.5">
          <div className="overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
            <div
              className="h-14"
              style={{
                background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
              }}
            />
            <div className="relative px-3 pb-3">
              <div
                className="absolute -top-6 left-3 flex size-12 items-center justify-center rounded-full border-4 border-white text-sm font-black text-white shadow-sm"
                style={{ background: fbBlue }}
              >
                IV
              </div>
              <div className="pt-8">
                <p className="text-sm font-bold text-stone-900">Your Business Page</p>
                <p className="text-[10px] text-stone-500">Public · Community · Global</p>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                    Followers
                  </p>
                  <p className="text-2xl font-black tabular-nums tracking-tight text-stone-900">
                    {formatFollowers(followers)}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600">+9.4% this week</p>
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
                  <div className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-1.5 text-right">
                    <p className="text-[8px] font-semibold text-sky-700 uppercase">Weekly</p>
                    <p className="text-[12px] font-black text-stone-900">+1.8K</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-sky-50 bg-[var(--surface-muted)]/80 px-3 py-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Community growth
              </p>
              <div className="mt-2 flex h-11 items-end gap-0.5">
                {growthBars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === growthBars.length - 1
                          ? `linear-gradient(180deg, ${fbBlue}, ${brand})`
                          : i > 4
                            ? fbBlue
                            : '#bfdbfe',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-sky-50 bg-white px-3 py-2.5 shadow-sm">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Engagement
              </p>
              <p className="mt-1 text-sm font-black tabular-nums text-stone-900">3.8%</p>
              <p className="text-[9px] font-semibold text-emerald-600">Reactions · Comments</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '38%',
                    background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
