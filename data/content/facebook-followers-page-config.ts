import type { DummyAuthorityPage } from '@/data/content/dummy-service-authority-config';

/**
 * Buy Facebook Followers — unique page copy.
 *
 * Replaces the shared template wording for the sections that were near-identical
 * across service pages (Why Choose, Can You Buy, Does Buying Help, What Happens,
 * Worldwide → followers vs Page Likes on today's Pages, package guidance, Why Buy).
 * Section ids, icons and array lengths stay aligned with the locale overlays in
 * content/locales/<locale>/services/buy-facebook-followers.json.
 *
 * Facts used here (keep in sync if they change): followers can go to Pages and to
 * personal profiles with public followers on; delivery starts within 6–8 hours,
 * standard delivery completes 4–6 hours after start, gradual delivery on request,
 * 6-month refill from delivery date, prices in USD. Page Likes wording mirrors the
 * Learn article facebook-followers-vs-page-likes-vs-post-likes.
 */

const PACKAGE_GUIDANCE: Record<string, string> = {
  'fb-f-100':
    'For brand-new Pages and profiles, or to try the service first.',
  'fb-f-500':
    'For small business and local Pages that want to look established to new customers.',
  'fb-f-1000':
    'Our most popular package — fits active Pages and creators already posting regularly.',
  'fb-f-5000':
    'For growing brands and public figures with steady post engagement. Gradual delivery is a good idea.',
  'fb-f-10000':
    'For large brand Pages. Ask for gradual delivery so the count rises over several days.',
};

