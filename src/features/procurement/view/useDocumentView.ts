// features/document/view/useDocumentView.ts
import { useState, useEffect } from 'react';
import { DocumentCard } from '@/entities/procurement/model/types';

export const useDocumentView = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<DocumentCard | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Проверяем, что мы на клиенте
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleView = (document: DocumentCard) => {
        if (document.modalContent) {
            setSelectedDocument(document);
            setShowModal(true);
        } else {
            // Используем window только на клиенте
            if (typeof window !== 'undefined' && window.open) {
                window.open(document.pdfUrl, '_blank');
            } else {
                // Фолбэк для сервера или если window.open недоступен
                console.log('Open URL:', document.pdfUrl);
                // Можно также использовать router.push если это внутренняя ссылка
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDocument(null);
    };

    return {
        showModal,
        selectedDocument,
        handleView,
        closeModal,
        isClient // может пригодиться для условного рендеринга
    };
};