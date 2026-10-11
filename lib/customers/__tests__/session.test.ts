import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createCustomerSession,
  resolveCustomerFromToken,
  revokeCustomerSession,
  verifyCustomerSessionSignature,
} from '@/lib/customers/session';
import {
  insertCustomer,
  resetCustomerStoreForTests,
} from '@/lib/customers/store';

describe('customer sessions', () => {
  beforeEach(() => {
    resetCustomerStoreForTests();
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves a fresh session', async () => {
    const customer = await insertCustomer({
      email: 'sess@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const { token } = await createCustomerSession(customer);
    const resolved = await resolveCustomerFromToken(token);
    expect(resolved?.id).toBe(customer.id);
  });

  it('rejects a tampered signature', async () => {
    const customer = await insertCustomer({
      email: 'tamper@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const { token } = await createCustomerSession(customer);
    const [body] = token.split('.');
    const bad = `${body}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    expect(verifyCustomerSessionSignature(bad)).toBeNull();
    expect(await resolveCustomerFromToken(bad)).toBeNull();
  });

  it('rejects an expired session', async () => {
    vi.useFakeTimers();
    const base = new Date('2026-01-01T00:00:00.000Z');
    vi.setSystemTime(base);

    const customer = await insertCustomer({
      email: 'exp@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const { token } = await createCustomerSession(customer);
    expect(await resolveCustomerFromToken(token)).not.toBeNull();

    vi.setSystemTime(new Date(base.getTime() + 31 * 24 * 60 * 60 * 1000));
    expect(verifyCustomerSessionSignature(token)).toBeNull();
    expect(await resolveCustomerFromToken(token)).toBeNull();
  });

  it('rejects revoked sessions', async () => {
    const customer = await insertCustomer({
      email: 'rev@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    const { token } = await createCustomerSession(customer);
    await revokeCustomerSession(token);
    expect(await resolveCustomerFromToken(token)).toBeNull();
  });
});
