export function readCmsCsrfToken(input?: string): string {
  if (typeof document === 'undefined') return '';
  const preferAdmin = Boolean(input?.startsWith('/api/admin/'));
  const names = preferAdmin ? ['iv_admin_csrf', 'nl_author_csrf'] : ['nl_author_csrf', 'iv_admin_csrf'];
  const cookies = document.cookie.split('; ');
  for (const name of names) {
    const row = cookies.find((item) => item.startsWith(`${name}=`));
    if (row) return decodeURIComponent(row.slice(name.length + 1));
  }
  return '';
}

export async function cmsFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (init.method && init.method !== 'GET' && init.method !== 'HEAD') {
    headers.set('x-csrf-token', readCmsCsrfToken(input));
  }
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  return fetch(input, { ...init, headers });
}
