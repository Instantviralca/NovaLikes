import { NextResponse } from 'next/server';

import { issueEmailCode } from '@/lib/customers/codes';
import { shouldExposeAccountDevCodes } from '@/lib/customers/dev-codes';
import { sendAccountCodeEmail } from '@/lib/customers/email';
import { ensureAccountDbReady } from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import { getCustomerByEmail } from '@/lib/customers/store';
import type { EmailCodePurpose } from '@/lib/customers/types';
import {
  clientIpFromRequestHeaders,
  consumePublicRouteLimit,
  rateLimitResponse,
} from '@/lib/http/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const ip = clientIpFromRequestHeaders(request.headers);
  const limited = consumePublicRouteLimit('accountCode', ip);
  if (!limited.allowed) return rateLimitResponse(limited.retryAfterSec);

  let body: { email?: string; purpose?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      { ok: true, message: ACCOUNT_COPY.genericSent },
      { status: 200 },
    );
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const purpose = body.purpose as EmailCodePurpose;
  if (
    !email.includes('@') ||
    (purpose !== 'login' && purpose !== 'password_reset')
  ) {
    return NextResponse.json(
      { ok: true, message: ACCOUNT_COPY.genericSent },
      { status: 200 },
    );
  }

  // Always generic — only send when account exists (or login allows code-only create later).
  let devCode: string | undefined;
  const existing = await getCustomerByEmail(email);
  if (existing || purpose === 'login') {
    const issued = await issueEmailCode({ email, purpose, ip });
    if (issued.ok) {
      try {
        await sendAccountCodeEmail({ to: email, purpose, code: issued.code });
      } catch (error) {
        console.error('[account/code] email failed', {
          message: error instanceof Error ? error.message : 'unknown',
        });
      }
      if (shouldExposeAccountDevCodes()) {
        devCode = issued.code;
      }
    }
  }

  return NextResponse.json(
    {
      ok: true,
      message: ACCOUNT_COPY.genericSent,
      ...(devCode ? { devCode } : {}),
    },
    { status: 200 },
  );
}
