const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {
    // Аутентификация
    login: async (password: string) => {
        const response = await fetch(`${API_BASE_URL}/admin-login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        return response.json();
    },

    // Импорт данных
    importData: async (data: any) => {
        const response = await fetch(`${API_BASE_URL}/import-data/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Видео
    getVideos: async () => {
        const response = await fetch(`${API_BASE_URL}/videos/`);
        return response.json();
    },
    
    createVideo: async (video: any) => {
        const response = await fetch(`${API_BASE_URL}/videos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(video)
        });
        return response.json();
    },
    
    updateVideo: async (id: string, video: any) => {
        const response = await fetch(`${API_BASE_URL}/videos/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(video)
        });
        return response.json();
    },
    
    deleteVideo: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/videos/${id}/`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Фото
    getPhotos: async () => {
        const response = await fetch(`${API_BASE_URL}/photos/`);
        return response.json();
    },
    
    createPhoto: async (photo: any) => {
        const response = await fetch(`${API_BASE_URL}/photos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(photo)
        });
        return response.json();
    },
    
    updatePhoto: async (id: string, photo: any) => {
        const response = await fetch(`${API_BASE_URL}/photos/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(photo)
        });
        return response.json();
    },
    
    deletePhoto: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/photos/${id}/`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Новости
    getNews: async () => {
        const response = await fetch(`${API_BASE_URL}/news/`);
        return response.json();
    },
    
    createNews: async (news: any) => {
        const response = await fetch(`${API_BASE_URL}/news/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news)
        });
        return response.json();
    },
    
    updateNews: async (id: string, news: any) => {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(news)
        });
        return response.json();
    },
    
    deleteNews: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`, {
            method: 'DELETE'
        });
        return response.json();
    },

    // Закупки
    getProcurements: async () => {
        const response = await fetch(`${API_BASE_URL}/procurements/`);
        return response.json();
    },
    
    createProcurement: async (procurement: any) => {
        const response = await fetch(`${API_BASE_URL}/procurements/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(procurement)
        });
        return response.json();
    },
    
    updateProcurement: async (id: string, procurement: any) => {
        const response = await fetch(`${API_BASE_URL}/procurements/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(procurement)
        });
        return response.json();
    },
    
    deleteProcurement: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/procurements/${id}/`, {
            method: 'DELETE'
        });
        return response.json();
    }
};