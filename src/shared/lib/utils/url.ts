// Адрес из API используется, только если это обычная http(s)-ссылка:
// javascript:, data: и прочие схемы отбрасываются
export const getSafeHttpUrl = (value: unknown): string | null => {
    if (typeof value !== 'string') return null;
    const url = value.trim();
    if (!/^https?:\/\//i.test(url)) return null;

    try {
        new URL(url);
        return url;
    } catch {
        return null;
    }
};

// Документы и вложения из API: кроме http(s), сейчас приходят как data: с PDF или картинкой.
// data:text/html, javascript: и прочее отбрасываем — открыв такую ссылку, сайт выполнил бы чужой код
const SAFE_DATA_URL = /^data:(application\/pdf|image\/(png|jpe?g|webp|gif));base64,[a-z0-9+/=\s]+$/i;

export const getSafeFileUrl = (value: unknown): string | null => {
    if (typeof value !== 'string') return null;
    const url = value.trim();
    if (url.startsWith('data:')) return SAFE_DATA_URL.test(url) ? url : null;
    return getSafeHttpUrl(url);
};
