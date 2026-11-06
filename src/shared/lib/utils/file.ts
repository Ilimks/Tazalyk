import { getSafeDownloadUrl, getSafeFileUrl } from './url';

// Вкладка успевает получить файл за это время, после ссылка больше не нужна
const OBJECT_URL_LIFETIME_MS = 60_000;

const toTemporaryUrl = (blob: Blob) => {
    const objectUrl = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(objectUrl), OBJECT_URL_LIFETIME_MS);
    return objectUrl;
};

// Chrome не открывает data: в новой вкладке, а большой data: не может и скачать, поэтому отдаём blob:.
// Разбираем синхронно: window.open после await сработал бы уже вне клика и попал под блокировку всплывающих окон
const toObjectUrl = (dataUrl: string): string | null => {
    try {
        const [header, base64] = dataUrl.split(',', 2);
        const type = header.slice('data:'.length).split(';')[0];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
            bytes[index] = binary.charCodeAt(index);
        }

        return toTemporaryUrl(new Blob([bytes], { type }));
    } catch {
        // повреждённый файл: сообщение покажет вызывающий код
        return null;
    }
};

const toOpenableUrl = (safeUrl: string | null) =>
    safeUrl?.startsWith('data:') ? toObjectUrl(safeUrl) : safeUrl;

const isOtherSite = (url: string) => new URL(url, window.location.href).origin !== window.location.origin;

// Имя из <a download> браузер не применяет к файлу с другого адреса: документы лежат на API,
// поэтому файл забираем сами, иначе он сохранился бы под служебным именем
const fetchAsTemporaryUrl = async (url: string) => {
    try {
        const response = await fetch(url);
        return response.ok ? toTemporaryUrl(await response.blob()) : null;
    } catch {
        return null;
    }
};

// unavailableMessage — текст alert, если ссылки нет или она небезопасна (передаётся из переводов)
export const downloadFile = async (url: string | undefined, fileName: string, unavailableMessage: string) => {
    let href = toOpenableUrl(getSafeDownloadUrl(url));
    if (!href) {
        alert(unavailableMessage);
        return;
    }

    if (!href.startsWith('blob:') && isOtherSite(href)) {
        const temporaryUrl = await fetchAsTemporaryUrl(href);
        if (!temporaryUrl) {
            // не удалось забрать файл: пусть откроет сам браузер
            window.open(href, '_blank', 'noopener,noreferrer');
            return;
        }
        href = temporaryUrl;
    }

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const openInNewTab = (url: string) => {
    const href = toOpenableUrl(getSafeFileUrl(url));
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
};

// PDF и картинки браузер показывает сам. Word и Excel показать не может, такой файл скачивается
export const viewFile = (url: string | undefined, fileName: string, unavailableMessage: string) => {
    const href = toOpenableUrl(getSafeFileUrl(url));
    if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
    } else {
        downloadFile(url, fileName, unavailableMessage);
    }
};
