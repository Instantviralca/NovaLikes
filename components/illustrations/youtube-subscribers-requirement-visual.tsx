'use client';

import { cn } from '@/lib/utils';

/**
 * YouTube subscribers requirement visual — channel, package, analytics, order progress.
 */
export function YouTubeSubscribersRequirementVisual({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  const timeline = [
    { id: 'url', label: 'Channel URL', done: true },
    { id: 'package', label: 'Package selected', done: true },
    { id: 'confirmed', label: 'Order confirmed', done: true, active: true },
    { id: 'delivery', label: 'Delivery in progress', done: false },
  ] as const;

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(255,0,0,0.1),transparent_50%),radial-gradient(circle_at_12%_0%,rgba(249,115,22,0.12),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[10px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator Studio
              </p>
              <p className="text-sm font-bold text-stone-900">Order ready</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Public
          </span>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-3">
          <div className="flex items-start gap-3">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-md"
              style={{ background: `linear-gradient(145deg, ${ytRed}, #7f1d1d)` }}
            >
              YT
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Channel avatar
              </p>
              <p className="text-sm font-bold text-stone-900">Creator Channel</p>
              <p className="mt-0.5 truncate text-[10px] font-semibold text-stone-600">
                youtube.com/@creator
              </p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-lg border border-stone-200 bg-white px-2.5 py-1.5">
            <div>
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Subscribers
              </p>
              <p className="text-sm font-black tabular-nums text-stone-900">15.2K</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600">+ rising</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white p-2 shadow-sm">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Analytics
            </p>
            <p className="text-[11px] font-bold text-stone-800">Strong signal</p>
          </div>
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,#e7e5e4)] bg-[linear-gradient(145deg,#fffdfb,#fff7ed)] p-2 shadow-sm">
            <p className="text-[7px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              Package
            </p>
            <p className="text-[11px] font-bold text-stone-800">500 Subscribers</p>
          </div>
        </div>

        <div className="mt-auto space-y-1.5 rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Progress timeline
            </p>
            <span
              className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
              style={{ background: brand }}
            >
              Confirmed
            </span>
          </div>
          {timeline.map((row) => {
            const isActive = 'active' in row && row.active;
            return (
              <div key={row.id} className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold',
                    row.done || isActive
                      ? 'text-white'
                      : 'border border-stone-200 bg-stone-50 text-stone-400',
                  )}
                  style={
                    row.done || isActive
                      ? { background: isActive ? brand : '#10b981' }
                      : undefined
                  }
                >
                  {row.done || isActive ? '✓' : ''}
                </span>
                <p
                  className={cn(
                    'text-[11px] font-semibold',
                    row.done || isActive ? 'text-stone-800' : 'text-stone-400',
                  )}
                >
                  {row.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
