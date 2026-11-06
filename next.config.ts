import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// файлы новостей и галереи: локально это http://localhost:8000, на сервере https://api.mptazalyk.kg
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || 'https://api.mptazalyk.kg/api');

// Заголовки безопасности для всех ответов (CSP с nonce выставляет middleware)
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // браузер запомнит, что сайт открывается только по https (на http заголовок игнорируется)
  ...(process.env.NODE_ENV === 'production'
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]
    : []),
];

const nextConfig: NextConfig = {
  output: 'standalone',
  // не сообщаем, на чём сделан сайт
  poweredByHeader: false,
  images: {
    // оптимизатор забирает картинки только из папки файлов API
    remotePatterns: [
      {
        protocol: apiUrl.protocol === 'http:' ? 'http' : 'https',
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: '/media/**',
      },
      { protocol: 'https', hostname: 'mptazalyk.kg' },
    ],
    // одно качество: иначе перебором значений можно заставить сервер пересжимать картинку снова и снова
    qualities: [75],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
