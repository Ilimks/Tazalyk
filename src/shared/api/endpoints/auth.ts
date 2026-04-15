import { baseApi } from '../baseApi';

export const authApi = {
    login: (password: string) => 
        baseApi.request<{ success: boolean; message: string }>('/admin-login/', {
            method: 'POST',
            body: JSON.stringify({ password })
        }),
    
    importData: (data: any) => 
        baseApi.request<{ success: boolean; message: string }>('/import-data/', {
            method: 'POST',
            body: JSON.stringify(data)
        }),
};