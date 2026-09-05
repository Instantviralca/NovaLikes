/**
 * Drizzle schema — PostgreSQL (Neon/Supabase compatible via DATABASE_URL).
 */

import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    guestEmail: text('guest_email').notNull(),
    status: text('status').notNull(),
    fulfillmentMode: text('fulfillment_mode').notNull().default('manual'),
    currency: text('currency').notNull(),
    subtotalAmount: integer('subtotal_amount').notNull(),
    discountAmount: integer('discount_amount').notNull().default(0),
    totalAmount: integer('total_amount').notNull(),
    couponCode: text('coupon_code'),
    customerNotes: text('customer_notes'),
    idempotencyKey: text('idempotency_key'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    emailIdx: index('orders_guest_email_idx').on(t.guestEmail),
    idempotencyIdx: uniqueIndex('orders_idempotency_key_uidx').on(t.idempotencyKey),
  }),
);

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  platformId: text('platform_id').notNull(),
  serviceId: text('service_id').notNull(),
  serviceSlug: text('service_slug').notNull(),
  serviceName: text('service_name').notNull(),
  packageId: text('package_id').notNull(),
  packageTitle: text('package_title').notNull(),
  quantity: integer('quantity').notNull(),
  quantityLabel: text('quantity_label').notNull(),
  unitPrice: integer('unit_price').notNull(),
  currency: text('currency').notNull(),
  configuration: jsonb('configuration').notNull().$type<Record<string, string | number | boolean>>(),
  deliveryTime: text('delivery_time'),
  publicDestination: text('public_destination'),
});

export const orderPayments = pgTable(
  'order_payments',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(),
    paymentId: text('payment_id').notNull(),
    status: text('status').notNull(),
    amount: integer('amount').notNull(),
    currency: text('currency').notNull(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    providerReference: text('provider_reference'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    paymentIdIdx: uniqueIndex('order_payments_payment_id_uidx').on(t.paymentId),
  }),
);

export const orderTimelineEvents = pgTable('order_timeline_events', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  previousStatus: text('previous_status'),
  newStatus: text('new_status'),
  message: text('message').notNull(),
  publicMessage: text('public_message'),
  internalNote: text('internal_note'),
  actorType: text('actor_type').notNull(),
  actorId: text('actor_id').notNull(),
  at: timestamp('at', { withTimezone: true }).notNull(),
  meta: jsonb('meta').$type<Record<string, string | number | boolean>>(),
});

export const orderInternalNotes = pgTable('order_internal_notes', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  createdByType: text('created_by_type').notNull(),
  createdById: text('created_by_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: text('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  orderId: text('order_id'),
  message: text('message').notNull(),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const notificationRecords = pgTable(
  'notification_records',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id'),
    channel: text('channel').notNull(),
    templateId: text('template_id').notNull(),
    trigger: text('trigger').notNull(),
    recipient: text('recipient').notNull(),
    status: text('status').notNull(),
    subject: text('subject').notNull(),
    bodyPreview: text('body_preview'),
    errorMessage: text('error_message'),
    providerId: text('provider_id'),
    providerMessageId: text('provider_message_id'),
    idempotencyKey: text('idempotency_key'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true }),
  },
  (t) => ({
    idempotencyIdx: uniqueIndex('notification_idempotency_uidx').on(t.idempotencyKey),
  }),
);

export const webhookEvents = pgTable(
  'webhook_events',
  {
    id: text('id').primaryKey(),
    provider: text('provider').notNull(),
    eventId: text('event_id').notNull(),
    eventType: text('event_type').notNull(),
    paymentId: text('payment_id'),
    processedAt: timestamp('processed_at', { withTimezone: true }).notNull(),
    rawSummary: text('raw_summary'),
  },
  (t) => ({
    providerEventIdx: uniqueIndex('webhook_provider_event_uidx').on(t.provider, t.eventId),
  }),
);

export const adminAuditEvents = pgTable('admin_audit_events', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull(),
  action: text('action').notNull(),
  targetType: text('target_type'),
  targetId: text('target_id'),
  reason: text('reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  meta: jsonb('meta').$type<Record<string, string | number | boolean>>(),
});

