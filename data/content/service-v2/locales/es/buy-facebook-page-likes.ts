import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-facebook-page-likes. Primary keyword: "comprar likes página facebook". Do not edit wording without the content owner. */
export const ES_BUY_FACEBOOK_PAGE_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-page-likes',
    platform: 'Facebook',
    name: 'Likes para Página de Facebook',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar likes página facebook',
      secondary: [
        'comprar likes facebook',
        'comprar me gusta página facebook',
        'precio likes página facebook',
        'likes para fanpage de facebook',
      ],
      questions: [
        'diferencia entre likes de página y seguidores',
        'mi página todavía muestra likes',
        'cuánto cuestan los likes de página',
        'es seguro comprar likes de facebook',
        'necesitan acceso de administrador',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'likes para Página de Facebook',
      tail: 'con un número que se note',
    },
    subtitle: 'Si tu Página aún muestra «Me gusta» bajo el nombre, es de lo primero que ven los visitantes. Súbelo desde {fromPrice}, solo con el enlace de tu Página.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de likes para Página de Facebook',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} likes para Página de Facebook',
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
      highlight: 'likes para Página de Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, sin acceso de administrador',
        body: 'Solo necesitamos el enlace público de tu Página. Sin contraseña, sin rol de administrador y sin acceso a tu cuenta.',
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
        icon: 'thumbs-up',
        tone: 'pink',
        title: 'Para Páginas con likes',
        body: 'Los likes de Página son para Páginas que aún muestran likes bajo el nombre. Las Páginas nuevas muestran seguidores, así que revisa la tuya antes.',
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
      highlight: 'likes para Página de Facebook',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Comprueba que tu Página muestra likes y pega su enlace público.',
    items: [
      {
        ui: 'public',
        title: 'Comprueba que tu Página muestra likes',
        body: 'Abre tu Página en una ventana privada. Si ves «Me gusta» bajo el nombre, encajan los likes de Página. ¿Solo seguidores? Elige seguidores de Facebook.',
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
        title: 'Pega el enlace de la Página',
        body: 'Copia el enlace público de tu Página, por ejemplo facebook.com/tupagina. Los likes de Página solo funcionan en Páginas, no en perfiles personales.',
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
      label: 'Página sin publicar',
      sub: 'Desactivada, para que la encuentren',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 2,
    input: {
      prefix: '',
      placeholder: 'facebook.com/tupagina',
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
      highlight: 'likes para Página de Facebook',
    },
    intro: 'Compres donde compres, revisa primero estos siete puntos.',
    us: 'NovaLikes',
    them: 'Vendedores poco fiables',
    rows: [
      {
        label: 'Datos de acceso',
        novalikes: 'Solo el enlace de la Página',
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
    title: 'Reposición y garantía de devolución para likes para Página de Facebook',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-order-process.webp',
        body: 'Si los likes de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén la misma URL de la Página y la Página pública mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-page-likes-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'likes para Página de Facebook?',
    },
    intro: 'Los likes de Página empiezan desde {fromPrice} por 100, y el precio por like baja en los paquetes grandes. Cada precio es un pago único en dólares estadounidenses por una Página.',
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
    id: 'why-buy-facebook-page-likes',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'likes para Página de Facebook?',
    },
    intro: 'Muchos negocios con años de trayectoria crearon su Página de Facebook hace tiempo y todavía muestra likes. Si el número es bajo, incluso un negocio conocido parece pequeño.',
    items: [
      {
        title: 'Una Página antigua que parece actual',
        body: 'Una Página con años pero 80 likes puede parecer olvidada. Los likes renuevan esa primera impresión.',
      },
      {
        title: 'Confianza al comparar',
        body: 'Quien compara dos negocios locales suele fijarse en qué Página parece más popular.',
      },
      {
        title: 'Una base mejor para anuncios',
        body: 'Las Páginas con anuncios en Facebook resultan más creíbles cuando los likes encajan con la inversión.',
      },
    ],
    diagram: [
      'Parece actual',
      'Gana la comparación',
      'Lista para anuncios',
    ],
  },
  help: {
    id: 'does-buying-facebook-page-likes-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'likes para Página de Facebook?',
    },
    intro: 'Los likes de Página cambian el número de una Página con diseño clásico. Esto es lo que hacen y lo que no.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Reacciones en publicaciones concretas',
        'Tu alcance orgánico por sí solo',
        'Páginas que solo muestran seguidores (elige seguidores)',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Los likes bajo el nombre de tu Página',
        'Lo popular que parece la Página a nuevos visitantes',
        'La primera impresión al compararte con otros negocios',
      ],
      image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-does-help.webp',
      altFallback: 'Ilustración: likes para Página de Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'likes para Página de Facebook',
    },
    cards: [
      {
        title: 'Negocios locales consolidados',
        body: 'Restaurantes, viveros y negocios familiares con Páginas antiguas añaden likes para que el número esté a la altura de su fama.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-best-practices.webp',
      },
      {
        title: 'Comercios y salones',
        body: 'Tiendas y salones suben sus likes antes de una temporada fuerte, como Navidad o las rebajas.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
      },
      {
        title: 'Agencias',
        body: 'Las agencias ponen a punto las Páginas de sus clientes antes de una campaña o un cambio de marca, a menudo con entrega gradual.',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea la Página, el pedido funciona igual: el enlace público de tu Página, un paquete adecuado y likes que suelen empezar en 6–8 horas. Sin acceso de administrador.',
  },
  vs: {
    id: 'facebook-page-likes-vs-other-services',
    title: {
      lead: 'Likes de Página frente a',
      highlight: 'seguidores y likes de publicación',
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
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Página',
        changes: 'Los likes de una Página con diseño clásico',
        needs: 'Un enlace a la Página',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de una Página o perfil',
        needs: 'Un enlace a la Página o perfil',
      },
      {
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publicación',
        changes: 'Reacciones en una publicación pública',
        needs: 'Un enlace a la publicación',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'likes para Página de Facebook?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Facebook no permiten el comportamiento no auténtico, y Meta elimina con regularidad cuentas falsas o inactivas. Por eso puede haber una pequeña bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público de tu Página, así que nadie inicia sesión ni necesita permisos de administrador. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
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
      highlight: 'likes para Página de Facebook',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'Tu Página muestra likes',
        body: 'Compruébalo en una ventana privada. Si solo muestra seguidores, los likes de Página no se verán; elige seguidores.',
      },
      {
        title: 'Es una Página, no un perfil',
        body: 'Los likes de Página solo funcionan en Páginas de Facebook. Los perfiles personales necesitan seguidores.',
      },
      {
        title: 'La Página está publicada',
        body: 'Una Página sin publicar o restringida impide empezar.',
      },
      {
        title: 'La URL no cambia',
        body: 'Mantén la misma dirección durante la entrega y los 6 meses de reposición.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre likes para Página de Facebook',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-fb-page-likes-v2-1',
        question: 'Mi Página solo muestra seguidores. ¿Qué pido?',
        answer: 'Seguidores de Facebook. Las Páginas nuevas muestran seguidores en lugar de likes, así que los likes de Página no se verían.',
      },
      {
        id: 'es-fb-page-likes-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-fb-page-likes-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Los likes para Página de Facebook cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Comprar seguidores de Facebook',
        line: 'Para Páginas y perfiles públicos',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-post-likes',
        title: 'Comprar likes para publicaciones de Facebook',
        line: 'Reacciones en una publicación pública',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
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
