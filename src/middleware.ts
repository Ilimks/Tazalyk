import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const isDev = process.env.NODE_ENV === 'development';

// адрес API: с него приходят картинки, видео и данные (локально http://localhost:8000, на сервере https://api.mptazalyk.kg)
const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || '').origin;
  } catch {
    return '';
  }
})();

// Политика безопасности контента: скрипты — только свои (с одноразовым nonce) и капча Google,
// рамки — капча и карты Яндекса, встраивать сайт в чужие страницы нельзя.
// Next.js сам ставит nonce своим скриптам, если видит его в заголовке запроса.
const buildCsp = (nonce: string) =>
  [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/${isDev ? " 'unsafe-eval'" : ''}`,
    // style="" у элементов React и стили виджета капчи
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob: ${API_ORIGIN} https://mptazalyk.kg https://www.gstatic.com`,
    `media-src 'self' data: blob: ${API_ORIGIN}`,
    "font-src 'self' data:",
    `connect-src 'self' ${API_ORIGIN} https://www.google.com/recaptcha/${isDev ? ' ws: wss:' : ''}`,
    'frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/ https://yandex.ru https://*.yandex.ru',
    // встроенный просмотр PDF-документов (data:/blob:)
    "object-src 'self' data: blob:",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join('; ');

export function middleware(request: NextRequest) {
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
  // нужен layout для canonical и hreflang
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  // пропускаем api, служебные пути Next.js и любые файлы с расширением
  // (sitemap.xml, robots.txt, ads.txt, google*.html, картинки из public)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
