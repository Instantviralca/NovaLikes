import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Download,
  Film,
  Image as ImageIcon,
  Lock,
  Play,
  Shield,
  UserRound,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ToolsHubHeroArt } from '@/components/tools/tools-hub-hero-art';
import { PlatformMark, platformName } from '@/components/tools/platform-mark';
import { HeroWash, Squiggle } from '@/components/tools/instagram-profile-viewer/visuals';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { routes } from '@/config/routes';
import { TOOLS_HUB_COPY } from '@/data/tools/copy';
import { getHubServiceLinks } from '@/data/tools/related-services';
import { prefetchForHref } from '@/lib/linking/prefetch';
import {
  TOOLS,
  type ToolDefinition,
} from '@/data/tools/registry';
import type { ToolPlatform, ToolSlug } from '@/lib/tools/types';
import { cn } from '@/lib/utils';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/paths';
import { ENGLISH_TOOL_CHROME, type ToolChrome } from '@/data/tools/chrome';
import type { ToolsBundle } from '@/lib/i18n/content/tools-english';

const HUB_ART = '/assets/images/tools/hub';

const ORDER: ToolPlatform[] = ['instagram', 'tiktok', 'facebook'];

const HOW_STEPS = [
  { art: 'how-search.webp' },
  { art: 'how-server.webp' },
  { art: 'how-result.webp' },
] as const;

const CARD_ICON: Record<ToolSlug, { icon: LucideIcon; className: string }> = {
  'instagram-profile-viewer': { icon: UserRound, className: 'bg-[#FFE0E8] text-[#E11D48]' },
  'instagram-profile-picture-viewer': { icon: ImageIcon, className: 'bg-[#DCEBFF] text-[#2563EB]' },
  'instagram-follower-counter': { icon: BarChart3, className: 'bg-[#D8F5E5] text-[#059669]' },
  'instagram-video-downloader': { icon: Play, className: 'bg-[#FFF3C4] text-[#CA8A04]' },
  'tiktok-video-downloader': { icon: Download, className: 'bg-[#EDE4FF] text-[#7C3AED]' },
  'tiktok-profile-picture-downloader': { icon: UserRound, className: 'bg-[#D7F6F3] text-[#0D9488]' },
  'facebook-video-downloader': { icon: Download, className: 'bg-[#DCEBFF] text-[#2563EB]' },
  'facebook-reels-downloader': { icon: Film, className: 'bg-[#EDE4FF] text-[#7C3AED]' },
};

const SERVICE_PILL: Record<string, string> = {
  'buy-instagram-followers': 'Instagram Followers Packages',
  'buy-tiktok-followers': 'TikTok Followers Packages',
  'buy-facebook-followers': 'Facebook Followers Packages',
};

function cardTitle(tool: ToolDefinition) {
  if (tool.platform !== 'instagram') return tool.name;
  return tool.name.replace(/^Instagram /, '');
}

const USP_ICONS = [Shield, UserRound, Lock] as const;

type ToolsHubViewProps = {
  locale?: Locale;
  bundle?: ToolsBundle;
  homeLabel?: string;
  toolsLabel?: string;
};

