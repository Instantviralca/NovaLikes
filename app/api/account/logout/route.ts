import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ensureAccountDbReady } from '@/lib/customers/http';
import {
  clearCustomerSessionCookies,
  CUSTOMER_SESSION_COOKIE,
  revokeCustomerSession,
} from '@/lib/customers/session';

export const runtime = 'nodejs';

export async function POST() {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  await revokeCustomerSession(token);

  const response = NextResponse.json({ ok: true });
  clearCustomerSessionCookies(response);
  return response;
}
