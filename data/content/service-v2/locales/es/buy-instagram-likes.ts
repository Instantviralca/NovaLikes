import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-instagram-likes. Primary keyword: "comprar likes instagram". Do not edit wording without the content owner. */
export const ES_BUY_INSTAGRAM_LIKES_V2 = {
  meta: {
    slug: 'buy-instagram-likes',
    platform: 'Instagram',
    name: 'Likes de Instagram',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar likes instagram',
      secondary: [
        'comprar likes para reels',
        'paquetes de likes de instagram',
        'comprar me gusta instagram',
        'precio likes instagram',
      ],
      questions: [
        'es seguro comprar likes de instagram',
        'cuánto cuestan los likes de instagram',
        'se pueden comprar likes para reels',
        'los likes comprados desaparecen',
        'sirve de algo comprar likes',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'likes de Instagram',
      tail: 'para publicaciones y Reels que destaquen',
    },
    subtitle: 'Haz que tus mejores fotos, carruseles y Reels parezcan tan populares como merecen. Los likes aportan prueba social a cualquier publicación pública, desde {fromPrice} y sin iniciar sesión.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de likes de Instagram',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} likes de Instagram',
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
      highlight: 'likes de Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, nunca tu contraseña',
        body: 'Solo necesitamos el enlace público de la publicación o el Reel. Sin código de acceso y sin entrar en tu cuenta.',
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
        icon: 'image',
        tone: 'pink',
        title: 'Publicaciones, carruseles y Reels',
        body: 'Pide likes para cualquier foto, carrusel o Reel público. Cada pedido cubre una publicación, para que tu mejor contenido reciba justo el impulso que eliges.',
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
      highlight: 'likes de Instagram',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos el enlace a una publicación o Reel público.',
    items: [
      {
        ui: 'public',
        title: 'Mantén la publicación pública',
        body: 'La publicación o el Reel debe estar en una cuenta pública hasta que termine la entrega. No la borres ni la archives durante el pedido.',
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
        title: 'Pega el enlace',
        body: 'Abre la publicación, toca los tres puntos o «Compartir», elige «Copiar enlace» y pégalo en el pago, junto a tu email.',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 2500,
      unit: 'likes',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Cuenta privada',
      sub: 'Desactivada, para llegar a la publicación',
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
      highlight: 'likes de Instagram',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el enlace',
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
    title: 'Reposición y garantía de devolución para likes de Instagram',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-order-process.webp',
        body: 'Si los likes de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén la publicación o el Reel publicada y pública mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-likes-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'likes de Instagram?',
    },
    intro: 'Los likes empiezan desde {fromPrice} por 50, y el precio por like baja a medida que crece el paquete. Cada precio es un pago único en dólares estadounidenses por una publicación o Reel.',
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
    id: 'why-buy-instagram-likes',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'likes de Instagram?',
    },
    intro: 'El número de likes es la señal más rápida que la gente lee en una publicación. Si parece bajo, el buen contenido pasa de largo. Un paquete de likes sube ese número en las publicaciones que más te importan.',
    items: [
      {
        title: 'Publicaciones que hacen parar',
        body: 'La gente ve los likes antes de leer el texto. Un buen número hace que una foto o un Reel merezca una segunda mirada.',
      },
      {
        title: 'Apoyo para lanzamientos y ofertas',
        body: 'Lanzamientos, cartas nuevas y promociones arrancan mejor si la publicación no se queda en un puñado de likes.',
      },
      {
        title: 'Un perfil más equilibrado',
        body: 'Publicaciones antiguas con pocos likes junto a otras con cientos hacen que el perfil se vea desigual. Los likes lo equilibran.',
      },
    ],
    diagram: [
      'Hace parar',
      'Lanzamientos',
      'Perfil equilibrado',
    ],
  },
  help: {
    id: 'does-buying-instagram-likes-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'likes de Instagram?',
    },
    intro: 'Los likes cambian el número bajo una publicación. Por sí solos no cambian cómo Instagram la posiciona. Este es el reparto honesto.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Tus seguidores, visualizaciones o comentarios',
        'La posición en Explorar o Reels por sí sola',
        'Ventas o mensajes sin una buena publicación detrás',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Los likes de la publicación o Reel que elijas',
        'Lo popular que parece la publicación a los nuevos visitantes',
        'La primera impresión de lanzamientos y promociones',
      ],
      image: '/assets/images/illustrations/instagram-likes/instagram-likes-does-help.webp',
      altFallback: 'Ilustración: likes de Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'likes de Instagram',
    },
    cards: [
      {
        title: 'Creadores',
        body: 'Los creadores añaden likes a sus Reels y carruseles más fuertes, los que quieren que los nuevos visitantes vean primero.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-best-practices.webp',
      },
      {
        title: 'Pequeños negocios',
        body: 'Tiendas, salones y cafeterías usan likes en ofertas, cartas nuevas y fotos de producto, para que las promociones no parezcan ignoradas.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        title: 'Marcas y agencias',
        body: 'Marcas y agencias añaden likes a publicaciones de campaña y colaboraciones, a menudo con entrega gradual.',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea la publicación, el pedido funciona igual: un enlace público, el paquete que elijas y un número que suele empezar a subir en 6–8 horas. Nadie necesita tus datos de acceso.',
  },
  vs: {
    id: 'instagram-likes-vs-other-services',
    title: {
      lead: 'Likes de Instagram frente a',
      highlight: 'seguidores, visualizaciones y comentarios',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Los likes de una publicación o Reel',
        needs: 'Un enlace a la publicación',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Seguidores',
        changes: 'El número de seguidores de tu perfil',
        needs: 'Tu @usuario público',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un Reel o vídeo',
        needs: 'Un enlace al Reel',
      },
      {
        slug: 'buy-instagram-comments',
        label: 'Comentarios',
        changes: 'Comentarios en una publicación pública',
        needs: 'Un enlace a la publicación',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'likes de Instagram?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Instagram piden no conseguir likes, seguidores ni compartidos de forma artificial, e Instagram elimina con regularidad cuentas que considera inactivas o falsas. Por eso puede haber una pequeña bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. Un tamaño acorde a la publicación y la entrega gradual se ven más naturales.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público de la publicación o el Reel, así que nadie entra en tu cuenta ni cambia nada. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
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
      highlight: 'likes de Instagram',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'La publicación es pública',
        body: 'Debe estar en una cuenta pública hasta que termine la entrega.',
      },
      {
        title: 'El enlace es de la publicación',
        body: 'Copia el enlace de la propia publicación, no el de tu perfil. Se ve así: instagram.com/p/… o instagram.com/reel/….',
      },
      {
        title: 'La publicación sigue online',
        body: 'No la borres ni la archives durante la entrega ni los 6 meses de reposición.',
      },
      {
        title: 'Los likes son visibles',
        body: 'Si ocultaste el número de likes, llegan igual pero nadie los ve. Vuelve a mostrarlo.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre likes de Instagram',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-ig-likes-v2-1',
        question: '¿Cuántos likes de Instagram debería comprar?',
        answer: 'Elige un número acorde a la publicación y a tu cuenta. Unos cientos de likes encajan en la mayoría de publicaciones de cuentas pequeñas; las cuentas grandes y las campañas admiten unos miles. Si dudas, empieza con poco.',
      },
      {
        id: 'es-ig-likes-v2-2',
        question: '¿Puedo repartir un paquete de likes entre varias publicaciones?',
        answer: 'No. Cada pedido cubre una publicación o Reel, para que la entrega y la reposición sean fáciles de seguir. Para varias publicaciones, haz un pedido por cada una.',
      },
      {
        id: 'es-ig-likes-v2-3',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-ig-likes-v2-4',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de Instagram',
    intro: 'Los likes de Instagram cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores de Instagram',
        line: 'Haz crecer tu perfil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprar visualizaciones de Instagram',
        line: 'Más ojos en tus Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        slug: 'buy-instagram-comments',
        title: 'Comprar comentarios de Instagram',
        line: 'Inicia la conversación en una publicación',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
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
