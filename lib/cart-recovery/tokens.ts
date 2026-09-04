/**
 * Cryptographic tokens for cart recovery / unsubscribe links.
 * Tokens are HMAC-derived from publicId + createdAt + server pepper (no raw token storage).
 */

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

function pepper(): string {
  return (
    process.env.CART_RECOVERY_TOKEN_PEPPER?.trim() ||
    process.env.IV_ADMIN_SESSION_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim() ||
    'dev-only-cart-recovery-pepper'
  );
}

export function createCartRecoveryPublicId(): string {
  return `acr_${randomBytes(12).toString('base64url')}`;
}

export function createCartRecoverySessionId(): string {
  return `crs_${Date.now().toString(36)}_${randomBytes(4).toString('hex')}`;
}

export function createCartRecoveryEventId(): string {
  return `cre_${Date.now().toString(36)}_${randomBytes(3).toString('hex')}`;
}

export function hashCartRecoveryToken(rawToken: string): string {
  return createHash('sha256').update(rawToken, 'utf8').digest('hex');
}

export function deriveRecoveryToken(session: { publicId: string; createdAt: string }): string {
  const digest = createHmac('sha256', pepper())
    .update(`${session.publicId}|${session.createdAt}`)
    .digest('base64url');
  return `${session.publicId}.${digest}`;
}

export function deriveUnsubscribeToken(session: {
  publicId: string;
  createdAt: string;
}): string {
  const digest = createHmac('sha256', pepper())
    .update(`unsub|${session.publicId}|${session.createdAt}`)
    .digest('base64url');
  return `${session.publicId}.${digest}`;
}

export function parsePublicIdFromToken(raw: string): string | null {
  const publicId = raw.split('.')[0];
  if (!publicId?.startsWith('acr_') || publicId.length < 8) return null;
  return publicId;
}

function safeEqual(a: string, b: string): boolean {
  try {
    const left = Buffer.from(a, 'utf8');
    const right = Buffer.from(b, 'utf8');
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function verifyDerivedRecoveryToken(
  session: { publicId: string; createdAt: string },
  rawToken: string,
): boolean {
  return safeEqual(deriveRecoveryToken(session), rawToken);
}

export function verifyDerivedUnsubscribeToken(
  session: { publicId: string; createdAt: string },
  rawToken: string,
): boolean {
  return safeEqual(deriveUnsubscribeToken(session), rawToken);
}
