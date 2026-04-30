import { baseApi } from '../baseApi';
import { Document } from '@/entities/document/model/types';

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const legislationApi = {
    getAll: async (): Promise<Document[]> => {
        try {
            const response = await baseApi.get<PaginatedResponse<Document>>('/legislation/');
            return response?.results || [];
        } catch (error) {
            console.error('❌ Ошибка API:', error);
            return [];
        }
    },
    
    getById: (id: string) => baseApi.get<Document>(`/legislation/${id}/`),
    
    download: (fileUrl: string | undefined, fileName: string) => {
        if (!fileUrl) {
            console.error('Нет URL файла');
            alert('Файл недоступен для скачивания');
            return;
        }
        
        try {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Ошибка скачивания:', error);
            alert('Не удалось скачать файл');
        }
    },
    
    view: (fileUrl: string | undefined, fileName: string) => {
        if (!fileUrl) {
            console.error('Нет URL файла');
            alert('Файл недоступен для просмотра');
            return;
        }
        
        try {
            const fileExt = fileName?.split('.').pop()?.toLowerCase() || '';
            
            console.log('📄 Открытие файла:', { fileUrl, fileName, fileExt });
            
            if (fileExt === 'pdf') {
                const newWindow = window.open();
                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>${fileName}</title>
                                <style>
                                    body { margin: 0; height: 100vh; }
                                    embed { width: 100%; height: 100%; }
                                </style>
                            </head>
                            <body>
                                <embed src="${fileUrl}" type="application/pdf" width="100%" height="100%" />
                            </body>
                        </html>
                    `);
                }
            } 
            else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) {
                const newWindow = window.open();
                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>${fileName}</title>
                                <style>
                                    body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f1f5f9; }
                                    img { max-width: 90%; max-height: 90vh; object-fit: contain; }
                                </style>
                            </head>
                            <body>
                                <img src="${fileUrl}" alt="${fileName}" />
                            </body>
                        </html>
                    `);
                }
            }
            else {
                window.open(fileUrl, '_blank');
            }
        } catch (error) {
            console.error('Ошибка просмотра:', error);
            alert('Не удалось открыть файл');
        }
    },
};