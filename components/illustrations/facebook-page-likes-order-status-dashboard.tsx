'use client';

import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { cn } from '@/lib/utils';

const STATUS_ROWS = [
  { id: 'page', label: 'Page URL Received', done: true },
  { id: 'package', label: 'Package Confirmed', done: true },
  { id: 'payment', label: 'Payment Approved', done: true },
  { id: 'delivery', label: 'Delivery Started', done: true, active: true },
  { id: 'tracking', label: 'Tracking Available', done: true },
  { id: 'completed', label: 'Order Completed', done: true },
] as const;

const LIKE_KEYS = [3280, 3640, 4120, 4680] as const;

/**
 * Facebook Page Likes Order Status dashboard for Order With Confidence.
 * Distinct from Followers (likes counter + thumbs-up page preview).
 */
export function FacebookPageLikesOrderStatusDashboard({
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
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const insightBars = [36, 42, 40, 54, 50, 62, 70, 82] as const;

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-30px_rgba(28,25,23,0.4)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 8% 0%, ${fbBlue}1a, transparent 55%), radial-gradient(ellipse 50% 40% at 92% 8%, rgba(249,115,22,0.1), transparent 50%), linear-gradient(180deg, #f8fbff 0%, #ffffff 45%, #f7fafc 100%)`,
        }}
      />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{ background: fbBlue }}
            >
              f
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {d('Page Likes Order Status')}
              </p>
              <p className="text-xs text-[var(--text-muted)]">Meta Business Suite</p>
            </div>
          </div>
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-700">
            {d('Live')}
          </span>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-stone-100 bg-[#f0f2f5]">
          <div
            className="relative flex h-14 items-end justify-end px-3 pb-2"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[9px] font-bold text-stone-800 shadow-sm">
              <ThumbsUp className="size-2.5" strokeWidth={2.5} style={{ color: fbBlue }} />
              Like Page
            </span>
          </div>
          <div className="relative px-3 pb-3">
            <div
              className="absolute -top-5 left-3 flex size-10 items-center justify-center rounded-xl border-[3px] border-white text-[10px] font-black text-white"
              style={{ background: fbBlue }}
            >
              IV
            </div>
            <div className="flex items-end justify-between gap-3 pt-6">
              <div>
                <p className="text-[11px] font-bold text-stone-900">Your Business Page</p>
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  {d('Page likes')}
                </p>
                <p className="text-lg font-black tabular-nums text-stone-900">
                  {(likes / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  Package selected
                </p>
                <p className="text-sm font-bold text-stone-800">{d('500 Page Likes')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white/90 px-3 py-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Community insights
            </p>
            <div className="mt-2 flex h-8 items-end gap-0.5">
              {insightBars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i > 5 ? fbBlue : '#bfdbfe',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white/90 px-3 py-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery status
            </p>
            <p className="mt-1 text-sm font-bold text-stone-800">In progress</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
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

        <ul className="space-y-2" role="list">
          {STATUS_ROWS.map((row) => (
            <li
              key={row.id}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
                'active' in row && row.active
                  ? 'border-sky-200 bg-sky-50/70'
                  : row.done
                    ? 'border-emerald-100 bg-emerald-50/40'
                    : 'border-stone-100 bg-white/80',
              )}
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full text-[11px] font-bold',
                  row.done || ('active' in row && row.active)
                    ? 'text-white'
                    : 'border border-stone-200 bg-stone-50 text-stone-400',
                )}
                style={
                  row.done || ('active' in row && row.active)
                    ? {
                        background:
                          'active' in row && row.active ? fbBlue : '#10b981',
                      }
                    : undefined
                }
              >
                ✓
              </span>
              <span
                className={cn(
                  'text-sm font-semibold',
                  row.done || ('active' in row && row.active)
                    ? 'text-stone-800'
                    : 'text-stone-400',
                )}
              >
                {d(row.label)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
