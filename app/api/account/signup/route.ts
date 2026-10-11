import { NextResponse } from 'next/server';

import { hashPassword } from '@/lib/cms/passwords';
import { issueEmailCode } from '@/lib/customers/codes';
import { shouldExposeAccountDevCodes } from '@/lib/customers/dev-codes';
import { sendAccountCodeEmail } from '@/lib/customers/email';
import {
  ensureAccountDbReady,
  MIN_PASSWORD_LENGTH,
} from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import { getCustomerByEmail, insertCustomer } from '@/lib/customers/store';
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
    'accountSignup',
    clientIpFromRequestHeaders(request.headers),
  );
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  let body: {
    name?: string;
    email?: string;
    password?: string;
    marketingOptIn?: boolean;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  const name = (body.name ?? '').trim();
  const ip = clientIpFromRequestHeaders(request.headers);

  if (!email.includes('@') || password.length < MIN_PASSWORD_LENGTH) {
    if (password.length > 0 && password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { ok: false, error: ACCOUNT_COPY.weakPassword },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { ok: true, message: ACCOUNT_COPY.genericSent },
      { status: 200 },
    );
  }

  const existing = await getCustomerByEmail(email);
  if (existing) {
    const issued = await issueEmailCode({ email, purpose: 'login', ip });
    if (issued.ok) {
      try {
        await sendAccountCodeEmail({ to: email, purpose: 'login', code: issued.code });
      } catch (error) {
        console.error('[account/signup] email failed', {
          message: error instanceof Error ? error.message : 'unknown',
        });
      }
    }
    return NextResponse.json(
      { ok: true, message: ACCOUNT_COPY.genericSent },
      { status: 200 },
    );
  }

  await insertCustomer({
    email,
    name: name || null,
    passwordHash: await hashPassword(password),
    marketingOptIn: Boolean(body.marketingOptIn),
    emailVerifiedAt: null,
  });

  const issued = await issueEmailCode({ email, purpose: 'signup_verify', ip });
  if (issued.ok) {
    try {
      await sendAccountCodeEmail({
        to: email,
        purpose: 'signup_verify',
        code: issued.code,
      });
    } catch (error) {
      console.error('[account/signup] email failed', {
        message: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  return NextResponse.json(
    {
      ok: true,
      message: ACCOUNT_COPY.genericSent,
      ...(shouldExposeAccountDevCodes() && issued.ok
        ? { devCode: issued.code }
        : {}),
    },
    { status: 200 },
  );
}
