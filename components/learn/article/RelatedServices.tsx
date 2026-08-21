import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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

/**
 * Related services — Document 15.02 + 14.05.
 * Compact cards for contextually related destinations only.
 */
export function RelatedServices({
  title = 'Related services',
  services,
  prominentCta,
}: RelatedServicesProps) {
  if (!prominentCta && services.length === 0) return null;

  return (
    <section aria-labelledby="article-related-services" className="space-y-4">
      <h2
        id="article-related-services"
        className="text-xl font-semibold tracking-tight text-[#1C1917]"
      >
        {title}
      </h2>

      {prominentCta ? (
        <Link
          href={`/${prominentCta.serviceSlug}`}
          className="flex items-center justify-between gap-3 rounded-2xl border border-[#1C1917] bg-[#1C1917] px-5 py-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04] focus-visible:ring-offset-2"
        >
          <span>
            <span className="block font-semibold">{prominentCta.label}</span>
            {prominentCta.description ? (
              <span className="mt-1 block text-sm text-white/70">
                {prominentCta.description}
              </span>
            ) : null}
          </span>
          <ArrowUpRight className="size-4 shrink-0" aria-hidden />
        </Link>
      ) : null}

      {services.length > 0 ? (
        <ul className="grid gap-3">
          {services.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[#F0E4D8] bg-white px-4 py-3.5 outline-none transition-colors hover:border-[#FDBA74] hover:bg-[#FFF8F3] focus-visible:ring-2 focus-visible:ring-[#E85D04]"
              >
                <span>
                  <span className="block text-sm font-semibold text-[#1C1917]">
                    {service.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-[#78716C]">
                    {cardDescription(service.slug)}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-[#E85D04]" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
