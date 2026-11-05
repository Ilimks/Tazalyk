import { useTranslations } from 'next-intl';
import { downloadFile } from '@/shared/lib/utils/file';

export const useDocumentDownload = () => {
    const t = useTranslations('Documents');

    const handleDownload = (pdfUrl: string, fileName: string) => {
        downloadFile(pdfUrl, fileName, t('downloadUnavailable'));
    };

    return { handleDownload };
};