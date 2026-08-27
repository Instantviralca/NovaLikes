'use client';


import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const ROWS: ReadonlyArray<{
  id: string;
  label: string;
  value: string;
  done: boolean;
  active?: boolean;
}> = [
  { id: 'username', label: 'Username', value: '@creator', done: true },
  { id: 'package', label: 'Package selected', value: '1,000 Followers', done: true },
  { id: 'confirmed', label: 'Order confirmed', value: 'IV-94821', done: true },
  { id: 'tracking', label: 'Tracking available', value: 'Live', done: true, active: true },
  { id: 'progress', label: 'Delivery progress', value: '62%', done: false },
];

/**
 * TikTok order summary dashboard for delivery requirements section.
 */
export function TikTokOrderSummaryDashboard({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
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
              ♪
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Order Summary</p>
              <p className="text-xs text-stone-500">TikTok Followers</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {d('Confirmed')}
          </span>
        </div>

        <ul className="space-y-2" role="list">
          {ROWS.map((row) => (
            <li
              key={row.id}
              className={cn(
                'flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5',
                row.active
                  ? 'border-[color-mix(in_srgb,var(--brand-primary)_35%,#e7e5e4)] bg-[var(--brand-accent-soft)]/70'
                  : 'border-stone-100 bg-white/90',
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                    row.done || row.active
                      ? 'bg-emerald-500 text-white'
                      : 'border border-stone-200 bg-stone-50 text-stone-400',
                  )}
                  style={row.active ? { background: brand } : undefined}
                >
                  {row.done || row.active ? '✓' : ''}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                    {d(row.label)}
                  </p>
                  <p className="truncate text-sm font-semibold text-stone-800">{d(String(row.value))}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-xs font-bold text-[var(--brand-primary)]">62%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200/90">
            <div
              className="h-full rounded-full"
              style={{
                width: '62%',
                background: `linear-gradient(90deg, ${brand}, #fb923c)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
