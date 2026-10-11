const CUSTOMER_CSRF_COOKIE = 'nl_customer_csrf';

export function readCustomerCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CUSTOMER_CSRF_COOKIE}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(CUSTOMER_CSRF_COOKIE.length + 1));
}

export async function accountFetch(
  input: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (!headers.has('content-type') && init.body) {
    headers.set('content-type', 'application/json');
  }
  const method = (init.method ?? 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = readCustomerCsrfToken();
    if (csrf) headers.set('x-csrf-token', csrf);
  }
  return fetch(input, { ...init, headers, credentials: 'same-origin' });
}
