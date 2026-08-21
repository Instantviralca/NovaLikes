import { cn } from '@/lib/utils';

export function RasterSectionVisual({
  src,
  alt,
  className,
}: {
  src: string;
  /** Explicit per-usage alt. Pass "" only for decorative images. */
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(
        'h-auto w-full max-w-[30rem] select-none rounded-[1.25rem] object-cover shadow-[0_12px_32px_-20px_rgba(50,30,20,0.45)] ring-1 ring-black/[0.04]',
        className,
      )}
    />
  );
}
