'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const LIKE_KEYS = [2160, 2680, 3120, 3640] as const;

/**
 * Compact Facebook Post Likes final CTA dashboard.
 */
export function FacebookPostLikesFinalCtaDashboard({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
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
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % LIKE_KEYS.length;
      setLikes(LIKE_KEYS[i]);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const reach = [30, 42, 48, 58, 66, 78];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[17rem] overflow-visible sm:max-w-[18.5rem]',
        className,
      )}
      aria-hidden
    >
      {!reduceMotion ? (
        <>
          <div className="pointer-events-none absolute -left-2 top-3 z-10 rounded-full border border-white/70 bg-white/90 px-2 py-0.5 text-[8px] font-semibold text-stone-700 shadow-sm backdrop-blur motion-safe:animate-iv-float-badge">
            👍 New reaction
          </div>
          <div
            className="pointer-events-none absolute -right-1 top-16 z-10 rounded-full border border-white/70 bg-white/90 px-2 py-0.5 text-[8px] font-semibold text-stone-700 shadow-sm backdrop-blur motion-safe:animate-iv-float-badge"
            style={{ animationDelay: '1s' }}
          >
            Reach +9%
          </div>
        </>
      ) : null}

      <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white p-3.5 shadow-[0_22px_48px_-24px_rgba(12,74,138,0.55)]">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-xl text-[11px] font-black text-white"
            style={{ background: fbBlue }}
          >
            f
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">Post dashboard</p>
            <p className="text-[10px] text-stone-500">{d('Track Order')} · {d('Live')}</p>
          </div>
        </div>

        <div className="mb-2.5 overflow-hidden rounded-xl border border-stone-100">
          <div
            className="relative flex h-14 items-end px-2.5 pb-1.5"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              <ThumbsUp className="size-2.5" style={{ color: fbBlue }} />
              {(likes / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="bg-[#f0f2f5] px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Public post likes
            </p>
            <p className="text-xl font-black tabular-nums text-stone-900">
              {(likes / 1000).toFixed(1)}K
            </p>
          </div>
        </div>

        <div className="mb-2 rounded-lg border border-stone-100 bg-[var(--surface-muted)]/70 px-2 py-1.5">
          <p className="text-[8px] text-stone-400 uppercase">{d('Selected package')}</p>
          <p className="text-xs font-bold text-stone-900">{d('1,000 Post Likes')}</p>
        </div>

        <div className="mb-2 rounded-lg border border-stone-100 bg-[var(--surface-muted)]/70 px-2 py-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[8px] text-stone-400 uppercase">Delivery progress</p>
            <p className="text-[9px] font-bold" style={{ color: brand }}>
              72%
            </p>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{
                width: '72%',
                background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
              }}
            />
          </div>
        </div>

        <div className="flex h-9 items-end gap-1">
          {reach.map((h, i) => (
            <span
              key={`cta-reach-${i}`}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: i === reach.length - 1 ? brand : `${fbBlue}99`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
