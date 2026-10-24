import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  CircleCheck,
  Download,
  Heart,
  IdCard,
  Image as ImageIcon,
  LayoutGrid,
  Music2,
  Play,
  ScanSearch,
  Search,
  ThumbsUp,
  TrendingUp,
  UserPlus,
  UserRound,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { CameraSquare } from '@/components/marketing/service-v1/icons';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import type { SnapArtName } from '@/components/tools/instagram-profile-viewer/visuals';
import type { ToolChrome } from '@/data/tools/chrome';
import { TOOLS, type ToolDefinition } from '@/data/tools/registry';
import { prefetchForHref } from '@/lib/linking/prefetch';
import { formatCardPrice } from '@/lib/marketing/home-v5/from-price';
import type { ToolPlatform, ToolSlug } from '@/lib/tools/types';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

import './tools-v2.css';

const PLATFORM_TILE_CLASS: Record<ToolPlatform, string> = {
  instagram: 'ig',
  tiktok: 'tt',
  facebook: 'fb',
};

const TOOL_ICON: Record<ToolSlug, LucideIcon> = {
  'instagram-profile-viewer': UserPlus,
  'instagram-profile-picture-viewer': ImageIcon,
  'instagram-follower-counter': Users,
  'instagram-video-downloader': Download,
  'tiktok-video-downloader': Download,
  'tiktok-profile-picture-downloader': ImageIcon,
  'facebook-video-downloader': Download,
  'facebook-reels-downloader': Play,
};

/** Platform glyph: Instagram = CameraSquare, TikTok = Music2, Facebook = ThumbsUp (no logos). */
export function PlatformGlyph({ platform }: { platform: ToolPlatform }) {
  if (platform === 'tiktok') return <Music2 className="ic" aria-hidden="true" />;
  if (platform === 'facebook') return <ThumbsUp className="ic" aria-hidden="true" />;
  return <CameraSquare className="ic" />;
}

export function PlatformTile({ platform }: { platform: ToolPlatform }) {
  return (
    <span className={cn('ti', PLATFORM_TILE_CLASS[platform])} aria-hidden="true">
      <PlatformGlyph platform={platform} />
    </span>
  );
}

export function ToolIcon({ slug }: { slug: ToolSlug }) {
  const Icon = TOOL_ICON[slug] ?? Download;
  return <Icon className="ic" aria-hidden="true" />;
}

const SEE_ICON: Record<SnapArtName, LucideIcon> = {
  'hero-portrait': UserRound,
  'editorial-card': IdCard,
  'see-photo': ImageIcon,
  'see-bio': UserRound,
  'see-followers': Users,
  'see-posts': LayoutGrid,
  'step-search': Search,
  'step-scan': ScanSearch,
  'step-done': CircleCheck,
  'related-picture': ImageIcon,
  'related-counter': BarChart3,
  'related-video': Play,
  'cta-growth': TrendingUp,
};

/** Feature-card icon derived from the layout's existing illustration key. */
export function SeeIcon({ art }: { art: SnapArtName }) {
  const Icon = SEE_ICON[art] ?? ImageIcon;
  return <Icon className="ic" aria-hidden="true" />;
}

/** Short card / tab title (Instagram tools drop the repeated platform prefix). */
export function toolShortTitle(tool: ToolDefinition) {
  if (tool.platform !== 'instagram') return tool.name;
  return tool.name.replace(/^Instagram /, '');
}

export function CheckIcon({ variant = 'check' }: { variant?: 'check' | 'x' }) {
  return (
    <svg
      className="ic"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {variant === 'x' ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <path d="M20 6 9 17l-5-5" />
      )}
    </svg>
  );
}

