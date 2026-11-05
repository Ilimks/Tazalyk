// Настройка рекламных баннеров.
// Чтобы заменить рекламу: положите картинку в public/assets/ads/ и поменяйте путь и ссылку.
// Чтобы отключить место: поставьте null.

export interface AdBanner {
    image: string;
    // текст для незрячих; без него — «Место для рекламы» на языке страницы (Ads.placeholder)
    alt?: string;
    // ссылка рекламодателя; без неё баннер не кликабельный
    href?: string;
    // отдельная картинка для телефонов (< 768px), только для горизонтального баннера
    mobileImage?: string;
}

// Боковые баннеры 160×600 — видны на экранах шире 1680px
export const sideAds: { left: AdBanner | null; right: AdBanner | null } = {
    left: {
        image: '/assets/ads/side-160x600.svg',
    },
    right: {
        image: '/assets/ads/side-160x600.svg',
    },
};

// Горизонтальный баннер над футером: 728×90 на планшетах и ноутбуках, 320×100 на телефонах.
// На широких экранах, где есть боковые баннеры, он скрывается.
export const inlineAd: AdBanner | null = {
    image: '/assets/ads/inline-728x90.svg',
    mobileImage: '/assets/ads/inline-320x100.svg',
};
