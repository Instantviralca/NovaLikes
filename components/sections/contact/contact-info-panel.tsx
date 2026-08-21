import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Clock,
  Headphones,
  Mail,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import { routes } from '@/config/routes';
import { getEnglishContactSource } from '@/lib/i18n/content/company-english';
import type { ContactPageOverlay } from '@/lib/i18n/content/company-english';
import { getPublicBusinessContact } from '@/lib/site/public-contact';
import { cn } from '@/lib/utils';

type ContactChannel = {
  id: string;
  title: string;
  description: ReactNode;
  icon: LucideIcon;
  iconClass: string;
};

type ContactInfoPanelProps = {
  className?: string;
  chrome?: ContactPageOverlay['chrome'];
  trackOrderHref?: string;
};

/** Contact information list matched to the Contact mockup. */
export function ContactInfoPanel({
  className,
  chrome = getEnglishContactSource().chrome,
  trackOrderHref = routes.trackOrder,
}: ContactInfoPanelProps) {
  const business = getPublicBusinessContact();
  const email = business.email ?? 'support@novalikes.com';

  const channels: ContactChannel[] = [
    {
      id: 'email',
      title: chrome.emailTitle,
      description: (
        <>
          <a
            href={`mailto:${email}`}
            className="font-medium text-[var(--brand-primary)] hover:underline"
            dir="ltr"
          >
            {email}
          </a>
          <span className="block text-[var(--text-secondary)]">{chrome.emailReply}</span>
        </>
      ),
      icon: Mail,
      iconClass: 'bg-[#FFF1E6] text-[var(--brand-primary)]',
    },
    {
      id: 'live-chat',
      title: chrome.liveChatTitle,
      description: (
        <>
          <span className="font-medium text-[var(--text-primary)]">{chrome.liveChatAvailable}</span>
          <span className="block text-[var(--text-secondary)]">{chrome.liveChatHelp}</span>
        </>
      ),
      icon: MessageCircle,
      iconClass: 'bg-[#E8F1FF] text-[#2563EB]',
    },
    {
      id: 'quick-support',
      title: chrome.quickTitle,
      description: (
        <>
          <span className="font-medium text-[var(--text-primary)]">{chrome.quickHours}</span>
          <span className="block text-[var(--text-secondary)]">{chrome.quickReach}</span>
        </>
      ),
      icon: Headphones,
      iconClass: 'bg-[#E8F8EF] text-[#16A34A]',
    },
    {
      id: 'response',
      title: chrome.responseTitle,
      description: (
        <span className="text-[var(--text-secondary)]">
          {chrome.responseAverage}{' '}
          <span className="font-medium text-[var(--text-primary)]">{chrome.responseTime}</span>
        </span>
      ),
      icon: Clock,
      iconClass: 'bg-[#F3E8FF] text-[#7C3AED]',
    },
    {
      id: 'order-support',
      title: chrome.orderTitle,
      description: (
        <>
          <span className="block text-[var(--text-secondary)]">{chrome.orderHelp}</span>
          <Link
            href={trackOrderHref}
            className="font-semibold text-[var(--brand-primary)] hover:underline"
          >
            {chrome.orderLink}
          </Link>
        </>
      ),
      icon: ShieldCheck,
      iconClass: 'bg-[#FFF1E6] text-[var(--brand-primary)]',
    },
  ];

  return (
    <div className={cn('space-y-5', className)}>
      {channels.map((channel) => {
        const Icon = channel.icon;
        return (
          <div key={channel.id} className="flex items-start gap-3.5">
            <span
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-full',
                channel.iconClass,
              )}
            >
              <Icon className="size-5" strokeWidth={2.25} aria-hidden />
            </span>
            <div className="min-w-0 space-y-0.5 text-sm leading-snug">
              <p className="font-bold text-[var(--text-primary)]">{channel.title}</p>
              <div>{channel.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
