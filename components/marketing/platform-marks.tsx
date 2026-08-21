export function InstagramMark() {
  return (
    <svg viewBox="0 0 88 96" className="h-full w-full" aria-hidden="true">
      <ellipse cx="44" cy="88" rx="22" ry="5" fill="#9A3412" opacity="0.28" />
      <rect x="10" y="8" width="68" height="68" rx="20" fill="#7C2D12" opacity="0.18" />
      <rect x="6" y="2" width="68" height="68" rx="20" fill="url(#nl-ig3d)" />
      <rect x="22" y="18" width="36" height="36" rx="12" fill="none" stroke="white" strokeWidth="4" />
      <circle cx="40" cy="36" r="9" fill="none" stroke="white" strokeWidth="4" />
      <circle cx="54" cy="24" r="3.2" fill="white" />
      <path d="M10 16c10-10 28-12 42-6" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="6" />
      <defs>
        <linearGradient id="nl-ig3d" x1="6" y1="70" x2="74" y2="2">
          <stop stopColor="#F58529" />
          <stop offset="0.45" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TikTokMark() {
  return (
    <svg viewBox="0 0 88 96" className="h-full w-full" aria-hidden="true">
      <ellipse cx="44" cy="88" rx="22" ry="5" fill="#000" opacity="0.28" />
      <rect x="12" y="8" width="64" height="64" rx="18" fill="#25F4EE" />
      <rect x="8" y="4" width="64" height="64" rx="18" fill="#FE2C55" />
      <rect x="4" y="0" width="64" height="64" rx="18" fill="#111111" />
      <path
        d="M40 16c2.4 5.2 6.4 8.6 11.2 9.4v7.2c-3.8-.2-7.2-1.6-10-3.8v14.2c0 8-6.4 14.4-14.4 14.4S12.4 51 12.4 43 18.8 28.6 26.8 28.6c1.2 0 2.4.2 3.4.4v8.2c-1-.4-2.2-.6-3.4-.6-3.8 0-7 3.2-7 7s3.2 7 7 7 7-3.2 7-7V16H40z"
        fill="#25F4EE"
      />
      <path
        d="M38 14c2.4 5.2 6.4 8.6 11.2 9.4v7.2c-3.8-.2-7.2-1.6-10-3.8v14.2c0 8-6.4 14.4-14.4 14.4S10.4 49 10.4 41 16.8 26.6 24.8 26.6c1.2 0 2.4.2 3.4.4v8.2c-1-.4-2.2-.6-3.4-.6-3.8 0-7 3.2-7 7s3.2 7 7 7 7-3.2 7-7V14H38z"
        fill="#FE2C55"
      />
      <path
        d="M36 12c2.4 5.2 6.4 8.6 11.2 9.4v7.2c-3.8-.2-7.2-1.6-10-3.8v14.2c0 8-6.4 14.4-14.4 14.4S8.4 47 8.4 39 14.8 24.6 22.8 24.6c1.2 0 2.4.2 3.4.4v8.2c-1-.4-2.2-.6-3.4-.6-3.8 0-7 3.2-7 7s3.2 7 7 7 7-3.2 7-7V12H36z"
        fill="white"
      />
    </svg>
  );
}

export function FacebookMark() {
  return (
    <svg viewBox="0 0 88 96" className="h-full w-full" aria-hidden="true">
      <ellipse cx="44" cy="88" rx="22" ry="5" fill="#1E3A8A" opacity="0.28" />
      <circle cx="46" cy="40" r="32" fill="#0B4FBF" />
      <circle cx="42" cy="36" r="32" fill="#1877F2" />
      <path
        d="M46 62V42h6.2l.9-7.2H46v-4.6c0-2.1.6-3.5 3.6-3.5H54V20.4C53.2 20.3 51 20 48.2 20 42.6 20 39 23.4 39 29.8v5H32V42h7v20h7z"
        fill="white"
      />
      <path d="M18 28c10-12 24-14 38-8" fill="none" stroke="white" strokeOpacity="0.28" strokeWidth="5" />
    </svg>
  );
}

export const PLATFORM_MARKS = {
  instagram: InstagramMark,
  tiktok: TikTokMark,
  facebook: FacebookMark,
} as const;
