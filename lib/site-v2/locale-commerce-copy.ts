import type { UiDictionary } from '@/lib/i18n/content/ui-english';

export type SiteV2CartCopy = {
  addedToast: string;
  viewCart: string;
  itemsCount: string;
  itemCount: string;
  addAnotherService: string;
  drawerFine: string;
  pageFine: string;
  itemsHeading: string;
  itemHeading: string;
  trust: readonly string[];
};

export type SiteV2CheckoutCopy = {
  total: string;
  oneTime: string;
  orderSummaryToggle: string;
  steps: readonly [string, string, string];
  backToCart: string;
  yourDetails: string;
  updatesHint: string;
  optional: string;
  payment: string;
  encrypted: string;
  haveCoupon: string;
  placeOrderWithTotal: string;
  trust: readonly string[];
  legal: {
    terms: string;
    privacy: string;
    refund: string;
    contact: string;
  };
};

function cartTrustLines(ui: UiDictionary): readonly string[] {
  return [
    ui.cart.trustNoPassword,
    ui.cart.trustStartWithin,
    ui.cart.trustRefill,
    ui.cart.trustWhatsapp,
  ];
}

function checkoutTrustLines(ui: UiDictionary): readonly string[] {
  return [
    ui.checkout.trustNoPassword,
    ui.checkout.trustStartWithin,
    ui.checkout.trustRefill,
    ui.checkout.trustWhatsapp,
  ];
}

/** Site-v2 cart chrome: locale UI first (English matches SITE_V2_COPY). */
export function siteV2CartCopy(ui: UiDictionary): SiteV2CartCopy {
  return {
    addedToast: ui.cart.addedToast,
    viewCart: ui.cart.viewCart,
    itemsCount: ui.cart.itemsCount,
    itemCount: ui.cart.itemCount,
    addAnotherService: ui.cart.addAnotherService,
    drawerFine: ui.cart.drawerFine,
    pageFine: ui.cart.pageFine,
    itemsHeading: ui.cart.itemsHeading,
    itemHeading: ui.cart.itemHeading,
    trust: cartTrustLines(ui),
  };
}

/** Site-v2 checkout chrome: locale UI first (English matches SITE_V2_COPY). */
export function siteV2CheckoutCopy(ui: UiDictionary): SiteV2CheckoutCopy {
  return {
    total: ui.checkout.total,
    oneTime: ui.checkout.oneTime,
    orderSummaryToggle: ui.checkout.orderSummaryToggle,
    steps: [ui.checkout.stepCart, ui.checkout.stepDetailsPayment, ui.checkout.stepDone],
    backToCart: ui.checkout.backToCart,
    yourDetails: ui.checkout.yourDetails,
    updatesHint: ui.checkout.updatesHint,
    optional: ui.checkout.optional,
    payment: ui.checkout.payment,
    encrypted: ui.checkout.encrypted,
    haveCoupon: ui.checkout.haveCoupon,
    placeOrderWithTotal: ui.checkout.placeOrderWithTotal,
    trust: checkoutTrustLines(ui),
    legal: {
      terms: ui.checkout.legalTerms,
      privacy: ui.checkout.legalPrivacy,
      refund: ui.checkout.legalRefund,
      contact: ui.checkout.legalContact,
    },
  };
}

/** Site-v2 order-success next steps (locale UI first). */
export function siteV2OrderSuccessNextSteps(ui: UiDictionary): readonly string[] {
  return [ui.orderSuccess.nextEmail, ui.orderSuccess.nextTiming, ui.orderSuccess.nextTrack];
}
