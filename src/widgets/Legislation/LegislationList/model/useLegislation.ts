import { useState, useEffect } from 'react';
import { LegislationDocument } from '@/entities/legislation/model/types';

// Временные данные для демонстрации (потом заменим на API)
const mockLegislation: LegislationDocument[] = [
    {
        id: '1',
        title: 'Конституция Кыргызской Республики',
        description: 'Основной закон государства, обладающий высшей юридической силой',
        pdfUrl: '/documents/constitution.pdf',
        fileName: 'constitution.pdf',
        date: '2021-05-05',
        created_at: '2021-05-05T00:00:00Z'
    },
    {
        id: '2',
        title: 'Закон КР "О государственных закупках"',
        description: 'Регулирует отношения, возникающие в связи с осуществлением государственных закупок',
        pdfUrl: '/documents/law-procurement.pdf',
        fileName: 'law-procurement.pdf',
        date: '2022-07-15',
        created_at: '2022-07-15T00:00:00Z'
    },
    {
        id: '3',
        title: 'Трудовой кодекс Кыргызской Республики',
        description: 'Регулирует трудовые отношения между работниками и работодателями',
        pdfUrl: '/documents/labor-code.pdf',
        fileName: 'labor-code.pdf',
        date: '2023-01-10',
        created_at: '2023-01-10T00:00:00Z'
    },
    {
        id: '4',
        title: 'Закон КР "О защите персональных данных"',
        description: 'Регулирует отношения, связанные с обработкой персональных данных',
        pdfUrl: '/documents/personal-data-law.pdf',
        fileName: 'personal-data-law.pdf',
        date: '2023-03-20',
        created_at: '2023-03-20T00:00:00Z'
    },
    {
        id: '5',
        title: 'Закон КР "О противодействии коррупции"',
        description: 'Устанавливает правовые основы противодействия коррупции',
        pdfUrl: '/documents/anti-corruption.pdf',
        fileName: 'anti-corruption.pdf',
        date: '2023-06-01',
        created_at: '2023-06-01T00:00:00Z'
    },
    {
        id: '6',
        title: 'Налоговый кодекс Кыргызской Республики',
        description: 'Регулирует налоговые отношения в Кыргызской Республике',
        pdfUrl: '/documents/tax-code.pdf',
        fileName: 'tax-code.pdf',
        date: '2023-09-15',
        created_at: '2023-09-15T00:00:00Z'
    }
];

export const useLegislation = () => {
    const [documents, setDocuments] = useState<LegislationDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDocuments = async () => {
        try {
            setLoading(true);
            // Имитация загрузки
            await new Promise(resolve => setTimeout(resolve, 1000));
            setDocuments(mockLegislation);
            setError(null);
        } catch (err) {
            console.error('Error loading legislation:', err);
            setError('Не удалось загрузить законодательные документы');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    return {
        documents,
        loading,
        error,
        refetch: loadDocuments
    };
};