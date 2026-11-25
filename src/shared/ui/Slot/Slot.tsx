'use client';

import { ReactNode } from 'react';

interface SlotProps {
    children: ReactNode;
}

// Клиентская прослойка для содержимого страницы внутри серверной обёртки (<div>{children}</div>).
// Без неё на медленной сети React дважды берёт один и тот же <div> при гидратации: выходит ошибка
// #418, и страница рисуется заново. Видно в Next.js 15.5; после обновления проверьте, нужна ли она.
export const Slot = ({ children }: SlotProps) => <>{children}</>;
