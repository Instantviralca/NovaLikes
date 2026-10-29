import type { ServiceV2Content } from '../../types';

/** French (/fr) — v2 service page copy for buy-instagram-likes. Primary keyword: "acheter des likes instagram". Do not edit wording without the content owner. */
export const FR_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Likes Instagram',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'acheter des likes instagram',
      secondary: [
        'acheter des likes pour reels',
        'forfaits likes instagram',
        'acheter des j’aime instagram',
        'prix likes instagram',
      ],
      questions: [
        'est-ce sûr d’acheter des likes instagram',
        'combien coûtent les likes instagram',
        'peut-on acheter des likes pour un reel',
        'les likes achetés disparaissent-ils',
        'est-ce utile d’acheter des likes',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Acheter des',
      highlight: 'likes Instagram',
      tail: 'pour des publications et Reels qui se remarquent',
    },
    subtitle: 'Faites paraître vos meilleures photos, carrousels et Reels aussi populaires qu’ils le méritent. Les likes apportent une preuve sociale à toute publication publique, dès {fromPrice} et sans connexion.',
    trust: [
      'Sans mot de passe',
      'Démarrage sous 6 à 8 h',
      'Refill de 6 mois',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Forfaits et prix des likes Instagram',
    intro: 'Choisissez un forfait. Prix en USD.',
    summaryName: '{quantity} likes Instagram',
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
      highlight: 'likes Instagram ?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Un lien, jamais votre mot de passe',
        body: 'Il nous faut seulement le lien public de la publication ou du Reel. Pas d’identifiants et aucune connexion à votre compte.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Publications, carrousels et Reels',
        body: 'Commandez des likes pour n’importe quelle photo, carrousel ou Reel public. Chaque commande couvre une publication, pour que votre meilleur contenu reçoive exactement le coup de pouce choisi.',
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
      highlight: 'likes Instagram',
    },
    pill: 'Environ 2 minutes',
    intro: 'Commander se fait en cinq étapes courtes, en deux minutes environ. Il nous faut seulement le lien d’une publication ou d’un Reel public.',
    items: [
      {
        ui: 'public',
        title: 'Laissez la publication publique',
        body: 'La publication ou le Reel doit être sur un compte public jusqu’à la fin de la livraison. Ne la supprimez pas et ne l’archivez pas pendant la commande.',
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
        title: 'Collez le lien',
        body: 'Ouvrez la publication, touchez les trois points ou « Partager », choisissez « Copier le lien » et collez-le au paiement, avec votre e-mail.',
      },
      {
        ui: 'pay',
        title: 'Payez en toute sécurité',
        body: 'Payez une seule fois par carte, Apple Pay ou Google Pay, en dollars américains. Il n’y a pas d’abonnement.',
      },
    ],
    done: {
      title: 'C’est fait !',
      count: 2500,
      unit: 'likes',
      body: 'La plupart des commandes démarrent 6 à 8 heures après le paiement et se terminent 4 à 6 heures après le démarrage. Suivez l’avancement sur la page « Suivre la commande » avec votre numéro de commande.',
    },
  },
  ui: {
    toggle: {
      label: 'Compte privé',
      sub: 'Désactivé pour atteindre la publication',
    },
    chips: [
      '500',
      '1K',
      '2.5K',
      '5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'instagram.com/p/…',
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
      highlight: 'likes Instagram',
    },
    intro: 'Où que vous achetiez, vérifiez d’abord ces sept points.',
    us: 'NovaLikes',
    them: 'Vendeurs douteux',
    rows: [
      {
        label: 'Identifiants',
        novalikes: 'Le lien suffit',
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
    title: 'Refill et garantie de remboursement pour vos likes Instagram',
    intro: 'Ces deux engagements figurent dans notre politique de remboursement, pas seulement sur cette page.',
    cards: [
      {
        chip: '6 mois',
        title: 'Refill de 6 mois',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Si les likes de votre commande baissent dans les 6 mois suivant la date de livraison, écrivez-nous sur WhatsApp ou par e-mail avec votre numéro de commande et nous comblons la différence gratuitement. Laissez la publication ou le Reel en ligne et en public pendant la livraison d’un refill.',
      },
      {
        chip: '30 jours',
        title: 'Garantie de remboursement de 30 jours',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Les commandes éligibles peuvent être remboursées dans les 30 jours suivant l’achat. La politique de remboursement explique ce qui est éligible et comment faire la demande.',
      },
    ],
    link: {
      label: 'Lire la politique de remboursement',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: 'Combien coûtent les',
      highlight: 'likes Instagram ?',
    },
    intro: 'Les likes commencent à {fromPrice} les 50, et le prix par like baisse à mesure que le forfait grandit. Chaque prix est un paiement unique en dollars américains pour une publication ou un Reel.',
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
    id: 'why-buy-instagram-likes',
    title: {
      lead: 'Pourquoi acheter des',
      highlight: 'likes Instagram ?',
    },
    intro: 'Le nombre de likes est le signal le plus rapide que les gens lisent sur une publication. S’il paraît faible, un bon contenu passe inaperçu. Un forfait de likes fait monter ce chiffre sur les publications qui comptent le plus pour vous.',
    items: [
      {
        title: 'Des publications qui arrêtent le défilement',
        body: 'On voit les likes avant de lire la légende. Un bon chiffre donne envie de regarder une photo ou un Reel à deux fois.',
      },
      {
        title: 'Un appui pour les lancements et les offres',
        body: 'Lancements, nouvelles cartes et promotions démarrent mieux quand la publication ne reste pas à une poignée de likes.',
      },
      {
        title: 'Un profil plus homogène',
        body: 'D’anciennes publications avec peu de likes à côté d’autres qui en ont des centaines donnent un profil inégal. Les likes l’équilibrent.',
      },
    ],
    diagram: [
      'Arrête le défilement',
      'Lancements',
      'Profil homogène',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: 'Est-ce utile d’acheter des',
      highlight: 'likes Instagram ?',
    },
    intro: 'Les likes changent le chiffre sous une publication. À eux seuls, ils ne changent pas la façon dont Instagram la classe. Voici le bilan honnête.',
    no: {
      title: 'Ce qui ne change pas',
      items: [
        'Vos abonnés, vues ou commentaires',
        'Le classement dans Explorer ou Reels à lui seul',
        'Des ventes ou des messages sans une bonne publication derrière',
      ],
    },
    yes: {
      title: 'Ce qui change',
      items: [
        'Les likes de la publication ou du Reel choisi',
        'La popularité apparente de la publication pour les nouveaux visiteurs',
        'La première impression des lancements et promotions',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Illustration : likes Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Qui achète des',
      highlight: 'likes Instagram',
    },
    cards: [
      {
        title: 'Créateurs',
        body: 'Les créateurs ajoutent des likes à leurs Reels et carrousels les plus forts, ceux qu’ils veulent montrer en premier aux nouveaux visiteurs.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Petites entreprises',
        body: 'Boutiques, salons et cafés utilisent des likes sur les offres, les nouvelles cartes et les photos de produits, pour que les promotions ne semblent pas ignorées.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Marques et agences',
        body: 'Les marques et agences ajoutent des likes aux publications de campagne et aux collaborations, souvent avec une livraison progressive.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Quelle que soit la publication, la commande fonctionne de la même façon : un lien public, le forfait choisi et un chiffre qui commence en général à monter sous 6 à 8 heures. Personne n’a besoin de vos identifiants.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Likes Instagram ou',
      highlight: 'abonnés, vues et commentaires',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Les likes d’une publication ou d’un Reel',
        needs: 'Un lien vers la publication',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Abonnés',
        changes: 'Le nombre d’abonnés de votre profil',
        needs: 'Votre @nom public',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Vues',
        changes: 'Les vues d’un Reel ou d’une vidéo',
        needs: 'Un lien vers le Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Commentaires',
        changes: 'Les commentaires d’une publication publique',
        needs: 'Un lien vers la publication',
      },
    ],
    currentLabel: 'Cette page',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: 'Est-il sûr d’acheter des',
      highlight: 'likes Instagram ?',
    },
    lead: 'Cela dépend de trois choses : votre compte, votre paiement et vos données. Voici comment chacune fonctionne chez NovaLikes, ainsi que le seul risque qu’aucun vendeur ne peut supprimer.',
    body: 'Les Règles de la communauté Instagram demandent de ne pas obtenir de likes, d’abonnés ou de partages de façon artificielle, et Instagram supprime régulièrement les comptes qu’il juge inactifs ou faux. C’est pourquoi une petite baisse peut survenir après la livraison, et pourquoi chaque commande inclut un refill de 6 mois. Une taille adaptée à la publication et une livraison progressive paraissent plus naturelles.',
    cards: [
      {
        ui: 'nopass',
        title: 'Sécurité du compte',
        body: 'Il nous faut seulement le lien public de la publication ou du Reel : personne ne se connecte à votre compte et rien n’y est modifié. Nous ne demandons jamais de mot de passe ni de code de connexion. Si quelqu’un se présentant comme NovaLikes vous en demande un, ce n’est pas nous.',
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
      highlight: 'likes Instagram',
    },
    lead: 'Vérifiez ces quatre points une fois et votre commande se déroulera sans accroc.',
    items: [
      {
        title: 'La publication est publique',
        body: 'Elle doit être sur un compte public jusqu’à la fin de la livraison.',
      },
      {
        title: 'Le lien est celui de la publication',
        body: 'Copiez le lien de la publication elle-même, pas celui de votre profil. Il ressemble à instagram.com/p/… ou instagram.com/reel/….',
      },
      {
        title: 'La publication reste en ligne',
        body: 'Ne la supprimez pas et ne l’archivez pas pendant la livraison ni pendant les 6 mois de refill.',
      },
      {
        title: 'Les likes sont visibles',
        body: 'Si vous avez masqué le nombre de likes, ils arrivent quand même mais personne ne les voit. Réaffichez-le.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: 'Des questions avant de commander ?',
    title: 'Questions fréquentes sur les likes Instagram',
    intro: 'Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp au +44 7454 758272, 24 h/24.',
    cta: 'Nous écrire sur WhatsApp',
    locale: {
      code: 'fr',
    },
    extra: [
      {
        id: 'fr-ig-likes-v2-1',
        question: 'Combien de likes Instagram devrais-je acheter ?',
        answer: 'Choisissez un chiffre adapté à la publication et à votre compte. Quelques centaines de likes conviennent à la plupart des publications de petits comptes ; les grands comptes et les campagnes en supportent quelques milliers. En cas de doute, commencez petit.',
      },
      {
        id: 'fr-ig-likes-v2-2',
        question: 'Puis-je répartir un forfait de likes sur plusieurs publications ?',
        answer: 'Non. Chaque commande couvre une publication ou un Reel, pour que la livraison et le refill restent faciles à suivre. Pour plusieurs publications, passez une commande par publication.',
      },
      {
        id: 'fr-ig-likes-v2-3',
        question: 'Puis-je demander un remboursement ?',
        answer: 'Les commandes éligibles sont couvertes par notre garantie de remboursement de 30 jours, à compter de la date d’achat. La politique de remboursement précise quelles commandes sont éligibles et comment faire la demande.',
      },
      {
        id: 'fr-ig-likes-v2-4',
        question: 'Quels moyens de paiement puis-je utiliser ?',
        answer: 'Vous pouvez payer par carte, Apple Pay ou Google Pay, en dollars américains. C’est un paiement unique et rien ne se renouvelle.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Autres services Instagram',
    intro: 'Les likes Instagram changent un seul chiffre. Pour en faire progresser un autre, choisissez un service.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Acheter des abonnés Instagram',
        line: 'Faites grandir votre profil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Acheter des vues Instagram',
        line: 'Plus de regards sur vos Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Acheter des commentaires Instagram',
        line: 'Lancez la conversation sous une publication',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
