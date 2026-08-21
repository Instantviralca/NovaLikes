'use client';

import Link from 'next/link';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { routes } from '@/config/routes';
import { localizeHref } from '@/lib/i18n/paths';

type TermsAgreementProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
  termsHref?: string;
  privacyHref?: string;
};

export function TermsAgreement({
  checked,
  onCheckedChange,
  error,
  termsHref,
  privacyHref,
}: TermsAgreementProps) {
  const { locale, ui } = useI18nChrome();
  const terms = termsHref ?? localizeHref(routes.termsAndConditions, locale);
  const privacy = privacyHref ?? localizeHref(routes.privacyPolicy, locale);
  const refund = localizeHref(routes.refundPolicy, locale);

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms-agreement"
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(Boolean(value))}
          aria-invalid={Boolean(error)}
        />
        <Label htmlFor="terms-agreement" className="leading-snug font-normal">
          {ui.checkout.termsAgreePrefix}{' '}
          <Link href={terms} className="underline underline-offset-2" target="_blank">
            {ui.checkout.termsOfService}
          </Link>
          {ui.checkout.termsJoin}
          <Link href={privacy} className="underline underline-offset-2" target="_blank">
            {ui.checkout.privacyPolicy}
          </Link>
          {ui.checkout.termsAnd}
          <Link href={refund} className="underline underline-offset-2" target="_blank">
            {ui.checkout.refundPolicy}
          </Link>
          {ui.checkout.termsPeriod}
        </Label>
      </div>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
