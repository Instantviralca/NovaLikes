import { FacebookFollowersRequirementGuideVisual } from '@/components/design-system/facebook-followers-requirement-guide-visual';
import { FacebookPageLikesRequirementGuideVisual } from '@/components/design-system/facebook-page-likes-requirement-guide-visual';
import { FacebookPostLikesRequirementGuideVisual } from '@/components/design-system/facebook-post-likes-requirement-guide-visual';
import { ImageTextSplit } from '@/components/design-system/image-text-split';
import { InstagramCommentsRequirementGuideVisual } from '@/components/design-system/instagram-comments-requirement-guide-visual';
import { InstagramViewsRequirementGuideVisual } from '@/components/design-system/instagram-views-requirement-guide-visual';
import { TikTokFollowersRequirementGuideVisual } from '@/components/design-system/tiktok-followers-requirement-guide-visual';
import { TikTokLikesRequirementGuideVisual } from '@/components/design-system/tiktok-likes-requirement-guide-visual';
import { TikTokViewsRequirementGuideVisual } from '@/components/design-system/tiktok-views-requirement-guide-visual';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  Eye,
  Link2,
  Lock,
  Mail,
  Package,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

const INSTAGRAM_FOLLOWERS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'ig-f-username',
    icon: UserRound,
    title: 'Public Username Only',
    description:
      'We only need the public Instagram username for the profile receiving the follower order.',
  },
  {
    id: 'ig-f-no-password',
    icon: Lock,
    title: 'No Password Required',
    description:
      'Never share your Instagram password, verification codes or private account access.',
  },
  {
    id: 'ig-f-check-username',
    icon: CheckCircle2,
    title: 'Check the Username',
    description:
      'Double-check the Instagram username before checkout so the follower order is associated with the correct public profile.',
  },
  {
    id: 'ig-f-track',
    icon: CheckCircle2,
    title: 'Track Your Order',
    description:
      'Use your email and order ID after checkout to check available order-status information.',
  },
];

const DEFAULT_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'public',
    icon: Eye,
    title: 'Public profile only',
    description: 'We only need a public username or content URL.',
  },
  {
    id: 'no-password',
    icon: Lock,
    title: 'No password required',
    description: 'Never share passwords or private account access.',
  },
  {
    id: 'link',
    icon: Link2,
    title: 'Share the target link',
    description: 'Point us to the profile, post, reel, or video to grow.',
  },
  {
    id: 'track',
    icon: CheckCircle2,
    title: 'Track your order',
    description: 'Use your email and order ID anytime after checkout.',
  },
];

const TIKTOK_FOLLOWERS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'tt-username',
    icon: UserRound,
    title: 'Public TikTok Username',
    description:
      'Enter your public TikTok username so we know exactly where your followers should be delivered.',
  },
  {
    id: 'tt-package',
    icon: Package,
    title: 'Choose a Package',
    description:
      'Select the follower package that best matches your current goals and expected audience growth.',
  },
  {
    id: 'tt-public',
    icon: Eye,
    title: 'Public Profile',
    description:
      'Keep your TikTok profile public during delivery so the order can be completed successfully.',
  },
  {
    id: 'tt-checkout',
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description:
      'Review your order and complete payment through our secure checkout before delivery begins.',
  },
];

const TIKTOK_LIKES_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'tt-l-video-url',
    icon: Link2,
    title: 'Public TikTok Video URL',
    description:
      'Paste the exact public link to the TikTok video that should receive the selected likes.',
  },
  {
    id: 'tt-l-package',
    icon: Package,
    title: 'Selected Package',
    description:
      'Choose the quantity that fits your video, account activity and current campaign.',
  },
  {
    id: 'tt-l-public',
    icon: Eye,
    title: 'Public Video Access',
    description:
      'The selected video must remain publicly viewable while the order is being processed.',
  },
  {
    id: 'tt-l-email',
    icon: Mail,
    title: 'Valid Email Address',
    description:
      'Use a working email address to receive your order confirmation, tracking details and support updates.',
  },
];

