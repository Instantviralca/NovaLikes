/** Final user-facing account copy (phase 1 prompt §9). */

export const ACCOUNT_NAV = {
  signIn: 'Sign in',
  dashboard: 'Dashboard',
  signOut: 'Sign out',
} as const;

export const ACCOUNT_COPY = {
  genericSent:
    "If that email can be used, we've sent a code. Check your inbox and spam folder.",
  invalidLogin:
    "That email and password don't match. Try again, or sign in with an email code.",
  invalidCode: "That code isn't right. Check it and try again.",
  expiredCode: 'That code has expired. Request a new one.',
  tooManyAttempts: 'Too many attempts. Please wait a few minutes and try again.',
  weakPassword: 'Use at least 10 characters.',
  unverified: "Please confirm your email first. We've sent you a code.",
  unavailable: 'Accounts are temporarily unavailable. Please try again later.',
  saved: 'Changes saved.',
  signedOutEverywhere: "You've been signed out on all other devices.",
} as const;

export const ACCOUNT_UI = {
  shared: {
    email: 'Email address',
    password: 'Password',
    showPassword: 'Show',
    hidePassword: 'Hide',
  },
  login: {
    h1: 'Sign in to NovaLikes',
    sub: 'Track your orders and reorder in a few clicks.',
    tabPassword: 'Password',
    tabEmailCode: 'Email code',
    signIn: 'Sign in',
    forgotPassword: 'Forgot password?',
    codeHelp: "We'll email you a 6-digit code. No password needed.",
    sendCode: 'Send code',
    footer: 'New to NovaLikes? Create an account',
  },
  signup: {
    h1: 'Create your NovaLikes account',
    sub: 'See every order in one place and check their status any time.',
    name: 'Your name',
    passwordHint: 'At least 10 characters.',
    marketing:
      'Send me occasional offers and updates. You can unsubscribe at any time.',
    submit: 'Create account',
    legal:
      'By creating an account you agree to our Terms and Conditions and Privacy Policy.',
    footer: 'Already have an account? Sign in',
  },
  codeStep: {
    h1: 'Check your email',
    text: (email: string) =>
      `We sent a 6-digit code to ${email}. It expires in 10 minutes.`,
    codeLabel: '6-digit code',
    continue: 'Continue',
    resend: 'Resend code',
    resendIn: (seconds: number) => `Resend in ${seconds}s`,
    differentEmail: 'Use a different email',
  },
  forgot: {
    h1: 'Reset your password',
    text: "Enter your email and we'll send you a code to set a new password.",
    sendCode: 'Send code',
    newPassword: 'New password',
    save: 'Save new password',
    success: 'Your password has been updated.',
  },
  sidebar: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    settings: 'Settings',
    signOut: 'Sign out',
  },
  home: {
    welcomeNamed: (firstName: string) => `Welcome back, ${firstName}`,
    welcome: 'Welcome back',
    totalOrders: 'Total orders',
    completed: 'Completed',
    inProgress: 'In progress',
    totalSpent: 'Total spent',
    recent: 'Recent orders',
    viewAll: 'View all orders',
    emptyH: 'No orders yet',
    emptyText:
      'When you place an order with this email, it will show up here.',
    browse: 'Browse services',
    buyTiktok: 'Buy TikTok followers',
    buyInstagram: 'Buy Instagram followers',
    trackOrder: 'Track an order',
    profilesTitle: 'Your profiles',
    tiktok: 'TikTok',
    instagram: 'Instagram',
    notAdded: 'Not added',
    edit: 'Edit',
    profilesNote:
      'Saved usernames are only used to fill in your next order faster.',
  },
  orders: {
    h1: 'Orders',
    colOrder: 'Order',
    colDate: 'Date',
    colService: 'Service',
    colTarget: 'Target',
    colTotal: 'Total',
    colPayment: 'Payment',
    colStatus: 'Status',
    previous: 'Previous',
    next: 'Next',
    empty: 'No orders yet.',
  },
  orderDetail: {
    back: 'All orders',
    status: 'Status',
    timeline: 'Timeline',
    items: 'Items',
    help: 'Need help with this order? Contact support',
    placedOn: (date: string) => `Placed on ${date}`,
    paymentPaid: 'Paid',
    paymentAwaiting: 'Awaiting payment',
    paymentFailed: 'Payment failed',
    paymentCancelled: 'Payment cancelled',
    paymentRefunded: 'Refunded',
  },
  settings: {
    h1: 'Settings',
    profile: 'Profile',
    name: 'Your name',
    whatsapp: 'WhatsApp number (optional)',
    tiktok: 'TikTok username',
    instagram: 'Instagram username',
    save: 'Save changes',
    password: 'Password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    updatePassword: 'Update password',
    codeOnlyText:
      "You sign in with email codes. Set a password if you'd also like to sign in with one.",
    setPassword: 'Set password',
    emailPrefs: 'Email preferences',
    offers: 'Offers and updates',
    emailNote: 'Order emails are always sent, whatever you choose here.',
    signOutOthers: 'Sign out of all other devices',
  },
  checkout: {
    signedInAs: (email: string) => `Signed in as ${email}`,
  },
  orderSuccess: {
    h: 'Keep track of this order',
    text: (email: string) =>
      `Create a free account with ${email} to see this order and any future orders in one place.`,
    button: 'Create account',
  },
} as const;

export const ACCOUNT_EMAIL_COPY = {
  signup: {
    subject: 'Your NovaLikes verification code',
    preheader: (code: string) => `Your code is ${code}`,
    intro:
      'Use this code to confirm your email and finish creating your NovaLikes account:',
    footer:
      "The code expires in 10 minutes. If you didn't create an account, you can ignore this email.",
  },
  login: {
    subject: 'Your NovaLikes sign-in code',
    preheader: (code: string) => `Your code is ${code}`,
    intro: 'Use this code to sign in to NovaLikes:',
    footer:
      "The code expires in 10 minutes. If you didn't try to sign in, you can ignore this email. Your account stays safe.",
  },
  reset: {
    subject: 'Reset your NovaLikes password',
    preheader: (code: string) => `Your code is ${code}`,
    intro: 'Use this code to set a new password for your NovaLikes account:',
    footer:
      "The code expires in 10 minutes. If you didn't ask to reset your password, you can ignore this email.",
  },
} as const;
