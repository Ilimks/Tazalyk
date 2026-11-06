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

// Файлы из API приходят как data:, файлы самого сайта — как путь /assets/...
// data:text/html, javascript: и прочее отбрасываем — открыв такую ссылку, сайт выполнил бы чужой код
const VIEWABLE_TYPES = 'application/pdf|image/(?:png|jpe?g|webp|gif)';
// Word, Excel и текст браузер не показывает, но скачать их безопасно. Те же типы принимает сервер
const DOWNLOAD_TYPES = [
    VIEWABLE_TYPES,
    'application/msword',
    'application/vnd\\.ms-excel',
    'application/vnd\\.openxmlformats-officedocument\\.(?:wordprocessingml\\.document|spreadsheetml\\.sheet)',
    'application/octet-stream',
    'text/plain',
].join('|');

// Тело data: в регулярке не проверяем: файл может весить десятки мегабайт
const isDataUrlOf = (url: string, types: string) =>
    new RegExp(`^data:(?:${types})(?:;[\\w=.-]+)*;base64,`, 'i').test(url.slice(0, 300));

// Путь на этом сайте. «//» и «/\\» браузер считает адресом другого сайта
const isSameSitePath = (url: string) => /^\/(?![/\\])/.test(url);

const getSafeUrl = (value: unknown, dataTypes: string): string | null => {
    if (typeof value !== 'string') return null;
    const url = value.trim();
    if (url.startsWith('data:')) return isDataUrlOf(url, dataTypes) ? url : null;
    return isSameSitePath(url) ? url : getSafeHttpUrl(url);
};

// Для просмотра в браузере
export const getSafeFileUrl = (value: unknown) => getSafeUrl(value, VIEWABLE_TYPES);

// Для скачивания
export const getSafeDownloadUrl = (value: unknown) => getSafeUrl(value, DOWNLOAD_TYPES);
