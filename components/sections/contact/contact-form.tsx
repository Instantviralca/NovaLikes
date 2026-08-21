'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Hash,
  Lock,
  Mail,
  MessageSquare,
  Send,
  Tag,
  User,
  type LucideIcon,
} from 'lucide-react';

import { FormField } from '@/components/forms/form-field';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  contactAnalyticsEvents,
  trackContactEvent,
} from '@/lib/analytics/contact-events';
import {
  hasContactFormErrors,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '@/lib/contact/validation';
import type { ContactFormFieldCopy, CTAContent } from '@/types/content';
import type { ContactPageOverlay } from '@/lib/i18n/content/company-english';
import { getEnglishContactSource } from '@/lib/i18n/content/company-english';

type ContactCtaButtonsProps = {
  primaryCta: CTAContent;
  secondaryCta?: CTAContent;
  location: 'hero' | 'final';
  align?: 'center' | 'start' | 'responsive';
};

/** Hero / final CTA buttons with typed contact analytics. */
export function ContactCtaButtons({
  primaryCta,
  secondaryCta,
  location,
  align = 'center',
}: ContactCtaButtonsProps) {
  const trackPrimary = () => {
    if (primaryCta.href.includes('track-order')) {
      trackContactEvent(contactAnalyticsEvents.contact_track_order_click, {
        href: primaryCta.href,
        cta: 'primary',
        location,
      });
    }
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap',
        align === 'start' && 'sm:justify-start',
        align === 'center' && 'sm:justify-center',
        align === 'responsive' && 'sm:justify-center lg:justify-start',
      )}
    >
      <Button asChild size="lg" className="min-h-11 w-full sm:w-auto">
        <Link
          href={primaryCta.href}
          data-analytics={
            primaryCta.href.includes('track-order')
              ? contactAnalyticsEvents.contact_track_order_click
              : undefined
          }
          onClick={trackPrimary}
        >
          {primaryCta.label}
        </Link>
      </Button>
      {secondaryCta ? (
        <Button asChild size="lg" variant="outline" className="min-h-11 w-full sm:w-auto">
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </Button>
      ) : null}
    </div>
  );
}

/** Fires contact_page_view once on mount. */
export function ContactPageViewTracker() {
  useEffect(() => {
    trackContactEvent(contactAnalyticsEvents.contact_page_view);
  }, []);

  return null;
}

type ContactFormProps = {
  fields: ContactFormFieldCopy;
  chrome?: ContactPageOverlay['chrome'];
  /** When true, omit the outer card chrome (used inside the Contact mockup panel). */
  embedded?: boolean;
  className?: string;
};

const inputClassName =
  'min-h-11 rounded-xl border-[var(--border-subtle)] bg-white ps-10 transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-[var(--brand-primary)]/45 focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand-primary)_12%,transparent)] focus-visible:ring-0';

const inputErrorClassName =
  'border-destructive focus-visible:border-destructive focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--destructive)_12%,transparent)]';

type ContactFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  rows?: number;
  multiline?: boolean;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  dir?: 'ltr' | 'rtl';
};

function ContactField({
  id,
  name,
  label,
  placeholder,
  helper,
  error,
  required,
  type = 'text',
  autoComplete,
  rows = 6,
  multiline = false,
  icon: Icon,
  value,
  onChange,
  dir,
}: ContactFieldProps) {
  const fieldClass = cn(inputClassName, error && inputErrorClassName, multiline && 'min-h-[9rem] resize-y pt-3');

  return (
    <FormField label={label} htmlFor={id} helper={helper} error={error} required={required}>
      <div className="relative">
        <Icon
          className={cn(
            'pointer-events-none absolute start-3.5 size-4 text-muted-foreground transition-colors duration-200',
            multiline ? 'top-3.5' : 'top-1/2 -translate-y-1/2',
            error && 'text-destructive',
          )}
          strokeWidth={2}
          aria-hidden
        />
        {multiline ? (
          <Textarea
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            rows={rows}
            aria-invalid={!!error}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={fieldClass}
          />
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            aria-invalid={!!error}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={fieldClass}
            dir={dir}
          />
        )}
      </div>
    </FormField>
  );
}

const emptyValues: ContactFormValues = {
  fullName: '',
  email: '',
  subject: '',
  orderId: '',
  message: '',
};

