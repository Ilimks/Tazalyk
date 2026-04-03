// shared/lib/utils/format.ts
export const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KGS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('KGS', 'сом');
};

export const getPluralForm = (count: number): string => {
    if (count === 1) return 'закупка';
    if (count < 5) return 'закупки';
    return 'закупок';
};