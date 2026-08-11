'use client';

import { cn } from '@/lib/utils';

/**
 * Creator Studio channel overview for “Can You Buy YouTube Subscribers?”.
 * Distinct from the order-summary card used in requirements.
 */
export function YouTubeSubscribersChannelOverviewDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 12% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(249,115,22,0.1), transparent 50%), linear-gradient(180deg, #fffdfb 0%, #ffffff 50%, #faf6f1 100%)',
        }}
      />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-[11px] font-black text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${ytRed}, #b91c1c)`,
              }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator Studio
              </p>
              <p className="text-sm font-bold text-stone-900">Channel Overview</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
            Public
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-3.5 py-3">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
            style={{ background: ytRed }}
          >
            YT
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-stone-900">@channel</p>
            <p className="text-xs text-stone-500">youtube.com/@channel</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white px-2 py-2.5 text-center">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Subscribers
            </p>
            <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">12.4K</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2 py-2.5 text-center">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Views
            </p>
            <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">186K</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2 py-2.5 text-center">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Watch Time
            </p>
            <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">42h</p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 px-3.5 py-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
              Channel Settings
            </p>
            <span className="text-[9px] font-bold text-emerald-600">Public access</span>
          </div>
          <ul className="space-y-1.5">
            {[
              'Public channel URL ready',
              'No password required',
              'Package can be assigned',
            ].map((row) => (
              <li
                key={row}
                className="flex items-center gap-2 text-[11px] font-semibold text-stone-700"
              >
                <span
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-white"
                  style={{ background: brand }}
                >
                  ✓
                </span>
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
