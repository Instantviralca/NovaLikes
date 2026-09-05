/**
 * Regression tests for drizzle/0010_order_public_number.sql setval safety.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  PUBLIC_ORDER_NUMBER_SEQUENCE_MIN,
  PUBLIC_ORDER_NUMBER_START,
  expectedNextPublicNumberAfterSetval,
  resolvePublicNumberSequenceSetval,
} from '@/lib/orders/public-number';

const MIGRATION_PATH = path.join(
  process.cwd(),
  'drizzle',
  '0010_order_public_number.sql',
);

describe('0010 public number sequence setval', () => {
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

  it('never attempts a value below sequence minimum', () => {
    for (const max of [null, undefined, 0, 999, 1000] as const) {
      const setval = resolvePublicNumberSequenceSetval(max as number | null | undefined);
      expect(setval.value).toBeGreaterThanOrEqual(PUBLIC_ORDER_NUMBER_SEQUENCE_MIN);
      expect(expectedNextPublicNumberAfterSetval(setval)).toBe(1001);
    }
    expect(() =>
      expectedNextPublicNumberAfterSetval({ value: 1000, isCalled: false }),
    ).toThrow(/below sequence minimum/);
  });

  it('migration SQL is safe: no setval to 1000; uses setval(1001, false) / max,true', () => {
    const sql = readFileSync(MIGRATION_PATH, 'utf8');

    expect(sql).toContain('MINVALUE 1001');
    expect(sql).toContain('START WITH 1001');
    expect(sql).toContain("setval('orders_public_number_seq', 1001, false)");
    expect(sql).toContain("setval('orders_public_number_seq', max_existing, true)");
    expect(sql).toContain('CREATE SEQUENCE IF NOT EXISTS');
    expect(sql).toContain('ADD COLUMN IF NOT EXISTS public_number');
    expect(sql).toContain('CREATE UNIQUE INDEX IF NOT EXISTS orders_public_number_uidx');

    // Bad production pattern that caused: setval value 1000 out of bounds
    expect(sql).not.toMatch(/GREATEST\s*\(\s*1000/);
    expect(sql).not.toMatch(/COALESCE\s*\([^)]*1000/);
    expect(sql).not.toMatch(/setval\s*\(\s*'orders_public_number_seq'\s*,\s*1000/);
    expect(sql).not.toMatch(/setval\s*\(\s*'orders_public_number_seq'\s*,\s*GREATEST/);
  });

  it('migration remains 0010 (no 0011 required) and is re-runnable', () => {
    const sql = readFileSync(MIGRATION_PATH, 'utf8');
    expect(MIGRATION_PATH.endsWith('0010_order_public_number.sql')).toBe(true);
    expect(sql).toMatch(/Idempotent|safe to re-run/i);
    expect(sql).toContain('IF NOT EXISTS');
    expect(sql).toContain('DO $$');
  });
});
