import { getSafeFileUrl } from './url';

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

// unavailableMessage — текст alert, если ссылки нет или она небезопасна (передаётся из переводов)
export const downloadFile = (url: string | undefined, fileName: string, unavailableMessage: string) => {
    const safeUrl = getSafeFileUrl(url);
    if (!safeUrl) {
        alert(unavailableMessage);
        return;
    }

    const link = document.createElement('a');
    link.href = safeUrl;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const openInNewTab = (url: string) => {
    const safeUrl = getSafeFileUrl(url);
    if (safeUrl) window.open(safeUrl, '_blank', 'noopener,noreferrer');
};

// PDF и картинки открываются во встроенном просмотрщике, остальное — как обычная ссылка
export const viewFile = (url: string | undefined, fileName: string, unavailableMessage: string) => {
    const safeUrl = getSafeFileUrl(url);
    if (!safeUrl) {
        alert(unavailableMessage);
        return;
    }

    const ext = fileName?.split('.').pop()?.toLowerCase() || '';
    const isPdf = ext === 'pdf';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);

    if (!isPdf && !isImage) {
        openInNewTab(safeUrl);
        return;
    }

    const newWindow = window.open();
    if (!newWindow) return;

    const escapedUrl = escapeHtml(safeUrl);
    const safeName = escapeHtml(fileName);
    const body = isPdf
        ? `<embed src="${escapedUrl}" type="application/pdf" width="100%" height="100%" />`
        : `<img src="${escapedUrl}" alt="${safeName}" />`;

    newWindow.document.write(`
        <html>
            <head>
                <title>${safeName}</title>
                <style>
                    body { margin: 0; height: 100vh; display: flex; justify-content: center; align-items: center; background: #f1f5f9; }
                    embed { width: 100%; height: 100%; }
                    img { max-width: 90%; max-height: 90vh; object-fit: contain; }
                </style>
            </head>
            <body>${body}</body>
        </html>
    `);
    newWindow.document.close();
};
