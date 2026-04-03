// features/document/view/useDocumentView.ts
import { useState } from 'react';
import { DocumentCard } from '@/entities/procurement/model/types';

export const useDocumentView = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<DocumentCard | null>(null);

    const handleView = (document: DocumentCard) => {
        if (document.modalContent) {
            setSelectedDocument(document);
            setShowModal(true);
        } else {
            window.open(document.pdfUrl, '_blank');
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
        closeModal
    };
};