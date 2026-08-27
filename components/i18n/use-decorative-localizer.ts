'use client';

import { useCallback } from 'react';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { isLocalizedLocale } from '@/lib/i18n/config';
import type { UiDictionary } from '@/lib/i18n/content/ui-english';
import { localizeDecorativeText } from '@/lib/i18n/es-visible-display';

/** Longer chrome / decorative phrases first. */
function applyChromePhrases(text: string, ui: UiDictionary): string {
  const d = ui.decorative;
  const replacements: readonly [en: string, localized: string][] = [
    ['Secure Checkout', ui.commerce.secureCheckout],
    ['Choose a Package', ui.commerce.choosePackage],
    ['Choose Package', ui.commerce.choosePackage],
    ['Track Order', ui.footer.trackOrder],
    ['Order Tracking', ui.commerce.orderTracking],
    ['Add to Cart', ui.commerce.addToCart],
    ['Best Selling', ui.commerce.bestSelling],
    ['Most Popular', ui.commerce.mostPopular],
    ['Best Value', ui.commerce.bestValue],
    ['Recommended', ui.commerce.recommended],
    ['Customer Support', ui.commerce.customerSupport],
    ['No Password Required', ui.orderDialog.noPasswordRequired],
    ['No Password', ui.commerce.noPassword],
    ['Checkout Summary', d.checkoutSummary],
    ['Checkout Complete', d.checkoutComplete],
    ['Payment Confirmed', d.paymentConfirmed],
    ['Package Confirmed', d.packageConfirmed],
    ['Package Selected', d.packageSelected],
    ['Selected package', d.selectedPackage],
    ['Order Confirmed', d.orderConfirmed],
    ['Order Complete', d.orderComplete],
    ['Order Processing', d.orderProcessing],
    ['Delivery Started', d.deliveryStarted],
    ['Delivery Complete', d.deliveryComplete],
    ['Enter Username', d.enterUsername],
    ['Ready to track', d.readyToTrack],
    ['Just now', d.justNow],
    ['On track', d.onTrack],
    ['Growth overview', d.growthOverview],
    ['Growth timeline', d.growthTimeline],
    ['Growth chart', d.growthChart],
    ['Account growth', d.accountGrowth],
    ['Live tracking', d.liveTracking],
    ['Profile Verified', d.profileVerified],
    ['Order confirmed', d.orderConfirmed],
    ['Package selected', d.packageSelected],
    ['Selected', d.selected],
    ['Confirmed', d.confirmed],
    ['Pending', d.pending],
    ['Processing', d.processing],
    ['Delivering', d.delivering],
    ['Tracking', d.tracking],
    ['Checkout', d.checkout],
    ['Status', d.statusLabel],
    ['Package', d.package],
    ['Complete', d.complete],
    ['Active', d.activeLabel],
    ['Current', d.current],
    ['Secure', d.secure],
    ['Save', d.save],
    ['Order', d.orderLabel],
    ['Live', d.live],
    ['Done', d.done],
    ['Next', d.next],
    ['Growth', d.growth],
    ['Verified', d.verified],
    ['Analytics', d.analytics],
    ['OFF', ui.commerce.off],
  ];
  let out = text;
  for (const [en, localized] of replacements) {
    if (out.includes(en)) {
      out = out.split(en).join(localized);
    }
  }
  return out;
}

/** Display localizer for decorative copy + shared UI chrome on localized pages. */
export function useDecorativeLocalizer() {
  const { locale, ui } = useI18nChrome();
  return useCallback(
    (text: string) => {
      if (!text) return text;
      let out = text;
      if (isLocalizedLocale(locale)) {
        out = applyChromePhrases(out, ui);
      }
      return localizeDecorativeText(out, locale);
    },
    [locale, ui],
  );
}
