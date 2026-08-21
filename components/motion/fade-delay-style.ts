import type { CSSProperties } from 'react';

export function fadeDelayStyle(
  delay: number,
  style?: CSSProperties,
): CSSProperties {
  return {
    '--nl-fade-delay': `${Math.round(delay * 1000)}ms`,
    ...style,
  } as CSSProperties;
}