export function CheckList({
  items,
  variant = 'check',
}: {
  items: string[];
  variant?: 'check' | 'x';
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          <CheckIcon variant={variant} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Breadcrumb restyled as `.crumbs` (same component service-v2 uses). */
export function ToolCrumbs({
  items,
  sourceSlug,
}: {
  items: BreadcrumbItem[];
  sourceSlug?: string;
}) {
  return (
    <Breadcrumb
      items={items}
      className="crumbs"
      showHomeIcon={false}
      withSchema={false}
      sourceSlug={sourceSlug}
    />
  );
}

/** Tools of the same platform, in registry order (current tool + its related siblings). */
export function buildToolTabs(
  tool: ToolDefinition,
  related: ToolDefinition[],
): ToolDefinition[] {
  const all = [tool, ...related.filter((item) => item.platform === tool.platform)];
  const order = new Map(TOOLS.map((item, index) => [item.slug, index]));
  return all.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

export function ToolTabs({
  tools,
  current,
  label,
}: {
  tools: ToolDefinition[];
  current: ToolSlug;
  label: string;
}) {
  if (tools.length < 2) return null;
  return (
    <nav className="tool-tabs" aria-label={label}>
      {tools.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          aria-current={item.slug === current ? 'page' : undefined}
        >
          <ToolIcon slug={item.slug} />
          {toolShortTitle(item)}
        </Link>
      ))}
    </nav>
  );
}

/** Grey tool hero: crumbs, H1, lead, tabs, then the workspace (children). */
export function ToolV2Hero({
  tool,
  chrome,
  crumbs,
  tabs,
  h1,
  lead,
  children,
}: {
  tool: ToolDefinition;
  chrome: ToolChrome;
  crumbs: BreadcrumbItem[];
  tabs: ToolDefinition[];
  h1: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section className="tool-hero">
      <span className="deco d1" aria-hidden="true">
        <ToolIcon slug={tool.slug} />
      </span>
      <span className="deco d2" aria-hidden="true">
        <PlatformGlyph platform={tool.platform} />
      </span>
      <span className="deco d3" aria-hidden="true">
        <Heart className="ic" aria-hidden="true" />
      </span>
      <div className="wrap">
        <div className="inner">
          <ToolCrumbs items={crumbs} sourceSlug={tool.slug} />
          <h1 className="h1 lg">{h1}</h1>
          <p className="lead">{lead}</p>
          <ToolTabs
            tools={tabs}
            current={tool.slug}
            label={chrome.platformLabels[tool.platform]}
          />
          {children}
        </div>
      </div>
    </section>
  );
}

export function ToolCard({
  tool,
  chrome,
  platformLabel,
  showBlurb = false,
}: {
  tool: ToolDefinition;
  chrome: ToolChrome;
  platformLabel?: string;
  showBlurb?: boolean;
}) {
  const limited = tool.status !== 'working';
  const blurb = showBlurb ? chrome.cardBlurbs[tool.slug] : null;
  const title = showBlurb ? toolShortTitle(tool) : tool.name;
  const ariaLabel = [
    tool.name,
    platformLabel,
    limited ? tool.availabilityLabel : null,
    tool.shortDescription,
  ]
    .filter(Boolean)
    .join('. ');

  return (
    <Link
      href={tool.href}
      aria-label={showBlurb ? ariaLabel : undefined}
      className="tcard rv-up"
    >
      {limited ? <span className="badge">{tool.availabilityLabel}</span> : null}
      <span className={cn('ti', PLATFORM_TILE_CLASS[tool.platform])} aria-hidden="true">
        <ToolIcon slug={tool.slug} />
      </span>
      <h3>{title}</h3>
      {blurb ? <p>{blurb}</p> : null}
      <span className="tlink">
        {chrome.openTool}
        <ArrowRight className="ic rtl:rotate-180" aria-hidden="true" />
      </span>
    </Link>
  );
}

type PkgService = { slug: string; name: string; url: string };

/** Service hero image: /assets/images/illustrations/{kebab}/{kebab}-hero.webp (kebab = slug without `buy-`). */
export function serviceHeroSrc(slug: string) {
  const kebab = slug.replace(/^buy-/, '');
  return `/assets/images/illustrations/${kebab}/${kebab}-hero.webp`;
}

export function PkgCards({
  services,
  labelFor,
}: {
  services: PkgService[];
  labelFor: (service: PkgService) => string;
}) {
  return (
    <div className="pkg-cards">
      {services.map((service) => {
        const from = formatCardPrice(service.slug);
        return (
          <Link
            key={service.slug}
            href={service.url}
            prefetch={prefetchForHref(service.url)}
            className="pkg rv-up"
          >
            <div className="pi">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={serviceHeroSrc(service.slug)} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="pr">
              <span>
                <b>{labelFor(service)}</b>
                {from ? <em>{from}</em> : null}
              </span>
              <span className="sq" aria-hidden="true">
                <ArrowRight className="ic rtl:rotate-180" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

