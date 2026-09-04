import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Eye,
  Flame,
  Heart,
  MessageCircle,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { cn } from '@/lib/utils';
import { PLATFORM_MARKS, TikTokMark } from '@/components/marketing/platform-marks';

type HubPlatform = (typeof homepageHub.platformSelector.platforms)[number];
type TagIcon = HubPlatform['tags'][number]['icon'];

const TAG_ICONS: Record<TagIcon, LucideIcon> = {
  user: UserPlus,
  heart: Heart,
  play: Play,
  comment: MessageCircle,
  trend: TrendingUp,
  eye: Eye,
  spark: Sparkles,
  users: Users,
  thumb: ThumbsUp,
  reach: Radio,
};

const TRUST_ICONS = {
  shield: ShieldCheck,
  bolt: Zap,
  check: BadgeCheck,
} as const;

const THEMES: Record<
  HubPlatform['id'],
  {
    header: string;
    cta: string;
    metricClass: string;
    chart: string;
  }
> = {
  instagram: {
    header: 'bg-[linear-gradient(145deg,#FF9A3C_0%,#FF6B4A_38%,#FF4D7D_100%)]',
    cta: 'bg-[linear-gradient(90deg,#FF8A1F_0%,#FF5C8A_100%)] text-white shadow-[0_12px_28px_-10px_rgba(255,92,138,0.65)] hover:brightness-[1.03]',
    metricClass: 'bg-[#FFE4EC] text-[#9F1239]',
    chart: '#E11D48',
  },
  tiktok: {
    header: 'bg-[linear-gradient(160deg,#3A3A44_0%,#141418_48%,#0B0B0E_100%)]',
    cta: 'bg-[#111111] text-white shadow-[0_12px_28px_-10px_rgba(17,17,17,0.55)] hover:bg-black',
    metricClass: 'bg-white text-[#111111]',
    chart: '#111111',
  },
  facebook: {
    header: 'bg-[linear-gradient(145deg,#7EB6FF_0%,#2F8CFF_46%,#1864F2_100%)]',
    cta: 'bg-[#1877F2] text-white shadow-[0_12px_28px_-10px_rgba(24,119,242,0.6)] hover:bg-[#166FE5]',
    metricClass: 'bg-[#DCECFF] text-[#1D4ED8]',
    chart: '#2563EB',
  },
};

const MARKS = PLATFORM_MARKS;

function SparkMarks() {
  return (
    <span className="pointer-events-none absolute -right-1 -top-3.5 flex items-end gap-[3px]" aria-hidden="true">
      <span className="mb-1 h-2 w-[2px] rotate-[-22deg] rounded-full bg-[#F97316]" />
      <span className="h-3.5 w-[2px] rounded-full bg-[#F97316]" />
      <span className="mb-0.5 h-2 w-[2px] rotate-[22deg] rounded-full bg-[#F97316]" />
    </span>
  );
}

function AccentTitle({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/);
  const last = parts.pop() ?? title;
  const lead = parts.join(' ');
  return (
    <>
      {lead ? `${lead} ` : null}
      <span className="relative inline-block text-[#F97316]">
        {last}
        <SparkMarks />
      </span>
    </>
  );
}

