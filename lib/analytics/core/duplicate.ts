/**
 * Duplicate analytics event prevention — Document 14.09.
 */

const DEFAULT_TTL_MS = 2_000;
const PURCHASE_TTL_MS = 1000 * 60 * 60 * 24; // 24h session guard

type GuardEntry = {
  expiresAt: number;
};

const guards = new Map<string, GuardEntry>();

function prune(now: number): void {
  for (const [key, entry] of guards) {
    if (entry.expiresAt <= now) guards.delete(key);
  }
}

function readPersistedPurchaseKeys(): Set<string> {
  const keys = new Set<string>();
  if (typeof window === 'undefined') return keys;
  try {
    const raw = window.sessionStorage.getItem('novalikes.analytics.purchase.v1');
    if (!raw) return keys;
    const parsed = JSON.parse(raw) as string[];
    if (Array.isArray(parsed)) parsed.forEach((key) => keys.add(key));
  } catch {
    // ignore
  }
  return keys;
}

function persistPurchaseKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    const keys = readPersistedPurchaseKeys();
    keys.add(key);
    window.sessionStorage.setItem(
      'novalikes.analytics.purchase.v1',
      JSON.stringify([...keys]),
    );
  } catch {
    // ignore
  }
}

/**
 * Returns true when this key was already seen (duplicate).
 * Returns false and records the key when it is new.
 */
export function preventDuplicateEvent(
  key: string,
  ttlMs: number = DEFAULT_TTL_MS,
): boolean {
  const now = Date.now();
  prune(now);

  const existing = guards.get(key);
  if (existing && existing.expiresAt > now) {
    return true;
  }

  guards.set(key, { expiresAt: now + ttlMs });
  return false;
}

/**
 * Purchase-specific idempotency — survives refresh via sessionStorage.
 * Returns true when duplicate.
 */
export function preventDuplicatePurchase(idempotencyKey: string): boolean {
  const key = `purchase:${idempotencyKey}`;
  const persisted = readPersistedPurchaseKeys();
  if (persisted.has(key)) return true;

  const duplicate = preventDuplicateEvent(key, PURCHASE_TTL_MS);
  if (duplicate) return true;

  persistPurchaseKey(key);
  return false;
}

export function buildEventDedupeKey(
  eventName: string,
  parts: Array<string | number | undefined | null>,
): string {
  return [eventName, ...parts.map((part) => String(part ?? ''))].join('|');
}

export function resetDuplicateGuardsForTests(): void {
  guards.clear();
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem('novalikes.analytics.purchase.v1');
    } catch {
      // ignore
    }
  }
}
