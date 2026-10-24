/** CSS var used by WhatsApp float to sit above mobile sticky CTAs. */
export const STICKY_BAR_OFFSET_VAR = '--nl-sticky-bar-h';

export function setStickyBarOffset(heightPx: number) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(
    STICKY_BAR_OFFSET_VAR,
    `${Math.max(0, Math.ceil(heightPx))}px`,
  );
}

export function clearStickyBarOffset() {
  if (typeof document === 'undefined') return;
  document.documentElement.style.removeProperty(STICKY_BAR_OFFSET_VAR);
}
