const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('API_BASE_URL:', API_BASE_URL);

export const baseApi = {
    get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
        let fullUrl = `${API_BASE_URL}${url}`;
        
        if (params) {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
            const queryString = queryParams.toString();
            if (queryString) {
                fullUrl += `?${queryString}`;
            }
        }
        
        console.log(`📡 Fetching GET: ${fullUrl}`);
        
        const response = await fetch(fullUrl);
        console.log(`📊 Response status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`✅ Response data:`, data);
        return data;
    },
};