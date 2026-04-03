// features/document/download/useDocumentDownload.ts
import { downloadFile } from '@/shared/lib/utils/file';

export const useDocumentDownload = () => {
    const handleDownload = (pdfUrl: string, fileName: string) => {
        downloadFile(pdfUrl, fileName);
    };

    return { handleDownload };
};