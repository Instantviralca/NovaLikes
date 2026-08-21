import { NextResponse, type NextRequest } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionTokenEdge,
} from '@/lib/admin/auth-edge';
import {
  AUTHOR_SESSION_COOKIE,
  canAccessAuthorDashboard,
} from '@/lib/cms/auth-edge';
import { shouldBlockRequest } from '@/lib/geo/blocked-countries';
import {
  I18N_HEADER,
  I18N_PATH_HEADER,
  isCoreLocalizedPath,
  isLocalizedLocale,
} from '@/lib/i18n/config';
import {
  isCommercePath,
  LOCALE_COOKIE,
  parseLocaleCookie,
} from '@/lib/i18n/locale-cookie';
import {
  isBlockedLocaleAlias,
  isInternalI18nPath,
  localeCaseRedirectTarget,
  localePrefixedLearnRedirectTarget,
  localizeHref,
  localizedInternalPath,
  parseLocalePath,
  publicPathsEqual,
} from '@/lib/i18n/paths';
import { getLowercasePublicRedirect } from '@/lib/seo/lowercase-public-path';

function contentLanguage(locale: string): string {
  return locale === 'pt-br' ? 'pt-BR' : locale;
}

/**
 * Middleware:
 * - Geo block for unsupported countries (public storefront)
 * - Admin session gate
 * - Localized permalink rewrites
 * - Persist visitor locale for same-origin cart/checkout UI
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const lowercasePath = getLowercasePublicRedirect(pathname);
  if (lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, 308);
  }

  const localeCaseTarget = localeCaseRedirectTarget(pathname);
  if (localeCaseTarget) {
    const url = request.nextUrl.clone();
    url.pathname = localeCaseTarget;
    return NextResponse.redirect(url, 308);
  }

  if (isInternalI18nPath(pathname) || isBlockedLocaleAlias(pathname)) {
    return new NextResponse('Not Found', { status: 404, headers: { 'x-robots-tag': 'noindex' } });
  }

  const parsedLocale = parseLocalePath(pathname);
  if (isLocalizedLocale(parsedLocale.locale)) {
    const learnRedirect = localePrefixedLearnRedirectTarget(pathname);
    if (learnRedirect) {
      const url = request.nextUrl.clone();
      url.pathname = learnRedirect;
      return NextResponse.redirect(url, 308);
    }

    if (!isCoreLocalizedPath(parsedLocale.pathname)) {
      return new NextResponse('Not Found', { status: 404, headers: { 'x-robots-tag': 'noindex' } });
    }

    const canonicalPath = localizeHref(parsedLocale.pathname, parsedLocale.locale);
    if (!publicPathsEqual(pathname, canonicalPath)) {
      const url = request.nextUrl.clone();
      url.pathname = canonicalPath;
      return NextResponse.redirect(url, 308);
    }

    if (shouldBlockRequest({ pathname, headers: request.headers })) {
      const url = request.nextUrl.clone();
      url.pathname = '/unavailable';
      url.search = '';
      const response = NextResponse.rewrite(url);
      response.headers.set('x-robots-tag', 'noindex, nofollow');
      response.headers.set('cache-control', 'private, no-store');
      return response;
    }

    const url = request.nextUrl.clone();
    url.pathname = localizedInternalPath(parsedLocale.locale, parsedLocale.pathname);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(I18N_HEADER, parsedLocale.locale);
    requestHeaders.set(I18N_PATH_HEADER, pathname);
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.headers.set(I18N_HEADER, parsedLocale.locale);
    response.headers.set('content-language', contentLanguage(parsedLocale.locale));
    return response;
  }

  if (shouldBlockRequest({ pathname, headers: request.headers })) {
    const url = request.nextUrl.clone();
    url.pathname = '/unavailable';
    url.search = '';
    const response = NextResponse.rewrite(url);
    response.headers.set('x-robots-tag', 'noindex, nofollow');
    response.headers.set('cache-control', 'private, no-store');
    return response;
  }

  if (isCommercePath(pathname)) {
    const cookieLocale = parseLocaleCookie(request.cookies.get(LOCALE_COOKIE)?.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(I18N_PATH_HEADER, pathname);
    if (cookieLocale) {
      requestHeaders.set(I18N_HEADER, cookieLocale);
    }
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    if (cookieLocale) {
      response.headers.set(I18N_HEADER, cookieLocale);
      response.headers.set('content-language', contentLanguage(cookieLocale));
    }
    return response;
  }

  if (pathname.startsWith('/author')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nl-pathname', pathname);

    if (pathname === '/author/login' || pathname.startsWith('/author/login/')) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const authorOk = await canAccessAuthorDashboard({
      authorToken: request.cookies.get(AUTHOR_SESSION_COOKIE)?.value,
      adminToken: request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
    });
    if (authorOk) return NextResponse.next({ request: { headers: requestHeaders } });

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/author/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifyAdminSessionTokenEdge(token);
  if (valid) return NextResponse.next();

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
