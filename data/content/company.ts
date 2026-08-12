import { routes } from '@/config/routes';
import { resolveCta } from '@/data/content/cta';
import type {
  AboutPageContent,
  CompanyPageContent,
  ContactPageContent,
  FaqPageContent,
} from '@/types/content';

/**
 * About Us — Document 13.01 production content.
 * Do not invent awards, certifications, partnerships, customer counts, or guarantees.
 */
export const aboutContent: AboutPageContent = {
  id: 'about',
  path: routes.about,
  seo: {
    title: 'About NovaLikes | Social Media Growth Since 2018',
    description:
      'Learn about NovaLikes, our mission, customer-first approach, secure ordering process, and commitment to transparent social media growth services.',
  },
  hero: {
    title: 'About NovaLikes',
    description:
      'NovaLikes helps creators, businesses, agencies, and brands purchase social media growth services through a transparent ordering experience backed by real package data, secure checkout, and customer support.',
    purpose: 'Introduce NovaLikes as a trusted social media growth provider',
    primaryKeyword: 'About NovaLikes',
    primaryCta: {
      label: 'Browse Services',
      href: routes.home,
    },
    secondaryCta: {
      label: 'Contact Us',
      href: routes.contact,
    },
  },
  story: {
    id: 'our-story',
    title: 'Our Story',
    description: 'A clearer way to buy social media growth services.',
    purpose: 'Share company journey without unverifiable historical claims',
    body: 'NovaLikes was built to make social media growth services easier to understand and order. Creators, businesses, agencies, and brands often need a straightforward way to compare packages, submit the required public URL, complete secure checkout, and track progress — without sharing account passwords.\n\nWe focus on transparency in how packages are presented, clarity in what is required to place an order, and continuous improvement of the ordering experience. Our goal is a customer-focused process that stays honest about what we provide and what we do not invent.',
  },
  mission: {
    id: 'mission-and-values',
    title: 'Mission & Values',
    description:
      'The principles that guide how we present services, process orders, and support customers.',
    purpose: 'Communicate mission values from Document 13.01',
    items: [
      {
        id: 'about-value-transparency',
        title: 'Transparency',
        description:
          'We present real package options and clear order requirements so customers can make informed decisions.',
      },
      {
        id: 'about-value-ordering',
        title: 'Reliable Ordering',
        description:
          'The ordering flow is designed to be simple: choose a service, select a package, submit the required URL, and complete checkout.',
      },
      {
        id: 'about-value-support',
        title: 'Customer Support',
        description:
          'Support is available for package questions, order updates, and help during processing.',
      },
      {
        id: 'about-value-checkout',
        title: 'Secure Checkout',
        description:
          'Checkout is handled through a secure process so customers can place orders with confidence.',
      },
      {
        id: 'about-value-improvement',
        title: 'Continuous Improvement',
        description:
          'We keep refining the experience around clearer package information, smoother ordering, and better customer communication.',
      },
    ],
  },
  whyChoose: {
    id: 'why-customers-choose-novalikes',
    title: 'Why Customers Choose NovaLikes',
    description:
      'Practical reasons customers use NovaLikes when they need a clear path from package selection to order tracking.',
    purpose: 'Explain customer-facing strengths without invented claims',
    items: [
      {
        id: 'about-why-password',
        title: 'No Password Required',
        description:
          'Orders use public profile, page, or content URLs. NovaLikes does not ask for social media passwords.',
      },
      {
        id: 'about-why-catalog',
        title: 'Real Package Catalog',
        description:
          'Quantities and prices come from the real NovaLikes.com package data — not invented frontend placeholders.',
      },
      {
        id: 'about-why-checkout',
        title: 'Secure Checkout',
        description:
          'Complete your order through a secure checkout flow after reviewing package and delivery details.',
      },
      {
        id: 'about-why-support',
        title: 'Responsive Support',
        description:
          'Get help with package selection, order status, and processing questions when you need it.',
      },
      {
        id: 'about-why-delivery',
        title: 'Clear Delivery Information',
        description:
          'Delivery estimates shown on packages come from the real pricing data associated with each option.',
      },
      {
        id: 'about-why-refund',
        title: 'Refund Policy',
        description:
          'Eligible purchases are covered under the Refund Policy and the conditions published for each service.',
      },
    ],
  },
  platforms: {
    id: 'platforms-we-support',
    title: 'Platforms We Support',
    description:
      'Browse growth services across the platforms NovaLikes currently supports.',
    purpose: 'Link to platforms from the Service Registry',
    platformIds: ['instagram', 'tiktok', 'facebook', 'youtube'],
  },
  process: {
    id: 'our-process',
    title: 'Our Process',
    description: 'A simple path from service selection to order tracking.',
    purpose: 'Explain the five-step ordering process',
    steps: [
      {
        id: 'about-process-1',
        title: 'Choose a Service',
        description: 'Select the platform and growth service that fits your goals.',
      },
      {
        id: 'about-process-2',
        title: 'Select a Package',
        description: 'Review real quantities, prices, and package details before you continue.',
      },
      {
        id: 'about-process-3',
        title: 'Submit Required URL',
        description: 'Provide the public profile, page, or content URL needed for fulfillment.',
      },
      {
        id: 'about-process-4',
        title: 'Secure Checkout',
        description: 'Enter your email, choose a payment method, accept the terms, and place the order.',
      },
      {
        id: 'about-process-5',
        title: 'Track Your Order',
        description: 'Use your order ID and checkout email on the Track Order page to view progress.',
      },
    ],
  },
  trust: {
    id: 'trust-and-security',
    title: 'Trust & Security',
    description:
      'We keep trust signals grounded in how the product actually works — not in unverifiable claims.',
    purpose: 'Reinforce trust without inventing awards or guarantees',
    disclaimer:
      'NovaLikes does not invent awards, certifications, partnerships, customer counts, or guarantees on this page. Trust is built through clear package data, secure checkout, transparent policies, and responsive support.',
    items: [
      {
        id: 'about-trust-password',
        title: 'Password-Free Ordering',
        description:
          'Only public URLs are requested for fulfillment. Account passwords are never part of the order form.',
      },
      {
        id: 'about-trust-data',
        title: 'Real Package Data',
        description:
          'Service pages display package information from the NovaLikes.com pricing source rather than fabricated tiers.',
      },
      {
        id: 'about-trust-policies',
        title: 'Published Policies',
        description:
          'Refund, privacy, and terms pages are available so customers can review how orders and data are handled.',
      },
      {
        id: 'about-trust-tracking',
        title: 'Customer-Facing Tracking',
        description:
          'Order progress is available through the Track Order page using the order ID and checkout email.',
      },
    ],
  },
  finalCta: {
    id: 'about-final-cta',
    title: 'Ready to Explore NovaLikes Services?',
    description:
      'Browse available growth services, review real package options, and place an order with a clear, password-free process.',
    purpose: 'Drive visitors to services or contact',
    primaryCta: {
      label: 'Browse Services',
      href: routes.home,
    },
    secondaryCta: {
      label: 'Contact Us',
      href: routes.contact,
    },
  },
};

