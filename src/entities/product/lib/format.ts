import { getSafeHttpUrl } from '@/shared/lib/utils/url';

const GROUP_SEPARATOR = ' ';

export const parsePrice = (value: string | number | null | undefined): number => {
    const number = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''));
    return Number.isFinite(number) ? number : 0;
};

export const formatMoney = (value: string | number | null | undefined): string => {
    const amount = Math.round(parsePrice(value) * 100) / 100;
    const sign = amount < 0 ? '-' : '';
    const [integer, fraction] = Math.abs(amount).toFixed(2).split('.');
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR);
    return fraction === '00' ? `${sign}${grouped}` : `${sign}${grouped},${fraction}`;
};

export const getProductImageUrl = (item: { image?: string | null }): string | null =>
    getSafeHttpUrl(item.image);
