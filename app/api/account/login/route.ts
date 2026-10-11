import { NextResponse } from 'next/server';

import { verifyPassword } from '@/lib/cms/passwords';
import { claimGuestOrders } from '@/lib/customers/claim-orders';
import { issueEmailCode } from '@/lib/customers/codes';
import { sendAccountCodeEmail } from '@/lib/customers/email';
import { ensureAccountDbReady } from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  applyCustomerSessionCookies,
  createCustomerSession,
  hashCustomerEmail,
  hashCustomerIp,
  toCustomerPublic,
} from '@/lib/customers/session';
import {
  countRecentFailures,
  getCustomerByEmail,
  recordLoginAttempt,
} from '@/lib/customers/store';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';

export const runtime = 'nodejs';

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const ip = clientIpFromRequestHeaders(request.headers);
  const limited = consumePublicRouteLimit('accountLogin', ip);
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.invalidLogin },
      { status: 401 },
    );
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  const ipHash = hashCustomerIp(ip);
  const emailHash = hashCustomerEmail(email);
  const since = new Date(Date.now() - LOGIN_WINDOW_MS).toISOString();
  const failures = await countRecentFailures(ipHash, emailHash, since);
  if (failures >= MAX_FAILURES) {
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.tooManyAttempts },
      { status: 429 },
    );
  }

  const customer = await getCustomerByEmail(email);
  if (!customer || !customer.passwordHash) {
    await recordLoginAttempt({ ipHash, emailHash, success: false });
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.invalidLogin },
      { status: 401 },
    );
  }

  const ok = await verifyPassword(password, customer.passwordHash);
  if (!ok) {
    await recordLoginAttempt({ ipHash, emailHash, success: false });
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.invalidLogin },
      { status: 401 },
    );
  }

  if (!customer.emailVerifiedAt) {
    const issued = await issueEmailCode({
      email,
      purpose: 'signup_verify',
      ip,
    });
    if (issued.ok) {
      try {
        await sendAccountCodeEmail({
          to: email,
          purpose: 'signup_verify',
          code: issued.code,
        });
      } catch (error) {
        console.error('[account/login] verify email failed', {
          message: error instanceof Error ? error.message : 'unknown',
        });
      }
    }
    return NextResponse.json({
      ok: false,
      needsVerification: true,
      error: ACCOUNT_COPY.unverified,
    });
  }

  await recordLoginAttempt({ ipHash, emailHash, success: true });
  await claimGuestOrders(customer);
  const session = await createCustomerSession(customer);
  const response = NextResponse.json({
    ok: true,
    customer: toCustomerPublic(customer),
  });
  applyCustomerSessionCookies(response, session.token, session.csrfToken);
  return response;
}
