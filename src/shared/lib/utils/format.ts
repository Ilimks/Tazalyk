export const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KGS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('KGS', 'сом');
};