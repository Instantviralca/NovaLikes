/** NovaLikes TT Followers page rhythm — surfaces, spacing, premium shadows. */
export const TT_FOLLOWERS_SURFACES = {
  white: 'bg-white',
  warm: 'bg-[#FFF9F4]',
  softGradient:
    'bg-[linear-gradient(180deg,#ffffff_0%,#FFF9F4_42%,#fff7ed_100%)]',
  softOrange:
    'bg-[linear-gradient(165deg,#ffffff_0%,#fff7ed_55%,#ffedd5_100%)]',
  lightNeutral: 'bg-[#FAFAF9]',
} as const;

/** Balanced section spacing — less empty scroll, more card breathing room. */
export const TT_FOLLOWERS_SECTION_SPACING = 'py-12 md:py-16 lg:py-20';

/** Unified premium floating shadow (Apple-like). */
export const TT_PREMIUM_SHADOW =
  'shadow-[0_18px_40px_-24px_rgba(28,25,23,0.35),0_8px_16px_-12px_rgba(28,25,23,0.18)]';

export const TT_PREMIUM_SHADOW_HOVER =
  'hover:shadow-[0_28px_56px_-24px_rgba(28,25,23,0.42),0_12px_24px_-14px_rgba(249,115,22,0.22)]';

/** Shared 3D SaaS frame for dashboard illustrations. */
export const TT_DASHBOARD_3D =
  'relative [transform:perspective(1200px)_rotateX(2deg)_rotateY(-3deg)] motion-reduce:[transform:none] shadow-[0_28px_60px_-28px_rgba(28,25,23,0.45),0_12px_24px_-16px_rgba(249,115,22,0.25)]';
