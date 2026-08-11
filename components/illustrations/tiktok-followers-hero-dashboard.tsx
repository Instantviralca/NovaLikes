'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [12840, 13120, 13580, 13940, 14480, 15090] as const;
const LOOP_MS = 7600;

const LIVE_TOASTS = [
  { id: 'a', name: '@maya.creates', delta: '+1' },
  { id: 'b', name: '@brand.studio', delta: '+1' },
  { id: 'c', name: '@north.lights', delta: '+1' },
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

type TikTokFollowersHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * TikTok Followers hero — phone profile, live follower growth, floating trust badges.
 */
export function TikTokFollowersHeroDashboard({
  className,
  packagePreview,
}: TikTokFollowersHeroDashboardProps) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
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

  const bars = [36, 48, 42, 58, 70, 64, 88] as const;
  const toast = LIVE_TOASTS[toastIndex];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[21.5rem] overflow-visible sm:max-w-[23rem] lg:max-w-[24.5rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[10%] right-[6%] size-48 rounded-full bg-[var(--brand-primary)]/28 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute bottom-[18%] left-[4%] size-28 rounded-full bg-[#25F4EE]/18 blur-3xl" />
      <div className="pointer-events-none absolute top-[42%] -right-2 size-20 rounded-full bg-[#FE2C55]/12 blur-2xl" />

      {/* Floating UI cards — NovaLikes trust + growth signals */}
      <div className="pointer-events-none absolute top-[4%] -left-1 z-[5] max-w-[9.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.5)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.2s_ease-in-out_infinite] sm:left-0">
        <p className="text-[8px] font-semibold tracking-wide text-emerald-600 uppercase">Growth</p>
        <p className="text-[11px] font-bold text-stone-800">+1K Followers</p>
      </div>
      <div className="pointer-events-none absolute top-[22%] -right-1 z-[5] max-w-[9rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite] sm:right-0">
        <p className="text-[8px] font-semibold text-stone-400 uppercase">Status</p>
        <p className="text-[11px] font-bold text-stone-800">Order Tracking</p>
      </div>
      <div className="pointer-events-none absolute top-[44%] -left-2 z-[5] hidden max-w-[9.25rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.9s_ease-in-out_infinite] sm:block">
        <p className="text-[8px] font-semibold text-[var(--brand-primary)] uppercase">Package</p>
        <p className="text-[11px] font-bold text-stone-800">Package Confirmed</p>
      </div>
      <div className="pointer-events-none absolute bottom-[28%] -right-1 z-[5] max-w-[8.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_7.4s_ease-in-out_infinite] sm:right-0">
        <p className="text-[8px] font-semibold text-sky-600 uppercase">Verified</p>
        <p className="text-[11px] font-bold text-stone-800">Profile Verified</p>
      </div>
      <div className="pointer-events-none absolute bottom-[8%] left-[2%] z-[5] hidden max-w-[8rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:block">
        <p className="text-[8px] font-semibold text-stone-400 uppercase">Analytics</p>
        <p className="text-[11px] font-bold tabular-nums text-stone-800">
          {toast.name.replace('@', '')} {toast.delta}
        </p>
      </div>

      {/* Phone */}
      <div
        className={cn(
          'relative mx-auto w-[72%] max-w-[16.5rem] sm:max-w-[17.5rem]',
          !reduceMotion && 'motion-safe:animate-iv-float-card',
        )}
      >
        <div className="overflow-hidden rounded-[1.85rem] border-[3px] border-stone-900 bg-stone-900 shadow-[0_32px_64px_-24px_rgba(28,25,23,0.55),0_14px_28px_-16px_rgba(249,115,22,0.35)]">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-stone-700" />
          <div className="m-1.5 overflow-hidden rounded-[1.45rem] bg-white">
            <div
              className="relative px-3 pb-3 pt-3.5"
              style={{
                background:
                  'linear-gradient(165deg, #fff7ed 0%, #ffffff 38%, #f0fdfa 72%, #fff1f2 100%)',
              }}
            >
              {/* Top app chrome */}
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
                  }}
                >
                  ♪
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[8px] font-bold text-stone-600">
                    Public
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-bold text-emerald-700">
                    Live
                  </span>
                </div>
              </div>

              {/* Live follower notification chip inside phone */}
              <div className="mb-2.5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/90 px-2 py-1.5 shadow-sm transition-opacity duration-300">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-emerald-600 shadow-sm">
                  +
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold text-stone-800">
                    {toast.name} followed you
                  </p>
                  <p className="text-[8px] font-medium text-emerald-700">Just now</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-2">
                  <span
                    className="flex size-14 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg ring-2 ring-white"
                    style={{
                      background: `linear-gradient(145deg, ${tiktokCyan} 0%, ${brand} 55%, ${tiktokRed} 100%)`,
                    }}
                  >
                    TV
                  </span>
                  <span
                    className="absolute -right-0.5 -bottom-0.5 flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white"
                    style={{ background: '#20D5EC' }}
                    title="Verified"
                  >
                    ✓
                  </span>
                </div>
                <p className="inline-flex items-center gap-1 text-sm font-bold text-stone-900">
                  @creator
                  <span
                    className="inline-flex size-3.5 items-center justify-center rounded-full text-[8px] text-white"
                    style={{ background: '#20D5EC' }}
                  >
                    ✓
                  </span>
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-stone-500">TikTok Creator</p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5 rounded-xl border border-stone-100 bg-white/95 p-2 shadow-sm">
                <div className="text-center">
                  <p className="text-sm font-bold tabular-nums text-stone-900">
                    {formatFollowers(followers)}
                  </p>
                  <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                    Followers
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-stone-900">842</p>
                  <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                    Following
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-stone-900">56.2K</p>
                  <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                    Likes
                  </p>
                </div>
              </div>

              {/* Engagement widgets row */}
              <div className="mt-2 grid grid-cols-3 gap-1">
                {[
                  { label: 'Likes', value: '2.4K', color: tiktokRed },
                  { label: 'Comments', value: '318', color: brand },
                  { label: 'Shares', value: '96', color: tiktokCyan },
                ].map((w) => (
                  <div
                    key={w.label}
                    className="rounded-lg border border-stone-100 bg-white px-1.5 py-1.5 text-center shadow-sm"
                  >
                    <p className="text-[10px] font-bold tabular-nums" style={{ color: w.color }}>
                      {w.value}
                    </p>
                    <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                      {w.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-2 rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                    Growth
                  </p>
                  <span className="text-[9px] font-bold text-[var(--brand-primary)]">+18%</span>
                </div>
                <div className="flex h-11 items-end gap-1">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(180deg, ${tiktokCyan}, ${brand} 55%, ${tiktokRed})`,
                        opacity: 0.5 + i * 0.07,
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                tabIndex={-1}
                className="mt-2.5 w-full rounded-lg py-2 text-[11px] font-bold text-white shadow-md"
                style={{ background: `linear-gradient(145deg, ${brand}, #ea580c)` }}
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {packagePreview ? (
        <div className="absolute -bottom-1 left-1/2 z-[6] hidden w-[min(100%,11.5rem)] -translate-x-1/2 rounded-xl border border-[var(--border-subtle)] bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.4)] motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:block">
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
