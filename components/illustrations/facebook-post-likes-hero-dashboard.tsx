'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const LIKE_KEYS = [1840, 2260, 2780, 3420, 4180] as const;
const LOOP_MS = 7600;

const REACTIONS = [
  { id: 'r1', label: '👍 Sam liked your post', style: { top: '4%', left: '-4%' }, delay: '0s' },
  { id: 'r2', label: '👍 +48 likes', style: { top: '18%', right: '-6%' }, delay: '0.9s' },
  { id: 'r3', label: '👍 Alex reacted', style: { top: '46%', left: '-8%' }, delay: '1.7s' },
  { id: 'r4', label: 'Engagement ↑ 12%', style: { bottom: '22%', right: '-4%' }, delay: '2.4s' },
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

type FacebookPostLikesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Facebook Post Likes hero — post preview + engagement analytics (not page likes / followers).
 */
export function FacebookPostLikesHeroDashboard({
  className,
  packagePreview,
}: FacebookPostLikesHeroDashboardProps) {
  const fbBlue = '#1877F2';
  const brand = '#F97316';
  const [likes, setLikes] = useState<number>(LIKE_KEYS[0]);
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
    const start = performance.now();
    const tick = (now: number) => {
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

  const reachBars = [22, 34, 40, 48, 56, 62, 74, 88];
  const timeline = [
    { label: 'Posted', done: true },
    { label: 'Likes', done: true, active: true },
    { label: 'Reach', done: false },
    { label: 'Boost', done: false },
  ];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[26rem] overflow-visible sm:max-w-[28rem]',
        className,
      )}
      aria-hidden
    >
      {!reduceMotion
        ? REACTIONS.map((item) => (
            <div
              key={item.id}
              className="pointer-events-none absolute z-20 hidden rounded-full border border-white/70 bg-white/85 px-2.5 py-1 text-[9px] font-semibold text-stone-700 shadow-[0_10px_28px_-16px_rgba(24,119,242,0.55)] backdrop-blur-md motion-safe:animate-iv-float-badge sm:block"
              style={{ ...item.style, animationDelay: item.delay }}
            >
              {item.label}
            </div>
          ))
        : null}

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
                <p className="text-sm font-bold text-stone-900">Post Insights</p>
                <p className="text-[10px] text-stone-500">Facebook · Engagement</p>
              </div>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
              style={{ background: brand }}
            >
              Live
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-100/90 bg-white/90 shadow-[0_12px_28px_-20px_rgba(24,119,242,0.35)]">
            <div className="flex items-center gap-2.5 border-b border-stone-100 px-3 py-2.5">
              <span
                className="flex size-8 items-center justify-center rounded-full text-[10px] font-black text-white"
                style={{ background: fbBlue }}
              >
                IV
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-stone-900">Your Brand Post</p>
                <p className="text-[9px] text-stone-500">Public post · 2h ago</p>
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
                👍 {formatLikes(likes)} likes
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex items-center gap-3 text-[10px] font-semibold text-stone-600">
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="size-3" style={{ color: fbBlue }} />
                  Like
                </span>
                <span>Comment</span>
                <span>Share</span>
              </div>
              <p className="text-sm font-black tabular-nums text-stone-900">
                {formatLikes(likes)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-white/60 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Engagement
              </p>
              <p className="mt-0.5 text-base font-black text-stone-900">8.4%</p>
            </div>
            <div className="rounded-xl border border-white/60 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Score
              </p>
              <p className="mt-0.5 text-base font-black" style={{ color: fbBlue }}>
                92
              </p>
            </div>
            <div className="rounded-xl border border-white/60 bg-white/70 p-2.5 shadow-sm backdrop-blur-md">
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                Activity
              </p>
              <p className="mt-0.5 text-base font-black text-emerald-600">High</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/60 bg-white/75 p-3 shadow-sm backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Reach graph
              </p>
              <p className="text-[9px] font-bold" style={{ color: brand }}>
                +18% week
              </p>
            </div>
            <div className="flex h-12 items-end gap-1.5">
              {reachBars.map((h, i) => (
                <span
                  key={`reach-${i}`}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${h}%`,
                    background:
                      i === reachBars.length - 1
                        ? `linear-gradient(180deg, ${brand}, ${fbBlue})`
                        : `${fbBlue}${i > 4 ? 'cc' : '66'}`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/60 bg-white/75 p-3 shadow-sm backdrop-blur-md">
            <p className="mb-2 text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
              Interaction timeline
            </p>
            <div className="flex items-center justify-between gap-1">
              {timeline.map((step) => (
                <div key={step.label} className="flex flex-1 flex-col items-center gap-1">
                  <span
                    className={cn(
                      'flex size-6 items-center justify-center rounded-full text-[9px] font-bold',
                      step.active
                        ? 'text-white'
                        : step.done
                          ? 'bg-emerald-500 text-white'
                          : 'border border-stone-200 bg-stone-50 text-stone-400',
                    )}
                    style={step.active ? { background: fbBlue } : undefined}
                  >
                    {step.done || step.active ? '✓' : ''}
                  </span>
                  <span className="text-[8px] font-semibold text-stone-500">{step.label}</span>
                </div>
              ))}
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
                Selected package
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
