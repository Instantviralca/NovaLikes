'use client';

import { cn } from '@/lib/utils';

const ROWS = [
  { id: 'url', label: 'Public video URL', value: 'tiktok.com/@…/video', done: true },
  { id: 'package', label: 'Package selected', value: '1,000 Likes', done: true },
  { id: 'email', label: 'Valid email', value: 'you@company.com', done: true },
  { id: 'payment', label: 'Secure payment', value: 'Confirmed', done: true, active: true },
] as const;

/**
 * TikTok Likes order summary for “What We Need To Process Your Order”.
 */
export function TikTokLikesOrderSummaryDashboard({ className }: { className?: string }) {
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
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
            'radial-gradient(ellipse 70% 50% at 12% 0%, rgba(249,115,22,0.12), transparent 55%), linear-gradient(180deg, #fffdfb 0%, #ffffff 50%, #faf6f1 100%)',
        }}
      />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
              }}
            >
              ♥
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Order Details</p>
              <p className="text-xs text-stone-500">TikTok Likes</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            Ready
          </span>
        </div>

        <ul className="space-y-2" role="list">
          {ROWS.map((row) => {
            const isActive = 'active' in row && row.active;
            return (
              <li
                key={row.id}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5',
                  isActive
                    ? 'border-[color-mix(in_srgb,var(--brand-primary)_35%,#e7e5e4)] bg-[var(--brand-accent-soft)]/70'
                    : 'border-stone-100 bg-white/90',
                )}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: isActive ? brand : '#10b981' }}
                  >
                    ✓
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                      {row.label}
                    </p>
                    <p className="truncate text-sm font-bold text-stone-800">{row.value}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