function MiniChart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 28 18" className="h-4 w-7 shrink-0" aria-hidden="true">
      <path
        d="M1 14 C 6 13, 8 7, 13 9 S 20 4, 27 3"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardHeaderArt({ platform }: { platform: HubPlatform }) {
  const theme = THEMES[platform.id];
  const Mark = MARKS[platform.id];

  return (
    <div className={cn('relative h-[176px] overflow-hidden', theme.header)}>
      {platform.id === 'tiktok' ? (
        <>
          <span className="absolute -left-8 top-2 size-28 rounded-full bg-[#25F4EE]/25 blur-2xl" />
          <span className="absolute right-4 top-0 size-24 rounded-full bg-[#FE2C55]/30 blur-2xl" />
        </>
      ) : platform.id === 'facebook' ? (
        <>
          <span className="absolute left-6 -top-6 size-28 rounded-full bg-white/25 blur-2xl" />
          <span className="absolute -right-4 bottom-0 size-20 rounded-full bg-[#0B4FBF]/40 blur-xl" />
        </>
      ) : (
        <>
          <span className="absolute -left-10 -top-6 size-32 rounded-full bg-white/30 blur-2xl" />
          <span className="absolute right-8 top-0 size-20 rounded-full bg-[#FDE68A]/35 blur-xl" />
        </>
      )}

      <div className="relative flex h-full items-center px-6">
        <div className="-ml-1 h-[5.75rem] w-[5.25rem] -rotate-6 transition duration-200 group-hover:-rotate-2">
          <Mark />
        </div>

        {'badge' in platform && platform.badge ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#C2410C] shadow-[0_6px_16px_-8px_rgba(0,0,0,0.35)]">
            <Flame className="size-3.5 fill-[#F97316] text-[#F97316]" aria-hidden="true" />
            {platform.badge}
          </span>
        ) : null}

        <div
          className={cn(
            'absolute bottom-5 right-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.28)]',
            theme.metricClass,
          )}
          aria-hidden="true"
        >
          <p className="text-[12px] font-bold leading-none">
            {platform.metric.value} {platform.metric.label}
          </p>
          <MiniChart color={theme.chart} />
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ platform, delay }: { platform: HubPlatform; delay: number }) {
  const theme = THEMES[platform.id];

  return (
    <FadeUp delay={delay} className="h-full">
      <article
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-2xl bg-white',
          'ring-1 ring-[#EDE8E3]',
          'transition duration-200 hover:-translate-y-0.5 hover:ring-[#E5DDD5]',
        )}
      >
        <CardHeaderArt platform={platform} />
        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <h3 className="text-[1.375rem] font-bold tracking-tight text-[#1C1917]">{platform.name}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#6B6560]">{platform.description}</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {platform.tags.map((tag) => {
              const Icon = TAG_ICONS[tag.icon];
              return (
                <li key={tag.label}>
                  <Link
                    href={tag.href}
                    prefetch={prefetchForHref(tag.href)}
                    className="flex min-h-[2.15rem] items-center gap-1.5 rounded-full bg-[#F4F2F0] px-2.5 text-[12px] font-medium text-[#3F3A36] transition hover:bg-[#EBE7E4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="size-3.5 shrink-0 text-[#8A837C]" aria-hidden="true" />
                    <span className="truncate">{tag.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={platform.href}
            className={cn(
              'mt-5 inline-flex min-h-[2.85rem] w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              theme.cta,
            )}
          >
            {platform.ctaLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </FadeUp>
  );
}

function Avatar({
  hair,
  skin,
  shirt,
}: {
  hair: string;
  skin: string;
  shirt: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill={shirt} />
      <circle cx="20" cy="16" r="8" fill={skin} />
      <path d="M8 34c2-8 8-12 12-12s10 4 12 12" fill={shirt} />
      <path d="M11 14c2-8 18-8 18 0 0 3-3 5-9 5s-9-2-9-5z" fill={hair} />
    </svg>
  );
}

function FloatingScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className="absolute left-[12%] top-8 size-40 rounded-full bg-[#FFE0CC]/70 blur-3xl" />
      <span className="absolute right-[10%] top-16 size-36 rounded-full bg-[#F3E8FF]/80 blur-3xl" />
      <svg className="absolute inset-x-[8%] top-10 h-40 w-[84%]" viewBox="0 0 1000 160" fill="none">
        <path
          d="M40 90 C 180 20, 280 140, 430 70 S 720 20, 960 88"
          stroke="#E8B48A"
          strokeWidth="1.4"
          strokeDasharray="5 8"
          opacity="0.45"
        />
      </svg>
      <Heart className="absolute left-[7%] top-16 size-9 rotate-[-18deg] fill-[#FB7185] text-[#FB7185] opacity-80 drop-shadow-sm" />
      <span className="absolute left-[18%] top-[7.5rem] flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-black/5">
        <BarChart3 className="size-5 text-[#F97316]" />
      </span>
      <span className="absolute right-[9%] top-12 size-11 -rotate-6 opacity-80">
        <TikTokMark />
      </span>
      <ThumbsUp className="absolute right-[16%] top-[8.25rem] size-8 rotate-[16deg] fill-[#60A5FA] text-[#1877F2] opacity-90" />
    </div>
  );
}

