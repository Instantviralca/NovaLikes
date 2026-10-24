import { Faq } from '@/components/sections/faq';
import { cn } from '@/lib/utils';
import type { FaqProps } from '@/components/sections/faq';

type ContactFaqPreviewProps = Omit<FaqProps, 'className'>;

/**
 * Contact page FAQ preview — enhanced search, accordion, and spacing polish.
 */
export function ContactFaqPreview(props: ContactFaqPreviewProps) {
  return (
    <div
      className={cn(
        'contact-faq-preview',
        '[&_input[type=search]]:h-12 [&_input[type=search]]:rounded-2xl',
        '[&_input[type=search]]:border-[var(--nl-border)] [&_input[type=search]]:bg-white',
        '[&_input[type=search]]:pl-11 [&_input[type=search]]:shadow-[0_10px_28px_-18px_rgba(28,25,23,0.32)]',
        '[&_input[type=search]]:transition-[box-shadow,border-color] [&_input[type=search]]:duration-200',
        '[&_input[type=search]]:focus-visible:border-[var(--brand-primary)]/45',
        '[&_input[type=search]]:focus-visible:shadow-[0_14px_32px_-18px_rgba(249,115,22,0.38)]',
        '[&_input[type=search]]:focus-visible:ring-0',
        '[&_.rounded-2xl.border]:rounded-2xl [&_.rounded-2xl.border]:shadow-[0_14px_32px_-24px_rgba(28,25,23,0.28)]',
        '[&_.border-b]:px-5 [&_.border-b]:md:px-6',
        '[&_button[aria-expanded]]:min-h-[4rem]',
        '[&_button[aria-expanded]]:transition-colors [&_button[aria-expanded]]:duration-200',
      )}
    >
      <Faq {...props} className="space-y-8" enhanced />
    </div>
  );
}
