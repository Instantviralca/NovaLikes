/**
 * Targeted lowercase normalization for known public duplicate routes.
 * Intentionally not a generic pathname lowercaser — that would risk
 * image assets, API routes, signed URLs, and admin paths.
 */

export const LOWERCASE_PUBLIC_PATHS = ['/faq', '/about'] as const;

const LOWERCASE_PUBLIC_PATH_SET = new Set<string>(LOWERCASE_PUBLIC_PATHS);

/**
 * Return the canonical lowercase path when `pathname` is a case duplicate
 * of a known public page. Otherwise null.
 */
export function getLowercasePublicRedirect(pathname: string): string | null {
  if (!pathname || pathname === pathname.toLowerCase()) return null;

  const pathOnly = pathname.split(/[?#]/)[0] ?? pathname;
  if (pathOnly !== pathOnly.toLowerCase()) {
    const lower = pathOnly.toLowerCase();
    if (LOWERCASE_PUBLIC_PATH_SET.has(lower)) return lower;
  }

  return null;
}
