export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

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