const TIKTOK_VIEWS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'tt-v-video-url',
    icon: Link2,
    title: 'Public TikTok Video URL',
    description:
      'Paste the exact public link to the video that should receive the selected views.',
  },
  {
    id: 'tt-v-package',
    icon: Package,
    title: 'Selected Package',
    description:
      'Choose the quantity that fits your video, account activity and current campaign.',
  },
  {
    id: 'tt-v-public',
    icon: Eye,
    title: 'Public Video Access',
    description:
      'The selected video must remain publicly viewable while the order is being processed.',
  },
  {
    id: 'tt-v-email',
    icon: Mail,
    title: 'Valid Email Address',
    description:
      'Use a working email address to receive confirmation, tracking details and support updates.',
  },
];

const FACEBOOK_FOLLOWERS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'fb-f-page-url',
    icon: Link2,
    title: 'Public Facebook Page URL',
    description:
      'Provide the public URL of the Facebook page that should receive the selected follower package.',
  },
  {
    id: 'fb-f-package',
    icon: Package,
    title: 'Selected Package',
    description:
      'Choose the follower quantity that best fits your page and current marketing objectives.',
  },
  {
    id: 'fb-f-public',
    icon: Eye,
    title: 'Public Page Access',
    description:
      'The selected Facebook page should remain publicly accessible while your order is being processed.',
  },
  {
    id: 'fb-f-email',
    icon: Mail,
    title: 'Email Address',
    description:
      'Use a valid email address so you can receive order confirmations, updates and customer support if needed.',
  },
];

const FACEBOOK_PAGE_LIKES_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'fb-pl-page-url',
    icon: Link2,
    title: 'Public Facebook Page URL',
    description:
      'Provide the public URL of the Facebook page receiving the selected Page Likes package.',
  },
  {
    id: 'fb-pl-package',
    icon: Package,
    title: 'Selected Package',
    description:
      'Choose the quantity that best matches your business goals and current Facebook page size.',
  },
  {
    id: 'fb-pl-public',
    icon: Eye,
    title: 'Public Page Access',
    description:
      'Keep your Facebook page publicly accessible while your order is being processed.',
  },
  {
    id: 'fb-pl-email',
    icon: Mail,
    title: 'Valid Email Address',
    description:
      'Use a working email address to receive order confirmations, progress updates and customer support if needed.',
  },
];

const FACEBOOK_POST_LIKES_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'fb-post-url',
    icon: Link2,
    title: 'Public Facebook Post URL',
    description:
      'Provide the public URL of the Facebook post receiving the selected Like package.',
  },
  {
    id: 'fb-post-package',
    icon: Package,
    title: 'Selected Package',
    description:
      'Choose the quantity that best matches your campaign objectives and current engagement level.',
  },
  {
    id: 'fb-post-public',
    icon: Eye,
    title: 'Public Post Access',
    description:
      'Keep the selected Facebook post publicly available while your order is being processed.',
  },
  {
    id: 'fb-post-email',
    icon: Mail,
    title: 'Valid Email Address',
    description:
      'Use a working email address to receive order confirmations, delivery updates and customer support if required.',
  },
];

const VIEWS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'reel-url',
    icon: Link2,
    title: 'Public video or Reel URL',
    description: 'Paste the public Instagram link for the content getting views.',
  },
  {
    id: 'no-password',
    icon: Lock,
    title: 'No password required',
    description: 'We never ask for login access or account credentials.',
  },
  {
    id: 'public-content',
    icon: Eye,
    title: 'Keep content public',
    description: 'Leave the video or Reel public while the order processes.',
  },
  {
    id: 'track',
    icon: CheckCircle2,
    title: 'Track delivery',
    description: 'Follow progress with your order ID and checkout email.',
  },
];

const COMMENTS_STEPS: Array<{
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    id: 'public-post-url',
    icon: Link2,
    title: 'Public Post URL',
    description: 'Paste the public Instagram post or Reel link that should receive comments.',
  },
  {
    id: 'correct-post',
    icon: CheckCircle2,
    title: 'Correct Post Selection',
    description: 'Choose the exact upload where you want conversation—not a private archive item.',
  },
  {
    id: 'public-account',
    icon: Eye,
    title: 'Public Account',
    description: 'Keep the account and post public for the full delivery window.',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Address',
    description: 'Use a valid checkout email for confirmation and order tracking.',
  },
  {
    id: 'no-password',
    icon: Lock,
    title: 'No Password Required',
    description: 'NovaLikes never asks for Instagram login access.',
  },
];