function localizeFormErrors(
  values: ContactFormValues,
  raw: ContactFormErrors,
  chrome: ContactPageOverlay['chrome'],
): ContactFormErrors {
  const next: ContactFormErrors = {};
  if (raw.fullName) next.fullName = chrome.fullNameRequired;
  if (raw.email) {
    next.email = values.email.trim() ? chrome.emailInvalid : chrome.emailRequired;
  }
  if (raw.subject) next.subject = chrome.subjectRequired;
  if (raw.message) {
    next.message = values.message.trim() ? chrome.messageMin : chrome.messageRequired;
  }
  return next;
}

/** Validated contact form — posts to /api/contact for server-side storage. */
export function ContactForm({
  fields,
  chrome = getEnglishContactSource().chrome,
  embedded = false,
  className,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (key: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--brand-accent-soft)_40%,white)] p-6 shadow-[0_14px_32px_-24px_rgba(28,25,23,0.28)] sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-[var(--shadow-xs)]">
            <CheckCircle2 className="size-6" strokeWidth={2} aria-hidden />
          </span>
          <div className="space-y-2">
            <Heading as="h3" size="h4">
              {fields.successTitle}
            </Heading>
            <MutedText>{fields.successDescription}</MutedText>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-6 min-h-11"
          onClick={() => {
            setSubmitted(false);
            setValues(emptyValues);
            setErrors({});
          }}
        >
          {chrome.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn(
        'space-y-5',
        !embedded &&
          'rounded-2xl border border-[var(--border-subtle)] bg-card p-6 shadow-[0_14px_32px_-24px_rgba(28,25,23,0.22)] sm:p-8',
        className,
      )}
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const nextErrors = localizeFormErrors(values, validateContactForm(values), chrome);
        setErrors(nextErrors);
        if (hasContactFormErrors(nextErrors)) return;

        trackContactEvent(contactAnalyticsEvents.contact_form_submit, {
          location: 'form',
          hasOrderId: values.orderId.trim().length > 0,
        });

        setSubmitError(null);
        setSubmitting(true);
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          const data = (await response.json()) as { ok?: boolean; error?: string };
          if (!response.ok || !data.ok) {
            setSubmitError(data.error ?? chrome.submitError);
            setSubmitting(false);
            return;
          }
          setSubmitted(true);
        } catch {
          setSubmitError(chrome.submitError);
          setSubmitting(false);
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactField
          id="contact-full-name"
          name="fullName"
          label={fields.fullNameLabel}
          placeholder={fields.fullNamePlaceholder}
          autoComplete="name"
          required
          icon={User}
          value={values.fullName}
          error={errors.fullName}
          onChange={(value) => update('fullName', value)}
        />
        <ContactField
          id="contact-email"
          name="email"
          type="email"
          label={fields.emailLabel}
          placeholder={fields.emailPlaceholder}
          autoComplete="email"
          required
          icon={Mail}
          value={values.email}
          error={errors.email}
          onChange={(value) => update('email', value)}
          dir="ltr"
        />
      </div>
      <ContactField
        id="contact-subject"
        name="subject"
        label={fields.subjectLabel}
        placeholder={fields.subjectPlaceholder}
        required
        icon={Tag}
        value={values.subject}
        error={errors.subject}
        onChange={(value) => update('subject', value)}
      />
      <ContactField
        id="contact-order-id"
        name="orderId"
        label={fields.orderIdLabel}
        placeholder={fields.orderIdPlaceholder}
        helper={fields.orderIdHelper}
        autoComplete="off"
        icon={Hash}
        value={values.orderId}
        error={errors.orderId}
        onChange={(value) => update('orderId', value)}
        dir="ltr"
      />
      <ContactField
        id="contact-message"
        name="message"
        label={fields.messageLabel}
        placeholder={fields.messagePlaceholder}
        required
        multiline
        icon={MessageSquare}
        value={values.message}
        error={errors.message}
        onChange={(value) => update('message', value)}
      />
      {submitError ? (
        <p
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="min-h-11 w-full" disabled={submitting}>
        <Send className="size-4" aria-hidden />
        {submitting ? chrome.sending : fields.submitLabel}
      </Button>
      <p className="flex items-center justify-center gap-2 text-center text-xs text-[var(--text-secondary)]">
        <Lock className="size-3.5 shrink-0" aria-hidden />
        {chrome.privacyNote}
      </p>
    </form>
  );
}