export function applyFacebookFollowersAuthorityCopy(base: DummyAuthorityPage): DummyAuthorityPage {
  const config = base.config;
  return {
    ...base,
    config: {
      ...config,
      whyChoose: {
        ...config.whyChoose,
        title: 'Why Buy Facebook Followers From NovaLikes?',
        description:
          'Our team has handled social media orders for 7–8 years, first on earlier sites, then as ViralMe and now as NovaLikes. For Facebook followers, that means a few clear terms instead of vague promises.',
        items: [
          {
            id: 'buy-facebook-followers-0',
            title: 'Pages and Profiles',
            description:
              'Followers can go to a public Facebook Page or to a personal profile that allows public followers. Send the link and we do the rest.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-followers-1',
            title: 'Starts in 6–8 Hours',
            description:
              'Most Facebook follower orders start within 6–8 hours of payment and finish 4–6 hours after starting.',
            icon: 'truck',
          },
          {
            id: 'buy-facebook-followers-2',
            title: 'Gradual on Request',
            description:
              'Want the count to rise slowly? Ask in the checkout note or on WhatsApp and we spread the followers over a longer period.',
            icon: 'sparkles',
          },
          {
            id: 'buy-facebook-followers-3',
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
          'Yes. You can buy followers for a public Facebook Page or for a personal profile that has public followers turned on. Paste the Page or profile link, choose a package and pay in US dollars. Only the follower count changes — your posts, Page Likes and post reactions stay as they are.',
        cards: [
          {
            id: 'buy-facebook-followers-4',
            title: 'What Changes',
            description:
              'The follower number shown on the Page or profile goes up by the package amount. Followers can then see your public posts in their feed.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-followers-5',
            title: 'What We Need',
            description:
              'The public link to the Page or profile (facebook.com/yourpage). We never ask for your Facebook password or admin access.',
            icon: 'lock',
          },
          {
            id: 'buy-facebook-followers-6',
            title: 'Who the Followers Are',
            description:
              'Followers come from realistic-looking accounts. We do not claim they are active people who will comment on, react to or share your posts.',
            icon: 'megaphone',
          },
        ],
        closingNote:
          'For a personal profile, set “Who can follow me” to Public in Settings & privacy → Followers and public content before ordering, or the order cannot start.',
      },
      doesBuyingHelp: {
        ...config.doesBuyingHelp,
        title: 'Do Bought Followers Help a Facebook Page?',
        description:
          'They help with trust at first glance, not with reach. Facebook decides who sees each post mainly from how people interact with it — reactions, comments, shares and time spent. A Page or profile with a solid follower count simply looks more established to a visitor deciding whether to trust a business, a creator or a new brand.',
        helpTitle: 'Where followers help',
        helpItems: [
          'New business Pages that customers check before calling, booking or buying.',
          'Creators and public figures switching to professional mode who start with a small audience.',
          'Pages linked from your website, Google profile or ads, where visitors judge the number instantly.',
        ],
        limitTitle: 'Where they do not',
        limitItems: [
          'Organic reach: followers who never interact do not make Facebook show your posts to more people.',
          'Facebook monetisation tools, which look at real engagement and follow their own eligibility rules.',
          'A Page with 10,000 followers and no reactions on any post can look less credible, not more.',
        ],
        closingNote:
          'Our Learn Center guide on how Facebook Page reach works explains what actually moves your posts into more feeds.',
      },
      whatHappens: {
        ...config.whatHappens,
        description: 'Here is what happens after you pay for Facebook followers.',
        steps: [
          {
            id: 'buy-facebook-followers-th-1',
            title: 'Your Link Is Matched',
            description:
              'The Page or profile link you submitted is tied to your order ID. If you notice a wrong link, message us on WhatsApp before delivery starts.',
          },
          {
            id: 'buy-facebook-followers-th-2',
            title: 'Followers Start in 6–8 Hours',
            description:
              'Most orders start within 6–8 hours of payment. If you asked for a slower pace, followers are added over a longer period.',
          },
          {
            id: 'buy-facebook-followers-th-3',
            title: 'Most Orders Finish in 4–6 Hours',
            description:
              'Once started, a standard order is usually complete within 4–6 hours. You can follow progress on the Track Order page.',
          },
          {
            id: 'buy-facebook-followers-th-4',
            title: 'Refill Cover Begins',
            description:
              'Your 6-month refill starts on the day delivery finishes. If the count drops, send your order ID on WhatsApp.',
          },
        ],
        closingNote:
          'Keep the Page published and the profile’s followers setting on Public until delivery finishes, and do not change the Page username or URL during the order or the refill period.',
      },
      beforeBuying: {
        ...config.beforeBuying,
        description:
          'Most stuck orders come from the link or a privacy setting. Run through these five checks first.',
        framingNote:
          'Prices are in US dollars. Your bank converts the amount if you pay in another currency.',
      },
      worldwide: {
        ...config.worldwide,
        title: 'Followers, Page Likes and Today’s Facebook Pages',
        description:
          'Facebook has moved Pages towards followers. On the newer Page experience the follower count is the main public number, and Meta now reports follows instead of Page Likes in Meta Business Suite.',
        eyebrow: 'Pick the right metric',
        closingNote:
          'For a side-by-side explanation, read our Learn Center guide comparing Facebook followers, Page Likes and Post Likes.',
        cards: [
          {
            id: 'buy-facebook-followers-12',
            title: 'Newer Pages Show Followers',
            description:
              'If your Page shows a follower count near its name, followers are the number visitors see. This is the right service for you.',
            icon: 'users',
          },
          {
            id: 'buy-facebook-followers-13',
            title: 'Personal Profiles',
            description:
              'Profiles show followers once “Who can follow me” is set to Public. Professional mode makes the follower count more prominent.',
            icon: 'heart',
          },
          {
            id: 'buy-facebook-followers-14',
            title: 'Older Page Layouts',
            description:
              'Some older Pages still display Page Likes. If that is the number on your Page, compare our Facebook Page Likes service.',
            icon: 'briefcase',
          },
          {
            id: 'buy-facebook-followers-15',
            title: 'Posts Are Separate',
            description:
              'Reactions on a single post are counted separately. For those, use Facebook Post Likes with the post link.',
            icon: 'clapperboard',
          },
        ],
      },
      packageSizes: {
        ...config.packageSizes,
        description:
          'Match the package to the size and activity of the Page. A local business Page with 150 followers looks natural at a few hundred more; one jumping to 10,000 with no post activity does not.',
        rows: config.packageSizes.rows.map((row) => ({
          ...row,
          recommendedFor: PACKAGE_GUIDANCE[row.id] ?? row.recommendedFor,
        })),
      },
    },
    whyBuy: {
      ...base.whyBuy,
      description:
        'These are the reasons Facebook customers give us most often — all about how a Page or profile looks to the people deciding whether to trust it.',
      items: [
        {
          id: 'buy-facebook-followers-wb-1',
          title: 'A New Business Page',
          description:
            'Customers often check a business’s Facebook Page before they call or book. A Page with a handful of followers can look closed or new.',
        },
        {
          id: 'buy-facebook-followers-wb-2',
          title: 'Switching to Professional Mode',
          description:
            'Creators who turn on professional mode start with few public followers. A starting count makes the profile look ready for new visitors.',
        },
        {
          id: 'buy-facebook-followers-wb-3',
          title: 'Moving to a New Page',
          description:
            'Businesses that rebrand or create a fresh Page sometimes give it a starting count while existing customers move across.',
        },
        {
          id: 'buy-facebook-followers-wb-4',
          title: 'Before Running Ads',
          description:
            'Some customers add followers before advertising, so people who tap through from an ad land on a Page that looks established.',
        },
        {
          id: 'buy-facebook-followers-wb-5',
          title: 'Keeping It Real',
          description:
            'Followers change one number. Reach, messages and sales still come from your posts and how people respond to them.',
        },
      ],
      bottomNote:
        'Need reactions on a specific post or Page Likes on an older Page instead? Compare the other Facebook services below.',
    },
  };
}
