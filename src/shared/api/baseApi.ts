const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export class ApiError extends Error {
    // data — тело ответа с ошибкой (например, ошибки полей от Django REST Framework), если оно есть
    constructor(public readonly status: number, public readonly data?: unknown) {
        super(`HTTP error! status: ${status}`);
        this.name = 'ApiError';
    }
}

// тело ответа с ошибкой; если это не JSON — undefined
const readErrorBody = async (response: Response): Promise<unknown> => {
    try {
        return await response.json();
    } catch {
        return undefined;
    }
};

export const baseApi = {
    // init — опции fetch; на сервере можно передать { next: { revalidate: 60 } } для кэша Next.js
    get: async <T>(url: string, params?: QueryParams, init?: RequestInit): Promise<T> => {
        const query = new URLSearchParams();
        Object.entries(params ?? {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.append(key, String(value));
            }
        });
        const queryString = query.toString();

        // без таймаута зависший API держал бы страницу бесконечно
        const response = await fetch(`${API_BASE_URL}${url}${queryString ? `?${queryString}` : ''}`, {
            ...init,
            signal: init?.signal ?? AbortSignal.timeout(API_TIMEOUT),
        });

        if (!response.ok) {
            throw new ApiError(response.status);
        }

        return response.json();
    },

    // JSON-запрос из браузера (например, оформление заказа); ошибка содержит тело ответа в ApiError.data
    post: async <T>(url: string, body: unknown, init?: RequestInit): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...init,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body),
            signal: init?.signal ?? AbortSignal.timeout(API_TIMEOUT),
        });

        if (!response.ok) {
            throw new ApiError(response.status, await readErrorBody(response));
        }

        return response.json();
    },
};
