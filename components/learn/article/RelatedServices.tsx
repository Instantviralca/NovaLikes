import Link from 'next/link';
import {
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

import { getServiceBySlug } from '@/data/services';
import type { InternalLink } from '@/types/linking';
import type { LearnArticleServiceCta } from '@/types/learn';

type RelatedServicesProps = {
  title?: string;
  services: InternalLink[];
  /** Optional single prominent CTA from article data. */
  prominentCta?: LearnArticleServiceCta;
};

function cardDescription(slug: string): string | undefined {
  const service = getServiceBySlug(slug);
  if (!service || service.platform === 'youtube') return undefined;
  const platform =
    service.platform === 'tiktok'
      ? 'TikTok'
      : service.platform === 'instagram'
        ? 'Instagram'
        : service.platform === 'facebook'
          ? 'Facebook'
          : service.platform;
  return `Compare available ${platform} ${service.shortName.toLowerCase()} packages.`;
}

/** Visual-only icon pick from the service slug (followers / likes / views / comments). */
function serviceIcon(slug: string): LucideIcon {
  if (slug.includes('like')) return Heart;
  if (slug.includes('view')) return Eye;
  if (slug.includes('comment')) return MessageCircle;
  return UserPlus;
}

function ServiceCard({
  href,
  label,
  description,
  slug,
}: {
  href: string;
  label: string;
  description?: string;
  slug: string;
}) {
  const Icon = serviceIcon(slug);
  return (
    <Link className="svc-card" href={href}>
      <span className="si">
        <Icon className="ic" aria-hidden="true" />
      </span>
      <span>
        <b>{label}</b>
        {description ? <em>{description}</em> : null}
      </span>
      <span className="sq">
        <ArrowRight className="ic" strokeWidth={2.5} aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * Related services — Document 15.02 + 14.05, site-v2 `.svc-cards`.
 * Compact cards for contextually related destinations only.
 */
export function RelatedServices({
  title = 'Related services',
  services,
  prominentCta,
}: RelatedServicesProps) {
  if (!prominentCta && services.length === 0) return null;

  return (
    <section aria-labelledby="article-related-services">
      <h2 id="article-related-services" className="block-title">
        {title}
      </h2>
      <div className="svc-cards">
        {prominentCta ? (
          <ServiceCard
            href={`/${prominentCta.serviceSlug}`}
            label={prominentCta.label}
            description={prominentCta.description}
            slug={prominentCta.serviceSlug}
          />
        ) : null}
        {services.map((service) => (
          <ServiceCard
            key={service.href}
            href={service.href}
            label={service.label}
            description={cardDescription(service.slug)}
            slug={service.slug}
          />
        ))}
      </div>
    </section>
  );
}
