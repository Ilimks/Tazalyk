import { getSafeHttpUrl } from '@/shared/lib/utils/url';

// неразрывный пробел: «3 500» не переносится на две строки
const GROUP_SEPARATOR = ' ';

// Цена из API ("3500.00") или число → число; мусор → 0
export const parsePrice = (value: string | number | null | undefined): number => {
    const number = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''));
    return Number.isFinite(number) ? number : 0;
};

// «3 500», «32 000», «1 250,50» — без Intl, чтобы на сервере и в браузере строка была одинаковой
export const formatMoney = (value: string | number | null | undefined): string => {
    const amount = Math.round(parsePrice(value) * 100) / 100;
    const sign = amount < 0 ? '-' : '';
    const [integer, fraction] = Math.abs(amount).toFixed(2).split('.');
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR);
    return fraction === '00' ? `${sign}${grouped}` : `${sign}${grouped},${fraction}`;
};

// Фото товара показываем, только если это http(s)-ссылка
export const getProductImageUrl = (item: { image?: string | null }): string | null =>
    getSafeHttpUrl(item.image);
