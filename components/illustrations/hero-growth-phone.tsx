'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FOLLOWER_KEYS = [12430, 12560, 12890, 13250, 13800, 14120] as const;
const LOOP_MS = 7200;

const FLOAT_BADGES = [
  { id: 'b1', label: '+50 Followers', style: { top: '6%', left: '2%' }, delay: '0s' },
  { id: 'b2', label: '+120 Followers', style: { top: '18%', right: '0%' }, delay: '0.8s' },
  { id: 'b3', label: 'Order Confirmed', style: { top: '38%', left: '0%' }, delay: '1.4s' },
  { id: 'b4', label: 'Secure Checkout', style: { bottom: '28%', left: '1%' }, delay: '2s' },
  { id: 'b5', label: 'No Password Required', style: { top: '52%', right: '0%' }, delay: '2.6s' },
  { id: 'b6', label: 'Live Tracking', style: { bottom: '14%', right: '2%' }, delay: '3.2s' },
  { id: 'b7', label: 'Delivery Started', style: { bottom: '4%', left: '8%' }, delay: '3.8s' },
  { id: 'b8', label: 'Growth Active', style: { top: '8%', right: '8%' }, delay: '4.4s' },
] as const;

const NOTIFS = [
  '50 Followers Delivered',
  'Order Confirmed',
  'Growth Started',
  'New Followers Added',
] as const;

const HIGHLIGHTS = ['Launch', 'Reels', 'Brand', 'Tips'] as const;

const POST_TILES = [
  'from-[#FFE4CC] to-[#FFB574]',
  'from-[#FFF0E0] to-[#FFD0A8]',
  'from-[#FFD9B8] to-[#FF9A4D]',
  'from-[#FFF7F0] to-[#FFC997]',
  'from-[#FFEADB] to-[#FFB886]',
  'from-[#FFF3E8] to-[#FFA85C]',
] as const;

