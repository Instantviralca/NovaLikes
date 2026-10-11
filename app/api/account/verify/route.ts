import { NextResponse } from 'next/server';

import { claimGuestOrders } from '@/lib/customers/claim-orders';
import { verifyEmailCode } from '@/lib/customers/codes';
import { ensureAccountDbReady } from '@/lib/customers/http';
import {
  applyCustomerSessionCookies,
  createCustomerSession,
  toCustomerPublic,
} from '@/lib/customers/session';
import {
  getCustomerByEmail,
  insertCustomer,
  updateCustomer,
} from '@/lib/customers/store';
import type { EmailCodePurpose } from '@/lib/customers/types';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';

export const runtime = 'nodejs';

const ALLOWED: EmailCodePurpose[] = ['signup_verify', 'login', 'password_reset'];

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const limited = consumePublicRouteLimit(
    'accountVerify',
    clientIpFromRequestHeaders(request.headers),
  );
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  let body: { email?: string; code?: string; purpose?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const code = (body.code ?? '').trim();
  const purpose = body.purpose as EmailCodePurpose;
  if (!email.includes('@') || !code || !ALLOWED.includes(purpose)) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const verified = await verifyEmailCode({ email, purpose, code });
  if (!verified.ok) {
    return NextResponse.json(
      { ok: false, error: verified.error },
      { status: verified.status },
    );
  }

  if (purpose === 'password_reset') {
    return NextResponse.json({ ok: true, purpose });
  }

  let customer = await getCustomerByEmail(email);
  if (!customer && purpose === 'login') {
    customer = await insertCustomer({
      email,
      emailVerifiedAt: new Date().toISOString(),
    });
  }
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (!customer.emailVerifiedAt) {
    customer =
      (await updateCustomer(customer.id, {
        emailVerifiedAt: new Date().toISOString(),
      })) ?? customer;
  }

  await claimGuestOrders(customer);
  const session = await createCustomerSession(customer);
  const response = NextResponse.json({
    ok: true,
    customer: toCustomerPublic(customer),
  });
  applyCustomerSessionCookies(response, session.token, session.csrfToken);
  return response;
}
