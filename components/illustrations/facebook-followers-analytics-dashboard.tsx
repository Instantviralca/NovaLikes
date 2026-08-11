'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [6420, 7180, 8040, 8960] as const;

/**
 * Premium Facebook analytics illustration for educational discovery section.
 */
export function FacebookFollowersAnalyticsDashboard({
  className,
}: {
  className?: string;
}) {
  const fbBlue = '#1877F2';
  const brand = '#F97316';
  const [followers, setFollowers] = useState<number>(FOLLOWER_KEYS[0]);
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
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % FOLLOWER_KEYS.length;
      setFollowers(FOLLOWER_KEYS[i]);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const communityBars = [30, 38, 46, 42, 55, 64, 70, 82];
  const reachBars = [36, 44, 40, 58, 52, 66, 74];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[25rem] overflow-visible sm:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute -top-2 -right-2 z-[3] max-w-[8.5rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(24,119,242,0.35)] motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite]"
      >
        <p className="text-[8px] font-semibold uppercase" style={{ color: fbBlue }}>
          Followers growth
        </p>
        <p className="text-[12px] font-black tabular-nums text-stone-900">
          {(followers / 1000).toFixed(1)}K
        </p>
      </div>

      <div
        className="pointer-events-none absolute top-16 -left-2 z-[3] max-w-[8.2rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(249,115,22,0.28)] motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite]"
      >
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Audience Insights
        </p>
        <p className="text-[11px] font-bold text-stone-900">Active</p>
      </div>

      <div
        className="pointer-events-none absolute -bottom-1 right-4 z-[3] max-w-[7.8rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(24,119,242,0.3)] motion-safe:animate-[iv-float-card_7s_ease-in-out_infinite]"
      >
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Community Score
        </p>
        <p className="text-[12px] font-black tabular-nums text-stone-900">92</p>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_18px_40px_-28px_rgba(24,119,242,0.28)] motion-safe:animate-iv-float-card',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 10% 0%, ${fbBlue}1a, transparent 55%), radial-gradient(ellipse 50% 40% at 90% 8%, rgba(249,115,22,0.1), transparent 50%)`,
          }}
        />
        <div className="relative flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
                style={{ background: fbBlue }}
              >
                f
              </span>
              <div>
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  Meta Business Suite
                </p>
                <p className="text-sm font-bold text-stone-900">Page analytics</p>
              </div>
            </div>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[9px] font-bold text-sky-700">
              Live
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Followers
              </p>
              <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">
                {(followers / 1000).toFixed(1)}K
              </p>
              <p className="text-[10px] font-semibold text-emerald-600">+12% this week</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Engagement
              </p>
              <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">4.2%</p>
              <p className="text-[10px] font-semibold" style={{ color: brand }}>
                Reactions · Shares
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Community growth
              </p>
              <p className="text-[9px] font-bold text-stone-600">Audience</p>
            </div>
            <div className="mt-2 flex h-12 items-end gap-1">
              {communityBars.map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-sm"
                  style={{
                    height: `${h}%`,
                    background:
                      i === communityBars.length - 1
                        ? `linear-gradient(180deg, ${fbBlue}, ${brand})`
                        : 'linear-gradient(180deg, #bfdbfe, #60a5fa)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-stone-100 bg-white p-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Reach graph
              </p>
              <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">24.1K</p>
              <div className="mt-1.5 flex h-7 items-end gap-0.5">
                {reachBars.map((h, i) => (
                  <span
                    key={i}
                    className="w-full rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === reachBars.length - 1 ? fbBlue : '#bfdbfe',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white p-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Audience Insights
              </p>
              <p className="mt-1 text-sm font-bold text-stone-900">Active</p>
              <p className="text-[10px] font-semibold text-emerald-600">Engagement holding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
