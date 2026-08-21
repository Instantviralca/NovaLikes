/**
 * Only label qualities the extractor actually reported.
 * Never invent HD/SD from file size or guesswork.
 */
export function videoQualityLabel(quality?: string): string | undefined {
  if (!quality) return undefined;
  const value = quality.trim().toLowerCase();
  if (value === 'hd') return 'HD';
  if (value === 'sd') return 'SD';
  if (/^\d{3,4}p$/.test(value)) return value;
  if (/^\d{3,4}$/.test(value)) return `${value}p`;
  return undefined;
}

export function downloadButtonLabel(quality?: string, index = 0): string {
  const label = videoQualityLabel(quality);
  if (label) return `Download ${label}`;
  return index === 0 ? 'Download video' : `Download file ${index + 1}`;
}
