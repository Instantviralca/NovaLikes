import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-tiktok-likes. Primary keyword: "comprar likes tiktok". Do not edit wording without the content owner. */
export const ES_BUY_TIKTOK_LIKES_V2 = {
  meta: {
    slug: 'buy-tiktok-likes',
    platform: 'TikTok',
    name: 'Likes de TikTok',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar likes tiktok',
      secondary: [
        'comprar likes para vídeos de tiktok',
        'paquetes de likes de tiktok',
        'precio likes tiktok',
        'comprar corazones tiktok',
      ],
      questions: [
        'es seguro comprar likes de tiktok',
        'cuánto cuestan los likes de tiktok',
        'los likes hacen viral un vídeo',
        'puedo repartir los likes',
        'bajan los likes comprados',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'likes de TikTok',
      tail: 'para tu vídeo más importante',
    },
    subtitle: 'Los corazones aparecen junto a tu vídeo mientras se reproduce. Haz que tu lanzamiento, tu colaboración o tu mejor clip muestre un número a la altura. Desde {fromPrice}, solo con el enlace del vídeo.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de likes de TikTok',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} likes de TikTok',
    save: 'Ahorras',
    cta: 'Añadir al carrito',
    oneTime: 'Compra única. Sin suscripción.',
    secure: 'Pago seguro',
    methods: [
      'Tarjeta',
      'Apple Pay',
      'Google Pay',
    ],
    features: [
      {
        icon: 'shield',
        title: 'Sin contraseña',
        body: 'Solo el enlace',
      },
      {
        icon: 'clock',
        title: 'Empieza en 6–8 h',
        body: 'Termina 4–6 h después',
      },
      {
        icon: 'message-square',
        title: 'Te ayudamos',
        body: '24/7 por WhatsApp',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: '¿Por qué elegir NovaLikes para',
      highlight: 'likes de TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, nunca tu contraseña',
        body: 'Solo necesitamos el enlace público del vídeo. Sin código de acceso y sin entrar en tu cuenta.',
      },
      {
        icon: 'clock',
        tone: 'sun',
        title: 'Plazos claros de inicio y fin',
        body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. ¿Prefieres un ritmo más lento? Pide una entrega gradual.',
      },
      {
        icon: 'refresh-cw',
        tone: 'lilac',
        title: '6 meses de reposición',
        body: 'Si los likes de tu pedido bajan en los 6 meses posteriores a la entrega, envíanos tu número de pedido y los reponemos sin coste.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantía de devolución de 30 días',
        body: 'Los pedidos elegibles están cubiertos durante 30 días desde la fecha de compra. Nuestra política de reembolso explica qué incluye.',
      },
      {
        icon: 'heart',
        tone: 'pink',
        title: 'Cualquier vídeo público',
        body: 'Pide likes para cualquier vídeo público de TikTok. Cada pedido cubre un vídeo.',
      },
    ],
    promo: {
      eyebrow: '¿No sabes qué paquete elegir?',
      title: 'Pregúntanos antes de comprar',
      cta: 'Escríbenos por WhatsApp',
    },
  },
  steps: {
    id: 'how-it-works',
    title: {
      lead: 'Cómo comprar',
      highlight: 'likes de TikTok',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos el enlace a un vídeo público de TikTok.',
    items: [
      {
        ui: 'public',
        title: 'Mantén el vídeo público',
        body: 'El vídeo debe ser público, en una cuenta pública, hasta que termine la entrega. No lo borres.',
      },
      {
        ui: 'packages',
        title: 'Elige un paquete',
        body: 'Elige una cantidad de los paquetes de arriba. Cada paquete muestra el precio antes de decidir.',
      },
      {
        ui: 'cart',
        title: 'Añádelo al carrito',
        body: 'Pulsa «Añadir al carrito» y continúa al pago.',
      },
      {
        ui: 'username',
        title: 'Pega el enlace del vídeo',
        body: 'Abre el vídeo en TikTok, toca «Compartir», elige «Copiar enlace» y pégalo en el pago.',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 1000,
      unit: 'likes',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Vídeo privado',
      sub: 'Desactivado, para llegar al vídeo',
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
      'Solo el enlace',
      'Pago seguro',
    ],
    privacyTags: [
      'enlace',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Cómo detectar un vendedor poco fiable de',
      highlight: 'likes de TikTok',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el enlace del vídeo',
        riskySeller: 'Te piden la contraseña',
      },
      {
        label: 'Plazos',
        novalikes: 'Empieza en 6–8 horas',
        riskySeller: 'Sin plazo indicado',
      },
      {
        label: 'Bajadas',
        novalikes: '6 meses de reposición',
        riskySeller: 'Sin reposición',
      },
      {
        label: 'Reembolsos',
        novalikes: 'Devolución en 30 días*',
        riskySeller: 'Sin política escrita',
      },
      {
        label: 'Soporte',
        novalikes: 'WhatsApp 24/7',
        riskySeller: 'Difíciles de contactar',
      },
      {
        label: 'Precio',
        novalikes: 'En USD, visible antes',
        riskySeller: 'Cambia en el pago',
      },
      {
        label: 'Seguimiento',
        novalikes: 'Página «Seguir pedido»',
        riskySeller: 'Sin forma de comprobarlo',
      },
    ],
    note: '*En pedidos elegibles, según nuestra política de reembolso.',
  },
  promises: {
    id: 'our-promises',
    title: 'Reposición y garantía de devolución para likes de TikTok',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-order-process.webp',
        body: 'Si los likes de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén el vídeo publicado y público mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-likes-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'likes de TikTok?',
    },
    intro: 'Los likes empiezan desde {fromPrice} por 100, y el precio por like baja a medida que crece el paquete. Cada precio es un pago único en dólares estadounidenses por un vídeo.',
    points: [
      'Los 6 meses de reposición están incluidos. No hay que añadir nada.',
      'Precios en dólares estadounidenses. Tu banco lo convierte a tu moneda y algunas tarjetas cobran una comisión por ello.',
      'Sin suscripción ni renovación. Pagas una vez por pedido.',
    ],
    cols: [
      'Paquete',
      'Precio',
      'Por 1.000',
    ],
    best: 'Mejor precio',
    note: 'Los precios salen de nuestros paquetes actuales. El precio que ves en el pago es el que pagas.',
  },
  whyBuy: {
    id: 'why-buy-tiktok-likes',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'likes de TikTok?',
    },
    intro: 'Un TikTok con muchas visualizaciones pero pocos corazones hace dudar a quien lo ve. Los likes mantienen los números en equilibrio para que el vídeo se vea tan bien como es.',
    items: [
      {
        title: 'Vídeos que se ven queridos',
        body: 'Un buen número de corazones muestra que a otros les gustó el vídeo.',
      },
      {
        title: 'Vídeos fijados más fuertes',
        body: 'Los vídeos fijados en tu perfil trabajan mucho. Los likes hacen que parezcan los mejores.',
      },
      {
        title: 'Mejores enlaces fuera de TikTok',
        body: 'Cuando compartes un TikTok por WhatsApp, Instagram o email, se ve más atractivo con un buen número de likes.',
      },
    ],
    diagram: [
      'Se ve querido',
      'Vídeos fijados',
      'Enlaces compartidos',
    ],
  },
  help: {
    id: 'does-buying-tiktok-likes-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'likes de TikTok?',
    },
    intro: 'Los likes cambian los corazones de un vídeo. TikTok sigue decidiendo el alcance según cómo lo ven los espectadores reales.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Visualizaciones o seguidores por sí solos',
        'La posición en Para ti por sí sola',
        'Compartidos, guardados o comentarios reales',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Los likes del vídeo que elijas',
        'Lo querido que parece el vídeo a nuevos espectadores',
        'Lo fuertes que se ven los vídeos fijados y compartidos',
      ],
      image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-does-help.webp',
      altFallback: 'Ilustración: likes de TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'likes de TikTok',
    },
    cards: [
      {
        title: 'Vendedores de productos',
        body: 'Tiendas online añaden likes a vídeos de producto antes de usarlos como anuncio o compartirlos con distribuidores.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-best-practices.webp',
      },
      {
        title: 'Creadores',
        body: 'Los creadores añaden likes a vídeos de colaboración y clips fijados, para que el perfil empiece con vídeos populares.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        title: 'Locales y eventos',
        body: 'Bares, clubes de comedia y festivales añaden likes a vídeos del cartel y del ambiente antes de la gran fecha.',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea el vídeo, el pedido funciona igual: un enlace público, el paquete que elijas y likes que suelen empezar en 6–8 horas. Sin iniciar sesión.',
  },
  vs: {
    id: 'tiktok-likes-vs-other-services',
    title: {
      lead: 'Likes de TikTok frente a',
      highlight: 'visualizaciones y seguidores',
    },
    intro: 'Cada servicio cambia un número distinto. Elige el que encaja con lo que quieres que vea la gente.',
    cols: [
      'Servicio',
      'Qué cambia',
      'Qué nos das',
      'Desde',
    ],
    rows: [
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Los likes de un vídeo',
        needs: 'Un enlace al vídeo público',
        current: true,
      },
      {
        slug: 'buy-tiktok-followers',
        label: 'Seguidores',
        changes: 'El número de seguidores de tu perfil',
        needs: 'Tu usuario público',
      },
      {
        slug: 'buy-tiktok-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un vídeo',
        needs: 'Un enlace al vídeo público',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'likes de TikTok?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas de la comunidad de TikTok no permiten interacciones falsas, y TikTok elimina con regularidad cuentas que considera inactivas o falsas. Por eso puede haber una pequeña bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. Los likes en proporción a las visualizaciones se ven más naturales.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público del vídeo, así que nadie entra en tu cuenta ni cambia nada. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
      },
      {
        ui: 'pay',
        title: 'Seguridad del pago',
        body: 'Pagas una sola vez en un pago seguro con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción y nada se renueva.',
      },
      {
        ui: 'privacy',
        title: 'Privacidad',
        body: 'Tu enlace y tu email solo se usan para procesar el pedido y enviarte avisos, como explica nuestra [política de privacidad](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'likes de TikTok',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'El vídeo es público',
        body: 'Los likes no llegan a un vídeo privado ni a un vídeo de una cuenta privada.',
      },
      {
        title: 'El enlace es del vídeo',
        body: 'Cópialo desde «Compartir». Se ve así: tiktok.com/@nombre/video/…, no como el enlace de tu perfil.',
      },
      {
        title: 'El vídeo sigue online',
        body: 'No lo borres durante la entrega ni los 6 meses de reposición.',
      },
      {
        title: 'Los likes encajan con las visualizaciones',
        body: 'Miles de likes con unos cientos de visualizaciones se ven raros. Elige un tamaño adecuado o añade visualizaciones.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre likes de TikTok',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-tt-likes-v2-1',
        question: '¿Puedo repartir un paquete de likes entre varios vídeos?',
        answer: 'No. Cada pedido cubre un vídeo, para que la entrega y la reposición sean fáciles de seguir.',
      },
      {
        id: 'es-tt-likes-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-tt-likes-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Los likes de TikTok cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-tiktok-views',
        title: 'Comprar visualizaciones de TikTok',
        line: 'Un mejor arranque para un vídeo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprar seguidores de TikTok',
        line: 'Haz crecer tu perfil de TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar likes de Instagram',
        line: 'Para publicaciones, carruseles y Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
    ],
    cardPrice: 'Desde {fromPrice}',
    guidesTitle: '',
    guides: [],
  },
  sticky: {
    label: 'Elegir paquete',
    href: '#pricing-packages',
  },
  whatsapp: {
    display: '+44 7454 758272',
    href: 'https://wa.me/447454758272',
  },
} satisfies ServiceV2Content;