/**
 * Contact Us — Document 13.02 production content.
 * Business address, phone, office hours, and social links come from configuration only.
 */
export const contactContent: ContactPageContent = {
  id: 'contact',
  path: routes.contact,
  seo: {
    title: 'Contact NovaLikes | Customer Support',
    description:
      'Contact NovaLikes for sales, support, order enquiries, and general questions. Reach our team through the official contact form and support channels.',
  },
  hero: {
    title: 'Contact NovaLikes',
    description:
      'Need help choosing a package, checking an order, or asking a general question? Our team is here to help.',
    purpose: 'Help customers reach NovaLikes for sales and support',
    primaryKeyword: 'Contact NovaLikes',
    primaryCta: {
      label: 'Track Your Order',
      href: routes.trackOrder,
    },
    secondaryCta: {
      label: 'Browse Services',
      href: routes.home,
    },
  },
  contactOptions: {
    id: 'contact-options',
    title: 'How Can We Help?',
    description: 'Choose the topic that best matches your enquiry, then send a message through the form below.',
    purpose: 'Present contact option cards',
    items: [
      {
        id: 'contact-option-sales',
        title: 'Sales',
        description:
          'Questions about packages, pricing, or which service fits your goals before you place an order.',
      },
      {
        id: 'contact-option-support',
        title: 'Customer Support',
        description:
          'Help with account questions, delivery expectations, or using NovaLikes services.',
      },
      {
        id: 'contact-option-orders',
        title: 'Order Enquiries',
        description:
          'Updates or questions about an existing order. Include your order ID when you can.',
      },
      {
        id: 'contact-option-general',
        title: 'General Questions',
        description:
          'Other enquiries about NovaLikes, policies, or how our ordering process works.',
      },
    ],
  },
  form: {
    id: 'contact-form',
    title: 'Send Us a Message',
    description:
      'Share a few details and we will follow up using the email address you provide.',
    purpose: 'Collect contact form submissions',
    fields: {
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@email.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'How can we help?',
      orderIdLabel: 'Order ID',
      orderIdPlaceholder: 'Optional — e.g. IV-1001',
      orderIdHelper: 'Optional. Include this if your message relates to an existing order.',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us what you need help with…',
      submitLabel: 'Send Message',
      successTitle: 'Message ready to send',
      successDescription:
        'Your message has been validated successfully. A support channel will be connected here when email delivery is configured.',
    },
  },
  business: {
    id: 'business-information',
    title: 'Business Information',
    description:
      'Verified details from NovaLikes configuration. Unavailable fields are hidden rather than invented.',
    purpose: 'Show only configured business contact details',
    emptyMessage:
      'Additional contact details such as phone number, office address, and office hours will appear here when they are added to site configuration.',
  },
  faqPreview: {
    id: 'contact-faq-preview',
    title: 'Common Questions',
    description: 'Quick answers before you write to us. Browse the full FAQ for more topics.',
    purpose: 'Preview FAQ entries and link to the FAQ page',
    faqIds: [
      'faq-password',
      'faq-track-order',
      'faq-support',
      'faq-how-ordering-works',
    ],
    viewAllCta: {
      label: 'View all FAQs',
      href: routes.faq,
    },
  },
  finalCta: {
    id: 'contact-final-cta',
    title: 'Prefer to Check an Order First?',
    description:
      'Use Track Order with your order ID and checkout email, or browse services if you are ready to choose a package.',
    purpose: 'Offer track order and browse services exits',
    primaryCta: {
      label: 'Track Your Order',
      href: routes.trackOrder,
    },
    secondaryCta: {
      label: 'Browse Services',
      href: routes.home,
    },
  },
};

