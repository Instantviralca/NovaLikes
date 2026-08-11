'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const NOTIFS = [
  { id: 'ig', label: 'Instagram', detail: '+250 likes delivered' },
  { id: 'tt', label: 'TikTok', detail: '1.2K views processing' },
  { id: 'yt', label: 'YouTube', detail: 'New subscriber added' },
  { id: 'fb', label: 'Facebook', detail: 'Page likes confirmed' },
] as const;

const PLATFORMS = [
  { id: 'ig', label: 'IG', color: '#E1306C', metric: '12.4K', sub: 'Followers' },
  { id: 'tt', label: 'TT', color: '#010101', metric: '8.7K', sub: 'Views' },
  { id: 'yt', label: 'YT', color: '#FF0000', metric: '3.2K', sub: 'Subs' },
  { id: 'fb', label: 'FB', color: '#1877F2', metric: '5.1K', sub: 'Likes' },
] as const;

/**
 * About hero — multi-platform SaaS growth dashboard (decorative).
 */
export function AboutHeroIllustration({ className }: { className?: string }) {
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
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const notif = NOTIFS[notifIndex];
  const bars = [32, 44, 38, 52, 48, 64, 58, 72] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] overflow-visible sm:max-w-[24rem] lg:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[8%] right-[6%] size-40 rounded-full blur-3xl sm:size-48',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
        style={{ background: `${brand}30` }}
      />
      <div className="pointer-events-none absolute bottom-[10%] left-[4%] size-32 rounded-full bg-orange-200/40 blur-3xl" />

      {/* Floating notification */}
      <div className="pointer-events-none absolute -top-1 right-0 z-[8] max-w-[11rem] rounded-xl border border-white/90 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-14px_rgba(249,115,22,0.35)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.2s_ease-in-out_infinite] sm:-right-2">
        <p className="text-[8px] font-semibold tracking-wide text-orange-600 uppercase">
          {notif.label}
        </p>
        <p className="text-[11px] font-bold text-stone-800">{notif.detail}</p>
      </div>

      {/* Main dashboard shell */}
      <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-3 shadow-[0_24px_48px_-28px_rgba(28,25,23,0.45)] backdrop-blur-sm sm:p-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-stone-400 uppercase">
              NovaLikes
            </p>
            <p className="text-sm font-bold text-stone-900">Growth dashboard</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            Live
          </span>
        </div>

        {/* Platform mini dashboards */}
        <div className="mb-2.5 grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-stone-100/90 bg-white/80 px-2 py-2 shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span
                  className="flex size-5 items-center justify-center rounded-md text-[7px] font-black text-white"
                  style={{ background: p.color }}
                >
                  {p.label}
                </span>
                <p className="text-[9px] font-semibold text-stone-500">{p.sub}</p>
              </div>
              <p className="text-sm font-black tabular-nums text-stone-900">{p.metric}</p>
            </div>
          ))}
        </div>

        {/* Analytics graph */}
        <div className="mb-2.5 rounded-xl border border-stone-100 bg-stone-50/80 px-2.5 py-2 backdrop-blur-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Analytics
            </p>
            <p className="text-[10px] font-bold text-emerald-600">+18.4%</p>
          </div>
          <div className="flex h-10 items-end justify-between gap-1">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${brand}, ${brand}88)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Order tracking + secure checkout row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white/90 px-2 py-2 backdrop-blur-sm">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Order tracking</p>
            <p className="text-[11px] font-bold text-stone-800">IV-2847</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: '74%',
                  background: `linear-gradient(90deg, ${brand}, #FB923C)`,
                }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50/70 px-2 py-2 backdrop-blur-sm">
            <p className="text-[8px] font-semibold text-orange-600 uppercase">Secure checkout</p>
            <p className="text-[11px] font-bold text-stone-800">Encrypted</p>
            <p className="text-[9px] text-stone-500">SSL protected</p>
          </div>
        </div>
      </div>

      {/* Secondary floating card */}
      <div className="pointer-events-none absolute -bottom-2 -left-1 z-[7] max-w-[10rem] rounded-xl border border-white bg-white/95 px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.4)] backdrop-blur-md motion-safe:animate-[iv-float-card_6s_ease-in-out_infinite_0.8s]">
        <p className="text-[8px] font-semibold text-stone-400 uppercase">Delivery</p>
        <p className="text-[11px] font-bold text-stone-800">Order confirmed</p>
      </div>
    </div>
  );
}
