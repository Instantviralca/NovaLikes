import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ensureAccountDbReady } from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  CUSTOMER_SESSION_COOKIE,
  requireCustomer,
  revokeOtherCustomerSessions,
  verifyCustomerSessionSignature,
} from '@/lib/customers/session';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const customer = await requireCustomer(request);
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const payload = verifyCustomerSessionSignature(token);
  if (payload?.sid) {
    await revokeOtherCustomerSessions(customer.id, payload.sid);
  }

  return NextResponse.json({
    ok: true,
    message: ACCOUNT_COPY.signedOutEverywhere,
  });
}
