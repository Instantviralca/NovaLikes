import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const runtime = vi.hoisted(() => ({ forceProduction: false }));

vi.mock('@/lib/config/env', async () => {
  const actual = await vi.importActual<typeof import('@/lib/config/env')>(
    '@/lib/config/env',
  );
  return {
    ...actual,
    isProductionRuntime: () =>
      runtime.forceProduction || actual.isProductionRuntime(),
  };
});

vi.mock('@/lib/customers/email', () => ({
  sendAccountCodeEmail: vi.fn(async () => undefined),
  sendAccountEmail: vi.fn(async () => null),
}));

import { validateEnv } from '@/lib/config/env';
import { shouldExposeAccountDevCodes } from '@/lib/customers/dev-codes';
import { resetCustomerStoreForTests } from '@/lib/customers/store';
import { resetHttpRateLimits } from '@/lib/http/rate-limit';

describe('IV_ACCOUNT_DEV_CODES guard', () => {
  const previousFlag = process.env.IV_ACCOUNT_DEV_CODES;

  beforeEach(() => {
    resetCustomerStoreForTests();
    resetHttpRateLimits();
    runtime.forceProduction = false;
    delete process.env.IV_ACCOUNT_DEV_CODES;
    process.env.IV_ADMIN_SESSION_SECRET = 'test-session-secret-32chars!!';
    vi.resetModules();
  });

  afterEach(() => {
    runtime.forceProduction = false;
    if (previousFlag === undefined) delete process.env.IV_ACCOUNT_DEV_CODES;
    else process.env.IV_ACCOUNT_DEV_CODES = previousFlag;
    vi.unstubAllEnvs();
  });

  it('production + flag does not return devCode (and env:verify errors)', async () => {
    runtime.forceProduction = true;
    process.env.IV_ACCOUNT_DEV_CODES = '1';

    const { shouldExposeAccountDevCodes: expose } = await import(
      '@/lib/customers/dev-codes'
    );
    expect(expose()).toBe(false);

    const env = validateEnv({ forceProduction: true });
    expect(
      env.issues.some(
        (i) => i.key === 'IV_ACCOUNT_DEV_CODES' && i.level === 'error',
      ),
    ).toBe(true);

    const { POST } = await import('@/app/api/account/signup/route');
    const res = await POST(
      new Request('http://localhost/api/account/signup', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '10.10.0.1',
        },
        body: JSON.stringify({
          name: 'Prod',
          email: 'prod-devcode@example.com',
          password: 'long-enough-password',
          marketingOptIn: false,
        }),
      }),
    );
    const json = (await res.json()) as {
      ok: boolean;
      message: string;
      devCode?: string;
    };
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.devCode).toBeUndefined();
  });

  it('dev + flag returns devCode on signup and code routes', async () => {
    runtime.forceProduction = false;
    process.env.IV_ACCOUNT_DEV_CODES = '1';

    expect(shouldExposeAccountDevCodes()).toBe(true);

    const { POST: signupPost } = await import('@/app/api/account/signup/route');
    const signupRes = await signupPost(
      new Request('http://localhost/api/account/signup', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '10.10.0.2',
        },
        body: JSON.stringify({
          name: 'Dev',
          email: 'dev-devcode@example.com',
          password: 'long-enough-password',
          marketingOptIn: false,
        }),
      }),
    );
    const signupJson = (await signupRes.json()) as {
      ok: boolean;
      devCode?: string;
    };
    expect(signupRes.status).toBe(200);
    expect(signupJson.ok).toBe(true);
    expect(signupJson.devCode).toMatch(/^\d{6}$/);

    const { POST: codePost } = await import('@/app/api/account/code/route');
    const codeRes = await codePost(
      new Request('http://localhost/api/account/code', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '10.10.0.3',
        },
        body: JSON.stringify({
          email: 'dev-devcode@example.com',
          purpose: 'login',
        }),
      }),
    );
    const codeJson = (await codeRes.json()) as {
      ok: boolean;
      devCode?: string;
    };
    expect(codeRes.status).toBe(200);
    expect(codeJson.ok).toBe(true);
    expect(codeJson.devCode).toMatch(/^\d{6}$/);
  });
});
