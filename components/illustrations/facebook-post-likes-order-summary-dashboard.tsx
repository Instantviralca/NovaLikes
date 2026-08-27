'use client';

import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

/**
 * Premium Facebook Post Likes order summary for processing requirements.
 */
export function FacebookPostLikesOrderSummaryDashboard({
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
        'relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-28px_rgba(12,74,138,0.38)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 12% 0%, ${fbBlue}1f, transparent 55%), radial-gradient(ellipse 45% 35% at 92% 8%, rgba(249,115,22,0.12), transparent 50%), linear-gradient(180deg, #f4f8ff 0%, #ffffff 52%, #f7fafc 100%)`,
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
              <p className="text-xs text-stone-500">{d('Facebook Post Likes')}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            {d('Confirmed')}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-100 bg-white shadow-sm">
          <div
            className="relative flex h-20 items-end px-3 pb-2"
            style={{
              background: `linear-gradient(135deg, #083d75 0%, ${fbBlue} 55%, #93c5fd 100%)`,
            }}
          >
            <div className="absolute top-2 left-2 rounded-md bg-black/25 px-1.5 py-0.5 text-[8px] font-bold text-white backdrop-blur">
              Thumbnail
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              <ThumbsUp className="size-2.5" strokeWidth={2.5} style={{ color: fbBlue }} />
              Post preview
            </span>
          </div>
        </div>

        <ul className="space-y-2" role="list">
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Public Post URL
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              facebook.com/yourpage/posts/184920
            </p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Package selected
            </p>
            <p className="mt-0.5 text-sm font-semibold text-stone-800">{d('1,000 Post Likes')}</p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Confirmation email
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              you@email.com
            </p>
          </li>
        </ul>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-[10px] font-bold" style={{ color: brand }}>
              68%
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200/80">
            <div
              className="h-full rounded-full"
              style={{
                width: '68%',
                background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
              }}
            />
          </div>
        </div>

        <div
          className="flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-bold text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${fbBlue}, #0c4a8a)` }}
        >
          {d('Track Order')}
        </div>
      </div>
    </div>
  );
}
