import { getSafeDownloadUrl, getSafeFileUrl } from './url';

const OBJECT_URL_LIFETIME_MS = 60_000;

const toTemporaryUrl = (blob: Blob) => {
    const objectUrl = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(objectUrl), OBJECT_URL_LIFETIME_MS);
    return objectUrl;
};

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
        return null;
    }
};

const toOpenableUrl = (safeUrl: string | null) =>
    safeUrl?.startsWith('data:') ? toObjectUrl(safeUrl) : safeUrl;

const isOtherSite = (url: string) => new URL(url, window.location.href).origin !== window.location.origin;

const fetchAsTemporaryUrl = async (url: string) => {
    try {
        const response = await fetch(url);
        return response.ok ? toTemporaryUrl(await response.blob()) : null;
    } catch {
        return null;
    }
};

export const downloadFile = async (url: string | undefined, fileName: string, unavailableMessage: string) => {
    let href = toOpenableUrl(getSafeDownloadUrl(url));
    if (!href) {
        alert(unavailableMessage);
        return;
    }

    if (!href.startsWith('blob:') && isOtherSite(href)) {
        const temporaryUrl = await fetchAsTemporaryUrl(href);
        if (!temporaryUrl) {
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

export const viewFile = (url: string | undefined, fileName: string, unavailableMessage: string) => {
    const href = toOpenableUrl(getSafeFileUrl(url));
    if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
    } else {
        downloadFile(url, fileName, unavailableMessage);
    }
};
