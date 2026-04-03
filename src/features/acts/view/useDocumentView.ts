import { useState } from 'react';
import { LocalAct } from '../../../entities/acts/model/types';

export const useDocumentView = () => {
    const [selectedDocument, setSelectedDocument] = useState<LocalAct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (document: LocalAct) => {
        setSelectedDocument(document);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
    };

    return {
        selectedDocument,
        isModalOpen,
        handleView,
        closeModal
    };
};