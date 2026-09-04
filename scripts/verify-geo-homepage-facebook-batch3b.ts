import { readFileSync } from 'node:fs';

type Point = { title: string; text: string };
type Card = { cardBlurb: string; title: string; intro: string; points: Point[] };

const FB_IDS = ['fb-followers', 'fb-page-likes', 'fb-post-likes'] as const;
const TT_IDS = ['tt-followers', 'tt-likes', 'tt-views'] as const;
const MARKETS = ['ca', 'au', 'us', 'uk'] as const;

const OLD_INTROS = [
  'Buy Facebook followers when you want to add more followers to an eligible public Facebook Page.',
  'Buy Facebook Page likes when you want to increase the number of likes shown on your business, brand, or public Page.',
  'Buy Facebook post likes for a public post when you want to increase the number of likes shown on that specific piece of content.',
];

const EXPECTED: Record<(typeof MARKETS)[number], Record<(typeof FB_IDS)[number], Card>> = {
  ca: {
    'fb-followers': {
      cardBlurb:
        'Facebook follower packages for eligible public Pages used by Canadian businesses, brands and creators.',
      title: 'Build a Stronger Visible Audience Around Your Facebook Page',
      intro:
        'Choose Facebook Followers when the follower count on an eligible public Page is the metric you want to strengthen. Canadian businesses, organisations, creators and brands can use follower growth alongside a Page that already has accurate information, recent posts and a clear reason for visitors to stay connected.',
      points: [
        {
          title: 'Page-Level Followers',
          text: 'The follower package applies to the eligible public Facebook Page submitted with your order.',
        },
        {
          title: 'Keep the Page Current',
          text: 'Recent posts, accurate contact information and clear business details give the follower number more useful context.',
        },
        {
          title: 'Choose for Your Existing Page',
          text: 'Consider your current follower total and Page activity before deciding which package size makes sense.',
        },
        {
          title: 'Other Facebook Metrics Stay Separate',
          text: 'Use Page Likes for the Page Like count or Post Likes when an individual Facebook post is your priority.',
        },
      ],
    },
    'fb-page-likes': {
      cardBlurb: 'Facebook Page Like packages for eligible public Pages in Canada.',
      title: 'Strengthen the Visible Like Count on Your Facebook Page',
      intro:
        'Choose Facebook Page Likes when you want to work specifically on the Like count displayed around an eligible public Page. Canadian businesses and brands can use Page Likes as one visible Page-level signal while keeping their business information, branding, recent posts and customer-facing details accurate.',
      points: [
        {
          title: 'Built for Public Pages',
          text: 'Use this service for an eligible business, brand, creator or organisation Page that remains publicly accessible.',
        },
        {
          title: 'A Page-Level Metric',
          text: 'Page Likes apply to the Facebook Page itself rather than to one individual post.',
        },
        {
          title: 'Give the Number Context',
          text: 'A complete About section, current branding and recent activity help visitors understand the Page behind the Like count.',
        },
        {
          title: 'Followers Are Different',
          text: 'Choose Facebook Followers when the follower total, rather than the Page Like number, is the metric you want to increase.',
        },
      ],
    },
    'fb-post-likes': {
      cardBlurb: 'Facebook Post Like packages for eligible public posts from Canadian Pages.',
      title: 'Put More Visible Likes Behind Important Facebook Posts',
      intro:
        'Choose Facebook Post Likes when one public post has a more important role in your content or campaign. A Canadian business may prioritise a launch, event, product update, completed project, seasonal promotion or useful evergreen post. The Likes package applies to that individual piece of content rather than the Page as a whole.',
      points: [
        {
          title: 'Choose the Post First',
          text: 'Start with the exact eligible public Facebook post that deserves the additional visible engagement.',
        },
        {
          title: 'Post-Level Likes',
          text: 'The package changes the Like count on the selected post rather than the overall Facebook Page audience.',
        },
        {
          title: 'Support Priority Content',
          text: 'Use Post Likes around posts that represent a genuine campaign, announcement, offer or useful business update.',
        },
        {
          title: 'Page Metrics Are Separate',
          text: 'Facebook Followers and Page Likes are separate services when your goal relates to the Page rather than one post.',
        },
      ],
    },
  },
  au: {
    'fb-followers': {
      cardBlurb: 'Facebook follower packages for eligible public Pages in Australia.',
      title: 'Grow the Visible Audience Around Your Facebook Page',
      intro:
        'Choose Facebook Followers when the audience connected to your public Page is the number you want to work on. Australian businesses, creators and brands can use a follower package while continuing to keep the Page active with current information, useful posts and genuine customer-facing updates.',
      points: [
        {
          title: 'Followers for the Whole Page',
          text: 'The selected package applies to the follower count of your eligible public Facebook Page.',
        },
        {
          title: 'Support an Active Presence',
          text: 'Use follower growth around a Page that already shows what the business, creator or organisation actually does.',
        },
        {
          title: 'Match the Increase to the Page',
          text: 'A newer local Page and an established brand Page may need very different follower quantities.',
        },
        {
          title: 'Posts Use a Different Service',
          text: 'Choose Facebook Post Likes when engagement on one particular post is more important than Page audience size.',
        },
      ],
    },
    'fb-page-likes': {
      cardBlurb: 'Page Like packages for eligible public Facebook Pages used by Australian accounts.',
      title: 'Add More Visible Page Likes to an Established Facebook Presence',
      intro:
        'Choose Facebook Page Likes when the Like total on the Page itself is the metric you want to strengthen. The number works best as part of a complete Facebook presence, so keep important Page information, links, branding and recent activity up to date while you work on that visible metric.',
      points: [
        {
          title: 'For Business and Brand Pages',
          text: 'Page Likes can be used with eligible public Pages representing businesses, creators, brands and other supported organisations.',
        },
        {
          title: 'Separate From Post Engagement',
          text: 'A Page Like affects the Page-level number and is not the same as adding Likes to an individual Facebook post.',
        },
        {
          title: 'Keep Public Details Useful',
          text: 'Make sure visitors can still find accurate information about the account behind the Page.',
        },
        {
          title: 'Choose Followers When Appropriate',
          text: 'Use Facebook Followers instead when the visible follower audience is the number you are trying to strengthen.',
        },
      ],
    },
    'fb-post-likes': {
      cardBlurb: 'Facebook Post Like packages for eligible public content from Australian Pages.',
      title: 'Support Facebook Posts That Matter More to Your Campaign',
      intro:
        'Choose Facebook Post Likes when a specific piece of content deserves more visible engagement. Australian businesses and creators may use Post Likes around a product launch, event, project showcase, campaign announcement or useful post that continues representing the Page after publication.',
      points: [
        {
          title: 'For Individual Facebook Posts',
          text: 'Submit the direct public post you want to use rather than the Facebook Page homepage.',
        },
        {
          title: 'Focus on Important Content',
          text: 'Prioritise posts with a clear role in your campaign or ongoing business presence.',
        },
        {
          title: 'Keep Old Information Accurate',
          text: 'If you support an older post, check that links, dates, locations and offer details are still current.',
        },
        {
          title: 'Page Growth Works Differently',
          text: 'Choose Followers or Page Likes when the Facebook Page itself, rather than an individual post, is the focus.',
        },
      ],
    },
  },
  us: {
    'fb-followers': {
      cardBlurb: 'Facebook follower packages for eligible public Pages across the United States.',
      title: 'Strengthen the Audience Around an Active US Facebook Page',
      intro:
        'Choose Facebook Followers when you want to increase the visible follower count around a public Page. US local businesses, ecommerce brands, creators, organisations and larger companies can use follower growth while continuing to build the Page through accurate business details, regular publishing and wider marketing activity.',
      points: [
        {
          title: 'Increase the Page Audience Number',
          text: 'Followers apply to the eligible Facebook Page supplied with the order rather than to an individual piece of content.',
        },
        {
          title: 'Useful Around Business Growth',
          text: 'Follower growth can support a Page during launches, location expansion, campaigns or ongoing brand development.',
        },
        {
          title: 'Make the Page Worth Exploring',
          text: 'Keep the website, contact details, Page description and recent content aligned with the business visitors expect to find.',
        },
        {
          title: 'Know the Difference Between Metrics',
          text: 'Page Likes and Post Likes change different Facebook numbers, so use the service that matches your actual goal.',
        },
      ],
    },
    'fb-page-likes': {
      cardBlurb: 'Facebook Page Like packages for eligible US business, brand and public Pages.',
      title: 'Build More Visible Page Likes Around a Complete Facebook Presence',
      intro:
        'Choose Facebook Page Likes when the public Like total of the Page is the specific metric you want to increase. For US businesses and brands, that number is only one part of what a visitor can evaluate, so use it alongside current company information, clear branding, useful content and an accurate path to your website or contact details.',
      points: [
        {
          title: 'Work on the Page Like Total',
          text: 'The package applies to the visible Page Like metric of the eligible public Page you submit.',
        },
        {
          title: 'Useful Around Launches and Rebrands',
          text: 'Page Likes can support presentation when a company is launching, refreshing its brand or directing more campaign traffic to Facebook.',
        },
        {
          title: 'Keep Company Information Consistent',
          text: 'The Page should match the business identity, website and offer people encounter through your other marketing channels.',
        },
        {
          title: 'Do Not Confuse Likes With Followers',
          text: 'Facebook Followers represent a separate Page-level audience metric and are offered through their own service.',
        },
      ],
    },
    'fb-post-likes': {
      cardBlurb: 'Post Like packages for eligible public Facebook posts from US Pages.',
      title: 'Add Visible Engagement to Facebook Posts With a Specific Job',
      intro:
        'Choose Facebook Post Likes when one public post supports a particular business or content objective. US Pages may have priority posts around a new location, product launch, event, project result, seasonal offer or evergreen service message. Add Likes to that selected content while keeping Page-level Followers and Page Likes separate.',
      points: [
        {
          title: 'Choose Priority Content',
          text: 'Start with the Facebook post that carries an important message, announcement, offer or campaign asset.',
        },
        {
          title: 'Likes Stay With the Selected Post',
          text: 'The service increases visible Likes on one eligible post and does not automatically change Page-level metrics.',
        },
        {
          title: 'Review the Post Before Ordering',
          text: 'Check that links, dates, prices, locations and other important information remain accurate.',
        },
        {
          title: 'Use the Right Facebook Service',
          text: 'Choose Followers or Page Likes instead when your objective relates to the overall Facebook Page.',
        },
      ],
    },
  },
  uk: {
    'fb-followers': {
      cardBlurb:
        'Facebook follower packages for eligible public Pages used by UK businesses, brands and creators.',
      title: 'Build a Stronger Audience Around Your UK Facebook Page',
      intro:
        'Choose Facebook Followers when the visible follower total around your Page is the metric you want to strengthen. UK businesses and creators can use follower growth alongside a Page that makes its services, location, contact information and recent activity easy for visitors to understand.',
      points: [
        {
          title: 'Followers Apply to the Page',
          text: 'The package works on the eligible public Facebook Page rather than engagement on one particular post.',
        },
        {
          title: 'Keep Local Information Accurate',
          text: 'Businesses serving a town, city or wider region should keep relevant service, location and contact information current.',
        },
        {
          title: 'Support a Page With Recent Activity',
          text: 'Current posts and useful updates give the follower count more context when someone discovers the business.',
        },
        {
          title: 'Page Likes and Post Likes Differ',
          text: 'Use the separate Facebook services when those visible metrics better match what you are trying to change.',
        },
      ],
    },
    'fb-page-likes': {
      cardBlurb: 'Facebook Page Like packages for eligible public Pages across the UK.',
      title: 'Strengthen Your Facebook Page Like Count With the Right Context',
      intro:
        'Choose Facebook Page Likes when the visible Like count of an eligible public Page is your priority. UK companies, creators and organisations can work on that metric while making sure visitors can also find current branding, useful Page information, recent content and an accurate route to contact or learn more.',
      points: [
        {
          title: 'Increase the Page-Level Like Metric',
          text: 'The service applies to the eligible public Facebook Page itself and not to Likes on individual posts.',
        },
        {
          title: 'Keep the Business Easy to Verify',
          text: 'Current website, contact and location details help visitors understand the organisation represented by the Page.',
        },
        {
          title: 'Useful During Wider Marketing Activity',
          text: 'Page Likes can support presentation around launches, promotions, events and campaigns while those activities continue separately.',
        },
        {
          title: 'Followers Are Their Own Metric',
          text: 'Use Facebook Followers when you want to work on the Page follower total instead of the Page Like count.',
        },
      ],
    },
    'fb-post-likes': {
      cardBlurb: 'Facebook Post Like packages for eligible public posts from UK Pages.',
      title: 'Put More Visible Likes Behind Facebook Content Worth Keeping',
      intro:
        'Choose Facebook Post Likes when an individual post remains important to your Page. A UK business might prioritise a new service announcement, completed project, event, location update, seasonal campaign or evergreen post that still gives visitors useful information after its original publication date.',
      points: [
        {
          title: 'Start With a Useful Public Post',
          text: 'Choose content that still represents the business, creator or organisation accurately.',
        },
        {
          title: 'Increase the Post Like Count',
          text: 'The selected package applies to that individual Facebook post instead of changing the Page follower or Page Like totals.',
        },
        {
          title: 'Check Time-Sensitive Details',
          text: 'Make sure old promotions, event dates, links and offers have not expired before supporting the post.',
        },
        {
          title: 'Keep Page-Level Growth Separate',
          text: 'Use Facebook Followers or Page Likes when the Page itself is the metric you want to strengthen.',
        },
      ],
    },
  },
};

