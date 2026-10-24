'use client';

import Link from 'next/link';

import { useI18nChrome } from '@/components/i18n/i18n-chrome';
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
    <div>
      <label className="check">
        <input
          type="checkbox"
          id="terms-agreement"
          checked={checked}
          aria-invalid={Boolean(error)}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <span>
          {ui.checkout.termsAgreePrefix}{' '}
          <Link href={terms} target="_blank">
            {ui.checkout.termsOfService}
          </Link>
          {ui.checkout.termsJoin}
          <Link href={privacy} target="_blank">
            {ui.checkout.privacyPolicy}
          </Link>
          {ui.checkout.termsAnd}
          <Link href={refund} target="_blank">
            {ui.checkout.refundPolicy}
          </Link>
          {ui.checkout.termsPeriod}
        </span>
      </label>
      {error ? (
        <p className="err" role="alert" style={{ marginTop: 8 }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
