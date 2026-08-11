'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const LIKE_KEYS = [3280, 3640, 4120, 4680, 5240] as const;
const LOOP_MS = 7800;

const LIVE_TOASTS = [
  { id: 'a', label: 'New page like', detail: 'Alex liked your Page' },
  { id: 'b', label: 'New page like', detail: 'Morgan liked your Page' },
  { id: 'c', label: 'Page Insights', detail: '+8.6% likes this week' },
] as const;

function formatLikes(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type FacebookPageLikesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Premium Facebook Page Likes hero — Business Suite likes / Page Insights dashboard.
 * Distinct from the Followers hero (likes counter, thumbs-up emphasis, insights panels).
 */
export function FacebookPageLikesHeroDashboard({
  className,
  packagePreview,
}: FacebookPageLikesHeroDashboardProps) {
  const fbBlue = '#1877F2';
  const brand = '#F97316';
  const [likes, setLikes] = useState<number>(LIKE_KEYS[0]);
  const [toastIndex, setToastIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setLikes(LIKE_KEYS[LIKE_KEYS.length - 1]);
      return;
    }
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = (now - start) % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = LIKE_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = LIKE_KEYS[i];
      const to = LIKE_KEYS[i + 1];
      setLikes(from + (to - from) * local);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setToastIndex((i) => (i + 1) % LIVE_TOASTS.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const toast = LIVE_TOASTS[toastIndex];
  const growthBars = [32, 40, 38, 52, 48, 64, 70, 84] as const;
  const engageBars = [44, 52, 48, 60, 72] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[28rem] overflow-visible sm:max-w-[30rem] lg:max-w-[32rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[8%] right-[6%] size-44 rounded-full blur-3xl sm:size-52',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
        style={{ background: `${fbBlue}2a` }}
      />
      <div className="pointer-events-none absolute bottom-[12%] left-[6%] size-28 rounded-full bg-[var(--brand-primary)]/14 blur-3xl" />

      {/* New page like notification */}
      <div className="pointer-events-none absolute top-0 -right-1 z-[7] max-w-[12rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(24,119,242,0.35)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.2s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: fbBlue }}
          >
            <ThumbsUp className="size-3.5" strokeWidth={2.5} fill="currentColor" />
          </span>
          <div className="min-w-0">
            <p
              className="text-[8px] font-semibold tracking-wide uppercase"
              style={{ color: fbBlue }}
            >
              {toast.label}
            </p>
            <p className="truncate text-[11px] font-bold text-stone-800">{toast.detail}</p>
          </div>
        </div>
      </div>

      {/* Page Insights floating */}
      <div className="pointer-events-none absolute top-[26%] -left-3 z-[7] hidden w-[9.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_14px_28px_-16px_rgba(24,119,242,0.3)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:block sm:-left-6">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Page Insights
        </p>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">+8.6%</p>
        <p className="text-[9px] font-semibold text-emerald-600">Page likes rising</p>
        <div className="mt-1.5 flex h-5 items-end gap-0.5">
          {engageBars.map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm"
              style={{
                height: `${h}%`,
                background: i === engageBars.length - 1 ? fbBlue : '#bfdbfe',
              }}
            />
          ))}
        </div>
      </div>

      {/* Engagement overview floating */}
      <div className="pointer-events-none absolute right-0 bottom-[7%] z-[7] w-[9.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(24,119,242,0.32)] backdrop-blur-md motion-safe:animate-[iv-float-card_6s_ease-in-out_infinite] sm:-right-3">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Engagement
          </p>
          <span
            className="rounded-full px-1.5 py-0.5 text-[7px] font-bold text-white"
            style={{ background: fbBlue }}
          >
            Live
          </span>
        </div>
        <p className="mt-1 text-[13px] font-black tabular-nums text-stone-900">5.4%</p>
        <p className="text-[9px] font-semibold text-stone-500">Reactions · Comments</p>
      </div>

      {/* Main likes dashboard */}
      <div className="relative z-[2] overflow-hidden rounded-2xl border border-sky-100/90 bg-white shadow-[0_28px_56px_-28px_rgba(24,119,242,0.35)] motion-safe:animate-iv-float-card">
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background: `linear-gradient(180deg, ${fbBlue}12 0%, transparent 100%)`,
          }}
        />
        <div className="relative flex items-center justify-between border-b border-stone-100 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg text-[11px] font-black text-white shadow-sm"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <div>
              <p className="text-[10px] font-bold text-stone-900">Meta Business Suite</p>
              <p className="text-[9px] text-stone-400">Page likes · Insights</p>
            </div>
          </div>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[9px] font-bold text-sky-700">
            Published
          </span>
        </div>

        <div className="relative space-y-2.5 p-3.5">
          <div className="overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
            <div
              className="relative flex h-16 items-end justify-end px-3 pb-2"
              style={{
                background: `linear-gradient(125deg, #083d75 0%, ${fbBlue} 50%, #93c5fd 100%)`,
              }}
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-stone-800 shadow-sm">
                <ThumbsUp className="size-3" strokeWidth={2.5} style={{ color: fbBlue }} />
                Like Page
              </span>
            </div>
            <div className="relative px-3 pb-3">
              <div
                className="absolute -top-6 left-3 flex size-12 items-center justify-center rounded-xl border-4 border-white text-sm font-black text-white shadow-sm"
                style={{ background: fbBlue }}
              >
                IV
              </div>
              <div className="pt-8">
                <p className="text-sm font-bold text-stone-900">Your Business Page</p>
                <p className="text-[10px] text-stone-500">Public · Brand · Global</p>
              </div>
              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                    Page likes
                  </p>
                  <p className="text-2xl font-black tabular-nums tracking-tight text-stone-900">
                    {formatLikes(likes)}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600">+8.6% this week</p>
                </div>
                {packagePreview ? (
                  <div className="rounded-lg border border-orange-100 bg-orange-50 px-2.5 py-1.5 text-right">
                    <p className="text-[8px] font-semibold text-orange-600 uppercase">Package</p>
                    <p className="text-[11px] font-bold text-stone-800">{packagePreview.title}</p>
                    <p className="text-[10px] font-semibold text-stone-500">
                      {packagePreview.priceLabel}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-1.5 text-right">
                    <p className="text-[8px] font-semibold text-sky-700 uppercase">New likes</p>
                    <p className="text-[12px] font-black text-stone-900">+420</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-sky-50 bg-[var(--surface-muted)]/80 px-3 py-2.5">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Community growth
              </p>
              <div className="mt-2 flex h-11 items-end gap-0.5">
                {growthBars.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === growthBars.length - 1
                          ? `linear-gradient(180deg, ${fbBlue}, ${brand})`
                          : i > 4
                            ? fbBlue
                            : '#bfdbfe',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-sky-50 bg-white px-3 py-2.5 shadow-sm">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Page Insights
              </p>
              <p className="mt-1 text-sm font-black tabular-nums text-stone-900">18.2K</p>
              <p className="text-[9px] font-semibold text-emerald-600">7-day reach</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '64%',
                    background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
