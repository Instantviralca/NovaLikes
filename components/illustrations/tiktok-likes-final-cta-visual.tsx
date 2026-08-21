'use client';

import { cn } from '@/lib/utils';

/**
 * Final CTA — TikTok Likes video/order phone + status cards. No fake performance stats.
 */
export function TikTokLikesFinalCtaVisual({ className }: { className?: string }) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';

  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[18.5rem] items-center justify-center sm:max-w-[21rem] lg:max-w-[24rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.35)_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute -top-4 -right-6 size-28 rounded-full bg-[#FE2C55]/20 blur-3xl" />

      <div className="pointer-events-none absolute -top-1 -left-3 z-20 rounded-2xl border border-white/90 bg-white px-3 py-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.55)] sm:-left-6 sm:px-3.5 sm:py-2.5 motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase sm:text-[9px]">
          Package
        </p>
        <p className="text-xs font-bold text-stone-800 sm:text-sm">Likes Package Selected</p>
      </div>

      <div className="pointer-events-none absolute top-[38%] -right-2 z-20 hidden rounded-2xl border border-white/90 bg-white px-3.5 py-2.5 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.55)] sm:block sm:-right-5 motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite]">
        <p className="text-[9px] font-semibold tracking-wide text-emerald-600 uppercase">
          Checkout
        </p>
        <p className="text-sm font-bold text-stone-800">Secure Checkout</p>
      </div>

      <div className="pointer-events-none absolute -bottom-1 -left-2 z-20 rounded-2xl border border-white/90 bg-white px-3 py-2 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.55)] sm:-left-5 sm:px-3.5 sm:py-2.5 motion-safe:animate-[iv-float-card_7s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold tracking-wide text-sky-600 uppercase sm:text-[9px]">
          Tracking
        </p>
        <p className="text-xs font-bold text-stone-800 sm:text-sm">Order Tracking</p>
      </div>

      <div className="relative z-10 w-full rotate-[4deg] motion-safe:animate-iv-float-card motion-reduce:rotate-0">
        <div className="overflow-hidden rounded-[2rem] border-[3px] border-[#1c1917] bg-[#1c1917] shadow-[0_32px_64px_-20px_rgba(0,0,0,0.75),0_16px_32px_-12px_rgba(249,115,22,0.35)]">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-stone-700" />
          <div className="m-1.5 overflow-hidden rounded-[1.55rem] bg-white">
            <div
              className="px-3.5 pt-4 pb-3.5"
              style={{
                background: 'linear-gradient(165deg, #fff7ed 0%, #ffffff 42%, #fff1f2 100%)',
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="flex size-8 items-center justify-center rounded-xl text-xs font-black text-white shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
                  }}
                >
                  ♥
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                  Order Confirmed
                </span>
              </div>

              <div
                className="relative mb-3 overflow-hidden rounded-2xl"
                style={{
                  background: 'linear-gradient(165deg,#fff7ed 0%,#ffedd5 50%,#fb923c 100%)',
                }}
              >
                <div className="flex aspect-[16/9] items-center justify-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--brand-primary)] shadow-sm">
                    <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-current" aria-hidden>
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/95 p-3 text-center shadow-sm">
                <p className="text-[10px] font-semibold tracking-wide text-emerald-700 uppercase">
                  Order Confirmed
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight text-stone-900">TikTok Likes</p>
                <p className="mt-1 text-xs font-medium text-stone-500">Public Video Link</p>
              </div>

              <div className="mt-3 space-y-1.5">
                {[
                  { label: 'Order Confirmed' },
                  { label: 'Order in Progress' },
                  { label: 'Order Tracking' },
                ].map((step) => (
                  <div
                    key={step.label}
                    className="flex items-center justify-between rounded-xl border border-stone-100 bg-white px-3 py-2 shadow-[0_4px_10px_-8px_rgba(28,25,23,0.35)]"
                  >
                    <span className="text-[11px] font-semibold text-stone-700">{step.label}</span>
                    <span className="text-[11px] font-bold text-emerald-600">✓</span>
                  </div>
                ))}
              </div>

              <div
                className="mt-3 rounded-xl py-2.5 text-center text-[11px] font-bold text-white shadow-[0_10px_20px_-12px_rgba(249,115,22,0.85)]"
                style={{ background: `linear-gradient(90deg, ${brand}, #ea580c)` }}
              >
                View order tracking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
