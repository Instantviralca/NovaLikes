import { NextResponse } from 'next/server';

import { ensureAccountDbReady } from '@/lib/customers/http';
import { getCustomerFromCookies, toCustomerPublic } from '@/lib/customers/session';

export const runtime = 'nodejs';

export async function GET() {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const customer = await getCustomerFromCookies();
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const pub = toCustomerPublic(customer);
  return NextResponse.json({
    ok: true,
    name: pub.name,
    email: pub.email,
    verified: pub.verified,
    hasPassword: pub.hasPassword,
  });
}
