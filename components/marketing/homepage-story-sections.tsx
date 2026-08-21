import Link from 'next/link';
import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  ClipboardList,
  Eye,
  FileText,
  Headphones,
  Heart,
  HelpCircle,
  Info,
  Lightbulb,
  Link2,
  ListChecks,
  Lock,
  MessageCircle,
  MousePointer2,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Star,
  Target,
  User,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { routes } from '@/config/routes';
import { homepageHub, type HomepageHub } from '@/data/content/homepage-hub';
import { ENGLISH_UI, type UiDictionary } from '@/lib/i18n/content/ui-english';
import { getHomepageReviews } from '@/lib/reviews';
import { cn } from '@/lib/utils';

const CARD =
  'rounded-[1.35rem] bg-white shadow-[0_16px_40px_-28px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]';

const STEP_TONES = [
  { badge: 'bg-[#FFEDD5] text-[#C2410C]', icon: 'bg-[#FFEDD5] text-[#EA580C]', dot: 'bg-[#F97316]' },
  { badge: 'bg-[#EDE9FE] text-[#6D28D9]', icon: 'bg-[#EDE9FE] text-[#7C3AED]', dot: 'bg-[#8B5CF6]' },
  { badge: 'bg-[#DBEAFE] text-[#1D4ED8]', icon: 'bg-[#DBEAFE] text-[#2563EB]', dot: 'bg-[#3B82F6]' },
  { badge: 'bg-[#DCFCE7] text-[#15803D]', icon: 'bg-[#DCFCE7] text-[#16A34A]', dot: 'bg-[#22C55E]' },
] as const;

const CHECK_TONES = [
  { wrap: 'bg-[#EDE9FE]', icon: 'text-[#7C3AED]' },
  { wrap: 'bg-[#FCE7F3]', icon: 'text-[#DB2777]' },
  { wrap: 'bg-[#DBEAFE]', icon: 'text-[#2563EB]' },
  { wrap: 'bg-[#DCFCE7]', icon: 'text-[#16A34A]' },
] as const;

const AVATAR_TONES = ['bg-[#F97316]', 'bg-[#EC4899]', 'bg-[#8B5CF6]', 'bg-[#1877F2]', 'bg-[#0F766E]', 'bg-[#C2410C]'];

function SectionBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-[#FFE4D1] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#E85D04]',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </p>
  );
}

