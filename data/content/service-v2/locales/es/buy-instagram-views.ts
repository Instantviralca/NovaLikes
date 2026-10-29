import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-instagram-views. Primary keyword: "comprar visualizaciones instagram". Do not edit wording without the content owner. */
export const ES_BUY_INSTAGRAM_VIEWS_V2 = {
  meta: {
    slug: 'buy-instagram-views',
    platform: 'Instagram',
    name: 'Visualizaciones de Instagram',
    unit: 'visualizaciones',
    unitSingular: 'visualización',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar visualizaciones instagram',
      secondary: [
        'comprar vistas instagram',
        'comprar visualizaciones reels',
        'comprar reproducciones instagram',
        'precio visualizaciones instagram',
      ],
      questions: [
        'es seguro comprar visualizaciones de instagram',
        'cuánto cuestan las visualizaciones',
        'ayudan las visualizaciones a salir en explorar',
        'bajan las visualizaciones compradas',
        'cómo se cuentan las visualizaciones de reels',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'visualizaciones de Instagram',
      tail: 'para un mejor arranque de tus Reels',
    },
    subtitle: 'Los Reels con un buen número de visualizaciones parecen dignos de ver. Impulsa Reels nuevos, vídeos de producto y tutoriales desde {fromPrice}, con entrega gradual si la prefieres.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de visualizaciones de Instagram',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} visualizaciones de Instagram',
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
      highlight: 'visualizaciones de Instagram?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, nunca tu contraseña',
        body: 'Solo necesitamos el enlace público del Reel o vídeo. Sin código de acceso y sin entrar en tu cuenta.',
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
        icon: 'play',
        tone: 'pink',
        title: 'Reels y vídeos',
        body: 'Pide visualizaciones para cualquier Reel o vídeo público. Cada pedido cubre un vídeo.',
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
      highlight: 'visualizaciones de Instagram',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos el enlace a un Reel o vídeo público.',
    items: [
      {
        ui: 'public',
        title: 'Mantén el Reel público',
        body: 'El Reel o vídeo debe estar en una cuenta pública hasta que termine la entrega. No lo borres ni lo archives.',
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
        title: 'Pega el enlace del Reel',
        body: 'Abre el Reel, toca «Compartir», elige «Copiar enlace» y pégalo en el pago. Se ve así: instagram.com/reel/….',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 5000,
      unit: 'visualizaciones',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Cuenta privada',
      sub: 'Desactivada, para llegar al Reel',
    },
    chips: [
      '2.5K',
      '5K',
      '10K',
      '25K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'instagram.com/reel/…',
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
      highlight: 'visualizaciones de Instagram',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el enlace del Reel',
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
    title: 'Reposición y garantía de devolución para visualizaciones de Instagram',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/instagram-views/instagram-views-order-process.webp',
        body: 'Si las visualizaciones de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén el Reel o vídeo publicado y público mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/instagram-views/instagram-views-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-views-cost',
    title: {
      lead: '¿Cuánto cuestan las',
      highlight: 'visualizaciones de Instagram?',
    },
    intro: 'Las visualizaciones empiezan desde {fromPrice} por 500, y el precio por 1.000 baja mucho en los paquetes grandes. Cada precio es un pago único en dólares estadounidenses por un Reel o vídeo.',
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
    id: 'why-buy-instagram-views',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'visualizaciones de Instagram?',
    },
    intro: 'Un Reel con unas pocas decenas de visualizaciones puede parecer que no interesó a nadie, aunque sea bueno. Un paquete sube el número visible para que los nuevos espectadores le den al play con más ganas.',
    items: [
      {
        title: 'Reels que parecen dignos de ver',
        body: 'La gente ve antes un Reel que ya tiene visualizaciones. Un número más alto hace que el primer segundo cuente.',
      },
      {
        title: 'Un buen arranque para lanzamientos',
        body: 'Vídeos de producto, tutoriales y anuncios parecen consolidados desde el primer día en lugar de quedarse en cero.',
      },
      {
        title: 'Prueba para socios y clientes',
        body: 'Un buen número de visualizaciones ayuda cuando compartes Reels con marcas, colaboradores o clientes.',
      },
    ],
    diagram: [
      'Digno de ver',
      'Lanzamiento',
      'Prueba social',
    ],
  },
  help: {
    id: 'does-buying-instagram-views-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'visualizaciones de Instagram?',
    },
    intro: 'Las visualizaciones cambian el número de un Reel. Instagram sigue decidiendo el alcance según cómo reaccionan los espectadores reales.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Tiempo de visualización, compartidos o guardados por sí solos',
        'La posición en Explorar o Reels por sí sola',
        'Tus seguidores, likes o comentarios',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Las visualizaciones del Reel o vídeo que elijas',
        'Lo atractivo que parece el Reel a nuevos espectadores',
        'La primera impresión de lanzamientos y tutoriales',
      ],
      image: '/assets/images/illustrations/instagram-views/instagram-views-does-help.webp',
      altFallback: 'Ilustración: visualizaciones de Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'visualizaciones de Instagram',
    },
    cards: [
      {
        title: 'Creadores',
        body: 'Los creadores añaden visualizaciones a Reels y tutoriales nuevos para que un vídeo recién subido no se quede en cero mientras el algoritmo lo prueba.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-best-practices.webp',
      },
      {
        title: 'Pequeños negocios',
        body: 'Los negocios las usan en demos de producto, clips de detrás de cámaras y Reels promocionales que comparten en anuncios, biografías y mensajes.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-hero.webp',
      },
      {
        title: 'Marcas y agencias',
        body: 'Marcas y agencias añaden visualizaciones a Reels de campaña y colaboraciones, a menudo con entrega gradual.',
        image: '/assets/images/illustrations/instagram-views/instagram-views-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea el Reel, el pedido funciona igual: un enlace público, el paquete que elijas y un número que suele empezar a subir en 6–8 horas. Nadie necesita tus datos de acceso.',
  },
  vs: {
    id: 'instagram-views-vs-other-services',
    title: {
      lead: 'Visualizaciones de Instagram frente a',
      highlight: 'likes, seguidores y comentarios',
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
        slug: 'buy-instagram-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un Reel o vídeo',
        needs: 'Un enlace al Reel',
        current: true,
      },
      {
        slug: 'buy-instagram-followers',
        label: 'Seguidores',
        changes: 'El número de seguidores de tu perfil',
        needs: 'Tu @usuario público',
      },
      {
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Los likes de una publicación o Reel',
        needs: 'Un enlace a la publicación',
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
      highlight: 'visualizaciones de Instagram?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Instagram piden no aumentar las interacciones de forma artificial, e Instagram elimina con regularidad cuentas que considera inactivas o falsas. Por eso puede haber una pequeña bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. La entrega gradual y los Reels que la gente sí ve se notan más naturales.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público del Reel o vídeo, así que nadie entra en tu cuenta ni cambia nada. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
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
      highlight: 'visualizaciones de Instagram',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'El Reel es público',
        body: 'Debe estar en una cuenta pública hasta que termine la entrega.',
      },
      {
        title: 'El enlace es del Reel',
        body: 'Cópialo del propio Reel. Se ve así: instagram.com/reel/…, no como el enlace de tu perfil.',
      },
      {
        title: 'El Reel sigue online',
        body: 'No lo borres ni lo archives durante la entrega ni los 6 meses de reposición.',
      },
      {
        title: 'Los números encajan',
        body: 'Decenas de miles de visualizaciones con casi ningún like pueden verse raras. Combínalas con likes o elige un tamaño adecuado.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre visualizaciones de Instagram',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-ig-views-v2-1',
        question: '¿Cuántas visualizaciones de Instagram debería comprar?',
        answer: 'Elige un tamaño acorde a tu cuenta y al Reel. Unos miles encajan en la mayoría de Reels de cuentas pequeñas; las cuentas grandes y las campañas usan 10.000 o más. Si dudas, empieza con poco.',
      },
      {
        id: 'es-ig-views-v2-2',
        question: '¿Puedo repartir un paquete entre varios Reels?',
        answer: 'No. Cada pedido cubre un Reel o vídeo. Para varios Reels, haz un pedido por cada uno.',
      },
      {
        id: 'es-ig-views-v2-3',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-ig-views-v2-4',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de Instagram',
    intro: 'Las visualizaciones de Instagram cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-instagram-likes',
        title: 'Comprar likes de Instagram',
        line: 'Para publicaciones, carruseles y Reels',
        image: '/assets/images/illustrations/instagram-likes/instagram-likes-hero.webp',
      },
      {
        slug: 'buy-instagram-followers',
        title: 'Comprar seguidores de Instagram',
        line: 'Haz crecer tu perfil',
        image: '/assets/images/illustrations/instagram-followers/instagram-followers-hero.webp',
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
