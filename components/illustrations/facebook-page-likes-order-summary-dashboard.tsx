'use client';

import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

/**
 * Compact Facebook Page Likes order summary for processing requirements.
 * Distinct from Followers (page likes package + thumbs-up page preview).
 */
export function FacebookPageLikesOrderSummaryDashboard({
  className,
}: {
  className?: string;
}) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
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
          background: `radial-gradient(ellipse 70% 50% at 12% 0%, ${fbBlue}1a, transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(249,115,22,0.1), transparent 50%), linear-gradient(180deg, #f8fbff 0%, #ffffff 50%, #f7fafc 100%)`,
        }}
      />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-[11px] font-black text-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${fbBlue}, #0c4a8a)` }}
            >
              f
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Order Summary</p>
              <p className="text-xs text-stone-500">{d('Facebook Page Likes')}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {d('Confirmed')}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div
            className="relative flex h-12 items-end justify-end px-2.5 pb-1.5"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              <ThumbsUp className="size-2.5" strokeWidth={2.5} style={{ color: fbBlue }} />
              Like
            </span>
          </div>
          <div className="relative px-3 pb-3">
            <div
              className="absolute -top-5 left-3 flex size-10 items-center justify-center rounded-xl border-[3px] border-white text-[10px] font-black text-white"
              style={{ background: fbBlue }}
            >
              IV
            </div>
            <div className="pt-6">
              <p className="text-[11px] font-bold text-stone-900">Your Business Page</p>
              <p className="text-[9px] text-stone-500">Page preview</p>
            </div>
          </div>
        </div>

        <ul className="space-y-2" role="list">
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Page URL
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              facebook.com/yourpage
            </p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              {d('Page likes package')}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-stone-800">{d('500 Page Likes')}</p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Confirmation email
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              you@email.com
            </p>
          </li>
          <li
            className="rounded-xl border px-3.5 py-2.5"
            style={{
              borderColor: `color-mix(in srgb, ${fbBlue} 22%, #e7e5e4)`,
              background: `${fbBlue}0d`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                  Delivery progress
                </p>
                <p className="mt-0.5 text-sm font-semibold text-stone-800">In progress</p>
              </div>
              <span className="text-xs font-bold" style={{ color: fbBlue }}>
                58%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200/90">
              <div
                className="h-full rounded-full"
                style={{
                  width: '58%',
                  background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
                }}
              />
            </div>
          </li>
        </ul>

        <div className="flex justify-end">
          <span
            className="rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm"
            style={{ background: brand }}
          >
            {d('Track Order')}
          </span>
        </div>
      </div>
    </div>
  );
}
