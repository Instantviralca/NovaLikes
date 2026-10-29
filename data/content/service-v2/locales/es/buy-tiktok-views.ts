import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-tiktok-views. Primary keyword: "comprar visualizaciones tiktok". Do not edit wording without the content owner. */
export const ES_BUY_TIKTOK_VIEWS_V2 = {
  meta: {
    slug: 'buy-tiktok-views',
    platform: 'TikTok',
    name: 'Visualizaciones de TikTok',
    unit: 'visualizaciones',
    unitSingular: 'visualización',
    inputKind: 'link',
    perUnit: 1000,
    tiers: true,
    keywords: {
      primary: 'comprar visualizaciones tiktok',
      secondary: [
        'comprar vistas tiktok',
        'comprar reproducciones tiktok',
        'paquetes de visualizaciones tiktok',
        'precio visualizaciones tiktok',
      ],
      questions: [
        'es seguro comprar visualizaciones de tiktok',
        'cuánto cuestan las visualizaciones de tiktok',
        'cuentan para creator rewards',
        'high quality o premium',
        'por qué mi tiktok tiene 0 visualizaciones',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'visualizaciones de TikTok',
      tail: 'para un arranque más fuerte',
    },
    subtitle: 'Un vídeo nuevo con unos cientos de visualizaciones se desliza rápido, por bueno que sea. Dale un número más fuerte desde el principio. Visualizaciones High Quality o Premium desde {fromPrice}.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de visualizaciones de TikTok',
    intro: 'Elige un nivel y un paquete. Precios en USD.',
    summaryName: '{quantity} visualizaciones {tier} de TikTok',
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
    tiers: [
      {
        label: 'High Quality',
        note: 'Nuestro precio más bajo por visualización.',
      },
      {
        label: 'Premium',
        note: 'Nuestra opción de visualizaciones de nivel superior.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: '¿Por qué elegir NovaLikes para',
      highlight: 'visualizaciones de TikTok?',
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
        body: 'Si las visualizaciones de tu pedido bajan en los 6 meses posteriores a la entrega, envíanos tu número de pedido y los reponemos sin coste.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantía de devolución de 30 días',
        body: 'Los pedidos elegibles están cubiertos durante 30 días desde la fecha de compra. Nuestra política de reembolso explica qué incluye.',
      },
      {
        icon: 'layers',
        tone: 'pink',
        title: 'Dos niveles de calidad',
        body: 'High Quality es nuestro precio más bajo por visualización y Premium nuestra opción superior. Ambos tienen los mismos plazos y 6 meses de reposición.',
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
      highlight: 'visualizaciones de TikTok',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos. Elige High Quality o Premium, una cantidad y pega el enlace a un vídeo público.',
    items: [
      {
        ui: 'public',
        title: 'Mantén el vídeo público',
        body: 'El vídeo debe ser público, en una cuenta pública, hasta que termine la entrega. No lo borres.',
      },
      {
        ui: 'packages',
        title: 'Elige nivel y paquete',
        body: 'Elige High Quality o Premium y después una cantidad. Cada paquete muestra el precio antes de decidir.',
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
      count: 10000,
      unit: 'visualizaciones',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Vídeo privado',
      sub: 'Desactivado, para llegar al vídeo',
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
      highlight: 'visualizaciones de TikTok',
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
    title: 'Reposición y garantía de devolución para visualizaciones de TikTok',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-order-process.webp',
        body: 'Si las visualizaciones de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén el vídeo publicado y público mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-views-cost',
    title: {
      lead: '¿Cuánto cuestan las',
      highlight: 'visualizaciones de TikTok?',
    },
    intro: 'Las visualizaciones empiezan desde {fromPrice}. High Quality tiene el precio más bajo por 1.000 y Premium cuesta algo más. Cada precio es un pago único en dólares estadounidenses por un vídeo.',
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
    id: 'why-buy-tiktok-views',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'visualizaciones de TikTok?',
    },
    intro: 'En TikTok se desliza rápido, y el número de visualizaciones es de lo poco que la gente percibe antes de decidir. Las visualizaciones hacen que un vídeo nuevo parezca que ya se está viendo.',
    items: [
      {
        title: 'Vídeos nuevos que no empiezan en cero',
        body: 'Un vídeo recién subido con un número sólido merece unos segundos de atención.',
      },
      {
        title: 'Anuncios que convencen',
        body: 'Los vídeos de producto y promoción convencen más cuando el número muestra que se han visto.',
      },
      {
        title: 'Un portafolio más fuerte',
        body: 'Los creadores que se presentan a marcas pueden mostrar vídeos con buenas visualizaciones.',
      },
    ],
    diagram: [
      'No desde cero',
      'Anuncios',
      'Portafolio',
    ],
  },
  help: {
    id: 'does-buying-tiktok-views-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'visualizaciones de TikTok?',
    },
    intro: 'Las visualizaciones cambian el número de un vídeo. Lo que TikTok impulsa sigue dependiendo del tiempo de visualización y de las reacciones reales.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Tiempo de visualización, likes o compartidos por sí solos',
        'La posición en Para ti por sí sola',
        'Ingresos de Creator Rewards',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Las visualizaciones del vídeo que elijas',
        'Lo visto que parece el vídeo a nuevos espectadores',
        'La primera impresión de lanzamientos y promociones',
      ],
      image: '/assets/images/illustrations/tiktok-views/tiktok-views-does-help.webp',
      altFallback: 'Ilustración: visualizaciones de TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'visualizaciones de TikTok',
    },
    cards: [
      {
        title: 'Negocios locales',
        body: 'Restaurantes, salones y talleres añaden visualizaciones a vídeos promocionales que comparten en su biografía, anuncios y WhatsApp.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-best-practices.webp',
      },
      {
        title: 'Creadores de nicho',
        body: 'Los creadores añaden visualizaciones a formatos nuevos y estrenos de series mientras descubren qué le gusta a su público.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        title: 'Agencias',
        body: 'Las agencias añaden visualizaciones a vídeos de lanzamiento de campañas, a menudo con entrega gradual.',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea el vídeo, el pedido funciona igual: un enlace público, el nivel y la cantidad que elijas, y visualizaciones que suelen empezar en 6–8 horas. Sin iniciar sesión.',
  },
  vs: {
    id: 'tiktok-views-vs-other-services',
    title: {
      lead: 'Visualizaciones de TikTok frente a',
      highlight: 'likes y seguidores',
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
        slug: 'buy-tiktok-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un vídeo',
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
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Los likes de un vídeo',
        needs: 'Un enlace al vídeo público',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'visualizaciones de TikTok?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas de la comunidad de TikTok no permiten interacciones falsas, y Creator Rewards solo paga por las visualizaciones que TikTok considera válidas. Así que nunca compres visualizaciones para ganar dinero. TikTok también elimina cuentas inactivas, por eso puede haber una pequeña bajada tras la entrega, y cada pedido incluye 6 meses de reposición.',
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
      highlight: 'visualizaciones de TikTok',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'El vídeo es público',
        body: 'Las visualizaciones no llegan a un vídeo privado ni a un vídeo de una cuenta privada.',
      },
      {
        title: 'El enlace es del vídeo',
        body: 'Cópialo desde «Compartir», no el enlace de tu perfil.',
      },
      {
        title: 'El vídeo sigue online',
        body: 'Mantenlo online durante la entrega y los 6 meses de reposición.',
      },
      {
        title: 'Has elegido un nivel',
        body: 'High Quality es el precio más bajo por visualización y Premium la opción superior. ¿Dudas? Pregúntanos por WhatsApp.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre visualizaciones de TikTok',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-tt-views-v2-1',
        question: '¿Las visualizaciones compradas cuentan para Creator Rewards?',
        answer: 'No las compres para eso. Creator Rewards solo paga por las visualizaciones que TikTok considera válidas, y sus normas prohíben las interacciones falsas. Las visualizaciones compradas no generan dinero y pueden poner en riesgo la cuenta.',
      },
      {
        id: 'es-tt-views-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-tt-views-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Las visualizaciones de TikTok cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprar likes de TikTok',
        line: 'Más corazones en un vídeo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-followers',
        title: 'Comprar seguidores de TikTok',
        line: 'Haz crecer tu perfil de TikTok',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        slug: 'buy-instagram-views',
        title: 'Comprar visualizaciones de Instagram',
        line: 'Más ojos en tus Reels',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
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