export const adminSessions = pgTable('admin_sessions', {
  id: text('id').primaryKey(),
  tokenHash: text('token_hash').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const adminLoginAttempts = pgTable('admin_login_attempts', {
  id: text('id').primaryKey(),
  ipHash: text('ip_hash').notNull(),
  success: boolean('success').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const couponRedemptions = pgTable('coupon_redemptions', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  discountAmount: integer('discount_amount').notNull(),
  currency: text('currency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

/** Admin-editable site settings (e.g. remote payment website URL). */
export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
});

/** First-party funnel analytics events (admin Analytics page). */
export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: text('id').primaryKey(),
    eventName: text('event_name').notNull(),
    sessionId: text('session_id').notNull(),
    pagePath: text('page_path').notNull(),
    country: text('country').notNull().default('XX'),
    metadata: jsonb('metadata').$type<Record<string, string | number | boolean | null>>(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    visitorId: text('visitor_id'),
    eventCategory: text('event_category'),
    pageType: text('page_type'),
    serviceSlug: text('service_slug'),
    packageId: text('package_id'),
    market: text('market'),
    locale: text('locale'),
    referrer: text('referrer'),
    source: text('source'),
    medium: text('medium'),
    campaign: text('campaign'),
    content: text('content'),
    term: text('term'),
    deviceType: text('device_type'),
    browserFamily: text('browser_family'),
    osFamily: text('os_family'),
    properties: jsonb('properties').$type<Record<string, string | number | boolean | null>>(),
    occurredAt: timestamp('occurred_at', { withTimezone: true }),
    /** Nullable milestone key — UNIQUE when present (see drizzle/0009). */
    idempotencyKey: text('idempotency_key'),
  },
  (t) => ({
    eventCreatedIdx: index('analytics_events_event_created_idx').on(t.eventName, t.createdAt),
    sessionCreatedIdx: index('analytics_events_session_created_idx').on(t.sessionId, t.createdAt),
    countryCreatedIdx: index('analytics_events_country_created_idx').on(t.country, t.createdAt),
    occurredIdx: index('analytics_events_occurred_idx').on(t.occurredAt),
    visitorOccurredIdx: index('analytics_events_visitor_occurred_idx').on(t.visitorId, t.occurredAt),
    serviceOccurredIdx: index('analytics_events_service_occurred_idx').on(t.serviceSlug, t.occurredAt),
    marketOccurredIdx: index('analytics_events_market_occurred_idx').on(t.market, t.occurredAt),
    idempotencyUidx: uniqueIndex('analytics_events_idempotency_uidx').on(t.idempotencyKey),
  }),
);

export const analyticsVisitors = pgTable('analytics_visitors', {
  id: text('id').primaryKey(),
  firstSeenAt: timestamp('first_seen_at', { withTimezone: true }).notNull(),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull(),
});

export const analyticsSessions = pgTable(
  'analytics_sessions',
  {
    id: text('id').primaryKey(),
    visitorId: text('visitor_id').notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull(),
    lastActivityAt: timestamp('last_activity_at', { withTimezone: true }).notNull(),
    landingPath: text('landing_path'),
    landingPageType: text('landing_page_type'),
    referrer: text('referrer'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    utmContent: text('utm_content'),
    utmTerm: text('utm_term'),
    market: text('market'),
    locale: text('locale'),
    deviceType: text('device_type'),
    browserFamily: text('browser_family'),
    osFamily: text('os_family'),
    countryCode: text('country_code').notNull().default('XX'),
    isBot: boolean('is_bot').notNull().default(false),
    sourceChannel: text('source_channel'),
  },
  (t) => ({
    visitorIdx: index('analytics_sessions_visitor_idx').on(t.visitorId, t.startedAt),
    startedIdx: index('analytics_sessions_started_idx').on(t.startedAt),
    marketIdx: index('analytics_sessions_market_idx').on(t.market, t.startedAt),
  }),
);

/** Marketing email subscribers (checkout opt-in only). */
export const emailSubscribers = pgTable(
  'email_subscribers',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull(),
    source: text('source').notNull().default('checkout'),
    marketingOptIn: boolean('marketing_opt_in').notNull().default(false),
    optedInAt: timestamp('opted_in_at', { withTimezone: true }),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
    unsubscribeToken: text('unsubscribe_token').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    emailUidx: uniqueIndex('email_subscribers_email_uidx').on(t.email),
    tokenUidx: uniqueIndex('email_subscribers_token_uidx').on(t.unsubscribeToken),
    optInIdx: index('email_subscribers_opt_in_idx').on(t.marketingOptIn),
  }),
);

/** Admin marketing campaign send log. */
export const emailCampaigns = pgTable('email_campaigns', {
  id: text('id').primaryKey(),
  subject: text('subject').notNull(),
  bodyPreview: text('body_preview').notNull(),
  couponCode: text('coupon_code'),
  sentCount: integer('sent_count').notNull().default(0),
  failedCount: integer('failed_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  createdBy: text('created_by').notNull().default('admin'),
});

/** CMS dashboard users — authors and optional database admins. */
export const cmsUsers = pgTable(
  'cms_users',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    profileImage: text('profile_image'),
    bio: text('bio'),
    role: text('role').notNull().default('author'),
    status: text('status').notNull().default('active'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  },
  (t) => ({
    emailUidx: uniqueIndex('cms_users_email_uidx').on(t.email),
    roleIdx: index('cms_users_role_idx').on(t.role),
    statusIdx: index('cms_users_status_idx').on(t.status),
  }),
);

export const cmsAuthorSessions = pgTable('cms_author_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => cmsUsers.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const cmsLoginAttempts = pgTable('cms_login_attempts', {
  id: text('id').primaryKey(),
  ipHash: text('ip_hash').notNull(),
  success: boolean('success').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const cmsArticles = pgTable(
  'cms_articles',
  {
    id: text('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull().default(''),
    contentHtml: text('content_html').notNull().default(''),
    contentJson: jsonb('content_json').$type<Record<string, unknown>>(),
    blocks: jsonb('blocks').$type<unknown[]>().notNull().default([]),
    featuredImageUrl: text('featured_image_url'),
    featuredImageAlt: text('featured_image_alt'),
    featuredImageWidth: integer('featured_image_width'),
    featuredImageHeight: integer('featured_image_height'),
    category: text('category').notNull().default('guides'),
    tags: jsonb('tags').$type<string[]>().notNull().default([]),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    canonicalPath: text('canonical_path'),
    authorId: text('author_id'),
    createdBy: text('created_by').notNull(),
    updatedBy: text('updated_by').notNull(),
    status: text('status').notNull().default('draft'),
    intendedPublishOn: text('intended_publish_on'),
    publishAt: timestamp('publish_at', { withTimezone: true }),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    faqs: jsonb('faqs').$type<unknown[]>().notNull().default([]),
    keyTakeaways: jsonb('key_takeaways').$type<string[]>().notNull().default([]),
    relatedServices: jsonb('related_services').$type<string[]>().notNull().default([]),
    relatedArticles: jsonb('related_articles').$type<string[]>().notNull().default([]),
  },
  (t) => ({
    slugUidx: uniqueIndex('cms_articles_slug_uidx').on(t.slug),
    statusIdx: index('cms_articles_status_idx').on(t.status),
    publishAtIdx: index('cms_articles_publish_at_idx').on(t.publishAt),
    authorIdx: index('cms_articles_author_idx').on(t.authorId),
  }),
);

export const cmsMedia = pgTable(
  'cms_media',
  {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
    storageKey: text('storage_key').notNull(),
    filename: text('filename').notNull(),
    mime: text('mime').notNull(),
    size: integer('size').notNull(),
    alt: text('alt').notNull().default(''),
    width: integer('width'),
    height: integer('height'),
    uploadedBy: text('uploaded_by').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    createdIdx: index('cms_media_created_idx').on(t.createdAt),
    keyUidx: uniqueIndex('cms_media_storage_key_uidx').on(t.storageKey),
  }),
);

export const cmsArticleRedirects = pgTable(
  'cms_article_redirects',
  {
    id: text('id').primaryKey(),
    fromSlug: text('from_slug').notNull(),
    toSlug: text('to_slug').notNull(),
    articleId: text('article_id')
      .notNull()
      .references(() => cmsArticles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    fromUidx: uniqueIndex('cms_article_redirects_from_uidx').on(t.fromSlug),
  }),
);

export const cmsAuditEvents = pgTable(
  'cms_audit_events',
  {
    id: text('id').primaryKey(),
    actorId: text('actor_id').notNull(),
    action: text('action').notNull(),
    articleId: text('article_id'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    meta: jsonb('meta').$type<Record<string, string | number | boolean | null>>(),
  },
  (t) => ({
    actorIdx: index('cms_audit_events_actor_idx').on(t.actorId, t.createdAt),
    articleIdx: index('cms_audit_events_article_idx').on(t.articleId),
  }),
);

/** Native cart abandonment recovery sessions. */
export const cartRecoverySessions = pgTable(
  'cart_recovery_sessions',
  {
    id: text('id').primaryKey(),
    publicId: text('public_id').notNull(),
    email: text('email').notNull(),
    customerName: text('customer_name'),
    whatsappNumber: text('whatsapp_number'),
    currency: text('currency').notNull(),
    subtotalAmount: integer('subtotal_amount').notNull(),
    discountAmount: integer('discount_amount').notNull().default(0),
    totalAmount: integer('total_amount').notNull(),
    market: text('market'),
    locale: text('locale'),
    status: text('status').notNull().default('active'),
    cartSnapshot: jsonb('cart_snapshot').notNull().$type<Record<string, unknown>>(),
    checkoutSnapshot: jsonb('checkout_snapshot').$type<Record<string, unknown>>(),
    recoveryTokenHash: text('recovery_token_hash').notNull(),
    unsubscribeTokenHash: text('unsubscribe_token_hash').notNull(),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
    lastActivityAt: timestamp('last_activity_at', { withTimezone: true }).notNull(),
    abandonedAt: timestamp('abandoned_at', { withTimezone: true }),
    recoveredAt: timestamp('recovered_at', { withTimezone: true }),
    convertedAt: timestamp('converted_at', { withTimezone: true }),
    orderId: text('order_id'),
    landingPath: text('landing_path'),
    referrer: text('referrer'),
    checkoutPath: text('checkout_path'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    publicUidx: uniqueIndex('cart_recovery_sessions_public_uidx').on(t.publicId),
    tokenUidx: uniqueIndex('cart_recovery_sessions_token_uidx').on(t.recoveryTokenHash),
    unsubUidx: uniqueIndex('cart_recovery_sessions_unsub_uidx').on(t.unsubscribeTokenHash),
    emailStatusIdx: index('cart_recovery_sessions_email_status_idx').on(t.email, t.status),
    statusActivityIdx: index('cart_recovery_sessions_status_activity_idx').on(
      t.status,
      t.lastActivityAt,
    ),
    orderIdx: index('cart_recovery_sessions_order_idx').on(t.orderId),
  }),
);

/** Recovery email steps + interaction events for a session. */
export const cartRecoveryEvents = pgTable(
  'cart_recovery_events',
  {
    id: text('id').primaryKey(),
    sessionId: text('session_id')
      .notNull()
      .references(() => cartRecoverySessions.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    emailStep: integer('email_step'),
    idempotencyKey: text('idempotency_key'),
    providerMessageId: text('provider_message_id'),
    errorMessage: text('error_message'),
    meta: jsonb('meta').$type<Record<string, string | number | boolean | null>>(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  },
  (t) => ({
    sessionIdx: index('cart_recovery_events_session_idx').on(t.sessionId, t.createdAt),
    idempotencyUidx: uniqueIndex('cart_recovery_events_idempotency_uidx').on(t.idempotencyKey),
  }),
);

