'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [9840, 10620, 11580, 12460] as const;

/**
 * Compact final CTA Facebook Business Suite dashboard.
 */
export function FacebookFollowersFinalCtaDashboard({ className }: { className?: string }) {
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

  const communityBars = [28, 36, 44, 52, 60, 68, 74, 86];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[17rem] overflow-visible sm:max-w-[18.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white p-3.5 shadow-[0_22px_48px_-24px_rgba(28,25,23,0.55)]">
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-xl text-[11px] font-black text-white"
            style={{ background: fbBlue }}
          >
            f
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">Business Suite</p>
            <p className="text-[10px] text-stone-500">Your Page · Global</p>
          </div>
        </div>

        <div className="mb-2.5 overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div
            className="h-10"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          />
          <div className="px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Followers
            </p>
            <p className="text-xl font-black tabular-nums text-stone-900">
              {(followers / 1000).toFixed(1)}K
            </p>
          </div>
        </div>

        <div className="mb-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">
              Audience Insights
            </p>
            <p className="text-[11px] font-bold text-emerald-600">+11.8%</p>
            <p className="text-[8px] text-stone-500">Active community</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="mb-1 text-[8px] font-semibold text-stone-400 uppercase">
              Community growth
            </p>
            <div className="flex h-4 items-end gap-0.5">
              {communityBars.map((h, i) => (
                <span
                  key={i}
                  className="w-1 flex-1 rounded-sm"
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
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-[10px] font-bold" style={{ color: fbBlue }}>
              71%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{
                width: '71%',
                background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-1 -right-1 z-10 max-w-[9.5rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold uppercase" style={{ color: fbBlue }}>
          New follower
        </p>
        <p className="text-[11px] font-bold text-stone-800">@visitor joined</p>
      </div>

      <div className="pointer-events-none absolute -bottom-2 -left-2 z-10 rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-stone-400 uppercase">Page reach</p>
        <p className="text-[12px] font-black tabular-nums text-stone-900">28.6K</p>
      </div>
    </div>
  );
}
