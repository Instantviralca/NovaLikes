export type PackagesPageMetric = 'followers' | 'likes' | 'views';

/** Serializable Lucide icon keys — resolved in UI components (RSC-safe). */
export type PackagesIconKey =
  | 'briefcase'
  | 'clapperboard'
  | 'heart'
  | 'megaphone'
  | 'sparkles'
  | 'users'
  | 'credit-card'
  | 'headphones'
  | 'lock'
  | 'map-pin'
  | 'shield-check'
  | 'truck';

export type PackagesFitCard = {
  id: string;
  quantity: string;
  title: string;
  description: string;
  bestFor: string;
  icon: PackagesIconKey;
};

export type PackagesTimelineStep = {
  id: string;
  label: string;
  /** Optional supporting copy under the step label. */
  description?: string;
};

export type PackagesWhyFeature = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type PackagesComparisonRow = {
  id: string;
  packageLabel: string;
  delivery: string;
  recommended: string;
  popularity: string;
  highlighted?: boolean;
};

export type PackagesPageConfig = {
  metric: PackagesPageMetric;
  fit: {
    title: string;
    description: string;
    cards: PackagesFitCard[];
    /** `cards` (default): tall recommendation cards. `compact`: two-column table. */
    layout?: 'cards' | 'compact';
  };
  timeline: {
    title: string;
    description: string;
    steps: PackagesTimelineStep[];
  };
  whyOrder: {
    title: string;
    description: string;
    features: PackagesWhyFeature[];
  };
  comparison: {
    title: string;
    description: string;
    rows: PackagesComparisonRow[];
    /**
     * `competitor` (default): Package / Delivery / Recommended / NovaLikes / Typical Providers.
     * `approach`: Package / Recommended For / Package Approach.
     */
    layout?: 'competitor' | 'approach';
  };
  learnMore: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  /** Optional compact trust strip (package-selection pages). */
  trustStrip?: readonly {
    id: string;
    label: string;
    icon: PackagesIconKey;
  }[];
  /** Package-size option cards (Starter → Large Scale). */
  optionTiers?: {
    title: string;
    description?: string;
    cards: Array<{
      id: string;
      name: string;
      quantity: string;
      detail: string;
    }>;
  };
  /** Short helpful tips cards. */
  tips?: {
    title: string;
    description?: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: PackagesIconKey;
    }>;
  };
  summaryBenefits: readonly string[];
  /** Premium info pills shown under package price. */
  infoPills: readonly string[];
};

export const INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG: PackagesPageConfig = {
  metric: 'followers',
  fit: {
    title: 'Which Package Is Right for You?',
    description: 'Match quantity to your current account size and goal.',
    layout: 'compact',
    cards: [
      {
        id: '100-250',
        quantity: '100–250',
        title: 'First order',
        description: 'First order or small profile',
        bestFor: 'First order or small profile',
        icon: 'sparkles',
      },
      {
        id: '500',
        quantity: '500',
        title: 'Active creator',
        description: 'Active creator',
        bestFor: 'Active creator',
        icon: 'clapperboard',
      },
      {
        id: '1000',
        quantity: '1,000',
        title: 'Small business',
        description: 'Small business',
        bestFor: 'Small business',
        icon: 'briefcase',
      },
      {
        id: '2500',
        quantity: '2,500',
        title: 'Established brand',
        description: 'Established brand',
        bestFor: 'Established brand',
        icon: 'megaphone',
      },
      {
        id: '5000',
        quantity: '5,000+',
        title: 'Larger campaign',
        description: 'Larger campaign',
        bestFor: 'Larger campaign',
        icon: 'users',
      },
    ],
  },
  timeline: {
    title: 'Package Delivery Process',
    description:
      'After checkout, each order moves through review and delivery. Timing depends on the selected package.',
    steps: [
      {
        id: 'place',
        label: 'Place Your Order',
        description: 'Choose a package, enter your public username and complete checkout.',
      },
      {
        id: 'review',
        label: 'Order Review',
        description: 'Your order details are checked before delivery begins.',
      },
      {
        id: 'delivery',
        label: 'Delivery Begins',
        description: 'The selected package is processed per the delivery details shown.',
      },
      {
        id: 'completed',
        label: 'Order Completed',
        description: 'Status updates after the selected quantity has been processed.',
      },
    ],
  },
  whyOrder: {
    title: '',
    description: '',
    features: [],
  },
  comparison: {
    title: '',
    description: '',
    rows: [],
  },
  learnMore: {
    title: '',
    description: '',
    ctaLabel: '',
  },
  trustStrip: [
    { id: 'password', label: 'No Password Required', icon: 'shield-check' },
    { id: 'public', label: 'Public Username Only', icon: 'lock' },
    { id: 'checkout', label: 'Secure Checkout', icon: 'credit-card' },
    { id: 'support', label: 'Customer Support', icon: 'headphones' },
  ],
  summaryBenefits: [
    'No Password Required',
    'Public Username Only',
    'Secure Checkout',
    'Customer Support',
  ],
  infoPills: [
    'Estimated Delivery',
    'Gradual Delivery',
    'Secure Checkout',
    'Public Username Only',
  ],
};

