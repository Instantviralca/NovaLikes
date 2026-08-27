'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

import { DynamicOrderForm } from '@/components/commerce/order-configuration/dynamic-order-form';
import { OrderDestinationField } from '@/components/commerce/order-configuration/order-destination-field';
import { ValidationMessage } from '@/components/commerce/order-configuration/validation-message';
import { PaymentConfidence } from '@/components/design-system/payment-confidence';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getServiceOrderConfig } from '@/data/order-fields';
import { getPlatformById } from '@/data/platforms';
import { useCartToast } from '@/components/feedback/cart-toast';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { getServicePageAnalytics } from '@/lib/analytics';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { useCart } from '@/lib/cart';
import {
  localizeAddedToCart,
  localizeOrderDescription,
  localizeOrderFieldForDisplay,
  localizeValidationMessage,
} from '@/lib/i18n/order-display';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import { formatMoney } from '@/lib/pricing/format';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

export type PackageOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  selectedPackage: PricingPackage | null;
};

/**
 * Desktop dialog / mobile bottom sheet for order destination details.
 * Radix Dialog provides focus trap, Escape to close, and focus return.
 */
export function PackageOrderDialog({
  open,
  onOpenChange,
  service,
  selectedPackage,
}: PackageOrderDialogProps) {
  const cart = useCart();
  const { showCartToast } = useCartToast();
  const { ui } = useI18nChrome();
  const config = useMemo(
    () => getServiceOrderConfig(service.slug, selectedPackage),
    [service.slug, selectedPackage],
  );
  const displayFields = useMemo(
    () => config.fields.map((field) => localizeOrderFieldForDisplay(field, ui)),
    [config.fields, ui],
  );
  const primaryField = displayFields.find(
    (field) => field.type === 'username' || field.type === 'url',
  );
  const extraFields = displayFields.filter((field) => field !== primaryField);
  // Validate against original config field definitions (English labels in messages),
  // then localize messages for display.
  const primaryFieldSource = config.fields.find(
    (field) => field.type === 'username' || field.type === 'url',
  );

  const [values, setValues] = useState<OrderConfigurationValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const submitLock = useRef(false);

  useEffect(() => {
    if (!open) return;
    setValues({});
    setErrors({});
    setFormError(undefined);
    setSubmitting(false);
    submitLock.current = false;
  }, [open, selectedPackage?.id]);

  if (!selectedPackage) return null;

  const handleChange = (name: string, value: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setFormError(undefined);
  };

  const handleAddToCart = () => {
    if (submitLock.current || submitting) return;
    submitLock.current = true;
    setSubmitting(true);

    const analytics = getServicePageAnalytics(service.slug);
    const normalized = normalizeOrderConfigurationValues(config.fields, values);
    const validationErrors = validateOrderConfiguration(config.fields, normalized);

    if (validationErrors.length > 0) {
      setErrors(
        Object.fromEntries(
          validationErrors.map((e) => [e.fieldId, localizeValidationMessage(e.message, ui)]),
        ),
      );
      setFormError(ui.orderDialog.fixHighlighted);
      submitLock.current = false;
      setSubmitting(false);
      return;
    }

    setErrors({});
    setFormError(undefined);
    setValues(normalized);

    // Never include username/URL in analytics payloads.
    analytics?.configurationSubmit({
      packageId: selectedPackage.id,
      serviceSlug: service.slug,
    });

    if (
      typeof normalized.customComments === 'string' &&
      normalized.customComments.length > 0
    ) {
      analytics?.customTextSubmit?.({
        packageId: selectedPackage.id,
        serviceSlug: service.slug,
      });
    }

    emitLegacyAnalyticsEvent('cart_item_add', {
      packageId: selectedPackage.id,
      serviceSlug: service.slug,
      quantity: selectedPackage.quantity,
      displayedPrice: selectedPackage.price,
      currency: selectedPackage.currency,
    });

    cart.addItem({
      packageId: selectedPackage.id,
      serviceId: service.id,
      serviceSlug: service.slug,
      serviceName: service.name,
      platformId: service.platform,
      packageTitle: selectedPackage.title,
      quantity: selectedPackage.quantity,
      quantityLabel: selectedPackage.quantityLabel,
      unitPrice: selectedPackage.price,
      currency: selectedPackage.currency,
      deliveryTime: selectedPackage.deliveryTime,
      configuration: normalized,
    });

    const qty = new Intl.NumberFormat('en-US').format(selectedPackage.quantity);
    const platformName = getPlatformById(service.platform)?.name ?? '';
    const productLabel = `${platformName} ${service.shortName}`.trim();
    showCartToast({
      title: localizeAddedToCart(qty, productLabel, ui),
      quantityLabel: selectedPackage.quantityLabel,
      priceLabel: formatMoney(selectedPackage.price, selectedPackage.currency),
      serviceName: productLabel,
    });

    onOpenChange(false);
    // Unlock after close so a re-open can submit again.
    window.setTimeout(() => {
      submitLock.current = false;
      setSubmitting(false);
    }, 300);
  };

  const primaryValue =
    primaryFieldSource && typeof values[primaryFieldSource.name] === 'string'
      ? (values[primaryFieldSource.name] as string)
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        aria-describedby="package-order-desc"
        data-analytics="package-order-dialog"
      >
        {/* Drag affordance on mobile */}
        <div
          className="mx-auto mb-1 h-1 w-10 rounded-full bg-border sm:hidden"
          aria-hidden="true"
        />
        <DialogHeader>
          <DialogTitle>{ui.orderDialog.title}</DialogTitle>
          <DialogDescription id="package-order-desc">
            {localizeOrderDescription(selectedPackage.quantityLabel, ui)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-3 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold text-foreground">{selectedPackage.quantityLabel}</p>
            <p className="font-bold text-[var(--brand-primary)]">
              {formatMoney(selectedPackage.price, selectedPackage.currency)}
            </p>
          </div>
          <p className="text-muted-foreground">{service.name}</p>
          {selectedPackage.deliveryTime ? (
            <p className="text-xs text-muted-foreground">
              {ui.orderDialog.delivery}: {selectedPackage.deliveryTime}
            </p>
          ) : null}
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-success)]">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            {ui.orderDialog.noPasswordRequired}
          </p>
        </div>

        <div className="space-y-4">
          {primaryField && primaryFieldSource ? (
            <OrderDestinationField
              field={primaryField}
              value={primaryValue}
              error={errors[primaryFieldSource.id] ?? errors[primaryFieldSource.name]}
              onChange={handleChange}
              autoFocus
            />
          ) : null}
          {extraFields.length > 0 ? (
            <DynamicOrderForm
              fields={extraFields}
              values={values}
              errors={errors}
              onChange={handleChange}
            />
          ) : null}
          <ValidationMessage message={formError} />
          <PaymentConfidence className="rounded-lg border border-border bg-muted/20 p-3" />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            {ui.commerce.cancel}
          </Button>
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={submitting}
            data-analytics="add-to-cart"
            className="min-h-11 bg-[var(--brand-primary)] font-semibold"
          >
            {submitting ? ui.commerce.addingToCart : ui.commerce.addToCart}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Mobile-oriented alias — same responsive dialog/sheet surface. */
export function PackageOrderSheet(props: PackageOrderDialogProps) {
  return <PackageOrderDialog {...props} />;
}
