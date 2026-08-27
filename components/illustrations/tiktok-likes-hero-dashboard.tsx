'use client';

import { useEffect, useState } from 'react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const LIKE_KEYS = [2180, 2260, 2380, 2510, 2640] as const;
const LOOP_MS = 7800;

const FLOAT_BADGES = [
  { id: 'likes', emoji: '❤️', label: '+2,500 Likes', position: 'top-[6%] -left-3 sm:-left-5' },
  {
    id: 'engagement',
    emoji: '📈',
    label: 'Engagement Increasing',
    position: 'top-[22%] -right-3 sm:-right-5',
  },
  {
    id: 'trending',
    emoji: '🔥',
    label: 'Trending Video',
    position: 'bottom-[14%] -left-2 sm:-left-4',
  },
] as const;

function formatLikes(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type TikTokLikesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * TikTok Likes hero — vertical video phone UI with rising likes, hearts, analytics.
 * Distinct from TikTok Followers (profile) and Instagram Likes artwork.
 */
export function TikTokLikesHeroDashboard({
  className,
  packagePreview,
}: TikTokLikesHeroDashboardProps) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const [likes, setLikes] = useState<number>(LIKE_KEYS[0]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0.36);

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
      setProgress(0.84);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = LIKE_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = LIKE_KEYS[i];
      const to = LIKE_KEYS[i + 1];
      setLikes(from + (to - from) * local);
      setProgress(0.32 + easeInOut(raw / segments) * 0.52);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[23.5rem] overflow-visible sm:max-w-[25.5rem] lg:max-w-[27rem]',
        className,
      )}
      aria-hidden="true"
    >
      {/* Soft gradient mesh */}
      <div className="pointer-events-none absolute inset-[-8%] -z-0 overflow-hidden rounded-[2.5rem]">
        <div className="absolute top-[-10%] left-[-5%] size-56 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.28)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute top-[35%] right-[-8%] size-48 rounded-full bg-[radial-gradient(circle,rgba(37,244,238,0.18)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-5%] left-[20%] size-52 rounded-full bg-[radial-gradient(circle,rgba(254,44,85,0.16)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Stronger orange glow behind phone */}
      <div
        className={cn(
          'pointer-events-none absolute top-[18%] left-1/2 size-64 -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/40 blur-[64px] sm:size-72 sm:blur-[72px]',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute bottom-[12%] left-[8%] size-36 rounded-full bg-[#FE2C55]/22 blur-3xl" />
      <div className="pointer-events-none absolute top-[42%] right-[4%] size-28 rounded-full bg-[#25F4EE]/20 blur-3xl" />

      {/* Outer floating badges — exactly 3 */}
      {FLOAT_BADGES.map((badge, index) => (
        <div
          key={badge.id}
          className={cn(
            'pointer-events-none absolute z-[5] flex max-w-[11.5rem] items-center gap-2 rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md',
            badge.position,
            !reduceMotion && 'motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite]',
          )}
          style={
            !reduceMotion
              ? { animationDelay: `${index * 0.85}s`, animationDuration: `${5.8 + index * 0.7}s` }
              : undefined
          }
        >
          <span className="text-sm leading-none" aria-hidden>
            {badge.emoji}
          </span>
          <span className="truncate text-[11px] font-bold text-stone-800">{d(badge.label)}</span>
        </div>
      ))}

      {/* Phone frame — TikTok video UI */}
      <div className="relative mx-auto w-[62%] max-w-[13.5rem] motion-safe:animate-iv-float-card sm:max-w-[14.5rem]">
        <div className="relative z-[2] rounded-[2rem] border border-stone-900 bg-stone-950 p-1.5 shadow-[0_28px_56px_-28px_rgba(28,25,23,0.72)]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-stone-900">
            {/* Video backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(165deg, #1c1917 0%, #292524 28%, #431407 62%, #7c2d12 100%)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(249,115,22,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(254,44,85,0.28),transparent_50%)]" />

            {/* Status bar */}
            <div className="relative z-[1] flex items-center justify-between px-3 pt-2.5">
              <span className="text-[9px] font-semibold text-white/90">9:41</span>
              <div className="mx-auto h-1 w-14 rounded-full bg-white/25" />
              <div className="flex gap-0.5">
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Fake video subject */}
            <div className="absolute top-[22%] left-1/2 z-[1] w-[58%] -translate-x-1/2">
              <div
                className="aspect-square rounded-2xl border border-white/20 shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${tiktokCyan}55, ${tiktokRed}66, ${brand}88)`,
                }}
              />
              <div className="absolute -bottom-2 -left-2 rounded-lg bg-white/95 px-2 py-1 shadow-md">
                <p className="text-[8px] font-bold text-stone-800">For You</p>
              </div>
            </div>

            {/* Right-side TikTok actions */}
            <div className="absolute top-[42%] right-2 z-[2] flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="flex size-8 items-center justify-center rounded-full bg-white/15 text-sm text-white backdrop-blur-sm"
                  style={{ boxShadow: `0 0 0 2px ${tiktokRed}55` }}
                >
                  ♥
                </span>
                <span className="text-[9px] font-bold text-white">{formatLikes(likes)}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-[11px] text-white backdrop-blur-sm">
                  💬
                </span>
                <span className="text-[8px] font-semibold text-white/80">184</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-[11px] text-white backdrop-blur-sm">
                  ↗
                </span>
                <span className="text-[8px] font-semibold text-white/80">96</span>
              </div>
            </div>

            {/* Caption + music */}
            <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-10 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex size-7 items-center justify-center rounded-full text-[9px] font-black text-white"
                  style={{
                    background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
                  }}
                >
                  IV
                </span>
                <p className="truncate text-[11px] font-bold text-white">@creator</p>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
                  style={{ background: brand }}
                >
                  Follow
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[9px] leading-snug text-white/90">
                New drop for creators · like growth live
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
                  <span
                    className="block h-full rounded-full bg-white/80"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </span>
                <span className="text-[8px] font-semibold text-white/70">♪ Original</span>
              </div>
              {packagePreview ? (
                <div className="mt-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-sm">
                  <p className="text-[8px] font-semibold tracking-wide text-white/70 uppercase">
                    {d('Package')}
                  </p>
                  <p className="truncate text-[10px] font-bold text-white">
                    {packagePreview.title} · {packagePreview.priceLabel}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
