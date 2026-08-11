'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const SUB_KEYS = [12480, 13220, 14180, 15240] as const;

/**
 * Compact final CTA YouTube channel dashboard.
 */
export function YouTubeSubscribersFinalCtaDashboard({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const [subs, setSubs] = useState<number>(SUB_KEYS[0]);
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
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % SUB_KEYS.length;
      setSubs(SUB_KEYS[i]);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

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
            className="flex size-9 items-center justify-center rounded-xl text-[10px] font-black text-white"
            style={{ background: ytRed }}
          >
            YT
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">Channel profile</p>
            <p className="text-[10px] text-stone-500">@channel</p>
          </div>
        </div>

        <div className="mb-2.5 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Subscribers
          </p>
          <p className="text-xl font-black tabular-nums text-stone-900">
            {(subs / 1000).toFixed(1)}K
          </p>
        </div>

        <div className="mb-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Package</p>
            <p className="text-[11px] font-bold text-stone-800">500 Subs</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Audience</p>
            <p className="text-[11px] font-bold text-emerald-600">+9.4%</p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Delivery progress</p>
            <p className="text-[10px] font-bold" style={{ color: ytRed }}>
              62%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{
                width: '62%',
                background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-1 -right-1 z-10 max-w-[9.5rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-red-600 uppercase">New subscriber</p>
        <p className="text-[11px] font-bold text-stone-800">@viewer joined</p>
      </div>
    </div>
  );
}