/**
 * FAQ hub page chrome — Document 13.03.
 * Questions and answers remain in data/content/faq-hub.ts + faq.ts.
 */
export const faqPageContent: FaqPageContent = {
  id: 'faq',
  path: routes.faq,
  seo: {
    title: 'NovaLikes FAQ | Orders, Delivery, Payments & Support',
    description:
      'Find answers about NovaLikes services, real packages, delivery times, payments, refunds, refill eligibility, order tracking, and customer support.',
  },
  hero: {
    eyebrow: 'HELP CENTER',
    title: 'Frequently Asked Questions',
    description:
      'Find clear answers about NovaLikes services, real package options, delivery estimates, payments, refunds, refill eligibility, order tracking, and customer support. Use the search field or choose a category to quickly find the information you need.',
    purpose: 'Help customers find answers before contacting support',
    primaryKeyword: 'NovaLikes FAQ',
    primaryCta: {
      label: 'Track an Order',
      href: routes.trackOrder,
    },
    secondaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
  },
  search: {
    label: 'Search questions',
    placeholder: 'Search questions',
    clearLabel: 'Clear',
    emptyState:
      'No matching questions were found. Try another search or contact support.',
  },
  categoriesTitle: 'Categories',
  refundPolicyCta: {
    label: 'Read the Refund Policy',
    href: routes.refundPolicy,
  },
  finalCta: {
    id: 'faq-contact-support-cta',
    title: 'Still Need Help?',
    description:
      'Contact the NovaLikes support team with your question. Include your order ID when asking about an existing order so the team can review it more efficiently.',
    purpose: 'Offer contact and track-order exits',
    primaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
    secondaryCta: {
      label: 'Track an Order',
      href: routes.trackOrder,
    },
  },
};

