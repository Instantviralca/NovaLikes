/**
 * Regression tests for drizzle/0010_order_public_number.sql production semantics.
 * 0011 must not exist — numbering stays owned by 0010 only.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  PUBLIC_ORDER_NUMBER_SEQUENCE_MIN,
  PUBLIC_ORDER_NUMBER_START,
  expectedNextPublicNumberAfterSetval,
  resolvePublicNumberSequenceSetval,
} from '@/lib/orders/public-number';

const MIGRATION_0010 = path.join(process.cwd(), 'drizzle', '0010_order_public_number.sql');
const MIGRATION_0011 = path.join(
  process.cwd(),
  'drizzle',
  '0011_order_number_default_backfill.sql',
);

describe('0010 public number sequence (production)', () => {
  it('empty production state → first nextval = 1001', () => {
    const setval = resolvePublicNumberSequenceSetval(null);
    expect(setval).toEqual({ value: 1001, isCalled: false });
    expect(expectedNextPublicNumberAfterSetval(setval)).toBe(1001);
    expect(setval.value).toBe(PUBLIC_ORDER_NUMBER_START);
    expect(setval.value).toBeGreaterThanOrEqual(PUBLIC_ORDER_NUMBER_SEQUENCE_MIN);
  });

  it('existing max 1001 → next = 1002', () => {
    const setval = resolvePublicNumberSequenceSetval(1001);
    expect(setval).toEqual({ value: 1001, isCalled: true });
    expect(expectedNextPublicNumberAfterSetval(setval)).toBe(1002);
  });

  it('existing max 1250 → next = 1251', () => {
    const setval = resolvePublicNumberSequenceSetval(1250);
    expect(setval).toEqual({ value: 1250, isCalled: true });
    expect(expectedNextPublicNumberAfterSetval(setval)).toBe(1251);
  });

  it('never attempts a value below sequence minimum 1001', () => {
    for (const max of [null, undefined, 0, 999, 1000] as const) {
      const setval = resolvePublicNumberSequenceSetval(max as number | null | undefined);
      expect(setval.value).toBeGreaterThanOrEqual(PUBLIC_ORDER_NUMBER_SEQUENCE_MIN);
      expect(expectedNextPublicNumberAfterSetval(setval)).toBe(1001);
    }
    expect(() =>
      expectedNextPublicNumberAfterSetval({ value: 1000, isCalled: false }),
    ).toThrow(/below sequence minimum/);
  });

  it('migration SQL keeps START 1001; allows NULL public_number; no global NOT NULL', () => {
    const sql = readFileSync(MIGRATION_0010, 'utf8');

    expect(sql).toContain('MINVALUE 1001');
    expect(sql).toContain('START WITH 1001');
    expect(sql).toContain("setval('orders_public_number_seq', 1001, false)");
    expect(sql).toContain("setval('orders_public_number_seq', max_existing, true)");
    expect(sql).toContain('CREATE SEQUENCE IF NOT EXISTS');
    expect(sql).toContain('ADD COLUMN IF NOT EXISTS public_number');
    expect(sql).toContain('CREATE UNIQUE INDEX IF NOT EXISTS orders_public_number_uidx');
    expect(sql).toMatch(/WHERE public_number IS NOT NULL/);
    expect(sql).not.toMatch(/ALTER COLUMN public_number SET NOT NULL/i);
    expect(sql).not.toMatch(/GREATEST\s*\(\s*1000/);
    expect(sql).not.toMatch(/setval\s*\(\s*'orders_public_number_seq'\s*,\s*1000/);
  });

  it('no second order-number migration (0011 removed)', () => {
    expect(existsSync(MIGRATION_0011)).toBe(false);
    expect(MIGRATION_0010.endsWith('0010_order_public_number.sql')).toBe(true);
  });
});
