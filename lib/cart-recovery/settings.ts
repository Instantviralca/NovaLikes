/**
 * Cart recovery settings — site_settings JSON + env defaults.
 */

import {
  getSiteSettingValue,
  setSiteSettingValue,
} from '@/lib/cart-recovery/settings-storage';
import type {
  CartRecoveryEmailStepConfig,
  CartRecoverySettings,
} from '@/types/cart-recovery';

export const CART_RECOVERY_SETTINGS_KEY = 'cart_recovery_settings_v1';

export const DEFAULT_CART_RECOVERY_SETTINGS: CartRecoverySettings = {
  enabled: true,
  abandonmentMinutes: Number(process.env.CART_ABANDONMENT_MINUTES || 20) || 20,
  retentionDays: Number(process.env.CART_RECOVERY_RETENTION_DAYS || 90) || 90,
  couponEnabled: false,
  couponDiscountType: 'percentage',
  couponValue: 10,
  couponMinSubtotal: 0,
  couponExpiryHours: 48,
  couponSequenceStep: 3,
  whatsappRecoveryEnabled: false,
  emails: [
    {
      step: 1,
      enabled: true,
      delayMinutes: 60,
      subject: 'You left something behind',
      body: `Hi {{first_name}},

It looks like you didn't finish your NovaLikes order.

Your selection is still available if you'd like to continue.

{{recovery_url}}`,
    },
    {
      step: 2,
      enabled: true,
      delayMinutes: 24 * 60,
      subject: 'Still thinking it over?',
      body: `Hi {{first_name}},

Your NovaLikes selection is still waiting.

Checkout stays simple — no password required, secure card payment, and you can track your order anytime. Support is available if you need help.

{{recovery_url}}`,
    },
    {
      step: 3,
      enabled: true,
      delayMinutes: 72 * 60,
      subject: 'Your NovaLikes order is still available',
      body: `Hi {{first_name}},

This is a final reminder that your NovaLikes selection is still available.

{{cart_items}}

Total: {{cart_total}}

{{recovery_url}}`,
    },
  ],
};

function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function normalizeEmailStep(
  raw: Partial<CartRecoveryEmailStepConfig> | undefined,
  fallback: CartRecoveryEmailStepConfig,
): CartRecoveryEmailStepConfig {
  return {
    step: fallback.step,
    enabled: raw?.enabled ?? fallback.enabled,
    delayMinutes: clampInt(raw?.delayMinutes, fallback.delayMinutes, 1, 60 * 24 * 30),
    subject: String(raw?.subject ?? fallback.subject).trim().slice(0, 200) || fallback.subject,
    body: String(raw?.body ?? fallback.body).trim().slice(0, 8000) || fallback.body,
  };
}

export function normalizeCartRecoverySettings(
  input?: Partial<CartRecoverySettings> | null,
): CartRecoverySettings {
  const base = DEFAULT_CART_RECOVERY_SETTINGS;
  const emails = [1, 2, 3].map((step) => {
    const fallback = base.emails.find((e) => e.step === step)!;
    const raw = input?.emails?.find((e) => e.step === step);
    return normalizeEmailStep(raw, fallback);
  });

  return {
    enabled: input?.enabled ?? base.enabled,
    abandonmentMinutes: clampInt(
      input?.abandonmentMinutes ?? process.env.CART_ABANDONMENT_MINUTES,
      base.abandonmentMinutes,
      5,
      24 * 60,
    ),
    retentionDays: clampInt(
      input?.retentionDays ?? process.env.CART_RECOVERY_RETENTION_DAYS,
      base.retentionDays,
      7,
      365,
    ),
    couponEnabled: Boolean(input?.couponEnabled ?? false),
    couponDiscountType: input?.couponDiscountType === 'fixed' ? 'fixed' : 'percentage',
    couponValue: clampInt(input?.couponValue, base.couponValue, 1, 10000),
    couponMinSubtotal: clampInt(input?.couponMinSubtotal, base.couponMinSubtotal, 0, 1_000_000),
    couponExpiryHours: clampInt(input?.couponExpiryHours, base.couponExpiryHours, 1, 24 * 30),
    couponSequenceStep: ([1, 2, 3].includes(Number(input?.couponSequenceStep))
      ? Number(input?.couponSequenceStep)
      : 3) as 1 | 2 | 3,
    whatsappRecoveryEnabled: false, // always disabled until product enables it
    emails: emails as CartRecoveryEmailStepConfig[],
  };
}

export async function getCartRecoverySettings(): Promise<CartRecoverySettings> {
  const raw = await getSiteSettingValue(CART_RECOVERY_SETTINGS_KEY);
  if (!raw) return normalizeCartRecoverySettings();
  try {
    return normalizeCartRecoverySettings(JSON.parse(raw) as Partial<CartRecoverySettings>);
  } catch {
    return normalizeCartRecoverySettings();
  }
}

export async function setCartRecoverySettings(
  input: Partial<CartRecoverySettings>,
): Promise<CartRecoverySettings> {
  const current = await getCartRecoverySettings();
  const next = normalizeCartRecoverySettings({ ...current, ...input, emails: input.emails ?? current.emails });
  await setSiteSettingValue(CART_RECOVERY_SETTINGS_KEY, JSON.stringify(next));
  return next;
}
