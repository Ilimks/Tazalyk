import { useState, useEffect } from 'react';
import { LocalAct } from '@/entities/acts/model/types';

const mockLocalActs: LocalAct[] = [
    {
        id: '1',
        title: 'Устав муниципального предприятия "Тазалык"',
        description: 'Основной документ, определяющий деятельность предприятия',
        date: '2024-01-15',
        created_at: '2024-01-15T00:00:00Z'
    },
    {
        id: '2',
        title: 'Правила внутреннего трудового распорядка',
        description: 'Регулирует трудовые отношения между работниками и работодателем',
        date: '2024-02-10',
        created_at: '2024-02-10T00:00:00Z'
    },
    {
        id: '3',
        title: 'Положение об оплате труда и премировании',
        description: 'Определяет систему оплаты труда и порядок премирования сотрудников',
        date: '2024-03-05',
        created_at: '2024-03-05T00:00:00Z'
    },
    {
        id: '4',
        title: 'Положение о защите персональных данных',
        description: 'Регулирует обработку и защиту персональных данных',
        date: '2024-03-20',
        created_at: '2024-03-20T00:00:00Z'
    },
    {
        id: '5',
        title: 'Положение о коммерческой тайне',
        description: 'Определяет перечень сведений, составляющих коммерческую тайну',
        date: '2024-04-01',
        created_at: '2024-04-01T00:00:00Z'
    },
    {
        id: '6',
        title: 'Инструкция по делопроизводству',
        description: 'Порядок оформления, учета и хранения документов',
        date: '2024-04-15',
        created_at: '2024-04-15T00:00:00Z'
    }
];

export const useLocalActs = () => {
    const [documents, setDocuments] = useState<LocalAct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadDocuments = async () => {
        try {
            setLoading(true);
            // Имитация загрузки
            await new Promise(resolve => setTimeout(resolve, 1000));
            setDocuments(mockLocalActs);
            setError(null);
        } catch (err) {
            console.error('Error loading local acts:', err);
            setError('Не удалось загрузить локальные акты');
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