export type RequirementGuideProps = {
  id?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional custom visual (preferred over imageSrc). */
  visual?: ReactNode;
  /** Built-in compact views Reel dashboard. */
  visualVariant?:
    | 'instagram-followers'
    | 'default'
    | 'instagram-views'
    | 'instagram-comments'
    | 'tiktok-followers'
    | 'tiktok-likes'
    | 'tiktok-views'
    | 'facebook-followers'
    | 'facebook-page-likes'
    | 'facebook-post-likes';
  /** Image left / text right by default; set true for text left / image right. */
  reverse?: boolean;
  /** Optional trust notice under requirement cards. */
  notice?: string;
  className?: string;
};

/**
 * Phase 18 VDS — RequirementGuide.
 * Answers “Is it safe?” and “What do you need from me?” without passwords.
 */
export function RequirementGuide({
  id,
  title = 'What we need from you',
  description = 'Orders run on public details only. No login access, no password, no account takeover.',
  imageSrc = '/assets/images/illustrations/trust-secure.svg',
  imageAlt = 'Public profile requirements — no password needed',
  visual,
  visualVariant = 'default',
  reverse = false,
  notice,
  className,
}: RequirementGuideProps) {
  const resolvedVisual =
    visual ??
    (visualVariant === 'instagram-views' ? (
      <InstagramViewsRequirementGuideVisual />
    ) : visualVariant === 'instagram-comments' ? (
      <InstagramCommentsRequirementGuideVisual />
    ) : visualVariant === 'tiktok-followers' ? (
      <TikTokFollowersRequirementGuideVisual />
    ) : visualVariant === 'tiktok-likes' ? (
      <TikTokLikesRequirementGuideVisual />
    ) : visualVariant === 'tiktok-views' ? (
      <TikTokViewsRequirementGuideVisual />
    ) : visualVariant === 'facebook-followers' ? (
      <FacebookFollowersRequirementGuideVisual />
    ) : visualVariant === 'facebook-page-likes' ? (
      <FacebookPageLikesRequirementGuideVisual />
    ) : visualVariant === 'facebook-post-likes' ? (
      <FacebookPostLikesRequirementGuideVisual />
    ) : undefined);
  const steps =
    visualVariant === 'instagram-followers'
      ? INSTAGRAM_FOLLOWERS_STEPS
      : visualVariant === 'instagram-views'
      ? VIEWS_STEPS
      : visualVariant === 'instagram-comments'
        ? COMMENTS_STEPS
        : visualVariant === 'tiktok-followers'
          ? TIKTOK_FOLLOWERS_STEPS
          : visualVariant === 'tiktok-likes'
            ? TIKTOK_LIKES_STEPS
            : visualVariant === 'tiktok-views'
              ? TIKTOK_VIEWS_STEPS
              : visualVariant === 'facebook-followers'
                ? FACEBOOK_FOLLOWERS_STEPS
                    : visualVariant === 'facebook-page-likes'
                      ? FACEBOOK_PAGE_LIKES_STEPS
                      : visualVariant === 'facebook-post-likes'
                        ? FACEBOOK_POST_LIKES_STEPS
                        : DEFAULT_STEPS;

  return (
    <ImageTextSplit
      id={id}
      title={title}
      description={description}
      imageSrc={resolvedVisual ? undefined : imageSrc}
      imageAlt={imageAlt}
      visual={resolvedVisual}
      reverse={reverse}
      unoptimized={!resolvedVisual}
      className={cn('bg-hero-wash', className)}
    >
      <ul className="mt-4 space-y-3" role="list">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <li
              key={step.id}
              className="group flex min-h-[4.5rem] gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/80 p-4 shadow-[var(--shadow-xs)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] motion-reduce:hover:translate-y-0"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-accent-soft)] text-[var(--brand-primary)] transition-transform duration-300 group-hover:scale-105 motion-safe:group-hover:animate-iv-icon-bob"
                aria-hidden="true"
              >
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{step.title}</p>
                {step.description ? (
                  <p className="type-small text-[var(--text-muted)]">{step.description}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      {notice ? (
        <p
          role="note"
          className={cn(
            'mt-4 rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)]',
            visualVariant === 'facebook-followers' ||
              visualVariant === 'facebook-page-likes' ||
              visualVariant === 'facebook-post-likes'
              ? 'bg-[#FFE8D6]'
              : 'bg-[var(--brand-accent-soft)]/70',
          )}
        >
          {notice}
        </p>
      ) : null}
    </ImageTextSplit>
  );
}
