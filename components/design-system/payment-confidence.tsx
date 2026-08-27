'use client';

import Link from 'next/link';
import { Lock, RefreshCw, ShieldCheck } from 'lucide-react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

export type PaymentConfidenceProps = {
  className?: string;
  /** When true, include a refund policy link. */
  showRefundLink?: boolean;
};

/**
 * Concise payment reassurance for cart, checkout, and order dialogs.
 * Uses existing brand tokens — no invented guarantees beyond published policy.
 */
export function PaymentConfidence({
  className,
  showRefundLink = true,
}: PaymentConfidenceProps) {
  const { ui } = useI18nChrome();

  return (
    <ul
      className={cn(
        'flex flex-col gap-2 text-xs font-medium text-[var(--text-secondary)]',
        className,
      )}
      aria-label={ui.orderDialog.paymentReassuranceAria}
    >
      <li className="inline-flex items-center gap-2">
        <ShieldCheck className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        <span>{ui.orderDialog.secureCheckoutEncrypted}</span>
      </li>
      <li className="inline-flex items-center gap-2">
        <Lock className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        <span>{ui.orderDialog.noPasswordRequired}</span>
      </li>
      <li className="inline-flex items-center gap-2">
        <RefreshCw className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        {showRefundLink ? (
          <span>
            {ui.orderDialog.moneyBackGuarantee} ·{' '}
            <Link
              href={routes.refundPolicy}
              className="underline underline-offset-2 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {ui.footer.refundPolicy}
            </Link>
          </span>
        ) : (
          <span>{ui.orderDialog.moneyBackGuarantee}</span>
        )}
      </li>
    </ul>
  );
}
