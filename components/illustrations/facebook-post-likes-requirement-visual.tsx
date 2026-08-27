'use client';

import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

/**
 * Facebook Post Likes requirement visual — post order checklist dashboard.
 */
export function FacebookPostLikesRequirementVisual({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_22px_48px_-28px_rgba(12,74,138,0.34)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
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
                Post order
              </p>
              <p className="text-[11px] font-bold text-stone-800">{d('Post likes package')}</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Ready
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div
            className="relative flex h-12 items-end justify-between px-2.5 pb-1.5"
            style={{
              background: `linear-gradient(125deg, #083d75 0%, ${fbBlue} 55%, #93c5fd 100%)`,
            }}
          >
            <span className="text-[8px] font-bold text-white/90">Post preview</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              <ThumbsUp className="size-2.5" strokeWidth={2.5} style={{ color: fbBlue }} />
              Like
            </span>
          </div>
          <div className="px-2.5 py-2">
            <p className="text-[11px] font-bold text-stone-900">Your Facebook post</p>
            <p className="text-[9px] text-stone-500">Public post URL only</p>
          </div>
        </div>

        <div className="space-y-1.5">
          {[
            'Public Facebook Post URL',
            'Selected Post Likes Package',
            'Valid Email Address',
            'Secure Checkout',
          ].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-stone-100 bg-white/90 px-2.5 py-1.5"
            >
              <span
                className="flex size-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ background: brand }}
              >
                ✓
              </span>
              <p className="text-[10px] font-semibold text-stone-800">{d(label)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
