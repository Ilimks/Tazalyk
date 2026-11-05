// HTTP-клиент и общие типы. Запросы к конкретным сущностям лежат в entities/<сущность>/api
export { baseApi, ApiError } from './baseApi';
export { getServerFetchOptions } from './serverFetch';
export { toPageResult } from './types';
export type { PaginatedResponse, PageResult } from './types';
