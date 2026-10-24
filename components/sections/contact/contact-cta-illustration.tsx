'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const UPDATES = ['Chat connected', 'Ticket updated', 'Email confirmed'] as const;

/**
 * Compact Contact final CTA — support dashboard illustration.
 */
export function ContactCtaIllustration({ className }: { className?: string }) {
  const brand = '#F97316';
  const [updateIndex, setUpdateIndex] = useState(0);
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
      setUpdateIndex((i) => (i + 1) % UPDATES.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

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
            <p className="text-xs font-bold text-stone-900">Support</p>
            <p className="text-[9px] text-stone-500">Live assistance</p>
          </div>
        </div>

        <div className="mb-2 rounded-xl border border-orange-100 bg-orange-50/60 px-2 py-1.5">
          <div className="mb-0.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-orange-600 uppercase">Live chat</p>
            <span className="size-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-[10px] font-medium text-stone-700">Agent available now</p>
        </div>

        <div className="mb-2 rounded-xl border border-stone-100 bg-stone-50 px-2 py-1.5">
          <p className="text-[8px] font-semibold text-stone-400 uppercase">Order tracking</p>
          <p className="text-[10px] font-bold text-stone-800">IV-2847 · 74%</p>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{ width: '74%', background: `linear-gradient(90deg, ${brand}, #FB923C)` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2 py-1.5">
          <p className="text-[8px] font-semibold text-stone-400 uppercase">Support ticket</p>
          <p className="text-[10px] font-bold text-stone-800">#SUP-1042</p>
          <p className="text-[9px] text-emerald-600">Awaiting reply</p>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-1 -right-1 z-10 max-w-[8.5rem] rounded-xl border border-white bg-white px-2 py-1 shadow-[0_12px_24px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-orange-600 uppercase">Update</p>
        <p className="text-[10px] font-bold text-stone-800">{UPDATES[updateIndex]}</p>
      </div>
    </div>
  );
}
