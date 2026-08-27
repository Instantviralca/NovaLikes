'use client';


import { useDecorativeLocalizer } from '@/components/i18n/use-decorative-localizer';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const COMMENT_KEYS = [48, 52, 58, 64] as const;
const LOOP_MS = 9200;

const THREAD = [
  {
    name: 'alex',
    text: 'Does this work for local shops?',
    hearts: 12,
    reactions: ['👏', '🔥'],
  },
  {
    name: 'you',
    text: 'Yes — reply same day and pin FAQs.',
    hearts: 8,
    reactions: ['❤️'],
    isOwner: true,
    verified: true,
  },
  {
    name: 'sam',
    text: 'Booked after reading the thread.',
    hearts: 6,
    reactions: ['👏'],
  },
] as const;

const FLOAT_CHIPS = [
  { id: 'new', label: '💬 New Comment', top: '2%', left: '-12%', delay: '0s', duration: '6.4s' },
  { id: 'great', label: '❤️ Great post!', top: '18%', right: '-14%', delay: '0.7s', duration: '7.2s' },
  { id: 'amazing', label: '🔥 Amazing!', bottom: '30%', left: '-14%', delay: '1.2s', duration: '7.8s' },
  { id: 'nice', label: '👏 Nice content!', bottom: '10%', right: '-12%', delay: '1.9s', duration: '6.8s' },
] as const;

