import { describe, expect, it } from 'vitest';

import { assertCmsDevOnlyCommand } from '@/lib/cms/dev-only';

describe('cms dev-only commands', () => {
  it('allows development', () => {
    const previousIv = process.env.IV_ENV;
    const previousVercel = process.env.VERCEL_ENV;
    delete process.env.IV_ENV;
    delete process.env.VERCEL_ENV;
    try {
      expect(() => assertCmsDevOnlyCommand('author:reset-login-rate-limit')).not.toThrow();
    } finally {
      if (previousIv === undefined) delete process.env.IV_ENV;
      else process.env.IV_ENV = previousIv;
      if (previousVercel === undefined) delete process.env.VERCEL_ENV;
      else process.env.VERCEL_ENV = previousVercel;
    }
  });

  it('blocks production-like env', () => {
    const previous = process.env.IV_ENV;
    process.env.IV_ENV = 'production';
    try {
      expect(() => assertCmsDevOnlyCommand('author:reset-login-rate-limit')).toThrow(/blocked in production/);
    } finally {
      if (previous === undefined) delete process.env.IV_ENV;
      else process.env.IV_ENV = previous;
    }
  });
});
