import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Facebook Post Likes — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → which posts can get likes, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-facebook-post-likes.json.
 *
 * Facts used here (keep in sync if they change): public posts from Pages and from
 * personal profiles (audience must be Public); Like reaction by default, Love or other
 * reactions on request via checkout note/WhatsApp; delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request,
 * 6-month refill from delivery date, prices in USD.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'fb-post-100':
    'For posts on small Pages and personal profiles, or to test the service first.',
  'fb-post-500':
    'For local business Pages and active profiles that want a post to look popular.',
  'fb-post-1000':
    'Our most popular package — fits announcements, offers and events on established Pages.',
  'fb-post-5000':
    'For large Pages and posts you are boosting with ads. Gradual delivery recommended.',
  'fb-post-10000':
    'For big brand Pages and campaign posts. Spread delivery over a longer period.',
};

export function applyFacebookPostLikesAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Facebook Post Likes From NovaLikes?',
        description:
          'Our team has handled social media orders for 7–8 years, first on earlier sites, then as ViralMe and now as NovaLikes. A Facebook Post Likes order with us is simple: one post, a known start time and a refill if the count drops.',
        items: [
          {
            id: 'buy-facebook-post-likes-0',
            title: 'Pages and Profiles',
            description:
              'Likes can go on a public post from a Facebook Page or from a personal profile, as long as the post audience is set to Public.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-post-likes-1',
            title: 'Like by Default, Other Reactions on Request',
            description:
              'Orders are delivered as the standard Like reaction. Want Love or another reaction instead? Ask in the checkout note.',
            icon: 'heart',
          },
          {
            id: 'buy-facebook-post-likes-2',
            title: 'Starts in 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment and finish 4–6 hours later. Gradual delivery is available on request.',
            icon: 'truck',
          },
          {
            id: 'buy-facebook-post-likes-3',
            title: '6-Month Refill',
            description:
              'If the reaction count on that post drops within 6 months of delivery, send your order ID on WhatsApp and we top it up.',
            icon: 'shield-check',
          },
        ],
      },
      canYouBuy: {
        ...config.canYouBuy,
        description:
          'Yes. You can buy likes for any public Facebook post — from a Page or from a personal profile. Copy the post link, choose a package and pay in US dollars. The reaction count under that post goes up; your followers and Page numbers stay the same.',
        cards: [
          {
            id: 'buy-facebook-post-likes-4',
            title: 'One Post per Order',
            description:
              'Likes are added to the post in the link you send. Want likes on several posts? Place one order per post.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-facebook-post-likes-5',
            title: 'How to Get the Link',
            description:
              'On the post, tap Share and choose Copy link, or click the post’s time stamp and copy the address. Never send your password.',
            icon: 'briefcase',
          },
          {
            id: 'buy-facebook-post-likes-6',
            title: 'Audience Must Be Public',
            description:
              'Posts shared with Friends or a custom list cannot receive an order. Check for the globe icon next to the post date.',
            icon: 'lock',
          },
        ],
        closingNote:
          'Likes come from realistic-looking accounts. We do not claim they are active people who will comment on or share the post.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Post Likes Help a Facebook Post?',
        description:
          'They help how a post looks, not how far it travels on its own. Facebook ranks posts mainly on how people engage — comments, shares, reactions from friends and time spent. A healthy reaction count is social proof: people are more likely to stop on a post that others have already reacted to, and that is the honest benefit.',
        helpTitle: 'Where post likes help',
        helpItems: [
          'Offers, events and announcements that should look popular from the first hour.',
          'Posts you plan to boost, so paid viewers do not land on a post with two reactions.',
          'Product or service posts that customers see before contacting your business.',
        ],
        limitTitle: 'Where they do not',
        limitItems: [
          'Reach on their own — comments and shares carry much more weight than likes alone.',
          'A post with 3,000 likes on a Page with 200 followers looks unnatural. Stay in proportion.',
          'Turning a weak post into a good one: the content still decides whether people engage.',
        ],
        closingNote:
          'Our Learn Center guide on how to get more likes on a Facebook post covers organic ways to grow reactions alongside any package.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'What happens after you pay for Facebook Post Likes.',
        steps: [
          {
            id: 'buy-facebook-post-likes-th-1',
            title: 'Post Link and Note Checked',
            description:
              'Your post link and any note — for example a different reaction or a gradual pace — are attached to your order before delivery starts.',
          },
          {
            id: 'buy-facebook-post-likes-th-2',
            title: 'Likes Start Within 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. Gradual orders start in the same window but spread the reactions out.',
          },
          {
            id: 'buy-facebook-post-likes-th-3',
            title: 'Standard Delivery in 4–6 Hours',
            description:
              'Once started, most orders finish within 4–6 hours. Follow progress on the Track Order page.',
          },
          {
            id: 'buy-facebook-post-likes-th-4',
            title: '6-Month Refill Starts',
            description:
              'Refill cover begins the day delivery finishes. If the count drops, send your order ID on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the post public and do not delete it or change its audience until delivery is complete, or during the refill period.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Most problems come from the post link or its audience setting. Check these five points before you pay.',
        framingNote:
          'Prices are in US dollars. If you want a reaction other than Like, write it in the checkout note.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Which Facebook Posts Can Get Likes',
        description:
          'Any public post can receive likes. What matters is where it was posted and who it is shared with.',
        eyebrow: 'Before you order',
        closingNote:
          'Not sure your post is public? Send the link on WhatsApp before ordering and we will check it.',
        cards: [
          {
            id: 'buy-facebook-post-likes-12',
            title: 'Page Posts',
            description:
              'Posts on a Facebook Page are public by default. Copy the link from the post and you are ready to order.',
            icon: 'briefcase',
          },
          {
            id: 'buy-facebook-post-likes-13',
            title: 'Profile Posts',
            description:
              'Posts on a personal profile must have the audience set to Public. Change it from the post’s three-dot menu if needed.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-post-likes-14',
            title: 'Photos and Videos',
            description:
              'Photo and video posts work the same way. Use the link to the post itself, not to your profile or Page.',
            icon: 'clapperboard',
          },
          {
            id: 'buy-facebook-post-likes-15',
            title: 'Reactions on Request',
            description:
              'Delivery uses the Like reaction by default. Write “Love” or another reaction in the checkout note if you prefer.',
            icon: 'heart',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Pick a size that fits your audience. A post on a Page with a few hundred followers looks natural with 100–500 likes; thousands of likes there would look out of place.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'These are the reasons customers give for Facebook Post Likes — all about how one post looks to the people who see it.',
      items: [
        {
          id: 'buy-facebook-post-likes-wb-1',
          title: 'Offers and Sales',
          description:
            'Businesses add likes to sale and offer posts so customers see that others are interested too.',
        },
        {
          id: 'buy-facebook-post-likes-wb-2',
          title: 'Events and Announcements',
          description:
            'Event and announcement posts only matter for a few days, so they need to look active quickly.',
        },
        {
          id: 'buy-facebook-post-likes-wb-3',
          title: 'Before Boosting',
          description:
            'A post with a few reactions makes a better first impression when you start paying to boost it.',
        },
        {
          id: 'buy-facebook-post-likes-wb-4',
          title: 'Milestone Posts',
          description:
            'Openings, anniversaries and launches are shared widely — owners want them to look celebrated.',
        },
        {
          id: 'buy-facebook-post-likes-wb-5',
          title: 'Keeping It Real',
          description:
            'Likes change one number. Comments, shares, messages and sales still depend on the post and your audience.',
        },
      ],
      bottomNote:
        'Want a bigger Page or profile instead of likes on one post? Compare Facebook Followers below.',
    },
  };
}
