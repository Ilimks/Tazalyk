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

export const statusConfig = {
    active: { color: '#15803d', bg: '#ecfdf3' },
    completed: { color: '#475569', bg: '#eef1f6' },
    cancelled: { color: '#b91c1c', bg: '#fef2f2' }
} as const;
