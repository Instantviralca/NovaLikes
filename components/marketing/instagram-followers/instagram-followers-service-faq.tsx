import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import {
  IG_BODY,
  IG_CARD,
  IG_H2,
  IG_SECTION,
} from '@/components/marketing/instagram-followers/polish-tokens';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types/components';

const FAQ_ICONS = [MessageCircle, HelpCircle, MessageCircle, HelpCircle, HelpCircle, HelpCircle, HelpCircle, HelpCircle];

export type InstagramFollowersServiceFaqProps = {
  id?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  analyticsServiceSlug?: string;
  defaultOpenIds?: string[];
  pinnedOpenIds?: string[];
};

export function InstagramFollowersServiceFaq({
  id,
  title,
  description,
  items,
  defaultOpenIds,
  pinnedOpenIds,
}: InstagramFollowersServiceFaqProps) {
  if (items.length === 0) return null;

  const defaultOpen = new Set(defaultOpenIds ?? []);
  const pinned = new Set(pinnedOpenIds ?? []);

  return (
    <Section
      id={id}
      spacing="none"
      className={cn(IG_SECTION, 'bg-white')}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container size="xl">
        <FadeUp immediate className="mx-auto max-w-3xl text-center">
          {title ? (
            <h2 id={id ? `${id}-heading` : undefined} className={IG_H2}>
              {title}
            </h2>
          ) : null}
          {description ? <p className={cn(IG_BODY, 'mt-3')}>{description}</p> : null}
        </FadeUp>

        <div className="mx-auto mt-8 w-full max-w-3xl space-y-3">
          {items.map((item, index) => {
            const Icon = FAQ_ICONS[index] ?? HelpCircle;
            const isDefaultOpen = defaultOpen.has(item.id) || pinned.has(item.id);
            return (
              <FadeUp key={item.id} delay={index * 0.03}>
                <details className={cn(IG_CARD, 'group p-4')} open={isDefaultOpen || undefined}>
                  <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-[#1C1917] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFE4D1] text-[#E85D04]">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-left text-sm sm:text-base">{item.question}</span>
                    <ChevronDown className="size-4 shrink-0 text-[#E85D04] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 whitespace-pre-line pl-12 text-sm leading-relaxed text-[#6B6560]">
                    {item.answer}
                  </p>
                </details>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
