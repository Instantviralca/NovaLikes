import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy TikTok Likes — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → likes vs views ratio, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-tiktok-likes.json.
 *
 * Facts used here (keep in sync if they change): delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request
 * (checkout note or WhatsApp), 6-month refill from delivery date, prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'tt-l-100':
    'For a video with a few thousand views, or to test the service on one video first.',
  'tt-l-500':
    'For videos with roughly 5,000–10,000 views that look quieter than they should.',
  'tt-l-1000':
    'Our most popular package — fits videos already past 10,000 views, including pinned and product videos.',
  'tt-l-5000':
    'For videos with strong reach, tens of thousands of views and up. Gradual delivery recommended.',
  'tt-l-10000':
    'For campaign or viral-sized videos with very high view counts. Spread delivery over a longer period.',
};

export function applyTiktokLikesAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy TikTok Likes From NovaLikes?',
        description:
          'We have run social media orders for 7–8 years — earlier sites first, then ViralMe, now NovaLikes. For TikTok likes that experience comes down to four simple promises.',
        items: [
          {
            id: 'buy-tiktok-likes-0',
            title: 'One Video, One Link',
            description:
              'Likes go only to the video in the link you send. Other videos and your follower count stay untouched.',
            icon: 'heart',
          },
          {
            id: 'buy-tiktok-likes-1',
            title: 'Starts Within 6–8 Hours',
            description:
              'Most TikTok likes orders start within 6–8 hours of payment and finish about 4–6 hours after starting.',
            icon: 'truck',
          },
          {
            id: 'buy-tiktok-likes-2',
            title: 'Steady Pace If You Prefer',
            description:
              'Ask for gradual delivery in the checkout note or on WhatsApp and the likes arrive over a longer stretch instead of all at once.',
            icon: 'sparkles',
          },
          {
            id: 'buy-tiktok-likes-3',
            title: '6 Months of Refill Cover',
            description:
              'If the like count on that video falls within 6 months of delivery, send your order ID on WhatsApp and we add the missing likes.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy likes for any public TikTok video. Copy the video link from TikTok’s Share button, choose how many likes you want and pay in US dollars. The heart count on that video goes up; nothing else on your account changes.',
        cards: [
          {
            id: 'buy-tiktok-likes-4',
            title: 'The Heart Count Rises',
            description:
              'Likes are added to the like counter under the video you submit. Views, comments, shares and followers are separate numbers.',
            icon: 'heart',
          },
          {
            id: 'buy-tiktok-likes-5',
            title: 'All We Need Is the Link',
            description:
              'Open the video, tap Share, then Copy link. Paste that link at checkout. We never ask for your TikTok password or a login.',
            icon: 'briefcase',
          },
          {
            id: 'buy-tiktok-likes-6',
            title: 'Where the Likes Come From',
            description:
              'Likes come from realistic-looking accounts. We do not claim they are active people who will watch your other videos or follow you.',
            icon: 'users',
          },
        ],
        closingNote:
          'The video must stay public and available until delivery is done. Videos set to Friends or Only you cannot receive an order.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Likes Help a TikTok Video Get More Views?',
        description:
          'Not directly. TikTok tests each video with a small group and keeps showing it when those viewers watch to the end, rewatch, share, comment or follow. Likes are one of many signals, and likes without watch time behind them carry little weight. What a higher like count does change is how the video looks to the people already watching — and that first impression is the real benefit.',
        helpTitle: 'Where likes help',
        helpItems: [
          'Product and TikTok Shop videos, where a healthy like count makes viewers trust what they are seeing.',
          'Your pinned videos, which every profile visitor sees first.',
          'A video you are about to promote, so paid viewers do not land on a video with a handful of likes.',
        ],
        limitTitle: 'Where they do not',
        limitItems: [
          'Pushing a video onto the For You page by themselves — watch time and shares matter far more.',
          'A video with 2,000 likes but only 1,500 views looks wrong. Likes should stay well below views.',
          'Replacing the hook: if viewers swipe away in the first seconds, likes will not keep the video alive.',
        ],
        closingNote:
          'Our Learn Center guide on TikTok likes vs views explains how the two numbers relate and what TikTok reads from each.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'From checkout to finished delivery, a TikTok likes order follows four steps.',
        steps: [
          {
            id: 'buy-tiktok-likes-th-1',
            title: 'Link Checked Against Your Order',
            description:
              'The video link you pasted is attached to your order ID. If you notice a wrong link, message us on WhatsApp before delivery starts.',
          },
          {
            id: 'buy-tiktok-likes-th-2',
            title: 'Likes Begin Within 6–8 Hours',
            description:
              'Most orders begin within 6–8 hours of payment. Gradual orders begin in the same window but spread the likes over a longer period.',
          },
          {
            id: 'buy-tiktok-likes-th-3',
            title: 'Standard Delivery Ends in 4–6 Hours',
            description:
              'Once started, most likes orders are complete within 4–6 hours. Check progress on the Track Order page with your order ID and email.',
          },
          {
            id: 'buy-tiktok-likes-th-4',
            title: '6-Month Refill Starts',
            description:
              'Refill cover begins the day delivery finishes. If the like count drops later, send your order ID on WhatsApp and we top it up.',
          },
        ],
        closingNote:
          'Keep the video public and do not delete or re-upload it, or neither delivery nor refills can reach it.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Most issues come from the video link or the video’s privacy setting. Check these five points before you pay.',
        framingNote:
          'Prices are in US dollars. Your bank converts the amount if you pay in another currency.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Likes, Views and the Ratio Viewers Notice',
        description:
          'TikTok shows views and likes side by side, so people compare them without thinking. Keeping the two in a believable balance matters more than the size of either number.',
        eyebrow: 'Get the balance right',
        closingNote:
          'Video has plenty of likes but few views? Our TikTok Views service raises the play count on the same video.',
        cards: [
          {
            id: 'buy-tiktok-likes-12',
            title: 'Two Separate Counters',
            description:
              'Views count plays; likes count hearts. Buying likes does not change the view count, and buying views does not add likes.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-tiktok-likes-13',
            title: 'Likes Stay Below Views',
            description:
              'On a normal video only a share of viewers tap the heart. Choose a likes package that keeps likes clearly under the view count.',
            icon: 'megaphone',
          },
          {
            id: 'buy-tiktok-likes-14',
            title: 'Pinned Videos First',
            description:
              'Profile visitors see your three pinned videos before anything else. Those are often the best place to add likes.',
            icon: 'map-pin',
          },
          {
            id: 'buy-tiktok-likes-15',
            title: 'Same Video, Same Link',
            description:
              'Deleting and re-uploading a video creates a new link and a new counter. Order for the version that is staying up.',
            icon: 'lock',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Let the video’s current views guide you. As a rough rule, choose a likes package that leaves likes well below the views the video already has.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'The reasons our TikTok customers give are practical, and all of them are about how a video looks to the people who already see it.',
      items: [
        {
          id: 'buy-tiktok-likes-wb-1',
          title: 'Product and Shop Videos',
          description:
            'Sellers add likes to product demos and TikTok Shop videos so buyers see that others liked what they are looking at.',
        },
        {
          id: 'buy-tiktok-likes-wb-2',
          title: 'Pinned Videos on the Profile',
          description:
            'Pinned videos are the shop window of a TikTok profile. Creators add likes there so the first impression is strong.',
        },
        {
          id: 'buy-tiktok-likes-wb-3',
          title: 'Balancing a Good Video',
          description:
            'Some videos get solid views but very few likes. A modest package brings the heart count closer to what viewers expect.',
        },
        {
          id: 'buy-tiktok-likes-wb-4',
          title: 'Before Promoting a Video',
          description:
            'Customers often add likes before running Promote or ads, so paid traffic lands on a video that already looks appreciated.',
        },
        {
          id: 'buy-tiktok-likes-wb-5',
          title: 'Keeping Expectations Real',
          description:
            'Likes change one counter. Views, follows and sales still come from the video itself and how long people watch it.',
        },
      ],
      bottomNote:
        'Need more plays or a bigger profile instead? TikTok Views and TikTok Followers are separate services — compare them below.',
    },
  };
}
