import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  captureCartRecoverySession,
  deriveRecoveryToken,
  deriveUnsubscribeToken,
  markCartRecoveryConverted,
  parsePublicIdFromToken,
  processCartRecoveryJobs,
  resetCartRecoverySettingsMemoryForTests,
  resetCartRecoveryStoreForTests,
  restoreCartFromRecoveryToken,
  setCartRecoverySettings,
  unsubscribeCartRecovery,
  verifyDerivedRecoveryToken,
  verifyDerivedUnsubscribeToken,
} from '@/lib/cart-recovery';
import {
  getCartRecoverySessionByPublicId,
  listCartRecoveryEvents,
  listCartRecoverySessions,
  saveCartRecoverySession,
} from '@/lib/cart-recovery/store';
import { getPackageById } from '@/data/pricing/packages';
import type { CartRecoveryCaptureInput } from '@/types/cart-recovery';

const previous = {
  persistence: process.env.IV_PERSISTENCE,
  pepper: process.env.CART_RECOVERY_TOKEN_PEPPER,
  dryRun: process.env.IV_CART_RECOVERY_DRY_RUN,
};

const input = (): CartRecoveryCaptureInput => ({
  email: 'Buyer@Example.com',
  firstName: 'Nova',
  lastName: 'Buyer',
  items: [{
    id: 'cart_test',
    packageId: 'ig-f-1000',
    serviceId: 'instagram-followers',
    serviceSlug: 'buy-instagram-followers',
    serviceName: 'Instagram Followers',
    platformId: 'instagram',
    packageTitle: 'Snapshot title',
    quantity: 1000,
    quantityLabel: '1,000',
    unitPrice: 1,
    currency: 'USD',
    deliveryTime: 'Gradual',
    configuration: { username: 'nova_test' },
    addedAt: new Date().toISOString(),
  }],
  coupon: null,
  currency: 'USD',
  subtotalAmount: 1399,
  discountAmount: 0,
  totalAmount: 1399,
  locale: 'en',
  market: 'us',
});

beforeEach(async () => {
  process.env.IV_PERSISTENCE = 'memory';
  process.env.CART_RECOVERY_TOKEN_PEPPER = 'test-cart-recovery-pepper';
  process.env.IV_CART_RECOVERY_DRY_RUN = '1';
  resetCartRecoveryStoreForTests();
  resetCartRecoverySettingsMemoryForTests();
  await setCartRecoverySettings({
    enabled: true,
    abandonmentMinutes: 5,
    retentionDays: 30,
    emails: [
      { step: 1, enabled: true, delayMinutes: 1, subject: 'One', body: '{{recovery_url}}' },
      { step: 2, enabled: true, delayMinutes: 2, subject: 'Two', body: '{{recovery_url}}' },
      { step: 3, enabled: true, delayMinutes: 3, subject: 'Three', body: '{{recovery_url}}' },
    ],
  });
});

afterEach(() => {
  resetCartRecoveryStoreForTests();
  resetCartRecoverySettingsMemoryForTests();
  const restore = (key: string, value: string | undefined) => {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  };
  restore('IV_PERSISTENCE', previous.persistence);
  restore('CART_RECOVERY_TOKEN_PEPPER', previous.pepper);
  restore('IV_CART_RECOVERY_DRY_RUN', previous.dryRun);
});

