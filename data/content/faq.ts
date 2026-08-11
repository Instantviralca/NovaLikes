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
      'Yes. NovaLikes offers Instagram follower packages through its our website. Select a package, provide the public username and complete checkout to place an order. Review package details on [Instagram Followers Packages](/buy-instagram-followers).',
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
      'Choose a service for Instagram, TikTok, YouTube or Facebook, compare packages on the service page, enter the public username or content URL required, and complete checkout. After payment is confirmed, monitor available updates on the [Track Order](/track-order) page with your order ID and email. Start with a popular option such as [Instagram Followers Packages](/buy-instagram-followers) when you know which platform to grow first.',
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
      'Many services need the relevant profile or content to remain public during delivery. Exact requirements appear on the service page before checkout. Private or restricted profiles may delay or prevent delivery. Keep the username or URL accurate, and contact support before ordering if you are unsure whether your account qualifies.',
    homepageFilter: 'Safety',
    order: 10,
  },
  {
    id: 'faq-home-multiple-services',
    question: 'Can I order more than one service at the same time?',
    answer:
      'Yes. You can place separate orders across Instagram, TikTok, YouTube and Facebook. Complete checkout for each purchase and provide the correct public username or content URL for every service. Track each order independently with its own order ID and email on the [Track Order](/track-order) page.',
    homepageFilter: 'Orders',
    order: 11,
  },
  {
    id: 'faq-home-order-start',
    question: 'When will my order start?',
    answer:
      'Start times depend on the selected service and package. Delivery estimates are shown on the service page before checkout. After purchase, use the [Track Order](/track-order) page with your order ID and email to review available status updates. Timing can also differ when gradual delivery applies.',
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
      'Gradual delivery is available for eligible services where it is clearly stated on the service page. When it applies, delivery is spread over time instead of completing at once. Availability and timing depend on the platform, service and package. If gradual delivery is not listed, that package uses the standard method shown on the page.',
    homepageFilter: 'Delivery',
    order: 14,
  },
  {
    id: 'faq-home-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Selected services include refill protection where it is stated on the service page. Eligibility, the refill window and other conditions vary by package. If you believe an eligible drop occurred, contact support with your order ID and checkout email so the team can review the request against the package terms.',
    homepageFilter: 'Delivery',
    order: 15,
  },
  {
    id: 'faq-home-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      "Eligible purchases are covered by NovaLikes's 30-day money-back guarantee under the [refund policy](/refund-policy) and the terms shown for the selected service. Review those conditions before checkout. Contact support with your order ID and checkout email if you need help with an eligible purchase.",
    homepageFilter: 'Delivery',
    order: 16,
  },
  {
    id: 'faq-home-platforms',
    question: 'Which social media platforms do you support?',
    answer:
      'NovaLikes supports Instagram, TikTok, YouTube and Facebook. Examples include [Instagram Followers Packages](/buy-instagram-followers), [Buy Instagram Likes](/buy-instagram-likes), [Buy TikTok Followers](/buy-tiktok-followers), [Buy TikTok Views](/buy-tiktok-views), [Buy YouTube Subscribers](/buy-youtube-subscribers), [Buy YouTube Views](/buy-youtube-views), [Buy Facebook Followers](/buy-facebook-followers) and [Buy Facebook Page Likes](/buy-facebook-page-likes). YouTube packages currently focus on subscribers and views.',
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
      'No. NovaLikes does not require your Instagram, TikTok, YouTube, or Facebook password. Orders use public information such as a username, profile URL, post link, page URL, channel URL, or video link, depending on the service you select.',
  },
  {
    id: 'faq-order-start',
    question: 'How quickly will my order begin?',
    answer:
      'Start times vary by service and package. Some orders may begin shortly after payment confirmation, while others require additional processing time. The relevant service page should display the expected start and delivery information before you place an order.',
  },
  {
    id: 'faq-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Yes, gradual delivery is available on eligible services. The exact delivery method and estimated timeframe depend on the platform, service, and package selected. Check the service page for the terms that apply to your order.',
  },
  {
    id: 'faq-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Eligible services include refill coverage. Refill periods and conditions vary by service, so the applicable terms should be shown clearly on the relevant service page before checkout.',
  },
  {
    id: 'faq-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by a 30-day money-back guarantee, subject to the Refund Policy and the conditions listed on the service page. Customers should review the applicable terms before ordering.',
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
      'NovaLikes currently offers growth services for Instagram, TikTok, YouTube, and Facebook. Each platform has separate service pages and real package options.',
  },
  {
    id: 'faq-need-help',
    question: 'What should I do if I need help?',
    answer:
      'Contact the support team through the Contact page or the support method shown in your order confirmation. Support is available 24/7 for service questions and order assistance.',
  },
  // Shared aliases still referenced by company / service content shells
  {
    id: 'faq-what-is-novalikes',
    question: 'What is NovaLikes?',
    answer:
      'NovaLikes is a social media growth platform offering services for Instagram, TikTok, YouTube, and Facebook, with clear ordering, order tracking, and 24/7 support.',
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
      'Delivery timelines vary by service and package. Expected start and delivery information should be shown on the relevant service page before you order.',
  },
  {
    id: 'faq-refunds',
    question: 'What is the refund policy?',
    answer:
      'Eligible purchases are covered by a 30-day money-back guarantee, subject to the Refund Policy and the conditions listed on the service page.',
  },
  {
    id: 'faq-support',
    question: 'How do I contact support?',
    answer:
      'Contact the support team through the Contact page or the method shown in your order confirmation. Support is available 24/7.',
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
  // Buy Instagram Followers — Document 09.11 §15
  {
    id: 'faq-ig-followers-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not ask for your Instagram password. The order form only requires the public username connected to the profile receiving the followers. You remain in control of your Instagram account throughout the process.',
  },
  {
    id: 'faq-ig-followers-delivery-speed',
    question: 'How quickly will my followers begin arriving?',
    answer:
      'Start and delivery times depend on the package selected. The pricing section should display the current estimate stored with each real package. Some eligible packages may begin shortly after payment confirmation, while others can require additional processing time.',
  },
  {
    id: 'faq-ig-followers-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery is available on eligible Instagram follower packages. When applicable, the selected package should clearly state the estimated delivery method or timeframe before checkout.',
  },
  {
    id: 'faq-ig-followers-refill',
    question: 'Do the packages include a refill guarantee?',
    answer:
      'Eligible packages include refill protection. The refill period, eligibility rules, and limitations can vary, so the applicable terms must be displayed on the package or service page before purchase.',
  },
  {
    id: 'faq-ig-followers-private',
    question: 'What happens if my Instagram profile is private?',
    answer:
      'The profile may need to remain public while the order is being processed. If the account is private, delivery may not begin or may be interrupted. The order instructions should clearly explain the requirement before checkout.',
  },
  {
    id: 'faq-ig-followers-business',
    question: 'Can I buy followers for a business account?',
    answer:
      'Yes. Instagram follower packages can be ordered for eligible creator, personal, or business profiles, provided the public username is correct and the account meets the service requirements.',
  },
  {
    id: 'faq-ig-followers-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      "Eligible purchases are covered by NovaLikes's 30-day money-back guarantee, subject to the Refund Policy and the service conditions displayed before checkout. Customers should review those terms before placing an order.",
  },
  {
    id: 'faq-ig-followers-track',
    question: 'How can I track my order?',
    answer:
      'Use the Track Order page with the order ID and email address entered during checkout. The page will show the current customer-facing status and latest update without exposing internal processing notes.',
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
      'Processing begins after the order and payment details have been confirmed. Any available timing estimate will be shown with the selected package or during checkout.',
  },
  {
    id: 'faq-ig-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Gradual delivery may be available for eligible packages. Review the delivery information shown for your selected option before completing payment.',
  },
  {
    id: 'faq-ig-pkg-track',
    question: 'How do I track my order?',
    answer:
      'Use the order reference and email associated with your purchase to view available status updates through the [Track Order](/track-order) page.',
  },
  {
    id: 'faq-ig-pkg-after-checkout',
    question: 'What happens after checkout?',
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
    question: 'Do you need my Instagram password?',
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
      'Processing begins after payment is confirmed. Any available timing estimate is shown with the selected option before checkout.',
  },
  {
    id: 'faq-ig-likes-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Gradual delivery may be available on eligible options. Review the delivery details shown for your selection before payment.',
  },
  {
    id: 'faq-ig-likes-pkg-track',
    question: 'How do I track my order?',
    answer:
      'Use your order ID and checkout email on the [Track Order](/track-order) page to view available status updates.',
  },
  {
    id: 'faq-ig-likes-pkg-after-checkout',
    question: 'What happens after checkout?',
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
    question: 'Do you need my password?',
    answer:
      'No. Login credentials are never requested. Your order only needs the public URL of the post or Reel.',
  },
  {
    id: 'faq-ig-likes-pkg-any-post',
    question: 'Can I order for any public post?',
    answer:
      'Yes, as long as the post or Reel stays public and accessible while delivery is in progress.',
  },
  // Buy Instagram Likes — Document 09.12 §15
  {
    id: 'faq-ig-likes-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password. The order form only needs the public URL of the post or Reel receiving the likes.',
  },
  {
    id: 'faq-ig-likes-links',
    question: 'Which Instagram links can I use?',
    answer:
      'Use the public link for the Instagram post or Reel you want to support. The content should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-ig-likes-delivery-speed',
    question: 'How quickly will the likes begin arriving?',
    answer:
      'Start and delivery times depend on the package selected. The pricing section should display the current estimate stored with each real package.',
  },
  {
    id: 'faq-ig-likes-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible Instagram Likes packages. When applicable, the package should clearly display the delivery method or timeframe.',
  },
  {
    id: 'faq-ig-likes-refill',
    question: 'Do Instagram Likes packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The relevant package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-ig-likes-reel',
    question: 'Can I order likes for a Reel?',
    answer:
      'Yes, where supported by the selected package. Use the public Reel URL during order configuration and confirm that the content remains accessible.',
  },
  {
    id: 'faq-ig-likes-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  {
    id: 'faq-ig-likes-track',
    question: 'How can I track the order?',
    answer:
      'Use the Track Order page with the order ID and email address entered during checkout. The page will display the latest customer-facing status.',
  },
  // Buy Instagram Views — package/checkout FAQs (mid-page copy stays generic)
  {
    id: 'faq-ig-views-password',
    question: 'Do you need my password?',
    answer:
      'No. Login credentials are never requested. Your order only needs the public content URL entered at checkout.',
  },
  {
    id: 'faq-ig-views-links',
    question: 'What link should I provide?',
    answer:
      'Use the public URL for the content receiving the order. Keep that content public while delivery is in progress.',
  },
  {
    id: 'faq-ig-views-delivery-speed',
    question: 'When does delivery begin?',
    answer:
      'Processing begins after payment is confirmed. Any available timing estimate is shown with the selected option before checkout.',
  },
  {
    id: 'faq-ig-views-reels',
    question: 'Can I order for a Reel?',
    answer:
      'Yes, when the selected option supports that content type. Enter the public Reel URL during checkout.',
  },
  {
    id: 'faq-ig-views-gradual-delivery',
    question: 'Will delivery be gradual?',
    answer:
      'Eligible options may deliver gradually. Review the delivery details shown for your selection before payment.',
  },
  {
    id: 'faq-ig-views-refill',
    question: 'Is refill protection included?',
    answer:
      'Some packages include refill coverage. Terms and eligibility appear with the selected option before purchase.',
  },
  {
    id: 'faq-ig-views-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases follow the 30-day money-back guarantee under the Refund Policy and service-specific conditions.',
  },
  {
    id: 'faq-ig-views-track',
    question: 'How do I track my order?',
    answer:
      'Use your order ID and checkout email on the [Track Order](/track-order) page to view available status updates.',
  },
  // Buy Instagram Comments — community, conversation, trust intent
  {
    id: 'faq-ig-comments-password',
    question: 'Are comments relevant to my niche?',
    answer:
      'Choose packages and wording that fit the topic of your post. On-niche remarks and replies look more credible than generic praise. After delivery, answer real questions so the thread stays useful to people in your niche.',
  },
  {
    id: 'faq-ig-comments-links',
    question: 'Can comments include emojis?',
    answer:
      'Yes. Short reactions and emojis are common in Instagram discussions. Keep the overall tone consistent with your brand and hide anything that does not match your community standards.',
  },
  {
    id: 'faq-ig-comments-custom-text',
    question: 'Can comments look natural?',
    answer:
      'Natural results come from matching quantity to the post, preferring conversational language over hype, and using gradual delivery when available. Your own replies after comments land matter just as much.',
  },
  {
    id: 'faq-ig-comments-delivery-speed',
    question: 'Do I need a public post?',
    answer:
      'Yes. Comments require a public Instagram post or Reel URL. Private or restricted content cannot be fulfilled while it stays inaccessible.',
  },
  {
    id: 'faq-ig-comments-reels',
    question: 'Can I order comments for Reels?',
    answer:
      'Yes. Paste the public Reel URL during checkout when the package supports that content type. Keep the Reel public for the full delivery window.',
  },
  {
    id: 'faq-ig-comments-refill',
    question: 'Will comments appear gradually?',
    answer:
      'Many packages support gradual delivery so discussion builds over time. Check the estimate and delivery style on the package card before you pay.',
  },
  {
    id: 'faq-ig-comments-money-back',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another comments order whenever a new post or Reel needs more conversation. Match quantity to that upload rather than repeating the same volume on every tile.',
  },
  {
    id: 'faq-ig-comments-track',
    question: 'Do I need my Instagram password?',
    answer:
      'No. NovaLikes never asks for your Instagram password. Orders use your public post URL and checkout email only. Track status with your order ID after purchase.',
  },
  // Buy TikTok Followers — production FAQ (authority page)
  {
    id: 'faq-tt-followers-can-buy',
    question: 'Can you buy TikTok followers?',
    answer:
      "Yes. TikTok follower packages are available through online providers that allow you to choose a package size, enter your public TikTok username, and complete your order. Before purchasing, review the provider's pricing, delivery information, support options, and service policies so you understand exactly what is included.",
  },
  {
    id: 'faq-tt-followers-how-buy',
    question: 'How do you buy TikTok followers?',
    answer:
      'The process is simple. Choose a follower package, enter your public TikTok username, review your order details, complete secure checkout, and track your order as it progresses. Your TikTok password is not required.',
  },
  {
    id: 'faq-tt-followers-does-work',
    question: 'Does buying TikTok followers work?',
    answer:
      'Buying TikTok followers increases the visible follower count on your profile, which may improve how your account appears to new visitors. However, follower packages do not guarantee viral videos, higher engagement, or business growth. Consistent content remains the most important factor for long-term success.',
  },
  {
    id: 'faq-tt-followers-are-real',
    question: 'Are bought TikTok followers real?',
    answer:
      'Different providers offer different types of follower packages. Before ordering, review the package description, delivery details, and published policies so you understand exactly what is being offered. Look for clear information rather than vague claims about real, genuine, or legit followers.',
  },
  {
    id: 'faq-tt-followers-safe',
    question: 'Is it safe to buy TikTok followers?',
    answer:
      "A safer ordering process starts with choosing a provider that does not request your TikTok password, clearly explains its pricing and delivery process, and provides customer support if questions arise. Always review the provider's policies before placing an order.",
  },
  {
    id: 'faq-tt-followers-banned',
    question: 'Will buying TikTok followers get my account banned?',
    answer:
      "No provider can guarantee how TikTok may evaluate account activity. Follow TikTok's policies, avoid sharing your password, and choose services that clearly explain how their ordering process works rather than making unrealistic promises.",
  },
  {
    id: 'faq-tt-followers-delivery-begin',
    question: 'How quickly does delivery begin?',
    answer:
      'Delivery timing depends on the package you choose. Estimated delivery information is displayed before checkout so you know what to expect before placing your order.',
  },
  {
    id: 'faq-tt-followers-password',
    question: 'Do I need to provide my TikTok password?',
    answer:
      'No. NovaLikes only requires your public TikTok username to process an order. Your password and login credentials are never requested.',
  },
  {
    id: 'faq-tt-followers-another-order',
    question: 'Can I order another package later?',
    answer:
      'Yes. Many customers place additional orders after their previous order has been completed. Reviewing your order status before placing another package helps keep the process organized.',
  },
  {
    id: 'faq-tt-followers-which-package',
    question: 'Which package should I choose?',
    answer:
      'The best package depends on your current follower count, content activity, and overall goals. Smaller packages are suitable for testing the service. Many customers choose to buy 500 TikTok followers or buy 1,000 TikTok followers for steady growth, while larger campaigns may buy 10,000 TikTok followers or more.',
  },
  // Buy TikTok Likes — production FAQ (authority page)
  {
    id: 'faq-tt-likes-can-buy',
    question: 'Can you buy TikTok likes?',
    answer:
      "Yes. You can purchase TikTok like packages by selecting a quantity, providing the public video link and completing checkout. Before ordering, review the provider's pricing, delivery information and support policies.",
  },
  {
    id: 'faq-tt-likes-how-buy',
    question: 'How do you buy TikTok likes?',
    answer:
      'Choose a package, paste the public TikTok video URL, review your order details and complete secure checkout. No TikTok password is required.',
  },
  {
    id: 'faq-tt-likes-does-help',
    question: 'Does buying TikTok likes help?',
    answer:
      'TikTok likes increase the visible engagement count on a selected video, which may improve its presentation to new viewers. They do not guarantee additional views, followers or viral reach.',
  },
  {
    id: 'faq-tt-likes-any-video',
    question: 'Can I buy TikTok likes for any video?',
    answer:
      'You can order likes for public TikTok videos by providing the correct video URL during checkout.',
  },
  {
    id: 'faq-tt-likes-password',
    question: 'Do you need my TikTok password?',
    answer:
      'No. NovaLikes only requires the public TikTok video link to process your order.',
  },
  {
    id: 'faq-tt-likes-repeat',
    question: 'Can I order more likes later?',
    answer:
      'Yes. Additional packages can be ordered after your previous order has been completed.',
  },
  {
    id: 'faq-tt-likes-instant',
    question: 'Are TikTok likes delivered instantly?',
    answer:
      'Delivery times vary depending on the selected package. Review the delivery information before completing your purchase.',
  },
  {
    id: 'faq-tt-likes-safe',
    question: 'Is it safe to buy TikTok likes?',
    answer:
      'Choose providers that clearly explain their ordering process, pricing and support. Never share your TikTok password or account login credentials.',
  },
  {
    id: 'faq-tt-likes-where',
    question: 'Where can I buy TikTok likes?',
    answer:
      'Compare providers based on transparent pricing, delivery information, support quality and published policies rather than marketing claims alone.',
  },
  {
    id: 'faq-tt-likes-which-package',
    question: 'What package should I choose?',
    answer:
      'Select a package that matches your current engagement level and campaign goals. Smaller packages suit newer videos, while larger packages may be more appropriate for established creators and brands.',
  },
  // Legacy TikTok Likes FAQ IDs retained for schema stability
  {
    id: 'faq-tt-likes-packages',
    question: 'Can I choose different package sizes?',
    answer: 'Yes. Select the package that best matches your campaign goals.',
  },
  {
    id: 'faq-tt-likes-delivery-speed',
    question: 'How quickly does delivery begin?',
    answer: 'Most orders begin shortly after processing is complete.',
  },
  {
    id: 'faq-tt-likes-track',
    question: 'Can I track my order?',
    answer: 'Yes. Order tracking is available after checkout.',
  },
  {
    id: 'faq-tt-likes-links',
    question: 'Which TikTok link should I use?',
    answer:
      'Use the public URL of the TikTok video you want to support. The video should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-tt-likes-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible TikTok Likes packages. The selected package should display the applicable delivery method or timeframe.',
  },
  {
    id: 'faq-tt-likes-refill',
    question: 'Do TikTok Likes packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-tt-likes-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  // Buy TikTok Views — production FAQ (authority page)
  {
    id: 'faq-tt-views-can-buy',
    question: 'Can you buy TikTok views?',
    answer:
      "Yes. TikTok view packages can be purchased by selecting a package, providing the public video URL and completing checkout. Before placing an order, review the provider's pricing, delivery information and customer support.",
  },
  {
    id: 'faq-tt-views-how-buy',
    question: 'How do you buy TikTok views?',
    answer:
      'Choose a package, paste the public TikTok video link, review your order details and complete secure checkout. Your TikTok password is not required.',
  },
  {
    id: 'faq-tt-views-does-work',
    question: 'Does buying TikTok views work?',
    answer:
      "Buying TikTok views increases the visible watch count on a selected public video. It can improve the video's presentation but does not guarantee additional likes, followers, engagement or viral reach.",
  },
  {
    id: 'faq-tt-views-can-people-see',
    question: 'Can people see if you buy TikTok views?',
    answer:
      'TikTok displays the public view count on videos, but it does not label whether views were obtained through a purchased package. No provider can make claims about how TikTok internally evaluates account activity.',
  },
  {
    id: 'faq-tt-views-are-real',
    question: 'Are purchased TikTok views real?',
    answer:
      'Different providers offer different types of view packages. Before placing an order, review the package description, delivery information and published policies so you understand what is included.',
  },
  {
    id: 'faq-tt-views-worth-it',
    question: 'Is buying TikTok views worth it?',
    answer:
      'That depends on your goals. View packages can support the visible activity of a public video, but sustainable growth still depends on creating engaging content and maintaining consistent posting.',
  },
  {
    id: 'faq-tt-views-what-happens',
    question: 'What happens when you buy TikTok views?',
    answer:
      "When you buy TikTok views, the selected public video receives the purchased view package according to the provider's delivery process. The visible watch count increases, but likes, comments, followers and viral reach are not guaranteed. Available tracking updates help you monitor order progress after checkout.",
  },
  {
    id: 'faq-tt-views-password',
    question: 'Do I need to provide my TikTok password?',
    answer:
      'No. NovaLikes only requires the public TikTok video URL to process your order.',
  },
  {
    id: 'faq-tt-views-should-buy',
    question: 'Should you buy TikTok views?',
    answer:
      'Buy TikTok views when a higher visible watch count supports your campaign goal and you plan to keep publishing strong content. Avoid packages if you expect guaranteed followers, sales or viral reach — views are a support tool for first impressions, not a replacement for hooks and consistency.',
  },
  {
    id: 'faq-tt-views-which-package',
    question: 'Which TikTok view package should I choose?',
    answer:
      "Choose a quantity that matches your video's current performance and campaign goals. Smaller packages suit newer videos, while larger packages are often more appropriate for established creators and brands.",
  },
  // Legacy TikTok Views FAQ IDs retained for schema stability
  {
    id: 'faq-tt-views-repeat',
    question: 'Can I order another package later?',
    answer:
      'Yes. Additional packages can be placed after your previous order has been completed.',
  },
  {
    id: 'faq-tt-views-packages',
    question: 'Can I select different package sizes?',
    answer: 'Yes. Choose the package that matches your campaign goals.',
  },
  {
    id: 'faq-tt-views-delivery-speed',
    question: 'How quickly does delivery begin?',
    answer: 'Most orders begin shortly after payment processing.',
  },
  {
    id: 'faq-tt-views-track',
    question: 'Can I track my order?',
    answer: 'Yes. Every order includes progress tracking.',
  },
  {
    id: 'faq-tt-views-links',
    question: 'Which TikTok link should I use?',
    answer:
      'Use the public URL of the TikTok video you want to promote. The video should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-tt-views-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible TikTok Views packages. The selected package should display the applicable delivery method or timeframe.',
  },
  {
    id: 'faq-tt-views-refill',
    question: 'Do TikTok Views packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-tt-views-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  // Buy Facebook Followers — production FAQ (authority page)
  {
    id: 'faq-fb-followers-can-buy',
    question: 'Can you buy Facebook followers?',
    answer:
      'Yes. Facebook follower packages can be purchased by selecting a package, providing your public Facebook Page URL and completing checkout. Your Facebook password is not required.',
  },
  {
    id: 'faq-fb-followers-how-buy',
    question: 'How do you buy Facebook followers?',
    answer:
      'Choose a follower package, enter your public Facebook Page URL, review your order details and complete secure checkout.',
  },
  {
    id: 'faq-fb-followers-does-help',
    question: 'Does buying Facebook followers help?',
    answer:
      'Follower packages increase the visible audience displayed on your page, but they do not guarantee engagement, leads, sales or improved organic reach.',
  },
  {
    id: 'faq-fb-followers-can-people-tell',
    question: 'Can people tell if you buy Facebook followers?',
    answer:
      'Visitors can see the public follower count on a Facebook page, but Facebook does not label whether followers were obtained through a purchased package. No provider can guarantee how Facebook evaluates account activity.',
  },
  {
    id: 'faq-fb-followers-are-real',
    question: 'Are Facebook followers real?',
    answer:
      'Package details vary between providers. Review the service description, delivery information and published policies before placing your order so you understand what is included.',
  },
  {
    id: 'faq-fb-followers-should-buy',
    question: 'Should I buy Facebook followers?',
    answer:
      'That depends on your marketing goals. Follower packages can support the visible audience of a Facebook page, but long-term success still depends on consistent publishing and community engagement.',
  },
  {
    id: 'faq-fb-followers-monetization',
    question: 'Does buying Facebook followers affect monetization?',
    answer:
      "Facebook's monetization programs are based on multiple eligibility requirements. Purchasing follower packages does not guarantee approval or automatically affect monetization outcomes.",
  },
  {
    id: 'faq-fb-followers-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. NovaLikes only requires your public Facebook Page URL to process an order.',
    homepageFilter: 'Page Requirements',
  },
  {
    id: 'faq-fb-followers-order-again',
    question: 'Can I order more followers later?',
    answer:
      'Yes. Additional follower packages can be purchased after your previous order has been completed.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-which-package',
    question: 'Which Facebook follower package should I choose?',
    answer:
      "Choose a quantity that matches your page's current audience and business objectives. Smaller packages are suitable for newer pages, while larger packages may better support established businesses and brands.",
  },
  // Legacy Facebook Followers FAQ IDs retained for schema stability
  {
    id: 'faq-fb-followers-choose-package',
    question: 'How do I choose the right Facebook Followers package?',
    answer:
      'Compare available [Facebook Followers Packages](/buy-facebook-followers#pricing-packages) with your page size and growth goals. Review quantity, price and delivery details before checkout.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-fb-followers-public',
    question: 'Does my Facebook page need to be public?',
    answer:
      'Yes. Keep your Facebook page publicly accessible while the order is processed. Restricted pages can delay delivery until public access is restored.',
    homepageFilter: 'Page Requirements',
  },
  {
    id: 'faq-fb-followers-delivery-begin',
    question: 'When does delivery begin?',
    answer:
      'Delivery begins after the order is reviewed and confirmed. Timing depends on the selected package and current demand. Check the package details before ordering.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-track',
    question: 'Can I track my order?',
    answer:
      'Yes. Use your order ID and checkout email on the [Order Tracking](/track-order) page to review available delivery updates.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-change-url',
    question: 'Can I change my page URL after checkout?',
    answer:
      'Contact [support](/contact) as soon as possible if the wrong page URL was submitted. A change may only be possible before processing or delivery begins.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-after-checkout',
    question: 'What happens after checkout?',
    answer:
      'You receive order confirmation after successful payment. The page URL and package are reviewed, delivery is scheduled and progress remains available through order tracking.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-gradual',
    question: 'Are followers delivered gradually?',
    answer:
      'Gradual delivery may be available where it is listed for the selected package. Review the delivery information shown before checkout.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-support',
    question: 'How do I contact support?',
    answer:
      'Visit the [Contact](/contact) page or open the [FAQ](/faq) hub with your order ID and checkout email. Do not send passwords or private Facebook account details.',
    homepageFilter: 'Support',
  },
  // Buy Facebook Page Likes — AI Overview FAQs
  {
    id: 'faq-fb-page-likes-can-buy',
    question: 'Can you buy Facebook Page Likes?',
    answer:
      'Yes. You can purchase Facebook Page Like packages by selecting a package, entering your public Facebook Page URL and completing secure checkout. Your Facebook password is not required.',
  },
  {
    id: 'faq-fb-page-likes-how-buy',
    question: 'How do you buy Facebook Page Likes?',
    answer:
      'Choose your preferred package, provide your public Facebook Page URL, review your order details and complete checkout.',
  },
  {
    id: 'faq-fb-page-likes-does-help',
    question: 'Does buying Facebook Page Likes help?',
    answer:
      'Page Likes can strengthen the visible popularity of a Facebook page and improve first impressions for visitors, but they do not guarantee engagement, sales or organic reach.',
  },
  {
    id: 'faq-fb-page-likes-businesses',
    question: 'Can businesses buy Facebook Page Likes?',
    answer:
      'Businesses, creators, organizations and public brands can purchase Page Like packages for publicly accessible Facebook pages.',
  },
  {
    id: 'faq-fb-page-likes-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. Orders are processed using only your public Facebook Page URL. Your Facebook password is never requested.',
  },
  {
    id: 'faq-fb-page-likes-delivery',
    question: 'How long does delivery take?',
    answer:
      'Delivery timing depends on the selected package and current processing volume. Estimated delivery information is displayed before checkout.',
  },
  {
    id: 'faq-fb-page-likes-order-again',
    question: 'Can I order another package later?',
    answer:
      'Yes. Additional Page Like packages can be purchased after your previous order has been completed.',
  },
  {
    id: 'faq-fb-page-likes-vs-followers',
    question: 'Are Page Likes the same as Followers?',
    answer:
      'No. Page Likes and Followers are different Facebook metrics. Page Likes strengthen the visible popularity of a page, while Followers represent the audience receiving future updates.',
  },
  {
    id: 'faq-fb-page-likes-which-package',
    question: 'Which Page Like package should I choose?',
    answer:
      'Choose a package that aligns with your current page size, marketing goals and overall Facebook strategy rather than simply selecting the largest quantity.',
  },
  {
    id: 'faq-fb-page-likes-requirements',
    question: 'What information is required to place an order?',
    answer:
      'You only need your public Facebook Page URL, the selected package and a valid email address for order confirmation and tracking.',
  },
  // Buy Facebook Post Likes — AI Overview FAQs
  {
    id: 'faq-fb-post-likes-can-buy',
    question: 'Can you buy Facebook Post Likes?',
    answer:
      'Yes. You can purchase Post Like packages by selecting a package, providing the public URL of your Facebook post and completing secure checkout.',
  },
  {
    id: 'faq-fb-post-likes-password',
    question: 'Do I need my Facebook password?',
    answer: 'No. NovaLikes only requires the public URL of your Facebook post.',
  },
  {
    id: 'faq-fb-post-likes-does-help',
    question: 'Does buying Facebook Post Likes help?',
    answer:
      'Post Likes can strengthen the visible engagement on a specific Facebook post, but they do not guarantee additional reach, comments or sales.',
  },
  {
    id: 'faq-fb-post-likes-old-post',
    question: 'Can I buy Likes for an older Facebook post?',
    answer:
      'Yes, provided the post is still publicly accessible and eligible for processing.',
  },
  {
    id: 'faq-fb-post-likes-existing-post',
    question: 'Can I buy Likes for an existing Facebook post?',
    answer:
      'Yes. You can order Post Likes for an existing public Facebook post by submitting that post’s public URL and completing checkout.',
  },
  {
    id: 'faq-fb-post-likes-order-again',
    question: 'Can I order another package later?',
    answer:
      'Yes. You can place another order after your previous delivery has been completed.',
  },
  {
    id: 'faq-fb-post-likes-vs-page-likes',
    question: 'What is the difference between Post Likes and Page Likes?',
    answer:
      'Post Likes apply to a single Facebook post, while Page Likes increase the visible Like count of your Facebook Business Page.',
  },
  {
    id: 'faq-fb-post-likes-public',
    question: 'Do I need a public Facebook post?',
    answer: 'Yes. The selected Facebook post must remain public during processing.',
  },
  {
    id: 'faq-fb-post-likes-comments-shares',
    question: 'Will buying Post Likes increase comments or shares?',
    answer:
      'No. Post Like packages increase the visible Like count on the selected post. They do not guarantee additional comments, shares, reach or sales.',
  },
  {
    id: 'faq-fb-post-likes-track',
    question: 'Can I track my order?',
    answer: 'Yes. Order tracking is available after your purchase has been confirmed.',
  },
  {
    id: 'faq-fb-post-likes-requirements',
    question: 'What information is required to place an order?',
    answer:
      'You only need the public Facebook Post URL, your selected package and a valid email address.',
  },
  {
    id: 'faq-fb-post-likes-which-package',
    question: 'Which package should I choose?',
    answer:
      'Choose the quantity that best matches the importance of your post, your campaign objectives and its current engagement level.',
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
