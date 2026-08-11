/**
 * Central design tokens — single source of truth for NovaLikes Design System.
 * Prefer these (and Tailwind token classes) over hardcoded values.
 */

import { cubicBezier } from 'framer-motion';

export const theme = {
  colors: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    muted: 'var(--muted)',
    mutedForeground: 'var(--muted-foreground)',
    border: 'var(--border)',
    ring: 'var(--ring)',
    brand: 'var(--brand)',
    brandForeground: 'var(--brand-foreground)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--destructive)',
    platform: {
      instagram: 'var(--platform-instagram)',
      tiktok: 'var(--platform-tiktok)',
      youtube: 'var(--platform-youtube)',
      facebook: 'var(--platform-facebook)',
    },
  },
  typography: {
    fontSans: 'var(--font-sans)',
    trackingTight: '-0.02em',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
  },
  container: {
    xs: '20rem',
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem', // 1280px
  },
  spacing: {
    unit: 8,
  },
  motion: {
    durationFast: 0.15,
    durationBase: 0.25,
    durationSlow: 0.4,
    /**
     * Must be an easing *function*. A raw `[x1,y1,x2,y2]` tuple is treated as an
     * array of easings by motion-dom interpolate → TypeError: a[d] is not a function.
     */
    easeOut: cubicBezier(0.16, 1, 0.3, 1),
  },
} as const;

export type ThemeConfig = typeof theme;
