import { describe, expect, it } from 'vitest';

import { hashPassword, isStrongPassword, verifyPassword } from '@/lib/cms/passwords';

describe('cms passwords', () => {
  it('hashes and verifies with scrypt', async () => {
    const hash = await hashPassword('correct-horse-battery');
    expect(hash.startsWith('scrypt:')).toBe(true);
    expect(await verifyPassword('correct-horse-battery', hash)).toBe(true);
    expect(await verifyPassword('wrong-password-12', hash)).toBe(false);
  });

  it('rejects short passwords', () => {
    expect(isStrongPassword('short')).toBe(false);
    expect(isStrongPassword('long-enough-12')).toBe(true);
  });
});