// Batch 3A TikTok spot-check (ca tt-followers title must remain differentiated)
const TT_3A_SPOT = {
  ca: 'Build a Stronger Visible Audience Around Your TikTok Profile',
  au: 'Strengthen the Audience Number Around Your TikTok Profile',
  us: 'Build Profile Audience Around a Clear TikTok Identity',
  uk: 'Build a Stronger Audience Around Your Public TikTok Profile',
};

type Service = {
  id: string;
  cardBlurb: string;
  title: string;
  intro: string;
  points: Point[];
};

function loadServices(market: (typeof MARKETS)[number]): Service[] {
  const raw = JSON.parse(readFileSync(`content/markets/${market}/homepage.json`, 'utf8')) as {
    services: Service[];
  };
  return raw.services;
}

function compareCard(actual: Service, expected: Card, label: string): boolean {
  let ok = true;
  if (actual.cardBlurb !== expected.cardBlurb) {
    console.error(`FAIL ${label} cardBlurb`);
    ok = false;
  }
  if (actual.title !== expected.title) {
    console.error(`FAIL ${label} title`);
    ok = false;
  }
  if (actual.intro !== expected.intro) {
    console.error(`FAIL ${label} intro`);
    ok = false;
  }
  for (let i = 0; i < 4; i++) {
    if (actual.points[i]?.title !== expected.points[i]?.title) {
      console.error(`FAIL ${label} point[${i}] title`);
      ok = false;
    }
    if (actual.points[i]?.text !== expected.points[i]?.text) {
      console.error(`FAIL ${label} point[${i}] text`);
      ok = false;
    }
  }
  if (ok) console.log(`OK ${label}`);
  return ok;
}

