import { useState, useEffect } from 'react';
import { DocumentCard } from '@/entities/procurement/model/types';

export const useDocumentView = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<DocumentCard | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleView = (document: DocumentCard) => {
        if (document.modalContent) {
            setSelectedDocument(document);
            setShowModal(true);
        } else {
            if (typeof window !== 'undefined' && window.open) {
                window.open(document.pdfUrl, '_blank');
            } else {
                console.log('Open URL:', document.pdfUrl);
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
        isClient
    };
};