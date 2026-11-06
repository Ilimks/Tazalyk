// Серверная загрузка не должна задерживать страницу: если API не ответил за 3 секунды,
// страница отдаётся без данных и догружает их в браузере
const SERVER_TIMEOUT_MS = 3000;

// Опции fetch для серверных компонентов: кэш Next.js на revalidateSeconds и короткий таймаут
export const getServerFetchOptions = (revalidateSeconds = 60): RequestInit => ({
    next: { revalidate: revalidateSeconds },
    signal: AbortSignal.timeout(SERVER_TIMEOUT_MS),
});

// Для запросов с параметрами от посетителя: каждый новый вариант адреса занял бы место в кэше на диске,
// и перебором значений его можно заполнить целиком
export const getUncachedServerFetchOptions = (): RequestInit => ({
    cache: 'no-store',
    signal: AbortSignal.timeout(SERVER_TIMEOUT_MS),
});
