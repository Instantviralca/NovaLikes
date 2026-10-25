import { HOME_V5 } from '@/data/content/home-v5';

/**
 * Widen literal string/number/boolean types while preserving readonly structure,
 * so market variants (e.g. HOME_V5_UK) share the same view props.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

/**
 * Homepage-v5 content for English `/` and market variants.
 * Do not change copy to make types fit — both sources must already satisfy this shape.
 */
export type HomeV5Content = Widen<typeof HOME_V5>;
