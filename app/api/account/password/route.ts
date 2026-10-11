import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { hashPassword, verifyPassword } from '@/lib/cms/passwords';
import {
  ensureAccountDbReady,
  MIN_PASSWORD_LENGTH,
} from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  CUSTOMER_SESSION_COOKIE,
  requireCustomer,
  revokeOtherCustomerSessions,
  verifyCustomerSessionSignature,
} from '@/lib/customers/session';
import { updateCustomer } from '@/lib/customers/store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const customer = await requireCustomer(request);
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const newPassword = body.newPassword ?? '';
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { ok: false, error: ACCOUNT_COPY.weakPassword },
      { status: 400 },
    );
  }

  if (customer.passwordHash) {
    const current = body.currentPassword ?? '';
    const ok = await verifyPassword(current, customer.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: ACCOUNT_COPY.invalidLogin },
        { status: 401 },
      );
    }
  }

  await updateCustomer(customer.id, {
    passwordHash: await hashPassword(newPassword),
  });

  const jar = await cookies();
  const currentToken = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const payload = verifyCustomerSessionSignature(currentToken);
  if (payload?.sid) {
    await revokeOtherCustomerSessions(customer.id, payload.sid);
  }

  return NextResponse.json({
    ok: true,
    message: ACCOUNT_COPY.saved,
  });
}
