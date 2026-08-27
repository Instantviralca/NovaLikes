import { aboutContent, contactContent } from '@/data/content/company';

export function getEnglishAboutSource() {
  return {
    hero: {
      eyebrow: aboutContent.hero.eyebrow ?? '',
      title: aboutContent.hero.title,
      description: aboutContent.hero.description ?? '',
      trustLabels: (aboutContent.hero.trustLabels ?? []).map((item) => ({
        id: item.id,
        label: item.label,
      })),
      visual: {
        alt: aboutContent.hero.visual?.alt ?? '',
      },
    },
    mission: {
      title: aboutContent.mission.title,
      description: aboutContent.mission.description ?? '',
    },
    whyChoose: {
      title: aboutContent.whyChoose.title,
      description: aboutContent.whyChoose.description ?? '',
      items: aboutContent.whyChoose.items.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? '',
      })),
    },
    trust: {
      title: aboutContent.trust.title,
      description: aboutContent.trust.description ?? '',
      items: aboutContent.trust.items.map((item) => ({
        id: item.id,
        title: item.title,
      })),
    },
    finalCta: {
      title: aboutContent.finalCta.title,
      description: aboutContent.finalCta.description,
      primaryCta: {
        label: aboutContent.finalCta.primaryCta.label,
      },
    },
    chrome: {
      breadcrumb: 'About NovaLikes',
      heroAria: 'About NovaLikes',
      missionEyebrow: 'OUR MISSION',
      commitmentEyebrow: 'OUR COMMITMENT',
      statsAria: 'NovaLikes highlights',
      missionImageAlt: 'NovaLikes mission target illustration',
      commitmentImageAlt: 'NovaLikes trust and commitment illustration',
      statsCustomers: 'Happy Customers',
      statsOrders: 'Orders Delivered',
      statsRating: 'Average Rating',
      statsSuccess: 'Order Success Rate',
    },
  };
}

export type AboutPageOverlay = ReturnType<typeof getEnglishAboutSource>;

export function getEnglishContactSource() {
  return {
    hero: {
      eyebrow: contactContent.hero.eyebrow ?? '',
      title: contactContent.hero.title,
      description: contactContent.hero.description ?? '',
      trustLabels: (contactContent.hero.trustLabels ?? []).map((item) => ({
        id: item.id,
        label: item.label,
      })),
      visual: {
        alt: contactContent.hero.visual?.alt ?? '',
      },
    },
    form: {
      title: contactContent.form.title,
      description: contactContent.form.description ?? '',
      fields: contactContent.form.fields,
    },
    business: {
      title: contactContent.business.title,
    },
    faqPreview: {
      title: contactContent.faqPreview.title,
      description: contactContent.faqPreview.description ?? '',
      viewAllCta: {
        label: contactContent.faqPreview.viewAllCta.label,
      },
    },
    finalCta: {
      title: contactContent.finalCta.title,
      description: contactContent.finalCta.description,
      primaryCta: {
        label: contactContent.finalCta.primaryCta.label,
      },
    },
    chrome: {
      breadcrumb: 'Contact Us',
      heroAria: 'Contact NovaLikes',
      sendAnother: 'Send another message',
      sending: 'Sending…',
      submitError: 'Unable to send your message.',
      privacyNote: 'Your information is safe and will never be shared.',
      fullNameRequired: 'Full name is required.',
      emailRequired: 'Email address is required.',
      emailInvalid: 'Enter a valid email address.',
      subjectRequired: 'Subject is required.',
      messageRequired: 'Message is required.',
      messageMin: 'Message must be at least 20 characters.',
      emailTitle: 'Email Support',
      emailReply: 'We reply within minutes',
      liveChatTitle: 'Live Chat',
      liveChatAvailable: 'Available 24/7 on our website',
      liveChatHelp: 'Get instant help from our team',
      quickTitle: 'Quick Support',
      quickHours: 'Mon – Sun: 24/7',
      quickReach: 'Reach us anytime through the contact form',
      responseTitle: 'Response Time',
      responseAverage: 'Average response time:',
      responseTime: 'Under 15 minutes',
      orderTitle: 'Order Support',
      orderHelp: 'Need help with an order?',
      orderLink: 'Visit Order Support Page →',
    },
  };
}

export type ContactPageOverlay = ReturnType<typeof getEnglishContactSource>;

export function getEnglishReviewsPageSource() {
  return {
    eyebrow: 'CUSTOMER FEEDBACK',
    h1: 'NovaLikes Reviews',
    intro:
      "Customer reviews from NovaLikes' published review catalogue. Ratings below reflect that catalogue and may include both 4-star and 5-star feedback.",
    catalogueHeading: 'Customer review catalogue',
    emptyFilter: 'No reviews match this platform filter.',
    showingTemplate: 'Showing {visible} of {total} {word}',
    reviewSingular: 'review',
    reviewPlural: 'reviews',
    loadMore: 'Load More Reviews',
    emptyCatalogue: 'Customer reviews will appear here when approved feedback is available.',
    filterAria: 'Filter reviews by platform',
    filterAll: 'All',
    basedOnTemplate: 'Based on {count} customer {word}',
    exploreTitle: 'Ready to Explore NovaLikes?',
    exploreIntro:
      "Browse our Instagram, TikTok and Facebook services and choose the option that fits what you're looking for.",
    exploreInstagram: 'Explore Instagram',
    exploreTikTok: 'Explore TikTok',
    exploreFacebook: 'Explore Facebook',
    readMore: 'Read more',
    showLess: 'Show less',
    chrome: {
      breadcrumb: 'Reviews',
    },
  };
}

export type ReviewsPageOverlay = ReturnType<typeof getEnglishReviewsPageSource>;