let pass = 0;
console.log('=== Exact copy verification (12 Facebook cards) ===');
for (const market of MARKETS) {
  const services = loadServices(market);
  for (const id of FB_IDS) {
    const svc = services.find((s) => s.id === id);
    if (!svc) {
      console.error(`FAIL /${market}/ missing ${id}`);
      continue;
    }
    if (compareCard(svc, EXPECTED[market][id], `/${market}/ ${id}`)) pass++;
  }
}

console.log('\n=== Old shared Facebook intros in market files ===');
let oldRemoved = true;
for (const market of MARKETS) {
  const text = readFileSync(`content/markets/${market}/homepage.json`, 'utf8');
  for (const old of OLD_INTROS) {
    if (text.includes(old)) {
      console.error(`FAIL old intro still in ${market}`);
      oldRemoved = false;
    }
  }
}
console.log(oldRemoved ? 'YES — old shared Facebook market-card copy removed' : 'NO');

console.log('\n=== TikTok cards unchanged (Batch 3A spot-check) ===');
let ttOk = true;
for (const market of MARKETS) {
  const tt = loadServices(market).find((s) => s.id === 'tt-followers');
  if (!tt || tt.title !== TT_3A_SPOT[market]) {
    console.error(`FAIL TikTok tt-followers changed in ${market}`);
    ttOk = false;
  } else {
    console.log(`OK /${market}/ tt-followers title unchanged`);
  }
}

console.log('\n=== Shared exact sentences among 12 Facebook cards ===');
const allText: string[] = [];
for (const market of MARKETS) {
  for (const id of FB_IDS) {
    const svc = loadServices(market).find((s) => s.id === id)!;
    allText.push(svc.intro, ...svc.points.map((p) => p.text));
  }
}
const sentences = allText.flatMap((t) => t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 20));
const counts = new Map<string, number>();
for (const s of sentences) counts.set(s, (counts.get(s) ?? 0) + 1);
const shared = [...counts.entries()].filter(([, n]) => n > 1);
if (shared.length === 0) {
  console.log('None');
} else {
  for (const [s, n] of shared) console.log(`SHARED (${n}x): ${s}`);
}

console.log(`\n${pass}/12 exact-copy checks passed`);
process.exit(pass === 12 && oldRemoved && ttOk ? 0 : 1);
