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

// подписи — в сообщениях Procurement.ProcurementTypes / ProcurementMethods / ProcurementStatuses
export const typeConfig = {
    goods: { color: '#8b5cf6', bg: '#8b5cf610' },
    services: { color: '#06b6d4', bg: '#06b6d410' },
    works: { color: '#f59e0b', bg: '#f59e0b10' }
} as const;

export const methodConfig = {
    direct: { color: '#22c55e', bg: '#22c55e10' },
    quotation: { color: '#3b82f6', bg: '#3b82f610' },
    simple: { color: '#f59e0b', bg: '#f59e0b10' },
    tender: { color: '#ef4444', bg: '#ef444410' }
} as const;

export const statusConfig = {
    active: { color: '#22c55e', bg: '#22c55e10' },
    completed: { color: '#64748b', bg: '#f1f5f9' },
    cancelled: { color: '#ef4444', bg: '#fef2f2' }
} as const;