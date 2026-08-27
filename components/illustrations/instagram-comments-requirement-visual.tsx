'use client';


import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * Compact requirement visual — conversation thread (no analytics charts).
 * Lazy-safe client illustration for ImageTextSplit.
 */
export function InstagramCommentsRequirementVisual({ className }: { className?: string }) {
  const d = useDecorativeLocalizer();
  const brand = '#F97316';
  const accent = '#E1306C';
  const [comments, setComments] = useState(12);
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
      setComments(24);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const t = (now % 7200) / 7200;
      setComments(12 + t * 12);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,0.12),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-2.5 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
              Post thread
            </p>
            <p className="text-sm font-bold text-stone-900">Public comments ready</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            {d('Live')}
          </span>
        </div>

        <div className="mb-2 flex items-center gap-2 rounded-xl border border-[#E1306C]/12 bg-[#E1306C]/[0.05] px-2.5 py-2">
          <span className="text-sm">💬</span>
          <p className="text-[11px] font-bold text-stone-800">New Comment notification</p>
        </div>

        <div className="flex-1 space-y-2 overflow-hidden rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          {[
            {
              name: 'mia',
              text: 'Love this tip — trying it today.',
              emoji: '❤️',
              pinned: true,
            },
            {
              name: 'you',
              text: 'Start with one public post URL.',
              emoji: '👏',
              owner: true,
              verified: true,
            },
            { name: 'jay', text: 'Thread answered my question.', emoji: '🔥' },
          ].map((row) => (
            <div
              key={row.name}
              className={cn(
                'rounded-xl border border-white px-2.5 py-2 shadow-sm',
                row.owner ? 'ml-4 bg-[var(--brand-accent-soft)]' : 'bg-white',
                row.pinned && 'ring-1 ring-[var(--brand-primary)]/20',
              )}
            >
              {row.pinned ? (
                <p className="mb-0.5 text-[8px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                  📌 Pinned
                </p>
              ) : null}
              <p className="inline-flex items-center gap-1 text-[9px] font-bold text-stone-500">
                @{row.name}
                {row.verified ? (
                  <span className="inline-flex size-3 items-center justify-center rounded-full bg-sky-500 text-[7px] text-white">
                    ✓
                  </span>
                ) : null}
              </p>
              <p className="text-[11px] leading-snug text-stone-800">{row.text}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px]">{row.emoji}</span>
                <span className="rounded-full border border-stone-200 bg-white px-1.5 py-0.5 text-[8px] font-bold text-stone-600">
                  Reply
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1.5 px-1">
            <span className="size-1.5 rounded-full bg-stone-400 motion-safe:animate-[order-step-pulse_1.2s_ease-in-out_infinite]" />
            <span
              className="size-1.5 rounded-full bg-stone-400 motion-safe:animate-[order-step-pulse_1.2s_ease-in-out_infinite]"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className="size-1.5 rounded-full bg-stone-400 motion-safe:animate-[order-step-pulse_1.2s_ease-in-out_infinite]"
              style={{ animationDelay: '0.3s' }}
            />
            <span className="text-[9px] font-medium text-stone-400">Typing…</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div>
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Comments</p>
            <p className="text-sm font-bold tabular-nums text-stone-900">
              {new Intl.NumberFormat('en-US').format(Math.round(comments))}
            </p>
          </div>
          <span
            className="rounded-full px-2 py-1 text-[9px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}
          >
            No password
          </span>
        </div>
      </div>
    </div>
  );
}
