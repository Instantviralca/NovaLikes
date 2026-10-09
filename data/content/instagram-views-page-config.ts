import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Instagram Views — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → "how a view is counted", package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-instagram-views.json.
 *
 * Facts used here (keep in sync if they change): delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request
 * (checkout note or WhatsApp), 6-month refill from delivery date, prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'buy-instagram-views-pkg-100':
    'For a brand-new Reel with almost no views yet, or to try the service before a bigger order.',
  'buy-instagram-views-pkg-500':
    'For a Reel stuck at a few hundred views that you want to look active.',
  'buy-instagram-views-pkg-1k':
    'Our most popular choice — a solid start for a launch Reel or a post you are promoting.',
  'buy-instagram-views-pkg-5k':
    'For Reels that already perform reasonably well and need a bigger count to match.',
  'buy-instagram-views-pkg-10k':
    'For campaign or brand Reels. Consider gradual delivery so the count rises over a longer period.',
};

export function applyInstagramViewsAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Instagram Views From NovaLikes?',
        description:
          'We have run Instagram growth services for 7–8 years — first on earlier sites, then as ViralMe, and now as NovaLikes. Every views order comes with the same four things: a clear start time, a choice of fast or gradual delivery, a 6-month refill and a real person on WhatsApp if something looks wrong.',
        items: [
          {
            id: 'buy-instagram-views-0',
            title: 'Starts in 6–8 Hours',
            description:
              'Most Instagram views orders start within 6–8 hours of payment and finish 4–6 hours after that, so a new Reel gets its views quickly.',
            icon: 'truck',
          },
          {
            id: 'buy-instagram-views-1',
            title: 'Fast or Gradual — Your Choice',
            description:
              'Want the count to rise slowly instead? Add a note at checkout or message us on WhatsApp and we will spread the views over a longer period.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-views-2',
            title: '6-Month Refill',
            description:
              'If the view count on your Reel drops within 6 months of delivery, send us your order ID on WhatsApp and we will top it back up.',
            icon: 'shield-check',
          },
          {
            id: 'buy-instagram-views-3',
            title: 'No Password, Ever',
            description:
              'We only need the public link to your Reel or video. Your Instagram login stays with you, and you can track the order with your order ID and email.',
            icon: 'lock',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy views for any public Instagram Reel or video post. Pick a package, paste the link to that Reel or video and pay in US dollars. The views are added to that one piece of content — they raise its view count, not your follower count.',
        cards: [
          {
            id: 'buy-instagram-views-4',
            title: 'What Changes',
            description:
              'The view count on the Reel or video you submit goes up by the number of views in your package. Nothing else on your profile is touched.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-instagram-views-5',
            title: 'What You Need',
            description:
              'The public link to the Reel or video (copy it from the share menu) and a package. You never give us your Instagram password or log in anywhere.',
            icon: 'briefcase',
          },
          {
            id: 'buy-instagram-views-6',
            title: 'What It Will Not Do',
            description:
              'Views do not add likes, comments, followers or sales by themselves, and they do not force Instagram to show your Reel to more people. They make the view count higher — that is what we promise.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'Tip: paste the link to the exact Reel, not your profile. An order cannot start on a profile link, a private Reel or a deleted Reel.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Instagram Views Help Your Reel Reach More People?',
        description:
          'Honest answer: sometimes a little, never on their own. Instagram decides how far a Reel travels mainly from how real viewers react — how long they watch, whether they replay, share, save or follow. A higher view count is social proof: people who land on the Reel can see that others have watched it. It is not a ranking signal you can buy.',
        helpTitle: 'Where views can help',
        helpItems: [
          'Launch posts: a new Reel with a few hundred views looks less empty to the first real visitors.',
          'Ads and promotions: a Reel you are about to promote does not start from zero.',
          'A consistent profile: when one Reel has 30,000 views and the next has 300, a top-up makes the grid look less uneven.',
        ],
        limitTitle: 'What views will not do',
        limitItems: [
          'Add watch time, shares or saves — those come only from real viewers.',
          'Promise a place on Explore or the Reels tab.',
          'Replace good content: a Reel people swipe past in two seconds will still be shown to fewer people.',
        ],
        closingNote:
          'Want to understand how Instagram counts and ranks Reels? Our Learn Center guides on how Reels views are counted and how the Instagram algorithm works explain it step by step.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'Here is what happens after you pay, and how long each step usually takes.',
        steps: [
          {
            id: 'buy-instagram-views-th-1',
            title: 'We Check Your Link',
            description:
              'The order is matched to the Reel or video link you submitted. If you notice a mistake in the link, message us on WhatsApp with your order ID straight away so it can be corrected before delivery starts.',
          },
          {
            id: 'buy-instagram-views-th-2',
            title: 'Delivery Starts Within 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. If you asked for gradual delivery in your note, the views are spread out over a longer period instead.',
          },
          {
            id: 'buy-instagram-views-th-3',
            title: 'Most Orders Finish in 4–6 Hours',
            description:
              'Once started, standard delivery is usually complete within 4–6 hours. Gradual orders take longer by design.',
          },
          {
            id: 'buy-instagram-views-th-4',
            title: 'Track It — Then You Are Covered',
            description:
              'Follow progress on the Track Order page. When delivery is complete, your 6-month refill period starts: if the count drops, message us on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the Reel public and do not delete it until delivery is complete. After that you can make your account private again.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Two minutes of checking prevents most problems. Before you pay, confirm the five points below.',
        framingNote:
          'Prices are in US dollars. If you pay in pounds, euros or another currency, your bank converts the amount at its own rate.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Reels, Videos and How Instagram Counts a View',
        description:
          'Instagram now reports one “Views” number for Reels and video posts. For Reels, a view is counted when the Reel starts playing, and replays can count again — so the view count is usually higher than the number of people who watched.',
        eyebrow: 'Know what you are buying',
        closingNote:
          'For the full explanation, read our Learn Center guide on how Instagram Reels views are counted.',
        cards: [
          {
            id: 'buy-instagram-views-12',
            title: 'Reels',
            description:
              'Most customers order views for Reels. Copy the Reel link (instagram.com/reel/…) from the share menu.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-instagram-views-13',
            title: 'Video Posts',
            description:
              'Feed video posts also show a view count. Use the post link (instagram.com/p/…) for those.',
            icon: 'sparkles',
          },
          {
            id: 'buy-instagram-views-14',
            title: 'Views vs Reach',
            description:
              'Views count plays; reach counts the unique accounts that saw your content. Read your Insights with that difference in mind.',
            icon: 'users',
          },
          {
            id: 'buy-instagram-views-15',
            title: 'Stories Are Separate',
            description:
              'Story views are a different metric and are not part of this service.',
            icon: 'heart',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'A simple rule: choose a package that is a sensible step up from what the Reel already has. A jump from 50 views to 25,000 looks odd; a jump from 300 to 1,000 does not.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'From the orders we have handled over the years, most people buy views for a few practical reasons. None of them is “to go viral” — views do not do that on their own.',
      items: [
        {
          id: 'buy-instagram-views-wb-1',
          title: 'A New Reel Looks Empty',
          description:
            'The first people who see a Reel with 12 views often scroll past. A starting count makes new content look less abandoned.',
        },
        {
          id: 'buy-instagram-views-wb-2',
          title: 'Product and Launch Videos',
          description:
            'Small businesses add views to product demos and launch Reels that they also share on their website, WhatsApp or ads.',
        },
        {
          id: 'buy-instagram-views-wb-3',
          title: 'An Uneven Grid',
          description:
            'When one Reel has 30,000 views and the next has 300, some creators top up the lower ones so the profile looks consistent.',
        },
        {
          id: 'buy-instagram-views-wb-4',
          title: 'Before Running Ads',
          description:
            'Some customers add a small package to a Reel before promoting it with paid ads, so the ad does not start from zero.',
        },
        {
          id: 'buy-instagram-views-wb-5',
          title: 'Keeping Expectations Realistic',
          description:
            'Views change one number. Likes, comments, follows and sales still depend on the Reel itself and the people who watch it.',
        },
      ],
      bottomNote:
        'If what you actually want is more profile followers, likes on a post or comments, those are separate services — compare the options below.',
    },
  };
}