export const INSTAGRAM_LIKES_PACKAGES_CONFIG: PackagesPageConfig = {
  metric: 'likes',
  fit: {
    title: 'Choose the Right Package',
    description: 'Match quantity to your goal, then confirm price above.',
    cards: [
      {
        id: '100',
        quantity: '100',
        title: 'Try it first',
        description: 'Light option for a first order.',
        bestFor: 'Testing',
        icon: 'sparkles',
      },
      {
        id: '500',
        quantity: '500',
        title: 'Everyday posts',
        description: 'Steady support for regular content.',
        bestFor: 'Creators',
        icon: 'clapperboard',
      },
      {
        id: '1000',
        quantity: '1,000',
        title: 'Key posts',
        description: 'Stronger signal on important uploads.',
        bestFor: 'Growing accounts',
        icon: 'heart',
      },
      {
        id: '2500',
        quantity: '2,500',
        title: 'Business posts',
        description: 'Clearer engagement on offers and launches.',
        bestFor: 'Businesses',
        icon: 'briefcase',
      },
      {
        id: '5000',
        quantity: '5,000+',
        title: 'Campaign peaks',
        description: 'Higher volume for major pushes.',
        bestFor: 'Campaigns',
        icon: 'megaphone',
      },
    ],
  },
  timeline: {
    title: 'How Ordering Works',
    description: 'Four clear steps from selection to delivery.',
    steps: [
      { id: 'place', label: 'Select a package' },
      { id: 'review', label: 'Enter your post URL' },
      { id: 'likes', label: 'Complete checkout' },
      { id: 'completed', label: 'Track delivery' },
    ],
  },
  whyOrder: {
    title: 'Why Customers Choose Us',
    description: 'Built for a clear, secure ordering experience.',
    features: [
      {
        id: 'checkout',
        title: 'Secure Checkout',
        description: 'Review details and pay through a protected flow.',
        icon: 'credit-card',
      },
      {
        id: 'public',
        title: 'Public URL Only',
        description: 'Orders use a public post or Reel link only.',
        icon: 'lock',
      },
      {
        id: 'tracking',
        title: 'Order Tracking',
        description: 'Check status with your order ID and email.',
        icon: 'map-pin',
      },
      {
        id: 'gradual',
        title: 'Gradual Delivery',
        description: 'Eligible options can deliver over time.',
        icon: 'truck',
      },
      {
        id: 'password',
        title: 'No Password Required',
        description: 'Login credentials are never requested.',
        icon: 'shield-check',
      },
      {
        id: 'support',
        title: 'Professional Support',
        description: 'Help with packages, checkout and delivery.',
        icon: 'headphones',
      },
    ],
  },
  comparison: {
    title: '',
    description: '',
    rows: [],
  },
  learnMore: {
    title: '',
    description: '',
    ctaLabel: '',
  },
  optionTiers: {
    title: 'Compare Your Options',
    description: 'Pick the scale that fits your post.',
    cards: [
      { id: 'starter', name: 'Starter', quantity: '100–250', detail: 'First tests and lighter posts' },
      { id: 'growing', name: 'Growing', quantity: '500–1,000', detail: 'Steady support for active feeds' },
      {
        id: 'business',
        name: 'Business',
        quantity: '2,500',
        detail: 'Offers, launches and brand posts',
      },
      {
        id: 'campaign',
        name: 'Campaign',
        quantity: '5,000',
        detail: 'Higher volume for promotions',
      },
      {
        id: 'large',
        name: 'Large Scale',
        quantity: '10,000+',
        detail: 'Major pushes and peak moments',
      },
    ],
  },
  tips: {
    title: 'Helpful Tips',
    items: [
      {
        id: 'fit',
        title: 'Match your goal',
        description: 'Choose the package that fits your goals.',
        icon: 'sparkles',
      },
      {
        id: 'public',
        title: 'Keep content public',
        description: 'Keep your content public during delivery.',
        icon: 'lock',
      },
      {
        id: 'review',
        title: 'Review before paying',
        description: 'Review package details before checkout.',
        icon: 'credit-card',
      },
      {
        id: 'confirm',
        title: 'Save confirmation',
        description: 'Save your order confirmation.',
        icon: 'map-pin',
      },
    ],
  },
  summaryBenefits: [
    'Public URL Only',
    'No Password Required',
    'Secure Checkout',
    'Order Tracking',
  ],
  infoPills: [
    'Estimated Delivery',
    'Gradual Delivery',
    'Order Tracking',
    'Secure Checkout',
    'Public URL Only',
  ],
};

