'use client';

import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

/**
 * Facebook Page Likes requirement visual — Business Suite order dashboard.
 * Distinct from Followers requirement artwork (likes metrics + thumbs-up package).
 */
export function FacebookPageLikesRequirementVisual({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 88% 0%, ${fbBlue}18, transparent 50%), radial-gradient(circle at 12% 0%, rgba(249,115,22,0.12), transparent 55%)`,
        }}
      />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Page order
              </p>
              <p className="text-[11px] font-bold text-stone-800">{d('Page likes package')}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            {d('Confirmed')}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div
            className="relative flex h-12 items-end justify-end px-2.5 pb-1.5"
            style={{
              background: `linear-gradient(125deg, #083d75 0%, ${fbBlue} 55%, #93c5fd 100%)`,
            }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              <ThumbsUp className="size-2.5" strokeWidth={2.5} style={{ color: fbBlue }} />
              Like
            </span>
          </div>
          <div className="relative px-2.5 pb-2.5">
            <div
              className="absolute -top-5 left-2.5 flex size-10 items-center justify-center rounded-xl border-[3px] border-white text-[10px] font-black text-white"
              style={{ background: fbBlue }}
            >
              IV
            </div>
            <div className="pt-6">
              <p className="text-[11px] font-bold text-stone-900">Your Business Page</p>
              <p className="text-[9px] text-stone-500">Public page</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              {d('Page likes')}
            </p>
            <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">4.6K</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              {d('Selected package')}
            </p>
            <p className="mt-0.5 text-sm font-bold text-stone-900">{d('500 Likes')}</p>
          </div>
        </div>

        <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-2.5 py-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Community insights
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-stone-800">Trusted page</p>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-[10px] font-bold" style={{ color: fbBlue }}>
              58%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200/90">
            <div
              className="h-full rounded-full"
              style={{
                width: '58%',
                background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
