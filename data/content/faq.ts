import type { FAQItem } from '@/types/content';
import type { FAQCategoryId } from '@/types/copywriting';
import { faqHubItems } from '@/data/content/faq-hub';

/**
 * Shared FAQ pool. Pages reference entries by id — no duplicated Q&A copy.
 * Homepage FAQs: homepageFilter entries referenced from homepage.ts.
 * FAQ hub (/faq): Document 13.03 entries from faq-hub.ts.
 */
export const faqItems: FAQItem[] = [
  // Homepage FAQ set — Instagram followers commercial cluster
  {
    id: 'faq-home-buy-followers',
    question: 'Can I buy Instagram followers?',
    answer:
      'Yes. NovaLikes offers Instagram follower packages through its website. Select a package, provide the public username and complete checkout to place an order. Review package details on [Instagram Followers Packages](/buy-instagram-followers).',
    homepageFilter: 'General',
    order: 1,
  },
  {
    id: 'faq-home-how-buy-followers',
    question: 'How do I buy Instagram followers?',
    answer:
      'Choose a follower package, enter the correct public Instagram username, review the order and complete checkout. No Instagram password should be required. Start on the [Instagram Followers Packages](/buy-instagram-followers) page.',
    homepageFilter: 'Orders',
    order: 2,
  },
  {
    id: 'faq-home-how-works',
    question: 'How does NovaLikes work?',
    answer:
      'Choose a service for Instagram, TikTok or Facebook, compare packages on the service page, enter the public username or content URL required, and complete checkout. After payment is confirmed, monitor available updates on the [Track Order](/track-order) page with your order ID and email. Start with a popular option such as [Instagram Followers Packages](/buy-instagram-followers) when you know which platform to grow first.',
    homepageFilter: 'General',
    order: 3,
  },
  {
    id: 'faq-home-choose-package',
    question: 'How do I choose the right package?',
    answer:
      'Pick a package that matches your platform, goals and budget. Each service page lists quantities, prices, delivery estimates and eligibility details before you buy. Review refill or gradual delivery terms when they are shown for that package. Compare options on pages such as [Buy Instagram Likes](/buy-instagram-likes) or [Instagram Followers Packages](/buy-instagram-followers), or [Contact](/contact) support if you need help deciding.',
    homepageFilter: 'General',
    order: 4,
  },
  {
    id: 'faq-home-password',
    question: 'Do I need to provide my Instagram password?',
    answer:
      'No. NovaLikes only requires the public username needed to process the selected service. Never share login credentials, recovery codes or two-factor codes with anyone claiming to process your order.',
    homepageFilter: 'Safety',
    order: 5,
  },
  {
    id: 'faq-home-where-buy',
    question: 'Where can I buy Instagram followers?',
    answer:
      'Instagram follower packages can be purchased from social media service websites such as NovaLikes. Compare the package details, policies, delivery information and support before ordering. Review available options on [Instagram Followers Packages](/buy-instagram-followers).',
    homepageFilter: 'General',
    order: 6,
  },
  {
    id: 'faq-home-likes-views',
    question: 'Can I buy Instagram likes and views as well?',
    answer:
      'Yes. NovaLikes also provides dedicated package pages for [Instagram likes](/buy-instagram-likes) and [Instagram views](/buy-instagram-views).',
    homepageFilter: 'Platforms',
    order: 7,
  },
  {
    id: 'faq-home-engagement-guarantee',
    question: 'Will buying followers guarantee engagement or sales?',
    answer:
      'No. Follower count alone cannot guarantee engagement, reach, leads or sales. Content quality and genuine audience interaction remain important.',
    homepageFilter: 'General',
    order: 8,
  },
  {
    id: 'faq-home-check-before',
    question: 'What should I check before buying followers?',
    answer:
      'Review the provider’s package details, account-access requirements, delivery explanation, support options and refund or refill terms. NovaLikes publishes ordering steps and policy links before checkout.',
    homepageFilter: 'Safety',
    order: 9,
  },
  {
    id: 'faq-home-public-account',
    question: 'Do I need a public account to place an order?',
    answer:
      'Yes. The profile, Page, post or video must be public while your order is being delivered, otherwise delivery cannot start or finish. Once delivery is complete you can switch it back to private. Please also keep the same username — changing it during an order or the 6-month refill period can stop delivery and refills.',
    homepageFilter: 'Safety',
    order: 10,
  },
  {
    id: 'faq-home-multiple-services',
    question: 'Can I order more than one service at the same time?',
    answer:
      'Yes. You can place separate orders across Instagram, TikTok and Facebook. Complete checkout for each purchase and provide the correct public username or content URL for every service. Track each order independently with its own order ID and email on the [Track Order](/track-order) page.',
    homepageFilter: 'Orders',
    order: 11,
  },
  {
    id: 'faq-home-order-start',
    question: 'When will my order start?',
    answer:
      'Most orders start within 6–8 hours after payment is confirmed, and standard delivery is usually completed within 4–6 hours after the order starts. You can follow progress on the [Track Order](/track-order) page with your order ID and email. If you asked for gradual delivery, the order is spread over a longer period.',
    homepageFilter: 'Delivery',
    order: 12,
  },
  {
    id: 'faq-home-track-order',
    question: 'Can I track my order?',
    answer:
      'Yes. Customers can use the order-tracking function provided by NovaLikes to check the current order status. Open the [Track Order](/track-order) page and enter the order ID and email from your confirmation.',
    homepageFilter: 'Delivery',
    order: 13,
  },
  {
    id: 'faq-home-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Yes. Every NovaLikes service can be delivered quickly or gradually. Add a note at checkout, or message us on WhatsApp after ordering, and tell us the pace you prefer. Without a note we use standard delivery, which is usually completed within 4–6 hours after the order starts.',
    homepageFilter: 'Delivery',
    order: 14,
  },
  {
    id: 'faq-home-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Yes. Every NovaLikes service includes a 6-month refill. If delivered followers, likes, views or comments drop within 6 months of your order being delivered, message us on WhatsApp (+44 7454 758272) with your order ID and we will refill the drop. To stay eligible, do not change your username, and keep the profile or content public while the order or a refill is being delivered — you can make it private once delivery is complete.',
    homepageFilter: 'Delivery',
    order: 15,
  },
  {
    id: 'faq-home-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      "Yes. NovaLikes offers a 30-Day Money-Back Guarantee on eligible orders under the [Refund Policy](/refund-policy). Refund requests must be made within 30 days of the original purchase date and are reviewed according to the Refund Policy and the circumstances of the order. Contact support with your order ID and checkout email if you need help with an eligible purchase.",
    homepageFilter: 'Delivery',
    order: 16,
  },
  {
    id: 'faq-home-platforms',
    question: 'Which social media platforms do you support?',
    answer:
      'NovaLikes supports Instagram, TikTok and Facebook. Examples include [Instagram Followers Packages](/buy-instagram-followers), [Buy Instagram Likes](/buy-instagram-likes), [Buy TikTok Followers](/buy-tiktok-followers), [Buy TikTok Views](/buy-tiktok-views), [Buy Facebook Followers](/buy-facebook-followers), [Buy Facebook Page Likes](/buy-facebook-page-likes) and [Buy Facebook Post Likes](/buy-facebook-post-likes).',
    homepageFilter: 'Platforms',
    order: 17,
  },
  {
    id: 'faq-home-need-help',
    question: 'What should I do if I need help?',
    answer:
      'Visit the [Contact](/contact) page for help with packages, checkout, delivery, tracking or an existing purchase. Include your order ID and checkout email when asking about an order. For pre-purchase questions, share the platform and service you are considering so support can respond with clearer guidance.',
    homepageFilter: 'General',
    order: 18,
  },
  {
    id: 'faq-password',
    question: 'Do I need to share my social media password?',
    answer:
      'No. NovaLikes does not require your Instagram, TikTok, or Facebook password. Orders use public information such as a username, profile URL, post link, page URL, or video link, depending on the service you select.',
  },
  {
    id: 'faq-order-start',
    question: 'How quickly will my order begin?',
    answer:
      'Most orders begin within 6–8 hours after payment is confirmed, and standard delivery is usually completed within 4–6 hours after the order starts. Gradual delivery takes longer by design.',
  },
  {
    id: 'faq-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Yes. Every NovaLikes service can be delivered quickly or gradually. Add a note at checkout, or message us on WhatsApp after ordering, and tell us the pace you prefer. Without a note we use standard delivery, which is usually completed within 4–6 hours after the order starts.',
  },
  {
    id: 'faq-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Yes. Every NovaLikes service includes a 6-month refill. If delivered followers, likes, views or comments drop within 6 months of your order being delivered, message us on WhatsApp (+44 7454 758272) with your order ID and we will refill the drop. To stay eligible, do not change your username, and keep the profile or content public while the order or a refill is being delivered — you can make it private once delivery is complete.',
  },
  {
    id: 'faq-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Yes. NovaLikes offers a 30-Day Money-Back Guarantee on eligible orders. Refund requests must be made within 30 days of the original purchase date and are reviewed according to the [Refund Policy](/refund-policy) and the circumstances of the order.',
  },
  {
    id: 'faq-track-order',
    question: 'How can I track my order?',
    answer:
      'Visit the Track Order page and enter the order ID and email address used during checkout. The tracking page will show the customer-safe order status and the latest update.',
  },
  {
    id: 'faq-platforms',
    question: 'Which platforms do you support?',
    answer:
      'NovaLikes currently offers growth services for Instagram, TikTok, and Facebook. Each platform has separate service pages and real package options.',
  },
  {
    id: 'faq-need-help',
    question: 'What should I do if I need help?',
    answer:
      'Contact the support team through the Contact page or the support method shown in your order confirmation. Include your order details when asking about an existing purchase.',
  },
  // Shared aliases still referenced by company / service content shells
  {
    id: 'faq-what-is-novalikes',
    question: 'What is NovaLikes?',
    answer:
      'NovaLikes is a social media growth platform offering services for Instagram, TikTok, and Facebook, with clear ordering and order tracking.',
  },
  {
    id: 'faq-how-ordering-works',
    question: 'How does ordering work?',
    answer:
      'Choose a service, select a real package, provide the required public information, and complete checkout. You can track progress on the Track Order page.',
  },
  {
    id: 'faq-is-it-safe',
    question: 'Is it safe for my account?',
    answer:
      'NovaLikes never requires your social media password. Orders use public usernames or content links only. Always review the service page terms before purchasing.',
  },
  {
    id: 'faq-delivery-time',
    question: 'How long does delivery take?',
    answer:
      'Most orders start within 6–8 hours after payment is confirmed. Once an order starts, standard delivery is usually completed within 4–6 hours. If you prefer a slower pace, ask for gradual delivery in your order note or on WhatsApp. You can follow progress on the [Track Order](/track-order) page with your order ID and email.',
  },
  {
    id: 'faq-refunds',
    question: 'What is the refund policy?',
    answer:
      'NovaLikes offers a 30-Day Money-Back Guarantee on eligible orders. Refund requests must be made within 30 days of the original purchase date and are reviewed according to the [Refund Policy](/refund-policy) and the circumstances of the order.',
  },
  {
    id: 'faq-support',
    question: 'How do I contact support?',
    answer:
      'Contact the support team through the Contact page or the method shown in your order confirmation.',
  },
  {
    id: 'faq-service-followers',
    question: 'How do follower packages work?',
    answer:
      'Open the relevant follower service page to compare real packages, review delivery details, and complete checkout with the required public profile information.',
  },
  {
    id: 'faq-service-engagement',
    question: 'How do likes and views packages work?',
    answer:
      'Open the relevant likes or views service page to compare packages, review delivery details, and provide the public post or video URL required for the order.',
  },
  // Buy Instagram Followers — service FAQ set
  {
    id: 'faq-ig-followers-password',
    question: 'What do I need to buy Instagram followers?',
    answer:
      'You need the public Instagram username for the profile and the follower package you want to order. Your Instagram password is not required.',
  },
  {
    id: 'faq-ig-followers-delivery-speed',
    question: 'Which Instagram followers package should I choose?',
    answer:
      'Choose based on the number of followers you want to add to your profile and the price you are comfortable with. The available quantities and current prices are shown in the pricing section above.',
  },
  {
    id: 'faq-ig-followers-gradual-delivery',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password for an Instagram followers order. Make sure the public username you provide is correct.',
  },
  {
    id: 'faq-ig-followers-refill',
    question: 'How long does an Instagram followers order take?',
    answer:
      'Instagram followers orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-ig-followers-private',
    question: 'Can I track my Instagram followers order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-ig-followers-track',
    question: 'What happens if I enter the wrong Instagram username?',
    answer:
      'Contact support as soon as possible with your order details. Always check the username before checkout because the submitted account information is used to process the order.',
  },
  {
    id: 'faq-ig-followers-business',
    question: 'Will buying followers also increase my Instagram likes or views?',
    answer:
      'Not automatically. Followers, likes, views, and comments are separate services. An Instagram followers package is focused on the follower count of the selected profile.',
  },
  {
    id: 'faq-ig-followers-money-back',
    question: 'Should my Instagram profile be public?',
    answer:
      'Yes. Keep your Instagram profile public until delivery is complete, otherwise the order cannot start or finish. You can make it private again once delivery is done. Please don\'t change your username during the order or the 6-month refill period.',
  },
  // Instagram Followers Packages conversion FAQs
  {
    id: 'faq-ig-pkg-choose',
    question: 'How do I choose a package?',
    answer:
      'Consider your current audience size, account activity and the reason for placing the order. Smaller quantities are useful for first orders, while larger options may better suit established and active profiles.',
  },
  {
    id: 'faq-ig-pkg-new-account',
    question: 'Which package is suitable for a new account?',
    answer:
      'A smaller package is generally a more proportionate starting point for a new account. Make sure the profile has a complete bio, profile image and some recent content before ordering.',
  },
  {
    id: 'faq-ig-pkg-order-again',
    question: 'Can I place another order later?',
    answer:
      'Yes. You can place another order after reviewing the status of your previous one. Waiting until an active order is completed helps prevent overlapping delivery.',
  },
  {
    id: 'faq-ig-pkg-split',
    question: 'Can I split one package between multiple accounts?',
    answer:
      'A standard package is assigned to the username entered during checkout. Separate accounts normally require separate orders.',
  },
  {
    id: 'faq-ig-pkg-delivery-start',
    question: 'When does delivery begin?',
    answer:
      'Delivery usually begins within 6–8 hours after payment is confirmed and is normally completed within 4–6 hours after it starts.',
  },
  {
    id: 'faq-ig-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Only if you want it to be. Standard delivery is usually completed within 4–6 hours after the order starts. For gradual delivery, add a note at checkout or message us on WhatsApp with the pace you prefer.',
  },
  {
    id: 'faq-ig-pkg-track',
    question: 'How do I track my order?',
    answer:
      'Use the order reference and email associated with your purchase to view available status updates through the [Track Order](/track-order) page.',
  },
  {
    id: 'faq-ig-pkg-after-checkout',
    question: 'What happens after I place an order?',
    answer:
      'Your order details are reviewed, the package enters processing and the available status information is updated as delivery progresses.',
  },
  {
    id: 'faq-ig-pkg-upgrade',
    question: 'Can I change the package after payment?',
    answer:
      'Changes may not be possible once processing has started. Contact support as soon as possible when you notice an error in the package or username.',
  },
  {
    id: 'faq-ig-pkg-password',
    question: 'Do I need to give my Instagram password?',
    answer:
      'No. Your password is not required. The order uses the public username entered during checkout.',
  },
  // Instagram Likes Packages conversion FAQs
  {
    id: 'faq-ig-likes-pkg-choose',
    question: 'How do I choose a package?',
    answer:
      'Compare quantities and prices in the pricing grid, then match the size to your goal. Smaller options work well for testing; larger ones suit active campaigns.',
  },
  {
    id: 'faq-ig-likes-pkg-order-again',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another order at any time for the same or a different package. Each purchase uses a separate checkout and its own tracking details.',
  },
  {
    id: 'faq-ig-likes-pkg-split',
    question: 'Can I split my order?',
    answer:
      'Packages are ordered as individual units. For multiple posts or quantities, complete separate checkouts so delivery and tracking stay clear.',
  },
  {
    id: 'faq-ig-likes-pkg-delivery-start',
    question: 'When does delivery begin?',
    answer:
      'Delivery usually begins within 6–8 hours after payment is confirmed and is normally completed within 4–6 hours after it starts.',
  },
  {
    id: 'faq-ig-likes-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Only if you want it to be. Standard delivery is usually completed within 4–6 hours after the order starts. For gradual delivery, add a note at checkout or message us on WhatsApp with the pace you prefer.',
  },
  {
    id: 'faq-ig-likes-pkg-track',
    question: 'How do I track my order?',
    answer:
      'Use your order ID and checkout email on the [Track Order](/track-order) page to view available status updates.',
  },
  {
    id: 'faq-ig-likes-pkg-after-checkout',
    question: 'What happens after I place an order?',
    answer:
      'You receive a confirmation by email. Your order then moves through review and delivery, with tracking available using your order details.',
  },
  {
    id: 'faq-ig-likes-pkg-upgrade',
    question: 'Can I change my package after payment?',
    answer:
      'Changes may not be possible once processing has started. Contact support quickly if you notice an error in the package or URL.',
  },
  {
    id: 'faq-ig-likes-pkg-password',
    question: 'Do I need to give my Instagram password?',
    answer:
      'No. Login credentials are never requested. Your order only needs the public URL of the post or Reel.',
  },
  {
    id: 'faq-ig-likes-pkg-any-post',
    question: 'Can I order for any public post?',
    answer:
      'Yes, as long as the post or Reel stays public and accessible while delivery is in progress.',
  },
  // Buy Instagram Likes — service FAQ set
  {
    id: 'faq-ig-likes-password',
    question: 'Can buying likes get my Instagram account in trouble?',
    answer:
      'We only need the public link to the post — never your password or a login. Instagram’s rules discourage artificial engagement, so no service can honestly promise zero risk. What we do promise is no account access, a clear delivery time, a gradual option and a 6-month refill.',
  },
  {
    id: 'faq-ig-likes-links',
    question: 'How do I buy likes for an Instagram post or Reel?',
    answer:
      'Open the post or Reel, tap the three dots or the share icon and choose Copy link. Pick a likes package, paste the link at checkout and pay. Each order covers one post, so use a separate order for every post you want likes on. No password is needed.',
  },
  {
    id: 'faq-ig-likes-delivery-speed',
    question: 'How long does an Instagram likes order take?',
    answer:
      'Instagram likes orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-ig-likes-gradual-delivery',
    question: 'Do Instagram likes drop, and what happens if they do?',
    answer:
      'A small drop can happen when Instagram removes or restricts accounts. Every order has a 6-month refill counted from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will add the missing likes. The post must still be public and not archived for the refill to work.',
  },
  {
    id: 'faq-ig-likes-refill',
    question: 'I have hidden like counts — can I still buy likes?',
    answer:
      'Yes. The likes are still delivered and you can see the count yourself, but visitors will not, so the post gets less social-proof benefit. To show the number again, open the post, tap the three dots and choose Unhide like count.',
  },
  {
    id: 'faq-ig-likes-reel',
    question: 'How much do Instagram likes cost?',
    answer:
      'Likes start at $2.99 for 100. 1,000 likes costs $9.99 and is our most popular package, and 10,000 likes costs $59.99. Prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-ig-likes-money-back',
    question: 'Does the Instagram post or Reel need to be public?',
    answer:
      'Yes. Keep the Instagram post or Reel public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  {
    id: 'faq-ig-likes-track',
    question: 'Are the likes real, and can people see who liked my post?',
    answer:
      'Likes come from realistic accounts, but we do not claim they are active real people who will follow or comment. Like any likes, the accounts appear in the post’s likes list for anyone who opens it. If you prefer, you can hide the like count on that post from its three-dot menu.',
  },
  // Buy Instagram Views — service FAQ set
  {
    id: 'faq-ig-views-need',
    question: 'How do I buy views for an Instagram Reel?',
    answer:
      'Open the Reel, tap Share and copy the link (it looks like instagram.com/reel/…). Choose a package, paste the link at checkout and pay — no password needed. Views can also be added to public video posts using the post link. Story views are a different metric and are not covered.',
  },
  {
    id: 'faq-ig-views-package',
    question: 'How much do Instagram views cost?',
    answer:
      'Packages start at $1.99 for 100 views. 1,000 views costs $4.99 and is our most popular option, and 10,000 views costs $24.99. All prices are in US dollars and are shown in the pricing table before checkout.',
  },
  {
    id: 'faq-ig-views-password',
    question: 'Is it safe to buy Instagram views?',
    answer:
      'We never ask for your password or access to your account — only the public link to the Reel or video. Instagram’s terms discourage artificial engagement, so no provider can honestly promise zero risk. What we can promise is no login, a clear delivery time and a 6-month refill if views drop.',
  },
  {
    id: 'faq-ig-views-how-long',
    question: 'How long does an Instagram views order take?',
    answer:
      'Instagram views orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-ig-views-track',
    question: 'Are NovaLikes Instagram views real?',
    answer:
      'They come from realistic accounts, but we do not claim they are active real people who will watch, like or follow. Think of a views package as raising the visible view count of a Reel — real engagement still comes from real viewers who find your content.',
  },
  {
    id: 'faq-ig-views-wrong-url',
    question: 'Do Instagram views drop, and what happens if they do?',
    answer:
      'Some drop is normal because Instagram regularly removes or hides accounts. Every order includes a 6-month refill from the date it is delivered: message us on WhatsApp (+44 7454 758272) with your order ID and we will top the count back up. Keep the Reel public and don’t delete it, or the refill cannot be delivered.',
  },
  {
    id: 'faq-ig-views-other-metrics',
    question: 'Will buying views help my Reel get on Explore or the Reels tab?',
    answer:
      'Not by itself. Instagram mainly looks at how real viewers react — watch time, replays, shares, saves and follows. Bought views raise the visible count, which can make new viewers more willing to watch, but they do not create those signals. Our guide on [how the Instagram algorithm works](/learn/how-instagram-algorithm-works) explains this in detail.',
  },
  {
    id: 'faq-ig-views-public',
    question: 'Does the Instagram Reel or video need to be public?',
    answer:
      'Yes. Keep the Instagram Reel or video public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  // Buy Instagram Comments — service FAQ set
  {
    id: 'faq-ig-comments-need',
    question: 'Can I write my own Instagram comments?',
    answer:
      'Yes. Add your comments in the checkout note, one per line, or send them to us on WhatsApp after you order. If you do not send any, our team writes them for you. Comments are in English by default; ask in the note if you need another language.',
  },
  {
    id: 'faq-ig-comments-package',
    question: 'What is the difference between High Quality and Premium comments?',
    answer:
      'High Quality comments are short, positive reactions that suit most posts. Premium comments are written around what your post actually shows and come from more realistic-looking accounts, so they read more naturally on product, service and question posts.',
  },
  {
    id: 'faq-ig-comments-password',
    question: 'How much do Instagram comments cost?',
    answer:
      'High Quality comments start at $13.47 for 10, and 25 comments cost $29.99. Premium comments start at $9.99 for 5, and 10 Premium comments cost $19.47. All prices are in US dollars and are listed in the pricing table above.',
  },
  {
    id: 'faq-ig-comments-how-long',
    question: 'How long does an Instagram comments order take?',
    answer:
      'Instagram comments orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-ig-comments-track',
    question: 'Are the comments real, and will they look natural?',
    answer:
      'They are posted from realistic accounts, but we do not claim they are active real people who will follow you or keep talking. To make them look natural, choose Premium or send your own wording, keep the number in proportion to your likes, and reply to a few of them.',
  },
  {
    id: 'faq-ig-comments-wrong-url',
    question: 'What if some comments disappear after delivery?',
    answer:
      'First check Hidden comments under the post — Instagram’s filters sometimes hide comments rather than remove them. If comments really are gone, every order has a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will replace them.',
  },
  {
    id: 'faq-ig-comments-other-metrics',
    question: 'Why can’t my comments order start?',
    answer:
      'The usual reasons are: the account is private, comments are turned off for that post, comments are limited to followers or people you follow, or the link points to your profile instead of the post. Fix the setting and message us on WhatsApp with your order ID so we can restart it.',
  },
  {
    id: 'faq-ig-comments-public',
    question: 'Does the Instagram post or Reel need to be public?',
    answer:
      'Yes. Keep the Instagram post or Reel public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  // Buy TikTok Followers — service FAQ set
  {
    id: 'faq-tt-followers-need',
    question: 'How do I buy TikTok followers?',
    answer:
      'Choose a package, enter your TikTok username without the @, and pay. Your account must be public while the order is delivered. We never ask for your password, and you can follow the order on the Track Order page with your order ID and email.',
  },
  {
    id: 'faq-tt-followers-package',
    question: 'How much do TikTok followers cost?',
    answer:
      'Packages start at $2.99 for 100 followers. 1,000 followers costs $14.99 and is our most popular option, and 10,000 followers costs $119.99. All prices are in US dollars and every package is shown in the pricing table above.',
  },
  {
    id: 'faq-tt-followers-password',
    question: 'Can buying TikTok followers hurt my account or my For You reach?',
    answer:
      'We never touch your account, but TikTok’s rules discourage inflated follower counts, so no provider can honestly promise zero risk. Followers also do not decide For You reach — each video is judged on how viewers react. Read our guide on [buying TikTok followers, the FYP and account safety](/learn/buying-tiktok-followers-fyp-account-safety) before you decide.',
  },
  {
    id: 'faq-tt-followers-how-long',
    question: 'How long does a TikTok followers order take?',
    answer:
      'TikTok followers orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-tt-followers-track',
    question: 'Will bought followers help me go LIVE or join Creator Rewards?',
    answer:
      'For LIVE, followers count toward the number, but TikTok sets the threshold by region and checks other factors, so we cannot promise an unlock. For Creator Rewards, TikTok’s rules prohibit inflating follower counts, so do not buy followers to qualify for it.',
  },
  {
    id: 'faq-tt-followers-wrong-username',
    question: 'What if I change my TikTok username after ordering?',
    answer:
      'The order and the 6-month refill are linked to the username you entered, so avoid changing it until delivery is complete and ideally during the refill period too. If you have to change it, message us on WhatsApp with your order ID and both usernames.',
  },
  {
    id: 'faq-tt-followers-other-metrics',
    question: 'Do TikTok followers drop, and is there a refill?',
    answer:
      'Some drop is normal because TikTok regularly removes inactive or restricted accounts. Every order has a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will top your count back up. Keep the account public when you ask for a refill.',
  },
  {
    id: 'faq-tt-followers-public',
    question: 'Does my TikTok profile need to be public?',
    answer:
      'Yes. Keep your TikTok profile public until delivery is complete, otherwise the order cannot start or finish. You can make it private again once delivery is done. Please don\'t change your username during the order or the 6-month refill period.',
  },
  // Buy TikTok Likes — service FAQ set
  {
    id: 'faq-tt-likes-need',
    question: 'How do I buy TikTok likes for a video?',
    answer:
      'Open the video in TikTok, tap Share and choose Copy link. Pick a likes package, paste the link at checkout and pay. Each order covers one video, the video must be public, and you never need to share your password.',
  },
  {
    id: 'faq-tt-likes-package',
    question: 'How much do TikTok likes cost?',
    answer:
      'Packages start at $2.99 for 100 likes. 1,000 likes costs $14.99 and is our most popular choice, and 10,000 likes costs $119.99. All prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-tt-likes-password',
    question: 'Will bought likes push my video onto the For You page?',
    answer:
      'Not on their own. TikTok mainly looks at watch time, rewatches, shares and comments when deciding how far a video travels. A higher like count can make new viewers more willing to stay, but it does not replace a strong first few seconds.',
  },
  {
    id: 'faq-tt-likes-how-long',
    question: 'How long does a TikTok likes order take?',
    answer:
      'TikTok likes orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-tt-likes-track',
    question: 'Are the TikTok likes real?',
    answer:
      'They come from realistic-looking accounts, but we do not claim they are active real people who will follow you or keep engaging. Treat a likes package as raising the visible heart count — real engagement still comes from real viewers.',
  },
  {
    id: 'faq-tt-likes-wrong-url',
    question: 'Do TikTok likes drop, and what happens if they do?',
    answer:
      'A small drop can happen when TikTok removes inactive or restricted accounts. Every order includes a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will add the missing likes. The video must still be public and not re-uploaded.',
  },
  {
    id: 'faq-tt-likes-other-metrics',
    question: 'Should I buy likes, views or both for a TikTok video?',
    answer:
      'It depends on the video. If it already has good views but few likes, likes make sense. If it has very few views, adding thousands of likes looks unbalanced — start with views, or order both in proportion. Our guide on [TikTok likes vs views](/learn/tiktok-likes-vs-views) explains the difference.',
  },
  {
    id: 'faq-tt-likes-public',
    question: 'Does my TikTok video need to be public?',
    answer:
      'Yes. Keep the TikTok video public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  // Buy TikTok Views — service FAQ set
  {
    id: 'faq-tt-views-need',
    question: 'How do I buy TikTok views?',
    answer:
      'Open the video in TikTok, tap Share and choose Copy link. Pick High Quality or Premium and a quantity, paste the link at checkout and pay. The video must be public, each order covers one video, and you never need to share your password.',
  },
  {
    id: 'faq-tt-views-package',
    question: 'What is the difference between High Quality and Premium TikTok views?',
    answer:
      'Both raise the public view count on your video and come with the same delivery times and 6-month refill. High Quality is the lower-priced option; Premium is our higher-tier option at a higher price. If you are unsure which suits your video, message us on WhatsApp before ordering.',
  },
  {
    id: 'faq-tt-views-password',
    question: 'How much do TikTok views cost?',
    answer:
      'High Quality views start at $1.99 for 1,000, and 10,000 cost $9.99. Premium views start at $3.99 for 1,000, and 10,000 cost $19.99. All prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-tt-views-how-long',
    question: 'How long does a TikTok views order take?',
    answer:
      'TikTok views orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-tt-views-track',
    question: 'Do bought views count for TikTok Creator Rewards?',
    answer:
      'No. Creator Rewards pays on qualified views — unique For You views longer than five seconds — and TikTok excludes paid views from that count. Bought views only raise the public number on the video, so do not buy views to earn from the program.',
  },
  {
    id: 'faq-tt-views-wrong-url',
    question: 'Do TikTok views drop, and is there a refill?',
    answer:
      'A small drop can happen when TikTok removes inactive or restricted accounts. Every order includes a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will top the count back up. The video must still be public and not re-uploaded.',
  },
  {
    id: 'faq-tt-views-other-metrics',
    question: 'Will bought views push my video onto the For You page?',
    answer:
      'Not by themselves. TikTok widens a video’s reach based on how viewers react — watch time, rewatches, shares and follows. A higher view count can make new viewers more curious, but it does not create those signals. Our guide on [how TikTok video views are counted](/learn/how-tiktok-video-views-are-counted) explains more.',
  },
  {
    id: 'faq-tt-views-public',
    question: 'Does my TikTok video need to be public?',
    answer:
      'Yes. Keep the TikTok video public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  // Buy Facebook Followers — service FAQ set
  {
    id: 'faq-fb-followers-need',
    question: 'How do I buy Facebook followers?',
    answer:
      'Copy the link to your Facebook Page or profile (for example facebook.com/yourpage), choose a package and paste the link at checkout. The Page must be public, and a personal profile must have “Who can follow me” set to Public. No password or admin access is needed.',
  },
  {
    id: 'faq-fb-followers-package',
    question: 'How much do Facebook followers cost?',
    answer:
      'Packages start at $4.99 for 100 followers. 1,000 followers costs $26.99 and is our most popular option, and 10,000 followers costs $149.99. All prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-fb-followers-password',
    question: 'Can I buy followers for a personal Facebook profile?',
    answer:
      'Yes, as long as the profile allows public followers. Go to Settings & privacy → Followers and public content and set “Who can follow me” to Public, then submit your profile link. Turning on professional mode also makes the follower count more visible.',
  },
  {
    id: 'faq-fb-followers-how-long',
    question: 'How long does a Facebook followers order take?',
    answer:
      'Facebook followers orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-fb-followers-track',
    question: 'Are Facebook followers the same as Page Likes?',
    answer:
      'Not exactly. On the newer Facebook Page experience the follower count is the main public number, and Meta now shows follows instead of Page Likes in Meta Business Suite. If your Page displays followers, this is the right service; if an older Page still shows Page Likes, compare our Page Likes service.',
  },
  {
    id: 'faq-fb-followers-wrong-url',
    question: 'Do Facebook followers drop, and is there a refill?',
    answer:
      'Some drop is normal because Facebook removes inactive or restricted accounts. Every order has a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will top the count back up. Keep the Page public and the same URL when you ask.',
  },
  {
    id: 'faq-fb-followers-other-metrics',
    question: 'Will more followers increase my Facebook reach?',
    answer:
      'Not by themselves. Facebook shows posts to more people when they get reactions, comments, shares and time spent. Followers who do not interact add little reach, but a larger count can make new visitors more willing to follow. Our guide on [how Facebook Page reach works](/learn/how-facebook-page-reach-works) explains the details.',
  },
  {
    id: 'faq-fb-followers-public',
    question: 'Does my Facebook Page or profile need to be public?',
    answer:
      'Yes. Keep the Page published, or the profile’s followers setting on Public, until delivery is complete — otherwise the order cannot start or finish. Please do not change the Page username or URL during the order or the 6-month refill period.',
  },
  // Buy Facebook Page Likes — AI Overview FAQs
  // Buy Facebook Page Likes — service FAQ set
  {
    id: 'faq-fb-page-likes-need',
    question: 'Should I buy Page Likes or Followers for my Facebook Page?',
    answer:
      'Buy whichever number your Page shows to visitors. Open the Page in a private window and look under the Page name: if it says “likes”, Page Likes fit; if it only says “followers”, choose Facebook Followers. Most newer Pages show followers.',
  },
  {
    id: 'faq-fb-page-likes-package',
    question: 'How much do Facebook Page Likes cost?',
    answer:
      'Packages start at $2.99 for 100 Page Likes. 1,000 Page Likes costs $14.99 and is our most popular option, and 10,000 costs $69.99. All prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-fb-page-likes-password',
    question: 'How do I buy Facebook Page Likes?',
    answer:
      'Copy your public Page link (facebook.com/yourpage), choose a package and paste the link at checkout. We never ask for your password or admin access. Page Likes work on Facebook Pages only — not on personal profiles or single posts.',
  },
  {
    id: 'faq-fb-page-likes-how-long',
    question: 'How long does a Facebook Page Likes order take?',
    answer:
      'Facebook Page Likes orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-fb-page-likes-track',
    question: 'Has Facebook removed Page Likes?',
    answer:
      'Not completely, but they are no longer the main number. On the newer Page experience the follower count is shown first, Meta reports follows instead of Page Likes in Meta Business Suite, and the Page Likes metric was removed from Meta’s API in November 2025. Some older Pages still display likes, so check yours before ordering.',
  },
  {
    id: 'faq-fb-page-likes-wrong-url',
    question: 'Do Facebook Page Likes drop, and is there a refill?',
    answer:
      'A small drop can happen when Facebook removes inactive or restricted accounts. Every order has a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will top the count back up. Keep the Page public and on the same URL.',
  },
  {
    id: 'faq-fb-page-likes-other-metrics',
    question: 'Do Page Likes help my Facebook posts reach more people?',
    answer:
      'Not by themselves. Facebook decides who sees a post mainly from reactions, comments, shares and time spent. A higher count can help a Page look established, but reach still comes from posts people engage with. Our guide on [how Facebook Page reach works](/learn/how-facebook-page-reach-works) explains more.',
  },
  {
    id: 'faq-fb-page-likes-public',
    question: 'Does my Facebook Page need to be public?',
    answer:
      'Yes. Keep the Facebook Page public until delivery is complete, otherwise the order cannot start or finish. Please don\'t change the Page username or URL during the order or the 6-month refill period.',
  },
  // Buy Facebook Post Likes — service FAQ set
  {
    id: 'faq-fb-post-likes-need',
    question: 'How do I buy likes for a Facebook post?',
    answer:
      'Open the post, tap Share and choose Copy link (or click the post’s time stamp and copy the address). Pick a package, paste the link at checkout and pay. The post must be public, each order covers one post, and you never need to share your password.',
  },
  {
    id: 'faq-fb-post-likes-package',
    question: 'How much do Facebook Post Likes cost?',
    answer:
      'Packages start at $2.99 for 100 Post Likes. 1,000 costs $14.99 and is our most popular option, and 10,000 costs $69.99. All prices are in US dollars and every package is listed in the pricing table above.',
  },
  {
    id: 'faq-fb-post-likes-password',
    question: 'Can I get Love or other reactions instead of Likes?',
    answer:
      'Yes. Orders are delivered as the standard Like reaction by default. If you want Love or another reaction, write it in the checkout note or tell us on WhatsApp before the order starts.',
  },
  {
    id: 'faq-fb-post-likes-how-long',
    question: 'How long does a Facebook Post Likes order take?',
    answer:
      'Facebook Post Likes orders usually start within 6–8 hours of payment and are completed within 4–6 hours after they start. Prefer a slower, gradual delivery? Add a note at checkout or tell us on WhatsApp. You can follow progress on the Track Order page.',
  },
  {
    id: 'faq-fb-post-likes-track',
    question: 'Can I buy likes for a post on my personal profile?',
    answer:
      'Yes, as long as the post audience is set to Public — look for the globe icon next to the date. Posts shared with Friends or a custom list cannot receive an order. You can change the audience from the post’s three-dot menu.',
  },
  {
    id: 'faq-fb-post-likes-wrong-url',
    question: 'Do Facebook Post Likes drop, and is there a refill?',
    answer:
      'A small drop can happen when Facebook removes inactive or restricted accounts. Every order has a 6-month refill from the delivery date: message us on WhatsApp (+44 7454 758272) with your order ID and we will top the count back up. The post must still be public.',
  },
  {
    id: 'faq-fb-post-likes-other-metrics',
    question: 'Will Post Likes help my Facebook post reach more people?',
    answer:
      'Not on their own. Facebook gives more weight to comments, shares and time spent than to likes alone. A higher reaction count can make people more willing to stop and engage, which is the real benefit. Our guide on [how to get more likes on a Facebook post](/learn/how-to-get-more-likes-on-facebook-post) covers organic tips too.',
  },
  {
    id: 'faq-fb-post-likes-public',
    question: 'Does my Facebook post need to be public?',
    answer:
      'Yes. Keep the Facebook post public and don\'t delete it until delivery is complete, otherwise the order cannot start or finish. Keep it available during the 6-month refill period too, so any drop can be refilled.',
  },
  // Buy YouTube Subscribers — authority FAQs
  {
    id: 'faq-yt-subscribers-can-you-buy',
    question: 'Can you buy YouTube subscribers?',
    answer:
      'Yes. You can purchase subscriber packages by selecting a package, providing your public YouTube channel URL and completing secure checkout.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-password',
    question: 'Do I need my YouTube password?',
    answer: 'No. Orders only require your public YouTube channel URL.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-does-help',
    question: 'Does buying YouTube subscribers help?',
    answer:
      'Subscriber packages can strengthen the visible audience of your channel, but they do not guarantee more views, watch time or revenue.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-new-channel',
    question: 'Can I buy subscribers for a new YouTube channel?',
    answer:
      'Yes. Subscriber packages can be ordered for both new and established public YouTube channels.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-existing-channel',
    question: 'Can You Buy Subscribers for an Existing YouTube Channel?',
    answer:
      'Yes. Subscriber packages can be ordered for existing public YouTube channels by providing the public channel URL during checkout.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-how-many',
    question: 'How Many YouTube Subscribers Should I Buy?',
    answer:
      'Choose a package that matches your current subscriber base, upload frequency and channel goals rather than automatically selecting the largest available quantity.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-increase-views',
    question: 'Will subscribers increase my video views?',
    answer:
      'No. Subscribers and Views are different YouTube metrics. More subscribers do not automatically increase video views.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-vs-views',
    question: "What's the difference between Subscribers and Views?",
    answer:
      'Subscribers represent your channel audience, while Views measure how many times individual videos have been watched.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-another-order',
    question: 'Can I place another order later?',
    answer:
      'Yes. You can purchase another subscriber package after your current order has been completed.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-subscribers-track',
    question: 'Can I track my order?',
    answer: 'Yes. Order tracking is available after your purchase has been confirmed.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-subscribers-what-required',
    question: 'What information is required?',
    answer:
      'You only need your public YouTube channel URL, the selected package and a valid email address.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-choose-package',
    question: 'Which subscriber package should I choose?',
    answer:
      'Choose a package that aligns with your current audience size, upload frequency and long-term channel goals.',
    homepageFilter: 'Packages',
  },
  // Buy YouTube Views — authority FAQs
  {
    id: 'faq-yt-views-can-you-buy',
    question: 'Can you buy YouTube views?',
    answer:
      'Yes. You can purchase YouTube View packages by selecting a package, providing the public URL of your YouTube video and completing secure checkout. Your YouTube password is never required.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-password',
    question: 'Do I need my YouTube password?',
    answer:
      'No. Orders only require the public URL of your YouTube video. Private login credentials and verification codes are never requested.',
    homepageFilter: 'Video Requirements',
  },
  {
    id: 'faq-yt-views-does-help',
    question: 'Does buying YouTube views help?',
    answer:
      'View packages increase the public view count on your video, which may strengthen social proof and improve first impressions. They do not guarantee more subscribers, watch time or higher rankings in YouTube recommendations.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-existing-video',
    question: 'Can I buy views for an existing YouTube video?',
    answer:
      'Yes. You can order View packages for both newly published and existing public YouTube videos.',
    homepageFilter: 'Video Requirements',
  },
  {
    id: 'faq-yt-views-multiple-videos',
    question: 'Can I buy YouTube views for multiple videos?',
    answer:
      'Yes. Place a separate order for each public YouTube video you want to promote, using that video\'s public URL during checkout.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-how-many',
    question: 'How many YouTube views should I buy?',
    answer:
      "Choose a package that reflects your video's existing performance, promotional objectives and audience size instead of automatically selecting the largest quantity.",
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-increase-subscribers',
    question: 'Will YouTube views increase subscribers?',
    answer:
      'Views and Subscribers are different YouTube metrics. Higher view counts do not automatically increase your subscriber count.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-vs-watch-time',
    question: "What's the difference between YouTube Views and Watch Time?",
    answer:
      'Views count how many times a video has been watched, while Watch Time measures how long viewers spend watching the content.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-another-order',
    question: 'Can I place another order later?',
    answer:
      'Yes. Additional View packages can be purchased whenever you want to promote another public YouTube video.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-track',
    question: 'Can I track my order?',
    answer: 'Yes. Order tracking is available after your purchase has been confirmed.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-what-required',
    question: 'What information is required?',
    answer:
      'You only need the public URL of your YouTube video, the selected View package and a valid email address.',
    homepageFilter: 'Video Requirements',
  },
  ...faqHubItems,
];

function isFaqActive(item: FAQItem): boolean {
  return item.active !== false;
}

export function getAllFaqItems(): FAQItem[] {
  return faqItems;
}

export function getFaqItemById(id: string): FAQItem | undefined {
  return faqItems.find((item) => item.id === id);
}

export function getFaqItemsByIds(ids: string[]): FAQItem[] {
  return ids.map((id) => getFaqItemById(id)).filter((item): item is FAQItem => Boolean(item));
}

/** Active FAQ hub entries for /faq (Document 13.03). */
export function getActiveFaqPageItems(): FAQItem[] {
  return faqItems
    .filter((item) => isFaqActive(item) && Boolean(item.category))
    .sort((a, b) => {
      const categoryCompare = String(a.category).localeCompare(String(b.category));
      if (categoryCompare !== 0) return categoryCompare;
      return (a.order ?? 0) - (b.order ?? 0);
    });
}

export function getActiveFaqPageItemsByCategory(category: FAQCategoryId): FAQItem[] {
  return getActiveFaqPageItems()
    .filter((item) => item.category === category)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
