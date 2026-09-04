import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { CaStoryFeatureImage } from '@/components/illustrations/homepage/ca-homepage-visuals';
import { FadeUp } from '@/components/motion/fade-up';
import { StoryItemsCarousel } from '@/components/marketing/story-items-carousel';
import type { HubStorySection } from '@/data/content/homepage-hub';
import {
  CA_STORY_INNER_GAP,
  DEFAULT_HOMEPAGE_SECTION_PADDING,
  caStoryFeatureImage,
  caStoryImageRight,
  caStoryIsCentered,
  caStoryItemCols,
  caStoryItemLayout,
  caStoryMergeIntro,
  caStoryWideText,
  homepageSectionPadding,
  isCanadaHomepageDesign,
  type CaStoryItemLayout,
} from '@/lib/market/homepage-design';
import type { Market } from '@/lib/market/config';
import type { PlatformId } from '@/types/platform';
import { getUniqueStoryImage } from '@/lib/market/unique-service-images';
import { cn } from '@/lib/utils';

const CARD =
  'rounded-2xl bg-white p-5 ring-1 ring-[#EDE8E3] transition hover:ring-[#E5DDD5] h-full';

/** Market service pages: these story IDs render without a side illustration. */
const MARKET_SERVICE_STORY_NO_IMAGE = new Set([
  'likes-vs-views',
  'real-experience',
  'profile-experience',
]);

const SPLIT_GRID =
  'grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 xl:gap-12';

/** ~57% text / ~43% image — keeps long copy readable without starving the visual. */
const SPLIT_GRID_WIDE_TEXT_IMAGE_RIGHT =
  'grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10';
const SPLIT_GRID_WIDE_TEXT_IMAGE_LEFT =
  'grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-8 xl:gap-10';

function StoryHeading({
  block,
  center = false,
  hideLead = false,
  fullWidth = false,
}: {
  block: HubStorySection;
  center?: boolean;
  hideLead?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={cn(center && 'w-full text-center')}>
      <h2
        id={`${block.id}-heading`}
        className={cn(
          'text-balance text-[1.75rem] font-bold leading-[1.2] tracking-tight text-[#1C1917] sm:text-[2rem]',
          !center && !fullWidth && 'max-w-[36rem]',
        )}
      >
        {block.title}
      </h2>
      {!hideLead && block.lead ? (
        <p
          className={cn(
            'mt-4 text-pretty text-[15px] leading-relaxed text-[#6B6560]',
            !center && !fullWidth && 'max-w-[36rem]',
          )}
        >
          {block.lead}
        </p>
      ) : null}
    </div>
  );
}

const WIKIPEDIA_INSTAGRAM_HREF = 'https://en.wikipedia.org/wiki/Instagram';
const WIKIPEDIA_INSTAGRAM_MARKDOWN = '[Instagram](https://en.wikipedia.org/wiki/Instagram)';

function renderStoryParagraphText(text: string) {
  const parts = text.split(/(\[Instagram\]\(https:\/\/en\.wikipedia\.org\/wiki\/Instagram\))/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    part === WIKIPEDIA_INSTAGRAM_MARKDOWN ? (
      <a
        key={`wikipedia-instagram-${index}`}
        href={WIKIPEDIA_INSTAGRAM_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2"
      >
        Instagram
      </a>
    ) : (
      part
    ),
  );
}

function StoryParagraphs({
  paragraphs,
  center = false,
  asSingle = false,
  fullWidth = false,
}: {
  paragraphs: string[];
  center?: boolean;
  asSingle?: boolean;
  fullWidth?: boolean;
}) {
  if (asSingle) {
    return (
      <p
        className={cn(
          'text-[15px] leading-relaxed text-[#6B6560]',
          center ? 'w-full text-center' : !fullWidth && 'max-w-[36rem]',
        )}
      >
        {renderStoryParagraphText(paragraphs.join(' '))}
      </p>
    );
  }

  return (
    <div
      className={cn(
        'space-y-3.5 text-[15px] leading-relaxed text-[#6B6560]',
        center ? 'w-full text-center' : !fullWidth && 'max-w-[36rem]',
      )}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{renderStoryParagraphText(paragraph)}</p>
      ))}
    </div>
  );
}

