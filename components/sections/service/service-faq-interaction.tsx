'use client';

import { useEffect } from 'react';

import { getServicePageAnalytics } from '@/lib/analytics';

type ServiceFaqInteractionProps = {
  serviceSlug?: string;
  pinnedIds: string[];
};

/**
 * Tiny island: keep pinned FAQs open and emit faqOpen without hydrating the answers.
 */
export function ServiceFaqInteraction({
  serviceSlug,
  pinnedIds,
}: ServiceFaqInteractionProps) {
  useEffect(() => {
    const root = document.querySelector('[data-service-faq]');
    if (!root) return;

    const onToggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !root.contains(details)) {
        return;
      }
      const faqId = details.dataset.faqId;
      if (!faqId) return;

      if (pinnedIds.includes(faqId) && !details.open) {
        details.open = true;
        return;
      }

      if (details.open && serviceSlug) {
        getServicePageAnalytics(serviceSlug)?.faqOpen({
          faqId,
          serviceSlug,
        });
      }
    };

    root.addEventListener('toggle', onToggle, true);
    return () => root.removeEventListener('toggle', onToggle, true);
  }, [pinnedIds, serviceSlug]);

  return null;
}
