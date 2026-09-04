'use client';

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type StoryItemsCarouselProps = {
  children: ReactNode;
  /** Visible slides on large screens. */
  perView?: 1 | 2 | 3 | 4;
  /** Scroll one slide or roughly one viewport page. */
  step?: 'one' | 'page';
  className?: string;
};

const SLIDE_WIDTH: Record<1 | 2 | 3 | 4, string> = {
  1: 'w-full',
  2: 'w-[85%] sm:w-[calc(50%-0.5rem)]',
  3: 'w-[85%] sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]',
  4: 'w-[85%] sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-3rem)/4)]',
};

/**
 * Lightweight scroll-snap carousel.
 */
export function StoryItemsCarousel({
  children,
  perView = 3,
  step = 'page',
  className,
}: StoryItemsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, slides.length]);

  const scrollByStep = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    if (step === 'one') {
      const slide = el.querySelector<HTMLElement>('[data-carousel-slide]');
      if (!slide) return;
      const styles = getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
      el.scrollBy({ left: (slide.offsetWidth + gap) * dir, behavior: 'smooth' });
      return;
    }

    el.scrollBy({ left: el.clientWidth * 0.92 * dir, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((child, index) => (
          <div
            key={index}
            data-carousel-slide
            className={cn('min-w-0 shrink-0 snap-start', SLIDE_WIDTH[perView])}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={() => scrollByStep(-1)}
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-full border border-[#EDE8E3] bg-white text-[#3F3A36] transition',
            canPrev ? 'hover:border-[#E5DDD5] hover:bg-[#FAF7F4]' : 'cursor-not-allowed opacity-40',
          )}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={!canNext}
          onClick={() => scrollByStep(1)}
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-full border border-[#EDE8E3] bg-white text-[#3F3A36] transition',
            canNext ? 'hover:border-[#E5DDD5] hover:bg-[#FAF7F4]' : 'cursor-not-allowed opacity-40',
          )}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
