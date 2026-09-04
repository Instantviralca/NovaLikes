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
      'Worked great for me, thanks. That’s really all I can say.',
  },
  {
    id: 'review-marcus-okoro',
    customerName: 'Marcus Okoro',
    customerInitials: 'MO',
    rating: 4,
    featured: false,
    displayOrder: 23,
    reviewText:
      'All good on my end. Overall, it was fine.',
  },
  {
    id: 'review-sofia-castile',
    customerName: 'Sofia Castile',
    customerInitials: 'SC',
    rating: 4,
    featured: false,
    displayOrder: 24,
    reviewText:
      'I’d buy again. That probably says enough.',
  },
  {
    id: 'review-jamal-brooks',
    customerName: 'Jamal Brooks',
    customerInitials: 'JB',
    rating: 4,
    featured: false,
    displayOrder: 25,
    reviewText:
      'Solid overall. No drama, which I appreciated.',
  },
  {
    id: 'review-elena-vargas',
    customerName: 'Elena Vargas',
    customerInitials: 'EV',
    rating: 4,
    featured: false,
    displayOrder: 26,
    reviewText:
      'Pretty smooth order overall. That was my experience with it.',
  },
  {
    id: 'review-chris-nguyen',
    customerName: 'Chris Nguyen',
    customerInitials: 'CN',
    rating: 4,
    featured: false,
    displayOrder: 27,
    reviewText:
      'Happy with it overall. Simple as that.',
  },
  {
    id: 'review-nadia-hassan',
    customerName: 'Nadia Hassan',
    customerInitials: 'NH',
    rating: 4,
    featured: false,
    displayOrder: 28,
    reviewText:
      'Fine for what I paid. I was okay with the experience.',
  },
  {
    id: 'review-omar-farouk',
    customerName: 'Omar Farouk',
    customerInitials: 'OF',
    rating: 4,
    featured: false,
    displayOrder: 29,
    reviewText:
      'Overall, it was an okay experience. Nothing more to add.',
  },
  {
    id: 'review-kayla-stone',
    customerName: 'Kayla Stone',
    customerInitials: 'KS',
    rating: 4,
    featured: false,
    displayOrder: 30,
    reviewText:
      'It took a while, but it did finish in the end.',
  },
  {
    id: 'review-diego-ramos',
    customerName: 'Diego Ramos',
    customerInitials: 'DR',
    rating: 4,
    featured: false,
    displayOrder: 31,
    reviewText:
      'Honestly, not bad at all. That’s my take on it.',
  },
  {
    id: 'review-amira-saleh',
    customerName: 'Amira Saleh',
    customerInitials: 'AS',
    rating: 4,
    featured: false,
    displayOrder: 32,
    reviewText:
      'I placed an order last week and emailed support. They actually replied when I reached out.',
  },
  {
    id: 'review-ryan-keller',
    customerName: 'Ryan Keller',
    customerInitials: 'RK',
    rating: 5,
    featured: false,
    displayOrder: 33,
    reviewText:
      'I’m not very techy, and I still managed fine. That says a lot for me.',
  },
  {
    id: 'review-leila-noor',
    customerName: 'Leila Noor',
    customerInitials: 'LN',
    rating: 5,
    featured: false,
    displayOrder: 34,
    reviewText:
      'I started small on purpose, and I felt better doing it that way.',
  },
  {
    id: 'review-tom-brennan',
    customerName: 'Tom Brennan',
    customerInitials: 'TB',
    rating: 5,
    featured: false,
    displayOrder: 35,
    reviewText:
      'My biggest worry was checkout feeling sketchy, but the site didn’t give me that feeling.',
  },
  {
    id: 'review-yasmin-ali',
    customerName: 'Yasmin Ali',
    customerInitials: 'YA',
    rating: 5,
    featured: false,
    displayOrder: 36,
    reviewText:
      'I had a typo in my email, and support sorted it out without making me feel dumb about it.',
  },
  {
    id: 'review-ben-carter',
    customerName: 'Ben Carter',
    customerInitials: 'BC',
    rating: 5,
    featured: false,
    displayOrder: 37,
    reviewText:
      'I’ve used them twice now. The second time felt familiar in a good way.',
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
      'I honestly expected worse, but it felt like a normal online order. That was a good surprise.',
  },
  {
    id: 'review-hana-kim',
    customerName: 'Hana Kim',
    customerInitials: 'HK',
    rating: 5,
    featured: false,
    displayOrder: 40,
    reviewText:
      'A coworker recommended it to me. I’m glad I gave it a try.',
  },
  {
    id: 'review-luis-ortega',
    customerName: 'Luis Ortega',
    customerInitials: 'LO',
    rating: 5,
    featured: false,
    displayOrder: 41,
    reviewText:
      'Quietly reliable, which is really all I wanted.',
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
      'My Instagram order went through without me having to stress about it.',
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
      'I used it for a couple of Instagram posts before a launch. It was helpful.',
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
      'My bakery’s Instagram needed a little nudge, and this did the job.',
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
      'Easy Instagram purchase. I’d do it again next month.',
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
      'The Reel order was fine, and there were no weird requests along the way.',
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
      'I picked a mid-size Instagram package, and it felt like the right fit for my page.',
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
      'It was for a creator account. It took a bit, but I’m still happy with it.',
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
      'I bought Instagram likes for one post and got exactly what I wanted, nothing extra.',
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
      'I’ve ordered Instagram stuff here three times now, and I’m still coming back.',
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
      'My sister placed the Instagram order for me, and she said it was easy.',
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
      'I was nervous the first time, but the Instagram checkout made me feel calmer.',
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
      'Good for a small Instagram push. It’s not magic, but it was useful for me.',
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
      'My Instagram comments order came through okay, and support was pretty chill.',
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
      'My Instagram campaign week was less stressful because of this.',
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
      'Simple Instagram purchase. That feels rare online these days.',
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
      'I started with a smaller Instagram followers package. I might go bigger later.',
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
      'I ordered views for a Reel. It worked, and I had no complaints.',
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
      'When I checked later that night, the Instagram order status was easy to understand.',
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
      'I’d recommend it for Instagram if you want something uncomplicated.',
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
      'One Instagram order felt a bit slow, but it still finished. Four stars from me.',
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
      'I used it for an Instagram post boost before a sale weekend. Glad I didn’t overthink it.',
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
      'My honest take on the Instagram order: it did what I paid for.',
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
      'I’ve only used NovaLikes for Instagram so far, and the experience has been positive.',
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
      'I used it for my personal Instagram, not a brand account, and still felt welcome.',
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
      'The Instagram package options were easy to look through without feeling overwhelming.',
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
      'There was a bit of a wait on the Instagram delivery, but overall it was fine.',
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
      'This was my second Instagram order this quarter, and it had the same easy feel as before.',
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
      'I bought likes for an Instagram carousel and had no issues with the order.',
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
      'If you just want an Instagram order done without making it complicated, this works.',
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
      'A creator friend sent me here for Instagram. Thanks, friend.',
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
      'My TikTok order went fine. No complaints from me.',
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
      'I used it for one TikTok video, and it did the job.',
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
      'Used it for a side-hustle TikTok clip. I’m happy enough with how it went.',
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
      'This was my third TikTok order with them, and it’s still been good.',
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
      'I’m not a power user, but the TikTok checkout still made sense to me.',
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
      'I started with a smaller TikTok package first. Glad I tested it that way.',
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
      'I ordered TikTok views for a product demo. It worked.',
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
      'One TikTok order felt slow, but otherwise the experience was okay.',
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
      'I ordered TikTok followers for my creator page. The process was straightforward.',
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
      'I’d use NovaLikes again for another TikTok push.',
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
      'Paid, waited, checked back later, and the TikTok order was done.',
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
      'I ordered TikTok likes. Nothing fancy, and that’s completely fine by me.',
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
      'Support helped when I was unsure about TikTok, and they were polite about it.',
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
      'Decent TikTok experience overall. I’m giving four stars because of the wait time.',
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
      'This was my first ever TikTok boost order, and it was less scary than I expected.',
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
      'I used it for a side TikTok account, and the order went through cleanly.',
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
      'I’m only using NovaLikes for TikTok right now, and so far it’s been positive.',
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
      'My product TikTok needed more eyes on it, and that’s what I got.',
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
      'The TikTok order was quiet and straightforward. I also appreciated not getting spammy emails afterward.',
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
      'The TikTok package fit my budget, and I didn’t feel pushed toward a higher one.',
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
      'I’ve got another TikTok video next month, and I’ll be back.',
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
      'The TikTok order confirmation came through, and the tracking was helpful later.',
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
      'My Facebook Page order went okay overall.',
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
      'I used it for a business Page on Facebook. Easy enough.',
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
      'I used it for my local shop’s Facebook Page, and I’m happy with the result.',
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
      'I bought Facebook post likes for one promo, and that’s exactly what I wanted for that one post.',
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
      'I used it for a clinic Facebook Page. The process felt calm.',
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
      'A coworker mentioned NovaLikes, so I tried it for Facebook. The order checked out fine.',
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
      'This wasn’t my first Facebook order here, and it’s still been easy.',
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
      'I ordered Facebook followers for the Page. Good enough for me.',
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
      'The team shared the status so everyone could see where things stood. That was helpful.',
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
      'The Facebook order took longer than I hoped, but it still worked in the end.',
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
      'I needed Page likes, not post likes, and I got the right thing. That was a relief.',
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
      'I used it for a small business Facebook push, and I’d recommend it.',
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
      'I placed the Facebook order on desktop. Checkout was fine, no fuss.',
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
      'Our Facebook promo week felt less chaotic because of this.',
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
      'Support was polite when I had a Facebook question, and there was no hard sell.',
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
      'I ordered Facebook Page likes. Quiet success.',
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
      'I’m giving four stars because the Facebook delivery wasn’t instant, but it was fair.',
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
      'This was my second Facebook order for the same Page, and the experience was consistent.',
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
      'I used it for a Facebook post during a weekend sale. It did what we needed.',
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
      'Our business manager approved it after I showed them the order flow. Ha.',
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
      'We’ve only used NovaLikes for Facebook so far, but it’s been a positive start.',
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
      'Simple Facebook purchase for a community Page.',
  },
  {
    id: 'review-raj-chopra',
    customerName: 'Raj Chopra',
    customerInitials: 'RC',
    rating: 5,
    featured: false,
    displayOrder: 116,
    reviewText:
      'I compared a few sites and picked NovaLikes because it felt calmer. I ordered once, waited, checked the status, and moved on with my day. That’s ideal for me.',
  },
  {
    id: 'review-sue-lind',
    customerName: 'Sue Lind',
    customerInitials: 'SL',
    rating: 5,
    featured: false,
    displayOrder: 117,
    reviewText:
      'I was skeptical going in. The order itself was boring in the best way, with no weird steps. I’ll use them again for the next campaign.',
  },
  {
    id: 'review-ted-boone',
    customerName: 'Ted Boone',
    customerInitials: 'TB',
    rating: 4,
    featured: false,
    displayOrder: 118,
    reviewText:
      'Weekend support was a little slower, but weekday support was fine. The order completed without me having to babysit it, so overall I’m satisfied.',
  },
  {
    id: 'review-violet-shaw',
    customerName: 'Violet Shaw',
    customerInitials: 'VS',
    rating: 5,
    featured: false,
    displayOrder: 119,
    reviewText:
      'I manage a tiny brand and don’t have time for complicated tools. This was basically pick, pay, and wait. That works for my brain.',
  },
  {
    id: 'review-hugo-marsh',
    customerName: 'Hugo Marsh',
    customerInitials: 'HM',
    rating: 5,
    featured: false,
    displayOrder: 120,
    reviewText:
      'I told my sister she could place the order, and she did. If she can do it, anyone can. Lol.',
  }
];