describe('cart recovery lifecycle', () => {
  it('captures and updates one open session', async () => {
    const first = await captureCartRecoverySession(input());
    expect(first.ok && first.publicId).toMatch(/^acr_/);
    const second = await captureCartRecoverySession({ ...input(), totalAmount: 999 });
    expect(second.ok && second.publicId).toBe(first.ok ? first.publicId : '');
    const sessions = await listCartRecoverySessions();
    expect(sessions).toHaveLength(1);
    expect(sessions[0]?.totalAmount).toBe(999);
  });

  it('abandons at the cutoff and schedules each email once', async () => {
    await captureCartRecoverySession(input());
    const session = (await listCartRecoverySessions())[0]!;
    const abandonedAt = new Date(new Date(session.lastActivityAt).getTime() + 6 * 60_000);
    expect((await processCartRecoveryJobs(abandonedAt)).abandoned).toBe(1);
    const due = new Date(abandonedAt.getTime() + 4 * 60_000);
    expect((await processCartRecoveryJobs(due)).emailsSkipped).toBe(3);
    expect((await processCartRecoveryJobs(due)).emailsSkipped).toBe(0);
    const events = await listCartRecoveryEvents(session.id);
    expect(events.filter((event) => event.type === 'email_sent')).toHaveLength(3);
  });

  it('validates recovery and unsubscribe tokens', async () => {
    const captured = await captureCartRecoverySession(input());
    const session = await getCartRecoverySessionByPublicId(captured.ok ? captured.publicId : '');
    expect(session).not.toBeNull();
    const recovery = deriveRecoveryToken(session!);
    const unsubscribe = deriveUnsubscribeToken(session!);
    expect(parsePublicIdFromToken(recovery)).toBe(session!.publicId);
    expect(verifyDerivedRecoveryToken(session!, recovery)).toBe(true);
    expect(verifyDerivedRecoveryToken(session!, `${recovery}x`)).toBe(false);
    expect(verifyDerivedUnsubscribeToken(session!, unsubscribe)).toBe(true);
  });

  it('unsubscribes idempotently', async () => {
    const captured = await captureCartRecoverySession(input());
    const session = await getCartRecoverySessionByPublicId(captured.ok ? captured.publicId : '');
    await unsubscribeCartRecovery(session!.id);
    await unsubscribeCartRecovery(session!.id);
    expect((await getCartRecoverySessionByPublicId(session!.publicId))?.unsubscribedAt).toBeTruthy();
    expect((await listCartRecoveryEvents(session!.id)).filter((event) => event.type === 'unsubscribed')).toHaveLength(1);
  });

  it('rejects expired links', async () => {
    const captured = await captureCartRecoverySession(input());
    const session = await getCartRecoverySessionByPublicId(captured.ok ? captured.publicId : '');
    await saveCartRecoverySession({ ...session!, expiresAt: new Date(0).toISOString() });
    await expect(restoreCartFromRecoveryToken(deriveRecoveryToken(session!))).resolves.toMatchObject({
      ok: false,
      code: 'expired',
    });
  });

  it('restores using current catalog pricing', async () => {
    const captured = await captureCartRecoverySession(input());
    const session = await getCartRecoverySessionByPublicId(captured.ok ? captured.publicId : '');
    const restored = await restoreCartFromRecoveryToken(deriveRecoveryToken(session!));
    expect(restored.ok).toBe(true);
    if (restored.ok) {
      expect(restored.cart.items[0]?.unitPrice).toBe(getPackageById('ig-f-1000')?.price);
      expect(restored.cart.items[0]?.unitPrice).not.toBe(1);
    }
  });

  it('converts once and reports a duplicate conversion', async () => {
    await captureCartRecoverySession(input());
    expect(await markCartRecoveryConverted({ orderId: 'order_1', email: 'buyer@example.com' })).toEqual({
      converted: true,
      duplicate: false,
    });
    expect(await markCartRecoveryConverted({ orderId: 'order_1', email: 'buyer@example.com' })).toEqual({
      converted: false,
      duplicate: true,
    });
  });

  it('keeps the cron secret server-only', async () => {
    const root = process.cwd();
    const client = await readFile(join(root, 'components/commerce/checkout/checkout-page.tsx'), 'utf8');
    const cronRoute = await readFile(join(root, 'app/api/internal/cart-recovery/process/route.ts'), 'utf8');
    expect(client).not.toContain('CRON_SECRET');
    expect(cronRoute).not.toContain('NEXT_PUBLIC_CRON_SECRET');
  });
});
