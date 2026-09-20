/**
 * Author CMS route helpers — keep /author dashboard separate from public /authors.
 *
 * Unsafe: pathname.startsWith('/author') also matches /authors and /authors/*.
 * Safe: exact /author or /author/* only.
 */

export function isAuthorCmsPath(pathname: string): boolean {
  return pathname === '/author' || pathname.startsWith('/author/');
}

export function isAuthorCmsLoginPath(pathname: string): boolean {
  return pathname === '/author/login' || pathname.startsWith('/author/login/');
}

/**
 * Allow only same-origin CMS author paths as post-login destinations.
 * Public /authors profiles must never be accepted as a `next` target.
 */
export function safeAuthorNextPath(value: unknown): string {
  if (typeof value !== 'string') return '/author';
  const path = value.trim();
  if (!isAuthorCmsPath(path)) return '/author';
  if (path.startsWith('//') || path.includes('\\') || path.includes('://')) {
    return '/author';
  }
  return path;
}
