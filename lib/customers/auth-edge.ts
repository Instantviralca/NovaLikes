/**
 * Edge-safe customer session check (signature + expiry only — no DB).
 */

export const CUSTOMER_SESSION_COOKIE = 'nl_customer_session';

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function resolveEdgeSecret(): Promise<string | null> {
  const dedicated = process.env.NL_CUSTOMER_SESSION_SECRET?.trim();
  if (dedicated) return dedicated;
  const admin =
    process.env.IV_ADMIN_SESSION_SECRET?.trim() ||
    process.env.SESSION_SECRET?.trim() ||
    process.env.IV_SHARED_SECRET?.trim();
  if (admin) return sha256Hex(`customer:${admin}`);
  if (process.env.NODE_ENV === 'production' && process.env.IV_ENV !== 'test') {
    return null;
  }
  return 'dev-only-insecure-customer-secret';
}

async function hmacSign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  const bytes = new Uint8Array(signature);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function verifyCustomerSessionTokenEdge(
  token: string | undefined | null,
): Promise<boolean> {
  const secret = await resolveEdgeSecret();
  if (!secret || !token || !token.includes('.')) return false;
  const [body, signature] = token.split('.');
  if (!body || !signature) return false;
  const expected = await hmacSign(body, secret);
  if (!timingSafeEqualString(signature, expected)) return false;
  try {
    const padded = body.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
    const payload = JSON.parse(json) as {
      role?: string;
      uid?: string;
      exp?: number;
    };
    if (payload.role !== 'customer' || !payload.uid) return false;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
