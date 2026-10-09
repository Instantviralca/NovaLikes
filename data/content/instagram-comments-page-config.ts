import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Instagram Comments — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → High Quality vs Premium and comment settings, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-instagram-comments.json.
 *
 * Facts used here (keep in sync if they change): High Quality = short positive
 * comments; Premium = comments written around the post from more realistic-looking
 * accounts; custom wording and other languages on request (checkout note or
 * WhatsApp); delivery starts within 6–8 hours, standard delivery completes 4–6 hours
 * after start; 6-month refill from delivery date; prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'ig-c-10':
    'For a single post that has no comments yet, or to see how the service looks before ordering more.',
  'ig-c-25':
    'Our most popular High Quality package — enough to make a normal post look talked about.',
  'ig-c-50':
    'For product, launch or giveaway posts that already get a few hundred likes.',
  'ig-c-75':
    'For large accounts and Reels with strong reach. Consider gradual delivery.',
  'ig-c-100':
    'For campaign posts on big accounts. Spread delivery out so the thread grows naturally.',
};

export function applyInstagramCommentsAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Instagram Comments From NovaLikes?',
        description:
          'Comments are the one metric people actually read, so they need more care than a number. Our team has handled Instagram orders for 7–8 years, first on earlier sites, then as ViralMe and now as NovaLikes. Here is what you get with a comments order.',
        items: [
          {
            id: 'buy-instagram-comments-0',
            title: 'Two Comment Types',
            description:
              'High Quality gives short, positive comments. Premium gives comments written around your post, from more realistic-looking accounts.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-comments-1',
            title: 'Your Own Words If You Want',
            description:
              'Prefer to choose the wording? Send your comments in the checkout note or on WhatsApp and we use them instead of ours.',
            icon: 'briefcase',
          },
          {
            id: 'buy-instagram-comments-2',
            title: 'English or Your Language',
            description:
              'Comments are written in English by default. Need another language for your audience? Ask in the note and we will arrange it.',
            icon: 'map-pin',
          },
          {
            id: 'buy-instagram-comments-3',
            title: '6-Month Refill',
            description:
              'If delivered comments disappear within 6 months, send your order ID on WhatsApp and we replace the missing ones.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy comments for any public Instagram photo post, carousel or Reel. Choose High Quality or Premium, pick how many comments you want, paste the post link and pay in US dollars. The comments appear under that post only.',
        cards: [
          {
            id: 'buy-instagram-comments-4',
            title: 'What You Get',
            description:
              'Comments from separate accounts posted under the post you submit. You can reply to them, like them or pin one, just like any other comment.',
            icon: 'users',
          },
          {
            id: 'buy-instagram-comments-5',
            title: 'What We Need From You',
            description:
              'The public post or Reel link and, if you want, your own comment text or a language preference. Never your Instagram password.',
            icon: 'lock',
          },
          {
            id: 'buy-instagram-comments-6',
            title: 'What Comments Will Not Do',
            description:
              'They do not add followers, likes or views, and they do not start real conversations by themselves. They make the post look talked about.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'Before you order, check that comments are turned on for the post and allowed from everyone. If comments are off or limited to followers, the order cannot be delivered.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Comments Help an Instagram Post?',
        description:
          'They help the post look alive, which matters most to the people who open it. A post with a few relevant comments invites the next person to join in; a post with none often gets scrolled past. Instagram also looks at conversations under a post, but it can tell the difference between a real discussion and a list of one-word replies — so comments are not a reach switch.',
        helpTitle: 'Where comments work well',
        helpItems: [
          'Product and service posts, where visitors look at comments before they trust a business.',
          'Launch, giveaway and announcement posts that should look active from the start.',
          'Posts where you reply to the comments, so the thread reads like a real conversation.',
        ],
        limitTitle: 'Where they fall short',
        limitItems: [
          'Generic comments on a very specific post — this is where Premium or your own wording is the better choice.',
          'A post with 80 comments but only 30 likes looks unbalanced. Keep comments in proportion to the rest.',
          'Comments will not make Instagram push a post that real viewers skip.',
        ],
        closingNote:
          'Our Learn Center guide comparing Instagram followers, likes, views and comments explains how each one is seen by visitors and by Instagram.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'Here is what happens after you pay for an Instagram comments order.',
        steps: [
          {
            id: 'buy-instagram-comments-th-1',
            title: 'Your Note Is Read First',
            description:
              'If you sent your own comments, a language or a pace in the checkout note, it is applied to the order before anything is posted.',
          },
          {
            id: 'buy-instagram-comments-th-2',
            title: 'Comments Start Within 6–8 Hours',
            description:
              'Most comments orders start within 6–8 hours of payment. Gradual orders are spread out so the comments arrive over a longer period.',
          },
          {
            id: 'buy-instagram-comments-th-3',
            title: 'Most Orders Finish in 4–6 Hours',
            description:
              'Once started, a standard comments order is usually complete within 4–6 hours. Track progress with your order ID on the Track Order page.',
          },
          {
            id: 'buy-instagram-comments-th-4',
            title: 'Covered for 6 Months',
            description:
              'The refill period starts when delivery is complete. If comments are removed later, message us on WhatsApp and we replace them.',
          },
        ],
        closingNote:
          'Keep the account public and comments switched on until delivery is complete. Avoid deleting or hiding delivered comments, or the refill cannot cover them.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Comments are public text under your post, so a quick check before checkout matters more here than with likes or views.',
        framingNote:
          'Prices are in US dollars. If you want your own comments or another language, write it in the checkout note before you pay.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'High Quality vs Premium Comments — and the Settings That Matter',
        description:
          'The main choice is the comment type. After that, two Instagram settings decide whether comments can be delivered and stay visible.',
        eyebrow: 'Choose the right comments',
        closingNote:
          'Not sure which type fits your post? Send us the link on WhatsApp before you order and we will suggest one.',
        cards: [
          {
            id: 'buy-instagram-comments-12',
            title: 'High Quality',
            description:
              'Short, positive comments such as reactions and compliments. A good fit for lifestyle posts, photos and Reels where a general reaction makes sense.',
            icon: 'heart',
          },
          {
            id: 'buy-instagram-comments-13',
            title: 'Premium',
            description:
              'Comments written around what your post shows or says, from more realistic-looking accounts. Better for products, services and posts that ask a question.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-comments-14',
            title: 'Who Can Comment',
            description:
              'In Instagram settings, comments must be allowed from everyone. If they are limited to followers or people you follow, the order cannot be delivered.',
            icon: 'users',
          },
          {
            id: 'buy-instagram-comments-15',
            title: 'Hidden Words Filter',
            description:
              'Instagram can hide comments that match your filters. If delivered comments do not show, check Hidden comments under the post and your Hidden Words settings.',
            icon: 'shield-check',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Comments should look in proportion to your likes. As a rough guide, a post usually has far fewer comments than likes, so 10–25 comments suits most posts and larger packages suit busy, high-reach content.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'Most of the comments orders we handle fall into a few groups. All of them are about the first impression a post gives to people reading it.',
      items: [
        {
          id: 'buy-instagram-comments-wb-1',
          title: 'An Empty Comment Section',
          description:
            'A post with zero comments can feel ignored. A few comments make it easier for the next visitor to say something too.',
        },
        {
          id: 'buy-instagram-comments-wb-2',
          title: 'Product and Service Posts',
          description:
            'Businesses add Premium comments to product photos and service posts, where customers read the comments before deciding.',
        },
        {
          id: 'buy-instagram-comments-wb-3',
          title: 'Giveaways and Launches',
          description:
            'Posts that run for a short time — events, giveaways, launch days — need to look active quickly.',
        },
        {
          id: 'buy-instagram-comments-wb-4',
          title: 'Questions in the Caption',
          description:
            'When a caption asks a question, a few answers in the comments show visitors the post is open for discussion.',
        },
        {
          id: 'buy-instagram-comments-wb-5',
          title: 'A Thread You Can Reply To',
          description:
            'Owners reply to delivered comments or pin one, which turns a quiet post into something that looks like a conversation.',
        },
      ],
      bottomNote:
        'Comments only change the comment section of one post. For a bigger profile, more likes or more Reel views, compare the other Instagram services below.',
    },
  };
}
