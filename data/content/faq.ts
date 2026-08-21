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
      'Many services need the relevant profile or content to remain public during delivery. Exact requirements appear on the service page before checkout. Private or restricted profiles may delay or prevent delivery. Keep the username or URL accurate, and contact support before ordering if you are unsure whether your account qualifies.',
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
      'Delivery timelines vary by service and package. Expected start and delivery information should be shown on the relevant service page before you order.',
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
      'Processing time can vary depending on the package size and current order conditions. Check your order status for available updates rather than relying on one fixed delivery time for every package.',
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
      'Keep the profile publicly accessible where required for the selected service while the order is being processed. If you are unsure about your account setup, check the service details or contact support before ordering.',
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
  // Buy Instagram Likes — service FAQ set
  {
    id: 'faq-ig-likes-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password for an Instagram likes order. You only need to provide the correct public URL for the content.',
  },
  {
    id: 'faq-ig-likes-links',
    question: 'What do I need to buy Instagram likes?',
    answer:
      'You need the public URL for the Instagram post or Reel and the likes package you want to order. Your Instagram password is not required.',
  },
  {
    id: 'faq-ig-likes-delivery-speed',
    question: 'How long does an Instagram likes order take?',
    answer:
      'Processing time can vary depending on the package size and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-ig-likes-gradual-delivery',
    question: 'What happens if I submit the wrong Instagram URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the URL carefully before checkout because the submitted post or Reel is used to process the order.',
  },
  {
    id: 'faq-ig-likes-refill',
    question: 'Will buying Instagram likes also increase my followers or views?',
    answer:
      'Not automatically. Likes, followers, views, and comments are separate services. An Instagram likes package applies to the like count on the selected post or Reel.',
  },
  {
    id: 'faq-ig-likes-reel',
    question: 'Which Instagram likes package should I choose?',
    answer:
      'Choose based on the number of likes you want for the selected post or Reel and the price you are comfortable with. The available quantities and current prices are shown in the pricing section above.',
  },
  {
    id: 'faq-ig-likes-money-back',
    question: 'Does the Instagram post or Reel need to be public?',
    answer:
      'Keep the submitted content publicly accessible where required while the order is being processed. If you are unsure whether your content can be used, check the service details or contact support before ordering.',
  },
  {
    id: 'faq-ig-likes-track',
    question: 'Can I track my Instagram likes order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  // Buy Instagram Views — service FAQ set
  {
    id: 'faq-ig-views-need',
    question: 'What do I need to buy Instagram views?',
    answer:
      'You need the public URL for the Instagram Reel or video and the views package you want to order. Your Instagram password is not required.',
  },
  {
    id: 'faq-ig-views-package',
    question: 'Which Instagram views package should I choose?',
    answer:
      'Choose based on the number of views you want for the selected Reel or video and the price you are comfortable with. The available quantities and current prices are shown in the pricing section above.',
  },
  {
    id: 'faq-ig-views-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password for an Instagram views order. You only need to provide the correct public URL for the video content.',
  },
  {
    id: 'faq-ig-views-how-long',
    question: 'How long does an Instagram views order take?',
    answer:
      'Processing time can vary depending on the package size and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-ig-views-track',
    question: 'Can I track my Instagram views order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-ig-views-wrong-url',
    question: 'What happens if I submit the wrong Instagram video URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the URL carefully before checkout because the submitted Reel or video is used to process the order.',
  },
  {
    id: 'faq-ig-views-other-metrics',
    question: 'Will buying Instagram views also increase my likes or followers?',
    answer:
      'Not automatically. Views, likes, followers, and comments are separate services. An Instagram views package applies to the view count on the selected Reel or video.',
  },
  {
    id: 'faq-ig-views-public',
    question: 'Does the Instagram Reel or video need to be public?',
    answer:
      'Keep the submitted content publicly accessible where required while the order is being processed. If you are unsure whether your video can be used, check the service details or contact support before ordering.',
  },
  // Buy Instagram Comments — service FAQ set
  {
    id: 'faq-ig-comments-need',
    question: 'What do I need to buy Instagram comments?',
    answer:
      'You need the public URL for the Instagram post or Reel and the comments package you want to order. Your Instagram password is not required.',
  },
  {
    id: 'faq-ig-comments-package',
    question: 'Which Instagram comments package should I choose?',
    answer:
      'Compare the available package types, comment quantities, and current prices, then choose the option that fits what you want for the selected post or Reel.',
  },
  {
    id: 'faq-ig-comments-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. NovaLikes does not require your Instagram password for an Instagram comments order. You only need to provide the correct public URL for the content.',
  },
  {
    id: 'faq-ig-comments-how-long',
    question: 'How long does an Instagram comments order take?',
    answer:
      'Processing time can vary depending on the selected package, quantity, and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every order.',
  },
  {
    id: 'faq-ig-comments-track',
    question: 'Can I track my Instagram comments order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-ig-comments-wrong-url',
    question: 'What happens if I submit the wrong Instagram URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the URL carefully before checkout because the submitted post or Reel is used to process the order.',
  },
  {
    id: 'faq-ig-comments-other-metrics',
    question: 'Will buying Instagram comments also increase my likes, views, or followers?',
    answer:
      'Not automatically. Comments, likes, views, and followers are separate services. An Instagram comments package applies to the selected post or Reel.',
  },
  {
    id: 'faq-ig-comments-public',
    question: 'Does the Instagram post or Reel need to be public?',
    answer:
      'Keep the submitted content publicly accessible where required while the order is being processed. If you are unsure whether your content can be used, check the service details or contact support before ordering.',
  },
  // Buy TikTok Followers — service FAQ set
  {
    id: 'faq-tt-followers-need',
    question: 'What do I need to buy TikTok followers?',
    answer:
      'You need the public TikTok username for the profile and the follower package you want to order. Your TikTok password is not required.',
  },
  {
    id: 'faq-tt-followers-package',
    question: 'Which TikTok followers package should I choose?',
    answer:
      'Choose based on the number of followers you want for the selected profile and the price you are comfortable with. The available quantities and current prices are shown in the pricing section above.',
  },
  {
    id: 'faq-tt-followers-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password for a followers order. You only need to provide the correct public TikTok username.',
  },
  {
    id: 'faq-tt-followers-how-long',
    question: 'How long does a TikTok followers order take?',
    answer:
      'Processing time can vary depending on the follower quantity and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-tt-followers-track',
    question: 'Can I track my TikTok followers order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-tt-followers-wrong-username',
    question: 'What happens if I enter the wrong TikTok username?',
    answer:
      'Contact support as soon as possible with your order details. Check the username carefully before checkout because the submitted profile is used to process the order.',
  },
  {
    id: 'faq-tt-followers-other-metrics',
    question: 'Will buying TikTok followers also increase my likes or views?',
    answer:
      'Not automatically. Followers, likes, and views are separate services. A TikTok followers package applies to the follower count on the selected profile.',
  },
  {
    id: 'faq-tt-followers-public',
    question: 'Does my TikTok profile need to be public?',
    answer:
      'Keep the submitted profile publicly accessible where required while the order is being processed. If you are unsure whether your profile can be used, check the service details or contact support before ordering.',
  },
  // Buy TikTok Likes — service FAQ set
  {
    id: 'faq-tt-likes-need',
    question: 'What do I need to buy TikTok likes?',
    answer:
      'You need the public TikTok video link for the video and the likes package you want to order. Your TikTok password is not required.',
  },
  {
    id: 'faq-tt-likes-package',
    question: 'Which TikTok likes package should I choose?',
    answer:
      'Choose based on the number of likes you want for the selected video and the price you are comfortable with. The available quantities and current prices are shown in the pricing section above.',
  },
  {
    id: 'faq-tt-likes-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password for a likes order. You only need to provide the correct public TikTok video link.',
  },
  {
    id: 'faq-tt-likes-how-long',
    question: 'How long does a TikTok likes order take?',
    answer:
      'Processing time can vary depending on the likes quantity and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-tt-likes-track',
    question: 'Can I track my TikTok likes order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-tt-likes-wrong-url',
    question: 'What happens if I submit the wrong TikTok video link?',
    answer:
      'Contact support as soon as possible with your order details. Check the video link carefully before checkout because the submitted video is used to process the order.',
  },
  {
    id: 'faq-tt-likes-other-metrics',
    question: 'Will buying TikTok likes also increase my followers or views?',
    answer:
      'Not automatically. Likes, followers, and views are separate services. A TikTok likes package applies to the like count on the selected video.',
  },
  {
    id: 'faq-tt-likes-public',
    question: 'Does my TikTok video need to be public?',
    answer:
      'Keep the submitted video publicly accessible where required while the order is being processed. If you are unsure whether your video can be used, check the service details or contact support before ordering.',
  },
  // Buy TikTok Views — service FAQ set
  {
    id: 'faq-tt-views-need',
    question: 'What do I need to buy TikTok views?',
    answer:
      'You need the public TikTok video link for the video and the views package you want to order. Your TikTok password is not required.',
  },
  {
    id: 'faq-tt-views-package',
    question: 'Which TikTok views package should I choose?',
    answer:
      'Choose based on the number of views you want for the selected video, the available package option, and the price you are comfortable with. Review the current options and prices in the pricing section above.',
  },
  {
    id: 'faq-tt-views-password',
    question: 'Do I need to share my TikTok password?',
    answer:
      'No. NovaLikes does not require your TikTok password for a views order. You only need to provide the correct public TikTok video link.',
  },
  {
    id: 'faq-tt-views-how-long',
    question: 'How long does a TikTok views order take?',
    answer:
      'Processing time can vary depending on the views quantity, selected package option, and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-tt-views-track',
    question: 'Can I track my TikTok views order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-tt-views-wrong-url',
    question: 'What happens if I submit the wrong TikTok video link?',
    answer:
      'Contact support as soon as possible with your order details. Check the video link carefully before checkout because the submitted video is used to process the order.',
  },
  {
    id: 'faq-tt-views-other-metrics',
    question: 'Will buying TikTok views also increase my followers or likes?',
    answer:
      'Not automatically. Views, followers, and likes are separate services. A TikTok views package applies to the view count on the selected video.',
  },
  {
    id: 'faq-tt-views-public',
    question: 'Does my TikTok video need to be public?',
    answer:
      'Keep the submitted video publicly accessible where required while the order is being processed. If you are unsure whether your video can be used, check the service details or contact support before ordering.',
  },
  // Buy Facebook Followers — service FAQ set
  {
    id: 'faq-fb-followers-need',
    question: 'What do I need to buy Facebook followers?',
    answer:
      'You need the public Facebook Page URL for the Page and the follower package you want to order. Your Facebook password is not required.',
  },
  {
    id: 'faq-fb-followers-package',
    question: 'Which Facebook followers package should I choose?',
    answer:
      'Choose based on the number of followers you want for the selected Page and the price you are comfortable with. Review the current quantities and prices in the pricing section above.',
  },
  {
    id: 'faq-fb-followers-password',
    question: 'Do I need to share my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password for a followers order. You only need to provide the correct public Facebook Page URL.',
  },
  {
    id: 'faq-fb-followers-how-long',
    question: 'How long does a Facebook followers order take?',
    answer:
      'Processing time can vary depending on the follower quantity and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-fb-followers-track',
    question: 'Can I track my Facebook followers order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-fb-followers-wrong-url',
    question: 'What happens if I submit the wrong Facebook Page URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the Page URL carefully before checkout because the submitted Page is used to process the order.',
  },
  {
    id: 'faq-fb-followers-other-metrics',
    question: 'Will buying Facebook followers also increase Page Likes or Post Likes?',
    answer:
      'Not automatically. Followers, Page Likes, and Post Likes are separate metrics and services. A Facebook followers package applies to the follower count on the selected Page.',
  },
  {
    id: 'faq-fb-followers-public',
    question: 'Does my Facebook Page need to be public?',
    answer:
      'Keep the submitted Page publicly accessible where required while the order is being processed. If you are unsure whether your Page can be used, check the service details or contact support before ordering.',
  },
  // Buy Facebook Page Likes — AI Overview FAQs
  // Buy Facebook Page Likes — service FAQ set
  {
    id: 'faq-fb-page-likes-need',
    question: 'What do I need to buy Facebook Page Likes?',
    answer:
      'You need the public Facebook Page URL for the Page and the Page Likes package you want to order. Your Facebook password is not required.',
  },
  {
    id: 'faq-fb-page-likes-package',
    question: 'Which Facebook Page Likes package should I choose?',
    answer:
      'Choose based on the number of Page Likes you want for the selected Page and the price you are comfortable with. Review the current quantities and prices in the pricing section above.',
  },
  {
    id: 'faq-fb-page-likes-password',
    question: 'Do I need to share my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password for a Page Likes order. You only need to provide the correct public Facebook Page URL.',
  },
  {
    id: 'faq-fb-page-likes-how-long',
    question: 'How long does a Facebook Page Likes order take?',
    answer:
      'Processing time can vary depending on the Page Like quantity and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-fb-page-likes-track',
    question: 'Can I track my Facebook Page Likes order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-fb-page-likes-wrong-url',
    question: 'What happens if I submit the wrong Facebook Page URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the Page URL carefully before checkout because the submitted Page is used to process the order.',
  },
  {
    id: 'faq-fb-page-likes-other-metrics',
    question: 'Will buying Facebook Page Likes also increase Followers or Post Likes?',
    answer:
      'Not automatically. Page Likes, Followers, and Post Likes are separate metrics and services. A Facebook Page Likes package applies to the Page Like count on the selected Page.',
  },
  {
    id: 'faq-fb-page-likes-public',
    question: 'Does my Facebook Page need to be public?',
    answer:
      'Keep the submitted Page publicly accessible where required while the order is being processed. If you are unsure whether your Page can be used, check the service details or contact support before ordering.',
  },
  // Buy Facebook Post Likes — service FAQ set
  {
    id: 'faq-fb-post-likes-need',
    question: 'What do I need to buy Facebook Post Likes?',
    answer:
      'You need the public Facebook post URL for the post and the Post Likes package you want to order. Your Facebook password is not required.',
  },
  {
    id: 'faq-fb-post-likes-package',
    question: 'Which Facebook Post Likes package should I choose?',
    answer:
      'Choose based on the number of Post Likes you want for the selected post and the price you are comfortable with. Review the current quantities and prices in the pricing section above.',
  },
  {
    id: 'faq-fb-post-likes-password',
    question: 'Do I need to share my Facebook password?',
    answer:
      'No. NovaLikes does not require your Facebook password for a Post Likes order. You only need to provide the correct public Facebook post URL.',
  },
  {
    id: 'faq-fb-post-likes-how-long',
    question: 'How long does a Facebook Post Likes order take?',
    answer:
      'Processing time can vary depending on the Post Like quantity and current order conditions. Check your order status for available updates rather than expecting one fixed delivery time for every package.',
  },
  {
    id: 'faq-fb-post-likes-track',
    question: 'Can I track my Facebook Post Likes order?',
    answer:
      'Yes. Use the NovaLikes order tracking option after checkout to check available status information for your purchase.',
  },
  {
    id: 'faq-fb-post-likes-wrong-url',
    question: 'What happens if I submit the wrong Facebook post URL?',
    answer:
      'Contact support as soon as possible with your order details. Check the post URL carefully before checkout because the submitted post is used to process the order.',
  },
  {
    id: 'faq-fb-post-likes-other-metrics',
    question: 'Will buying Facebook Post Likes also increase Followers or Page Likes?',
    answer:
      'Not automatically. Post Likes, Followers, and Page Likes are separate metrics and services. A Facebook Post Likes package applies to the like count on the specific submitted post.',
  },
  {
    id: 'faq-fb-post-likes-public',
    question: 'Does my Facebook post need to be public?',
    answer:
      'Keep the submitted post publicly accessible where required while the order is being processed. If you are unsure whether your post can be used, check the service details or contact support before ordering.',
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
