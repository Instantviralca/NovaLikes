import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Facebook Page Likes — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages. This page deliberately tells visitors to check whether their
 * Page still shows a like count, because newer Facebook Pages show followers and Meta
 * reports follows instead of Page Likes (Page Likes metric removed from Meta's API in
 * November 2025). Wording mirrors the Learn article
 * facebook-followers-vs-page-likes-vs-post-likes.
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-facebook-page-likes.json.
 *
 * Facts used here (keep in sync if they change): delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request,
 * 6-month refill from delivery date, prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'fb-pl-100':
    'For small or new Pages, or to test the service first.',
  'fb-pl-500':
    'For local business Pages that want to look established to new customers.',
  'fb-pl-1000':
    'Our most popular package — fits active Pages that post regularly.',
  'fb-pl-5000':
    'For larger brand Pages with steady engagement. Gradual delivery recommended.',
  'fb-pl-10000':
    'For big, established Pages. Ask for gradual delivery over several days.',
};

export function applyFacebookPageLikesAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Facebook Page Likes From NovaLikes?',
        description:
          'We have handled social media orders for 7–8 years — on earlier sites, as ViralMe and now as NovaLikes — and we would rather you buy the right service than the wrong one. That is why this page starts with an honest check.',
        items: [
          {
            id: 'buy-facebook-page-likes-0',
            title: 'Honest Advice First',
            description:
              'Facebook now puts followers first on most Pages. We tell you how to check which number your Page shows, so you only pay for the one visitors see.',
            icon: 'shield-check',
          },
          {
            id: 'buy-facebook-page-likes-1',
            title: 'Starts in 6–8 Hours',
            description:
              'Most Page Likes orders start within 6–8 hours of payment and finish 4–6 hours after starting.',
            icon: 'truck',
          },
          {
            id: 'buy-facebook-page-likes-2',
            title: 'Gradual on Request',
            description:
              'Prefer a slower rise? Ask in the checkout note or on WhatsApp and we spread the order over a longer period.',
            icon: 'sparkles',
          },
          {
            id: 'buy-facebook-page-likes-3',
            title: '6-Month Refill',
            description:
              'If the count drops within 6 months of delivery, send your order ID on WhatsApp and we top it back up.',
            icon: 'heart',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy Page Likes for a public Facebook Page by pasting the Page link, choosing a package and paying in US dollars. Before you do, check your Page: if it shows a follower count rather than a like count, Facebook Followers is the better buy.',
        cards: [
          {
            id: 'buy-facebook-page-likes-4',
            title: 'For Facebook Pages Only',
            description:
              'Page Likes apply to a Facebook Page, not to a personal profile and not to a single post.',
            icon: 'briefcase',
          },
          {
            id: 'buy-facebook-page-likes-5',
            title: 'Check Your Page First',
            description:
              'Open your Page as a visitor. If you see “likes” near the name, this service fits. If you only see “followers”, choose Facebook Followers instead.',
            icon: 'map-pin',
          },
          {
            id: 'buy-facebook-page-likes-6',
            title: 'What We Need',
            description:
              'The public Page link (facebook.com/yourpage). Never your password, and never admin access to the Page.',
            icon: 'lock',
          },
        ],
        closingNote:
          'Still unsure which number your Page shows? Send us the Page link on WhatsApp before ordering and we will tell you which service to choose.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Are Facebook Page Likes Still Worth Buying?',
        description:
          'For some Pages, yes — for many, followers matter more. Facebook has been moving Pages from likes to followers for several years. On the newer Page experience the follower count is the headline number, and Meta now reports follows instead of Page Likes in Meta Business Suite. Page Likes still make sense where your Page still displays them.',
        helpTitle: 'When Page Likes make sense',
        helpItems: [
          'Older Pages that still show a like count prominently to visitors.',
          'Pages where you have checked that the like count is the number customers see.',
          'Keeping an existing like count in line with the rest of the Page.',
        ],
        limitTitle: 'When to choose something else',
        limitItems: [
          'Your Page shows followers, not likes — choose Facebook Followers.',
          'You want reactions on one post — choose Facebook Post Likes.',
          'You want more reach: neither likes nor followers make Facebook show posts to more people on their own.',
        ],
        closingNote:
          'Our Learn Center guide comparing Facebook followers, Page Likes and Post Likes explains how each metric works on today’s Pages.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'What happens after you pay for Facebook Page Likes.',
        steps: [
          {
            id: 'buy-facebook-page-likes-th-1',
            title: 'Page Link Attached',
            description:
              'Your Page link is tied to your order ID. If you notice a mistake, message us on WhatsApp before delivery starts.',
          },
          {
            id: 'buy-facebook-page-likes-th-2',
            title: 'Delivery Starts in 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. If you asked for a gradual pace, delivery is spread over a longer stretch.',
          },
          {
            id: 'buy-facebook-page-likes-th-3',
            title: 'Most Orders Finish in 4–6 Hours',
            description:
              'Once started, a standard order usually completes within 4–6 hours. Follow it on the Track Order page.',
          },
          {
            id: 'buy-facebook-page-likes-th-4',
            title: 'Refill Window Opens',
            description:
              'Your 6-month refill starts on the day delivery finishes. If the count drops, send your order ID on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the Page published and public, and do not change its username or URL during the order or the 6-month refill period.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'With Page Likes, the most important check is whether your Page shows likes at all. After that, run through these five points.',
        framingNote:
          'Prices are in US dollars. Your bank converts the amount if you pay in another currency.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'How to Check Whether Your Page Shows Likes or Followers',
        description:
          'Facebook Pages do not all look the same. A one-minute check tells you which number visitors see on your Page — and which service to order.',
        eyebrow: 'Check before you buy',
        closingNote:
          'Not sure after checking? Send the Page link on WhatsApp and we will look for you.',
        cards: [
          {
            id: 'buy-facebook-page-likes-12',
            title: 'View as a Visitor',
            description:
              'Log out or open the Page in a private browser window. That is exactly what customers see.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-page-likes-13',
            title: 'Look Under the Page Name',
            description:
              'The count under the Page name says either “likes” or “followers”. That word decides the service.',
            icon: 'map-pin',
          },
          {
            id: 'buy-facebook-page-likes-14',
            title: 'Shows Likes',
            description:
              'If visitors see a like count, this Page Likes service changes the number they see.',
            icon: 'heart',
          },
          {
            id: 'buy-facebook-page-likes-15',
            title: 'Shows Followers',
            description:
              'If visitors see only followers, order Facebook Followers instead — Page Likes would not change the visible number.',
            icon: 'sparkles',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Keep the new total believable for the size and activity of your Page. A local Page with 200 likes looks natural at a few hundred more; one jumping to 10,000 overnight does not.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'Customers who still choose Page Likes usually have one of these reasons — and they have checked that their Page shows the like count.',
      items: [
        {
          id: 'buy-facebook-page-likes-wb-1',
          title: 'An Older Page That Shows Likes',
          description:
            'Some long-running Pages still display a like count. Owners keep that number in line with how established the business really is.',
        },
        {
          id: 'buy-facebook-page-likes-wb-2',
          title: 'A Like Count That Looks Low',
          description:
            'A Page with years of posts but only a few dozen likes can make visitors think the business is inactive.',
        },
        {
          id: 'buy-facebook-page-likes-wb-3',
          title: 'Before a Promotion',
          description:
            'Some customers top up the like count before running ads or a local promotion that sends people to the Page.',
        },
        {
          id: 'buy-facebook-page-likes-wb-4',
          title: 'Matching Other Platforms',
          description:
            'Businesses with a strong Instagram or Google presence sometimes bring their Facebook Page up to a similar level.',
        },
        {
          id: 'buy-facebook-page-likes-wb-5',
          title: 'Knowing the Limits',
          description:
            'Page Likes change one number. Reach, messages and sales still depend on your posts and how people respond to them.',
        },
      ],
      bottomNote:
        'If your Page shows followers, or you want reactions on a specific post, compare Facebook Followers and Facebook Post Likes below.',
    },
  };
}
