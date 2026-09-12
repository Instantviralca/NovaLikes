import { describe, expect, it, beforeEach, vi } from 'vitest';

import {
  isPrivateIPv4,
  isPrivateIPv6,
  isPrivateIp,
  parseHttpUrl,
  resolveRedirectUrl,
} from '@/lib/tools/ssrf';
import { resolvePublicAddresses } from '@/lib/tools/pinned-fetch';
import {
  consumeDownloadLimit,
  consumeExtractLimit,
  resetToolRateLimits,
  DOWNLOAD_LIMIT,
  EXTRACT_LIMIT,
} from '@/lib/tools/rate-limit';
import {
  CONTENT_SECURITY_POLICY_REPORT_ONLY,
  CSP_REQUIRED_MOLLIE_TOKENS,
} from '@/lib/security/csp';
import { isAdminAuthConfigured } from '@/lib/admin/auth';
import nextConfig from '@/next.config';

describe('SSRF private / metadata defenses', () => {
  it('rejects private IPv4, loopback, link-local, and metadata range', () => {
    expect(isPrivateIPv4('127.0.0.1')).toBe(true);
    expect(isPrivateIPv4('10.1.2.3')).toBe(true);
    expect(isPrivateIPv4('192.168.0.1')).toBe(true);
    expect(isPrivateIPv4('172.16.5.5')).toBe(true);
    expect(isPrivateIPv4('169.254.169.254')).toBe(true);
    expect(isPrivateIPv4('100.64.1.1')).toBe(true);
    expect(isPrivateIPv4('8.8.8.8')).toBe(false);
  });

  it('rejects IPv6 loopback, ULA, link-local, and IPv4-mapped private', () => {
    expect(isPrivateIPv6('::1')).toBe(true);
    expect(isPrivateIPv6('fe80::1')).toBe(true);
    expect(isPrivateIPv6('fc00::1')).toBe(true);
    expect(isPrivateIPv6('fd12:3456:789a::1')).toBe(true);
    expect(isPrivateIp('::ffff:127.0.0.1')).toBe(true);
    expect(isPrivateIp('::ffff:10.0.0.1')).toBe(true);
  });

  it('rejects localhost / metadata hostnames and dangerous protocols', () => {
    expect(parseHttpUrl('http://localhost/x')).toBeNull();
    expect(parseHttpUrl('http://metadata.google.internal/')).toBeNull();
    expect(parseHttpUrl('http://169.254.169.254/latest/meta-data')).toBeNull();
    expect(parseHttpUrl('file:///etc/passwd')).toBeNull();
    expect(parseHttpUrl('ftp://example.com/')).toBeNull();
  });

  it('blocks redirect to private or disallowed absolute targets', () => {
    const current = new URL('https://www.instagram.com/p/abc/');
    expect(resolveRedirectUrl(current, 'http://127.0.0.1/')).toBeNull();
    expect(resolveRedirectUrl(current, 'http://192.168.1.1/evil')).toBeNull();
    expect(resolveRedirectUrl(current, 'file:///etc/passwd')).toBeNull();
    expect(resolveRedirectUrl(current, 'https://www.instagram.com/p/xyz/')?.hostname).toBe(
      'www.instagram.com',
    );
  });

  it('resolvePublicAddresses rejects private literal IPs', async () => {
    await expect(resolvePublicAddresses('127.0.0.1')).rejects.toThrow('private_address');
    await expect(resolvePublicAddresses('10.0.0.1')).rejects.toThrow('private_address');
    await expect(resolvePublicAddresses('169.254.169.254')).rejects.toThrow('private_address');
    const publicLit = await resolvePublicAddresses('8.8.8.8');
    expect(publicLit.addresses).toEqual(['8.8.8.8']);
  });
});

describe('tools rate limiter (single-process)', () => {
  beforeEach(() => resetToolRateLimits());

  it('returns 429 semantics after extract limit and isolates download bucket', () => {
    for (let i = 0; i < EXTRACT_LIMIT; i += 1) {
      expect(consumeExtractLimit('1.2.3.4').allowed).toBe(true);
    }
    expect(consumeExtractLimit('1.2.3.4').allowed).toBe(false);
    expect(consumeExtractLimit('9.9.9.9').allowed).toBe(true);
    expect(consumeDownloadLimit('1.2.3.4').allowed).toBe(true);
    for (let i = 1; i < DOWNLOAD_LIMIT; i += 1) {
      consumeDownloadLimit('1.2.3.4');
    }
    expect(consumeDownloadLimit('1.2.3.4').allowed).toBe(false);
  });
});

describe('CSP report-only inventory', () => {
  it('keeps Mollie origins and Report-Only header wiring', async () => {
    for (const token of CSP_REQUIRED_MOLLIE_TOKENS) {
      expect(CONTENT_SECURITY_POLICY_REPORT_ONLY).toContain(token);
    }
    expect(CONTENT_SECURITY_POLICY_REPORT_ONLY).toContain("default-src 'self'");
    const headers = await nextConfig.headers?.();
    const global = headers!.find((entry) => entry.source === '/(.*)');
    const csp = global?.headers.find((h) => h.key === 'Content-Security-Policy-Report-Only');
    expect(csp?.value).toBe(CONTENT_SECURITY_POLICY_REPORT_ONLY);
    expect(global?.headers.some((h) => h.key === 'Content-Security-Policy')).toBe(false);
  });
});

describe('admin auth exposure', () => {
  it('derives configuration from server password only (no NEXT_PUBLIC flag)', () => {
    const prevPublic = process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED;
    const prevPass = process.env.IV_ADMIN_PASSWORD;
    delete process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED;
    delete process.env.IV_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    expect(isAdminAuthConfigured()).toBe(false);
    process.env.IV_ADMIN_PASSWORD = 'test-admin-password-value';
    expect(isAdminAuthConfigured()).toBe(true);
    if (prevPublic === undefined) delete process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED;
    else process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED = prevPublic;
    if (prevPass === undefined) delete process.env.IV_ADMIN_PASSWORD;
    else process.env.IV_ADMIN_PASSWORD = prevPass;
    void vi;
  });
});
