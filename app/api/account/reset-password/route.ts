import { NextResponse } from 'next/server';

import { hashPassword } from '@/lib/cms/passwords';
import { claimGuestOrders } from '@/lib/customers/claim-orders';
import { verifyEmailCode } from '@/lib/customers/codes';
import {
  ensureAccountDbReady,
  MIN_PASSWORD_LENGTH,
} from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  applyCustomerSessionCookies,
  createCustomerSession,
  revokeAllCustomerSessions,
  toCustomerPublic,
} from '@/lib/customers/session';
import { getCustomerByEmail, updateCustomer } from '@/lib/customers/store';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const limited = consumePublicRouteLimit(
    'accountVerify',
    clientIpFromRequestHeaders(request.headers),
  );
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  let body: { email?: string; code?: string; newPassword?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const code = (body.code ?? '').trim();
  const newPassword = body.newPassword ?? '';

  if (!email.includes('@') || !code) {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.weakPassword },
      { status: 400 },
    );
  }

  const verified = await verifyEmailCode({
    email,
    purpose: 'password_reset',
    code,
  });
  if (!verified.ok) {
    return NextResponse.json(
      { ok: false, error: verified.error },
      { status: verified.status },
    );
  }

  const customer = await getCustomerByEmail(email);
  if (!customer) {
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.invalidCode },
      { status: 400 },
    );
  }

  const updated =
    (await updateCustomer(customer.id, {
      passwordHash: await hashPassword(newPassword),
      emailVerifiedAt: customer.emailVerifiedAt ?? new Date().toISOString(),
    })) ?? customer;

  await revokeAllCustomerSessions(updated.id);
  await claimGuestOrders(updated);
  const session = await createCustomerSession(updated);
  const response = NextResponse.json({
    ok: true,
    customer: toCustomerPublic(updated),
    message: 'Your password has been updated.',
  });
  applyCustomerSessionCookies(response, session.token, session.csrfToken);
  return response;
}
