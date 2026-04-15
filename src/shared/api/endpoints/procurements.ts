import { baseApi } from '../baseApi';

export interface Procurement {
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
}

export const procurementsApi = {
    getAll: () => baseApi.get<Procurement[]>('/procurements/'),
    getById: (id: string) => baseApi.get<Procurement>(`/procurements/${id}/`),
    create: (data: Omit<Procurement, 'id' | 'created_at'>) => 
        baseApi.post<Procurement>('/procurements/', data),
    update: (id: string, data: Partial<Procurement>) => 
        baseApi.put<Procurement>(`/procurements/${id}/`, data),
    delete: (id: string) => 
        baseApi.delete<void>(`/procurements/${id}/`),
};