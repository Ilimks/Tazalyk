const SERVER_TIMEOUT_MS = 3000;

export const getServerFetchOptions = (revalidateSeconds = 60): RequestInit => ({
    next: { revalidate: revalidateSeconds },
    signal: AbortSignal.timeout(SERVER_TIMEOUT_MS),
});

export const getUncachedServerFetchOptions = (): RequestInit => ({
    cache: 'no-store',
    signal: AbortSignal.timeout(SERVER_TIMEOUT_MS),
});
