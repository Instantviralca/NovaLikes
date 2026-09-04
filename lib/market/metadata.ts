import type { Metadata } from 'next';

import type { CoreServiceSlug } from '@/lib/i18n/config';
import { absoluteUrl, buildCanonicalUrl } from '@/lib/seo/metadata/canonical';
import { buildPageMetadata } from '@/lib/seo/metadata/build';
import { hreflangMapWithMarket, localizeMarketHref } from '@/lib/market/paths';
import { MARKET_HREFLANG, MARKET_OG_LOCALE, type Market } from '@/lib/market/config';

export function buildMarketMetadata(options: {
  market: Market;
  pathname: string;
  title: string;
  description: string;
}): Metadata {
  const { market, pathname, title, description } = options;
  const canonicalPath = localizeMarketHref(pathname, market);
  const languages: Record<string, string> = {};
  for (const [code, path] of Object.entries(hreflangMapWithMarket(pathname))) {
    languages[code] = absoluteUrl(path);
  }

  const metadata = buildPageMetadata({
    title,
    description,
    path: canonicalPath,
    type: 'website',
    robots: { index: true, follow: true },
  });

  return {
    ...metadata,
    alternates: {
      canonical: buildCanonicalUrl(canonicalPath),
      languages,
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      locale: MARKET_OG_LOCALE[market],
      url: buildCanonicalUrl(canonicalPath),
    },
    other: {
      language: MARKET_HREFLANG[market],
      'content-language': MARKET_HREFLANG[market],
    },
  };
}

export function marketServiceMetadata(
  market: Market,
  slug: CoreServiceSlug,
  title: string,
  description: string,
): Metadata {
  return buildMarketMetadata({
    market,
    pathname: `/${slug}`,
    title,
    description,
  });
}
