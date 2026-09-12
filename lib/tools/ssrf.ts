import { isIP } from 'node:net';

import { hostMatchesSuffix, isExactHost } from '@/lib/tools/platforms';

const BLOCKED_PROTOCOLS = new Set(['file:', 'ftp:', 'javascript:', 'data:', 'blob:', 'about:']);

const BLOCKED_HOSTS = new Set([
  'localhost',
  'localhost.localdomain',
  'metadata.google.internal',
  'metadata.internal',
  'metadata',
  'instance-data',
  // Cloud metadata well-known hostnames (IP literals are covered by isPrivateIp).
  'kubernetes.default',
  'kubernetes.default.svc',
]);

export type ParsedPublicUrl = {
  url: URL;
  hostname: string;
};

export function isPrivateIPv4(address: string): boolean {
  const parts = address.split('.').map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return false;
  }
  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 169 && b === 254) return true; // link-local + cloud metadata 169.254.169.254
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  return false;
}

export function isPrivateIPv6(address: string): boolean {
  const normalized = address.toLowerCase().replace(/^\[|\]$/g, '');
  if (normalized === '::' || normalized === '::1') return true;
  // Link-local fe80::/10
  if (normalized === 'fe80' || normalized.startsWith('fe80:')) return true;
  // Unique local fc00::/7 (fc… / fd…)
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
  // IPv4-mapped IPv6
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped?.[1]) return isPrivateIPv4(mapped[1]);
  return false;
}

export function isPrivateIp(address: string): boolean {
  const version = isIP(address);
  if (version === 4) return isPrivateIPv4(address);
  if (version === 6) return isPrivateIPv6(address);
  return true;
}

export function parseHttpUrl(raw: string): ParsedPublicUrl | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 2048) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (BLOCKED_PROTOCOLS.has(parsed.protocol.toLowerCase())) return null;
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
  if (parsed.username || parsed.password) return null;

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, '');
  if (!hostname || hostname.includes(' ') || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return null;
  }
  if (BLOCKED_HOSTS.has(hostname)) return null;
  if (hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::1' || hostname === '[::1]') {
    return null;
  }
  if (isIP(hostname) && isPrivateIp(hostname)) return null;

  return { url: parsed, hostname };
}

export function assertAllowedPageHost(
  hostname: string,
  allowedHosts: readonly string[],
): boolean {
  return isExactHost(hostname, allowedHosts);
}

export function assertAllowedMediaHost(
  hostname: string,
  allowedSuffixes: readonly string[],
): boolean {
  return hostMatchesSuffix(hostname, allowedSuffixes);
}

export async function assertPublicHostname(hostname: string): Promise<void> {
  // Prefer shared resolver used by pinned outbound fetch.
  const { resolvePublicAddresses } = await import('@/lib/tools/pinned-fetch');
  await resolvePublicAddresses(hostname);
}

export function resolveRedirectUrl(current: URL, location: string): URL | null {
  try {
    const next = new URL(location, current);
    const parsed = parseHttpUrl(next.toString());
    return parsed?.url ?? null;
  } catch {
    return null;
  }
}
