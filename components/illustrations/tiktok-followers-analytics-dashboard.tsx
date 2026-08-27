'use client';

import { cn } from '@/lib/utils';
import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';

/**
 * 16:9 analytics dashboard — Does Buying TikTok Followers Work?
 * Shows growth metrics only (no earnings).
 */
export function TikTokFollowersAnalyticsDashboard({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const bars = [32, 40, 38, 52, 48, 66, 62, 78, 74, 88];
  const linePoints = '4,78 18,70 32,72 46,58 60,54 74,42 88,36 102,28';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/9] w-full max-w-[40rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -top-10 right-6 size-36 rounded-full bg-[var(--brand-primary)]/18 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-8 size-32 rounded-full bg-[#25F4EE]/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(249,115,22,0.14),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
              {d('Account growth')}
            </p>
            <p className="text-sm font-bold text-stone-900">TikTok analytics overview</p>
          </div>
          <span className="rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-[9px] font-bold text-[var(--brand-primary)]">
            {d('Growth timeline')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: 'Followers', value: '24.5K' },
            { label: 'Video Views', value: '182K' },
            { label: 'Profile Visits', value: '9.4K' },
            { label: 'Engagement', value: '4.8%' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 px-2.5 py-2"
            >
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                {d(metric.label)}
              </p>
              <p className="text-sm font-bold tabular-nums text-stone-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid min-h-0 flex-1 gap-2 sm:grid-cols-[1.4fr_1fr]">
          <div className="flex min-h-0 flex-col rounded-xl border border-stone-100 bg-[linear-gradient(180deg,#fffdfb,#fff7ed)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_-18px_rgba(28,25,23,0.35)]">
            <p className="mb-2 text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Followers chart
            </p>
            <div className="flex min-h-0 flex-1 items-end gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm shadow-[0_4px_8px_-4px_rgba(249,115,22,0.45)]"
                  style={{
                    height: `${h}%`,
                    background:
                      i === bars.length - 1
                        ? `linear-gradient(180deg, ${tiktokCyan}, ${brand})`
                        : `linear-gradient(180deg, #fdba74, ${brand})`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex min-h-0 translate-y-1 flex-col rounded-xl border border-stone-100 bg-white p-3 shadow-[0_16px_32px_-20px_rgba(28,25,23,0.4)] motion-reduce:translate-y-0">
            <p className="mb-2 text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience growth
            </p>
            <svg viewBox="0 0 110 90" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tt-f-growth-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brand} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={brand} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d={`M${linePoints} L102,90 L4,90 Z`}
                fill="url(#tt-f-growth-fill)"
              />
              <polyline
                points={linePoints}
                fill="none"
                stroke={brand}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
