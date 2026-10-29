import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-tiktok-likes. Primary keyword: "acheter des likes tiktok". Do not edit wording without the content owner. */
export const FR_BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'Likes TikTok',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des likes tiktok',
      secondary: [
        'acheter des likes pour vidéos tiktok',
        'forfaits likes tiktok',
        'prix likes tiktok',
        'acheter des cœurs tiktok',
      ],
      questions: [
        'est-ce sûr d’acheter des likes tiktok',
        'combien coûtent les likes tiktok',
        'les likes rendent-ils une vidéo virale',
        'peut-on répartir les likes',
        'les likes achetés baissent-ils',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'likes TikTok',
      tail: 'pour votre vidéo la plus importante',
    },
    subtitle: 'Les cœurs s’affichent à côté de votre vidéo pendant la lecture. Donnez à votre lancement, votre collaboration ou votre meilleur clip un chiffre à la hauteur. Dès {fromPrice}, avec le seul lien de la vidéo.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des likes TikTok',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} likes TikTok',
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
      highlight: 'likes TikTok ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, jamais votre mot de passe',
        body: 'Il nous faut seulement le lien public de la vidéo. Pas d’identifiants et aucune connexion à votre compte.',
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
        icon: 'heart',
        tone: 'pink',
        title: 'Toute vidéo publique',
        body: 'Commandez des likes pour n’importe quelle vidéo TikTok publique. Chaque commande couvre une vidéo.',
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
      highlight: 'likes TikTok',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement le lien d’une vidéo TikTok publique.',
    items: [
      {
        ui: 'public',
        title: 'Laissez la vidéo publique',
        body: 'La vidéo doit être publique, sur un compte public, jusqu’à la fin de la livraison. Ne la supprimez pas.',
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
        title: 'Collez le lien de la vidéo',
        body: 'Ouvrez la vidéo sur TikTok, touchez « Partager », choisissez « Copier le lien » et collez-le au paiement.',
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
      label: 'Vidéo privée',
      sub: 'Désactivé pour atteindre la vidéo',
    },
    chips: [
      '500',
      '1K',
      '2K',
      '5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'tiktok.com/@…/video/…',
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
      highlight: 'likes TikTok',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien de la vidéo suffit',
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
    title: 'Refill et garantie de remboursement pour vos likes TikTok',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez la vidéo en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'likes TikTok ?',
    },
    intro: 'Les likes commencent à {fromPrice} les 100, et le prix par like baisse à mesure que le forfait grandit. Chaque prix est un paiement unique en dollars américains pour une vidéo.',
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
    id: 'why-buy-tiktok-likes',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'likes TikTok ?',
    },
    intro: 'Un TikTok avec beaucoup de vues mais peu de cœurs fait hésiter. Les likes gardent les chiffres équilibrés pour que la vidéo paraisse aussi bonne qu’elle l’est.',
    items: [
      {
        title: 'Des vidéos qui paraissent appréciées',
        body: 'Un bon nombre de cœurs montre que d’autres ont aimé la vidéo.',
      },
      {
        title: 'Des vidéos épinglées plus fortes',
        body: 'Les vidéos épinglées sur votre profil travaillent beaucoup. Les likes les font paraître comme vos meilleures.',
      },
      {
        title: 'De meilleurs liens hors de TikTok',
        body: 'Quand vous partagez un TikTok sur WhatsApp, Instagram ou par e-mail, il est plus engageant avec un bon nombre de likes.',
      },
    ],
    diagram: [
      'Appréciée',
      'Épinglée',
      'Liens partagés',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'likes TikTok ?',
    },
    intro: 'Les likes changent les cœurs d’une vidéo. TikTok continue de décider de la portée selon la façon dont les spectateurs la regardent.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Les vues ou les abonnés à eux seuls',
        'Le classement dans Pour toi à lui seul',
        'Des partages, enregistrements ou commentaires spontanés',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les likes de la vidéo choisie',
        'L’air apprécié de la vidéo pour les nouveaux spectateurs',
        'La force des vidéos épinglées et partagées',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Illustration : likes TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'likes TikTok',
    },
    cards: [
      {
        title: 'Vendeurs en ligne',
        body: 'Les boutiques en ligne ajoutent des likes aux vidéos produit avant de les utiliser en publicité ou de les partager avec des revendeurs.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Créateurs',
        body: 'Les créateurs ajoutent des likes aux vidéos de collaboration et aux clips épinglés, pour que le profil s’ouvre sur des vidéos populaires.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Lieux et événements',
        body: 'Bars, scènes d’humour et festivals ajoutent des likes aux vidéos de programmation et d’ambiance avant la grande date.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la vidéo, la commande fonctionne de la même façon : un lien public, le forfait choisi et des likes qui démarrent en général sous 6 à 8 heures. Sans connexion.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'Likes TikTok ou',
      highlight: 'vues et abonnés',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Les likes d’une vidéo',
        needs: 'Un lien vers la vidéo publique',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Abonnés',
        changes: 'Le nombre d’abonnés de votre profil',
        needs: 'Votre nom d’utilisateur public',
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
      highlight: 'likes TikTok ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté TikTok interdisent les fausses interactions, et TikTok supprime régulièrement les comptes qu’il juge inactifs ou faux. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. Des likes proportionnés aux vues paraissent plus naturels.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de la vidéo : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
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
      highlight: 'likes TikTok',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'La vidéo est publique',
        body: 'Les likes n’arrivent pas sur une vidéo privée ni sur une vidéo d’un compte privé.',
      },
      {
        title: 'Le lien est celui de la vidéo',
        body: 'Copiez-le depuis « Partager ». Il ressemble à tiktok.com/@nom/video/…, pas au lien de votre profil.',
      },
      {
        title: 'La vidéo reste en ligne',
        body: 'Ne la supprimez pas pendant la livraison ni pendant les 6 mois de refill.',
      },
      {
        title: 'Les likes restent cohérents avec les vues',
        body: 'Des milliers de likes pour quelques centaines de vues paraissent étranges. Choisissez une taille adaptée ou ajoutez des vues.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les likes TikTok',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-tt-likes-v2-1',
        question: 'Puis-je répartir un forfait de likes sur plusieurs vidéos ?',
        answer: 'Non. Chaque commande couvre une vidéo, pour que la livraison et le refill restent faciles à suivre.',
      },
      {
        id: 'fr-tt-likes-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-tt-likes-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les likes TikTok changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'Acheter des vues TikTok',
        line: 'Un meilleur départ pour une vidéo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Acheter des abonnés TikTok',
        line: 'Faites grandir votre profil TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Acheter des likes Instagram',
        line: 'Pour publications, carrousels et Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
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
