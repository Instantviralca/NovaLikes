type CacheEntry<T> = {
  expiresAt: number;
  value: T;
};

const store = new Map<string, CacheEntry<unknown>>();

export const TOOL_CACHE_TTL = {
  profileSuccessMs: 45_000,
  videoSuccessMs: 60_000,
  negativeMs: 15_000,
} as const;

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    store.delete(key);
    return undefined;
  }
  return entry.value as T;
}

export function setCached<T>(
  key: string,
  value: T,
  ttlMs: number = TOOL_CACHE_TTL.profileSuccessMs,
): T {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

export function resetToolCache(): void {
  store.clear();
}
