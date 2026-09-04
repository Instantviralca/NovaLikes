/**
 * Cron processor: abandon → email → expire. Idempotent.
 */

import { getCartRecoverySettings } from '@/lib/cart-recovery/settings';
import { sendRecoveryEmailStep } from '@/lib/cart-recovery/emails';
import {
  listAbandonedSessionsForEmail,
  listExpiredOpenSessions,
  listSessionsDueForAbandonment,
  saveCartRecoverySession,
  listCartRecoveryEvents,
} from '@/lib/cart-recovery/store';
import { createCartRecoveryEventId } from '@/lib/cart-recovery/tokens';
import { appendCartRecoveryEvent } from '@/lib/cart-recovery/store';

export type CartRecoveryProcessResult = {
  abandoned: number;
  emailsSent: number;
  emailsFailed: number;
  emailsSkipped: number;
  expired: number;
};

export async function processCartRecoveryJobs(now = new Date()): Promise<CartRecoveryProcessResult> {
  const settings = await getCartRecoverySettings();
  const result: CartRecoveryProcessResult = {
    abandoned: 0,
    emailsSent: 0,
    emailsFailed: 0,
    emailsSkipped: 0,
    expired: 0,
  };

  if (!settings.enabled) return result;

  const nowIso = now.toISOString();
  const cutoff = new Date(
    now.getTime() - settings.abandonmentMinutes * 60 * 1000,
  ).toISOString();

  const dueActive = await listSessionsDueForAbandonment(cutoff);
  for (const session of dueActive) {
    if (session.unsubscribedAt) continue;
    const updated = {
      ...session,
      status: 'abandoned' as const,
      abandonedAt: nowIso,
      updatedAt: nowIso,
    };
    await saveCartRecoverySession(updated);
    await appendCartRecoveryEvent({
      id: createCartRecoveryEventId(),
      sessionId: session.id,
      type: 'email_scheduled',
      emailStep: 1,
      idempotencyKey: `cart_recovery:${session.id}:abandoned`,
      providerMessageId: null,
      errorMessage: null,
      meta: null,
      createdAt: nowIso,
    });
    result.abandoned += 1;
  }

  const abandoned = await listAbandonedSessionsForEmail(nowIso);
  for (const session of abandoned) {
    if (session.unsubscribedAt || session.convertedAt || !session.abandonedAt) continue;
    const abandonedAtMs = new Date(session.abandonedAt).getTime();
    const events = await listCartRecoveryEvents(session.id);

    for (const step of settings.emails) {
      if (!step.enabled) continue;
      const alreadySent = events.some(
        (e) => e.type === 'email_sent' && e.emailStep === step.step,
      );
      if (alreadySent) continue;

      const dueAt = abandonedAtMs + step.delayMinutes * 60 * 1000;
      if (now.getTime() < dueAt) continue;

      // Stop later steps if earlier required step failed repeatedly? Spec: send each once when due.
      const status = await sendRecoveryEmailStep({ session, step });
      if (status === 'sent') result.emailsSent += 1;
      else if (status === 'failed') result.emailsFailed += 1;
      else result.emailsSkipped += 1;
    }
  }

  const expired = await listExpiredOpenSessions(nowIso);
  for (const session of expired) {
    await saveCartRecoverySession({
      ...session,
      status: 'expired',
      updatedAt: nowIso,
    });
    await appendCartRecoveryEvent({
      id: createCartRecoveryEventId(),
      sessionId: session.id,
      type: 'expired',
      emailStep: null,
      idempotencyKey: `cart_recovery:${session.id}:expired`,
      providerMessageId: null,
      errorMessage: null,
      meta: null,
      createdAt: nowIso,
    });
    result.expired += 1;
  }

  return result;
}