function formatCount(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type InstagramCommentsHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Instagram Comments hero — conversation dashboard with live thread, reactions, and floating chips.
 */
export function InstagramCommentsHeroDashboard({
  className,
  packagePreview,
}: InstagramCommentsHeroDashboardProps) {
  const d = useDecorativeLocalizer();
  const accent = '#E1306C';
  const brand = '#F97316';
  const [comments, setComments] = useState<number>(COMMENT_KEYS[0]);
  const [visibleBubbles, setVisibleBubbles] = useState<number>(THREAD.length);
  const [showTyping, setShowTyping] = useState(false);
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
      setComments(COMMENT_KEYS[COMMENT_KEYS.length - 1]);
      setVisibleBubbles(THREAD.length);
      setShowTyping(false);
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = COMMENT_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOutCubic(raw - i);
      const from = COMMENT_KEYS[i];
      const to = COMMENT_KEYS[i + 1];
      setComments(from + (to - from) * local);
      setVisibleBubbles(Math.min(THREAD.length, 1 + Math.floor(t * THREAD.length)));
      setShowTyping(t > 0.55 && t < 0.72);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22.5rem] overflow-visible sm:max-w-[24rem] lg:max-w-[25.25rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[16%] left-1/2 size-44 -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/26 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute top-[52%] right-[4%] size-28 rounded-full bg-[#E1306C]/14 blur-3xl sm:size-32" />

      {FLOAT_CHIPS.map((chip) => (
        <div
          key={chip.id}
          className="pointer-events-none absolute z-[5] hidden max-w-[9.75rem] rounded-full border border-white/95 bg-white/95 px-2.5 py-1.5 text-[11px] font-bold text-stone-800 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.55)] backdrop-blur-md sm:block"
          style={{
            top: 'top' in chip ? chip.top : undefined,
            bottom: 'bottom' in chip ? chip.bottom : undefined,
            left: 'left' in chip ? chip.left : undefined,
            right: 'right' in chip ? chip.right : undefined,
            animation: reduceMotion
              ? undefined
              : `iv-float-card ${chip.duration} ease-in-out ${chip.delay} infinite`,
          }}
        >
          {chip.label}
        </div>
      ))}

      <div className="pointer-events-none absolute top-[2%] left-0 z-[5] rounded-full border border-white/95 bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-800 shadow-[0_12px_24px_-12px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_6s_ease-in-out_infinite] sm:hidden">
        💬 New Comment
      </div>
      <div className="pointer-events-none absolute top-[16%] right-0 z-[5] rounded-full border border-white/95 bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-800 shadow-[0_12px_24px_-12px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite] sm:hidden">
        ❤️ Great post!
      </div>

      <div
        className={cn(
          'relative mx-auto w-full max-w-[20.5rem] overflow-hidden rounded-[1.35rem] border border-[var(--border-subtle)] bg-white',
          'shadow-[0_32px_64px_-28px_rgba(28,25,23,0.52),0_12px_28px_-18px_rgba(249,115,22,0.28)]',
          !reduceMotion && 'motion-safe:animate-iv-float-card',
        )}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 48% at 10% 0%, rgba(249,115,22,0.14), transparent 58%), linear-gradient(180deg, #fffdfb 0%, #ffffff 48%, #faf6f1 100%)',
          }}
        />

        <div className="relative p-3.5 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                Conversation
              </p>
              <p className="text-sm font-bold text-stone-900">Active discussion</p>
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700',
                !reduceMotion &&
                  'motion-safe:animate-[order-step-pulse_2.8s_ease-in-out_infinite]',
              )}
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {d('Live')}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#E1306C]/15 bg-[#E1306C]/[0.06] px-2.5 py-2 shadow-sm">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-sm">
              💬
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-stone-800">
                New comment on your post
              </p>
              <p className="text-[9px] font-medium text-stone-500">
                +{formatCount(comments - COMMENT_KEYS[0])} replies today
              </p>
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            {THREAD.slice(0, visibleBubbles).map((bubble, index) => (
              <div
                key={bubble.name + bubble.text}
                className={cn(
                  'rounded-2xl border border-white px-2.5 py-2 shadow-sm',
                  'isOwner' in bubble && bubble.isOwner
                    ? 'ml-3 bg-[var(--brand-accent-soft)]'
                    : 'mr-1 bg-white',
                  index === 0 && 'ring-1 ring-[var(--brand-primary)]/20',
                )}
              >
                {index === 0 ? (
                  <p className="mb-1 text-[8px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                    📌 Pinned
                  </p>
                ) : null}
                <div className="flex items-start gap-2">
                  <span
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{
                      background:
                        'isOwner' in bubble && bubble.isOwner
                          ? `linear-gradient(135deg, ${brand}, ${accent})`
                          : '#a8a29e',
                    }}
                  >
                    {bubble.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="inline-flex items-center gap-1 text-[9px] font-bold text-stone-500">
                      @{bubble.name}
                      {'verified' in bubble && bubble.verified ? (
                        <span className="inline-flex size-3 items-center justify-center rounded-full bg-sky-500 text-[7px] text-white">
                          ✓
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[12px] leading-snug text-stone-800">{bubble.text}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-stone-50 px-1.5 py-0.5 text-[9px] font-semibold text-stone-600">
                        ❤️ {bubble.hearts}
                      </span>
                      {bubble.reactions.map((emoji) => (
                        <span
                          key={emoji}
                          className="inline-flex size-5 items-center justify-center rounded-full bg-white text-[10px] shadow-sm"
                        >
                          {emoji}
                        </span>
                      ))}
                      <button
                        type="button"
                        tabIndex={-1}
                        className="ml-auto rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[9px] font-bold text-stone-600"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {showTyping || reduceMotion ? (
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-stone-200 bg-white/70 px-3 py-2">
                <span className="text-[9px] font-semibold text-stone-400">someone is typing</span>
                <span className="flex items-center gap-1" aria-hidden>
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className={cn(
                        'size-1.5 rounded-full bg-stone-400',
                        !reduceMotion &&
                          'motion-safe:animate-[order-step-pulse_1.2s_ease-in-out_infinite]',
                      )}
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-stone-100 bg-white/95 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span
                className="flex size-7 items-center justify-center rounded-full text-white"
                style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}
              >
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[9px] font-semibold text-stone-400 uppercase">Comments</p>
                <p className="text-xs font-bold tabular-nums text-stone-800">
                  {formatCount(comments)} active
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[var(--brand-primary)]">Tracked</span>
          </div>
        </div>
      </div>

      {packagePreview ? (
        <div className="absolute -bottom-2 left-1/2 z-[6] hidden w-[min(100%,11.5rem)] -translate-x-1/2 rounded-xl border border-[var(--border-subtle)] bg-white px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.42)] motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:block">
          <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">{d('Selected')}</p>
          <p className="truncate text-[11px] font-bold text-[var(--text-primary)]">
            {packagePreview.title}
          </p>
          <p className="text-xs font-bold text-[var(--brand-primary)]">{packagePreview.priceLabel}</p>
        </div>
      ) : null}
    </div>
  );
}
