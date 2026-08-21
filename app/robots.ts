import type { MetadataRoute } from 'next';

import { getRobotsRules, getSitemapUrl } from '@/seo/robots';

/**
 * Production robots.txt — Document 14.08.
 * Disallows transactional/private/admin/API/preview routes; references sitemap.xml.
 * Does not block public CSS, JS, images, or fonts.
 *
 * Pages that are noindex in metadata (e.g. /track-order) stay crawlable here so
 * Google can still fetch the HTML and honor the noindex directive.
 */
export default function robots(): MetadataRoute.Robots {
  const [primary] = getRobotsRules();

  return {
    rules: {
      userAgent: primary?.userAgent ?? '*',
      allow: primary?.allow ?? ['/'],
      disallow: primary?.disallow ?? [],
    },
    sitemap: getSitemapUrl(),
    host: 'novalikes.com',
  };
}
