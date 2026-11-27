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

const VIEWABLE_TYPES = 'application/pdf|image/(?:png|jpe?g|webp|gif)';
const DOWNLOAD_TYPES = [
    VIEWABLE_TYPES,
    'application/msword',
    'application/vnd\\.ms-excel',
    'application/vnd\\.openxmlformats-officedocument\\.(?:wordprocessingml\\.document|spreadsheetml\\.sheet)',
    'application/octet-stream',
    'text/plain',
].join('|');

const isDataUrlOf = (url: string, types: string) =>
    new RegExp(`^data:(?:${types})(?:;[\\w=.-]+)*;base64,`, 'i').test(url.slice(0, 300));

const isSameSitePath = (url: string) => /^\/(?![/\\])/.test(url);

const getSafeUrl = (value: unknown, dataTypes: string): string | null => {
    if (typeof value !== 'string') return null;
    const url = value.trim();
    if (url.startsWith('data:')) return isDataUrlOf(url, dataTypes) ? url : null;
    return isSameSitePath(url) ? url : getSafeHttpUrl(url);
};

export const getSafeFileUrl = (value: unknown) => getSafeUrl(value, VIEWABLE_TYPES);

export const getSafeDownloadUrl = (value: unknown) => getSafeUrl(value, DOWNLOAD_TYPES);
