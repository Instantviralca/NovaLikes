import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-tiktok-followers. Primary keyword: "comprar seguidores tiktok". Do not edit wording without the content owner. */
export const ES_BUY_TIKTOK_FOLLOWERS_V2 = {
  meta: {
    slug: 'buy-tiktok-followers',
    platform: 'TikTok',
    name: 'Seguidores de TikTok',
    unit: 'seguidores',
    unitSingular: 'seguidor',
    inputKind: 'username',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar seguidores tiktok',
      secondary: [
        'comprar seguidores de tiktok sin contraseña',
        'paquetes de seguidores de tiktok',
        'precio seguidores tiktok',
        'conseguir más seguidores en tiktok',
      ],
      questions: [
        'es seguro comprar seguidores de tiktok',
        'cuánto cuestan los seguidores de tiktok',
        'sirven para creator rewards',
        'por qué bajan mis seguidores de tiktok',
        'sirve de algo comprar seguidores',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'seguidores de TikTok',
      tail: 'para un perfil que convenza',
    },
    subtitle: 'Quien disfruta uno de tus vídeos mira primero tu perfil. Un número de seguidores creíble hace más fácil que te siga. Desde {fromPrice}, solo con tu usuario.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de seguidores de TikTok',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} seguidores de TikTok',
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
        body: 'Solo el usuario',
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
      highlight: 'seguidores de TikTok?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Tu usuario, nunca tu contraseña',
        body: 'Solo necesitamos tu nombre de usuario público. Sin código de acceso y sin entrar en tu cuenta.',
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
        body: 'Si los seguidores de tu pedido bajan en los 6 meses posteriores a la entrega, envíanos tu número de pedido y los reponemos sin coste.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantía de devolución de 30 días',
        body: 'Los pedidos elegibles están cubiertos durante 30 días desde la fecha de compra. Nuestra política de reembolso explica qué incluye.',
      },
      {
        icon: 'user-plus',
        tone: 'pink',
        title: 'Solo tu usuario',
        body: 'Escribe tu usuario de TikTok sin la @. Nunca pedimos tu acceso, un código ni entrar en tu cuenta.',
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
      highlight: 'seguidores de TikTok',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos tu usuario público de TikTok.',
    items: [
      {
        ui: 'public',
        title: 'Pon tu perfil en público',
        body: 'Los seguidores solo se pueden entregar a una cuenta pública de TikTok. Después puedes volver a ponerla en privado.',
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
        title: 'Añade tu usuario',
        body: 'Escribe tu usuario sin la @ y tu email para el recibo y los avisos. Revisa cómo está escrito antes de pagar.',
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
      unit: 'seguidores',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Cuenta privada',
      sub: 'Desactivada, para poder llegar',
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
      placeholder: 'tuusuario',
    },
    safeChips: [
      'Solo el usuario',
      'Pago seguro',
    ],
    privacyTags: [
      '@usuario',
      'email',
    ],
  },
  compare: {
    id: 'spot-a-risky-seller',
    title: {
      lead: 'Cómo detectar un vendedor poco fiable de',
      highlight: 'seguidores de TikTok',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el usuario',
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
    title: 'Reposición y garantía de devolución para seguidores de TikTok',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-order-process.webp',
        body: 'Si los seguidores de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén el mismo nombre de usuario y el perfil público mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'tiktok-followers-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'seguidores de TikTok?',
    },
    intro: 'Los seguidores empiezan desde {fromPrice} por 100, y el precio por seguidor baja a medida que crece el paquete. Cada precio es un pago único en dólares estadounidenses por una cuenta.',
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
    id: 'why-buy-tiktok-followers',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'seguidores de TikTok?',
    },
    intro: 'En TikTok la gente suele descubrirte por un vídeo y luego entra en tu perfil. Un número de seguidores consolidado hace más fácil decidir seguirte.',
    items: [
      {
        title: 'Un perfil a la altura del vídeo',
        body: 'Un vídeo con miles de visualizaciones junto a un perfil con 40 seguidores se ve raro. Los seguidores cierran esa brecha.',
      },
      {
        title: 'Un arranque para cuentas nuevas',
        body: 'Una cuenta nueva de marca o de proyecto no tiene que quedarse en cero mientras encuentras tu formato.',
      },
      {
        title: 'Conversaciones más fáciles con marcas',
        body: 'Las marcas y agencias suelen mirar el número de seguidores antes de responder a un creador.',
      },
    ],
    diagram: [
      'A la altura',
      'Arranque',
      'Listo para marcas',
    ],
  },
  help: {
    id: 'does-buying-tiktok-followers-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'seguidores de TikTok?',
    },
    intro: 'Los seguidores cambian el número de tu perfil. Lo que recomienda TikTok sigue dependiendo de cómo ven tus vídeos.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Visualizaciones o likes de tus vídeos',
        'La posición en Para ti por sí sola',
        'El acceso a Creator Rewards u otras funciones de pago',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'El número de seguidores de tu perfil de TikTok',
        'Lo consolidada que parece la cuenta a nuevos visitantes',
        'La primera impresión ante marcas y colaboraciones',
      ],
      image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-does-help.webp',
      altFallback: 'Ilustración: seguidores de TikTok',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'seguidores de TikTok',
    },
    cards: [
      {
        title: 'Pequeños negocios',
        body: 'Panaderías, barberías y tiendas añaden seguidores para que su TikTok se vea tan vivo como sus vídeos.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-best-practices.webp',
      },
      {
        title: 'Creadores emergentes',
        body: 'Creadores de humor, gaming y estilo de vida usan seguidores para verse consolidados mientras publican con constancia.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-hero.webp',
      },
      {
        title: 'Música y ocio nocturno',
        body: 'DJ, grupos y salas suman seguidores antes de un lanzamiento, una fecha de gira o una gran noche.',
        image: '/assets/images/illustrations/tiktok-followers/tiktok-followers-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea el motivo, el pedido funciona igual: tu usuario, un paquete adecuado y seguidores que suelen empezar a llegar en 6–8 horas. Nunca pedimos tu contraseña.',
  },
  vs: {
    id: 'tiktok-followers-vs-other-services',
    title: {
      lead: 'Seguidores de TikTok frente a',
      highlight: 'likes y visualizaciones',
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
        slug: 'buy-tiktok-followers',
        label: 'Seguidores',
        changes: 'El número de seguidores de tu perfil',
        needs: 'Tu usuario público',
        current: true,
      },
      {
        slug: 'buy-tiktok-likes',
        label: 'Likes',
        changes: 'Los likes de un vídeo',
        needs: 'Un enlace al vídeo público',
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
      highlight: 'seguidores de TikTok?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas de la comunidad de TikTok no permiten interacciones falsas, y TikTok elimina con regularidad cuentas que considera inactivas o falsas. Por eso puede haber alguna bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. Nunca compres seguidores para acceder a Creator Rewards: va contra las normas de TikTok.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos tu nombre de usuario público, así que nadie entra en tu cuenta ni cambia nada. Nunca pedimos un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
      },
      {
        ui: 'pay',
        title: 'Seguridad del pago',
        body: 'Pagas una sola vez en un pago seguro con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción y nada se renueva.',
      },
      {
        ui: 'privacy',
        title: 'Privacidad',
        body: 'Tu usuario y tu email solo se usan para procesar el pedido y enviarte avisos, como explica nuestra [política de privacidad](/privacy-policy).',
      },
    ],
  },
  before: {
    id: 'delivery-and-safety',
    title: {
      lead: 'Antes de comprar',
      highlight: 'seguidores de TikTok',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'La cuenta es pública',
        body: 'Una cuenta privada impide que empiece el pedido. Mantenla pública hasta que termine la entrega.',
      },
      {
        title: 'El usuario está bien escrito',
        body: 'Revisa cada letra, punto y guion bajo. Los seguidores van exactamente al usuario que escribes.',
      },
      {
        title: 'El usuario no cambia',
        body: 'Mantén el mismo usuario durante la entrega y los 6 meses de reposición.',
      },
      {
        title: 'El tamaño encaja',
        body: 'Elige un paquete que se vea natural junto a tus visualizaciones y seguidores actuales.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre seguidores de TikTok',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-tt-followers-v2-1',
        question: '¿Los seguidores comprados sirven para Creator Rewards de TikTok?',
        answer: 'No, y no deberías intentarlo. Las normas de TikTok prohíben las interacciones falsas, e inflar los seguidores para acceder a programas de pago puede poner en riesgo la cuenta.',
      },
      {
        id: 'es-tt-followers-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-tt-followers-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Los seguidores de TikTok cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-tiktok-likes',
        title: 'Comprar likes de TikTok',
        line: 'Más corazones en un vídeo',
        image: '/assets/images/illustrations/tiktok-likes/tiktok-likes-hero.webp',
      },
      {
        slug: 'buy-tiktok-views',
        title: 'Comprar visualizaciones de TikTok',
        line: 'Un mejor arranque para un vídeo',
        image: '/assets/images/illustrations/tiktok-views/tiktok-views-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores de Instagram',
        line: 'Haz crecer tu perfil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
