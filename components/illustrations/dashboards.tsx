'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

const InstagramPackagesHeroDashboard = dynamic(() =>
  import('@/components/illustrations/instagram-packages-hero-dashboard').then((m) => ({
    default: m.InstagramPackagesHeroDashboard,
  })),
);
const InstagramLikesPackagesHeroDashboard = dynamic(() =>
  import('@/components/illustrations/instagram-likes-packages-hero-dashboard').then((m) => ({
    default: m.InstagramLikesPackagesHeroDashboard,
  })),
);
const InstagramViewsHeroDashboard = dynamic(() =>
  import('@/components/illustrations/instagram-views-hero-dashboard').then((m) => ({
    default: m.InstagramViewsHeroDashboard,
  })),
);
const InstagramCommentsHeroDashboard = dynamic(() =>
  import('@/components/illustrations/instagram-comments-hero-dashboard').then((m) => ({
    default: m.InstagramCommentsHeroDashboard,
  })),
);
const TikTokFollowersHeroDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-followers-hero-dashboard').then((m) => ({
    default: m.TikTokFollowersHeroDashboard,
  })),
);
const TikTokLikesHeroDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-likes-hero-dashboard').then((m) => ({
    default: m.TikTokLikesHeroDashboard,
  })),
);
const TikTokViewsHeroDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-views-hero-dashboard').then((m) => ({
    default: m.TikTokViewsHeroDashboard,
  })),
);
const FacebookFollowersHeroDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-followers-hero-dashboard').then((m) => ({
    default: m.FacebookFollowersHeroDashboard,
  })),
);
const FacebookPageLikesHeroDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-page-likes-hero-dashboard').then((m) => ({
    default: m.FacebookPageLikesHeroDashboard,
  })),
);
const FacebookPostLikesHeroDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-post-likes-hero-dashboard').then((m) => ({
    default: m.FacebookPostLikesHeroDashboard,
  })),
);

type HomepageDashboardProps = {
  className?: string;
};

