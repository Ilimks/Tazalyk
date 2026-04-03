// shared/lib/utils/file.ts
export const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const openInNewTab = (url: string) => {
    window.open(url, '_blank');
};