export function ToolsHubView({
  locale = DEFAULT_LOCALE,
  bundle,
  homeLabel = 'Home',
  toolsLabel = 'Tools',
}: ToolsHubViewProps) {
  const chrome = bundle?.chrome ?? ENGLISH_TOOL_CHROME;
  const hub = bundle?.hub ?? { ...TOOLS_HUB_COPY, h1Accent: 'Tools', packagesHeading: 'Optional NovaLikes Packages' };
  const toolsHref = localizeHref(routes.tools, locale);
  const services = getHubServiceLinks().map((service) => ({
    ...service,
    url: localizeHref(service.url, locale),
  }));
  const h1Accent = hub.h1Accent;
  const accentAt = hub.h1.lastIndexOf(h1Accent);
  const h1Before = accentAt >= 0 ? hub.h1.slice(0, accentAt) : hub.h1;
  const h1AccentText = accentAt >= 0 ? h1Accent : '';

  return (
    <div className="relative overflow-x-hidden bg-[#FFFBFA]">
      <HubDoodles className="pointer-events-none absolute inset-0 h-full w-full" />

      <Section spacing="none" className="relative pb-6 pt-4 md:pb-8 md:pt-6">
        <HeroWash className="pointer-events-none absolute inset-0 h-full w-full" />
        <Container size="xl" className="relative">
          <Breadcrumb
            items={[
              { label: homeLabel, href: localizeHref(routes.home, locale) },
              { label: toolsLabel, href: toolsHref },
            ]}
            sourceSlug="tools"
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#E85D04]">
                <Zap className="size-3.5 fill-current" aria-hidden="true" />
                {hub.eyebrow}
              </p>
              <Heading as="h1" size="h1" className="mt-5 max-w-xl break-words text-[2.15rem] leading-[1.1] sm:text-[2.75rem]">
                {h1Before}
                {h1AccentText ? <span className="text-[var(--brand-primary)]">{h1AccentText}</span> : null}
              </Heading>
              <Lead className="mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-[var(--text-secondary)]">
                {hub.lead}
              </Lead>
              <ul className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-4">
                {chrome.usps.map((item, index) => {
                  const Icon = USP_ICONS[index] ?? Shield;
                  return (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE8D6] text-[#E85D04]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-[var(--text-secondary)]">{item.text}</p>
                    </span>
                  </li>
                  );
                })}
              </ul>
            </div>
            <ToolsHubHeroArt className="lg:translate-x-2" />
          </div>
        </Container>
      </Section>

      {ORDER.map((platform) => {
        const tools = TOOLS.filter((tool) => tool.platform === platform).map((tool) =>
          localizeHubTool(tool, locale, bundle),
        );
        if (!tools.length) return null;
        return (
          <Section key={platform} spacing="none" className="relative py-8 md:py-11">
            <Container size="xl" className="relative">
              {platform === 'tiktok' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${HUB_ART}/plane.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute -right-4 -top-8 hidden w-28 select-none lg:block"
                />
              ) : null}
              {platform === 'facebook' ? <DotGrid className="pointer-events-none absolute -left-6 top-2 hidden lg:block" /> : null}
              <div className="flex items-center gap-3">
                <PlatformMark platform={platform} className="size-11 rounded-2xl bg-[#FFE8D6]" />
                <Heading as="h2" size="h2" className="text-[1.55rem] sm:text-[1.85rem]">
                  {chrome.platformLabels[platform]}
                </Heading>
              </div>
              <p className="mt-1.5 max-w-2xl text-sm text-[var(--text-secondary)]">{chrome.platformIntros[platform]}</p>
              <ul
                className={cn(
                  'mt-6 grid gap-5',
                  platform === 'instagram' ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2',
                )}
              >
                {tools.map((tool) => (
                  <li key={tool.slug} className="h-full">
                    <ToolCard tool={tool} chrome={chrome} />
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      <Section spacing="none" className="relative py-12 md:py-16">
        <Container size="xl">
          <Heading as="h2" size="h2" className="text-center text-[1.75rem] sm:text-[2.05rem]">
            {hub.howHeading}
          </Heading>
          <Squiggle className="mx-auto mt-2 h-4 w-16" color="#E85D04" />
          <ol className="mt-10 grid list-none items-start gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-1">
            {HOW_STEPS.map((step, index) => (
              <HubHowStep
                key={chrome.hubHowTitles[index]}
                index={index}
                title={chrome.hubHowTitles[index]}
                art={step.art}
                detail={hub.how[index]}
              />
            ))}
          </ol>
        </Container>
      </Section>

      {services.length ? (
        <Section spacing="none" className="relative pb-16 pt-2 md:pb-20">
          <Container size="xl">
            <div className="rounded-[2rem] bg-gradient-to-r from-[#FFE8D4] via-[#FFF1E4] to-[#F8E7D4] px-6 py-8 sm:px-10 md:px-12 md:py-10">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.26fr)_minmax(0,0.44fr)_minmax(0,0.3fr)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${HUB_ART}/gift.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto w-full max-w-[11rem] select-none object-contain"
                />
                <div>
                  <Heading as="h2" size="h2" className="text-[1.5rem] sm:text-[1.8rem]">
                    {hub.packagesHeading}
                  </Heading>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                    {hub.servicesNote}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={service.url}
                        prefetch={prefetchForHref(service.url)}
                        className="inline-flex min-h-11 w-full items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] shadow-[0_8px_20px_-12px_rgba(80,40,20,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <PlatformMark
                          platform={
                            service.platform === 'tiktok' || service.platform === 'facebook'
                              ? service.platform
                              : 'instagram'
                          }
                          className="size-8 rounded-full bg-[#FFF4EA]"
                        />
                        {chrome.servicePills[service.slug] ?? SERVICE_PILL[service.slug] ?? service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </div>
  );
}

function HubHowStep({
  index,
  title,
  art,
  detail,
}: {
  index: number;
  title: string;
  art: string;
  detail: string;
}) {
  return (
    <>
      {index > 0 ? (
        <li className="hidden items-center pt-16 md:flex rtl:-scale-x-100" aria-hidden="true">
          <DashedArrow />
        </li>
      ) : null}
      <li className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${HUB_ART}/${art}`} alt="" loading="lazy" decoding="async" className="mx-auto h-auto w-full max-w-[16rem] select-none object-contain" />
        <p className="mx-auto mt-1 inline-flex size-8 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
          {index + 1}
        </p>
        <p className="mt-2 text-[0.98rem] font-semibold text-[var(--text-primary)]">{title}</p>
        <p className="sr-only">{detail}</p>
      </li>
    </>
  );
}

function localizeHubTool(tool: ToolDefinition, locale: Locale, bundle?: ToolsBundle): ToolDefinition {
  const overlay = bundle?.registry[tool.slug];
  return {
    ...tool,
    name: overlay?.name ?? tool.name,
    shortDescription: overlay?.shortDescription ?? tool.shortDescription,
    placeholder: overlay?.placeholder ?? tool.placeholder,
    actionLabel: overlay?.actionLabel ?? tool.actionLabel,
    availabilityLabel: overlay?.availabilityLabel ?? tool.availabilityLabel,
    href: localizeHref(tool.href, locale),
  };
}

function ToolCard({ tool, chrome }: { tool: ToolDefinition; chrome: ToolChrome }) {
  const limited = tool.status !== 'working';
  const name = platformName(tool.platform);
  const visual = CARD_ICON[tool.slug];
  const Icon = visual.icon;
  const blurb = chrome.cardBlurbs[tool.slug];

  return (
    <Link
      href={tool.href}
      aria-label={
        limited
          ? `${tool.name}. ${name}. ${tool.availabilityLabel}. ${tool.shortDescription}`
          : `${tool.name}. ${name}. ${tool.shortDescription}`
      }
      className="group relative flex h-full flex-col rounded-[1.25rem] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {limited ? (
        <span className="absolute end-4 top-4 rounded-full bg-[#FFE4D1] px-2.5 py-1 text-[10px] font-semibold text-[#E85D04]">
          {tool.availabilityLabel}
        </span>
      ) : null}
      <span className={cn('inline-flex size-11 items-center justify-center rounded-full', visual.className)}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="mt-4 pe-6 break-words text-[1.02rem] font-bold leading-snug text-[var(--text-primary)]">{cardTitle(tool)}</p>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{blurb}</p>
      <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
        {chrome.openTool}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
      </p>
    </Link>
  );
}

function DashedArrow() {
  return (
    <svg viewBox="0 0 88 36" className="h-9 w-[4.5rem]" aria-hidden="true">
      <path
        d="M4 28 C 28 4, 56 4, 76 22"
        fill="none"
        stroke="#D4D0CC"
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
      <path d="M68 14 l12 10 -14 2" fill="none" stroke="#D4D0CC" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DotGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('h-16 w-16 text-[#E8B48A]', className)} aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={8 + (i % 4) * 16} cy={8 + Math.floor(i / 4) * 16} r="2.2" fill="currentColor" opacity="0.55" />
      ))}
    </svg>
  );
}

function HubDoodles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 2200" preserveAspectRatio="none" className={className} aria-hidden="true">
      <g fill="none" stroke="#E8B48A" strokeWidth="1.4" opacity="0.45">
        <path d="M70 90 l8 0 M74 86 l0 8" />
        <path d="M1360 220 l8 0 M1364 216 l0 8" />
        <path d="M90 980 l8 0 M94 976 l0 8" />
        <path d="M1320 1480 l8 0 M1324 1476 l0 8" />
      </g>
      <g fill="#E8B48A" opacity="0.4">
        <circle cx="110" cy="240" r="2.2" />
        <circle cx="1380" cy="520" r="2.2" />
        <circle cx="60" cy="760" r="2" />
        <circle cx="1400" cy="1100" r="2.2" />
      </g>
      <g fill="#C9B6F2" opacity="0.45">
        <path d="M180 160 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
        <path d="M1260 860 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
        <path d="M200 1320 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" />
      </g>
    </svg>
  );
}
