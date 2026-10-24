'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const NOTIFS = ['+420 views', 'Order tracked', 'Growth +12%'] as const;

/**
 * Compact About final CTA illustration — analytics, tracking, notifications.
 */
export function AboutCtaIllustration({ className }: { className?: string }) {
  const brand = '#F97316';
  const [notifIndex, setNotifIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setNotifIndex((i) => (i + 1) % NOTIFS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const bars = [36, 48, 42, 58, 52, 68, 64, 76] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[15rem] overflow-visible sm:max-w-[16.5rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[10%] right-[8%] size-28 rounded-full blur-2xl',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
        style={{ background: `${brand}28` }}
      />

      <div className="-sm relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_20px_44px_-24px_rgba(28,25,23,0.5)]">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="flex size-7 items-center justify-center rounded-lg text-[8px] font-black text-white"
            style={{ background: brand }}
          >
            IV
          </span>
          <div>
            <p className="text-xs font-bold text-stone-900">Analytics</p>
            <p className="text-[9px] text-stone-500">Growth overview</p>
          </div>
        </div>

        <div className="mb-2 rounded-xl border border-stone-100 bg-stone-50 px-2 py-1.5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Growth graph</p>
            <p className="text-[9px] font-bold text-emerald-600">+12.8%</p>
          </div>
          <div className="flex h-8 items-end justify-between gap-0.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${brand}, ${brand}80)`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2 py-1.5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Order tracking</p>
            <p className="text-[9px] font-bold" style={{ color: brand }}>
              86%
            </p>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{
                width: '86%',
                background: `linear-gradient(90deg, ${brand}, #FB923C)`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-1 -right-1 z-10 max-w-[8.5rem] rounded-xl border border-white bg-white px-2 py-1 shadow-[0_12px_24px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-orange-600 uppercase">Update</p>
        <p className="text-[10px] font-bold text-stone-800">{NOTIFS[notifIndex]}</p>
      </div>
    </div>
  );
}
