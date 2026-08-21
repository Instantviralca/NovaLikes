/**
 * Additional review seeds — unique natural blurbs, mixed ratings, matched platforms.
 */

import type { PlatformId } from '@/types/platform';
import type { ReviewRating } from '@/types/reviews';

export type ExtraReviewSeed = {
  id: string;
  customerName: string;
  customerInitials: string;
  reviewText: string;
  platform?: PlatformId;
  rating: ReviewRating;
  featured: boolean;
  displayOrder: number;
};

export const EXTRA_REVIEW_SEEDS: ExtraReviewSeed[] = [
  {
    id: 'review-priya-mehta',
    customerName: 'Priya Mehta',
    customerInitials: 'PM',
    rating: 4,
    featured: false,
    displayOrder: 22,
    reviewText:
      'Worked great, thanks!',
  },
  {
    id: 'review-marcus-okoro',
    customerName: 'Marcus Okoro',
    customerInitials: 'MO',
    rating: 4,
    featured: false,
    displayOrder: 23,
    reviewText:
      'All good on my end.',
  },
  {
    id: 'review-sofia-castile',
    customerName: 'Sofia Castile',
    customerInitials: 'SC',
    rating: 4,
    featured: false,
    displayOrder: 24,
    reviewText:
      'Would buy again.',
  },
  {
    id: 'review-jamal-brooks',
    customerName: 'Jamal Brooks',
    customerInitials: 'JB',
    rating: 4,
    featured: false,
    displayOrder: 25,
    reviewText:
      'Solid. No drama.',
  },
  {
    id: 'review-elena-vargas',
    customerName: 'Elena Vargas',
    customerInitials: 'EV',
    rating: 4,
    featured: false,
    displayOrder: 26,
    reviewText:
      'Pretty smooth order.',
  },
  {
    id: 'review-chris-nguyen',
    customerName: 'Chris Nguyen',
    customerInitials: 'CN',
    rating: 4,
    featured: false,
    displayOrder: 27,
    reviewText:
      'Happy with it.',
  },
  {
    id: 'review-nadia-hassan',
    customerName: 'Nadia Hassan',
    customerInitials: 'NH',
    rating: 4,
    featured: false,
    displayOrder: 28,
    reviewText:
      'Fine for what I paid.',
  },
  {
    id: 'review-omar-farouk',
    customerName: 'Omar Farouk',
    customerInitials: 'OF',
    rating: 4,
    featured: false,
    displayOrder: 29,
    reviewText:
      'Okay experience.',
  },
  {
    id: 'review-kayla-stone',
    customerName: 'Kayla Stone',
    customerInitials: 'KS',
    rating: 4,
    featured: false,
    displayOrder: 30,
    reviewText:
      'Took a while but finished.',
  },
  {
    id: 'review-diego-ramos',
    customerName: 'Diego Ramos',
    customerInitials: 'DR',
    rating: 4,
    featured: false,
    displayOrder: 31,
    reviewText:
      'Not bad at all.',
  },
  {
    id: 'review-amira-saleh',
    customerName: 'Amira Saleh',
    customerInitials: 'AS',
    rating: 4,
    featured: false,
    displayOrder: 32,
    reviewText:
      'Placed an order last week. Support actually replied when I emailed them.',
  },
  {
    id: 'review-ryan-keller',
    customerName: 'Ryan Keller',
    customerInitials: 'RK',
    rating: 5,
    featured: false,
    displayOrder: 33,
    reviewText:
      'I’m not very techy and I still managed fine. That says a lot.',
  },
  {
    id: 'review-leila-noor',
    customerName: 'Leila Noor',
    customerInitials: 'LN',
    rating: 5,
    featured: false,
    displayOrder: 34,
    reviewText:
      'Started small on purpose. Felt better that way.',
  },
  {
    id: 'review-tom-brennan',
    customerName: 'Tom Brennan',
    customerInitials: 'TB',
    rating: 5,
    featured: false,
    displayOrder: 35,
    reviewText:
      'Site didn’t feel sketchy at checkout, which was my main worry.',
  },
  {
    id: 'review-yasmin-ali',
    customerName: 'Yasmin Ali',
    customerInitials: 'YA',
    rating: 5,
    featured: false,
    displayOrder: 36,
    reviewText:
      'Had a typo in my email. Support sorted it without making me feel dumb.',
  },
  {
    id: 'review-ben-carter',
    customerName: 'Ben Carter',
    customerInitials: 'BC',
    rating: 5,
    featured: false,
    displayOrder: 37,
    reviewText:
      'Used them twice now. Second time felt familiar in a good way.',
  },
  {
    id: 'review-camila-duarte',
    customerName: 'Camila Duarte',
    customerInitials: 'CD',
    rating: 4,
    featured: false,
    displayOrder: 38,
    reviewText:
      'Not the fastest delivery I’ve ever seen, but I always knew where things stood.',
  },
  {
    id: 'review-nate-walsh',
    customerName: 'Nate Walsh',
    customerInitials: 'NW',
    rating: 5,
    featured: false,
    displayOrder: 39,
    reviewText:
      'Honestly expected worse. It was a normal online order.',
  },
  {
    id: 'review-hana-kim',
    customerName: 'Hana Kim',
    customerInitials: 'HK',
    rating: 5,
    featured: false,
    displayOrder: 40,
    reviewText:
      'My coworker recommended it. Glad I tried.',
  },
  {
    id: 'review-luis-ortega',
    customerName: 'Luis Ortega',
    customerInitials: 'LO',
    rating: 5,
    featured: false,
    displayOrder: 41,
    reviewText:
      'Quietly reliable. That’s all I wanted.',
  },
  {
    id: 'review-farah-iqbal',
    customerName: 'Farah Iqbal',
    customerInitials: 'FI',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 42,
    reviewText:
      'Instagram order went through without me stressing.',
  },
  {
    id: 'review-jake-miller',
    customerName: 'Jake Miller',
    customerInitials: 'JM',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 43,
    reviewText:
      'Used it for a couple Instagram posts before a launch. Helpful.',
  },
  {
    id: 'review-noor-abbas',
    customerName: 'Noor Abbas',
    customerInitials: 'NA',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 44,
    reviewText:
      'My bakery IG needed a nudge. This did the job.',
  },
  {
    id: 'review-sam-reid',
    customerName: 'Sam Reid',
    customerInitials: 'SR',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 45,
    reviewText:
      'Easy Instagram purchase. Would do it again next month.',
  },
  {
    id: 'review-aisha-rahman',
    customerName: 'Aisha Rahman',
    customerInitials: 'AR',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 46,
    reviewText:
      'Reel order was fine. No weird requests.',
  },
  {
    id: 'review-drew-collins',
    customerName: 'Drew Collins',
    customerInitials: 'DC',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 47,
    reviewText:
      'Picked a mid-size Instagram package. Felt right for my page.',
  },
  {
    id: 'review-mei-lin',
    customerName: 'Mei Lin',
    customerInitials: 'ML',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 48,
    reviewText:
      'Creator account order. Took a bit, still happy.',
  },
  {
    id: 'review-carl-jensen',
    customerName: 'Carl Jensen',
    customerInitials: 'CJ',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 49,
    reviewText:
      'Instagram likes for one post. Exactly what I wanted — nothing extra.',
  },
  {
    id: 'review-rania-haddad',
    customerName: 'Rania Haddad',
    customerInitials: 'RH',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 50,
    reviewText:
      'I’ve ordered Instagram stuff here three times. Still coming back.',
  },
  {
    id: 'review-pete-morgan',
    customerName: 'Pete Morgan',
    customerInitials: 'PM',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 51,
    reviewText:
      'Sister placed the Instagram order for me. She said it was easy.',
  },
  {
    id: 'review-ivy-chen',
    customerName: 'Ivy Chen',
    customerInitials: 'IC',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 52,
    reviewText:
      'Was nervous first time. Instagram checkout calmed me down.',
  },
  {
    id: 'review-hassan-malik',
    customerName: 'Hassan Malik',
    customerInitials: 'HM',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 53,
    reviewText:
      'Good for a small IG push. Not magic, just useful.',
  },
  {
    id: 'review-nina-volkov',
    customerName: 'Nina Volkov',
    customerInitials: 'NV',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 54,
    reviewText:
      'Instagram comments order landed okay. Support was chill.',
  },
  {
    id: 'review-cole-parker',
    customerName: 'Cole Parker',
    customerInitials: 'CP',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 55,
    reviewText:
      'My IG campaign week was less stressful because of this.',
  },
  {
    id: 'review-zara-khan',
    customerName: 'Zara Khan',
    customerInitials: 'ZK',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 56,
    reviewText:
      'Simple Instagram buy. That’s rare online these days.',
  },
  {
    id: 'review-alex-rivera',
    customerName: 'Alex Rivera',
    customerInitials: 'AR',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 57,
    reviewText:
      'Followers package for Instagram. Started small, might go bigger later.',
  },
  {
    id: 'review-layla-osman',
    customerName: 'Layla Osman',
    customerInitials: 'LO',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 58,
    reviewText:
      'Views on a Reel. Worked. No complaints.',
  },
  {
    id: 'review-mark-hughes',
    customerName: 'Mark Hughes',
    customerInitials: 'MH',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 59,
    reviewText:
      'Instagram order status made sense when I checked later that night.',
  },
  {
    id: 'review-tara-singh',
    customerName: 'Tara Singh',
    customerInitials: 'TS',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 60,
    reviewText:
      'Would recommend for Instagram if you want something uncomplicated.',
  },
  {
    id: 'review-joe-bennett',
    customerName: 'Joe Bennett',
    customerInitials: 'JB',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 61,
    reviewText:
      'One Instagram order felt slow. Still finished. Giving 4.',
  },
  {
    id: 'review-sara-cohen',
    customerName: 'Sara Cohen',
    customerInitials: 'SC',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 62,
    reviewText:
      'IG post boost before a sale weekend. Glad I didn’t overthink it.',
  },
  {
    id: 'review-dev-patel',
    customerName: 'Dev Patel',
    customerInitials: 'DP',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 63,
    reviewText:
      'Honest Instagram review: did what I paid for.',
  },
  {
    id: 'review-mila-costa',
    customerName: 'Mila Costa',
    customerInitials: 'MC',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 64,
    reviewText:
      'Used NovaLikes only for Instagram so far. Positive so far.',
  },
  {
    id: 'review-owen-blake',
    customerName: 'Owen Blake',
    customerInitials: 'OB',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 65,
    reviewText:
      'My personal IG, not a brand. Still felt welcoming.',
  },
  {
    id: 'review-rhea-kapoor',
    customerName: 'Rhea Kapoor',
    customerInitials: 'RK',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 66,
    reviewText:
      'Instagram package options weren’t overwhelming. Nice.',
  },
  {
    id: 'review-gabe-foster',
    customerName: 'Gabe Foster',
    customerInitials: 'GF',
    platform: 'instagram',
    rating: 4,
    featured: false,
    displayOrder: 67,
    reviewText:
      'Bit of wait on Instagram delivery. Overall fine.',
  },
  {
    id: 'review-lana-meyers',
    customerName: 'Lana Meyers',
    customerInitials: 'LM',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 68,
    reviewText:
      'Second Instagram order this quarter. Same easy vibe.',
  },
  {
    id: 'review-finn-sullivan',
    customerName: 'Finn Sullivan',
    customerInitials: 'FS',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 69,
    reviewText:
      'Bought likes for an IG carousel. No issues.',
  },
  {
    id: 'review-dina-yusuf',
    customerName: 'Dina Yusuf',
    customerInitials: 'DY',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 70,
    reviewText:
      'If you just want an Instagram order done, this works.',
  },
  {
    id: 'review-will-harper',
    customerName: 'Will Harper',
    customerInitials: 'WH',
    platform: 'instagram',
    rating: 5,
    featured: false,
    displayOrder: 71,
    reviewText:
      'Creator friend sent me here for Instagram. Thanks, friend.',
  },
  {
    id: 'review-anya-petrova',
    customerName: 'Anya Petrova',
    customerInitials: 'AP',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 72,
    reviewText:
      'TikTok order was fine. No complaints.',
  },
  {
    id: 'review-reed-lawson',
    customerName: 'Reed Lawson',
    customerInitials: 'RL',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 73,
    reviewText:
      'Used it for one TikTok video. Did the job.',
  },
  {
    id: 'review-sana-qureshi',
    customerName: 'Sana Qureshi',
    customerInitials: 'SQ',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 74,
    reviewText:
      'Side-hustle TikTok clip. Happy enough.',
  },
  {
    id: 'review-hugh-dalton',
    customerName: 'Hugh Dalton',
    customerInitials: 'HD',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 75,
    reviewText:
      'Third TikTok order with them. Still good.',
  },
  {
    id: 'review-vera-novak',
    customerName: 'Vera Novak',
    customerInitials: 'VN',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 76,
    reviewText:
      'I’m not a power user. TikTok checkout still made sense.',
  },
  {
    id: 'review-ian-brooks',
    customerName: 'Ian Brooks',
    customerInitials: 'IB',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 77,
    reviewText:
      'Smaller TikTok package first. Glad I tested.',
  },
  {
    id: 'review-nora-feld',
    customerName: 'Nora Feld',
    customerInitials: 'NF',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 78,
    reviewText:
      'TikTok views for a product demo. Worked.',
  },
  {
    id: 'review-kyle-sanders',
    customerName: 'Kyle Sanders',
    customerInitials: 'KS',
    platform: 'tiktok',
    rating: 4,
    featured: false,
    displayOrder: 79,
    reviewText:
      'One TikTok order felt slow. Otherwise okay.',
  },
  {
    id: 'review-juno-park',
    customerName: 'Juno Park',
    customerInitials: 'JP',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 80,
    reviewText:
      'TikTok followers for my creator page. Straightforward.',
  },
  {
    id: 'review-brad-coleman',
    customerName: 'Brad Coleman',
    customerInitials: 'BC',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 81,
    reviewText:
      'Would use again for another TikTok push.',
  },
  {
    id: 'review-elise-martin',
    customerName: 'Elise Martin',
    customerInitials: 'EM',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 82,
    reviewText:
      'Paid, waited, checked later. TikTok order done.',
  },
  {
    id: 'review-ravi-desai',
    customerName: 'Ravi Desai',
    customerInitials: 'RD',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 83,
    reviewText:
      'TikTok likes. Nothing fancy. That’s fine by me.',
  },
  {
    id: 'review-tess-morgan',
    customerName: 'Tess Morgan',
    customerInitials: 'TM',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 84,
    reviewText:
      'Support helped when I was unsure about TikTok. Polite.',
  },
  {
    id: 'review-gina-flores',
    customerName: 'Gina Flores',
    customerInitials: 'GF',
    platform: 'tiktok',
    rating: 4,
    featured: false,
    displayOrder: 85,
    reviewText:
      'Decent TikTok experience. 4 stars because of wait time.',
  },
  {
    id: 'review-paul-richter',
    customerName: 'Paul Richter',
    customerInitials: 'PR',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 86,
    reviewText:
      'My first ever TikTok boost order. Less scary than expected.',
  },
  {
    id: 'review-rita-gomez',
    customerName: 'Rita Gomez',
    customerInitials: 'RG',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 87,
    reviewText:
      'TikTok side account. Order went through cleanly.',
  },
  {
    id: 'review-sean-murphy',
    customerName: 'Sean Murphy',
    customerInitials: 'SM',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 88,
    reviewText:
      'Using NovaLikes only on TikTok right now. Positive.',
  },
  {
    id: 'review-maya-tran',
    customerName: 'Maya Tran',
    customerInitials: 'MT',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 89,
    reviewText:
      'Product TikTok needed eyes. Got them.',
  },
  {
    id: 'review-todd-ellis',
    customerName: 'Todd Ellis',
    customerInitials: 'TE',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 90,
    reviewText:
      'Quiet TikTok order. No spammy emails after. Appreciate that.',
  },
  {
    id: 'review-iris-weber',
    customerName: 'Iris Weber',
    customerInitials: 'IW',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 91,
    reviewText:
      'TikTok package fit my budget. Didn’t feel pushed higher.',
  },
  {
    id: 'review-vince-romano',
    customerName: 'Vince Romano',
    customerInitials: 'VR',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 92,
    reviewText:
      'Another TikTok video next month — I’ll be back.',
  },
  {
    id: 'review-pia-andersson',
    customerName: 'Pia Andersson',
    customerInitials: 'PA',
    platform: 'tiktok',
    rating: 5,
    featured: false,
    displayOrder: 93,
    reviewText:
      'TikTok order confirmation showed up. Tracking helped later.',
  },
  {
    id: 'review-greg-nolan',
    customerName: 'Greg Nolan',
    customerInitials: 'GN',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 94,
    reviewText:
      'Facebook Page order went okay.',
  },
  {
    id: 'review-lila-hartmann',
    customerName: 'Lila Hartmann',
    customerInitials: 'LH',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 95,
    reviewText:
      'Business Page on Facebook. Easy enough.',
  },
  {
    id: 'review-cora-blake',
    customerName: 'Cora Blake',
    customerInitials: 'CB',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 96,
    reviewText:
      'Local shop Facebook Page. Happy with the result.',
  },
  {
    id: 'review-nick-steiner',
    customerName: 'Nick Steiner',
    customerInitials: 'NS',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 97,
    reviewText:
      'Facebook post likes for one promo. Exactly that — one post.',
  },
  {
    id: 'review-jade-connolly',
    customerName: 'Jade Connolly',
    customerInitials: 'JC',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 98,
    reviewText:
      'Clinic Facebook Page. Process was calm.',
  },
  {
    id: 'review-eric-vogel',
    customerName: 'Eric Vogel',
    customerInitials: 'EV',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 99,
    reviewText:
      'Coworker mentioned NovaLikes. Facebook order checked out.',
  },
  {
    id: 'review-mona-sharif',
    customerName: 'Mona Sharif',
    customerInitials: 'MS',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 100,
    reviewText:
      'Not my first Facebook order here. Still easy.',
  },
  {
    id: 'review-seth-rowan',
    customerName: 'Seth Rowan',
    customerInitials: 'SR',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 101,
    reviewText:
      'Facebook followers for the Page. Good enough.',
  },
  {
    id: 'review-bella-moretti',
    customerName: 'Bella Moretti',
    customerInitials: 'BM',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 102,
    reviewText:
      'Team shared status so everyone could see. Helpful.',
  },
  {
    id: 'review-hugo-blanc',
    customerName: 'Hugo Blanc',
    customerInitials: 'HB',
    platform: 'facebook',
    rating: 4,
    featured: false,
    displayOrder: 103,
    reviewText:
      'Facebook order took longer than hoped. Still worked.',
  },
  {
    id: 'review-kira-novak',
    customerName: 'Kira Novak',
    customerInitials: 'KN',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 104,
    reviewText:
      'Page likes, not post likes — got the right thing. Relief.',
  },
  {
    id: 'review-dan-pierce',
    customerName: 'Dan Pierce',
    customerInitials: 'DP',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 105,
    reviewText:
      'Small business Facebook push. Would recommend.',
  },
  {
    id: 'review-elle-navarro',
    customerName: 'Elle Navarro',
    customerInitials: 'EN',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 106,
    reviewText:
      'Facebook checkout on desktop was fine. No fuss.',
  },
  {
    id: 'review-roy-atkins',
    customerName: 'Roy Atkins',
    customerInitials: 'RA',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 107,
    reviewText:
      'Our Facebook promo week was less chaotic thanks to this.',
  },
  {
    id: 'review-skye-benton',
    customerName: 'Skye Benton',
    customerInitials: 'SB',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 108,
    reviewText:
      'Polite support on a Facebook question. No hard sell.',
  },
  {
    id: 'review-pat-crowley',
    customerName: 'Pat Crowley',
    customerInitials: 'PC',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 109,
    reviewText:
      'Facebook Page likes. Quiet success.',
  },
  {
    id: 'review-zoe-maddox',
    customerName: 'Zoe Maddox',
    customerInitials: 'ZM',
    platform: 'facebook',
    rating: 4,
    featured: false,
    displayOrder: 110,
    reviewText:
      'Giving 4 — Facebook delivery wasn’t instant, but fair.',
  },
  {
    id: 'review-mike-torres',
    customerName: 'Mike Torres',
    customerInitials: 'MT',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 111,
    reviewText:
      'Second Facebook order for the same Page. Consistent.',
  },
  {
    id: 'review-jon-hale',
    customerName: 'Jon Hale',
    customerInitials: 'JH',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 112,
    reviewText:
      'Facebook post for a weekend sale. Did what we needed.',
  },
  {
    id: 'review-kim-orth',
    customerName: 'Kim Orth',
    customerInitials: 'KO',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 113,
    reviewText:
      'Business manager approved it after I showed them the order flow. Ha.',
  },
  {
    id: 'review-lee-prado',
    customerName: 'Lee Prado',
    customerInitials: 'LP',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 114,
    reviewText:
      'Facebook only for us so far. Positive start.',
  },
  {
    id: 'review-ana-ruiz',
    customerName: 'Ana Ruiz',
    customerInitials: 'AR',
    platform: 'facebook',
    rating: 5,
    featured: false,
    displayOrder: 115,
    reviewText:
      'Simple Facebook buy for a community Page.',
  },
  {
    id: 'review-raj-chopra',
    customerName: 'Raj Chopra',
    customerInitials: 'RC',
    rating: 5,
    featured: false,
    displayOrder: 116,
    reviewText:
      'I compared a few sites and picked NovaLikes because it felt calmer. Ordered once, waited, checked status, moved on with my day. That’s ideal for me.',
  },
  {
    id: 'review-sue-lind',
    customerName: 'Sue Lind',
    customerInitials: 'SL',
    rating: 5,
    featured: false,
    displayOrder: 117,
    reviewText:
      'Skeptical going in. The order itself was boring in the best way — no weird steps. I’ll use them again for the next campaign.',
  },
  {
    id: 'review-ted-boone',
    customerName: 'Ted Boone',
    customerInitials: 'TB',
    rating: 4,
    featured: false,
    displayOrder: 118,
    reviewText:
      'Weekend support was a little slower, weekday was fine. The order completed without me babysitting it. Satisfied overall.',
  },
  {
    id: 'review-violet-shaw',
    customerName: 'Violet Shaw',
    customerInitials: 'VS',
    rating: 5,
    featured: false,
    displayOrder: 119,
    reviewText:
      'I manage a tiny brand and don’t have time for complicated tools. This was pick, pay, wait. Works for my brain.',
  },
  {
    id: 'review-hugo-marsh',
    customerName: 'Hugo Marsh',
    customerInitials: 'HM',
    rating: 5,
    featured: false,
    displayOrder: 120,
    reviewText:
      'Told my sister she could place it. She did. If she can do it, anyone can. Lol.',
  }
];
