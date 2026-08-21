import { afterEach, describe, expect, it } from 'vitest';

import { isEmailConfigured, validateEnv } from '@/lib/config/env';
import { assertCmsProductionDatabase, cmsUsesMemoryStore } from '@/lib/cms/ready';

describe('production CMS storage guard', () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    IV_ENV: process.env.IV_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    IV_PERSISTENCE: process.env.IV_PERSISTENCE,
    NEXT_PHASE: process.env.NEXT_PHASE,
  };

  afterEach(() => {
    if (previous.IV_ENV === undefined) delete process.env.IV_ENV;
    else process.env.IV_ENV = previous.IV_ENV;
    if (previous.DATABASE_URL === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previous.DATABASE_URL;
    if (previous.IV_PERSISTENCE === undefined) delete process.env.IV_PERSISTENCE;
    else process.env.IV_PERSISTENCE = previous.IV_PERSISTENCE;
    if (previous.NEXT_PHASE === undefined) delete process.env.NEXT_PHASE;
    else process.env.NEXT_PHASE = previous.NEXT_PHASE;
  });

  it('uses memory store in tests', () => {
    expect(cmsUsesMemoryStore()).toBe(true);
    expect(() => assertCmsProductionDatabase()).not.toThrow();
  });

  it('flags memory persistence as a production error', () => {
    process.env.IV_PERSISTENCE = 'memory';
    process.env.DATABASE_URL = 'postgresql://USER:PASSWORD@127.0.0.1:5432/novalikes';
    process.env.IV_ADMIN_PASSWORD = 'strong-admin-password-ok';
    process.env.IV_ADMIN_SESSION_SECRET = 'session-secret-at-least-32-chars!!';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';
    const result = validateEnv({ forceProduction: true });
    expect(result.ok).toBe(false);
    expect(result.issues.some((i) => i.key === 'IV_PERSISTENCE' && i.level === 'error')).toBe(true);
  });

  it('does not treat missing email as a launch-blocking error', () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.SMTP_HOST;
    delete process.env.EMAIL_FROM;
    process.env.DATABASE_URL = 'postgresql://USER:PASSWORD@127.0.0.1:5432/novalikes';
    process.env.IV_ADMIN_PASSWORD = 'strong-admin-password-ok';
    process.env.IV_ADMIN_SESSION_SECRET = 'session-secret-at-least-32-chars!!';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://novalikes.com';
    const result = validateEnv({ forceProduction: true });
    expect(result.ok).toBe(true);
    expect(isEmailConfigured()).toBe(false);
    expect(result.issues.some((i) => i.key === 'EMAIL_FROM' && i.level === 'warning')).toBe(true);
  });
});
