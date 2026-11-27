export interface AdBanner {
    image: string;
    alt?: string;
    href?: string;
    mobileImage?: string;
}

export const sideAds: { left: AdBanner | null; right: AdBanner | null } = {
    left: null,
    right: null,
};

export const inlineAd: AdBanner | null = null;
