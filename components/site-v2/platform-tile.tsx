import { Music2, ThumbsUp } from 'lucide-react';

import { CameraSquare } from '@/components/marketing/home-v5/icons';
import { cn } from '@/lib/utils';

type PlatformTileProps = {
  platformId: string;
  className?: string;
  /** Extra class on the icon SVG (defaults to `.ic`). */
  iconClassName?: string;
};

/**
 * Site-v2 platform tile — same marks as service-v2 (camera / Music2 / ThumbsUp).
 * Uses `.pt.ti.{ig|tt|fb}` from site-v2.css.
 */
export function SiteV2PlatformTile({
  platformId,
  className,
  iconClassName = 'ic',
}: PlatformTileProps) {
  const id = platformId.toLowerCase();
  if (id === 'tiktok') {
    return (
      <span className={cn('pt ti tt', className)} aria-hidden="true">
        <Music2 className={iconClassName} aria-hidden="true" />
      </span>
    );
  }
  if (id === 'facebook') {
    return (
      <span className={cn('pt ti fb', className)} aria-hidden="true">
        <ThumbsUp className={iconClassName} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className={cn('pt ti ig', className)} aria-hidden="true">
      <CameraSquare className={iconClassName} />
    </span>
  );
}
