import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { issueEmailCode, verifyEmailCode } from '@/lib/customers/codes';
import { ACCOUNT_COPY } from '@/lib/customers/messages';
import { resetCustomerStoreForTests } from '@/lib/customers/store';

describe('customer email codes', () => {
  beforeEach(() => {
    resetCustomerStoreForTests();
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('issues a 6-digit code and verifies once', async () => {
    const issued = await issueEmailCode({
      email: 'a@example.com',
      purpose: 'login',
      ip: '1.2.3.4',
    });
    expect(issued.ok).toBe(true);
    if (!issued.ok) return;
    expect(issued.code).toMatch(/^\d{6}$/);

    const first = await verifyEmailCode({
      email: 'a@example.com',
      purpose: 'login',
      code: issued.code,
    });
    expect(first).toEqual({ ok: true });

    const reuse = await verifyEmailCode({
      email: 'a@example.com',
      purpose: 'login',
      code: issued.code,
    });
    expect(reuse.ok).toBe(false);
    if (!reuse.ok) expect(reuse.error).toBe(ACCOUNT_COPY.invalidCode);
  });

  it('rejects after expiry', async () => {
    vi.useFakeTimers();
    const base = new Date('2026-10-10T12:00:00.000Z');
    vi.setSystemTime(base);

    const issued = await issueEmailCode({
      email: 'b@example.com',
      purpose: 'signup_verify',
      ip: '1.2.3.4',
    });
    expect(issued.ok).toBe(true);
    if (!issued.ok) return;

    vi.setSystemTime(new Date(base.getTime() + 11 * 60 * 1000));
    const result = await verifyEmailCode({
      email: 'b@example.com',
      purpose: 'signup_verify',
      code: issued.code,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe(ACCOUNT_COPY.expiredCode);
  });

  it('caps wrong attempts at 5', async () => {
    const issued = await issueEmailCode({
      email: 'c@example.com',
      purpose: 'login',
      ip: '1.2.3.4',
    });
    expect(issued.ok).toBe(true);
    if (!issued.ok) return;

    for (let i = 0; i < 4; i += 1) {
      const wrong = await verifyEmailCode({
        email: 'c@example.com',
        purpose: 'login',
        code: '000000',
      });
      expect(wrong.ok).toBe(false);
      if (!wrong.ok) expect(wrong.error).toBe(ACCOUNT_COPY.invalidCode);
    }

    const fifth = await verifyEmailCode({
      email: 'c@example.com',
      purpose: 'login',
      code: '000000',
    });
    expect(fifth.ok).toBe(false);
    if (!fifth.ok) {
      expect(fifth.error).toBe(ACCOUNT_COPY.tooManyAttempts);
      expect(fifth.status).toBe(429);
    }

    const evenCorrect = await verifyEmailCode({
      email: 'c@example.com',
      purpose: 'login',
      code: issued.code,
    });
    expect(evenCorrect.ok).toBe(false);
  });

  it('enforces resend cooldown', async () => {
    const first = await issueEmailCode({
      email: 'd@example.com',
      purpose: 'login',
      ip: '9.9.9.9',
    });
    expect(first.ok).toBe(true);

    const second = await issueEmailCode({
      email: 'd@example.com',
      purpose: 'login',
      ip: '9.9.9.9',
    });
    expect(second.ok).toBe(false);
    if (!second.ok) {
      expect(second.status).toBe(429);
      expect(second.error).toBe(ACCOUNT_COPY.tooManyAttempts);
    }
  });
});
