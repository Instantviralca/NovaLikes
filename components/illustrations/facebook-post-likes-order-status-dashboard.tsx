'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const LIKE_KEYS = [1240, 1680, 2140, 2680, 3120] as const;

const STATUS_ROWS: ReadonlyArray<{
  id: string;
  label: string;
  done: boolean;
  active?: boolean;
}> = [
  { id: 'post', label: 'Post URL Received', done: true },
  { id: 'package', label: 'Package Confirmed', done: true },
  { id: 'payment', label: 'Payment Approved', done: true },
  { id: 'delivery', label: 'Likes Delivering', done: true, active: true },
  { id: 'tracking', label: 'Tracking Available', done: false },
  { id: 'completed', label: 'Order Completed', done: false },
];

/**
 * Premium Facebook Post Likes order progress dashboard (Order With Confidence).
 */
export function FacebookPostLikesOrderStatusDashboard({
  className,
}: {
  className?: string;
}) {
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
    }, 1400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const engagement = [28, 36, 42, 50, 58, 70, 82];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-30px_rgba(12,74,138,0.42)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 8% 0%, ${fbBlue}1a, transparent 55%), linear-gradient(180deg, #f5f9ff 0%, #ffffff 45%, #faf6f1 100%)`,
        }}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-xl text-sm font-black text-white"
              style={{ background: `linear-gradient(135deg, ${fbBlue}, #0c4a8a)` }}
            >
              f
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Business Suite</p>
              <p className="text-xs text-stone-500">Post order · {d('Live')} status</p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
            style={{ background: brand }}
          >
            <ThumbsUp className="size-2.5" />
            {d('Delivering')}
          </span>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div className="flex items-center gap-2 border-b border-stone-100/80 bg-white px-3 py-2">
            <span
              className="flex size-7 items-center justify-center rounded-full text-[9px] font-black text-white"
              style={{ background: fbBlue }}
            >
              IV
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-stone-900">Campaign post preview</p>
              <p className="text-[9px] text-stone-500">Public Facebook post</p>
            </div>
          </div>
          <div
            className="relative flex h-16 items-end justify-between px-3 pb-2"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          >
            <span className="rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-bold text-stone-800">
              👍 {d(`${(likes / 1000).toFixed(1)}K Likes`)}
            </span>
            <span className="rounded-full bg-black/25 px-2 py-0.5 text-[8px] font-bold text-white backdrop-blur">
              Engagement ↑
            </span>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white/90 px-3 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Order progress
            </p>
            <p className="mt-0.5 text-sm font-black text-stone-900">68%</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full"
                style={{
                  width: '68%',
                  background: `linear-gradient(90deg, ${fbBlue}, ${brand})`,
                }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white/90 px-3 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              {d('Analytics')}
            </p>
            <div className="mt-2 flex h-8 items-end gap-1">
              {engagement.map((h, i) => (
                <span
                  key={`eng-${i}`}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: i === engagement.length - 1 ? brand : `${fbBlue}99`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="space-y-2" role="list">
          {STATUS_ROWS.map((row) => (
            <li
              key={row.id}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
                row.active
                  ? 'border-sky-200 bg-sky-50/70'
                  : row.done
                    ? 'border-emerald-100 bg-emerald-50/40'
                    : 'border-stone-100 bg-white/80',
              )}
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-[11px] font-bold',
                  row.done || row.active
                    ? 'text-white'
                    : 'border border-stone-200 bg-stone-50 text-stone-400',
                )}
                style={
                  row.done || row.active
                    ? { background: row.active ? fbBlue : '#10b981' }
                    : undefined
                }
              >
                ✓
              </span>
              <p className="text-sm font-semibold text-stone-800">{d(row.label)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
