'use client';

import { ThumbsUp } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Compact Facebook post engagement analytics for educational prose-split.
 * Distinct from Followers and Page Likes artwork.
 */
export function FacebookPostLikesAnalyticsDashboard({ className }: { className?: string }) {
  const fbBlue = '#1877F2';
  const trend = [22, 30, 36, 44, 52, 61, 74, 86];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[17.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(12,74,138,0.34)] motion-safe:animate-iv-float-card sm:max-w-[18.5rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 88% 0%, ${fbBlue}14, transparent 50%), linear-gradient(180deg, #f7faff 0%, #ffffff 55%)`,
        }}
      />
      <div className="relative space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-lg text-[10px] font-black text-white"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <div>
              <p className="text-[10px] font-bold text-stone-900">Post analytics</p>
              <p className="text-[8px] text-stone-500">Public post · Global</p>
            </div>
          </div>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[8px] font-bold text-sky-700">
            Campaign
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-100">
          <div
            className="flex h-14 items-end px-2.5 pb-1.5"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #93c5fd 100%)`,
            }}
          >
            <span className="rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              Post preview
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 bg-[#f0f2f5] px-2 py-2">
            <div className="rounded-lg bg-white px-1.5 py-1.5 text-center">
              <p className="text-[7px] font-semibold text-stone-400 uppercase">Likes</p>
              <p className="text-[11px] font-black text-stone-900">2.4K</p>
            </div>
            <div className="rounded-lg bg-white px-1.5 py-1.5 text-center">
              <p className="text-[7px] font-semibold text-stone-400 uppercase">Comments</p>
              <p className="text-[11px] font-black text-stone-900">186</p>
            </div>
            <div className="rounded-lg bg-white px-1.5 py-1.5 text-center">
              <p className="text-[7px] font-semibold text-stone-400 uppercase">Reach</p>
              <p className="text-[11px] font-black text-stone-900">18.2K</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Engagement trend
            </p>
            <ThumbsUp className="size-3" style={{ color: fbBlue }} />
          </div>
          <div className="flex h-9 items-end gap-1">
            {trend.map((h, i) => (
              <span
                key={`t-${i}`}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === trend.length - 1
                      ? `linear-gradient(180deg, #F97316, ${fbBlue})`
                      : `${fbBlue}88`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Recent interactions
          </p>
          {['👍 Alex liked your post', '👍 Morgan reacted', '💬 Sam commented'].map((row) => (
            <div
              key={row}
              className="rounded-lg border border-stone-100 bg-white px-2 py-1 text-[9px] font-semibold text-stone-700"
            >
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
