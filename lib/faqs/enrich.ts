/**
 * Configuration-driven FAQ answer enrichment — Document 14.04.
 * Payment methods and currency come from production config only.
 */

import { getEnabledPaymentProviders } from '@/config/payments';
import { getDefaultCurrency } from '@/data/pricing/currencies';
import type { FaqRecord, PublicFaq } from '@/types/faq';

export const PAYMENT_METHODS_FAQ_ID = 'faq-pr-payment-methods';
export const CURRENCY_FAQ_ID = 'faq-pr-currency';

export function enrichFaqAnswer(answer: string, faqId: string): string {
  if (faqId === PAYMENT_METHODS_FAQ_ID) {
    const enabled = getEnabledPaymentProviders();
    if (enabled.length === 0) {
      return 'No payment methods are currently enabled at checkout.';
    }
    const methods = enabled.map((provider) => provider.displayName).join(', ');
    return `NovaLikes currently accepts ${methods} at checkout. Available options can change, so always confirm the payment methods shown when you place an order.`;
  }

  if (faqId === CURRENCY_FAQ_ID) {
    const currency = getDefaultCurrency();
    return `NovaLikes package prices are shown in ${currency.code} (${currency.label}).`;
  }

  return answer;
}

export function enrichFaqRecord(faq: FaqRecord): FaqRecord {
  return {
    ...faq,
    answer: enrichFaqAnswer(faq.answer, faq.id),
  };
}

export function enrichPublicFaq(faq: PublicFaq): PublicFaq {
  return {
    ...faq,
    answer: enrichFaqAnswer(faq.answer, faq.id),
  };
}