/** Company / support page content shells — placeholders until their production docs land. */
export const companyContent: Record<CompanyPageContent['id'], CompanyPageContent> = {
  about: {
    id: 'about',
    path: routes.about,
    hero: {
      title: aboutContent.hero.title,
      description: aboutContent.hero.description,
      purpose: aboutContent.hero.purpose,
      primaryKeyword: aboutContent.hero.primaryKeyword,
      primaryCta: aboutContent.hero.primaryCta,
      secondaryCta: aboutContent.hero.secondaryCta,
    },
    sections: [
      {
        id: aboutContent.story.id,
        title: aboutContent.story.title,
        description: aboutContent.story.description,
      },
      {
        id: aboutContent.mission.id,
        title: aboutContent.mission.title,
        description: aboutContent.mission.description,
      },
      {
        id: aboutContent.whyChoose.id,
        title: aboutContent.whyChoose.title,
        description: aboutContent.whyChoose.description,
      },
      {
        id: aboutContent.platforms.id,
        title: aboutContent.platforms.title,
        description: aboutContent.platforms.description,
      },
      {
        id: aboutContent.process.id,
        title: aboutContent.process.title,
        description: aboutContent.process.description,
      },
      {
        id: aboutContent.trust.id,
        title: aboutContent.trust.title,
        description: aboutContent.trust.description,
      },
    ],
    cta: aboutContent.finalCta.primaryCta,
  },
  reviews: {
    id: 'reviews',
    path: routes.reviews,
    hero: {
      title: 'Customer Reviews',
      description:
        'Read approved NovaLikes customer reviews. Ratings and counts match our published review catalogue.',
      purpose: 'Aggregate customer social proof',
      primaryKeyword: 'novalikes reviews',
    },
    sections: [
      {
        id: 'reviews-list',
        title: 'Customer reviews',
        description: 'All approved NovaLikes customer reviews.',
      },
    ],
    testimonialIds: [],
    cta: resolveCta('getStarted'),
  },
  contact: {
    id: 'contact',
    path: routes.contact,
    hero: {
      title: contactContent.hero.title,
      description: contactContent.hero.description,
      purpose: contactContent.hero.purpose,
      primaryKeyword: contactContent.hero.primaryKeyword,
      primaryCta: contactContent.hero.primaryCta,
      secondaryCta: contactContent.hero.secondaryCta,
    },
    sections: [
      {
        id: contactContent.contactOptions.id,
        title: contactContent.contactOptions.title,
        description: contactContent.contactOptions.description,
      },
      {
        id: contactContent.form.id,
        title: contactContent.form.title,
        description: contactContent.form.description,
      },
      {
        id: contactContent.business.id,
        title: contactContent.business.title,
        description: contactContent.business.description,
      },
      {
        id: contactContent.faqPreview.id,
        title: contactContent.faqPreview.title,
        description: contactContent.faqPreview.description,
      },
    ],
    faqIds: contactContent.faqPreview.faqIds,
    cta: contactContent.finalCta.primaryCta,
  },
  faq: {
    id: 'faq',
    path: routes.faq,
    hero: {
      title: faqPageContent.hero.title,
      description: faqPageContent.hero.description,
      purpose: faqPageContent.hero.purpose,
      primaryKeyword: faqPageContent.hero.primaryKeyword,
      primaryCta: faqPageContent.hero.primaryCta,
      secondaryCta: faqPageContent.hero.secondaryCta,
    },
    sections: [
      {
        id: 'faq-categories',
        title: faqPageContent.categoriesTitle,
        description: faqPageContent.search.placeholder,
      },
    ],
    faqIds: [],
    cta: faqPageContent.finalCta.primaryCta,
  },
};

export function getAboutContent(): AboutPageContent {
  return aboutContent;
}

export function getContactContent(): ContactPageContent {
  return contactContent;
}

export function getFaqPageContent(): FaqPageContent {
  return faqPageContent;
}

export function getCompanyContent(id: CompanyPageContent['id']): CompanyPageContent {
  return companyContent[id];
}