export const INSTAGRAM_VIEWS_PACKAGES_CONFIG: PackagesPageConfig = {
  metric: 'views',
  fit: {
    title: 'Choose the Right Package',
    description: 'Select an option based on the size of your current campaign.',
    cards: [
      {
        id: 'starter',
        quantity: 'Starter',
        title: 'Starter',
        description: 'For testing the ordering process.',
        bestFor: 'First orders',
        icon: 'sparkles',
      },
      {
        id: 'creator',
        quantity: 'Creator',
        title: 'Creator',
        description: 'For individual posts and smaller campaigns.',
        bestFor: 'Creators',
        icon: 'clapperboard',
      },
      {
        id: 'growth',
        quantity: 'Growth',
        title: 'Growth',
        description: 'For regular content and growing accounts.',
        bestFor: 'Growing accounts',
        icon: 'users',
      },
      {
        id: 'business',
        quantity: 'Business',
        title: 'Business',
        description: 'For brand, product, or service campaigns.',
        bestFor: 'Businesses',
        icon: 'briefcase',
      },
      {
        id: 'high-volume',
        quantity: 'High Volume',
        title: 'High Volume',
        description: 'For larger launches and ongoing promotion.',
        bestFor: 'Campaigns',
        icon: 'megaphone',
      },
    ],
  },
  timeline: {
    title: 'How Ordering Works',
    description: '',
    steps: [
      {
        id: 'place',
        label: 'Choose a Package',
        description: 'Select the quantity that matches your needs.',
      },
      {
        id: 'review',
        label: 'Add Your Link',
        description: 'Enter the public content URL during checkout.',
      },
      {
        id: 'delivery',
        label: 'Review and Pay',
        description: 'Confirm the details and complete secure payment.',
      },
      {
        id: 'completed',
        label: 'Track Your Order',
        description: 'Use your order ID and email to follow progress.',
      },
    ],
  },
  whyOrder: {
    title: 'Why Customers Choose Us',
    description: '',
    features: [
      {
        id: 'public',
        title: 'Public URL Only',
        description: 'No login credentials are requested.',
        icon: 'lock',
      },
      {
        id: 'password',
        title: 'No Password Required',
        description: 'Your account access remains private.',
        icon: 'shield-check',
      },
      {
        id: 'checkout',
        title: 'Secure Checkout',
        description: 'Complete payment through a protected checkout.',
        icon: 'credit-card',
      },
      {
        id: 'tracking',
        title: 'Order Tracking',
        description: 'Follow progress using your order details.',
        icon: 'map-pin',
      },
      {
        id: 'delivery',
        title: 'Clear Delivery Information',
        description: 'Review timing before placing the order.',
        icon: 'truck',
      },
      {
        id: 'support',
        title: 'Professional Support',
        description: 'Get help with packages, checkout, and delivery.',
        icon: 'headphones',
      },
    ],
  },
  comparison: {
    title: '',
    description: '',
    rows: [],
  },
  learnMore: {
    title: '',
    description: '',
    ctaLabel: '',
  },
  tips: {
    title: 'Before You Order',
    items: [
      {
        id: 'goal',
        title: 'Fit your goal',
        description: 'Choose a package that fits your current goal.',
        icon: 'sparkles',
      },
      {
        id: 'public',
        title: 'Keep the link public',
        description: 'Make sure the content link is public.',
        icon: 'lock',
      },
      {
        id: 'delivery',
        title: 'Review delivery',
        description: 'Review delivery details before checkout.',
        icon: 'truck',
      },
      {
        id: 'confirm',
        title: 'Save confirmation',
        description: 'Save the confirmation email for tracking.',
        icon: 'map-pin',
      },
    ],
  },
  summaryBenefits: [
    'Public URL Only',
    'No Password Required',
    'Secure Checkout',
    'Order Tracking',
  ],
  infoPills: [
    'Estimated Delivery',
    'Gradual Delivery',
    'Order Tracking',
    'Secure Checkout',
    'Public URL Only',
  ],
};
