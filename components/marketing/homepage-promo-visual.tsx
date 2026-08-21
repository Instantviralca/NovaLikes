import {
  BarChart3,
  Eye,
  Heart,
  ThumbsUp,
  UserPlus,
} from 'lucide-react';

import { cn } from '@/lib/utils';

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-ig" x1="0" y1="24" x2="24" y2="0">
          <stop stopColor="#F58529" />
          <stop offset="0.5" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#hero-ig)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="#fff" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#111" />
      <path
        d="M15.2 7.4c.9.6 1.5 1.5 1.7 2.5V12c-.6 0-1.2-.1-1.7-.3v3.8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.3 0 .7 0 1 .1v2.1c-.3-.1-.7-.2-1-.2-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V7.4h1Z"
        fill="#fff"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path
        d="M13.2 20v-6.8h2.3l.3-2.7H13.2V9.2c0-.8.2-1.3 1.3-1.3h1.5V5.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H7.5v2.7h2.9V20h2.8Z"
        fill="#fff"
      />
    </svg>
  );
}

type ServiceRow = {
  label: string;
  icon: typeof UserPlus;
};

type PlatformCard = {
  id: string;
  name: string;
  headerClass: string;
  Icon: typeof IgIcon;
  iconClass: string;
  services: ServiceRow[];
  className: string;
};

const CARDS: PlatformCard[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    headerClass: 'bg-[linear-gradient(135deg,#FF9A3C_0%,#FF5C8A_55%,#FF4D7D_100%)]',
    Icon: IgIcon,
    iconClass: 'text-[#EC4899]',
    services: [
      { label: 'Followers', icon: UserPlus },
      { label: 'Likes', icon: Heart },
      { label: 'Views', icon: Eye },
    ],
    className: 'left-[2%] top-[2%] z-30 w-[11rem] -rotate-[7deg]',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    headerClass: 'bg-[linear-gradient(160deg,#2F2F37_0%,#111111_100%)]',
    Icon: TikTokIcon,
    iconClass: 'text-[#2DD4BF]',
    services: [
      { label: 'Followers', icon: UserPlus },
      { label: 'Likes', icon: Heart },
      { label: 'Views', icon: Eye },
    ],
    className: 'right-[2%] top-[8%] z-20 w-[11rem] rotate-[8deg]',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    headerClass: 'bg-[linear-gradient(135deg,#7EB6FF_0%,#2F8CFF_50%,#1864F2_100%)]',
    Icon: FacebookIcon,
    iconClass: 'text-[#2563EB]',
    services: [
      { label: 'Followers', icon: UserPlus },
      { label: 'Page Likes', icon: ThumbsUp },
      { label: 'Post Likes', icon: ThumbsUp },
    ],
    className: 'bottom-[2%] left-[26%] z-40 w-[11.5rem] rotate-[-2deg]',
  },
];

function OrbitRing() {
  return (
    <svg
      viewBox="0 0 420 360"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <ellipse
        cx="210"
        cy="180"
        rx="148"
        ry="128"
        fill="none"
        stroke="#E8B48A"
        strokeWidth="1.5"
        strokeDasharray="5 8"
        opacity="0.75"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('size-4', className)} aria-hidden="true">
      <path
        d="M8 1.5 9.4 6.1 14 7.5 9.4 8.9 8 13.5 6.6 8.9 2 7.5 6.6 6.1 8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlatformCardView({ card }: { card: PlatformCard }) {
  const Icon = card.Icon;

  return (
    <article
      className={cn(
        'absolute overflow-hidden rounded-[1rem] bg-white shadow-[0_22px_50px_-18px_rgba(40,28,20,0.38)] ring-1 ring-black/[0.05]',
        card.className,
      )}
    >
      <div className={cn('flex items-center gap-2 px-3 py-2.5 text-white', card.headerClass)}>
        <span className="size-6 shrink-0 overflow-hidden rounded-md">
          <Icon />
        </span>
        <span className="text-[13px] font-bold leading-none">{card.name}</span>
      </div>
      <ul className="space-y-2 px-3 py-3">
        {card.services.map((service) => (
          <li
            key={service.label}
            className="flex items-center gap-2 text-[12px] font-medium text-[#374151]"
          >
            <service.icon className={cn('size-3.5 shrink-0', card.iconClass)} aria-hidden="true" />
            {service.label}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Right-column hero illustration — platform-card cluster from homepage snap. */
export function HomepagePromoVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative mx-auto h-[20rem] w-full max-w-[26rem] sm:h-[21rem] lg:mx-0 lg:ml-auto',
        className,
      )}
      aria-hidden="true"
    >
      <OrbitRing />

      <Star className="absolute left-[20%] top-[10%] text-[#FF601C]" />
      <Star className="absolute right-[24%] top-[14%] text-[#FF601C]" />
      <Star className="absolute right-[32%] bottom-[12%] size-3 text-[#A78BFA]" />

      <div className="absolute bottom-[30%] left-[6%] z-50 flex size-9 items-center justify-center rounded-[0.75rem] rounded-bl-[0.15rem] bg-[#FF601C] shadow-[0_10px_20px_-8px_rgba(255,96,28,0.75)]">
        <Heart className="size-3.5 fill-white text-white" />
      </div>

      <div className="absolute right-[8%] top-[44%] z-50 flex size-9 items-center justify-center rounded-full bg-[#8B5CF6] shadow-[0_10px_20px_-8px_rgba(139,92,246,0.6)]">
        <BarChart3 className="size-3.5 text-white" />
      </div>

      {CARDS.map((card) => (
        <PlatformCardView key={card.id} card={card} />
      ))}
    </div>
  );
}
