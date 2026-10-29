import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-tiktok-views. Primary keyword: "acheter des vues tiktok". Do not edit wording without the content owner. */
export const FR_BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'Vues TikTok',
    unit: 'vues',
    unitSingular: 'vue',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'acheter des vues tiktok',
      secondary: [
        'acheter vues tiktok',
        'forfaits vues tiktok',
        'prix vues tiktok',
        'acheter des vues pour une vidéo tiktok',
      ],
      questions: [
        'est-ce sûr d’acheter des vues tiktok',
        'combien coûtent les vues tiktok',
        'comptent-elles pour creator rewards',
        'high quality ou premium',
        'pourquoi mon tiktok a 0 vue',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'vues TikTok',
      tail: 'pour un départ plus fort',
    },
    subtitle: 'Une nouvelle vidéo à quelques centaines de vues se fait vite dépasser, aussi bonne soit-elle. Donnez-lui un chiffre plus fort dès le départ. Vues High Quality ou Premium dès {fromPrice}.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des vues TikTok',
    intro: 'Choisissez un niveau et un forfait. Prix en USD.',
    summaryName: '{quantity} vues TikTok {tier}',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Notre prix le plus bas par vue.',
      },
      {
        label: 'Premium',
        note: 'Notre option de vues haut de gamme.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: 'Pourquoi choisir NovaLikes pour vos',
      highlight: 'vues TikTok ?',
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
        body: 'Si les vues de votre commande baissent dans les 6 mois suivant la livraison, envoyez-nous votre numéro de commande et nous les remplaçons gratuitement.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantie de remboursement de 30 jours',
        body: 'Les commandes éligibles sont couvertes pendant 30 jours à compter de la date d’achat. Notre politique de remboursement précise ce qui est inclus.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Deux niveaux de qualité',
        body: 'High Quality est notre prix le plus bas par vue et Premium notre option haut de gamme. Les deux ont les mêmes délais et le refill de 6 mois.',
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
      highlight: 'vues TikTok',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes. Choisissez High Quality ou Premium, une quantité, puis collez le lien d’une vidéo publique.',
    items: [
      {
        ui: 'public',
        title: 'Laissez la vidéo publique',
        body: 'La vidéo doit être publique, sur un compte public, jusqu’à la fin de la livraison. Ne la supprimez pas.',
      },
      {
        ui: 'packages',
        title: 'Choisissez un niveau et un forfait',
        body: 'Choisissez High Quality ou Premium, puis une quantité. Chaque forfait affiche son prix avant que vous décidiez.',
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
      count: 10000,
      unit: 'vues',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Vidéo privée',
      sub: 'Désactivé pour atteindre la vidéo',
    },
    chips: [
      '2K',
      '5K',
      '10K',
      '50K',
    ],
    chipOn: 2,
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
      highlight: 'vues TikTok',
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
    title: 'Refill et garantie de remboursement pour vos vues TikTok',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Si les vues de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez la vidéo en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'vues TikTok ?',
    },
    intro: 'Les vues commencent à {fromPrice}. High Quality a le prix le plus bas pour 1 000 et Premium coûte un peu plus. Chaque prix est un paiement unique en dollars américains pour une vidéo.',
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
    id: 'why-buy-tiktok-views',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'vues TikTok ?',
    },
    intro: 'Sur TikTok, on fait défiler vite, et le nombre de vues est l’un des rares éléments que l’on remarque avant de décider. Les vues donnent à une nouvelle vidéo l’air d’être déjà regardée.',
    items: [
      {
        title: 'Des nouvelles vidéos qui ne partent pas de zéro',
        body: 'Une vidéo tout juste publiée avec un chiffre solide mérite quelques secondes d’attention.',
      },
      {
        title: 'Des publicités qui convainquent',
        body: 'Les vidéos produit et promotionnelles convainquent davantage quand le chiffre montre qu’elles ont été vues.',
      },
      {
        title: 'Un portfolio plus solide',
        body: 'Les créateurs qui démarchent des marques peuvent montrer des vidéos avec de bonnes vues.',
      },
    ],
    diagram: [
      'Pas de zéro',
      'Publicités',
      'Portfolio',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'vues TikTok ?',
    },
    intro: 'Les vues changent le chiffre d’une vidéo. Ce que TikTok met en avant dépend toujours du temps de visionnage et des réactions des spectateurs.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Le temps de visionnage, les likes ou les partages à eux seuls',
        'Le classement dans Pour toi à lui seul',
        'Des revenus Creator Rewards',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les vues de la vidéo choisie',
        'L’air regardé de la vidéo pour les nouveaux spectateurs',
        'La première impression des lancements et promotions',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Illustration : vues TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'vues TikTok',
    },
    cards: [
      {
        title: 'Commerces locaux',
        body: 'Restaurants, salons et ateliers ajoutent des vues aux vidéos promotionnelles qu’ils partagent dans leur bio, leurs publicités et sur WhatsApp.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Créateurs de niche',
        body: 'Les créateurs ajoutent des vues aux nouveaux formats et aux débuts de séries pendant qu’ils découvrent ce qui plaît à leur public.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agences',
        body: 'Les agences ajoutent des vues aux vidéos de lancement de campagne, souvent avec une livraison progressive.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la vidéo, la commande fonctionne de la même façon : un lien public, le niveau et la quantité choisis, et des vues qui démarrent en général sous 6 à 8 heures. Sans connexion.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'Vues TikTok ou',
      highlight: 'likes et abonnés',
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
        slug: 'buy-tiktok-views',
        label: 'Vues',
        changes: 'Les vues d’une vidéo',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Les likes d’une vidéo',
        needs: 'Un lien vers la vidéo publique',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'vues TikTok ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté TikTok interdisent les fausses interactions, et Creator Rewards ne paie que les vues que TikTok considère comme valides. N’achetez donc jamais de vues pour gagner de l’argent. TikTok supprime aussi les comptes inactifs : une petite baisse peut survenir après la livraison, et chaque commande inclut un refill de 6 mois.',
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
      highlight: 'vues TikTok',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'La vidéo est publique',
        body: 'Les vues n’arrivent pas sur une vidéo privée ni sur une vidéo d’un compte privé.',
      },
      {
        title: 'Le lien est celui de la vidéo',
        body: 'Copiez-le depuis « Partager », pas le lien de votre profil.',
      },
      {
        title: 'La vidéo reste en ligne',
        body: 'Gardez-la en ligne pendant la livraison et les 6 mois de refill.',
      },
      {
        title: 'Vous avez choisi un niveau',
        body: 'High Quality est le prix le plus bas par vue et Premium l’option haut de gamme. Un doute ? Demandez-nous sur WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les vues TikTok',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-tt-views-v2-1',
        question: 'Les vues achetées comptent-elles pour Creator Rewards ?',
        answer: 'Ne les achetez pas pour cela. Creator Rewards ne paie que les vues que TikTok considère comme valides, et ses règles interdisent les fausses interactions. Les vues achetées ne rapportent pas d’argent et peuvent mettre le compte en danger.',
      },
      {
        id: 'fr-tt-views-v2-2',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-tt-views-v2-3',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services NovaLikes',
    intro: 'Les vues TikTok changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Acheter des likes TikTok',
        line: 'Plus de cœurs sur une vidéo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Acheter des abonnés TikTok',
        line: 'Faites grandir votre profil TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Acheter des vues Instagram',
        line: 'Plus de regards sur vos Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
