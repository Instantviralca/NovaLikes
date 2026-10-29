import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-facebook-page-likes. Primary keyword: "acheter des likes pour page facebook". Do not edit wording without the content owner. */
export const FR_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Likes pour Page Facebook',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des likes pour page facebook',
      secondary: [
        'acheter des likes facebook',
        'acheter des j’aime page facebook',
        'prix likes page facebook',
        'likes fan page facebook',
      ],
      questions: [
        'différence entre likes de page et abonnés',
        'ma page affiche-t-elle encore des likes',
        'combien coûtent les likes de page',
        'est-ce sûr d’acheter des likes facebook',
        'faut-il un accès administrateur',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'likes pour Page Facebook',
      tail: 'avec un chiffre qui se remarque',
    },
    subtitle: 'Si votre Page affiche encore des « J’aime » sous son nom, c’est l’une des premières choses que voient les visiteurs. Faites-le monter dès {fromPrice}, avec le seul lien de votre Page.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des likes pour Page Facebook',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} likes pour Page Facebook',
    save: 'Vous économisez',
    cta: 'Ajouter au panier',
    oneTime: 'Achat unique. Sans abonnement.',
    secure: 'Paiement sécurisé',
    methods: [
      'Carte',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sans mot de passe',
        body: 'Le lien suffit',
      },
      {
        icon: 'clock',
        title: 'Démarrage sous 6 à 8 h',
        body: 'Fin 4 à 6 h plus tard',
      },
      {
        icon: 'message-square',
        title: 'On vous aide',
        body: '24 h/24 sur WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Pourquoi choisir NovaLikes pour vos',
      highlight: 'likes pour Page Facebook ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, sans accès administrateur',
        body: 'Il nous faut seulement le lien public de votre Page. Pas de mot de passe, pas de rôle d’administrateur, pas d’accès à votre compte.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Des délais clairs, du début à la fin',
        body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Vous préférez un rythme plus lent ? Demandez une livraison progressive.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: 'Refill de 6 mois',
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'Pour les Pages qui affichent des likes',
        body: 'Les likes de Page sont destinés aux Pages qui affichent encore des likes sous leur nom. Les nouvelles Pages affichent des abonnés : vérifiez la vôtre avant.',
      },
    ],
    promo: {
      eyebrow: 'Vous hésitez sur le forfait ?',
      title: 'Posez-nous la question avant d’acheter',
      cta: 'Écrivez-nous sur WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Comment acheter des',
      highlight: 'likes pour Page Facebook',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Vérifiez que votre Page affiche des likes, puis collez son lien public.',
    items: [
      {
        ui: 'public',
        title: 'Vérifiez que votre Page affiche des likes',
        body: 'Ouvrez votre Page dans une fenêtre privée. Si vous voyez « J’aime » sous le nom, les likes de Page conviennent. Seulement des abonnés ? Choisissez les abonnés Facebook.',
      },
      {
        ui: 'packages',
        title: 'Choisissez un forfait',
        body: 'Choisissez une quantité parmi les forfaits ci-dessus. Chaque forfait affiche son prix avant que vous décidiez.',
      },
      {
        ui: 'cart',
        title: 'Ajoutez-le au panier',
        body: 'Cliquez sur « Ajouter au panier » et passez au paiement.',
      },
      {
        ui: 'username',
        title: 'Collez le lien de la Page',
        body: 'Copiez le lien public de votre Page, par exemple facebook.com/votrepage. Les likes de Page fonctionnent uniquement sur des Pages, pas sur des profils personnels.',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 1000,
      unit: 'likes',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Page non publiée',
      sub: 'Désactivé pour être trouvée',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'facebook.com/votrepage',
    },
    safeChips: [
      'Le lien suffit',
      'Paiement sécurisé',
    ],
    privacyTags: [
      'lien',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Comment repérer un vendeur douteux de',
      highlight: 'likes pour Page Facebook',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien de la Page suffit',
        riskySeller: 'Demandent le mot de passe',
      },
      {
        label: 'Délais',
        novalikes: 'Démarrage sous 6 à 8 h',
        riskySeller: 'Aucun délai annoncé',
      },
      {
        label: 'Baisses',
        novalikes: 'Refill de 6 mois',
        riskySeller: 'Pas de refill',
      },
      {
        label: 'Remboursements',
        novalikes: 'Remboursement sous 30 jours*',
        riskySeller: 'Aucune politique écrite',
      },
      {
        label: 'Assistance',
        novalikes: 'WhatsApp 24 h/24',
        riskySeller: 'Difficiles à joindre',
      },
      {
        label: 'Prix',
        novalikes: 'En USD, affiché avant',
        riskySeller: 'Change au paiement',
      },
      {
        label: 'Suivi',
        novalikes: 'Page « Suivre la commande »',
        riskySeller: 'Impossible de vérifier',
      },
    ],
    note: '*Pour les commandes éligibles, selon notre politique de remboursement.',
  },
  promises: {
    id: 'our-promises',
    title: 'Refill et garantie de remboursement pour vos likes pour Page Facebook',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Gardez la même URL de Page et une Page publique pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'likes pour Page Facebook ?',
    },
    intro: 'Les likes de Page commencent à {fromPrice} les 100, et le prix par like baisse sur les grands forfaits. Chaque prix est un paiement unique en dollars américains pour une Page.',
    points: [
      'Le refill de 6 mois est inclus. Rien à ajouter.',
      'Prix en dollars américains. Votre banque convertit dans votre devise et certaines cartes facturent des frais de change.',
      'Pas d’abonnement ni de renouvellement. Vous payez une fois par commande.',
    ],
    cols: [
      'Forfait',
      'Prix',
      'Pour 1 000',
    ],
    best: 'Meilleur tarif',
    note: 'Les prix viennent de nos forfaits actuels. Le prix affiché au paiement est celui que vous payez.',
  },
  whyBuy: {
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'likes pour Page Facebook ?',
    },
    intro: 'Beaucoup d’entreprises installées ont créé leur Page Facebook il y a longtemps, et elle affiche toujours des likes. Si le chiffre est faible, même une entreprise connue paraît petite.',
    items: [
      {
        title: 'Une Page ancienne qui paraît à jour',
        body: 'Une Page vieille de plusieurs années mais à 80 likes peut sembler oubliée. Les likes rafraîchissent cette première impression.',
      },
      {
        title: 'De la confiance face à la comparaison',
        body: 'Quand on compare deux commerces du coin, on regarde souvent quelle Page paraît la plus populaire.',
      },
      {
        title: 'Une meilleure base pour la publicité',
        body: 'Les Pages qui font de la publicité sur Facebook sont plus crédibles quand les likes sont à la hauteur du budget.',
      },
    ],
    diagram: [
      'Paraît à jour',
      'Gagne la comparaison',
      'Prête pour la pub',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'likes pour Page Facebook ?',
    },
    intro: 'Les likes de Page changent le chiffre d’une Page au format classique. Voici ce qu’ils font et ce qu’ils ne font pas.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les réactions sur des publications précises',
        'Votre portée organique à elle seule',
        'Les Pages qui n’affichent que des abonnés (choisissez les abonnés)',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les likes sous le nom de votre Page',
        'La popularité apparente de la Page pour les nouveaux visiteurs',
        'La première impression face aux autres commerces',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Illustration : likes pour Page Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'likes pour Page Facebook',
    },
    cards: [
      {
        title: 'Commerces installés',
        body: 'Restaurants, jardineries et entreprises familiales aux Pages anciennes ajoutent des likes pour que le chiffre soit à la hauteur de leur réputation.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Boutiques et salons',
        body: 'Boutiques et salons font monter leurs likes avant une période chargée, comme Noël ou les soldes.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agences',
        body: 'Les agences remettent à niveau les Pages de leurs clients avant une campagne ou un changement de marque, souvent avec une livraison progressive.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la Page, la commande fonctionne de la même façon : le lien public de votre Page, un forfait adapté et des likes qui démarrent en général sous 6 à 8 heures. Sans accès administrateur.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Likes de Page ou',
      highlight: 'abonnés et likes de publication',
    },
    intro: 'Chaque service change un chiffre différent. Choisissez celui qui correspond à ce que vous voulez montrer.',
    cols: [
      'Service',
      'Ce qui change',
      'Ce qu’il nous faut',
      'Dès',
    ],
    rows: [
      {
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Page',
        changes: 'Les likes d’une Page au format classique',
        needs: 'Un lien vers la Page',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Abonnés',
        changes: 'Les abonnés d’une Page ou d’un profil',
        needs: 'Un lien vers la Page ou le profil',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publication',
        changes: 'Les réactions d’une publication publique',
        needs: 'Un lien vers la publication',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'likes pour Page Facebook ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Standards de la communauté Facebook interdisent les comportements non authentiques, et Meta supprime régulièrement les comptes faux ou inactifs. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de votre Page : personne ne se connecte et aucun droit d’administrateur n’est nécessaire. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
      },
      {
        ui: 'pay',
        title: 'Sécurité du paiement',
        body: 'Vous payez une seule fois via un paiement sécurisé par carte, Apple Pay ou Google Pay, en dollars américains. Pas d’abonnement, rien ne se renouvelle.',
      },
      {
        ui: 'privacy',
        title: 'Confidentialité',
        body: 'Votre lien et votre e-mail servent uniquement à traiter la commande et à vous envoyer des notifications, comme l’explique notre [politique de confidentialité](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Avant d’acheter des',
      highlight: 'likes pour Page Facebook',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'Votre Page affiche des likes',
        body: 'Vérifiez-le dans une fenêtre privée. Si elle n’affiche que des abonnés, les likes de Page ne se verront pas : choisissez les abonnés.',
      },
      {
        title: 'C’est une Page, pas un profil',
        body: 'Les likes de Page fonctionnent uniquement sur des Pages Facebook. Les profils personnels ont besoin d’abonnés.',
      },
      {
        title: 'La Page est publiée',
        body: 'Une Page non publiée ou restreinte empêche le démarrage.',
      },
      {
        title: 'L’URL ne change pas',
        body: 'Gardez la même adresse pendant la livraison et les 6 mois de refill.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les likes pour Page Facebook',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-fb-page-likes-v2-1',
        question: 'Ma Page n’affiche que des abonnés. Que dois-je commander ?',
        answer: 'Des abonnés Facebook. Les nouvelles Pages affichent des abonnés au lieu de likes, donc des likes de Page ne se verraient pas.',
      },
      {
        id: 'fr-fb-page-likes-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-fb-page-likes-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les likes pour Page Facebook changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Acheter des abonnés Facebook',
        line: 'Pour Pages et profils publics',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Acheter des likes pour publication Facebook',
        line: 'Des réactions sur une publication publique',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Acheter des abonnés Instagram',
        line: 'Faites grandir votre profil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
    ],
    cardPrice: 'Dès {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Choisir un forfait',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
