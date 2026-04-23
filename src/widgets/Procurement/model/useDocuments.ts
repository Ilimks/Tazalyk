import { useState } from 'react';
import { documentsConfig } from '@/shared/config/documents';
import { DocumentCard } from '@/entities/procurement/model/types';

export const useDocuments = () => {
    const [documents] = useState<DocumentCard[]>(documentsConfig);

    return { documents };
};