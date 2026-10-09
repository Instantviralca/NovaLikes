import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Instagram Likes — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → post types and hidden like counts, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-instagram-likes.json.
 *
 * Facts used here (keep in sync if they change): delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request
 * (checkout note or WhatsApp), 6-month refill from delivery date, prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'buy-instagram-likes-pkg-100':
    'For new or small accounts, or to test the service on one post first.',
  'buy-instagram-likes-pkg-500':
    'For accounts with a few thousand followers that want a recent post to match their usual numbers.',
  'buy-instagram-likes-pkg-1k':
    'Our most popular choice — fits a product, launch or announcement post on an established account.',
  'buy-instagram-likes-pkg-5k':
    'For larger accounts and Reels that are already getting thousands of views.',
  'buy-instagram-likes-pkg-10k':
    'For big brand or campaign posts. A slower, gradual pace keeps the rise looking steady.',
};

export function applyInstagramLikesAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Instagram Likes From NovaLikes?',
        description:
          'NovaLikes is run by the same team that has handled Instagram orders for 7–8 years, including the years we traded as ViralMe. A likes order with us is simple: one link, a known start time, your choice of pace, and a refill if the count drops later.',
        items: [
          {
            id: 'buy-instagram-likes-0',
            title: 'Posts, Reels and Carousels',
            description:
              'Likes can go on a photo post, a carousel or a Reel. You send the link to the exact post and the likes are added to that post only.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-instagram-likes-1',
            title: 'Starts in 6–8 Hours, Done in 4–6',
            description:
              'Most likes orders start within 6–8 hours of payment. Once started, standard delivery usually finishes within 4–6 hours.',
            icon: 'truck',
          },
          {
            id: 'buy-instagram-likes-2',
            title: 'A Natural Pace If You Want It',
            description:
              'Prefer likes to arrive slowly over a day or more? Write it in the checkout note or tell us on WhatsApp before the order starts.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-likes-3',
            title: 'Refill for 6 Months',
            description:
              'If the like count on that post drops within 6 months of delivery, message us your order ID on WhatsApp and we top it back up.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy likes for any public Instagram photo post, carousel or Reel. Each order covers one post: you paste its link, choose how many likes you want and pay in US dollars. Your password is never needed.',
        cards: [
          {
            id: 'buy-instagram-likes-4',
            title: 'One Post per Order',
            description:
              'The likes are added to the post or Reel in the link you submit. Want likes on three posts? Place three orders, one link each.',
            icon: 'heart',
          },
          {
            id: 'buy-instagram-likes-5',
            title: 'Where the Link Comes From',
            description:
              'Tap the three dots or the share icon on the post and choose Copy link. Post links look like instagram.com/p/…, Reel links look like instagram.com/reel/….',
            icon: 'briefcase',
          },
          {
            id: 'buy-instagram-likes-6',
            title: 'What Likes Will Not Change',
            description:
              'Your follower count, your Reel views and your comments stay the same. Likes raise the heart count on that one post — nothing else.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'An order cannot start if the account is private, the post has been archived or deleted, or the link points to your profile instead of the post.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Likes Help Your Instagram Posts Get Seen?',
        description:
          'A little, in the right situation — but they are not a ranking shortcut. Instagram weighs many signals when deciding who sees a post, and for Reels it pays close attention to watch time and how often a post is sent to friends. A like from an account that does nothing else is a weak signal. Where likes do help is first impressions: people are more willing to stop on a post that already looks appreciated.',
        helpTitle: 'When likes make a difference',
        helpItems: [
          'A product, sale or announcement post that should look trusted from the first hour.',
          'A post you plan to boost with ads, so new visitors do not land on a post with 4 likes.',
          'Keeping recent posts in line with your usual numbers when one post underperforms.',
        ],
        limitTitle: 'When they will not',
        limitItems: [
          'If you have hidden the like count, visitors cannot see the number, so the social-proof effect mostly disappears.',
          'Likes do not add saves, shares or comments — the actions Instagram reads as stronger interest.',
          'A like count far above your follower and view numbers can look unnatural rather than impressive.',
        ],
        closingNote:
          'Our Learn Center guide comparing Instagram followers, likes, views and comments explains what each number actually tells Instagram and your visitors.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'From payment to finished delivery, a likes order goes through four short steps.',
        steps: [
          {
            id: 'buy-instagram-likes-th-1',
            title: 'Order Confirmed by Email',
            description:
              'You get a confirmation with your order ID straight after payment. Keep it — you need it to track the order or ask for a refill.',
          },
          {
            id: 'buy-instagram-likes-th-2',
            title: 'Likes Start Within 6–8 Hours',
            description:
              'The order is matched to your post link and starts within 6–8 hours. If your note asked for a slower pace, delivery is spread out instead.',
          },
          {
            id: 'buy-instagram-likes-th-3',
            title: 'Standard Delivery Ends in 4–6 Hours',
            description:
              'Most orders are complete 4–6 hours after they start. You can watch the count rise on the post and follow progress on the Track Order page.',
          },
          {
            id: 'buy-instagram-likes-th-4',
            title: 'Your 6-Month Refill Begins',
            description:
              'The refill period starts on the day delivery finishes. If the like count falls, send your order ID on WhatsApp and we add the missing likes.',
          },
        ],
        closingNote:
          'Keep the account public and the post up until delivery is finished. You can switch back to a private account afterwards.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Most order problems come from the link or from a private account. Check these five points and your order should start without a hitch.',
        framingNote:
          'All prices are in US dollars. Paying in another currency? Your bank converts the amount at its own exchange rate.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Photo Posts, Carousels, Reels and Hidden Like Counts',
        description:
          'Likes work the same way on every public post type. The only thing that changes is the link you copy — and whether you have chosen to hide the like count on that post.',
        eyebrow: 'Which posts can get likes',
        closingNote:
          'Not sure which link to use? Message us on WhatsApp before you order and we will check it for you.',
        cards: [
          {
            id: 'buy-instagram-likes-12',
            title: 'Photo Posts',
            description:
              'Single-image posts use a link like instagram.com/p/…. The likes appear on that image post.',
            icon: 'heart',
          },
          {
            id: 'buy-instagram-likes-13',
            title: 'Carousels',
            description:
              'A carousel is one post, so one link covers it. Likes are counted for the whole carousel, not for each slide.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-likes-14',
            title: 'Reels',
            description:
              'Reels use a link like instagram.com/reel/…. Likes raise the heart count; the view count is a separate number and a separate service.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-instagram-likes-15',
            title: 'Hidden Like Counts',
            description:
              'If you hid the like count on a post, the likes are still delivered and you can still see them, but visitors cannot. Unhide it from the post’s three-dot menu if you want the number shown.',
            icon: 'lock',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Keep likes in proportion to the rest of the account. A post with 2,000 likes on a profile with 300 followers and 500 views looks odd; one with 150 likes does not. Use the guide below as a starting point.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'We see the same few reasons again and again in our orders. Every one of them is about how a post looks to the people who see it — not about tricking Instagram.',
      items: [
        {
          id: 'buy-instagram-likes-wb-1',
          title: 'A Quiet Start on a New Post',
          description:
            'A post with a handful of likes in its first hours can make visitors scroll past. A starting count gives it a fairer first impression.',
        },
        {
          id: 'buy-instagram-likes-wb-2',
          title: 'Product and Sale Posts',
          description:
            'Shops add likes to product photos, offers and new-arrival posts that customers also see from their website or WhatsApp.',
        },
        {
          id: 'buy-instagram-likes-wb-3',
          title: 'Giveaways and Announcements',
          description:
            'Event, giveaway and announcement posts often need to look active quickly because they only matter for a few days.',
        },
        {
          id: 'buy-instagram-likes-wb-4',
          title: 'One Post Lagging Behind',
          description:
            'When most posts get 300 likes and one gets 40, some owners top up the weaker post so the grid looks even.',
        },
        {
          id: 'buy-instagram-likes-wb-5',
          title: 'Before Boosting a Post',
          description:
            'Some customers add likes to a post before they promote it, so paid visitors land on a post that already has some appreciation.',
        },
      ],
      bottomNote:
        'Likes only change the heart count on one post. For more profile followers, Reel views or comments, compare the other Instagram services below.',
    },
  };
}
