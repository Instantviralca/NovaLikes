import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'node:crypto';
import { cookies } from 'next/headers';

import { verifyCsrfToken } from '@/lib/admin/auth';
import { getAdminSessionSecret, isProductionRuntime } from '@/lib/config/env';
import { isDbReady } from '@/lib/customers/ready';
import {
  createCustomerSessionRow,
  getCustomerById,
  getCustomerSessionByHash,
  revokeAllCustomerSessions as revokeAllSessionsInStore,
  revokeOtherCustomerSessions as revokeOtherSessionsInStore,
  revokeCustomerSessionByHash,
  touchCustomerSession,
  updateCustomer,
} from '@/lib/customers/store';
import type { CustomerRecord } from '@/lib/customers/types';
import { toCustomerPublic } from '@/lib/customers/types';

export const CUSTOMER_SESSION_COOKIE = 'nl_customer_session';
export const CUSTOMER_CSRF_COOKIE = 'nl_customer_csrf';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const TOUCH_INTERVAL_MS = 1000 * 60 * 60 * 24;

export type CustomerSessionPayload = {
  role: 'customer';
  uid: string;
  sid: string;
  exp: number;
};

export function getCustomerSessionSecret(): string {
  const dedicated = process.env.NL_CUSTOMER_SESSION_SECRET?.trim();
  if (dedicated) return dedicated;
  const admin = getAdminSessionSecret();
  if (admin) {
    return createHash('sha256').update(`customer:${admin}`).digest('hex');
  }
  if (isProductionRuntime()) {
    throw new Error('NL_CUSTOMER_SESSION_SECRET or IV_ADMIN_SESSION_SECRET is required.');
  }
  return 'dev-only-insecure-customer-secret';
}

function sign(value: string): string {
  return createHmac('sha256', getCustomerSessionSecret()).update(value).digest('base64url');
}

export function hashCustomerToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function hashCustomerIp(ip: string): string {
  return createHash('sha256').update(`customer-ip:${ip}`).digest('hex').slice(0, 32);
}

export function hashCustomerEmail(email: string): string {
  return createHash('sha256')
    .update(`customer-email:${email.trim().toLowerCase()}`)
    .digest('hex')
    .slice(0, 32);
}

export function getCustomerSessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function getCustomerCsrfCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export function verifyCustomerSessionSignature(
  token: string | undefined | null,
): CustomerSessionPayload | null {
  if (!token || !token.includes('.')) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as CustomerSessionPayload;
    if (payload.role !== 'customer' || !payload.uid || !payload.sid) return null;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createCustomerSession(customer: CustomerRecord): Promise<{
  token: string;
  csrfToken: string;
}> {
  const sid = randomBytes(16).toString('hex');
  const payload: CustomerSessionPayload = {
    role: 'customer',
    uid: customer.id,
    sid,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const token = `${body}.${sign(body)}`;
  const csrfToken = randomBytes(24).toString('base64url');
  await createCustomerSessionRow({
    id: sid,
    customerId: customer.id,
    tokenHash: hashCustomerToken(token),
    expiresAt: new Date(payload.exp).toISOString(),
  });
  await updateCustomer(customer.id, { lastLoginAt: new Date().toISOString() });
  return { token, csrfToken };
}

export async function resolveCustomerFromToken(
  token: string | undefined | null,
): Promise<CustomerRecord | null> {
  if (!isDbReady()) return null;
  const payload = verifyCustomerSessionSignature(token);
  if (!payload || !token) return null;
  const session = await getCustomerSessionByHash(hashCustomerToken(token));
  if (!session || session.revokedAt) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) return null;
  if (session.id !== payload.sid || session.customerId !== payload.uid) return null;
  const customer = await getCustomerById(payload.uid);
  if (!customer || customer.status !== 'active') return null;

  const lastSeen = session.lastSeenAt ? new Date(session.lastSeenAt).getTime() : 0;
  if (Date.now() - lastSeen >= TOUCH_INTERVAL_MS) {
    const newExp = new Date(Date.now() + SESSION_TTL_MS).toISOString();
    await touchCustomerSession(session.id, newExp);
  }
  return customer;
}

export async function requireCustomer(request: Request): Promise<CustomerRecord | null> {
  if (!isDbReady()) return null;
  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const customer = await resolveCustomerFromToken(token);
  if (!customer) return null;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const csrfCookie = jar.get(CUSTOMER_CSRF_COOKIE)?.value;
    const csrfHeader = request.headers.get('x-csrf-token') ?? undefined;
    if (!verifyCsrfToken(csrfCookie, csrfHeader)) return null;
  }
  return customer;
}

export async function revokeCustomerSession(
  token: string | undefined | null,
): Promise<void> {
  if (!token) return;
  await revokeCustomerSessionByHash(hashCustomerToken(token));
}

export async function revokeAllCustomerSessions(customerId: string): Promise<void> {
  await revokeAllSessionsInStore(customerId);
}

export async function revokeOtherCustomerSessions(
  customerId: string,
  keepSessionId: string,
): Promise<void> {
  await revokeOtherSessionsInStore(customerId, keepSessionId);
}

export async function getCustomerFromCookies(): Promise<CustomerRecord | null> {
  if (!isDbReady()) return null;
  const jar = await cookies();
  return resolveCustomerFromToken(jar.get(CUSTOMER_SESSION_COOKIE)?.value);
}

export function applyCustomerSessionCookies(
  response: {
    cookies: {
      set: (
        name: string,
        value: string,
        options?: Record<string, unknown>,
      ) => void;
    };
  },
  token: string,
  csrfToken: string,
): void {
  response.cookies.set(
    CUSTOMER_SESSION_COOKIE,
    token,
    getCustomerSessionCookieOptions(),
  );
  response.cookies.set(
    CUSTOMER_CSRF_COOKIE,
    csrfToken,
    getCustomerCsrfCookieOptions(),
  );
}

export function clearCustomerSessionCookies(response: {
  cookies: {
    set: (
      name: string,
      value: string,
      options?: Record<string, unknown>,
    ) => void;
  };
}): void {
  response.cookies.set(CUSTOMER_SESSION_COOKIE, '', {
    ...getCustomerSessionCookieOptions(0),
    maxAge: 0,
  });
  response.cookies.set(CUSTOMER_CSRF_COOKIE, '', {
    ...getCustomerCsrfCookieOptions(0),
    maxAge: 0,
  });
}

export { toCustomerPublic };
