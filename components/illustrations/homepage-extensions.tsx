import { cn } from '@/lib/utils';

type IllustProps = { className?: string };

/** Lightweight premium SVG illustrations — no stock photos, no people. */
export function ComparisonIllustration({ className }: IllustProps) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="NovaLikes versus typical providers comparison cards"
    >
      <defs>
        <linearGradient id="cmp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7efe6" />
        </linearGradient>
        <filter id="cmp-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#1c1917" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect width="560" height="360" rx="28" fill="url(#cmp-bg)" />
      <circle cx="460" cy="70" r="70" fill="#FF6B00" opacity="0.12" />
      <g filter="url(#cmp-shadow)">
        <rect x="36" y="48" width="230" height="264" rx="22" fill="#fff" />
        <rect x="294" y="64" width="230" height="248" rx="22" fill="#fff" />
      </g>
      <text x="151" y="88" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="16" fontWeight="700" fill="#1c1917">
        NovaLikes
      </text>
      <text x="409" y="104" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="15" fontWeight="650" fill="#78716c">
        Typical Providers
      </text>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 124 + i * 34;
        return (
          <g key={i}>
            <circle cx="68" cy={y} r="10" fill="#16a34a" />
            <path d={`M63 ${y} l4 4 8-9`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="90" y={y - 5} width="140" height="10" rx="5" fill="#f5f5f4" />
            <circle cx="328" cy={y + 8} r="10" fill="#d6d3d1" />
            <path d={`M323 ${y + 3} l10 10 M333 ${y + 3} l-10 10`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="350" y={y + 3} width="140" height="10" rx="5" fill="#f5f5f4" />
          </g>
        );
      })}
    </svg>
  );
}

export function TimelineIllustration({ className }: IllustProps) {
  return (
    <svg
      viewBox="0 0 720 180"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="NovaLikes growth timeline from 2018 to today"
    >
      <defs>
        <linearGradient id="tl-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD0A8" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
      <rect width="720" height="180" rx="24" fill="#fffaf6" />
      <line x1="60" y1="96" x2="660" y2="96" stroke="url(#tl-line)" strokeWidth="4" strokeLinecap="round" />
      {[
        { x: 90, label: '2018' },
        { x: 230, label: 'Growth' },
        { x: 370, label: '50,000+' },
        { x: 510, label: 'Millions' },
        { x: 640, label: 'Today' },
      ].map((m) => (
        <g key={m.label}>
          <circle cx={m.x} cy="96" r="14" fill="#FF6B00" />
          <circle cx={m.x} cy="96" r="6" fill="#fff" />
          <text
            x={m.x}
            y="56"
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#1c1917"
          >
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function SecurityIllustration({ className }: IllustProps) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Security and transparency floating UI cards"
    >
      <defs>
        <linearGradient id="sec-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff1e6" />
        </linearGradient>
        <filter id="sec-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1c1917" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect width="420" height="280" rx="28" fill="url(#sec-bg)" />
      <circle cx="210" cy="132" r="54" fill="#FF6B00" opacity="0.12" />
      <g filter="url(#sec-shadow)">
        <path
          d="M210 70c28 16 48 18 48 42v28c0 34-28 56-48 66-20-10-48-32-48-66v-28c0-24 20-26 48-42z"
          fill="#fff"
          stroke="#FF6B00"
          strokeWidth="3"
        />
        <rect x="196" y="118" width="28" height="22" rx="5" fill="#FF6B00" />
        <path d="M203 118v-8a7 7 0 0 1 14 0v8" fill="none" stroke="#FF6B00" strokeWidth="3" />
      </g>
      {[
        { x: 28, y: 36, t: 'SSL' },
        { x: 300, y: 42, t: 'Checkout' },
        { x: 24, y: 190, t: 'Tracking' },
        { x: 292, y: 188, t: 'Support' },
      ].map((c) => (
        <g key={c.t} filter="url(#sec-shadow)">
          <rect x={c.x} y={c.y} width="104" height="42" rx="14" fill="#fffffff2" />
          <circle cx={c.x + 22} cy={c.y + 21} r="8" fill="#FF6B00" />
          <text
            x={c.x + 40}
            y={c.y + 26}
            fontFamily="system-ui,sans-serif"
            fontSize="12"
            fontWeight="650"
            fill="#1c1917"
          >
            {c.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function GuidesIllustration({ className }: IllustProps) {
  return (
    <svg
      viewBox="0 0 360 220"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Learn guide document cards"
    >
      <rect width="360" height="220" rx="22" fill="#fffaf6" />
      {[
        { x: 24, y: 28, fill: '#FFE4CC' },
        { x: 126, y: 40, fill: '#FFD0A8' },
        { x: 228, y: 28, fill: '#FFB574' },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="96" height="132" rx="16" fill="#fff" stroke="#f5e6d8" />
          <rect x={c.x + 12} y={c.y + 12} width="72" height="44" rx="10" fill={c.fill} />
          <rect x={c.x + 12} y={c.y + 70} width="72" height="8" rx="4" fill="#e7e5e4" />
          <rect x={c.x + 12} y={c.y + 86} width="56" height="8" rx="4" fill="#f5f5f4" />
          <rect x={c.x + 12} y={c.y + 108} width="48" height="14" rx="7" fill="#FF6B00" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

export function PaymentsIllustration({ className }: IllustProps) {
  return (
    <svg
      viewBox="0 0 520 200"
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Secure payment methods panel"
    >
      <defs>
        <linearGradient id="pay-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff4eb" />
        </linearGradient>
      </defs>
      <rect width="520" height="200" rx="24" fill="url(#pay-bg)" />
      <rect x="36" y="40" width="280" height="120" rx="18" fill="#fff" stroke="#f0e4d8" />
      <rect x="56" y="62" width="48" height="32" rx="8" fill="#FF6B00" opacity="0.9" />
      <rect x="56" y="110" width="160" height="10" rx="5" fill="#e7e5e4" />
      <rect x="56" y="128" width="108" height="10" rx="5" fill="#f5f5f4" />
      {['Visa', 'MC', 'PayPal', 'Stripe'].map((label, i) => (
        <g key={label}>
          <rect x={340} y={34 + i * 38} width="140" height="30" rx="10" fill="#fff" stroke="#f0e4d8" />
          <text
            x={410}
            y={54 + i * 38}
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="12"
            fontWeight="650"
            fill="#44403c"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
