import { readFileSync } from 'node:fs';

type Item = { id: string; title: string; description: string };
type Benefits = { id: string; title: string; description: string; items: Item[] };

const OLD_DUP_TITLES = [
  'Build Conversation Around Content That Deserves Attention',
  'Why Creators and Brands Build Their TikTok Follower Count',
  'Build a Stronger First Impression Around Your Facebook Page',
  'Build Stronger Visible Activity Around Important Content',
];

const SLUGS = [
  'buy-instagram-comments',
  'buy-tiktok-followers',
  'buy-facebook-followers',
  'buy-facebook-page-likes',
  'buy-facebook-post-likes',
];

function loadBenefits(market: 'us' | 'uk', slug: string): Benefits {
  const path = `content/markets/${market}/services/${slug}.json`;
  const raw = JSON.parse(readFileSync(path, 'utf8')) as { content: { benefits: Benefits } };
  return raw.content.benefits;
}

function benefitsText(b: Benefits): string {
  return [b.title, b.description, ...b.items.flatMap((i) => [i.title, i.description])].join('\n');
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = [...a].filter((x) => b.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 1 : inter / union;
}

function compareBenefits(actual: Benefits, expected: Benefits, label: string): boolean {
  let ok = true;
  if (actual.id !== expected.id) {
    console.error(`FAIL ${label} id: got ${actual.id}`);
    ok = false;
  }
  if (actual.title !== expected.title) {
    console.error(`FAIL ${label} title mismatch`);
    ok = false;
  }
  if (actual.description !== expected.description) {
    console.error(`FAIL ${label} description mismatch`);
    ok = false;
  }
  if (actual.items.length !== expected.items.length) {
    console.error(`FAIL ${label} item count`);
    ok = false;
  }
  for (let i = 0; i < expected.items.length; i++) {
    const a = actual.items[i];
    const e = expected.items[i];
    if (!a || a.id !== e.id) {
      console.error(`FAIL ${label} item[${i}] id`);
      ok = false;
    }
    if (!a || a.title !== e.title) {
      console.error(`FAIL ${label} item[${i}] title (${e.id})`);
      ok = false;
    }
    if (!a || a.description !== e.description) {
      console.error(`FAIL ${label} item[${i}] description (${e.id})`);
      ok = false;
    }
  }
  if (ok) console.log(`OK ${label}`);
  return ok;
}

const EXPECTED: Record<'us' | 'uk', Record<string, Benefits>> = {
  us: {
    'buy-instagram-comments': {
      id: 'why-buy-instagram-comments',
      title: 'Use Instagram Comments Around Content That Invites a Response',
      description:
        'For US creators and businesses, a comments package makes the most sense when the post already has a specific reason for people to react. That could be a product launch, customer question, campaign announcement, event, educational Reel, project reveal or collaboration. The visible comment count can add another engagement signal beneath the content, but the conversation should still fit what someone sees in the post and caption. A local business might use Instagram to showcase recent work, while an ecommerce brand may focus on a new product or promotion. In either case, keep the message accurate and make the next step clear. Purchased comments can support the visible discussion on the selected content. Genuine questions, customer feedback and community conversations still depend on the audience and how the account responds.',
      items: [
        {
          id: 'ig-c-benefit-conversation',
          title: 'Give People a Clear Topic to React To',
          description:
            'Use comments around posts with a focused subject, question, announcement or story instead of content that gives viewers little context.',
        },
        {
          id: 'ig-c-benefit-credibility',
          title: 'Connect Engagement to the Actual Post',
          description:
            'The visible conversation should make sense beside the caption, creative and offer so visitors can understand why the post is receiving attention.',
        },
        {
          id: 'ig-c-benefit-interaction',
          title: 'Support Priority Campaign Content',
          description:
            'Use a comments package selectively around launches, collaborations, educational content and other posts that matter more to the campaign.',
        },
        {
          id: 'ig-c-benefit-audiences',
          title: 'Useful for Creators and US Businesses',
          description:
            'Creators, ecommerce brands, local companies and agencies can use comments around eligible public content while continuing to manage genuine audience replies separately.',
        },
      ],
    },
    'buy-tiktok-followers': {
      id: 'why-buy-tiktok-followers',
      title: 'Build a TikTok Profile That Makes Sense Beyond the Follower Number',
      description:
        'Follower count can support the visible scale of a TikTok profile, but US audiences still need to understand the account when they arrive. A creator may be building around one niche, while an ecommerce brand, local business or national company may use TikTok for products, education, behind-the-scenes content or campaigns. Before putting more followers behind the profile, make sure the bio, recent videos and pinned content point in the same direction. If the account serves a particular city, state, industry or audience, the content should make that clear without depending on the follower count to explain the brand. A follower package can strengthen one profile-level metric. The videos, positioning and genuine audience response determine whether visitors have a reason to keep exploring.',
      items: [
        {
          id: 'tt-f-social-proof',
          title: 'Strengthen the Profile at First Glance',
          description:
            'A larger audience number can support profile presentation when someone discovers the account through a video, search, campaign or referral.',
        },
        {
          id: 'tt-f-creator-friendly',
          title: 'Support a Defined Content Direction',
          description:
            'Use follower growth around an account with a clear niche, product category, business purpose or creator identity rather than unrelated posting.',
        },
        {
          id: 'tt-f-flexible',
          title: 'Match the Increase to the Account',
          description:
            "Consider the profile's existing size and activity before choosing a package instead of treating the largest follower quantity as the default.",
        },
        {
          id: 'tt-f-content-first',
          title: 'Let the Videos Explain Why People Should Stay',
          description:
            'Follower count can support appearance, but useful videos, consistent topics and a clear profile give visitors the real reason to continue watching.',
        },
      ],
    },
    'buy-facebook-followers': {
      id: 'why-buy-facebook-followers',
      title: 'Use Facebook Followers to Support an Active US Business Page',
      description:
        'A Facebook follower count can contribute to the visible size of a Page, but US customers may look beyond that number almost immediately. They can check recent posts, reviews, business details, location information, website links, opening information and how clearly the Page explains what the organisation does. This becomes especially important for businesses serving a particular city, state or service area. Before adding followers, make sure the Page reflects the current company rather than an old version of the brand. Use follower growth as one presentation signal around launches, expansion, ongoing content or wider marketing campaigns. It should support a Page that already helps visitors understand the business and their next step.',
      items: [
        {
          id: 'fb-f-community',
          title: 'Support an Active Page Audience',
          description:
            'A stronger follower total can add context to a Page that is already publishing updates, offers, projects, products or useful information.',
        },
        {
          id: 'fb-f-first-impression',
          title: 'Make the Rest of the Page Match the Number',
          description:
            'Current branding, accurate business details and recent activity make the visible follower count more meaningful when a visitor checks the Page.',
        },
        {
          id: 'fb-f-business-pages',
          title: 'Useful Around Business Growth and Campaigns',
          description:
            'US businesses can use follower packages alongside launches, location expansion, advertising and ongoing content rather than as a replacement for them.',
        },
        {
          id: 'fb-f-flexible',
          title: 'Choose a Quantity That Fits the Existing Page',
          description:
            "Review the Page's current size and activity before selecting the follower increase that makes sense for the account.",
        },
      ],
    },
    'buy-facebook-page-likes': {
      id: 'why-buy-facebook-page-likes',
      title: 'Use Page Likes as One Signal Around a Complete Facebook Presence',
      description:
        'Facebook Page Likes can add to the visible presentation of a Page, but US visitors still have plenty of other information available when deciding whether a business looks established. They may review recent posts, follower count, customer feedback, Page details, website links and the information provided about the company. A Page Likes package is therefore best treated as one Page-level metric rather than a substitute for the Page itself. Before supporting the Like count, update old descriptions, incorrect contact information and outdated branding. This is particularly useful when a business is launching, rebranding, entering another market or directing campaign traffic toward Facebook. Build the number around a Page that is already ready to receive attention.',
      items: [
        {
          id: 'fb-pl-new-business',
          title: 'Support a Newly Built Business Page',
          description:
            'A newer US business can use Page Likes while it is also completing the Page, publishing initial content and building visibility through other channels.',
        },
        {
          id: 'fb-pl-launch',
          title: 'Strengthen the Page Behind a Campaign',
          description:
            'When ads, email, search or another campaign sends people to Facebook, make sure the Page itself is prepared for the additional attention.',
        },
        {
          id: 'fb-pl-brand-image',
          title: 'Keep Branding Consistent',
          description:
            'The Page name, profile image, cover image and company information should align with the business people encounter elsewhere.',
        },
        {
          id: 'fb-pl-social-proof',
          title: 'Use Page Likes as One Visible Signal',
          description:
            'Treat the Like count as part of Page presentation rather than proof of customer satisfaction, business quality or campaign performance.',
        },
        {
          id: 'fb-pl-campaigns',
          title: 'Connect the Metric to a Wider Strategy',
          description:
            'Page Likes can accompany content, advertising and brand campaigns while those activities continue to serve their own objectives.',
        },
      ],
    },
    'buy-facebook-post-likes': {
      id: 'why-buy-facebook-post-likes',
      title: 'Put Facebook Post Likes Behind Content With a Specific Goal',
      description:
        'A Post Likes package applies to one individual piece of Facebook content, so deciding which post to support matters more than simply increasing a number. US businesses may have priority posts around product launches, location openings, completed projects, events, announcements, seasonal offers or evergreen service information. Increasing the visible Like count can strengthen one engagement signal on that post, while the content itself continues to carry the actual message. Check that dates, prices, locations, links and offer details are still accurate before directing more attention toward older content. Use Post Likes selectively where the post contributes to a wider campaign or remains useful to people who discover it later.',
      items: [
        {
          id: 'fb-post-product-launch',
          title: 'Focus on Priority Business Posts',
          description:
            'Use Post Likes around launches, openings, project showcases and other updates that represent an important business moment.',
        },
        {
          id: 'fb-post-social-proof',
          title: 'Strengthen One Visible Engagement Signal',
          description:
            'The Like count can make an individual post appear more active without being treated as evidence of sales, customer satisfaction or organic reach.',
        },
        {
          id: 'fb-post-campaign',
          title: 'Support Posts Connected to Wider Campaigns',
          description:
            'Choose content already being used in advertising, email, promotions or other marketing when visible Facebook engagement supports that campaign.',
        },
        {
          id: 'fb-post-flexible',
          title: 'Match the Quantity to the Content',
          description:
            'An everyday update and a major launch do not necessarily need the same Post Likes quantity.',
        },
      ],
    },
  },
  uk: {
    'buy-instagram-comments': {
      id: 'why-buy-instagram-comments',
      title: 'Build Visible Discussion Around Instagram Content Worth Talking About',
      description:
        'A stronger comment count is most useful when the Instagram post already has something clear to say. UK creators and businesses may use posts and Reels for launches, events, seasonal offers, new services, collaborations, completed work or educational content. Adding visible comments can make the discussion area look more active, but the post still needs enough context for that activity to feel connected to the content. Keep captions clear, business details current and claims accurate. If someone discovers the post from a campaign or recommendation, the profile should help them understand who is behind it and what to do next. Use purchased comments for the selected public content, while treating genuine customer questions and community replies as a separate part of ongoing account management.',
      items: [
        {
          id: 'ig-c-benefit-conversation',
          title: 'Start With Content That Has Something to Discuss',
          description:
            'Questions, launches, project reveals and useful educational posts give the visible conversation a clearer purpose than generic content.',
        },
        {
          id: 'ig-c-benefit-credibility',
          title: 'Keep the Conversation Relevant to the Creative',
          description:
            'Comments work better as a presentation signal when the caption, visuals and visible discussion all relate to the same subject.',
        },
        {
          id: 'ig-c-benefit-interaction',
          title: 'Support the Posts That Matter Most',
          description:
            'Focus comment packages on important campaigns or evergreen content rather than treating every post on the profile the same way.',
        },
        {
          id: 'ig-c-benefit-audiences',
          title: 'Built Around Public Creator and Business Content',
          description:
            'UK creators, brands, local businesses and agencies can use comments for eligible public posts while continuing to handle genuine audience conversations themselves.',
        },
      ],
    },
    'buy-tiktok-followers': {
      id: 'why-buy-tiktok-followers',
      title: 'Support a TikTok Profile With a Clear Identity Behind It',
      description:
        'A TikTok follower total is easy to notice, but it works best when the rest of the profile gives that number context. UK creators, online shops, local companies and brands may all use TikTok differently, from short educational clips and product demonstrations to venue content, project showcases and campaign videos. Keep the account focused enough that a new visitor can understand the theme without scrolling through a long mix of unrelated posts. Use the bio and pinned videos to introduce the account, maintain recent activity and make any business information accurate. A follower package changes the visible audience number on the profile. Long-term interest still comes from the videos and whether they give viewers a reason to return.',
      items: [
        {
          id: 'tt-f-social-proof',
          title: 'Create a More Established First Impression',
          description:
            'Follower count can support how developed a profile appears when someone first arrives from a TikTok video or another marketing channel.',
        },
        {
          id: 'tt-f-creator-friendly',
          title: 'Give the Audience Number a Clear Context',
          description:
            'Creators and UK businesses should make their niche, products, services or content direction easy to recognise from the profile itself.',
        },
        {
          id: 'tt-f-flexible',
          title: 'Choose Growth That Fits the Current Profile',
          description:
            'A newer profile and an established account do not need to approach follower quantities in exactly the same way.',
        },
        {
          id: 'tt-f-content-first',
          title: 'Keep Publishing Worthwhile Videos',
          description:
            'Followers can support one visible profile metric, while regular useful content provides the reason for genuine viewers to stay interested.',
        },
      ],
    },
    'buy-facebook-followers': {
      id: 'why-buy-facebook-followers',
      title: 'Build Follower Count Around a Facebook Page That Looks Current',
      description:
        'When people discover a UK business on Facebook, the follower number is only one part of the Page they can assess. Recent posts, reviews, contact information, website details, branding and local information can all influence whether the Page feels useful. This is particularly relevant for businesses serving a specific town, city or region, where visitors may be checking practical information before deciding what to do next. A follower package can increase the visible audience count, but it should sit alongside accurate Page information and regular activity. Before ordering, review the public Page as a new visitor would and make sure it represents the business today rather than relying on the follower total to create the entire first impression.',
      items: [
        {
          id: 'fb-f-community',
          title: 'Add Context to an Active Page',
          description:
            'A larger follower figure works better when visitors can also find useful current posts and clear information about the organisation.',
        },
        {
          id: 'fb-f-first-impression',
          title: 'Keep Local and Business Details Accurate',
          description:
            'Correct website, contact and location information can matter more to a potential customer than the follower number by itself.',
        },
        {
          id: 'fb-f-business-pages',
          title: 'Support Wider Marketing Activity',
          description:
            'UK companies can use follower packages alongside campaigns, events, advertising, community updates and regular Facebook publishing.',
        },
        {
          id: 'fb-f-flexible',
          title: 'Match the Package to the Page',
          description:
            "Choose the increase according to the Page's existing audience and activity rather than assuming every business needs the same quantity.",
        },
      ],
    },
    'buy-facebook-page-likes': {
      id: 'why-buy-facebook-page-likes',
      title: 'Give Your Facebook Page Like Count a Stronger Foundation',
      description:
        "A Page Like total can contribute to how established a Facebook Page appears, but UK visitors may also be looking for recent activity, genuine reviews, clear business information and a working route to the company's website or contact details. For local businesses, the Page should also make it easy to understand where the company operates and what it actually provides. Use a Page Likes package when you want to strengthen that specific visible metric, while keeping the rest of the Page useful. If the business has changed its branding, services, locations or contact information, update those details first. The strongest presentation comes from a Page where the number and the actual business information support the same impression.",
      items: [
        {
          id: 'fb-pl-new-business',
          title: 'Build Around a Properly Set Up Page',
          description:
            'New UK businesses should complete important Page information and begin publishing useful content alongside any Page Like activity.',
        },
        {
          id: 'fb-pl-launch',
          title: 'Prepare the Page Before Sending Campaign Traffic',
          description:
            'A launch or promotion works better when anyone who visits Facebook can immediately understand the company and the offer.',
        },
        {
          id: 'fb-pl-brand-image',
          title: 'Present a Consistent Business Identity',
          description:
            'Use accurate branding, contact details and website information so the Page Like number sits beside a credible public presence.',
        },
        {
          id: 'fb-pl-social-proof',
          title: 'Keep Page Likes in Perspective',
          description:
            'The Like count is one public metric and should not be presented as a replacement for genuine reviews, recommendations or customer experiences.',
        },
        {
          id: 'fb-pl-campaigns',
          title: 'Use Likes Alongside Ongoing Marketing',
          description:
            'Page Likes can support presentation while advertising, publishing and genuine community interaction continue as separate activities.',
        },
      ],
    },
    'buy-facebook-post-likes': {
      id: 'why-buy-facebook-post-likes',
      title: 'Support Facebook Posts That Have Lasting Value for Your Page',
      description:
        'Some Facebook posts remain useful long after the day they are published. A UK business might have a strong project showcase, service announcement, event post, new-location update, seasonal promotion or product launch that continues to represent the company. A Post Likes package increases the visible Like count on that individual public post, but the value of the content still comes from the information it provides. Before supporting an older post, check that the offer, contact details and links remain current. If the post is tied to a short-lived promotion, make sure it has not expired. Use Post Likes around content that still deserves attention rather than increasing engagement on posts that no longer serve a clear purpose.',
      items: [
        {
          id: 'fb-post-product-launch',
          title: 'Highlight Important Commercial Updates',
          description:
            'Launches, new services, events and strong project content can be more suitable for additional visible engagement than routine posts.',
        },
        {
          id: 'fb-post-social-proof',
          title: 'Add Activity Without Overstating What It Means',
          description:
            'A higher Like count can support the presentation of the post, while genuine reputation and customer results come from separate evidence.',
        },
        {
          id: 'fb-post-campaign',
          title: 'Support Content Used Across Marketing Channels',
          description:
            'Post Likes can complement a wider promotion when the same Facebook content is also being shared through other marketing activity.',
        },
        {
          id: 'fb-post-flexible',
          title: 'Choose the Post Before the Package',
          description:
            'Start with content that remains accurate and useful, then select a Like quantity appropriate for that specific post.',
        },
      ],
    },
  },
};

let pass = 0;
console.log('=== Exact copy verification ===');
for (const market of ['us', 'uk'] as const) {
  for (const slug of SLUGS) {
    const actual = loadBenefits(market, slug);
    if (compareBenefits(actual, EXPECTED[market][slug], `/${market}/${slug}`)) pass++;
  }
}

console.log('\n=== Old duplicate benefits titles in US/UK benefits sections ===');
let dupRemoved = true;
for (const slug of SLUGS) {
  const us = loadBenefits('us', slug);
  const uk = loadBenefits('uk', slug);
  for (const old of OLD_DUP_TITLES) {
    if (us.title === old || uk.title === old) {
      console.error(`FAIL benefits.title still has old dup: ${old} in ${slug}`);
      dupRemoved = false;
    }
  }
  if (us.title === uk.title) {
    console.error(`FAIL US/UK benefits.title identical for ${slug}: ${us.title}`);
    dupRemoved = false;
  }
  if (us.description === uk.description) {
    console.error(`FAIL US/UK benefits.description identical for ${slug}`);
    dupRemoved = false;
  }
}
console.log(dupRemoved ? 'YES — old identical benefits blocks removed' : 'NO — duplicates remain');

console.log('\n=== US vs UK benefits Jaccard similarity ===');
for (const slug of SLUGS) {
  const us = loadBenefits('us', slug);
  const uk = loadBenefits('uk', slug);
  const sim = jaccard(tokenSet(benefitsText(us)), tokenSet(benefitsText(uk)));
  console.log(`${slug}: ${(sim * 100).toFixed(1)}%`);
}

console.log(`\n${pass}/10 exact-copy checks passed`);
process.exit(pass === 10 && dupRemoved ? 0 : 1);
