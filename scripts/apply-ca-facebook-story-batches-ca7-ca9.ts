/**
 * Apply CA-7/8/9 storySections to Canada Facebook service JSON files.
 * Run: npx tsx scripts/apply-ca-facebook-story-batches-ca7-ca9.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const CA7 = [
  {
    id: 'built-for-canada',
    title: 'Build Facebook Followers Around the Canadian Page You Are Actually Managing',
    lead: 'A Facebook Page can play a different role for a local company, ecommerce business, creator, organization or established brand, so follower growth should fit the Page behind the number.',
    paragraphs: [
      'A Canadian local business may use Facebook for updates, customer communication and community visibility. An ecommerce company may publish products and seasonal campaigns. A service business may show completed work and answer common questions. A creator or organization may use Facebook alongside other social and digital channels.',
      'Review the current Page before choosing a follower quantity. The useful amount depends on the Page, its existing audience, activity and what the business or creator is preparing for.',
    ],
    footer: 'Followers can strengthen visible audience size. The Page and organization behind that number give it meaning.',
    items: [
      { title: 'Local Businesses', body: 'Build the visible audience around a Page potential customers may check while researching the business.' },
      { title: 'Ecommerce Businesses', body: 'Use Facebook alongside genuine product launches, seasonal promotions and wider digital campaigns.' },
      { title: 'Service Businesses', body: 'Build the Page around real services, projects, expertise and useful customer information.' },
      { title: 'Creators', body: 'Support the Page audience while continuing to publish content that gives genuine people a reason to follow.' },
      { title: 'Organizations', body: 'Use Facebook around real updates, events, information and community communication.' },
      { title: 'Established Brands', body: 'Keep follower growth in context with advertising, content, customer service and wider brand activity.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Make a Canadian Local Business Page Useful When Customers Check It',
    lead: 'Facebook may be one of several places a customer checks before deciding whether a local company appears current and trustworthy.',
    bullets: ['recent business activity', 'services', 'products', 'projects', 'events', 'contact information', 'location details', 'customer interaction', 'current opening or availability information'],
    paragraphs: ['Restaurants may share menu or venue updates. Trades can show completed work. Salons may present services or results. Retailers can feature products. Property businesses may publish listings. Tourism and hospitality companies can show experiences. Professional services may answer common questions.'],
    footer: 'A larger follower count can support Page presentation. Local trust comes from accurate information and the real Canadian business behind it.',
  },
  {
    id: 'ca-campaign-moments',
    title: 'Prepare the Facebook Page for Canadian Campaign Moments That Bring More Visitors',
    lead: 'Some launches, seasonal periods and business changes can bring additional attention to a Page.',
    footer: 'Followers can support visible audience size during these moments. The campaign still needs useful content, accurate information and a genuine offer.',
    items: [
      { title: 'New Business Launches', body: 'Complete important Page information and publish useful initial content before sending more attention toward a newer business.' },
      { title: 'New Locations or Service Areas', body: 'Businesses entering another city, province or local market should update the Page and explain what has changed.' },
      { title: 'Black Friday and Cyber Monday', body: 'Canadian retail and ecommerce businesses may have higher-priority Facebook activity during major November shopping periods.' },
      { title: 'Boxing Day Campaigns', body: 'Retailers and ecommerce businesses may use Facebook around Boxing Day, holiday offers and year-end product activity.' },
      { title: 'Seasonal Canadian Campaigns', body: 'Travel, hospitality, home services, retail, fitness and other businesses may have periods when particular Page content becomes more important.' },
      { title: 'Events and Community Activity', body: 'Venues, organizations and local businesses may use Facebook around openings, events and genuine community activity.' },
      { title: 'Rebrands and Expansions', body: 'A Page may receive additional visitors while a company changes its identity, offer or market coverage.' },
    ],
  },
  {
    id: 'better-page',
    title: 'Give the Facebook Follower Count a Better Page Behind It',
    lead: 'A stronger visible audience works best when someone opening the Page can quickly understand the business, creator or organization.',
    footer: 'Followers can support Page presentation. Page management determines what visitors find behind that audience number.',
    items: [
      { title: 'Complete Important Page Information', body: 'Explain clearly what the Page represents and keep important business details current.' },
      { title: 'Keep Contact Details Accurate', body: 'Review website links, phone numbers, addresses and other details that may affect a genuine customer decision.' },
      { title: 'Publish Current Content', body: 'Recent activity provides more context than a larger follower number on a Page that appears abandoned.' },
      { title: 'Use Recognisable Visuals', body: 'Profile and cover imagery should clearly connect the Page with the creator, company or organization behind it.' },
      { title: 'Make Important Updates Easy to Find', body: 'Give launches, offers, events and major company information enough visibility on the Page.' },
      { title: 'Give Visitors a Next Step', body: 'Help interested people understand how to contact, shop, book, visit or learn more.' },
    ],
  },
  {
    id: 'page-trust',
    title: 'Build Facebook Followers Around a Page Canadian Customers Can Verify',
    lead: 'Follower count can contribute to a first impression, but genuine trust comes from what customers can confirm about the business.',
    footer: 'Followers can support visible social presence. The real business creates the trust behind it.',
    items: [
      { title: 'Show Genuine Business Activity', body: 'Publish real products, projects, services, events, team activity and useful company updates.' },
      { title: 'Keep Public Information Consistent', body: 'Align important business details across Facebook, the company website, Google presence and other official channels.' },
      { title: 'Use Real Experience', body: 'Share work and knowledge the company can accurately explain rather than relying on generic claims.' },
      { title: 'Respond to Genuine Customers', body: 'Real Comments, questions and messages should receive appropriate responses from the business.' },
      { title: 'Keep Claims Supportable', body: 'Do not invent testimonials, results or customer experiences simply to strengthen Page presentation.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Keep Facebook Followers Separate From Genuine Customer Proof',
    paragraphs: [
      'A follower count can make a Page appear more established, but it does not show whether genuine customers have bought from, hired, visited or recommended the business.',
      'Canadian companies may have stronger evidence through verified reviews, genuine Facebook Recommendations, authentic testimonials, completed projects, case studies, real customer Comments, customer-created content and accurate public company information.',
      'Use genuine evidence where it exists. Do not present purchased Followers as customer approval.',
    ],
    footer: 'Followers support one visible Page metric. Genuine customer experience provides a different and more meaningful form of proof.',
  },
  {
    id: 'brand-credibility',
    title: 'Give Canadian Customers and Partners More to Judge Than the Follower Count',
    paragraphs: [
      'Follower count may influence the first impression of a Facebook Page, but someone researching a Canadian company can look beyond that number quickly.',
      'They may check recent activity, Page completeness, customer reviews, Recommendations, business information, content quality, customer responses, company history, website presence and wider reputation.',
      'Build the whole Page rather than expecting one public number to establish credibility by itself.',
    ],
  },
  {
    id: 'business-results',
    title: 'Measure Facebook Business Results Separately From the Follower Number',
    lead: 'A larger visible audience does not automatically create commercial outcomes.',
    footer: 'Use Followers for the Page metric they provide while measuring real business outcomes independently.',
    items: [
      { title: 'Website Visits', body: 'Are genuine Facebook users reaching useful pages on the company website?' },
      { title: 'Messages and Enquiries', body: 'Are potential customers contacting the business after discovering the Page?' },
      { title: 'Bookings or Visits', body: 'Where relevant, is Facebook contributing to appointments, reservations or real-world activity?' },
      { title: 'Product Interest and Sales', body: 'Is genuine Facebook activity contributing to product research or purchases?' },
      { title: 'Customer Awareness', body: 'Is the Page helping real people understand what the business offers and whether it is relevant to them?' },
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Facebook Page Plan for Canadian Businesses',
    lead: 'Followers can support Page presentation, but stronger Facebook marketing still depends on useful content and genuine customer activity.',
    footer: 'Keep purchased Followers in perspective as one visible Page metric. Longer-term value comes from the business, content and genuine audience behind it.',
    items: [
      { title: 'Complete the Page', body: 'Keep important business and organization information accurate.' },
      { title: 'Build a Useful Content Mix', body: 'Combine genuine updates, education, proof, promotions and relevant community content.' },
      { title: 'Publish Real Business Activity', body: 'Show what the company is actually doing rather than relying on generic promotional posts.' },
      { title: 'Respond to Genuine People', body: 'Treat real Comments and messages as genuine customer conversations.' },
      { title: 'Review Real Performance', body: 'Use genuine Facebook insights and business data where available to understand what works.' },
      { title: 'Connect Facebook With Wider Marketing', body: 'Canadian businesses may use Facebook alongside their website, Google visibility, Instagram, TikTok, ecommerce, paid media and email.' },
      { title: 'Keep Customer Proof Genuine', body: 'Use real reviews, Recommendations and examples where they actually exist.' },
      { title: 'Measure Purchased Followers Separately', body: 'Evaluate organic reach, genuine engagement and business outcomes independently from the purchased follower count.' },
    ],
  },
];

const CA8 = [
  {
    id: 'built-for-canada',
    title: 'Choose Facebook Page Likes Around the Canadian Page You Are Building',
    lead: 'Page Likes are a Page-level metric, so the useful starting point is the business, creator or organization represented by that Page.',
    paragraphs: [
      'A Canadian local business may use Facebook for customer updates and community visibility. An ecommerce company may use it for product launches and promotions. A service company may show completed work. A creator may publish longer-form updates alongside other social channels. An organization may use the Page around events and community communication.',
      'Choose a Page Like quantity in the context of the Page that exists today rather than treating every account as if it has the same audience, history and purpose.',
    ],
    footer: 'Page Likes can strengthen one visible Page metric. The organization and content behind that number give it context.',
    items: [
      { title: 'Local Businesses', body: 'Support a Page potential customers may check while researching services, locations and recent activity.' },
      { title: 'Ecommerce Businesses', body: 'Use Facebook alongside genuine products, launches and seasonal campaigns.' },
      { title: 'Service Businesses', body: 'Build the Page around real expertise, projects, services and customer information.' },
      { title: 'Creators', body: 'Support Page presentation while continuing genuine publishing and audience communication.' },
      { title: 'Organizations', body: 'Use Facebook around real events, updates and useful community information.' },
      { title: 'Established Brands', body: 'Keep Page Likes in context with wider advertising, content and customer activity.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Build Facebook Page Likes Around a Canadian Business Customers Can Verify',
    lead: 'For local companies, Facebook may be one part of a wider customer research journey that also includes the website, Google presence, reviews and referrals.',
    paragraphs: [
      'Restaurants may share menus, venues and events. Trades can show completed projects. Salons may publish services and recent results. Retailers can feature real products. Property businesses may share listings. Tourism and hospitality companies may show destinations and experiences. Professional services can explain common customer questions.',
      'Keep the Page accurate when Page Likes are supporting its presentation. Locations, services, contact information and public claims should match what customers can verify elsewhere.',
    ],
    footer: 'Page Likes can support visible presence. Local trust comes from the Canadian business and its genuine activity.',
  },
  {
    id: 'ca-campaign-moments',
    title: 'Use Facebook Page Likes Around Canadian Business Moments That Bring More Page Visitors',
    lead: 'Certain launches and seasonal periods can make the overall Page more important because more customers may be checking it.',
    footer: 'Page Likes can support presentation during these periods. The campaign still needs accurate information, relevant content and a genuine offer.',
    items: [
      { title: 'New Business Launches', body: 'Complete the Page and establish useful initial content before sending more campaign attention toward it.' },
      { title: 'New Locations or Service Areas', body: 'Update Page details and publish relevant information when a business enters another city, province or local market.' },
      { title: 'Black Friday and Cyber Monday', body: 'Canadian retail and ecommerce businesses may have higher-priority Facebook activity around major November shopping periods.' },
      { title: 'Boxing Day Campaigns', body: 'Retailers and ecommerce brands may rely on Facebook during Boxing Day and the wider holiday shopping period.' },
      { title: 'Seasonal Canadian Campaigns', body: 'Travel, hospitality, retail, home services, fitness and other businesses may have periods when their Facebook presence becomes more important.' },
      { title: 'Events', body: 'Local businesses, venues and organizations may use Facebook to communicate genuine event and community information.' },
      { title: 'Rebrands and Expansions', body: 'A refreshed Page may receive more attention while customers verify a new identity, offer or market presence.' },
    ],
  },
  {
    id: 'page-worth-exploring',
    title: 'Give the Facebook Page Like Count a Page Worth Exploring',
    lead: 'A stronger Page Like number has better context when someone visiting the Page finds current, useful and consistent information.',
    footer: 'Page Likes can support presentation. Good Page management determines what people find behind that number.',
    items: [
      { title: 'Complete the About Information', body: 'Make the business, creator or organization easy to understand.' },
      { title: 'Keep Contact Details Current', body: 'Review websites, phone numbers, locations and other information that may affect customer decisions.' },
      { title: 'Maintain Recent Activity', body: 'Current posts give visitors more confidence that the Page is still being managed.' },
      { title: 'Use Clear Page Visuals', body: 'Profile and cover imagery should connect clearly with the real business or organization.' },
      { title: 'Publish Useful Content', body: 'Give visitors genuine updates, products, services, proof, education or community information.' },
      { title: 'Make the Next Step Clear', body: 'Help interested customers understand how to contact, shop, book, visit or learn more.' },
    ],
  },
  {
    id: 'social-proof',
    title: 'Use Facebook Page Likes as One Visible Signal, Not as a Substitute for Reputation',
    lead: 'A Page Like count may contribute to how established a Facebook presence appears, but it should not be confused with genuine customer reputation.',
    footer: 'Use Page Likes for the public metric they provide. Build reputation through genuine business activity and customer experience.',
    items: [
      { title: 'Verified Reviews', body: 'Use authentic customer feedback where it genuinely exists.' },
      { title: 'Facebook Recommendations', body: 'Genuine Recommendations can provide potential customers with useful context.' },
      { title: 'Authentic Testimonials', body: 'Use real customer experiences rather than invented proof.' },
      { title: 'Completed Work', body: 'Show real projects, products or results where relevant to the business.' },
      { title: 'Responsive Customer Service', body: 'Handle genuine customer Comments and messages appropriately.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Keep Facebook Page Likes Separate From Genuine Customer Evidence',
    paragraphs: [
      'A Page Like count can support visible popularity, but it does not show whether genuine customers have bought from, hired, visited or recommended the company.',
      'Canadian businesses may have stronger proof through verified reviews, authentic Recommendations, genuine testimonials, completed projects, case studies, customer photos, real Comments and consistent public business information.',
      'Use genuine proof where it exists. Do not present purchased Page Likes as customer approval.',
    ],
    footer: 'Page Likes support one visible Page metric. Genuine customer experience provides deeper evidence.',
  },
  {
    id: 'content-people-need',
    title: 'Build the Facebook Page Around Content Canadian Customers May Actually Need',
    lead: 'Page Likes can support Page presentation, but useful content gives genuine people a reason to keep checking the Page.',
    footer: 'The Page Like count is one visible signal. Useful information gives the Page an ongoing role.',
    items: [
      { title: 'Business Updates', body: 'Share genuine company changes, openings, service updates and important information.' },
      { title: 'Educational Content', body: 'Answer questions customers regularly ask about products, services or processes.' },
      { title: 'Product Content', body: 'Show genuine products and explain them accurately.' },
      { title: 'Project Examples', body: 'Use completed work to demonstrate real experience.' },
      { title: 'Offers', body: 'Explain genuine promotions and important conditions clearly.' },
      { title: 'Local Information', body: 'Publish relevant information about real locations and service areas where useful.' },
      { title: 'Events', body: 'Keep genuine event details current and easy to understand.' },
    ],
  },
  {
    id: 'brands-agencies',
    title: 'Keep Facebook Page Likes in Context for Canadian Brands and Agencies',
    paragraphs: [
      'Brands and agencies may use Facebook as one part of a wider campaign involving Instagram, TikTok, paid media, ecommerce, search, email, creators and the company website.',
      'Page Likes can support visible Page presentation within that larger activity, but professional reporting should keep different metrics separate.',
      'Distinguish purchased Page Likes from organic Followers, genuine engagement, organic reach, paid campaign results, website activity and business outcomes.',
    ],
  },
  {
    id: 'growth-framework',
    title: 'A Practical Facebook Page Plan for Canadian Businesses and Organizations',
    lead: 'Page Likes can support the Page, but stronger Facebook marketing still depends on the information, content and genuine activity behind it.',
    footer: 'Keep purchased Page Likes in perspective as one visible Page metric.',
    items: [
      { title: 'Complete the Page', body: 'Keep important business and organization information accurate.' },
      { title: 'Publish Genuine Activity', body: 'Show what the business, creator or organization is actually doing.' },
      { title: 'Build a Useful Content Mix', body: 'Combine updates, education, proof, products, promotions and relevant community content.' },
      { title: 'Respond to Genuine Customers', body: 'Treat real Comments and messages as real conversations.' },
      { title: 'Use Genuine Customer Proof', body: 'Show reviews, Recommendations and examples only where they actually exist.' },
      { title: 'Review Real Performance', body: 'Use genuine Page insights and business data where available.' },
      { title: 'Connect Facebook With Wider Marketing', body: 'Canadian organizations may use Facebook alongside Instagram, TikTok, Google visibility, ecommerce, paid media, email and their website.' },
      { title: 'Measure Purchased Page Likes Separately', body: 'Evaluate organic Followers, reach, engagement and business outcomes independently.' },
    ],
  },
];

const CA9 = [
  {
    id: 'built-for-canada',
    title: 'Choose Facebook Post Likes Around the Canadian Content You Actually Want to Support',
    lead: 'Post Likes apply to individual content, so start with the role of the post rather than treating every Page update as equally important.',
    paragraphs: [
      'A Canadian ecommerce business may focus on a product launch. A restaurant may have an important menu or event post. A trade or service business may highlight completed work. A retailer may feature new products. A creator may support priority content. An organization may have an event or community announcement that deserves more attention.',
      'Choose the post first, then decide whether additional visible Likes fit what that content is meant to do.',
    ],
    footer: 'Post Likes can support one visible engagement metric. The content behind that number still needs a purpose.',
    items: [
      { title: 'Local Businesses', body: 'Support posts showing real services, projects, products, events or business updates.' },
      { title: 'Ecommerce Businesses', body: 'Focus on genuine launches, product content and important shopping campaigns.' },
      { title: 'Service Businesses', body: 'Use Post Likes around completed work, educational posts and meaningful company announcements.' },
      { title: 'Creators', body: 'Put visible engagement behind priority content instead of treating every post the same way.' },
      { title: 'Organizations', body: 'Support genuine event, campaign and community information where the individual post matters.' },
      { title: 'Established Brands', body: 'Use Post Likes around selected content while genuine publishing, advertising and customer activity continue separately.' },
    ],
  },
  {
    id: 'ca-campaign-content',
    title: 'Put Facebook Post Likes Behind Canadian Campaign Content With a Clear Role',
    lead: 'Some posts matter more because customers are actively looking for information around a launch, season, promotion or business change.',
    footer: 'Post Likes can support campaign presentation. The real campaign still depends on useful creative, accurate information and a genuine offer.',
    items: [
      { title: 'Black Friday and Cyber Monday', body: 'Canadian retail and ecommerce businesses may have priority Facebook posts during major November shopping periods.' },
      { title: 'Boxing Day Campaigns', body: 'Retailers and ecommerce brands may use selected posts around Boxing Day and the wider holiday shopping period.' },
      { title: 'Product Launches', body: 'Support the post that most clearly introduces or explains the genuine product.' },
      { title: 'Seasonal Canadian Services', body: 'Travel, hospitality, home services, retail, fitness and other businesses may have posts whose importance changes throughout the year.' },
      { title: 'New Locations or Service Areas', body: 'A business entering another city, province or local market can prioritise the post that clearly explains what has changed.' },
      { title: 'Events', body: 'Venues, organizations and local businesses may have important posts around genuine events, openings or community activity.' },
      { title: 'Company Milestones', body: 'Anniversaries, major projects, awards or other genuine company developments can remain useful reference points on the Page.' },
    ],
  },
  {
    id: 'strong-content',
    title: 'Use Facebook Post Likes to Support Strong Content, Not to Replace It',
    lead: 'Like count is only one visible element of a Facebook post. Genuine viewers can immediately evaluate the content around it.',
    bullets: ['the image or video', 'caption', 'Comments', 'Shares', 'Page name', 'business information', 'recent Page activity'],
    paragraphs: [
      'A stronger visible Like count can make selected content appear more active, but it cannot make an unclear post useful or an inaccurate claim trustworthy.',
      'Use Post Likes for the metric they provide. Keep the creative, information and purpose of the post as separate parts of the strategy.',
    ],
    footer: 'Post Likes can support presentation. The content gives genuine people a reason to pay attention.',
  },
  {
    id: 'real-activity',
    title: 'Build Facebook Engagement Around Real Business Activity',
    lead: 'Posts based on genuine work, products and first-hand knowledge give customers more substance than generic promotional claims.',
    footer: 'Post Likes can support visible engagement. Real activity gives the content something meaningful to represent.',
    items: [
      { title: 'Completed Projects', body: 'Show work the business has actually completed and can accurately explain.' },
      { title: 'Products You Really Sell', body: 'Use genuine photos, useful product information and accurate availability details.' },
      { title: 'Business Milestones', body: 'Share real openings, expansions, anniversaries, awards or other company developments.' },
      { title: 'Events', body: 'Publish accurate dates, locations and event details.' },
      { title: 'Customer Questions', body: 'Turn genuine recurring enquiries into useful Facebook content.' },
      { title: 'Behind-the-Scenes Activity', body: 'Show real teams, places and processes where appropriate.' },
      { title: 'Professional Knowledge', body: 'Use first-hand expertise to explain something customers actually need to understand.' },
    ],
  },
  {
    id: 'local-businesses',
    title: 'Use Facebook Post Likes Around Canadian Local Business Content Customers Can Verify',
    paragraphs: [
      'Facebook posts can help customers understand the real business behind the Page before deciding whether to enquire, visit, book or buy.',
      'Restaurants may publish menu or venue updates. Trades can show finished work. Salons may feature recent services or results. Retailers can introduce products. Property businesses may share listings. Tourism and hospitality companies may promote genuine experiences. Professional services can explain useful customer topics.',
      'If Post Likes are supporting this content, keep the Page, business information and claims consistent with what customers can verify through official channels.',
    ],
    footer: 'Visible engagement can support presentation. Local trust comes from the Canadian business behind the post.',
  },
  {
    id: 'useful-next-step',
    title: 'Give Interested People Somewhere Useful to Go After the Facebook Post',
    lead: 'A post may create interest, but the wider Page and customer journey determine what happens next.',
    footer: 'Post Likes can support visible activity around the content. A useful next step determines whether genuine interest can go further.',
    items: [
      { title: 'Keep Page Information Current', body: 'Make sure websites, contact details, locations and important business information are accurate.' },
      { title: 'Explain the Offer Clearly', body: 'If the post promotes something, make it easy to understand what the product, service or event actually is.' },
      { title: 'Use the Correct Destination', body: 'Send interested customers to the relevant product, service, booking or information page.' },
      { title: 'Respond to Genuine Questions', body: 'Real customer Comments deserve accurate responses from the business.' },
      { title: 'Keep Related Content Available', body: 'Someone exploring the Page should be able to find more than one useful post.' },
    ],
  },
  {
    id: 'customer-proof',
    title: 'Keep Facebook Post Likes Separate From Genuine Customer Proof',
    paragraphs: [
      'A Like count can make a post appear more active, but it does not show whether genuine customers have bought from, hired, visited or recommended the company.',
      'Canadian businesses may have stronger evidence through verified reviews, genuine Recommendations, authentic testimonials, completed projects, case studies, customer photos, real Comments and accurate business information.',
      'Use genuine customer evidence where it exists. Do not present purchased Post Likes as customer approval.',
    ],
    footer: 'Post Likes can support content presentation. Genuine customer experience creates a different and more meaningful form of trust.',
  },
  {
    id: 'brand-campaigns',
    title: 'Keep Facebook Post Likes in Context for Canadian Brand Campaigns',
    paragraphs: [
      'Brands and agencies may use Facebook as one part of campaigns that also involve Instagram, TikTok, paid social, search, ecommerce, email, creators and the company website.',
      'If Post Likes are part of the campaign, professional reporting should keep purchased and genuine activity separate.',
      'Distinguish purchased Post Likes from genuine engagement, organic reach, paid reach, Page growth, website activity and real business outcomes.',
    ],
  },
  {
    id: 'business-results',
    title: 'Measure Business Outcomes Separately From Facebook Post Likes',
    lead: 'A stronger Like count can support how active a selected post appears, but business value depends on genuine customer behaviour.',
    footer: 'Measure the real objective separately instead of treating the displayed Like count as the final result.',
    items: [
      { title: 'Website Activity', body: 'Are genuine users moving from Facebook to relevant pages on the business website?' },
      { title: 'Enquiries and Messages', body: 'Are potential customers contacting the business after seeing the content?' },
      { title: 'Bookings or Visits', body: 'Where relevant, is Facebook contributing to appointments, reservations or in-person activity?' },
      { title: 'Product Interest and Sales', body: 'Is genuine activity contributing to product research or purchases?' },
      { title: 'Customer Awareness', body: 'Is the post helping real people understand the business, product, service or campaign?' },
    ],
  },
  {
    id: 'content-framework',
    title: 'A Practical Facebook Content Plan for Canadian Businesses',
    lead: 'Post Likes can support priority content, but stronger Facebook marketing still depends on what the business publishes and how genuine users respond.',
    footer: 'Keep purchased Post Likes in perspective as one visible post metric.',
    items: [
      { title: 'Start With the Purpose', body: 'Know what the individual post is meant to communicate or support.' },
      { title: 'Choose Priority Content', body: 'Do not assume every Facebook post needs the same level of attention.' },
      { title: 'Use Real Business Experience', body: 'Publish genuine products, services, projects and expertise.' },
      { title: 'Improve the Creative', body: 'Use images or video that clearly communicate the idea.' },
      { title: 'Write Useful Copy', body: 'Explain the information the customer genuinely needs.' },
      { title: 'Give People a Next Step', body: 'Make it clear how interested users can learn more, contact, shop or book.' },
      { title: 'Respond to Genuine Interaction', body: 'Treat real Comments and messages as actual customer conversations.' },
      { title: 'Review Real Performance', body: 'Use genuine Facebook data and real business outcomes to understand what works.' },
      { title: 'Connect Facebook With Wider Canadian Marketing', body: 'Businesses may use Facebook alongside Instagram, TikTok, Google visibility, ecommerce, paid media, email and their website.' },
      { title: 'Measure Purchased Post Likes Separately', body: 'Evaluate organic reach, genuine engagement and business outcomes independently.' },
    ],
  },
];

function apply(slug: string, sections: unknown[]) {
  const file = path.join(ROOT, `content/markets/ca/services/${slug}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8')) as { dummy?: Record<string, unknown> };
  if (!data.dummy) throw new Error(`Missing dummy in ${slug}`);
  data.dummy.storySections = sections;
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Applied ${sections.length} storySections to ${slug}`);
}

apply('buy-facebook-followers', CA7);
apply('buy-facebook-page-likes', CA8);
apply('buy-facebook-post-likes', CA9);
