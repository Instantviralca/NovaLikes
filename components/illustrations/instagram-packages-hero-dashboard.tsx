'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [12180, 12430, 12780, 13140, 13620, 14120] as const;
const LOOP_MS = 7200;
const NOTIFS = ['+120 followers', '+250 followers', 'Order confirmed', 'Live tracking'] as const;

function formatFollowers(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type InstagramPackagesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Instagram packages hero — animated phone + overlapping analytics cards.
 * Subtle motion only; respects prefers-reduced-motion.
 */
export function InstagramPackagesHeroDashboard({
  className,
  packagePreview,
}: InstagramPackagesHeroDashboardProps) {
  const accent = '#E1306C';
  const brand = '#F97316';
  const [followers, setFollowers] = useState<number>(FOLLOWER_KEYS[0]);
  const [notifIndex, setNotifIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0.55);

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
      setProgress(0.78);
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = FOLLOWER_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = FOLLOWER_KEYS[i];
      const to = FOLLOWER_KEYS[i + 1];
      setFollowers(from + (to - from) * local);
      setNotifIndex(Math.min(Math.floor(t * NOTIFS.length), NOTIFS.length - 1));
      setProgress(0.35 + local * 0.5);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const bars = [
    { x: 24, h: 38, label: 'M', delay: '0s' },
    { x: 60, h: 52, label: 'T', delay: '0.1s' },
    { x: 96, h: 44, label: 'W', delay: '0.2s' },
    { x: 132, h: 62, label: 'T', delay: '0.3s' },
    { x: 168, h: 76, label: 'F', delay: '0.4s' },
    { x: 204, h: 68, label: 'S', delay: '0.5s' },
    { x: 240, h: 92, label: 'S', delay: '0.6s' },
  ] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:max-w-[28rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[12%] right-[8%] size-44 rounded-full bg-[var(--brand-primary)]/28 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] opacity-95 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 32% 20%, rgba(249,115,22,0.34), transparent 55%), radial-gradient(circle at 78% 70%, rgba(225,48,108,0.22), transparent 48%)',
        }}
      />

      {/* Phone — primary visual */}
      <div className="relative mx-auto w-[72%] max-w-[17.5rem] motion-safe:animate-iv-float-card sm:max-w-[18.5rem]">
        <div className="relative z-[2] rounded-[2.2rem] border border-stone-800/90 bg-stone-900 p-2.5 shadow-[0_34px_68px_-28px_rgba(28,25,23,0.72)]">
          <div className="overflow-hidden rounded-[1.75rem] bg-white">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <p className="text-[10px] font-semibold text-stone-800">9:41</p>
              <div className="mx-auto h-1.5 w-16 rounded-full bg-stone-200" />
              <div className="flex gap-0.5">
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
                  }}
                >
                  IV
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-sm font-bold text-stone-900">novalikes</p>
                    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden>
                      <circle cx="12" cy="12" r="10" fill="#3897f0" />
                      <path
                        d="M10.2 15.4 7.4 12.6l1.2-1.2 1.6 1.6 4.4-4.4 1.2 1.2-5.6 5.6z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] text-stone-500">Creator · Public</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold tabular-nums text-stone-900">
                    {formatFollowers(followers)}
                  </p>
                  <p className="text-[9px] text-stone-500">Followers</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">348</p>
                  <p className="text-[9px] text-stone-500">Posts</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">891</p>
                  <p className="text-[9px] text-stone-500">Following</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2.5">
                <p className="text-[10px] font-semibold text-stone-500">Live update</p>
                <p className="text-xs font-bold text-stone-800">+250 followers delivering</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
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

        {/* Analytics card — clear of phone, bottom-left */}
        <div className="absolute -bottom-8 -left-[52%] z-[3] hidden w-[11.5rem] overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_22px_44px_-22px_rgba(28,25,23,0.5)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:block">
          <div className="mb-2 flex items-center justify-between gap-1">
            <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
              Analytics
            </p>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
              +12.4%
            </span>
          </div>
          <svg viewBox="0 0 180 78" className="h-auto w-full" role="presentation">
            <defs>
              <linearGradient id="ig-bar-fill-overlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
                <stop offset="100%" stopColor={brand} stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {bars.map((bar) => (
              <rect
                key={bar.label + bar.x}
                className={cn(!reduceMotion && 'animate-iv-chart-rise')}
                style={{ animationDelay: bar.delay }}
                x={bar.x * 0.58}
                y={70 - bar.h * 0.68}
                width="14"
                height={bar.h * 0.68}
                rx="4"
                fill="url(#ig-bar-fill-overlap)"
                opacity={bar.h === 92 ? 1 : 0.75}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Floating notifications — spaced away from phone and each other */}
      <div
        key={`notif-${notifIndex}`}
        className={cn(
          'pointer-events-none absolute top-[0%] -left-1 z-[4] max-w-[9.5rem] rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_16px_36px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md sm:-left-3',
          !reduceMotion && 'animate-iv-notif-swap',
        )}
      >
        <p className="text-[9px] font-semibold text-stone-400 uppercase">Notification</p>
        <p className="text-xs font-bold text-stone-800">{NOTIFS[notifIndex]}</p>
      </div>
      <div className="pointer-events-none absolute top-[4%] -right-1 z-[4] max-w-[9.5rem] rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_16px_36px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:-right-3">
        <p className="text-[9px] font-semibold text-emerald-600 uppercase">Order confirmed</p>
        <p className="text-xs font-bold text-stone-800">Package selected</p>
      </div>
      <div className="pointer-events-none absolute bottom-[6%] -right-1 z-[4] hidden max-w-[9.5rem] rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_16px_36px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite] sm:-right-3 sm:block">
        <p className="text-[9px] font-semibold text-stone-400 uppercase">Secure checkout</p>
        <p className="text-xs font-bold text-stone-800">Public username only</p>
      </div>
      <div className="pointer-events-none absolute top-[42%] -right-2 z-[4] rounded-full border border-white/90 bg-white/95 px-3 py-1.5 text-[10px] font-bold text-stone-700 shadow-[0_10px_24px_-12px_rgba(28,25,23,0.45)] backdrop-blur-md sm:-right-4">
        Live tracking
      </div>

      {packagePreview ? (
        <div className="absolute -bottom-10 left-1/2 z-[5] hidden -translate-x-1/2 rounded-xl border border-[var(--border-subtle)] bg-white px-3 py-2 shadow-[0_18px_40px_-20px_rgba(28,25,23,0.42)] sm:block">
          <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">Selected</p>
          <p className="text-xs font-bold text-[var(--text-primary)]">{packagePreview.title}</p>
          <p className="text-sm font-bold text-[var(--brand-primary)]">{packagePreview.priceLabel}</p>
        </div>
      ) : null}
    </div>
  );
}