function AccentBrand({ title }: { title: string }) {
  const parts = title.split(/(NovaLikes)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === 'NovaLikes' ? (
          <span key={`${part}-${index}`} className="text-[#F97316]">
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function AccentTail({ title, count }: { title: string; count: number }) {
  const parts = title.trim().split(/\s+/);
  const tail = parts.splice(-count);
  return (
    <>
      {parts.length ? `${parts.join(' ')} ` : null}
      <span className="text-[#F97316]">{tail.join(' ')}</span>
    </>
  );
}

function HeadingBlock({
  id,
  badge,
  BadgeIcon,
  title,
  description,
  accent = 'brand',
  tailCount = 2,
  badgeClass,
}: {
  id: string;
  badge: string;
  BadgeIcon: LucideIcon;
  title: string;
  description: string;
  accent?: 'brand' | 'tail' | 'none';
  tailCount?: number;
  badgeClass?: string;
}) {
  return (
    <FadeUp className="max-w-2xl">
      <SectionBadge icon={BadgeIcon} label={badge} className={badgeClass} />
      <h2
        id={id}
        className="mt-4 text-balance text-[2rem] font-bold leading-[1.15] tracking-tight text-[#1C1917] sm:text-[2.35rem]"
      >
        {accent === 'brand' ? (
          <AccentBrand title={title} />
        ) : accent === 'tail' ? (
          <AccentTail title={title} count={tailCount} />
        ) : (
          title
        )}
      </h2>
      <p className="mt-3 max-w-[38rem] text-pretty text-[15px] leading-relaxed text-[#6B6560]">
        {description}
      </p>
    </FadeUp>
  );
}

function WhyNovaLikes({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.why;
  const icons: LucideIcon[] = [Package, Lock, Search, Headphones];

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <span
        className="pointer-events-none absolute -right-10 top-8 hidden size-56 rounded-full bg-[#FFE4D1]/80 blur-2xl lg:block"
        aria-hidden="true"
      />
      <ShieldCheck
        className="pointer-events-none absolute right-10 top-16 hidden size-24 text-[#F97316]/25 lg:block"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <HeadingBlock
          id={`${section.id}-heading`}
          badge={labels.whyNovaLikes}
          BadgeIcon={ShieldCheck}
          title={section.title}
          description={section.description}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {section.points.map((point, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <FadeUp key={point.title} delay={index * 0.04}>
                <div className={cn(CARD, 'flex h-full gap-4 p-5')}>
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FFE4D1] text-[#E85D04]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1C1917]">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6B6560]">{point.body}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function HowItWorks({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.howItWorks;
  const flowIcons: LucideIcon[] = [ShoppingCart, Box, User, Check];
  const cardIcons: LucideIcon[] = [MousePointer2, Package, User, Check];

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <HeadingBlock
          id={`${section.id}-heading`}
          badge={labels.howItWorks}
          BadgeIcon={Settings}
          title={section.title}
          description={section.description}
        />

        <div className="relative mx-auto mt-10 hidden max-w-4xl lg:block" aria-hidden="true">
          <svg viewBox="0 0 800 70" className="absolute inset-x-8 top-5 h-10 w-[calc(100%-4rem)]">
            <path
              d="M20 28 C 140 8, 260 48, 400 28 S 660 8, 780 28"
              fill="none"
              stroke="#E8B48A"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
          <div className="relative flex items-start justify-between px-2">
            {flowIcons.map((Icon, index) => (
              <span
                key={section.steps[index]?.title ?? index}
                className={cn(
                  'inline-flex size-12 items-center justify-center rounded-full text-white shadow-md',
                  STEP_TONES[index].dot,
                )}
              >
                <Icon className="size-5" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {section.steps.map((step, index) => {
            const tone = STEP_TONES[index];
            const Icon = cardIcons[index] ?? Check;
            return (
              <FadeUp key={step.title} delay={index * 0.04}>
                <div className={cn(CARD, 'relative flex h-full flex-col p-5')}>
                  <span
                    className={cn(
                      'inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-bold',
                      tone.badge,
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-bold text-[#1C1917]">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B6560]">{step.body}</p>
                  <span
                    className={cn(
                      'mt-4 ml-auto inline-flex size-10 items-center justify-center rounded-2xl',
                      tone.icon,
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function Guarantees({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.guarantees;
  const icons: LucideIcon[] = [Lock, ShieldCheck, FileText, Headphones];

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <HeadingBlock
            id={`${section.id}-heading`}
            badge={labels.beforeYouOrder}
            BadgeIcon={Lightbulb}
            title={section.title}
            description={section.description}
            accent="tail"
            tailCount={3}
          />
          <div className="relative mx-auto hidden h-36 w-40 lg:block" aria-hidden="true">
            <span className="absolute right-2 top-2 size-24 rounded-full bg-[#FFE4D1]" />
            <ShieldCheck className="absolute right-6 top-6 size-16 text-[#E85D04]" />
            <span className={cn(CARD, 'absolute left-0 top-10 w-28 p-3')}>
              <span className="block h-1.5 w-16 rounded bg-[#FDBA74]" />
              <span className="mt-2 block h-1.5 w-12 rounded bg-[#FED7AA]" />
              <span className="mt-2 block h-1.5 w-14 rounded bg-[#FDBA74]" />
            </span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {section.items.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <FadeUp key={item.title} delay={index * 0.04}>
                <div className={cn(CARD, 'flex h-full gap-4 p-5')}>
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FFE4D1] text-[#E85D04]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1C1917]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6B6560]">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp className="mt-6">
          <Link
            href={routes.refundPolicy}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E85D04] underline-offset-4 hover:underline"
          >
            <FileText className="size-4" aria-hidden="true" />
            Read the Refund Policy
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </FadeUp>
      </Container>
    </Section>
  );
}

function BeforeYouBuy({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.beforeYouBuy;
  const icons: LucideIcon[] = [Target, User, Link2, ListChecks];

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <HeadingBlock
            id={`${section.id}-heading`}
            badge={labels.quickCheck}
            BadgeIcon={ShieldCheck}
            title={section.title}
            description={section.description}
            accent="none"
            badgeClass="bg-[#EDE9FE] text-[#6D28D9]"
          />
          <div className="relative mx-auto hidden h-36 w-40 lg:block" aria-hidden="true">
            <Search className="absolute right-2 top-4 size-20 text-[#8B5CF6]/70" />
            <span className={cn(CARD, 'absolute left-0 top-12 w-28 p-3')}>
              <span className="block h-1.5 w-16 rounded bg-[#C4B5FD]" />
              <span className="mt-2 block h-1.5 w-12 rounded bg-[#DDD6FE]" />
            </span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {section.items.map((item, index) => {
            const Icon = icons[index] ?? Check;
            const tone = CHECK_TONES[index];
            return (
              <FadeUp key={item.question} delay={index * 0.04}>
                <div className={cn(CARD, 'flex h-full gap-4 p-5')}>
                  <span
                    className={cn(
                      'inline-flex size-12 shrink-0 items-center justify-center rounded-full',
                      tone.wrap,
                    )}
                  >
                    <Icon className={cn('size-5', tone.icon)} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1C1917]">{item.question}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6B6560]">{item.answer}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp className="mt-8">
          <div className="flex items-center justify-between gap-4 rounded-full bg-[#FFF1E6] px-5 py-3.5">
            <p className="flex items-center gap-2.5 text-sm font-medium text-[#3F3A36]">
              <Lightbulb className="size-5 shrink-0 text-[#E85D04]" aria-hidden="true" />
              <span>
                <strong>{labels.beforeYouBuyStrong}</strong>
                {' — '}
                {labels.beforeYouBuyRest}
              </span>
            </p>
            <ChevronDown className="hidden size-5 -rotate-90 text-[#E85D04] sm:block" aria-hidden="true" />
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}

function HubReviews({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.reviews;
  const reviews = getHomepageReviews(6);
  if (!reviews.length) return null;

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <Container size="xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <HeadingBlock
            id={`${section.id}-heading`}
            badge={labels.customerReviews}
            BadgeIcon={Star}
            title={section.title}
            description={section.description}
          />
          <FadeUp>
            <Link
              href={section.cta.href}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#F97316] px-4 text-sm font-semibold text-[#E85D04] transition hover:bg-[#FFF1E6]"
            >
              {section.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeUp key={review.id} delay={index * 0.04}>
              <article className={cn(CARD, 'relative flex h-full flex-col p-5')}>
                <div className="flex items-start justify-between gap-3">
                  <p className="flex text-[#F97316]" aria-label={`${review.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        className={cn(
                          'size-4',
                          star < Math.round(review.rating) ? 'fill-current' : 'text-[#FED7AA]',
                        )}
                      />
                    ))}
                  </p>
                  <span className="text-3xl font-serif leading-none text-[#FED7AA]" aria-hidden="true">
                    ”
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3F3A36]">
                  “{review.reviewText}”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex size-9 items-center justify-center rounded-full text-xs font-bold text-white',
                      AVATAR_TONES[index % AVATAR_TONES.length],
                    )}
                  >
                    {review.customerInitials.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917]">{review.customerName}</p>
                    {review.verifiedPurchase ? (
                      <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#15803D]">
                        <Check className="size-3" aria-hidden="true" />
                        {labels.verifiedBuyer}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#E7E0DA]" />
          <p className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6B6560]">
            <Heart className="size-3.5 fill-[#F97316] text-[#F97316]" aria-hidden="true" />
            {labels.customerReviewsFooter}
          </p>
          <span className="h-px flex-1 bg-[#E7E0DA]" />
        </div>
      </Container>
    </Section>
  );
}

function HubFaq({ hub, labels }: { hub: HomepageHub; labels: UiDictionary['homepage'] }) {
  const section = hub.faq;
  const icons: LucideIcon[] = [MessageCircle, Lock, Box, Info, Eye, Headphones];

  return (
    <Section
      id={section.id}
      spacing="none"
      className="relative overflow-hidden py-12 md:py-16"
      aria-labelledby={`${section.id}-heading`}
    >
      <HelpCircle
        className="pointer-events-none absolute right-10 top-10 hidden size-24 text-[#FDBA74]/80 lg:block"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <HeadingBlock
          id={`${section.id}-heading`}
          badge={labels.faq}
          BadgeIcon={HelpCircle}
          title={section.title}
          description={section.description}
          accent="tail"
          tailCount={2}
        />
        <div className="mx-auto mt-8 w-full max-w-3xl space-y-3">
          {section.items.map((item, index) => {
            const Icon = icons[index] ?? HelpCircle;
            return (
              <FadeUp key={item.question} delay={index * 0.03}>
                <details className={cn(CARD, 'group p-4')}>
                  <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-[#1C1917] marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FFE4D1] text-[#E85D04]">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-left text-sm sm:text-base">{item.question}</span>
                    <ChevronDown className="size-4 shrink-0 text-[#E85D04] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pl-12 text-sm leading-relaxed text-[#6B6560]">{item.answer}</p>
                </details>
              </FadeUp>
            );
          })}
        </div>
        <FadeUp className="mx-auto mt-8 flex w-full max-w-3xl flex-wrap items-center justify-between gap-4">
          <Link
            href={routes.faq}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#F97316] px-4 text-sm font-semibold text-[#E85D04] transition hover:bg-[#FFF1E6]"
          >
            Visit full FAQ
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <p className="inline-flex items-center gap-2 text-sm text-[#57534E]">
            <ShieldCheck className="size-4 text-[#E85D04]" aria-hidden="true" />
            Still need help? Our support team is here for you.{' '}
            <Link href={routes.contact} className="font-semibold text-[#E85D04] hover:underline">
              Contact Support
            </Link>
          </p>
        </FadeUp>
      </Container>
    </Section>
  );
}

export function HomepageLowerSections({
  hub = homepageHub,
  labels = ENGLISH_UI.homepage as UiDictionary['homepage'],
}: {
  hub?: HomepageHub;
  labels?: UiDictionary['homepage'];
}) {
  return (
    <>
      <WhyNovaLikes hub={hub} labels={labels} />
      <HowItWorks hub={hub} labels={labels} />
      <Guarantees hub={hub} labels={labels} />
      <BeforeYouBuy hub={hub} labels={labels} />
      <HubReviews hub={hub} labels={labels} />
      <HubFaq hub={hub} labels={labels} />
    </>
  );
}
