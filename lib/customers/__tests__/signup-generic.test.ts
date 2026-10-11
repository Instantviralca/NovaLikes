import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ACCOUNT_COPY } from '@/lib/customers/messages';
import {
  getCustomerByEmail,
  insertCustomer,
  resetCustomerStoreForTests,
} from '@/lib/customers/store';
import { hashPassword } from '@/lib/cms/passwords';
import { resetHttpRateLimits } from '@/lib/http/rate-limit';

vi.mock('@/lib/customers/email', () => ({
  sendAccountCodeEmail: vi.fn(async () => undefined),
  sendAccountEmail: vi.fn(async () => null),
}));

describe('signup / code generic responses', () => {
  beforeEach(() => {
    resetCustomerStoreForTests();
    resetHttpRateLimits();
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
  });

  it('signup returns the same generic success for new and existing emails', async () => {
    const { POST } = await import('@/app/api/account/signup/route');

    const newRes = await POST(
      new Request('http://localhost/api/account/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.1' },
        body: JSON.stringify({
          name: 'Ada',
          email: 'new@example.com',
          password: 'long-enough-password',
          marketingOptIn: false,
        }),
      }),
    );
    const newJson = (await newRes.json()) as { ok: boolean; message: string };
    expect(newRes.status).toBe(200);
    expect(newJson).toEqual({ ok: true, message: ACCOUNT_COPY.genericSent });
    expect(await getCustomerByEmail('new@example.com')).not.toBeNull();

    await insertCustomer({
      email: 'exists@example.com',
      passwordHash: await hashPassword('long-enough-password'),
    });

    const existRes = await POST(
      new Request('http://localhost/api/account/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.2' },
        body: JSON.stringify({
          name: 'Bob',
          email: 'exists@example.com',
          password: 'long-enough-password',
          marketingOptIn: true,
        }),
      }),
    );
    const existJson = (await existRes.json()) as { ok: boolean; message: string };
    expect(existRes.status).toBe(200);
    expect(existJson).toEqual(newJson);
  });

  it('code request always returns the same generic success', async () => {
    const { POST } = await import('@/app/api/account/code/route');

    const unknown = await POST(
      new Request('http://localhost/api/account/code', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.3' },
        body: JSON.stringify({ email: 'nobody@example.com', purpose: 'password_reset' }),
      }),
    );
    const knownCustomer = await insertCustomer({
      email: 'known@example.com',
      emailVerifiedAt: new Date().toISOString(),
    });
    void knownCustomer;

    const known = await POST(
      new Request('http://localhost/api/account/code', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.4' },
        body: JSON.stringify({ email: 'known@example.com', purpose: 'login' }),
      }),
    );

    expect(await unknown.json()).toEqual({
      ok: true,
      message: ACCOUNT_COPY.genericSent,
    });
    expect(await known.json()).toEqual({
      ok: true,
      message: ACCOUNT_COPY.genericSent,
    });
  });
});
