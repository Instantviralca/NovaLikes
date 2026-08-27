'use client';


import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const STATUS_ROWS: ReadonlyArray<{
  id: string;
  label: string;
  done: boolean;
  active?: boolean;
}> = [
  { id: 'page', label: 'Page URL Received', done: true },
  { id: 'package', label: 'Package Confirmed', done: true },
  { id: 'payment', label: 'Payment Approved', done: true },
  { id: 'delivery', label: 'Delivery Started', done: true, active: true },
  { id: 'tracking', label: 'Tracking Available', done: false },
  { id: 'completed', label: 'Order Completed', done: false },
];

const FOLLOWER_KEYS = [8200, 9100, 10400, 11800] as const;

/**
 * Facebook Followers Order Status dashboard for Order With Confidence.
 */
export function FacebookFollowersOrderStatusDashboard({
  className,
}: {
  className?: string;
}) {
  const d = useDecorativeLocalizer();
  const fbBlue = '#1877F2';
  const brand = '#F97316';
  const [followers, setFollowers] = useState<number>(FOLLOWER_KEYS[0]);
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
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % FOLLOWER_KEYS.length;
      setFollowers(FOLLOWER_KEYS[i]);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const insightBars = [32, 40, 48, 44, 58, 66, 72, 84] as const;

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
                Follower Order Status
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
            className="h-14"
            style={{
              background: `linear-gradient(135deg, #0c4a8a 0%, ${fbBlue} 55%, #60a5fa 100%)`,
            }}
          />
          <div className="relative px-3 pb-3">
            <div
              className="absolute -top-5 left-3 flex size-10 items-center justify-center rounded-full border-[3px] border-white text-[10px] font-black text-white"
              style={{ background: fbBlue }}
            >
              IV
            </div>
            <div className="flex items-end justify-between gap-3 pt-6">
              <div>
                <p className="text-[11px] font-bold text-stone-900">Your Business Page</p>
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  Followers
                </p>
                <p className="text-lg font-black tabular-nums text-stone-900">
                  {(followers / 1000).toFixed(1)}K
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                  Package selected
                </p>
                <p className="text-sm font-bold text-stone-800">1,000 Followers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white/90 px-3 py-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience insights
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
                  width: '58%',
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
              <span
                className={cn(
                  'text-sm font-semibold',
                  row.done || row.active ? 'text-stone-800' : 'text-stone-400',
                )}
              >
                {row.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