function formatFollowers(n: number) {
  return new Intl.NumberFormat('en').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type HeroGrowthPhoneProps = {
  className?: string;
};

/**
 * Premium SaaS hero illustration — floating phone + growth micro-interactions.
 * Pure CSS/JS animation (no GIF/Lottie dependency) for excellent Core Web Vitals.
 */
export function HeroGrowthPhone({ className }: HeroGrowthPhoneProps) {
  const [followers, setFollowers] = useState<number>(FOLLOWER_KEYS[0]);
  const [notifIndex, setNotifIndex] = useState(0);
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
      setFollowers(FOLLOWER_KEYS[FOLLOWER_KEYS.length - 1]);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) % LOOP_MS;
      const progress = elapsed / LOOP_MS;
      const segments = FOLLOWER_KEYS.length - 1;
      const raw = progress * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = FOLLOWER_KEYS[i];
      const to = FOLLOWER_KEYS[i + 1];
      setFollowers(from + (to - from) * local);

      const notifProgress = (elapsed / LOOP_MS) * NOTIFS.length;
      setNotifIndex(Math.min(Math.floor(notifProgress), NOTIFS.length - 1));

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#FFFbf7] shadow-[var(--shadow-lg)] sm:aspect-[4/3]',
        className,
      )}
      aria-hidden="true"
    >
      {/* Soft beige wash + orange glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 72% 42%, rgba(255,107,0,0.22), transparent 60%), radial-gradient(ellipse 40% 35% at 18% 78%, rgba(255,107,0,0.08), transparent 55%), linear-gradient(165deg, #ffffff 0%, #fff8f1 48%, #f7efe6 100%)',
        }}
      />
      <div
        className={cn(
          'pointer-events-none absolute top-[28%] right-[18%] size-44 rounded-full bg-[#FF6B00]/25 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />

      {/* Analytics graph behind phone */}
      <svg
        viewBox="0 0 420 180"
        className="pointer-events-none absolute inset-x-4 bottom-6 h-[42%] w-auto max-w-none opacity-70 sm:inset-x-8 sm:bottom-8"
        role="presentation"
      >
        <defs>
          <linearGradient id="iv-hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 150 C50 145 70 120 110 110 C155 98 170 72 215 68 C265 63 295 88 340 48 C370 28 395 34 420 20 L420 180 L0 180 Z"
          fill="url(#iv-hero-chart-fill)"
          className={cn(!reduceMotion && 'origin-bottom animate-iv-chart-rise')}
        />
        <path
          d="M0 150 C50 145 70 120 110 110 C155 98 170 72 215 68 C265 63 295 88 340 48 C370 28 395 34 420 20"
          fill="none"
          stroke="#FF6B00"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn(!reduceMotion && 'animate-iv-chart-draw')}
        />
      </svg>

      {/* Floating trust / growth chips */}
      {FLOAT_BADGES.map((badge) => (
        <div
          key={badge.id}
          className={cn(
            'absolute z-20 hidden max-w-[9.5rem] rounded-xl border border-white/80 bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-primary)] shadow-[0_8px_24px_-12px_rgba(28,25,23,0.35)] backdrop-blur-md sm:block',
            !reduceMotion && 'animate-iv-float-card',
          )}
          style={{ ...badge.style, animationDelay: badge.delay }}
        >
          <span className="mr-1 inline-block size-1.5 rounded-full bg-[#FF6B00]" />
          {badge.label}
        </div>
      ))}

      {/* Phone mockup */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 z-10 w-[58%] max-w-[240px] sm:w-[48%] sm:max-w-[260px]',
          reduceMotion ? '-translate-x-1/2 -translate-y-[52%]' : 'animate-iv-phone-float',
        )}
      >
        <div className="relative rounded-[2rem] border border-[#e8e0d8] bg-[#1c1917] p-[0.35rem] shadow-[0_28px_60px_-24px_rgba(28,25,23,0.55)]">
          {/* Dynamic island / notch */}
          <div className="absolute top-2 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
          <div className="overflow-hidden rounded-[1.7rem] bg-white">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[9px] font-semibold text-[#44403c]">
              <span>9:41</span>
              <div className="flex items-center gap-1 opacity-70">
                <span className="h-1.5 w-3 rounded-sm bg-[#44403c]" />
                <span className="h-2 w-4 rounded-sm border border-[#44403c]" />
              </div>
            </div>

            {/* Profile chrome */}
            <div className="px-3.5 pb-3">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B00] via-[#FF8A3D] to-[#FFD0A8] p-[2px] shadow-[0_0_0_3px_rgba(255,107,0,0.15)]">
                    <div className="flex size-full items-center justify-center rounded-full bg-[#fff7f0] text-sm font-bold text-[#FF6B00]">
                      IV
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-[#1c1917]">@creator.handle</p>
                  <p className="truncate text-[10px] text-[#78716c]">Creator Studio</p>
                </div>
                <span className="rounded-lg bg-[#FF6B00] px-2.5 py-1 text-[9px] font-bold text-white shadow-sm">
                  Follow
                </span>
              </div>

              <div className="mb-2.5 grid grid-cols-3 gap-1 text-center">
                <div>
                  <p className="text-[12px] font-bold tabular-nums text-[#1c1917]">248</p>
                  <p className="text-[8px] font-medium tracking-wide text-[#a8a29e] uppercase">Posts</p>
                </div>
                <div>
                  <p className="text-[12px] font-bold tabular-nums text-[#FF6B00]">
                    {formatFollowers(followers)}
                  </p>
                  <p className="text-[8px] font-medium tracking-wide text-[#a8a29e] uppercase">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-bold tabular-nums text-[#1c1917]">892</p>
                  <p className="text-[8px] font-medium tracking-wide text-[#a8a29e] uppercase">
                    Following
                  </p>
                </div>
              </div>

              <p className="mb-2.5 text-[9px] leading-relaxed text-[#57534e]">
                Building brands with clear growth systems. Secure orders · public profile only.
              </p>

              {/* Story highlights */}
              <div className="mb-3 flex gap-2 overflow-hidden">
                {HIGHLIGHTS.map((label) => (
                  <div key={label} className="flex w-10 shrink-0 flex-col items-center gap-1">
                    <div className="flex size-9 items-center justify-center rounded-full border border-[#ffd7b5] bg-[#fff4eb]">
                      <span className="size-2 rounded-full bg-[#FF6B00]/70" />
                    </div>
                    <span className="truncate text-[7px] font-medium text-[#78716c]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Posts grid */}
              <div className="grid grid-cols-3 gap-0.5 overflow-hidden rounded-lg">
                {POST_TILES.map((tile) => (
                  <div
                    key={tile}
                    className={cn('aspect-square bg-gradient-to-br', tile)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification stack */}
      <div className="absolute top-4 left-1/2 z-30 w-[min(86%,18rem)] -translate-x-1/2 sm:top-5 sm:left-auto sm:right-4 sm:w-52 sm:translate-x-0">
        <div
          className={cn(
            'flex items-start gap-2 rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_12px_32px_-16px_rgba(28,25,23,0.4)] backdrop-blur-md',
            !reduceMotion && 'animate-iv-notif-swap',
          )}
          key={notifIndex}
        >
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-[9px] font-bold text-white">
            ✓
          </span>
          <div>
            <p className="text-[10px] font-bold text-[#1c1917]">{NOTIFS[notifIndex]}</p>
            <p className="text-[9px] text-[#a8a29e]">NovaLikes · just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
