import { NextResponse } from 'next/server';

import { ACCOUNT_COPY } from '@/lib/customers/messages';
import { isDbReady } from '@/lib/customers/ready';

export function accountUnavailableResponse() {
  return NextResponse.json(
    { ok: false, error: ACCOUNT_COPY.unavailable },
    { status: 503 },
  );
}

export function ensureAccountDbReady() {
  if (!isDbReady()) return accountUnavailableResponse();
  return null;
}

export function normalizeUsername(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/^@+/, '').toLowerCase();
  return trimmed || null;
}

export const MIN_PASSWORD_LENGTH = 10;
export const MAX_NAME_LENGTH = 80;
export const MAX_USERNAME_LENGTH = 64;
export const MAX_WHATSAPP_LENGTH = 32;
