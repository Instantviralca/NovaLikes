import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';

import {
  consumeEmailCode,
  countEmailCodesForIpSince,
  countEmailCodesSince,
  createEmailCodeRow,
  getLatestActiveEmailCode,
  getLatestEmailCodeAny,
  incrementEmailCodeAttempts,
} from '@/lib/customers/store';
import type { EmailCodePurpose } from '@/lib/customers/types';
import { getCustomerSessionSecret, hashCustomerIp } from '@/lib/customers/session';
import { ACCOUNT_COPY } from '@/lib/customers/messages';

const CODE_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_SENDS_PER_EMAIL_HOUR = 5;
const MAX_SENDS_PER_IP_HOUR = 20;

export type CodeIssueResult =
  | { ok: true; code: string; expiresAt: string }
  | { ok: false; error: string; status: number };

export type CodeVerifyResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

function hashCode(email: string, purpose: EmailCodePurpose, code: string): string {
  const pepper = getCustomerSessionSecret();
  return createHmac('sha256', pepper)
    .update(`${email.trim().toLowerCase()}|${purpose}|${code}`)
    .digest('hex');
}

function codesEqual(a: string, b: string): boolean {
  try {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export async function issueEmailCode(input: {
  email: string;
  purpose: EmailCodePurpose;
  ip: string;
}): Promise<CodeIssueResult> {
  const email = input.email.trim().toLowerCase();
  const ipHash = hashCustomerIp(input.ip);
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const emailSends = await countEmailCodesSince(email, input.purpose, hourAgo);
  if (emailSends >= MAX_SENDS_PER_EMAIL_HOUR) {
    return { ok: false, error: ACCOUNT_COPY.tooManyAttempts, status: 429 };
  }
  const ipSends = await countEmailCodesForIpSince(ipHash, hourAgo);
  if (ipSends >= MAX_SENDS_PER_IP_HOUR) {
    return { ok: false, error: ACCOUNT_COPY.tooManyAttempts, status: 429 };
  }

  const latest = await getLatestEmailCodeAny(email, input.purpose);
  if (latest) {
    const age = Date.now() - new Date(latest.createdAt).getTime();
    if (age < RESEND_COOLDOWN_MS) {
      return { ok: false, error: ACCOUNT_COPY.tooManyAttempts, status: 429 };
    }
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
  const expiresAt = new Date(Date.now() + CODE_TTL_MS).toISOString();
  await createEmailCodeRow({
    email,
    purpose: input.purpose,
    codeHash: hashCode(email, input.purpose, code),
    expiresAt,
    ipHash,
  });
  return { ok: true, code, expiresAt };
}

export async function verifyEmailCode(input: {
  email: string;
  purpose: EmailCodePurpose;
  code: string;
}): Promise<CodeVerifyResult> {
  const email = input.email.trim().toLowerCase();
  const code = input.code.trim();
  const active = await getLatestActiveEmailCode(email, input.purpose);
  if (!active) {
    const any = await getLatestEmailCodeAny(email, input.purpose);
    if (any && any.consumedAt) {
      return { ok: false, error: ACCOUNT_COPY.invalidCode, status: 400 };
    }
    if (any && new Date(any.expiresAt).getTime() < Date.now()) {
      return { ok: false, error: ACCOUNT_COPY.expiredCode, status: 400 };
    }
    return { ok: false, error: ACCOUNT_COPY.invalidCode, status: 400 };
  }

  if (active.attempts >= MAX_ATTEMPTS) {
    return { ok: false, error: ACCOUNT_COPY.tooManyAttempts, status: 429 };
  }

  const expected = hashCode(email, input.purpose, code);
  if (!codesEqual(expected, active.codeHash)) {
    const attempts = await incrementEmailCodeAttempts(active.id);
    if (attempts >= MAX_ATTEMPTS) {
      return { ok: false, error: ACCOUNT_COPY.tooManyAttempts, status: 429 };
    }
    return { ok: false, error: ACCOUNT_COPY.invalidCode, status: 400 };
  }

  await consumeEmailCode(active.id);
  return { ok: true };
}
