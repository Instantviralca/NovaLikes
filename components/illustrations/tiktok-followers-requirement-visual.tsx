'use client';

import { AtSign, CheckCircle2, Mail, Package, Shield } from 'lucide-react';

import { cn } from '@/lib/utils';

const CARDS = [
  {
    id: 'username',
    label: 'TikTok Username',
    value: '@creator',
    icon: AtSign,
    accent: 'from-[#25F4EE] to-[#FE2C55]',
  },
  {
    id: 'package',
    label: 'Selected Package',
    value: '1,000 Followers',
    icon: Package,
    accent: 'from-[#F97316] to-[#ea580c]',
  },
  {
    id: 'public',
    label: 'Public Profile',
    value: 'Profile is public',
    icon: Shield,
    accent: 'from-sky-400 to-sky-600',
  },
  {
    id: 'confirm',
    label: 'Order Confirmation',
    value: 'Ready to place',
    icon: CheckCircle2,
    accent: 'from-emerald-400 to-emerald-600',
  },
  {
    id: 'email',
    label: 'Email Address',
    value: 'you@email.com',
    icon: Mail,
    accent: 'from-[#fdba74] to-[#F97316]',
  },
] as const;

/**
 * 16:9 floating-cards dashboard — What We Need From You.
 */
export function TikTokFollowersRequirementVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/9] w-full max-w-[36rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -top-8 right-4 size-28 rounded-full bg-[var(--brand-primary)]/16 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-6 size-24 rounded-full bg-[#25F4EE]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(249,115,22,0.12),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
              Order requirements
            </p>
            <p className="text-sm font-bold text-stone-900">What we need from you</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700">
            No password
          </span>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={cn(
                  'flex flex-col rounded-xl border border-stone-100 bg-white p-2.5 shadow-[0_10px_24px_-18px_rgba(28,25,23,0.35)] sm:p-3',
                  index === 4 && 'col-span-2 sm:col-span-1',
                )}
              >
                <span
                  className={cn(
                    'mb-2 flex size-8 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                    card.accent,
                  )}
                >
                  <Icon className="size-4" strokeWidth={2.25} />
                </span>
                <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                  {card.label}
                </p>
                <p className="mt-0.5 text-[11px] font-bold text-stone-800 sm:text-xs">
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
