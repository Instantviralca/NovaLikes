import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Gauge,
  Heart,
  Image,
  Layers,
  Lock,
  MessageCircle,
  MessageSquare,
  Minus,
  Music2,
  Pen,
  Play,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Star,
  ThumbsUp,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';

export {
  CameraSquare,
  PenUnderline,
} from '@/components/marketing/home-v5/icons';

const SVC_V1_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  'refresh-cw': RefreshCw,
  'badge-check': BadgeCheck,
  'message-square': MessageSquare,
  gauge: Gauge,
  star: Star,
  building: Building2,
  layers: Layers,
  heart: Heart,
  eye: Eye,
  'eye-off': EyeOff,
  'message-circle': MessageCircle,
  'book-open': BookOpen,
  check: Check,
  x: X,
  plus: Plus,
  minus: Minus,
  lock: Lock,
  'shopping-cart': ShoppingCart,
  'arrow-right': ArrowRight,
  'chevron-right': ChevronRight,
  'user-plus': UserPlus,
  users: Users,
  'thumbs-up': ThumbsUp,
  pen: Pen,
  image: Image,
  play: Play,
  'music-2': Music2,
};

type SvcV1IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

/** Lucide icon by prototype name (see CURSOR_PROMPT mapping). */
export function SvcV1Icon({ name, className = 'ic', strokeWidth }: SvcV1IconProps) {
  const Icon = SVC_V1_ICONS[name] ?? Check;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
