import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const isDev = process.env.NODE_ENV === 'development';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const NEWS_PATH = /^\/(?:ru|ky)\/news\/([^/]+)\/?$/;
const NEWS_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NEWS_CHECK_TIMEOUT_MS = 3000;
const MISSING_PATH = '/_missing';

const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || '').origin;
  } catch {
    return '';
  }
})();

const buildCsp = (nonce: string) =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${API_ORIGIN} https://mptazalyk.kg https://www.gstatic.com https://tile.openstreetmap.org`,
    `media-src 'self' data: blob: ${API_ORIGIN}`,
    "font-src 'self'",
    `connect-src 'self' ${API_ORIGIN} https://www.google.com/recaptcha/${isDev ? ' ws: wss:' : ''}`,
    'frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/',
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join('; ');

async function newsIsMissing(pathname: string) {
  const id = NEWS_PATH.exec(pathname)?.[1];
  if (!id) return false;
  if (!NEWS_ID.test(id)) return true;
  try {
    const response = await fetch(`${API_URL}/news/${id}/`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(NEWS_CHECK_TIMEOUT_MS),
    });
    return response.status === 404;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const defaultLocale = routing.defaultLocale;
    const rest = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${rest}${search}`, request.url)
    );
  }

  const locale = pathname.split('/')[1];
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-intl-locale', locale);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = (await newsIsMissing(pathname))
    ? NextResponse.rewrite(new URL(`/${locale}${MISSING_PATH}`, request.url), { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|assets/|[^/]+\\.[^/]+$).*)'],
};
