import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-instagram-comments. Primary keyword: "comprar comentarios instagram". Do not edit wording without the content owner. */
export const ES_BUY_INSTAGRAM_COMMENTS_V2 = {
  meta: {
    slug: 'buy-instagram-comments',
    platform: 'Instagram',
    name: 'Comentarios de Instagram',
    unit: 'comentarios',
    unitSingular: 'comentario',
    inputKind: 'link',
    perUnit: 1,
    tiers: true,
    keywords: {
      primary: 'comprar comentarios instagram',
      secondary: [
        'comprar comentarios personalizados instagram',
        'comprar comentarios en español instagram',
        'comentarios premium instagram',
        'precio comentarios instagram',
      ],
      questions: [
        'es seguro comprar comentarios de instagram',
        'cuánto cuestan los comentarios',
        'puedo escribir mis propios comentarios',
        'hay comentarios en español',
        'high quality o premium',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'comentarios de Instagram',
      tail: 'para iniciar la conversación',
    },
    subtitle: 'Una publicación con comentarios se siente activa e invita a otros a participar. Elige comentarios High Quality o Premium escritos según tu publicación, desde {fromPrice}. También puedes enviar tus propios textos, en español o en otro idioma.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de comentarios de Instagram',
    intro: 'Elige un nivel y un paquete. Precios en USD.',
    summaryName: '{quantity} comentarios {tier} de Instagram',
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
        note: 'Comentarios cortos y positivos que encajan en casi cualquier publicación.',
      },
      {
        label: 'Premium',
        note: 'Comentarios escritos según tu publicación, desde cuentas de aspecto más realista.',
      },
    ],
  },
  why: {
    id: 'why-choose-novalikes',
    title: {
      lead: '¿Por qué elegir NovaLikes para',
      highlight: 'comentarios de Instagram?',
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
        body: 'Si los comentarios de tu pedido bajan en los 6 meses posteriores a la entrega, envíanos tu número de pedido y los reponemos sin coste.',
      },
      {
        icon: 'badge-check',
        tone: 'peach',
        title: 'Garantía de devolución de 30 días',
        body: 'Los pedidos elegibles están cubiertos durante 30 días desde la fecha de compra. Nuestra política de reembolso explica qué incluye.',
      },
      {
        icon: 'pen',
        tone: 'pink',
        title: 'Tus textos o los nuestros',
        body: 'Envía tus propios comentarios en la nota del pedido, uno por línea, o deja que los escriba nuestro equipo. En español si lo pides.',
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
      highlight: 'comentarios de Instagram',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos. Elige High Quality o Premium, pega el enlace a una publicación pública y envía tus textos si quieres.',
    items: [
      {
        ui: 'public',
        title: 'Abre los comentarios a todos',
        body: 'La publicación debe estar en una cuenta pública con los comentarios abiertos a todo el mundo. Límites como «solo seguidores» impiden empezar.',
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
        title: 'Pega el enlace y tus textos',
        body: 'Pega el enlace a la publicación o Reel en el pago. Escribe tus comentarios en la nota, uno por línea, o déjalo en nuestras manos.',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 25,
      unit: 'comentarios',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Comentarios limitados',
      sub: 'Desactivado, para poder comentar',
    },
    chips: [
      '10',
      '25',
      '50',
      '100',
    ],
    chipOn: 1,
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
      highlight: 'comentarios de Instagram',
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
    title: 'Reposición y garantía de devolución para comentarios de Instagram',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-order-process.webp',
        body: 'Si los comentarios de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén la publicación o el Reel publicada y pública mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'instagram-comments-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'comentarios de Instagram?',
    },
    intro: 'Los paquetes empiezan desde {fromPrice}. Los comentarios High Quality cuestan menos por unidad y los Premium más, porque cada uno se escribe según tu publicación. Cada precio es un pago único en dólares estadounidenses por una publicación o Reel.',
    points: [
      'Los 6 meses de reposición están incluidos. No hay que añadir nada.',
      'Precios en dólares estadounidenses. Tu banco lo convierte a tu moneda y algunas tarjetas cobran una comisión por ello.',
      'Sin suscripción ni renovación. Pagas una vez por pedido.',
    ],
    cols: [
      'Paquete',
      'Precio',
      'Por unidad',
    ],
    best: 'Mejor precio',
    note: 'Los precios salen de nuestros paquetes actuales. El precio que ves en el pago es el que pagas.',
  },
  whyBuy: {
    id: 'why-buy-instagram-comments',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'comentarios de Instagram?',
    },
    intro: 'Una sección de comentarios vacía hace que incluso una buena publicación parezca apagada. Unos cuantos comentarios relevantes muestran que se está hablando de ella y animan a la siguiente persona a unirse.',
    items: [
      {
        title: 'Publicaciones que se ven activas',
        body: 'Los comentarios son la señal más clara de que a la gente le importa una publicación.',
      },
      {
        title: 'Una primera respuesta más fácil',
        body: 'A nadie le gusta comentar el primero. Cuando la conversación ya empezó, los visitantes reales se suman más.',
      },
      {
        title: 'Tu mensaje a la vista',
        body: 'Con tus propios textos, los comentarios destacan un detalle del producto, una pregunta o una reacción.',
      },
    ],
    diagram: [
      'Publicación activa',
      'Primera respuesta',
      'Tu mensaje',
    ],
  },
  help: {
    id: 'does-buying-instagram-comments-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'comentarios de Instagram?',
    },
    intro: 'Los comentarios cambian lo que aparece bajo una publicación. Por sí solos no traen seguidores ni alcance.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Tus seguidores, likes o visualizaciones',
        'La posición en Explorar o Reels por sí sola',
        'Respuestas reales que mantengan la conversación',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'La sección de comentarios de la publicación elegida',
        'Lo activa que parece la publicación a nuevos visitantes',
        'Qué puntos destacan, si envías tus propios textos',
      ],
      image: '/assets/images/illustrations/instagram-comments/instagram-comments-does-help.webp',
      altFallback: 'Ilustración: comentarios de Instagram',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'comentarios de Instagram',
    },
    cards: [
      {
        title: 'Creadores',
        body: 'Los creadores añaden comentarios a Reels y carruseles que merecen más conversación, a menudo con sus propios textos.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-best-practices.webp',
      },
      {
        title: 'Pequeños negocios',
        body: 'Los negocios los usan en publicaciones de producto y ofertas, para que preguntas y reacciones aparezcan donde miran los clientes.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-hero.webp',
      },
      {
        title: 'Marcas y agencias',
        body: 'Marcas y agencias eligen comentarios Premium para campañas, donde cada comentario debe sonar natural.',
        image: '/assets/images/illustrations/instagram-comments/instagram-comments-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea la publicación, el pedido funciona igual: un enlace público, el nivel que elijas, tus textos si quieres, y comentarios que suelen empezar en 6–8 horas. Nadie necesita tus datos de acceso.',
  },
  vs: {
    id: 'instagram-comments-vs-other-services',
    title: {
      lead: 'Comentarios de Instagram frente a',
      highlight: 'likes, visualizaciones y seguidores',
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
        slug: 'buy-instagram-comments',
        label: 'Comentarios',
        changes: 'Comentarios en una publicación pública',
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
        slug: 'buy-instagram-likes',
        label: 'Likes',
        changes: 'Los likes de una publicación o Reel',
        needs: 'Un enlace a la publicación',
      },
      {
        slug: 'buy-instagram-views',
        label: 'Visualizaciones',
        changes: 'Las visualizaciones de un Reel o vídeo',
        needs: 'Un enlace al Reel',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'comentarios de Instagram?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Instagram piden no aumentar las interacciones de forma artificial, y sus filtros pueden ocultar comentarios o eliminar cuentas que considera falsas. Por eso algunos comentarios pueden desaparecer tras la entrega, y por eso cada pedido incluye 6 meses de reposición. Los comentarios Premium o tus propios textos, en una cantidad acorde, se ven más naturales.',
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
      highlight: 'comentarios de Instagram',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'Los comentarios están abiertos',
        body: 'Comprueba que están activados y no limitados a seguidores o a cuentas que sigues.',
      },
      {
        title: 'El enlace es de la publicación',
        body: 'Copia el enlace de la propia publicación o Reel, no el de tu perfil.',
      },
      {
        title: 'Tus textos están listos',
        body: '¿Quieres tus propios comentarios o en español? Añádelo en la nota antes de que empiece el pedido.',
      },
      {
        title: 'La publicación sigue online',
        body: 'No la borres ni la archives durante la entrega ni los 6 meses de reposición.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre comentarios de Instagram',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-ig-comments-v2-1',
        question: '¿Puedo recibir comentarios en español?',
        answer: 'Sí. Escribe «español» en la nota del pedido o envía tus propios comentarios en español, uno por línea, y los publicaremos tal cual.',
      },
      {
        id: 'es-ig-comments-v2-2',
        question: '¿Cuántos comentarios de Instagram debería comprar?',
        answer: 'Ajusta el número a la publicación. De 10 a 25 comentarios encajan en la mayoría de publicaciones de cuentas pequeñas. Una publicación con pocos likes y decenas de comentarios puede verse rara.',
      },
      {
        id: 'es-ig-comments-v2-3',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-ig-comments-v2-4',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de Instagram',
    intro: 'Los comentarios de Instagram cambian un número. Para hacer crecer otro, elige un servicio.',
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
