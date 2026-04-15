// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (
    pathname.startsWith('/assets') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }
  
  // Проверяем, есть ли локаль в пути
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const defaultLocale = routing.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  const locale = pathname.split('/')[1];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-intl-locale', locale);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};