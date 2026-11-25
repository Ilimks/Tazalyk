// Подпись на языке страницы; если на нём не задана — на другом. Пустая строка — подписи нет
export const mediaCaption = (item: { caption_ru?: string; caption_ky?: string }, locale: string): string => {
    const [first, second] = locale === 'ky' ? [item.caption_ky, item.caption_ru] : [item.caption_ru, item.caption_ky];
    return (first || second || '').trim();
};
