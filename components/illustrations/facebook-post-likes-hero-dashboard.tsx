'use client';

import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

type FacebookPostLikesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Facebook Post Likes hero — a specific post and its like-count metric.
 * No invented customer results, growth percentages, or follower stats.
 */
export function FacebookPostLikesHeroDashboard({
  className,
  packagePreview,
}: FacebookPostLikesHeroDashboardProps) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[26rem] overflow-visible sm:max-w-[28rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -top-1 -left-3 z-20 hidden rounded-2xl border border-white/90 bg-white px-3 py-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.45)] sm:block">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">Post</p>
        <p className="text-xs font-bold text-stone-800">Selected Post</p>
      </div>
      <div className="pointer-events-none absolute top-[18%] -right-4 z-20 hidden rounded-2xl border border-white/90 bg-white px-3 py-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.45)] sm:block">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">Metric</p>
        <p className="text-xs font-bold text-stone-800">{d('Post Likes')}</p>
      </div>

      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/40 bg-white/80 p-4 shadow-[0_28px_60px_-32px_rgba(12,74,138,0.55)] backdrop-blur-xl sm:p-5">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 45% at 10% 0%, ${fbBlue}22, transparent 55%), radial-gradient(ellipse 50% 40% at 95% 15%, rgba(249,115,22,0.12), transparent 50%), linear-gradient(165deg, #f5f9ff 0%, #ffffff 48%, #eef4ff 100%)`,
          }}
        />

        <div className="relative space-y-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="flex size-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${fbBlue}, #0c4a8a)` }}
              >
                f
              </span>
              <div>
                <p className="text-sm font-bold text-stone-900">Facebook Post</p>
                <p className="text-[10px] text-stone-500">Public Facebook post</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-100/90 bg-white/90 shadow-[0_12px_28px_-20px_rgba(24,119,242,0.35)]">
            <div className="flex items-center gap-2.5 border-b border-stone-100 px-3 py-2.5">
              <span
                className="flex size-8 items-center justify-center rounded-full text-[10px] font-black text-white"
                style={{ background: fbBlue }}
              >
                f
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-stone-900">Selected Post</p>
                <p className="text-[9px] text-stone-500">Public Facebook Post URL</p>
              </div>
              <ThumbsUp className="size-3.5 shrink-0" style={{ color: fbBlue }} />
            </div>
            <div
              className="relative h-24 sm:h-28"
              style={{
                background: `linear-gradient(135deg, #0a3d78 0%, ${fbBlue} 48%, #7db3ff 100%)`,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.22),transparent_45%)]" />
              <div className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-stone-800 shadow-sm backdrop-blur">
                Like Count
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex items-center gap-3 text-[10px] font-semibold text-stone-600">
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="size-3" style={{ color: fbBlue }} />
                  {d('Post Likes')}
                </span>
              </div>
            </div>
          </div>

          {packagePreview ? (
            <div
              className="rounded-xl border px-3 py-2.5"
              style={{
                borderColor: `${brand}55`,
                background: 'color-mix(in srgb, var(--brand-accent-soft) 70%, white)',
              }}
            >
              <p className="text-[9px] font-semibold tracking-wide text-stone-500 uppercase">
                {d('Selected package')}
              </p>
              <p className="text-sm font-bold text-stone-900">{packagePreview.title}</p>
              <p className="text-xs font-semibold" style={{ color: brand }}>
                {packagePreview.priceLabel}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
