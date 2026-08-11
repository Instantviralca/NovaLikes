'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const BEFORE = 128;
const AFTER = 2628;
const LOOP_MS = 5200;

function formatLikes(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type TikTokLikesBeforeAfterPreviewProps = {
  className?: string;
};

/**
 * Decorative illustration only — mock like counts are not customer claims.
 */
export function TikTokLikesBeforeAfterPreview({ className }: TikTokLikesBeforeAfterPreviewProps) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const [likes, setLikes] = useState(BEFORE);
  const [phase, setPhase] = useState<'before' | 'after'>('before');
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
      setLikes(AFTER);
      setPhase('after');
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const t = (now % LOOP_MS) / LOOP_MS;
      if (t < 0.22) {
        setPhase('before');
        setLikes(BEFORE);
      } else if (t < 0.72) {
        setPhase('after');
        const local = easeOut((t - 0.22) / 0.5);
        setLikes(BEFORE + (AFTER - BEFORE) * local);
      } else {
        setPhase('after');
        setLikes(AFTER);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] overflow-visible sm:max-w-[24rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute top-[20%] left-1/2 size-56 -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/28 blur-[56px]" />

      <div className="relative mx-auto w-[58%] max-w-[13rem] sm:max-w-[14rem]">
        <div className="relative rounded-[2rem] border border-stone-900 bg-stone-950 p-1.5 shadow-[0_28px_56px_-24px_rgba(28,25,23,0.7)]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-stone-900">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(165deg, #1c1917 0%, #292524 30%, #431407 65%, #7c2d12 100%)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_28%,rgba(249,115,22,0.32),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_68%,rgba(254,44,85,0.24),transparent_50%)]" />

            <div className="relative z-[1] flex items-center justify-between px-3 pt-2.5">
              <span className="text-[9px] font-semibold text-white/90">9:41</span>
              <div className="mx-auto h-1 w-14 rounded-full bg-white/25" />
              <div className="flex gap-0.5">
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
              </div>
            </div>

            <div className="absolute top-[20%] left-1/2 z-[1] w-[56%] -translate-x-1/2">
              <div
                className="aspect-square rounded-2xl border border-white/20 shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${tiktokCyan}55, ${tiktokRed}66, ${brand}88)`,
                }}
              />
            </div>

            <div className="absolute top-[40%] right-2 z-[2] flex flex-col items-center gap-0.5">
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full bg-white/15 text-base text-white backdrop-blur-sm transition-transform duration-300',
                  phase === 'after' && !reduceMotion && 'scale-110',
                )}
                style={{ boxShadow: `0 0 0 2px ${tiktokRed}66` }}
              >
                ♥
              </span>
              <span className="text-[10px] font-bold tabular-nums text-white">
                {formatLikes(likes)}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-10 pb-3">
              <p className="truncate text-[11px] font-bold text-white">@creator</p>
              <p className="mt-1 text-[9px] text-white/85">Illustration · sample video frame</p>
            </div>
          </div>
        </div>
      </div>

      {/* Before / After callouts */}
      <div className="pointer-events-none absolute top-[8%] left-0 z-[5] rounded-xl border border-white/95 bg-white/95 px-3 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.45)] backdrop-blur-md">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">Before</p>
        <p className="text-sm font-bold tabular-nums text-stone-800">{formatLikes(BEFORE)}</p>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[18%] z-[5] rounded-xl border border-white/95 bg-white/95 px-3 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.45)] backdrop-blur-md">
        <p className="text-[8px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
          After
        </p>
        <p className="text-sm font-bold tabular-nums text-stone-800">{formatLikes(AFTER)}</p>
      </div>
    </div>
  );
}
