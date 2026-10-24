import {
  Check,
  Clock,
  Eye,
  Gauge,
  Heart,
  Layers,
  Link2,
  MessageCircle,
  Music2,
  PenLine,
  RefreshCw,
  Search,
  ShieldCheck,
  Tag,
  ThumbsUp,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react';

type IconProps = { className?: string };

/** Rounded-square camera mark used for Instagram (matches the prototype; no brand icon). */
export function CameraSquare({ className = 'ic' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Hand-drawn underline under a highlighted word (same path as the prototype). */
export function PenUnderline() {
  return (
    <svg className="pen" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 14 C 60 4, 140 4, 296 10" pathLength="1" />
    </svg>
  );
}

export type PlatformKey = 'instagram' | 'tiktok' | 'facebook';

type IconComponent = LucideIcon | typeof CameraSquare;

export const PLATFORM_ICONS: Record<PlatformKey, IconComponent> = {
  instagram: CameraSquare,
  tiktok: Music2,
  facebook: Users,
};

/** Card icon keys from HOME_V5.hero.tabs[*].cards[*].icon. */
export const CARD_ICONS: Record<string, LucideIcon> = {
  'user-plus': UserPlus,
  heart: Heart,
  eye: Eye,
  'message-circle': MessageCircle,
  'thumbs-up': ThumbsUp,
};

/** Hero card icon by key (defaults to a check if the key is unknown). */
export function cardIcon(key: string): LucideIcon {
  return CARD_ICONS[key] ?? Check;
}

/**
 * Bullet icon for a service bullet, same mapping as the prototype HTML:
 * price tag, refill, gradual delivery, start time, order tracking, packages,
 * custom wording, privacy (shield), link, otherwise a check.
 */
export function bulletIcon(text: string): LucideIcon {
  const t = text.toLowerCase();
  if (t.includes('packages from')) return Tag;
  if (t.includes('refill')) return RefreshCw;
  if (t.includes('gradual')) return Gauge;
  if (t.includes('start within')) return Clock;
  if (t.includes('track the order')) return Search;
  if (t.includes('high quality or premium')) return Layers;
  if (t.includes('your own wording')) return PenLine;
  if (t.includes('password') || t.includes('no login')) return ShieldCheck;
  if (t.includes('paste')) return Link2;
  return Check;
}