/** Branded SaaS dashboard illustration for homepage hero — not a stock photo. */
export function HomepageDashboard({ className }: HomepageDashboardProps) {
  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-lg)]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 85% 10%, rgb(232 93 4 / 0.18), transparent), linear-gradient(160deg, #fffbf8 0%, #fff4ed 45%, #f7f0ea 100%)',
        }}
      />
      {/* Main dashboard panel */}
      <div className="absolute inset-4 rounded-xl border border-[var(--border-subtle)] bg-white/95 p-3 shadow-[var(--shadow-md)] sm:inset-5 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[var(--brand-primary)]" />
            <span className="text-[10px] font-semibold tracking-wide text-[var(--text-secondary)] uppercase sm:text-xs">
              Growth overview
            </span>
          </div>
          <span className="rounded-full bg-[var(--brand-accent-soft)] px-2 py-0.5 text-[9px] font-bold text-[var(--brand-primary)] sm:text-[10px]">
            Live
          </span>
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { label: 'Reach', value: '+24%' },
            { label: 'Engagement', value: '+18%' },
            { label: 'Orders', value: 'Tracked' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-2 py-2"
            >
              <p className="text-[9px] text-[var(--text-muted)] sm:text-[10px]">{stat.label}</p>
              <p className="text-xs font-bold text-[var(--text-primary)] sm:text-sm">{stat.value}</p>
            </div>
          ))}
        </div>
        {/* Chart */}
        <svg viewBox="0 0 320 120" className="h-auto w-full" role="presentation">
          <defs>
            <linearGradient id="iv-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E85D04" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E85D04" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 95 C40 90 55 70 90 65 C130 58 150 40 180 38 C220 35 250 55 280 30 C300 18 310 22 320 16 L320 120 L0 120 Z"
            fill="url(#iv-chart-fill)"
          />
          <path
            d="M0 95 C40 90 55 70 90 65 C130 58 150 40 180 38 C220 35 250 55 280 30 C300 18 310 22 320 16"
            fill="none"
            stroke="#E85D04"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="180" cy="38" r="4" fill="#E85D04" />
          <circle cx="280" cy="30" r="4" fill="#C2410C" />
        </svg>
        <div className="mt-2 flex gap-1.5">
          {['IG', 'TT', 'YT', 'FB'].map((p) => (
            <span
              key={p}
              className="rounded-md bg-[var(--surface-muted)] px-2 py-1 text-[9px] font-semibold text-[var(--text-secondary)]"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute top-3 right-3 hidden max-w-[9.5rem] rounded-xl border border-[var(--border-subtle)] bg-white/95 p-2.5 shadow-[var(--shadow-md)] backdrop-blur-sm sm:block">
        <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">Secure checkout</p>
        <p className="mt-0.5 text-xs font-bold text-[var(--text-primary)]">Public profile only</p>
      </div>
      <div className="absolute top-3 left-3 hidden max-w-[9.5rem] rounded-xl border border-[var(--border-subtle)] bg-white/95 p-2.5 shadow-[var(--shadow-md)] backdrop-blur-sm sm:block">
        <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">Account safety</p>
        <p className="mt-0.5 text-xs font-bold text-[var(--text-primary)]">No Password Required</p>
      </div>
      <div className="absolute bottom-4 left-3 hidden max-w-[10rem] rounded-xl border border-[var(--border-subtle)] bg-white/95 p-2.5 shadow-[var(--shadow-md)] backdrop-blur-sm md:block">
        <p className="text-[9px] font-semibold text-[var(--text-muted)] uppercase">Order tracking</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div className="h-full w-2/3 rounded-full bg-[var(--brand-primary)]" />
        </div>
        <p className="mt-1 text-[10px] font-medium text-[var(--text-secondary)]">In progress</p>
      </div>
      <div className="absolute top-1/2 -right-1 hidden -translate-y-1/2 rounded-full border border-[var(--border-subtle)] bg-white px-2.5 py-1 text-[10px] font-semibold text-[var(--text-primary)] shadow-[var(--shadow-sm)] lg:block">
        + Delivery update
      </div>
    </div>
  );
}

const ORDER_STEPS = [
  { id: 'received', label: 'Order Received', status: 'done' as const },
  { id: 'payment', label: 'Payment Confirmed', status: 'done' as const },
  { id: 'processing', label: 'Processing', status: 'done' as const },
  { id: 'delivering', label: 'Delivering', status: 'active' as const },
  { id: 'completed', label: 'Completed', status: 'upcoming' as const },
];

type OrderTrackingDashboardProps = {
  className?: string;
};

/**
 * Premium 16:9 order-tracking SaaS illustration for homepage split section.
 * Soft beige/white UI with orange (#F97316) accents — no charts or analytics.
 */
export function OrderTrackingDashboard({ className }: OrderTrackingDashboardProps) {
  const accent = '#F97316';
  const activeIndex = ORDER_STEPS.findIndex((step) => step.status === 'active');

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[0_24px_60px_-32px_rgba(28,25,23,0.45)]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 12% 18%, rgba(249,115,22,0.14), transparent 55%), radial-gradient(ellipse 55% 45% at 92% 88%, rgba(245,230,211,0.95), transparent 50%), linear-gradient(165deg, #fffdfb 0%, #faf6f1 48%, #f5efe8 100%)',
        }}
      />

      <div className="absolute inset-3 flex flex-col rounded-xl border border-white/90 bg-white/85 p-3.5 shadow-[0_12px_36px_-20px_rgba(28,25,23,0.32)] backdrop-blur-md sm:inset-4 sm:p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg text-white shadow-sm sm:size-8"
              style={{ background: accent }}
            >
              <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase sm:text-[11px]">
                Live status
              </p>
              <p className="text-xs font-bold text-stone-800 sm:text-sm">Order Tracking</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-stone-200/80 bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-stone-600 sm:text-[10px]">
              Order Status Available
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white sm:text-[10px]"
              style={{ background: accent }}
            >
              Estimated Delivery • Today
            </span>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-4 sm:gap-3">
          <div className="rounded-xl border border-stone-200/70 bg-white/90 px-2.5 py-2 shadow-[0_1px_0_rgba(255,255,255,0.8)] sm:px-3 sm:py-2.5">
            <p className="text-[9px] font-medium tracking-wide text-stone-400 uppercase sm:text-[10px]">
              Public Username
            </p>
            <p className="mt-0.5 truncate text-[11px] font-semibold text-stone-800 sm:text-xs">@creator.handle</p>
          </div>
          <div className="rounded-xl border border-stone-200/70 bg-white/90 px-2.5 py-2 shadow-[0_1px_0_rgba(255,255,255,0.8)] sm:px-3 sm:py-2.5">
            <p className="text-[9px] font-medium tracking-wide text-stone-400 uppercase sm:text-[10px]">
              Order ID
            </p>
            <p className="mt-0.5 truncate text-[11px] font-semibold text-stone-800 sm:text-xs">IV-94821</p>
          </div>
        </div>

        <div className="relative mb-3 flex-1 rounded-xl border border-stone-200/60 bg-gradient-to-b from-white to-[#faf6f1] px-2 py-3 sm:mb-4 sm:px-3 sm:py-4">
          <div className="relative mx-auto max-w-full px-1 pt-1">
            <div className="absolute top-[15px] right-6 left-6 h-[3px] rounded-full bg-stone-200/90 sm:top-[17px]" />
            <div
              className="absolute top-[15px] left-6 h-[3px] rounded-full sm:top-[17px]"
              style={{
                width: `calc(${(activeIndex / (ORDER_STEPS.length - 1)) * 100}% )`,
                maxWidth: 'calc(100% - 3rem)',
                background: `linear-gradient(90deg, ${accent}, #fb923c)`,
              }}
            />

            <ol className="relative grid grid-cols-5 gap-1">
              {ORDER_STEPS.map((step) => {
                const done = step.status === 'done';
                const active = step.status === 'active';
                return (
                  <li key={step.id} className="flex flex-col items-center text-center">
                    <span
                      className={cn(
                        'relative z-[1] flex size-7 items-center justify-center rounded-full border-2 text-[10px] font-bold sm:size-8 sm:text-[11px]',
                        done || active
                          ? 'border-transparent text-white shadow-[0_6px_16px_-8px_rgba(249,115,22,0.9)]'
                          : 'border-stone-200 bg-white text-stone-300',
                        active && 'ring-4 ring-orange-100 motion-safe:animate-[order-step-pulse_2.4s_ease-in-out_infinite]',
                      )}
                      style={done || active ? { background: accent } : undefined}
                    >
                      {done ? (
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : active ? (
                        <span className="size-2 rounded-full bg-white" />
                      ) : (
                        <span className="size-1.5 rounded-full bg-stone-300" />
                      )}
                    </span>
                    <p
                      className={cn(
                        'mt-2 text-[8px] leading-tight font-semibold sm:text-[10px]',
                        active ? 'text-stone-900' : done ? 'text-stone-600' : 'text-stone-400',
                      )}
                    >
                      {step.label}
                    </p>
                    <span
                      className={cn(
                        'mt-1 rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-wide uppercase sm:text-[8px]',
                        active && 'bg-orange-50 text-orange-600',
                        done && 'bg-stone-100 text-stone-500',
                        step.status === 'upcoming' && 'bg-transparent text-stone-300',
                      )}
                    >
                      {active ? 'Current' : done ? 'Done' : 'Next'}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-3 hidden gap-2 border-t border-stone-100 pt-3 sm:grid sm:grid-cols-3">
            {[
              { label: 'Confirmed', time: 'Just now' },
              { label: 'Processing', time: '2 min ago' },
              { label: 'Delivering', time: 'Live' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-2 ring-1 ring-stone-100"
              >
                <span className="size-1.5 rounded-full" style={{ background: accent }} />
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-stone-700">{item.label}</p>
                  <p className="text-[9px] text-stone-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <p className="text-[10px] font-medium text-stone-500 sm:text-[11px]">Status · On track</p>
          </div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(249,115,22,0.95)] sm:px-4 sm:text-[11px]"
            style={{ background: accent }}
          >
            Track Order
          </span>
        </div>
      </div>
    </div>
  );
}

const PLATFORM_COPY: Record<
  PlatformId,
  { title: string; metric: string; chart: string }
> = {
  instagram: {
    title: 'Instagram growth',
    metric: 'Followers',
    chart: 'M0 80 C50 75 70 50 110 45 C150 40 170 25 210 28 C250 32 280 18 320 12',
  },
  tiktok: {
    title: 'TikTok engagement',
    metric: 'Views',
    chart: 'M0 70 C40 65 80 85 120 40 C160 10 190 55 230 30 C270 12 300 22 320 8',
  },
  youtube: {
    title: 'YouTube analytics',
    metric: 'Subscribers',
    chart: 'M0 90 C45 85 75 60 120 55 C165 50 190 35 230 32 C270 28 300 20 320 15',
  },
  facebook: {
    title: 'Page insights',
    metric: 'Page likes',
    chart: 'M0 75 C55 70 90 55 130 50 C175 44 200 35 240 38 C275 40 300 25 320 18',
  },
};

export type InstagramDashboardVariant = 'followers' | 'likes' | 'views' | 'comments';
export type TikTokDashboardVariant = 'followers' | 'likes' | 'views';
export type FacebookDashboardVariant = 'followers' | 'page-likes' | 'post-likes';

type PlatformDashboardProps = {
  platform: PlatformId;
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
  /** Instagram packages/service hero visual variant. */
  instagramVariant?: InstagramDashboardVariant;
  /** TikTok service hero visual variant. */
  tiktokVariant?: TikTokDashboardVariant;
  /** Facebook service hero visual variant. */
  facebookVariant?: FacebookDashboardVariant;
};

/** Platform-specific SaaS dashboard illustration for service heroes. */
export function PlatformDashboard({
  platform,
  className,
  packagePreview,
  instagramVariant = 'followers',
  tiktokVariant,
  facebookVariant,
}: PlatformDashboardProps) {
  if (platform === 'instagram') {
    if (instagramVariant === 'likes') {
      return (
        <InstagramLikesPackagesHeroDashboard
          className={className}
          packagePreview={packagePreview}
        />
      );
    }
    if (instagramVariant === 'views') {
      return (
        <InstagramViewsHeroDashboard className={className} packagePreview={packagePreview} />
      );
    }
    if (instagramVariant === 'comments') {
      return (
        <InstagramCommentsHeroDashboard className={className} packagePreview={packagePreview} />
      );
    }
    return (
      <InstagramPackagesHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'tiktok' && tiktokVariant === 'followers') {
    return (
      <TikTokFollowersHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'tiktok' && tiktokVariant === 'likes') {
    return (
      <TikTokLikesHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'tiktok' && tiktokVariant === 'views') {
    return (
      <TikTokViewsHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'facebook' && facebookVariant === 'followers') {
    return (
      <FacebookFollowersHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'facebook' && facebookVariant === 'page-likes') {
    return (
      <FacebookPageLikesHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  if (platform === 'facebook' && facebookVariant === 'post-likes') {
    return (
      <FacebookPostLikesHeroDashboard className={className} packagePreview={packagePreview} />
    );
  }

  const copy = PLATFORM_COPY[platform];
  const accent =
    platform === 'tiktok'
      ? '#00F2EA'
      : platform === 'youtube'
        ? '#FF0000'
        : '#1877F2';

  return (
    <div className={cn('relative mx-auto w-full max-w-lg', className)}>
      <div
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-80 blur-2xl"
        style={{
          background: `radial-gradient(circle at 30% 20%, rgb(232 93 4 / 0.28), transparent 55%), radial-gradient(circle at 80% 70%, ${accent}33, transparent 50%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-lg)]">
        <div className="relative aspect-[5/4] w-full p-4 sm:p-5">
          <div className="flex h-full flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/60 p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-[var(--text-muted)] uppercase">
                  {copy.title}
                </p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{copy.metric} trend</p>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase"
                style={{ background: `${accent}22`, color: accent === '#00F2EA' ? '#0a0a0a' : accent }}
              >
                {platform}
              </span>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white p-2.5 shadow-[var(--shadow-xs)]">
                <p className="text-[10px] text-[var(--text-muted)]">Profile</p>
                <p className="text-xs font-semibold">Public only</p>
              </div>
              <div className="rounded-lg bg-white p-2.5 shadow-[var(--shadow-xs)]">
                <p className="text-[10px] text-[var(--text-muted)]">Checkout</p>
                <p className="text-xs font-semibold">Secure</p>
              </div>
            </div>
            <svg viewBox="0 0 320 100" className="mt-auto h-auto w-full" role="presentation">
              <defs>
                <linearGradient id={`plat-fill-${platform}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${copy.chart} L320 100 L0 100 Z`}
                fill={`url(#plat-fill-${platform})`}
              />
              <path
                d={copy.chart}
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <ul className="absolute -left-2 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {['Secure checkout', 'Public profile only'].map((label) => (
          <li
            key={label}
            className="rounded-full border border-[var(--border-subtle)] bg-white/95 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-[var(--shadow-sm)] backdrop-blur-sm"
          >
            {label}
          </li>
        ))}
      </ul>

      {packagePreview ? (
        <div className="absolute right-3 bottom-3 max-w-[11rem] rounded-xl border border-[var(--border-subtle)] bg-white/95 p-3 shadow-[var(--shadow-md)] backdrop-blur-sm">
          <p className="text-[10px] font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
            Package
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
            {packagePreview.title}
          </p>
          <p className="mt-0.5 text-lg font-bold text-[var(--brand-primary)]">
            {packagePreview.priceLabel}
          </p>
        </div>
      ) : null}
    </div>
  );
}

type TrustDashboardProps = { className?: string };

const CHECKOUT_ROWS = [
  { id: 'username', label: 'Public Username or Profile URL' },
  { id: 'payment', label: 'Secure Payment' },
  { id: 'email', label: 'Email Confirmation' },
  { id: 'tracking', label: 'Order Tracking' },
] as const;

export function TrustDashboard({ className }: TrustDashboardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-30px_rgba(28,25,23,0.4)] sm:p-6',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 8% 0%, rgba(249,115,22,0.1), transparent 55%), linear-gradient(180deg, #fffdfb 0%, #ffffff 45%, #faf6f1 100%)',
        }}
      />
      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)] shadow-sm">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">Checkout Summary</p>
            <p className="text-xs text-[var(--text-muted)]">Public information only</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {CHECKOUT_ROWS.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/90 px-3.5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.8)]"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-medium text-[var(--text-primary)]">{row.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[var(--surface-muted)] px-3.5 py-3">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-[var(--text-muted)] uppercase">
              Status
            </p>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Ready to track</p>
          </div>
          <span className="rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-[10px] font-bold text-white">
            Confirmed
          </span>
        </div>
      </div>
    </div>
  );
}
