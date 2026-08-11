'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/** Subtle realtime like-count sequence for hero. */
const LIKE_KEYS = [1240, 1245, 1252, 1260] as const;
const LOOP_MS = 9200;
const NOTIFS = [
  { label: 'Heart', value: '❤️ 1,240' },
  { label: 'Heart', value: '❤️ 1,245' },
  { label: 'Heart', value: '❤️ 1,252' },
  { label: 'Heart', value: '❤️ 1,260' },
] as const;

function formatLikes(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type InstagramLikesPackagesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Instagram Likes packages hero — post preview, rising likes, hearts, engagement widgets.
 */
export function InstagramLikesPackagesHeroDashboard({
  className,
  packagePreview,
}: InstagramLikesPackagesHeroDashboardProps) {
  const accent = '#E1306C';
  const brand = '#F97316';
  const [likes, setLikes] = useState<number>(LIKE_KEYS[0]);
  const [notifIndex, setNotifIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0.42);

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
      setProgress(0.82);
      setNotifIndex(NOTIFS.length - 1);
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = LIKE_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOutCubic(raw - i);
      const from = LIKE_KEYS[i];
      const to = LIKE_KEYS[i + 1];
      setLikes(from + (to - from) * local);
      setNotifIndex(Math.min(Math.floor(t * NOTIFS.length), NOTIFS.length - 1));
      setProgress(0.38 + easeInOutCubic(raw / segments) * 0.48);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const bars = [
    { x: 18, h: 36, delay: '0s' },
    { x: 44, h: 50, delay: '0.08s' },
    { x: 70, h: 44, delay: '0.16s' },
    { x: 96, h: 62, delay: '0.24s' },
    { x: 122, h: 74, delay: '0.32s' },
    { x: 148, h: 66, delay: '0.4s' },
    { x: 174, h: 88, delay: '0.48s' },
  ] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[20.5rem] sm:max-w-[22.5rem] lg:max-w-[24rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[12%] right-[10%] size-28 rounded-full bg-[var(--brand-primary)]/20 blur-3xl sm:size-32',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div
        className="pointer-events-none absolute top-[44%] left-[12%] size-24 rounded-full bg-[#E1306C]/12 blur-3xl"
      />
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-85 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 32% 20%, rgba(249,115,22,0.26), transparent 55%), radial-gradient(circle at 78% 70%, rgba(225,48,108,0.16), transparent 48%)',
        }}
      />

      <div className="relative mx-auto w-[66%] max-w-[13rem] motion-safe:animate-iv-float-card sm:max-w-[14rem]">
        <div className="relative z-[2] rounded-[2rem] border border-stone-800/90 bg-stone-900 p-2 shadow-[0_28px_56px_-28px_rgba(28,25,23,0.7)]">
          <div className="overflow-hidden rounded-[1.6rem] bg-white">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <p className="text-[10px] font-semibold text-stone-800">9:41</p>
              <div className="mx-auto h-1.5 w-16 rounded-full bg-stone-200" />
              <div className="flex gap-0.5">
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
                <span className="size-1.5 rounded-full bg-stone-400" />
              </div>
            </div>
            <div className="px-3.5 pb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex size-9 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
                  }}
                >
                  IV
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-stone-900">novalikes</p>
                  <p className="text-[9px] text-stone-500">Public post</p>
                </div>
                <span className="text-sm font-bold text-stone-400">•••</span>
              </div>

              <div
                className="relative mt-2.5 aspect-[4/5] overflow-hidden rounded-xl"
                style={{
                  background:
                    'linear-gradient(160deg, #fff7ed 0%, #ffedd5 32%, #fecaca 68%, #fda4af 100%)',
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.55),transparent_55%)]" />
                <div className="absolute inset-x-4 top-5 rounded-lg bg-white/60 p-2 shadow-sm backdrop-blur-sm">
                  <div className="h-2 w-3/5 rounded-full bg-stone-200/80" />
                  <div className="mt-1.5 h-1.5 w-2/5 rounded-full bg-stone-200/60" />
                </div>

                {/* Floating heart particles — kept small and subtle */}
                {!reduceMotion ? (
                  <>
                    <span className="absolute top-[28%] left-[18%] text-[10px] opacity-55 motion-safe:animate-[iv-float-card_4.2s_ease-in-out_infinite]">
                      ❤️
                    </span>
                    <span className="absolute top-[36%] right-[16%] text-[9px] opacity-45 motion-safe:animate-[iv-float-card_5.1s_ease-in-out_infinite]">
                      ❤️
                    </span>
                  </>
                ) : null}

                <div className="absolute right-3 bottom-3 left-3 rounded-xl border border-white/75 bg-white/85 px-3 py-2.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex size-8 items-center justify-center rounded-full text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${brand})` }}
                    >
                      <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold tracking-wide text-stone-500 uppercase">
                        Likes
                      </p>
                      <p className="text-base font-bold tabular-nums tracking-tight text-stone-900 transition-[opacity] duration-150">
                        {formatLikes(likes)}
                      </p>
                    </div>
                    <div className="ml-auto w-16">
                      <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
                        <div
                          className="h-full rounded-full transition-[width] duration-500 ease-out"
                          style={{
                            width: `${Math.round(progress * 100)}%`,
                            background: `linear-gradient(90deg, ${brand}, ${accent})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-3 px-0.5">
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={accent}
                  />
                </svg>
                <svg viewBox="0 0 24 24" className="size-5 stroke-stone-800" fill="none" aria-hidden>
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    strokeWidth="1.6"
                  />
                </svg>
                <svg viewBox="0 0 24 24" className="size-5 stroke-stone-800" fill="none" aria-hidden>
                  <path d="M22 2 11 13" strokeWidth="1.6" />
                  <path d="M22 2 15 22 11 13 2 9l20-7z" strokeWidth="1.6" />
                </svg>
                <p className="ml-auto text-[10px] font-semibold tabular-nums text-stone-700">
                  {formatLikes(likes)} likes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement analytics — clear of phone */}
        <div className="absolute -bottom-6 -left-[46%] z-[3] hidden w-[9.25rem] overflow-hidden rounded-xl border border-white/85 bg-white/95 p-2.5 shadow-[0_16px_32px_-18px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:block">
          <div className="mb-1.5 flex items-center justify-between gap-1">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Engagement
            </p>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-600">
              +18.2%
            </span>
          </div>
          <svg viewBox="0 0 200 78" className="h-auto w-full" role="presentation">
            <defs>
              <linearGradient id="ig-likes-bar-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
                <stop offset="100%" stopColor={brand} stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="ig-likes-line-fill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={brand} stopOpacity="0.35" />
                <stop offset="100%" stopColor={accent} stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {bars.map((bar, idx) => (
              <rect
                key={bar.x}
                className={cn(!reduceMotion && 'animate-iv-chart-rise')}
                style={{ animationDelay: bar.delay }}
                x={bar.x}
                y={72 - bar.h * 0.7}
                width="16"
                height={bar.h * 0.7}
                rx="4"
                fill="url(#ig-likes-bar-fill)"
                opacity={idx === bars.length - 1 ? 1 : 0.72}
              />
            ))}
            <path
              d="M26 54 C58 48 78 40 104 34 C130 28 150 24 182 16"
              fill="none"
              stroke="url(#ig-likes-line-fill)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Floating notifications — spaced away from phone and each other */}
      <div
        key={`notif-${notifIndex}`}
        className={cn(
          'pointer-events-none absolute top-[0%] -left-2 z-[4] max-w-[8rem] rounded-lg border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md sm:-left-4',
          !reduceMotion && 'animate-iv-notif-swap',
        )}
      >
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          {NOTIFS[notifIndex].label}
        </p>
        <p className="mt-0.5 text-xs font-bold tabular-nums text-stone-800">
          {NOTIFS[notifIndex].value}
        </p>
      </div>

      <div className="pointer-events-none absolute top-[2%] -right-2 z-[4] max-w-[8rem] rounded-lg border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:-right-4">
        <p className="text-[8px] font-semibold text-emerald-600 uppercase">Order confirmed</p>
        <p className="mt-0.5 text-[11px] font-bold text-stone-800">Likes package ready</p>
      </div>

      <div className="pointer-events-none absolute bottom-[4%] -right-2 z-[4] hidden max-w-[8rem] rounded-lg border border-white/90 bg-white/95 px-2 py-1.5 shadow-[0_12px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite] sm:-right-4 sm:block">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Growth chart
        </p>
        <p className="mt-0.5 text-[11px] font-bold text-stone-800">Engagement rising</p>
      </div>

      <div className="pointer-events-none absolute top-[40%] -right-3 z-[4] rounded-full border border-white/90 bg-white/95 px-2 py-1 text-[9px] font-bold text-stone-700 shadow-[0_8px_20px_-10px_rgba(28,25,23,0.42)] backdrop-blur-md sm:-right-5">
        Live tracking
      </div>

      {packagePreview ? (
        <div className="absolute -bottom-8 left-1/2 z-[5] hidden -translate-x-1/2 rounded-lg border border-[var(--border-subtle)] bg-white px-2.5 py-1.5 shadow-[0_12px_28px_-16px_rgba(28,25,23,0.38)] sm:block">
          <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">Selected</p>
          <p className="text-[11px] font-bold text-[var(--text-primary)]">{packagePreview.title}</p>
          <p className="text-xs font-bold text-[var(--brand-primary)]">{packagePreview.priceLabel}</p>
        </div>
      ) : null}
    </div>
  );
}
