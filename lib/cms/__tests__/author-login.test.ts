import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { authenticateAuthor, hashAuthorIp, hashAuthorToken } from '@/lib/cms/auth';
import { createCmsId } from '@/lib/cms/ids';
import { hashPassword } from '@/lib/cms/passwords';
import {
  cmsClearLoginAttempts,
  cmsCountRecentFailures,
  cmsGetSessionByHash,
  cmsGetUserByEmail,
  cmsInsertUser,
  cmsRecordLoginAttempt,
  resetCmsMemoryForTests,
} from '@/lib/cms/store';

const PASSWORD = 'correct-horse-battery-staple';
const IP = '203.0.113.10';

async function seedAuthor(overrides: { status?: 'active' | 'disabled'; email?: string } = {}) {
  const now = new Date().toISOString();
  const user = await cmsInsertUser({
    id: createCmsId('usr'),
    name: 'Test Author',
    email: overrides.email ?? 'author@novalikes.test',
    passwordHash: await hashPassword(PASSWORD),
    profileImage: null,
    bio: null,
    role: 'author',
    status: overrides.status ?? 'active',
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  });
  return user;
}

describe('author login rate limit and sessions', () => {
  beforeEach(async () => {
    resetCmsMemoryForTests();
    await cmsClearLoginAttempts();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns 0 recent failures when there are no attempts', async () => {
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    expect(await cmsCountRecentFailures(hashAuthorIp(IP), since)).toBe(0);
  });

  it('records a failed login attempt and counts it', async () => {
    await seedAuthor();
    const result = await authenticateAuthor('author@novalikes.test', 'wrong-password-99', IP);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(401);

    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    expect(await cmsCountRecentFailures(hashAuthorIp(IP), since)).toBe(1);
  });

  it('excludes failed attempts outside the 15-minute window', async () => {
    vi.useFakeTimers();
    const base = new Date('2026-08-22T02:00:00.000Z');
    vi.setSystemTime(base);

    const ipHash = hashAuthorIp(IP);
    await cmsRecordLoginAttempt(ipHash, false);
    await cmsRecordLoginAttempt(ipHash, false);

    vi.setSystemTime(new Date(base.getTime() + 20 * 60 * 1000));
    await cmsRecordLoginAttempt(ipHash, false);

    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    expect(await cmsCountRecentFailures(ipHash, since)).toBe(1);
  });

  it('succeeds with the correct password and creates a session + success attempt', async () => {
    const user = await seedAuthor();
    const result = await authenticateAuthor(user.email, PASSWORD, IP);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.user.email).toBe(user.email);
    expect(result.token.includes('.')).toBe(true);

    const session = await cmsGetSessionByHash(hashAuthorToken(result.token));
    expect(session).not.toBeNull();
    expect(session?.userId).toBe(user.id);
    expect(session?.revokedAt).toBeNull();

    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    // Success attempts are not counted as failures.
    expect(await cmsCountRecentFailures(hashAuthorIp(IP), since)).toBe(0);

    const refreshed = await cmsGetUserByEmail(user.email);
    expect(refreshed?.lastLoginAt).toBeTruthy();
  });

  it('blocks after 5 recent failures without weakening the limiter', async () => {
    await seedAuthor();
    for (let i = 0; i < 5; i += 1) {
      const failed = await authenticateAuthor('author@novalikes.test', 'wrong-password-99', IP);
      expect(failed.ok).toBe(false);
      if (!failed.ok) expect(failed.status).toBe(401);
    }

    const limited = await authenticateAuthor('author@novalikes.test', PASSWORD, IP);
    expect(limited.ok).toBe(false);
    if (!limited.ok) {
      expect(limited.status).toBe(429);
      expect(limited.error).toMatch(/Too many login attempts/i);
    }

    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    expect(await cmsCountRecentFailures(hashAuthorIp(IP), since)).toBe(5);
  });

  it('keeps disabled authors blocked even with the correct password', async () => {
    await seedAuthor({ status: 'disabled', email: 'disabled@novalikes.test' });
    const result = await authenticateAuthor('disabled@novalikes.test', PASSWORD, IP);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
      expect(result.error).toMatch(/disabled/i);
    }
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    expect(await cmsCountRecentFailures(hashAuthorIp(IP), since)).toBe(1);
  });
});

describe('cmsCountRecentFailures query shape', () => {
  it('uses gte for created_at instead of raw sql Date interpolation', async () => {
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const source = readFileSync(join(process.cwd(), 'lib/cms/store.ts'), 'utf8');
    expect(source).toContain('gte(cmsLoginAttempts.createdAt, new Date(sinceIso))');
    expect(source).not.toMatch(/sql`\$\{cmsLoginAttempts\.createdAt\} >= \$\{new Date/);
  });
});
