import { NextResponse } from 'next/server';

import { saveContactMessage } from '@/lib/contact/store';
import {
  hasContactFormErrors,
  validateContactForm,
  type ContactFormValues,
} from '@/lib/contact/validation';
import { dispatchTransactionalEmail } from '@/lib/notifications/email';
import { isEmailConfigured } from '@/lib/config/env';
import { getAdminNotificationEmail } from '@/lib/settings/site-settings';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormValues;
    const errors = validateContactForm(body);
    if (hasContactFormErrors(errors)) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const saved = await saveContactMessage(body, {
      userAgent: request.headers.get('user-agent') ?? undefined,
    });

    // Email failures must not fail the contact persistence response.
    try {
      const companyName = process.env.EMAIL_COMPANY_NAME?.trim() || 'NovaLikes';
      const adminTo = await getAdminNotificationEmail();
      if (adminTo && isEmailConfigured()) {
        await dispatchTransactionalEmail({
          templateId: 'contact_admin',
          to: adminTo,
          orderId: saved.orderId || saved.id,
          idempotencyKey: `contact_admin:${saved.id}`,
          variables: {
            fullName: saved.fullName,
            email: saved.email,
            subject: saved.subject,
            orderId: saved.orderId || 'n/a',
            message: saved.message,
            companyName,
          },
        });
      }
      if (isEmailConfigured()) {
        await dispatchTransactionalEmail({
          templateId: 'contact_acknowledgement',
          to: saved.email,
          orderId: saved.id,
          idempotencyKey: `contact_ack:${saved.id}`,
          variables: {
            fullName: saved.fullName,
            companyName,
          },
        });
      }
    } catch (error) {
      console.error('[contact] email dispatch failed', {
        id: saved.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }

    return NextResponse.json({
      ok: true,
      id: saved.id,
      message: 'Thanks — your message was received.',
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to submit the form right now.' },
      { status: 500 },
    );
  }
}
