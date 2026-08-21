import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';

const PLATFORM_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
};

export function serviceClusterLabel(slug: string): string | null {
  if (!isApprovedServiceSlug(slug)) return null;
  const service = getServiceBySlug(slug);
  if (!service || service.platform === 'youtube' || service.comingSoon) {
    return null;
  }
  const platform = PLATFORM_LABEL[service.platform] ?? service.platform;
  return `${platform} ${service.shortName}`;
}

export function serviceClusterDescription(slug: string): string | null {
  if (!isApprovedServiceSlug(slug)) return null;
  const service = getServiceBySlug(slug);
  if (!service || service.platform === 'youtube') return null;
  const platform = PLATFORM_LABEL[service.platform] ?? service.platform;
  return `Compare available ${platform} ${service.shortName.toLowerCase()} packages.`;
}

type ArticleServiceClusterProps = {
  heading: string;
  text: string;
  serviceSlugs: string[];
};

/**
 * Editorial mid-article service cluster. Not a pricing grid.
 */
export function ArticleServiceCluster({
  heading,
  text,
  serviceSlugs,
}: ArticleServiceClusterProps) {
  const items = serviceSlugs
    .map((slug) => {
      const label = serviceClusterLabel(slug);
      const description = serviceClusterDescription(slug);
      const service = getServiceBySlug(slug);
      if (!label || !service) return null;
      return { href: service.url, label, description };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) return null;

  return (
    <aside
      data-article-cta="service-cluster"
      className="not-prose rounded-2xl border border-[#F0E4D8] bg-[#FFF8F3] px-5 py-6 sm:px-6"
    >
      <p className="text-[11px] font-semibold tracking-[0.16em] text-[#E85D04] uppercase">
        NovaLikes
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#1C1917]">
        {heading}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-[#57534E]">{text}</p>
      <ul className="mt-5 grid gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#F0E4D8] bg-white px-4 py-3 text-[#1C1917] outline-none transition-colors hover:border-[#FDBA74] hover:bg-[#FFF1E6] focus-visible:ring-2 focus-visible:ring-[#E85D04]"
            >
              <span>
                <span className="block text-sm font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="mt-0.5 block text-xs text-[#78716C]">
                    {item.description}
                  </span>
                ) : null}
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-[#E85D04]" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
