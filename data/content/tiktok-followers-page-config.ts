import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy TikTok Followers — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → LIVE / Creator Rewards / username, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-tiktok-followers.json.
 *
 * Facts used here (keep in sync if they change): delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request
 * (checkout note or WhatsApp), 6-month refill from delivery date, prices in USD.
 * LIVE / Creator Rewards wording mirrors the Learn articles
 * how-many-followers-to-go-live-on-tiktok and buying-tiktok-followers-fyp-account-safety.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'tt-f-100':
    'For new accounts, or to try the service before a larger order.',
  'tt-f-500':
    'For creators with a handful of videos who want the profile to look less new.',
  'tt-f-1000':
    'Our most popular package — fits accounts already getting a few thousand views per video.',
  'tt-f-5000':
    'For established creators and brands with steady views. Gradual delivery is a good idea.',
  'tt-f-10000':
    'For large brand accounts. Ask for gradual delivery so the count rises over several days.',
};

export function applyTiktokFollowersAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy TikTok Followers From NovaLikes?',
        description:
          'Our team has handled social media orders for 7–8 years, first on earlier sites, then as ViralMe and now as NovaLikes. A TikTok followers order with us comes with four clear terms.',
        items: [
          {
            id: 'buy-tiktok-followers-0',
            title: 'Username Only',
            description:
              'We only need your public TikTok username. No password, no login link, no app to install.',
            icon: 'lock',
          },
          {
            id: 'buy-tiktok-followers-1',
            title: 'Starts in 6–8 Hours',
            description:
              'Most follower orders start within 6–8 hours of payment and finish 4–6 hours after that.',
            icon: 'truck',
          },
          {
            id: 'buy-tiktok-followers-2',
            title: 'Gradual on Request',
            description:
              'Want your follower count to rise slowly? Ask for gradual delivery in the checkout note or on WhatsApp before the order starts.',
            icon: 'sparkles',
          },
          {
            id: 'buy-tiktok-followers-3',
            title: '6-Month Refill',
            description:
              'If your follower count drops within 6 months of delivery, message us your order ID on WhatsApp and we top it back up.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy followers for any public TikTok account. Choose a package, enter your username (without the @) and pay in US dollars. The followers are added to your profile’s follower count — your existing videos stay exactly as they are.',
        cards: [
          {
            id: 'buy-tiktok-followers-4',
            title: 'What Changes',
            description:
              'The follower number on your TikTok profile goes up by the package amount. Likes and views on your videos do not change.',
            icon: 'users',
          },
          {
            id: 'buy-tiktok-followers-5',
            title: 'Who the Followers Are',
            description:
              'Followers come from realistic-looking accounts. We do not claim they are active people who will watch, like or comment on your videos.',
            icon: 'heart',
          },
          {
            id: 'buy-tiktok-followers-6',
            title: 'What It Will Not Do',
            description:
              'Followers do not put your videos on the For You page. TikTok decides that mainly from how viewers react to each video.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'Double-check the spelling of your username before you pay. An order cannot start on a private account or a username that has changed.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought TikTok Followers Help You Grow?',
        description:
          'They can help with how your profile looks, not with how TikTok ranks your videos. The For You feed works video by video: TikTok tests each video with viewers and pushes it further when people watch to the end, rewatch, share and follow. A bigger follower count makes a profile look established to someone who taps on it — that is the real, limited benefit.',
        helpTitle: 'Where a higher count helps',
        helpItems: [
          'New creators and brands whose profile looks empty to people arriving from a video.',
          'Businesses linking to TikTok from their website, where visitors judge the profile at a glance.',
          'Accounts pitching to brands or partners, alongside real views and engagement.',
        ],
        limitTitle: 'Where it does not',
        limitItems: [
          'Getting videos onto the For You page — that depends on how viewers react to each video.',
          'Creator Rewards: TikTok’s rules prohibit inflating follower counts, so never buy followers to qualify.',
          'A follower count far above your usual views can make the profile look less credible, not more.',
        ],
        closingNote:
          'Our Learn Center guide on buying TikTok followers, the For You page and account safety covers the risks and limits in more detail.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'What happens between checkout and a finished TikTok followers order.',
        steps: [
          {
            id: 'buy-tiktok-followers-th-1',
            title: 'Username Matched to Your Order',
            description:
              'Your order ID and the username you entered are linked. Spot a typo? Message us on WhatsApp straight away so we can fix it before delivery starts.',
          },
          {
            id: 'buy-tiktok-followers-th-2',
            title: 'Followers Start in 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. If you asked for a gradual pace, followers are added over a longer period instead.',
          },
          {
            id: 'buy-tiktok-followers-th-3',
            title: 'Standard Orders Finish in 4–6 Hours',
            description:
              'Once started, a standard order usually completes within 4–6 hours. Follow progress on the Track Order page.',
          },
          {
            id: 'buy-tiktok-followers-th-4',
            title: 'Refill Window Opens',
            description:
              'Your 6-month refill period starts the day delivery finishes. If the count drops, send your order ID on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the account public until delivery finishes; you can switch it back to private afterwards. Do not change your username during delivery or the 6-month refill period.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Nearly every stuck order comes down to the username or a private account. Run through these five checks first.',
        framingNote:
          'Prices are in US dollars. Paying in another currency? Your bank converts the amount at its own rate.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'TikTok LIVE, Creator Rewards and Your Username',
        description:
          'Many people ask whether followers unlock TikTok features. Here is the honest picture, plus the profile details that keep an order running smoothly.',
        eyebrow: 'Before you order',
        closingNote:
          'For the full picture on LIVE thresholds, read our Learn Center guide on how many followers you need to go live on TikTok.',
        cards: [
          {
            id: 'buy-tiktok-followers-12',
            title: 'TikTok LIVE',
            description:
              'Around 1,000 followers is the commonly quoted LIVE benchmark, but TikTok sets the threshold by region and checks other factors, so a follower count alone is not a guaranteed unlock.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-tiktok-followers-13',
            title: 'Creator Rewards',
            description:
              'TikTok’s Creator Rewards rules forbid inflating follower counts. If you plan to join, grow the account organically instead.',
            icon: 'briefcase',
          },
          {
            id: 'buy-tiktok-followers-14',
            title: 'Keep the Same Username',
            description:
              'Orders and refills are tied to the username you entered. If you must change it, tell us the old and new usernames on WhatsApp first.',
            icon: 'map-pin',
          },
          {
            id: 'buy-tiktok-followers-15',
            title: 'Public Until Delivered',
            description:
              'A private account blocks delivery. Make it public for the order, then switch back once delivery is complete.',
            icon: 'lock',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Pick a size that fits your views. An account whose videos get 200–500 views looks natural with a few hundred extra followers; one jumping to 10,000 followers with 50 views per video does not.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'These are the reasons we hear most often from TikTok customers. None of them is “to go viral” — followers do not do that on their own.',
      items: [
        {
          id: 'buy-tiktok-followers-wb-1',
          title: 'A New Account Looks Empty',
          description:
            'When a video does well, viewers tap the profile. A starting follower count makes a new account look less like a test account.',
        },
        {
          id: 'buy-tiktok-followers-wb-2',
          title: 'Business and Shop Profiles',
          description:
            'Brands that link to TikTok from their website or packaging want the profile to look active when customers check it.',
        },
        {
          id: 'buy-tiktok-followers-wb-3',
          title: 'Moving From Another Platform',
          description:
            'Creators with an audience on Instagram or YouTube sometimes give a fresh TikTok account a starting count while their fans move over.',
        },
        {
          id: 'buy-tiktok-followers-wb-4',
          title: 'Matching Your Views',
          description:
            'Accounts with good views but few followers add a modest number so the profile matches how the videos perform.',
        },
        {
          id: 'buy-tiktok-followers-wb-5',
          title: 'Knowing the Limits',
          description:
            'Followers change one number. Views, likes and For You reach still come from the videos you post.',
        },
      ],
      bottomNote:
        'If you want more likes or views on a specific video instead, those are separate services — compare them below.',
    },
  };
}
