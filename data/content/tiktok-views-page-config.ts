import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy TikTok Views — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → public views vs Creator Rewards qualified views, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-tiktok-views.json.
 *
 * Facts used here (keep in sync if they change): High Quality and Premium options
 * (Premium described only as the higher-tier option); delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request,
 * 6-month refill from delivery date, prices in USD. Qualified-views wording mirrors
 * the Learn article how-tiktok-video-views-are-counted.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'tt-v-hq-1000':
    'For new videos or videos under 1,000 views, or to test the service first.',
  'tt-v-hq-5000':
    'For videos stuck at a few thousand views that you want to look more active.',
  'tt-v-hq-10000':
    'For pinned, product or older grid videos that should match your stronger posts.',
  'tt-v-hq-50000':
    'Our most popular High Quality package — for campaign videos or accounts that already reach tens of thousands. Gradual delivery recommended.',
};

export function applyTiktokViewsAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy TikTok Views From NovaLikes?',
        description:
          'Our team has handled social media orders for 7–8 years, from our earlier sites to ViralMe and now NovaLikes. A TikTok views order with us is built around four things customers ask about most.',
        items: [
          {
            id: 'buy-tiktok-views-0',
            title: 'Two View Options',
            description:
              'Choose High Quality for the lowest price per view, or Premium, our higher-tier option. Not sure which? Ask us on WhatsApp before ordering.',
            icon: 'sparkles',
          },
          {
            id: 'buy-tiktok-views-1',
            title: 'Starts in 6–8 Hours',
            description:
              'Most TikTok views orders start within 6–8 hours of payment and finish 4–6 hours after starting.',
            icon: 'truck',
          },
          {
            id: 'buy-tiktok-views-2',
            title: 'Gradual Delivery Available',
            description:
              'Prefer the play count to climb steadily? Add a note at checkout or message us on WhatsApp and we spread the views out.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-tiktok-views-3',
            title: '6-Month Refill',
            description:
              'If the view count on that video drops within 6 months of delivery, send your order ID on WhatsApp and we top it back up.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy views for any public TikTok video. Copy the link from TikTok’s Share button, pick High Quality or Premium and a quantity, and pay in US dollars. The public view count on that video goes up — likes, comments and followers do not change.',
        cards: [
          {
            id: 'buy-tiktok-views-4',
            title: 'The Play Count Goes Up',
            description:
              'Views are added to the public view number shown on the video and on your profile grid. Each order covers one video.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-tiktok-views-5',
            title: 'Link In, Password Out',
            description:
              'Open the video, tap Share, then Copy link, and paste it at checkout. We never ask for your TikTok login.',
            icon: 'lock',
          },
          {
            id: 'buy-tiktok-views-6',
            title: 'Not Creator Rewards Views',
            description:
              'TikTok counts Creator Rewards earnings on separate “qualified views” and excludes paid views. Bought views raise the public number only.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'The video must be public and stay up until delivery finishes. Videos set to Friends or Only you cannot receive views.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Views Help a TikTok Video?',
        description:
          'They help with how a video looks, not with what TikTok decides to recommend. TikTok shows each new video to a small group and widens its reach when those viewers watch to the end, rewatch, share and follow. A higher public view count is social proof for the people who see it — and that is the honest extent of the benefit.',
        helpTitle: 'Where views help',
        helpItems: [
          'Older videos on your profile grid that look quiet next to your newer, more successful ones.',
          'Product, shop and brand videos you link to from your website or ads.',
          'Pinned videos, which every profile visitor sees first.',
        ],
        limitTitle: 'Where they do not',
        limitItems: [
          'Pushing a video onto the For You page — viewer reactions decide that, not the counter.',
          'Creator Rewards earnings: TikTok excludes paid views from qualified views, so buying views to earn breaks its rules.',
          'A video with 50,000 views and 12 likes looks odd. Keep views and likes in a believable balance.',
        ],
        closingNote:
          'Our Learn Center guide on how TikTok video views are counted explains public views, Creator Rewards qualified views and the myths around both.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'After you pay for TikTok views, the order moves through four short steps.',
        steps: [
          {
            id: 'buy-tiktok-views-th-1',
            title: 'Video Link Attached',
            description:
              'Your video link and view option are tied to your order ID. If you spot a wrong link, message us on WhatsApp before delivery starts.',
          },
          {
            id: 'buy-tiktok-views-th-2',
            title: 'Views Start Within 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. With gradual delivery, the same order is spread over a longer stretch.',
          },
          {
            id: 'buy-tiktok-views-th-3',
            title: 'Standard Orders Complete in 4–6 Hours',
            description:
              'A standard views order usually finishes 4–6 hours after it starts. Follow it on the Track Order page.',
          },
          {
            id: 'buy-tiktok-views-th-4',
            title: 'Refill Period Begins',
            description:
              'Your 6-month refill starts the day delivery is complete. If views drop, send your order ID on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the video public and do not delete or re-upload it. A re-uploaded video has a new link and starts from zero.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Almost every problem comes from the video link or its privacy setting. Check these five points first.',
        framingNote:
          'Prices are in US dollars. Your bank converts the amount if you pay in another currency.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Public Views vs Qualified Views on TikTok',
        description:
          'TikTok uses two different view numbers. Knowing which one a views package changes saves a lot of confusion later.',
        eyebrow: 'Know which number changes',
        closingNote:
          'Read our Learn Center guide on how TikTok video views are counted for the full explanation.',
        cards: [
          {
            id: 'buy-tiktok-views-12',
            title: 'Public View Count',
            description:
              'The number everyone sees on the video. This is the number a NovaLikes views package raises.',
            icon: 'users',
          },
          {
            id: 'buy-tiktok-views-13',
            title: 'Qualified Views',
            description:
              'A Creator Rewards metric: unique For You views longer than five seconds. TikTok excludes paid views from it.',
            icon: 'briefcase',
          },
          {
            id: 'buy-tiktok-views-14',
            title: 'Views vs Likes',
            description:
              'Views count plays, likes count hearts. Buying one does not add the other, so check both numbers before you order.',
            icon: 'heart',
          },
          {
            id: 'buy-tiktok-views-15',
            title: 'One Video per Order',
            description:
              'Each order goes to a single video link. For several videos, place one order per video.',
            icon: 'map-pin',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Start from what the video already has. A package that roughly doubles or triples the current views looks natural; jumping from 300 views to 50,000 overnight does not.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'TikTok customers tell us the same few reasons. All of them are about how a video looks to people — none is about tricking TikTok.',
      items: [
        {
          id: 'buy-tiktok-views-wb-1',
          title: 'A Quiet Video on a Busy Grid',
          description:
            'When most videos have thousands of views and one has 200, it stands out. Views bring it in line with the rest.',
        },
        {
          id: 'buy-tiktok-views-wb-2',
          title: 'Product and Shop Videos',
          description:
            'Sellers add views to product demos they share on their website, in emails or in ads, where the play count is the first thing buyers notice.',
        },
        {
          id: 'buy-tiktok-views-wb-3',
          title: 'Launch Day for a New Video',
          description:
            'Some creators give a new upload a starting count so the first real viewers do not see a video with almost no plays.',
        },
        {
          id: 'buy-tiktok-views-wb-4',
          title: 'Pinned Videos',
          description:
            'Pinned videos are the first impression of a profile. Customers add views there before anywhere else.',
        },
        {
          id: 'buy-tiktok-views-wb-5',
          title: 'Knowing the Limits',
          description:
            'Views change one number. For You reach, follows and Creator Rewards still depend on real viewers and real watch time.',
        },
      ],
      bottomNote:
        'Want more hearts or a bigger profile instead? TikTok Likes and TikTok Followers are separate services — compare them below.',
    },
  };
}
