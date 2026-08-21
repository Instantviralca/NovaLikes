import type { ArticleContentBlock } from '@/types/learn-article-blocks';

export type SplitArticleBlocks = {
  intro: ArticleContentBlock[];
  body: ArticleContentBlock[];
};

/**
 * Split the article body at the first H2 so the template can place
 * an "At a glance" summary between the introduction and the first section.
 */
export function splitArticleIntro(
  blocks: ArticleContentBlock[],
): SplitArticleBlocks {
  const index = blocks.findIndex(
    (block) => block.type === 'heading' && block.headingLevel === 2,
  );
  if (index <= 0) {
    return { intro: [], body: blocks };
  }
  return {
    intro: blocks.slice(0, index),
    body: blocks.slice(index),
  };
}
