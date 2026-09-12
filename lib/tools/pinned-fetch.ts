/**
 * Outbound HTTP(S) with DNS resolve → connect to validated public IP,
 * preserving TLS SNI / Host as the original hostname.
 *
 * Narrows DNS-rebinding TOCTOU vs plain fetch(hostname) by binding the TCP
 * connection to an address that already passed isPrivateIp checks.
 * A residual race remains if the attacker controls DNS after our lookup and
 * before connect completes on multi-homed resolutions; we only dial one
 * pre-validated address and never fall back to an unchecked lookup.
 */

import http from 'node:http';
import https from 'node:https';
import { lookup } from 'node:dns/promises';
import type { IncomingMessage } from 'node:http';

import { isPrivateIp } from '@/lib/tools/ssrf';

export type ResolvedPublicTarget = {
  hostname: string;
  addresses: string[];
  family: 4 | 6;
};

export async function resolvePublicAddresses(hostname: string): Promise<ResolvedPublicTarget> {
  if (!hostname) throw new Error('private_address');

  // Literal IP host
  const { isIP } = await import('node:net');
  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error('private_address');
    return {
      hostname,
      addresses: [hostname],
      family: isIP(hostname) === 6 ? 6 : 4,
    };
  }

  const records = await lookup(hostname, { all: true, verbatim: true });
  const publicRecords = records.filter((r) => !isPrivateIp(r.address));
  if (!publicRecords.length) throw new Error('private_address');

  // Prefer IPv4 for broader CDN compatibility, else first public IPv6.
  const v4 = publicRecords.find((r) => r.family === 4);
  const chosen = v4 ?? publicRecords[0]!;
  return {
    hostname,
    addresses: [chosen.address],
    family: chosen.family === 6 ? 6 : 4,
  };
}

export type PinnedRequestInit = {
  method?: string;
  headers?: Record<string, string>;
  timeoutMs: number;
  maxRedirects?: number;
};

export type PinnedResponse = {
  url: string;
  status: number;
  headers: Headers;
  body: IncomingMessage;
};

function incomingToWebHeaders(res: IncomingMessage): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(res.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const part of value) headers.append(key, part);
    } else {
      headers.set(key, value);
    }
  }
  return headers;
}

/**
 * GET/request to url, dialing a pre-validated public IP with Host/SNI = hostname.
 */
export function pinnedRequest(
  url: URL,
  target: ResolvedPublicTarget,
  init: PinnedRequestInit,
): Promise<PinnedResponse> {
  const lib = url.protocol === 'https:' ? https : http;
  const ip = target.addresses[0];
  if (!ip) return Promise.reject(new Error('private_address'));

  const headers: Record<string, string> = {
    Host: url.hostname,
    ...(init.headers ?? {}),
  };

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: ip,
        servername: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: init.method ?? 'GET',
        headers,
        timeout: init.timeoutMs,
        // Do not disable TLS verification.
      },
      (res) => {
        resolve({
          url: url.toString(),
          status: res.statusCode ?? 0,
          headers: incomingToWebHeaders(res),
          body: res,
        });
      },
    );
    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', reject);
    req.end();
  });
}
