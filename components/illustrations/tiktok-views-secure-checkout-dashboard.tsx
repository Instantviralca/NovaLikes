'use client';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const STATUS_ROWS = [
  { id: 'received', label: 'Order Received', done: true },
  { id: 'payment', label: 'Payment Confirmed', done: true },
  { id: 'scheduled', label: 'Delivery Scheduled', done: true },
  { id: 'delivering', label: 'Views Delivering', done: true, active: true },
  { id: 'complete', label: 'Order Complete', done: false },
] as const;

/**
 * TikTok Views “Secure Checkout” card for Order With Confidence panel.
 */
export function TikTokViewsSecureCheckoutDashboard({
  className,
}: {
  className?: string;
}) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-30px_rgba(28,25,23,0.4)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 8% 0%, rgba(249,115,22,0.12), transparent 55%), linear-gradient(180deg, #fffdfb 0%, #ffffff 45%, #faf6f1 100%)',
        }}
      />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${tiktokCyan}, ${brand})`,
              }}
            >
              ▶
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">{d('Secure Checkout')}</p>
              <p className="text-xs text-[var(--text-muted)]">{d('TikTok Views')}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {d('Live')}
          </span>
        </div>

        <div className="mb-4 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-3 py-2.5">
          <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
            Video receiving views
          </p>
          <p className="mt-0.5 truncate text-sm font-bold text-stone-800">
            tiktok.com/@creator/video/…
          </p>
        </div>

        <ul className="space-y-2" role="list">
          {STATUS_ROWS.map((row) => {
            const isActive = 'active' in row && row.active;
            return (
              <li
                key={row.id}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
                  isActive
                    ? 'border-[color-mix(in_srgb,var(--brand-primary)_35%,#e7e5e4)] bg-[var(--brand-accent-soft)]/70 shadow-sm'
                    : row.done
                      ? 'border-stone-100 bg-white/90'
                      : 'border-dashed border-stone-200 bg-white/50',
                )}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
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
                    'text-sm font-semibold',
                    row.done || isActive ? 'text-stone-800' : 'text-stone-400',
                  )}
                >
                  {d(row.label)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
