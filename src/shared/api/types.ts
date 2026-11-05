// Формат списков с пагинацией, который отдаёт API (Django REST Framework)
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Страница списка в удобном для UI виде
export interface PageResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

export const toPageResult = <T>(
    response: PaginatedResponse<T>,
    page: number,
    pageSize: number
): PageResult<T> => ({
    items: response.results || [],
    totalCount: response.count,
    totalPages: Math.ceil(response.count / pageSize),
    currentPage: page,
});
