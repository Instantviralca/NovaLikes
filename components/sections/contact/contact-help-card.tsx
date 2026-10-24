import { ClipboardList, Headphones, HelpCircle, ShoppingBag, type LucideIcon } from 'lucide-react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/cards/card';
import { HoverLift } from '@/components/motion/hover-lift';
import { cn } from '@/lib/utils';

const HELP_ICONS: Record<string, LucideIcon> = {
  'contact-option-sales': ShoppingBag,
  'contact-option-support': Headphones,
  'contact-option-orders': ClipboardList,
  'contact-option-general': HelpCircle,
};

type ContactHelpCardProps = {
  id: string;
  title: string;
  description: string;
  className?: string;
};

/** Premium contact option card with icon and hover lift. */
export function ContactHelpCard({ id, title, description, className }: ContactHelpCardProps) {
  const Icon = HELP_ICONS[id] ?? HelpCircle;

  return (
    <HoverLift className="h-full">
      <Card
        className={cn(
          'group flex h-full flex-col border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] hover:shadow-[0_18px_40px_-28px_rgba(28,25,23,0.35)]',
          className,
        )}
      >
        <CardHeader className="flex flex-1 flex-col space-y-3.5 p-5 sm:p-6">
          <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--nl-bg-soft)] text-[var(--brand-primary)] transition-transform duration-200 group-hover:scale-105">
            <Icon className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <div className="space-y-2">
            <CardTitle className="text-base leading-snug">{title}</CardTitle>
            <CardDescription className="flex-1 text-[0.9375rem] leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </HoverLift>
  );
}