export function HomepagePlatformSelector({
  hub = homepageHub,
  instagramOnly = false,
  enhanced = false,
}: {
  hub?: HomepageHub;
  instagramOnly?: boolean;
  enhanced?: boolean;
}) {
  const section = hub.platformSelector;
  const platforms = instagramOnly
    ? section.platforms.filter((platform) => platform.id === 'instagram')
    : section.platforms;
  const compactSplit = enhanced && instagramOnly;

  return (
    <Section
      id={section.id}
      spacing="none"
      className={cn(
        'relative overflow-hidden bg-transparent',
        enhanced ? 'py-10 md:py-12 lg:py-14' : 'py-12 md:py-16 lg:py-[4.5rem]',
      )}
      aria-labelledby={`${section.id}-heading`}
    >
      {enhanced ? null : <FloatingScene />}
      <Container size="xl" className="relative">
        {compactSplit ? (
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
            <FadeUp>
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#E85D04]">
                {section.eyebrow}
              </p>
              <h2
                id={`${section.id}-heading`}
                className="mt-3 text-balance text-[1.85rem] font-bold leading-[1.15] tracking-tight text-[#1C1917] sm:text-[2.15rem]"
              >
                {section.title}
              </h2>
              <p className="mt-3 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-[#6B6560]">
                {section.description}
              </p>
              <ul className="mt-5 flex flex-wrap items-center gap-2">
                {section.trustItems.map((item) => {
                  const Icon = item.id === 'refund' ? TRUST_ICONS.check : TRUST_ICONS[item.icon];
                  return (
                    <li
                      key={item.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F4] px-3 py-1.5 text-[12.5px] font-medium text-[#44403C]"
                    >
                      <Icon className="size-3.5 text-[#E85D04]" aria-hidden="true" />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
              <Link
                href={section.socialProof.href}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#E85D04] transition hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {section.socialProof.text}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </FadeUp>
            <div className="mx-auto w-full max-w-sm lg:max-w-none lg:justify-self-end">
              {platforms.map((platform, index) => (
                <PlatformCard key={platform.id} platform={platform} delay={index * 0.05} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <FadeUp className="mx-auto max-w-[42rem] text-center">
              <p className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[12px] font-semibold text-[#E85D04]">
                <Heart className="size-3.5 fill-current" aria-hidden="true" />
                {section.eyebrow}
              </p>
              <h2
                id={`${section.id}-heading`}
                className={cn(
                  'text-balance text-[2.15rem] font-bold leading-[1.12] tracking-tight text-[#1C1917] sm:text-[2.75rem]',
                  enhanced ? 'mt-5' : 'mt-4',
                )}
              >
                <AccentTitle title={section.title} />
              </h2>
              <p
                className={cn(
                  'mx-auto max-w-[36rem] text-pretty text-[15px] leading-[1.65] text-[#6B6560]',
                  enhanced ? 'mt-5' : 'mt-3',
                )}
              >
                {section.description}
              </p>
              <ul className={cn('flex flex-wrap items-center justify-center gap-2.5', enhanced ? 'mt-5' : 'mt-6')}>
                {section.trustItems.map((item) => {
                  const Icon = item.id === 'refund' ? TRUST_ICONS.check : TRUST_ICONS[item.icon];
                  return (
                    <li
                      key={item.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F0EE] px-3 py-1.5 text-[12.5px] font-medium text-[#44403C]"
                    >
                      <Icon className="size-3.5 text-[#E85D04]" aria-hidden="true" />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </FadeUp>

            <div
              className={cn(
                'grid gap-6',
                enhanced ? 'mt-8' : 'mt-11',
                instagramOnly ? 'mx-auto max-w-md' : 'md:grid-cols-2 lg:grid-cols-3 lg:gap-7',
              )}
            >
              {platforms.map((platform, index) => (
                <PlatformCard key={platform.id} platform={platform} delay={index * 0.05} />
              ))}
            </div>

            <FadeUp delay={0.16} className={cn('flex justify-center', enhanced ? 'mt-8' : 'mt-11')}>
              <Link
                href={section.socialProof.href}
                className="inline-flex max-w-full items-center gap-3 rounded-full bg-[#FFE8D6] px-5 py-2.5 text-[13.5px] font-medium text-[#3F3A36] shadow-[0_10px_24px_-16px_rgba(232,93,4,0.55)] transition hover:bg-[#FFDCC4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex -space-x-2" aria-hidden="true">
                  <span className="overflow-hidden rounded-full ring-2 ring-[#FFE8D6]">
                    <Avatar hair="#1C1917" skin="#E8B89A" shirt="#FB7185" />
                  </span>
                  <span className="overflow-hidden rounded-full ring-2 ring-[#FFE8D6]">
                    <Avatar hair="#44403C" skin="#D1A07A" shirt="#60A5FA" />
                  </span>
                  <span className="overflow-hidden rounded-full ring-2 ring-[#FFE8D6]">
                    <Avatar hair="#78350F" skin="#F1C7A8" shirt="#FDBA74" />
                  </span>
                </span>
                <span className="text-pretty">
                  {section.socialProof.text}
                  <ArrowRight className="ml-1 inline size-4 align-[-2px]" aria-hidden="true" />
                </span>
              </Link>
            </FadeUp>
          </>
        )}
      </Container>
    </Section>
  );
}
