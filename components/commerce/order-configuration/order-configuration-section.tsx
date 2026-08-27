'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { AddToCartButton } from '@/components/commerce/order-configuration/add-to-cart-button';
import { DynamicOrderForm } from '@/components/commerce/order-configuration/dynamic-order-form';
import { OrderSummary } from '@/components/commerce/order-configuration/order-summary';
import { ValidationMessage } from '@/components/commerce/order-configuration/validation-message';
import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { getServiceOrderConfig } from '@/data/order-fields';
import { getServicePageAnalytics } from '@/lib/analytics';
import { useCart } from '@/lib/cart';
import {
  localizeOrderDescription,
  localizeOrderFieldForDisplay,
  localizeValidationMessage,
} from '@/lib/i18n/order-display';
import {
  normalizeOrderConfigurationValues,
  validateOrderConfiguration,
} from '@/lib/order/validation';
import { cn } from '@/lib/utils';
import type { OrderConfigurationValues } from '@/types/order-fields';
import type { PricingPackage } from '@/types/pricing';
import type { Service } from '@/types/service';

export type OrderConfigurationSectionProps = {
  service: Service;
  selectedPackage: PricingPackage | null;
  onBackToPackages?: () => void;
  className?: string;
};

export function OrderConfigurationSection({
  service,
  selectedPackage,
  onBackToPackages,
  className,
}: OrderConfigurationSectionProps) {
  const cart = useCart();
  const { ui } = useI18nChrome();
  const config = useMemo(
    () => getServiceOrderConfig(service.slug, selectedPackage),
    [service.slug, selectedPackage],
  );
  const displayFields = useMemo(
    () => config.fields.map((field) => localizeOrderFieldForDisplay(field, ui)),
    [config.fields, ui],
  );
  const [values, setValues] = useState<OrderConfigurationValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [added, setAdded] = useState(false);

  // Drop values for fields that disappear when the package changes (e.g. custom comments).
  useEffect(() => {
    const allowed = new Set(config.fields.map((field) => field.name));
    setValues((prev) => {
      const next: OrderConfigurationValues = {};
      for (const [key, value] of Object.entries(prev)) {
        if (allowed.has(key)) next[key] = value;
      }
      return next;
    });
    setErrors({});
    setFormError(undefined);
    setAdded(false);
  }, [config.fields, selectedPackage?.id]);

  if (!selectedPackage) {
    return (
      <Section
        id="order-configuration"
        className={cn(className)}
        aria-label={ui.orderDialog.title}
      >
        <Container size="xl">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <MutedText>{ui.commerce.choosePackage}</MutedText>
          </div>
        </Container>
      </Section>
    );
  }

  const handleChange = (name: string, value: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setAdded(false);
  };

  const handleAddToCart = () => {
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
      return;
    }

    setErrors({});
    setFormError(undefined);
    setValues(normalized);

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

    analytics?.checkoutStart({
      packageId: selectedPackage.id,
      serviceSlug: service.slug,
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
    setAdded(true);
  };

  return (
    <Section
      id="order-configuration"
      className={cn(className)}
      aria-label={ui.orderDialog.title}
      data-analytics="order-configuration"
    >
      <Container size="xl">
        <div className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2">
            {ui.orderDialog.title}
          </Heading>
          <MutedText>
            {localizeOrderDescription(selectedPackage.quantityLabel, ui)}
            {selectedPackage.commentType
              ? ` ${selectedPackage.commentType}.`
              : ''}
          </MutedText>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <DynamicOrderForm
              fields={displayFields}
              values={values}
              errors={errors}
              onChange={handleChange}
            />
            <ValidationMessage message={formError} />
            <div className="flex flex-wrap gap-3">
              <AddToCartButton
                onClick={handleAddToCart}
                label={ui.commerce.addToCart}
              />
              {onBackToPackages ? (
                <Button type="button" variant="outline" size="lg" onClick={onBackToPackages}>
                  {ui.checkout.back}
                </Button>
              ) : null}
              {added ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={routes.cart}>{ui.cart.viewFullCart}</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <OrderSummary pkg={selectedPackage} />
        </div>
      </Container>
    </Section>
  );
}
