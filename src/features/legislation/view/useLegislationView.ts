import { useState } from 'react';
import { LegislationDocument } from '@/entities/legislation/model/types';

export const useLegislationView = () => {
    const [selectedDocument, setSelectedDocument] = useState<LegislationDocument | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (document: LegislationDocument) => {
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