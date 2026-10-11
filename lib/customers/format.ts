import { ACCOUNT_UI } from '@/lib/customers/messages';
import type { PaymentStatus } from '@/types/payment';

/** Account UI date: 11 Oct 2026 */
export function formatAccountDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

export function getPaymentBadgeLabel(
  status: PaymentStatus | string | null | undefined,
): string {
  switch (status) {
    case 'paid':
      return ACCOUNT_UI.orderDetail.paymentPaid;
    case 'failed':
      return ACCOUNT_UI.orderDetail.paymentFailed;
    case 'cancelled':
      return ACCOUNT_UI.orderDetail.paymentCancelled;
    case 'refunded':
      return ACCOUNT_UI.orderDetail.paymentRefunded;
    case 'pending':
    case 'processing':
    default:
      return ACCOUNT_UI.orderDetail.paymentAwaiting;
  }
}
