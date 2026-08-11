'use client';

import { cn } from '@/lib/utils';

/**
 * Global Creator Studio dashboard for Buying YouTube Subscribers worldwide.
 */
export function YouTubeSubscribersGlobalDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const growth = [28, 34, 40, 48, 56, 64, 74, 86];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[24rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 92% 8%, rgba(249,115,22,0.1), transparent 50%)',
        }}
      />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-9 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator Studio
              </p>
              <p className="text-sm font-bold text-stone-900">Channels</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
            WW
          </span>
        </div>

        <div className="grid grid-cols-[0.85fr_1.15fr] gap-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <svg viewBox="0 0 64 64" className="h-14 w-14 text-red-600" fill="currentColor">
              <path d="M32 8c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 4c4.2 0 8 3.4 10.6 8.4H21.4C24 15.4 27.8 12 32 12zm-14.7 12h11.2c-.3 2.5-.4 5.1-.4 8s.1 5.5.4 8H17.3C16.5 37.2 16 34.7 16 32s.5-5.2 1.3-8zm13.9 0h11.6c.3 2.5.4 5.1.4 8s-.1 5.5-.4 8H31.2c.3-2.5.4-5.1.4-8s-.1-5.5-.4-8zm13.6 0h11.2c.8 2.8 1.3 5.3 1.3 8s-.5 5.2-1.3 8H44.7c.3-2.5.4-5.1.4-8s-.1-5.5-.4-8zM21.4 43.6h21.2C40 48.6 36.2 52 32 52s-8-3.4-10.6-8.4z" />
            </svg>
            <p className="mt-1 text-[8px] font-bold tracking-wide text-stone-500 uppercase">
              Global
            </p>
          </div>
          <div className="space-y-2">
            <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Subscriber Growth
              </p>
              <p className="text-lg font-black tabular-nums text-stone-900">+2.8K</p>
              <p className="text-[10px] font-semibold text-emerald-600">This month</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Audience Overview
              </p>
              <p className="text-sm font-bold text-stone-800">Returning 41%</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Channel Analytics
            </p>
            <span className="text-[8px] font-bold" style={{ color: brand }}>
              Studio
            </span>
          </div>
          <div className="flex h-10 items-end gap-1">
            {growth.map((h, i) => (
              <span
                key={`ca-g-${i}`}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === growth.length - 1
                      ? `linear-gradient(180deg, ${brand}, ${ytRed})`
                      : `${ytRed}88`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
