import { CORE_SERVICE_SLUGS, isCoreServiceSlug } from '../i18n/config';

/**
 * Destination for a public `/us` (or US alias) path — root English equivalent.
 * Returns null when the path is not a US market/alias URL.
 * Query string is preserved by the caller (redirect URL clone).
 *
 * Kept free of `@/` imports so next.config can load `getUsMarketPermanentRedirects`.
 */
export function usMarketRedirectDestination(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  const first = parts[0]!.toLowerCase();

  // Country-name aliases → root in a single hop (never via /us).
  if (first === 'usa' || first === 'united-states') {
    return '/';
  }

  if (first !== 'us') return null;

  if (parts.length === 1) return '/';

  const rest = `/${parts.slice(1).join('/')}`.replace(/\/+$/, '') || '/';
  if (rest === '/') return '/';
  if (rest.startsWith('/buy-') && isCoreServiceSlug(rest.slice(1))) return rest;
  return '/';
}

/** Permanent redirects for next.config — /us homepage + 10 core services + aliases. */
export function getUsMarketPermanentRedirects(): Array<{
  source: string;
  destination: string;
  permanent: boolean;
}> {
  const redirects = [
    { source: '/us', destination: '/', permanent: true },
    { source: '/us/', destination: '/', permanent: true },
    { source: '/usa', destination: '/', permanent: true },
    { source: '/usa/', destination: '/', permanent: true },
    { source: '/united-states', destination: '/', permanent: true },
    { source: '/united-states/', destination: '/', permanent: true },
  ];
  for (const slug of CORE_SERVICE_SLUGS) {
    redirects.push({
      source: `/us/${slug}`,
      destination: `/${slug}`,
      permanent: true,
    });
  }
  return redirects;
}
