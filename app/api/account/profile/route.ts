import { NextResponse } from 'next/server';

import {
  ensureAccountDbReady,
  MAX_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MAX_WHATSAPP_LENGTH,
  normalizeUsername,
} from '@/lib/customers/http';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  requireCustomer,
  toCustomerPublic,
} from '@/lib/customers/session';
import { updateCustomer } from '@/lib/customers/store';

export const runtime = 'nodejs';

export async function PATCH(request: Request) {
  const unavailable = ensureAccountDbReady();
  if (unavailable) return unavailable;

  const customer = await requireCustomer(request);
  if (!customer) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let body: {
    name?: string | null;
    marketingOptIn?: boolean;
    whatsappNumber?: string | null;
    tiktokUsername?: string | null;
    instagramUsername?: string | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const name =
    body.name === undefined
      ? customer.name
      : body.name === null
        ? null
        : String(body.name).trim().slice(0, MAX_NAME_LENGTH) || null;

  const whatsappNumber =
    body.whatsappNumber === undefined
      ? customer.whatsappNumber
      : body.whatsappNumber === null || body.whatsappNumber === ''
        ? null
        : String(body.whatsappNumber).trim().slice(0, MAX_WHATSAPP_LENGTH);

  const tiktokUsername =
    body.tiktokUsername === undefined
      ? customer.tiktokUsername
      : normalizeUsername(body.tiktokUsername)?.slice(0, MAX_USERNAME_LENGTH) ?? null;

  const instagramUsername =
    body.instagramUsername === undefined
      ? customer.instagramUsername
      : normalizeUsername(body.instagramUsername)?.slice(0, MAX_USERNAME_LENGTH) ??
        null;

  const updated = await updateCustomer(customer.id, {
    name,
    marketingOptIn:
      body.marketingOptIn === undefined
        ? customer.marketingOptIn
        : Boolean(body.marketingOptIn),
    whatsappNumber,
    tiktokUsername,
    instagramUsername,
  });

  return NextResponse.json({
    ok: true,
    message: ACCOUNT_COPY.saved,
    customer: toCustomerPublic(updated ?? customer),
  });
}
