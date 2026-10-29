import type { ServiceV2Content } from '../../types';

/** Spanish (/es) — v2 service page copy for buy-facebook-post-likes. Primary keyword: "comprar likes publicación facebook". Do not edit wording without the content owner. */
export const ES_BUY_FACEBOOK_POST_LIKES_V2 = {
  meta: {
    slug: 'buy-facebook-post-likes',
    platform: 'Facebook',
    name: 'Likes para publicaciones de Facebook',
    unit: 'likes',
    unitSingular: 'like',
    inputKind: 'link',
    perUnit: 1000,
    tiers: false,
    keywords: {
      primary: 'comprar likes publicación facebook',
      secondary: [
        'comprar likes para post de facebook',
        'comprar reacciones facebook',
        'precio likes publicación facebook',
        'likes para publicación de facebook',
      ],
      questions: [
        'puedo elegir me encanta u otras reacciones',
        'la publicación debe ser pública',
        'cuánto cuestan los likes de publicación',
        'es seguro comprar likes de facebook',
        'puedo repartir los likes',
      ],
    },
  },
  hero: {
    title: {
      lead: 'Comprar',
      highlight: 'likes para publicaciones de Facebook',
      tail: 'que den peso a tu mejor publicación',
    },
    subtitle: 'Un evento, una oferta o una gran noticia merecen más que un par de reacciones. Dale a una publicación pública la respuesta que merece. Desde {fromPrice}, también con «Me encanta» y otras reacciones si lo pides.',
    trust: [
      'Sin contraseña',
      'Empieza en 6–8 horas',
      '6 meses de reposición',
    ],
  },
  picker: {
    id: 'pricing-packages',
    title: 'Paquetes y precios de likes para publicaciones de Facebook',
    intro: 'Elige un paquete. Precios en USD.',
    summaryName: '{quantity} likes para publicación de Facebook',
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
      highlight: 'likes para publicaciones de Facebook?',
    },
    items: [
      {
        icon: 'shield',
        tone: 'mint',
        title: 'Solo un enlace, sin acceso de administrador',
        body: 'Solo necesitamos el enlace público de la publicación. Sin contraseña, sin rol de administrador y sin acceso a tu cuenta.',
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
        title: '«Me encanta» y otras reacciones',
        body: 'Por defecto llegan «Me gusta». ¿Prefieres «Me encanta» u otra reacción? Escríbelo en la nota del pedido antes de que empiece.',
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
      highlight: 'likes para publicaciones de Facebook',
    },
    pill: 'Unos 2 minutos',
    intro: 'Pedir lleva cinco pasos cortos y unos dos minutos. Solo necesitamos el enlace a una publicación pública.',
    items: [
      {
        ui: 'public',
        title: 'Pon la publicación en Público',
        body: 'Busca el icono del globo junto a la fecha. Las publicaciones para amigos o una lista personalizada no pueden recibir pedidos.',
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
        title: 'Pega el enlace de la publicación',
        body: 'Abre la publicación, toca «Compartir» y «Copiar enlace», y pégalo en el pago. Indica la reacción en la nota si no es «Me gusta».',
      },
      {
        ui: 'pay',
        title: 'Paga de forma segura',
        body: 'Paga una sola vez con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. No hay suscripción.',
      },
    ],
    done: {
      title: '¡Listo!',
      count: 500,
      unit: 'likes',
      body: 'La mayoría de los pedidos empiezan en 6–8 horas tras el pago y terminan 4–6 horas después de empezar. Sigue el progreso en la página «Seguir pedido» con tu número de pedido.',
    },
  },
  ui: {
    toggle: {
      label: 'Solo amigos',
      sub: 'Desactivado, para que sea Pública',
    },
    chips: [
      '250',
      '500',
      '1K',
      '2.5K',
    ],
    chipOn: 1,
    input: {
      prefix: '',
      placeholder: 'facebook.com/…/posts/…',
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
      highlight: 'likes para publicaciones de Facebook',
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
    title: 'Reposición y garantía de devolución para likes para publicaciones de Facebook',
    intro: 'Ambas promesas están en nuestra política de reembolso, no solo en esta página.',
    cards: [
      {
        chip: '6 meses',
        title: '6 meses de reposición',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-order-process.webp',
        body: 'Si los likes de tu pedido bajan en los 6 meses posteriores a la fecha de entrega, escríbenos por WhatsApp o email con tu número de pedido y reponemos la diferencia sin coste. Mantén la publicación publicada y pública mientras se entrega una reposición.',
      },
      {
        chip: '30 días',
        title: 'Garantía de devolución de 30 días',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-package-cta.webp',
        body: 'Los pedidos elegibles se pueden reembolsar en los 30 días siguientes a la compra. La política de reembolso explica qué es elegible y cómo solicitarlo.',
      },
    ],
    link: {
      label: 'Leer la política de reembolso',
      href: '/refund-policy',
    },
  },
  cost: {
    id: 'facebook-post-likes-cost',
    title: {
      lead: '¿Cuánto cuestan los',
      highlight: 'likes para publicaciones de Facebook?',
    },
    intro: 'Los likes de publicación empiezan desde {fromPrice} por 100, y el precio por like baja a medida que crece el paquete. Cada precio es un pago único en dólares estadounidenses por una publicación.',
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
    id: 'why-buy-facebook-post-likes',
    title: {
      lead: '¿Por qué la gente compra',
      highlight: 'likes para publicaciones de Facebook?',
    },
    intro: 'En Facebook, las reacciones son la señal más rápida de que una publicación importa. Pocas reacciones en una noticia importante la hacen parecer ignorada, aunque en persona gustara mucho.',
    items: [
      {
        title: 'Eventos que parecen concurridos',
        body: 'Noches de trivial, jornadas de puertas abiertas y actos benéficos invitan más con muchas reacciones.',
      },
      {
        title: 'Ofertas que se notan',
        body: 'Las publicaciones de promoción con un buen número merecen una segunda mirada.',
      },
      {
        title: 'Grandes noticias que se celebran',
        body: 'Aperturas, aniversarios y premios merecen una respuesta a la altura.',
      },
    ],
    diagram: [
      'Concurrido',
      'Oferta visible',
      'Celebrado',
    ],
  },
  help: {
    id: 'does-buying-facebook-post-likes-help',
    title: {
      lead: '¿Sirve de algo comprar',
      highlight: 'likes para publicaciones de Facebook?',
    },
    intro: 'Los likes de publicación cambian las reacciones de una publicación pública. Esto es lo que hacen y lo que no.',
    no: {
      title: 'Lo que no cambia',
      items: [
        'Seguidores o likes de Página',
        'Comentarios o compartidos',
        'A cuánta gente muestra Facebook tus próximas publicaciones',
      ],
    },
    yes: {
      title: 'Lo que cambia',
      items: [
        'Las reacciones de la publicación elegida',
        'Lo popular que parece la publicación',
        'La primera impresión de eventos, ofertas y noticias',
      ],
      image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-does-help.webp',
      altFallback: 'Ilustración: likes para publicaciones de Facebook',
    },
  },
  who: {
    id: 'who-orders',
    title: {
      lead: 'Quién compra',
      highlight: 'likes para publicaciones de Facebook',
    },
    cards: [
      {
        title: 'Bares y locales',
        body: 'Bares, clubes y salas añaden reacciones a noches de trivial, música en directo y días de partido.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-best-practices.webp',
      },
      {
        title: 'Colegios, clubes y asociaciones',
        body: 'Clubes deportivos, AMPAs y asociaciones añaden reacciones a actos benéficos y anuncios.',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-hero.webp',
      },
      {
        title: 'Negocios locales',
        body: 'Tiendas y servicios añaden reacciones a ofertas e inauguraciones, a veces como «Me encanta» en vez de «Me gusta».',
        image: '/assets/images/illustrations/facebook-post-likes/facebook-post-likes-why-buy.webp',
      },
    ],
    statement: 'Sea cual sea la publicación, el pedido funciona igual: un enlace público, el paquete y la reacción que elijas, y likes que suelen empezar en 6–8 horas. Sin iniciar sesión.',
  },
  vs: {
    id: 'facebook-post-likes-vs-other-services',
    title: {
      lead: 'Likes de publicación frente a',
      highlight: 'seguidores y likes de Página',
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
        slug: 'buy-facebook-post-likes',
        label: 'Likes de publicación',
        changes: 'Reacciones en una publicación pública',
        needs: 'Un enlace a la publicación',
        current: true,
      },
      {
        slug: 'buy-facebook-followers',
        label: 'Seguidores',
        changes: 'Seguidores de una Página o perfil',
        needs: 'Un enlace a la Página o perfil',
      },
      {
        slug: 'buy-facebook-page-likes',
        label: 'Likes de Página',
        changes: 'Los likes de una Página con diseño clásico',
        needs: 'Un enlace a la Página',
      },
    ],
    currentLabel: 'Esta página',
  },
  safe: {
    id: 'is-it-safe',
    title: {
      lead: '¿Es seguro comprar',
      highlight: 'likes para publicaciones de Facebook?',
    },
    lead: 'Depende de tres cosas: tu cuenta, tu pago y tu privacidad. Así funciona cada una en NovaLikes, más el único riesgo que ningún vendedor puede eliminar.',
    body: 'Las Normas comunitarias de Facebook no permiten el comportamiento no auténtico, y Meta elimina con regularidad cuentas falsas o inactivas. Por eso puede haber una pequeña bajada tras la entrega, y por eso cada pedido incluye 6 meses de reposición. Las reacciones en proporción a la publicación se ven más naturales.',
    cards: [
      {
        ui: 'nopass',
        title: 'Seguridad de la cuenta',
        body: 'Solo necesitamos el enlace público de la publicación, así que nadie inicia sesión ni necesita permisos de administrador. Nunca pedimos una contraseña ni un código de acceso. Si alguien que dice ser NovaLikes te lo pide, no somos nosotros.',
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
      highlight: 'likes para publicaciones de Facebook',
    },
    lead: 'Revisa estos cuatro puntos una vez y tu pedido irá sin problemas.',
    items: [
      {
        title: 'La publicación es pública',
        body: 'Busca el icono del globo. Otros públicos impiden la entrega.',
      },
      {
        title: 'El enlace es de la publicación',
        body: 'Cópialo desde «Compartir» en la publicación, no el enlace de tu Página.',
      },
      {
        title: 'Has elegido la reacción',
        body: '«Me gusta» es la opción por defecto. Para «Me encanta» u otra, escríbelo en la nota antes de empezar.',
      },
      {
        title: 'La publicación sigue online',
        body: 'No la borres durante la entrega ni los 6 meses de reposición.',
      },
    ],
  },
  faq: {
    id: 'faq',
    kicker: '¿Dudas antes de pedir?',
    title: 'Preguntas frecuentes sobre likes para publicaciones de Facebook',
    intro: '¿No encuentras tu respuesta? Escríbenos por WhatsApp al +44 7454 758272, 24/7.',
    cta: 'Pregúntanos por WhatsApp',
    locale: {
      code: 'es',
    },
    extra: [
      {
        id: 'es-fb-post-likes-v2-1',
        question: '¿Puedo recibir «Me encanta» en vez de «Me gusta»?',
        answer: 'Sí. Escribe la reacción que quieres en la nota del pedido antes de que empiece o envíanosla por WhatsApp.',
      },
      {
        id: 'es-fb-post-likes-v2-2',
        question: '¿Puedo pedir un reembolso?',
        answer: 'Los pedidos elegibles están cubiertos por nuestra garantía de devolución de 30 días, contados desde la fecha de compra. La política de reembolso explica qué pedidos son elegibles y cómo enviar la solicitud.',
      },
      {
        id: 'es-fb-post-likes-v2-3',
        question: '¿Qué métodos de pago puedo usar?',
        answer: 'Puedes pagar con tarjeta, Apple Pay o Google Pay, en dólares estadounidenses. Es un pago único y nada se renueva.',
      },
    ],
  },
  more: {
    id: 'related-services',
    title: 'Más servicios de NovaLikes',
    intro: 'Los likes para publicaciones de Facebook cambian un número. Para hacer crecer otro, elige un servicio.',
    services: [
      {
        slug: 'buy-facebook-followers',
        title: 'Comprar seguidores de Facebook',
        line: 'Para Páginas y perfiles públicos',
        image: '/assets/images/illustrations/facebook-followers/facebook-followers-hero.webp',
      },
      {
        slug: 'buy-facebook-page-likes',
        title: 'Comprar likes para Página de Facebook',
        line: 'Para Páginas con número de likes',
        image: '/assets/images/illustrations/facebook-page-likes/facebook-page-likes-hero.webp',
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
