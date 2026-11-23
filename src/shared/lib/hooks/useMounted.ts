import { useEffect, useState } from 'react';

/**
 * false при первой отрисовке (как на сервере), true после неё.
 * Части страницы внутри Suspense «оживают» позже остальных: корзина к этому времени
 * уже прочитана из браузера, и разметка расходилась с серверной.
 */
export const useMounted = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
};
