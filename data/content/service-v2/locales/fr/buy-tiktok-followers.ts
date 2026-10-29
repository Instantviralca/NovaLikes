import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-tiktok-followers. Primary keyword: "acheter des abonnés tiktok". Do not edit wording without the content owner. */
export const FR_BUY_TIKTOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-tiktok-followers',
    platform: 'TikTok',
    name: 'Abonnés TikTok',
    unit: 'abonnés',
    unitSingular: 'abonné',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des abonnés tiktok',
      secondary: [
        'acheter abonnés tiktok sans mot de passe',
        'forfaits abonnés tiktok',
        'prix abonnés tiktok',
        'avoir plus d’abonnés tiktok',
      ],
      questions: [
        'est-ce sûr d’acheter des abonnés tiktok',
        'combien coûtent les abonnés tiktok',
        'est-ce utile pour creator rewards',
        'pourquoi mes abonnés tiktok baissent',
        'est-ce utile d’acheter des abonnés',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'abonnés TikTok',
      tail: 'pour un profil qui convainc',
    },
    subtitle: 'Quand quelqu’un aime une de vos vidéos, il regarde d’abord votre profil. Un nombre d’abonnés crédible l’incite à vous suivre. Dès {fromPrice}, avec votre seul nom d’utilisateur.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des abonnés TikTok',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} abonnés TikTok',
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
        body: 'Le nom d’utilisateur suffit',
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
      highlight: 'abonnés TikTok ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Votre nom d’utilisateur, jamais votre mot de passe',
        body: 'Il nous faut seulement votre nom d’utilisateur public. Pas d’identifiants et aucune connexion à votre compte.',
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
        body: 'Si les abonnés de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'user-plus',
        tone: 'pink',
        title: 'Votre nom d’utilisateur suffit',
        body: 'Saisissez votre nom d’utilisateur TikTok sans le @. Nous ne demandons jamais vos identifiants, un code ou une connexion à votre compte.',
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
      highlight: 'abonnés TikTok',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement votre nom d’utilisateur TikTok public.',
    items: [
      {
        ui: 'public',
        title: 'Passez votre profil en public',
        body: 'Les abonnés ne peuvent être livrés qu’à un compte TikTok public. Vous pourrez ensuite le repasser en privé.',
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
        title: 'Indiquez votre nom d’utilisateur',
        body: 'Saisissez votre nom sans le @, ainsi que votre e-mail pour le reçu et les notifications. Vérifiez l’orthographe avant de payer.',
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
      unit: 'abonnés',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Compte privé',
      sub: 'Désactivé pour la livraison',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
    input: {
      prefix: '@',
      placeholder: 'votrenom',
    },
    safeChips: [
      'Le nom d’utilisateur suffit',
      'Paiement sécurisé',
    ],
    privacyTags: [
      '@utilisateur',
      'e-mail',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Comment repérer un vendeur douteux de',
      highlight: 'abonnés TikTok',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Nom d’utilisateur seul',
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
    title: 'Refill et garantie de remboursement pour vos abonnés TikTok',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp',
        body: 'Si les abonnés de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Gardez le même nom d’utilisateur et un profil public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-followers-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'abonnés TikTok ?',
    },
    intro: 'Les abonnés commencent à {fromPrice} les 100, et le prix par abonné baisse à mesure que le forfait grandit. Chaque prix est un paiement unique en dollars américains pour un compte.',
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
    id: 'why-buy-tiktok-followers',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'abonnés TikTok ?',
    },
    intro: 'Sur TikTok, on vous découvre souvent par une vidéo, puis on ouvre votre profil. Un nombre d’abonnés établi rend la décision de vous suivre plus facile.',
    items: [
      {
        title: 'Un profil à la hauteur de la vidéo',
        body: 'Une vidéo à plusieurs milliers de vues à côté d’un profil à 40 abonnés, ça surprend. Les abonnés comblent cet écart.',
      },
      {
        title: 'Un départ pour les nouveaux comptes',
        body: 'Un nouveau compte de marque ou de projet n’a pas à rester à zéro pendant que vous trouvez votre format.',
      },
      {
        title: 'Des échanges plus simples avec les marques',
        body: 'Les marques et les agences regardent souvent le nombre d’abonnés avant de répondre à un créateur.',
      },
    ],
    diagram: [
      'À la hauteur',
      'Départ',
      'Prêt pour les marques',
    ],
  },
  help: {
    id: 'does-buying-tiktok-followers-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'abonnés TikTok ?',
    },
    intro: 'Les abonnés changent le chiffre de votre profil. Ce que TikTok recommande dépend toujours de la façon dont vos vidéos sont regardées.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les vues ou les likes de vos vidéos',
        'Le classement dans Pour toi à lui seul',
        'L’accès à Creator Rewards ou à d’autres fonctions rémunérées',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Le nombre d’abonnés de votre profil TikTok',
        'L’air établi du compte pour les nouveaux visiteurs',
        'La première impression auprès des marques et des partenaires',
      ],
      image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp',
      altFallback: 'Illustration : abonnés TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'abonnés TikTok',
    },
    cards: [
      {
        title: 'Petites entreprises',
        body: 'Boulangeries, barbiers et boutiques ajoutent des abonnés pour que leur TikTok paraisse aussi vivant que leurs vidéos.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp',
      },
      {
        title: 'Créateurs en devenir',
        body: 'Les créateurs humour, gaming et lifestyle utilisent des abonnés pour paraître établis pendant qu’ils publient régulièrement.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        title: 'Musique et vie nocturne',
        body: 'DJ, groupes et salles ajoutent des abonnés avant une sortie, une date de tournée ou une grande soirée.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la raison, la commande fonctionne de la même façon : votre nom d’utilisateur, un forfait adapté et des abonnés qui commencent en général à arriver sous 6 à 8 heures. Nous ne demandons jamais votre mot de passe.',
  },
  vs: {
    id: 'tiktok-followers-vs-other-services',
    title: {
      lead: 'Abonnés TikTok ou',
      highlight: 'likes et vues',
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
        slug: 'buy-tiktok-followers',
        label: 'Abonnés',
        changes: 'Le nombre d’abonnés de votre profil',
        needs: 'Votre nom d’utilisateur public',
        current: true,
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Les likes d’une vidéo',
        needs: 'Un lien vers la vidéo publique',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Vues',
        changes: 'Les vues d’une vidéo',
        needs: 'Un lien vers la vidéo publique',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'abonnés TikTok ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté TikTok interdisent les fausses interactions, et TikTok supprime régulièrement les comptes qu’il juge inactifs ou faux. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. N’achetez jamais d’abonnés pour accéder à Creator Rewards : c’est contraire aux règles de TikTok.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement votre nom d’utilisateur public : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
      },
      {
        ui: 'pay',
        title: 'Sécurité du paiement',
        body: 'Vous payez une seule fois via un paiement sécurisé par carte, Apple Pay ou Google Pay, en dollars américains. Pas d’abonnement, rien ne se renouvelle.',
      },
      {
        ui: 'privacy',
        title: 'Confidentialité',
        body: 'Votre nom d’utilisateur et votre e-mail servent uniquement à traiter la commande et à vous envoyer des notifications, comme l’explique notre [politique de confidentialité](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Avant d’acheter des',
      highlight: 'abonnés TikTok',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'Le compte est public',
        body: 'Un compte privé empêche la commande de démarrer. Laissez-le public jusqu’à la fin de la livraison.',
      },
      {
        title: 'Le nom d’utilisateur est exact',
        body: 'Vérifiez chaque lettre, point et tiret bas. Les abonnés vont exactement au nom que vous saisissez.',
      },
      {
        title: 'Le nom d’utilisateur ne change pas',
        body: 'Gardez le même nom pendant la livraison et les 6 mois de refill.',
      },
      {
        title: 'La taille est adaptée',
        body: 'Choisissez un forfait qui paraît naturel à côté de vos vues et de vos abonnés actuels.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les abonnés TikTok',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-tt-followers-v2-1',
        question: 'Les abonnés achetés comptent-ils pour Creator Rewards de TikTok ?',
        answer: 'Non, et il ne faut pas essayer. Les règles de TikTok interdisent les fausses interactions, et gonfler ses abonnés pour accéder à un programme rémunéré peut mettre le compte en danger.',
      },
      {
        id: 'fr-tt-followers-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-tt-followers-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les abonnés TikTok changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Acheter des likes TikTok',
        line: 'Plus de cœurs sur une vidéo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-views',
        title: 'Acheter des vues TikTok',
        line: 'Un meilleur départ pour une vidéo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
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