function StoryBullets({
  bullets,
  center = false,
}: {
  bullets: string[];
  center?: boolean;
}) {
  return (
    <ul
      className={cn(
        'flex flex-wrap gap-2',
        center ? 'w-full justify-center' : 'max-w-[40rem]',
      )}
    >
      {bullets.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F4] px-3 py-1.5 text-[13px] text-[#44403C]"
        >
          <CheckCircle2 className="size-3.5 shrink-0 text-[#F97316]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function cardGridClass(cols: 3 | 4 | 5) {
  if (cols === 5) return 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-3';
  if (cols === 4) return 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4';
  return 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4';
}

function StoryItemCard({
  item,
}: {
  item: NonNullable<HubStorySection['items']>[number];
}) {
  return (
    <div className={CARD}>
      <h3 className="text-[15px] font-semibold text-[#1C1917]">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#6B6560]">{item.body}</p>
    </div>
  );
}

function StoryItemsCards({
  items,
  cols,
}: {
  items: NonNullable<HubStorySection['items']>;
  cols: 3 | 4 | 5;
}) {
  return (
    <div className={cardGridClass(cols)}>
      {items.map((item) => (
        <StoryItemCard key={item.title} item={item} />
      ))}
    </div>
  );
}

function StoryItemsCarouselLayout({
  items,
  cols,
}: {
  items: NonNullable<HubStorySection['items']>;
  cols: 3 | 4 | 5;
}) {
  const perView = cols === 5 ? 3 : cols === 4 ? 4 : 3;

  return (
    <StoryItemsCarousel perView={perView} step="one">
      {items.map((item) => (
        <StoryItemCard key={item.title} item={item} />
      ))}
    </StoryItemsCarousel>
  );
}

function StoryItemsChecklist({ items }: { items: NonNullable<HubStorySection['items']> }) {
  return (
    <ul className="mx-auto max-w-[42rem] space-y-4">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F97316]" aria-hidden />
          <div>
            <p className="text-[15px] font-semibold text-[#1C1917]">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#6B6560]">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StoryItemsSoftList({ items }: { items: NonNullable<HubStorySection['items']> }) {
  return (
    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-[15px] font-semibold text-[#1C1917]">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6B6560]">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

function StoryItems({
  items,
  layout,
  cols,
}: {
  items: NonNullable<HubStorySection['items']>;
  layout: CaStoryItemLayout;
  cols: 3 | 4 | 5;
}) {
  switch (layout) {
    case 'checklist':
      return <StoryItemsChecklist items={items} />;
    case 'feature-rows':
    case 'soft-list':
      return <StoryItemsSoftList items={items} />;
    case 'carousel':
      return <StoryItemsCarouselLayout items={items} cols={cols} />;
    default:
      return <StoryItemsCards items={items} cols={cols} />;
  }
}

function StoryFooter({
  footer,
  center = false,
  fullWidth = false,
}: {
  footer: string;
  center?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <p
      className={cn(
        'text-[15px] font-medium leading-relaxed text-[#57534E]',
        center ? 'w-full text-center' : !fullWidth && 'max-w-[36rem]',
      )}
    >
      {footer}
    </p>
  );
}

function CanadaSplitBlock({
  block,
  imageRight,
  platform,
  market,
  serviceSlug,
}: {
  block: HubStorySection;
  imageRight: boolean;
  platform?: PlatformId;
  market?: Market;
  serviceSlug?: string;
}) {
  const hasBullets = Boolean(block.bullets?.length);
  const hasItems = Boolean(block.items?.length);
  const layout = caStoryItemLayout(block.id);
  const cols = caStoryItemCols(block.id);
  const wideText = caStoryWideText(block.id);
  const mergeIntro = caStoryMergeIntro(block.id);
  const introParts = [
    ...(mergeIntro && block.lead ? [block.lead] : []),
    ...(block.paragraphs ?? []),
    ...(mergeIntro && block.footer && !hasItems ? [block.footer] : []),
  ];

  return (
    <div className="space-y-8">
      <div
        className={cn(
          wideText
            ? imageRight
              ? SPLIT_GRID_WIDE_TEXT_IMAGE_RIGHT
              : SPLIT_GRID_WIDE_TEXT_IMAGE_LEFT
            : SPLIT_GRID,
          !imageRight && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
        )}
      >
        <FadeUp className="min-w-0 space-y-4">
          <StoryHeading block={block} fullWidth hideLead={mergeIntro} />
          {mergeIntro && introParts.length ? (
            <StoryParagraphs paragraphs={introParts} fullWidth={wideText} asSingle />
          ) : block.paragraphs?.length ? (
            <StoryParagraphs paragraphs={block.paragraphs} fullWidth={wideText} />
          ) : null}
          {hasBullets ? <StoryBullets bullets={block.bullets!} /> : null}
          {!hasItems && block.footer && !mergeIntro ? (
            <StoryFooter footer={block.footer} fullWidth={wideText} />
          ) : null}
        </FadeUp>
        <FadeUp delay={0.04} className="w-full min-w-0 lg:sticky lg:top-28">
          <CaStoryFeatureImage
            sectionId={block.id}
            platform={platform}
            market={market}
            serviceSlug={serviceSlug}
            className="w-full"
          />
        </FadeUp>
      </div>

      {hasItems ? (
        <FadeUp>
          <StoryItems items={block.items!} layout={layout} cols={cols} />
        </FadeUp>
      ) : null}

      {hasItems && block.footer ? (
        <FadeUp>
          <StoryFooter footer={block.footer} />
        </FadeUp>
      ) : null}
    </div>
  );
}

function CanadaStackedBlock({ block }: { block: HubStorySection }) {
  const hasParagraphs = Boolean(block.paragraphs?.length);
  const hasItems = Boolean(block.items?.length);
  const hasBullets = Boolean(block.bullets?.length);
  const layout = caStoryItemLayout(block.id);
  const cols = caStoryItemCols(block.id);
  const center = caStoryIsCentered(block.id);
  const mergeIntro = caStoryMergeIntro(block.id);
  const introParts = [
    ...(mergeIntro && block.lead ? [block.lead] : []),
    ...(block.paragraphs ?? []),
    ...(mergeIntro && block.footer ? [block.footer] : []),
  ];

  return (
    <div className="space-y-6">
      <FadeUp>
        <StoryHeading block={block} center={center} hideLead={mergeIntro} />
      </FadeUp>

      {mergeIntro && introParts.length ? (
        <FadeUp>
          <StoryParagraphs paragraphs={introParts} center={center} asSingle />
        </FadeUp>
      ) : hasParagraphs ? (
        <FadeUp>
          <StoryParagraphs paragraphs={block.paragraphs!} center={center} />
        </FadeUp>
      ) : null}

      {hasBullets ? (
        <FadeUp>
          <StoryBullets bullets={block.bullets!} center={center} />
        </FadeUp>
      ) : null}

      {hasItems ? (
        <FadeUp>
          <StoryItems items={block.items!} layout={layout} cols={cols} />
        </FadeUp>
      ) : null}

      {block.footer && !(mergeIntro && block.footer) ? (
        <FadeUp>
          <StoryFooter footer={block.footer} center={center} />
        </FadeUp>
      ) : null}
    </div>
  );
}

function CanadaStoryBlock({
  block,
  index,
  isFirst,
  platform,
  market,
  serviceSlug,
}: {
  block: HubStorySection;
  index: number;
  isFirst: boolean;
  platform?: PlatformId;
  market?: Market;
  serviceSlug?: string;
}) {
  const featureImage =
    market && serviceSlug
      ? MARKET_SERVICE_STORY_NO_IMAGE.has(block.id)
        ? null
        : getUniqueStoryImage(market, serviceSlug, block.id, platform)
      : caStoryFeatureImage(block.id, platform);
  const imageRight = caStoryImageRight(block.id, index);

  return (
    <article
      id={block.id}
      className={cn('scroll-mt-24', !isFirst && CA_STORY_INNER_GAP)}
      aria-labelledby={`${block.id}-heading`}
    >
      {featureImage ? (
        <CanadaSplitBlock
          block={block}
          imageRight={imageRight}
          platform={platform}
          market={market}
          serviceSlug={serviceSlug}
        />
      ) : (
        <CanadaStackedBlock block={block} />
      )}
    </article>
  );
}

function DefaultStorySection({ block }: { block: HubStorySection }) {
  return (
    <>
      <FadeUp>
        <StoryHeading block={block} />
      </FadeUp>
      {block.paragraphs?.length ? (
        <FadeUp className="mt-6 max-w-[42rem] space-y-4">
          <StoryParagraphs paragraphs={block.paragraphs} />
        </FadeUp>
      ) : null}
      {block.bullets?.length ? (
        <FadeUp className="mt-6">
          <StoryBullets bullets={block.bullets} />
        </FadeUp>
      ) : null}
      {block.items?.length ? (
        <div className="mt-8">
          <StoryItems items={block.items} layout="cards" cols={3} />
        </div>
      ) : null}
      {block.footer ? (
        <FadeUp className="mt-6 max-w-[42rem]">
          <StoryFooter footer={block.footer} />
        </FadeUp>
      ) : null}
    </>
  );
}

export function MarketStorySections({
  sections,
  market,
  platform,
  serviceSlug,
}: {
  sections: HubStorySection[];
  market?: Market;
  platform?: PlatformId;
  serviceSlug?: string;
}) {
  if (!sections.length) return null;

  const enhanced = isCanadaHomepageDesign(market);

  if (!enhanced) {
    return (
      <>
        {sections.map((block) => (
          <Section
            key={block.id}
            id={block.id}
            spacing="none"
            className={cn('relative overflow-hidden bg-transparent', DEFAULT_HOMEPAGE_SECTION_PADDING)}
            aria-labelledby={`${block.id}-heading`}
          >
            <Container size="xl">
              <DefaultStorySection block={block} />
            </Container>
          </Section>
        ))}
      </>
    );
  }

  return (
    <Section spacing="none" className={cn('bg-transparent', homepageSectionPadding(market))}>
      <Container size="xl">
        {sections.map((block, index) => (
          <CanadaStoryBlock
            key={block.id}
            block={block}
            index={index}
            isFirst={index === 0}
            platform={platform}
            market={market}
            serviceSlug={serviceSlug}
          />
        ))}
      </Container>
    </Section>
  );
}
