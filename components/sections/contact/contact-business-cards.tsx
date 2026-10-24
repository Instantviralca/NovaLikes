import type { ReactNode } from 'react';
import { Building2, Headphones, Mail, MapPin, Phone, Share2 } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { HoverLift } from '@/components/motion/hover-lift';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicBusinessContact } from '@/lib/site/public-contact';
import { cn } from '@/lib/utils';

type ContactBusinessCardsProps = {
  business: PublicBusinessContact;
  emptyMessage: string;
  showExtraDetails: boolean;
  sectionDescription?: string;
};

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Building2;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--nl-bg-soft)] text-[var(--brand-primary)]">
        <Icon className="size-4" strokeWidth={2} aria-hidden />
      </span>
      <div className="min-w-0 space-y-0.5">
        <dt className="text-sm font-medium text-foreground">{label}</dt>
        <dd className="text-sm text-muted-foreground">{children}</dd>
      </div>
    </div>
  );
}

/** Business Information and Support Information — two premium cards. */
export function ContactBusinessCards({
  business,
  emptyMessage,
  showExtraDetails,
  sectionDescription,
}: ContactBusinessCardsProps) {
  return (
    <div className="space-y-6">
      {sectionDescription ? (
        <MutedText className="max-w-2xl">{sectionDescription}</MutedText>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <HoverLift className="h-full">
          <Card
            className={cn(
              'flex h-full flex-col border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_14px_32px_-24px_rgba(28,25,23,0.3)]',
            )}
          >
            <CardHeader className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--nl-bg-soft)] text-[var(--brand-primary)]">
                  <Building2 className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <CardTitle className="text-lg">Business Information</CardTitle>
              </div>
              <dl className="space-y-4">
                <InfoRow icon={Building2} label="Business name">
                  {business.legalName}
                </InfoRow>
                {business.address ? (
                  <InfoRow icon={MapPin} label="Address">
                    {business.address}
                  </InfoRow>
                ) : null}
                {business.phone ? (
                  <InfoRow icon={Phone} label="Phone">
                    {business.phone}
                  </InfoRow>
                ) : null}
                {business.socialLinks.length > 0 ? (
                  <InfoRow icon={Share2} label="Social">
                    <ul className="flex flex-wrap gap-3">
                      {business.socialLinks.map((link) => (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            className="underline-offset-4 hover:underline"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {link.id}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </InfoRow>
                ) : null}
              </dl>
            </CardHeader>
          </Card>
        </HoverLift>

        <HoverLift className="h-full">
          <Card
            className={cn(
              'flex h-full flex-col border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_14px_32px_-24px_rgba(28,25,23,0.3)]',
            )}
          >
            <CardHeader className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--nl-bg-soft)] text-[var(--brand-primary)]">
                  <Headphones className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <CardTitle className="text-lg">Support Information</CardTitle>
              </div>
              <dl className="space-y-4">
                {business.email ? (
                  <InfoRow icon={Mail} label="Email">
                    <a
                      href={`mailto:${business.email}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {business.email}
                    </a>
                  </InfoRow>
                ) : null}
                {business.officeHours ? (
                  <InfoRow icon={Headphones} label="Office hours">
                    {business.officeHours}
                  </InfoRow>
                ) : null}
              </dl>
              {!showExtraDetails ? (
                <CardDescription className="text-[0.9375rem] leading-relaxed">
                  {emptyMessage}
                </CardDescription>
              ) : null}
            </CardHeader>
          </Card>
        </HoverLift>
      </div>
    </div>
  );
}
