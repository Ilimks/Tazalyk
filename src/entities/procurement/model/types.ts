// types/procurement.ts
export interface ProcurementItem {
    id: string;
    number: string;
    contractNumber: string;
    supplier: string;
    type: 'goods' | 'services' | 'works';
    method: 'direct' | 'quotation' | 'simple' | 'tender';
    status: 'active' | 'completed' | 'cancelled';
    date: string;
    amount: number;
    created_at: string;
    updated_at?: string;
}

export interface ProcurementState {
    items: ProcurementItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// entities/document/model/types.ts
export interface DocumentCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    pdfUrl: string;
    fileName: string;
    modalContent?: {
        title: string;
        sections: {
            title: string;
            content: string | string[];
        }[];
        footer?: string;
    };
}

export interface DocumentModalContent {
    title: string;
    sections: {
        title: string;
        content: string | string[];
    }[];
    footer?: string;
}

export type ProcurementType = ProcurementItem['type'];
export type ProcurementMethod = ProcurementItem['method'];
export type ProcurementStatus = ProcurementItem['status'];

export const typeConfig = {
    goods: { label: 'Товар', color: '#8b5cf6', bg: '#8b5cf610' },
    services: { label: 'Услуга', color: '#06b6d4', bg: '#06b6d410' },
    works: { label: 'Работа', color: '#f59e0b', bg: '#f59e0b10' }
} as const;

export const methodConfig = {
    direct: { label: 'Прямое заключение договора', color: '#22c55e', bg: '#22c55e10' },
    quotation: { label: 'Запрос котировок', color: '#3b82f6', bg: '#3b82f610' },
    simple: { label: 'Простейшая закупка', color: '#f59e0b', bg: '#f59e0b10' },
    tender: { label: 'Конкурс', color: '#ef4444', bg: '#ef444410' }
} as const;

export const statusConfig = {
    active: { label: 'Активна', color: '#22c55e', bg: '#22c55e10' },
    completed: { label: 'Завершена', color: '#64748b', bg: '#f1f5f9' },
    cancelled: { label: 'Отменена', color: '#ef4444', bg: '#fef2f2' }
} as const;