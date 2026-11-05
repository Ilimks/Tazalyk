// Кыргызское название, если оно заполнено, иначе русское.
// Подходит и для товара из API, и для позиции корзины (у обоих есть name_ru и name_ky)
export const getProductName = (
    item: { name_ru: string; name_ky?: string | null },
    locale: string
): string => (locale === 'ky' && item.name_ky?.trim()) || item.name_ru;

export const getProductDescription = (
    item: { description_ru: string; description_ky?: string | null },
    locale: string
): string => (locale === 'ky' && item.description_ky?.trim()) || item.description_ru;
