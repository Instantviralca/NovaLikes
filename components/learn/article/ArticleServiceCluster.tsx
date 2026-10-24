import Link from 'next/link';
import {
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { formatCardPrice } from '@/lib/marketing/home-v5/from-price';

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

function serviceIcon(slug: string): LucideIcon {
  if (slug.includes('like')) return Heart;
  if (slug.includes('view')) return Eye;
  if (slug.includes('comment')) return MessageCircle;
  return UserPlus;
}

type ArticleServiceClusterProps = {
  heading: string;
  text: string;
  serviceSlugs: string[];
};

/**
 * Editorial mid-article service cluster.
 * Site-v2: same `.svc-cards` treatment as Related services, with "From $X".
 */
export function ArticleServiceCluster({
  heading,
  text,
  serviceSlugs,
}: ArticleServiceClusterProps) {
  const items = serviceSlugs
    .map((slug) => {
      const label = serviceClusterLabel(slug);
      const service = getServiceBySlug(slug);
      if (!label || !service) return null;
      return {
        href: service.url,
        label,
        price: formatCardPrice(slug),
        slug,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) return null;

  return (
    <aside data-article-cta="service-cluster">
      <h3>{heading}</h3>
      <p>{text}</p>
      <div className="svc-cards" style={{ marginTop: 16 }}>
        {items.map((item) => {
          const Icon = serviceIcon(item.slug);
          return (
            <Link key={item.href} className="svc-card" href={item.href}>
              <span className="si">
                <Icon className="ic" aria-hidden="true" />
              </span>
              <span>
                <b>{item.label}</b>
                {item.price ? <em>{item.price}</em> : null}
              </span>
              <span className="sq">
                <ArrowRight className="ic" strokeWidth={2.5} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
