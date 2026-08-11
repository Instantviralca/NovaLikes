'use client';

import { cn } from '@/lib/utils';

/**
 * TikTok likes requirement visual — video URL, package, email, secure checkout.
 */
export function TikTokLikesRequirementVisual({ className }: { className?: string }) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(249,115,22,0.14),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
              }}
            >
              ♥
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Video order
              </p>
              <p className="text-sm font-bold text-stone-900">Link ready</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Public
          </span>
        </div>

        {/* Video URL field */}
        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-3">
          <div className="flex items-start gap-3">
            <span
              className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg text-sm font-bold text-white shadow-md"
              style={{ background: `linear-gradient(145deg, #292524, ${tiktokRed})` }}
            >
              ▶
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Public video URL
              </p>
              <div className="mt-0.5 truncate rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-stone-700 shadow-sm">
                tiktok.com/@creator/video/…
              </div>
            </div>
          </div>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-sky-500 text-[8px] text-white">
              ✓
            </span>
            <span className="text-[10px] font-bold text-sky-700">No password needed</span>
          </div>
        </div>

        {/* Package + email */}
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,#e7e5e4)] bg-[linear-gradient(145deg,#fffdfb,#fff7ed)] p-3 shadow-sm">
          <p className="text-[8px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
            Selected package
          </p>
          <div className="mt-1 flex items-baseline justify-between gap-2">
            <p className="text-sm font-bold text-stone-900">1,000 Likes</p>
            <p className="text-sm font-bold text-[var(--brand-primary)]">$4.99</p>
          </div>
          <div className="mt-2 rounded-lg border border-stone-200/80 bg-white/90 px-2.5 py-1.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Valid email
            </p>
            <p className="truncate text-[11px] font-semibold text-stone-800">you@company.com</p>
          </div>
        </div>

        {/* Secure checkout */}
        <div className="mt-auto rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: brand }}
            >
              ✓
            </span>
            <div>
              <p className="text-[11px] font-bold text-emerald-800">Secure checkout</p>
              <p className="text-[9px] font-medium text-emerald-700">Ready when you confirm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
