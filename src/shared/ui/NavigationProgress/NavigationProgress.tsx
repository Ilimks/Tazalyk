'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './NavigationProgress.module.scss';

const START_EVENT = 'navigation-progress:start';
// Полоса видна при каждом переходе хотя бы столько. Раньше она появлялась только
// после задержки 120 мс, а страницы сайта открываются примерно за 100 мс —
// и полосу не было видно вовсе
const MIN_VISIBLE_MS = 400;
const TRICKLE_INTERVAL_MS = 150;
// если переход так и не закончился (ошибка сети, отменённый клик) — убираем полосу
const SAFETY_TIMEOUT_MS = 15000;

// Для переходов из кода (router.push), которые нельзя поймать по клику на ссылку
export const startNavigationProgress = () => {
    window.dispatchEvent(new Event(START_EVENT));
};

// Клик по ссылке на другую страницу этого сайта, которая откроется в текущей вкладке
const isPageNavigationClick = (event: MouseEvent): boolean => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return false;
    }

    const anchor = (event.target as Element | null)?.closest?.('a');
    if (!anchor?.href || anchor.hasAttribute('download')) return false;
    if (anchor.target && anchor.target !== '_self') return false;

    const url = new URL(anchor.href, window.location.href);
    return url.origin === window.location.origin && url.pathname !== window.location.pathname;
};

export const NavigationProgress: React.FC = () => {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const isRunning = useRef(false);
    const startedAt = useRef(0);
    const timers = useRef<{ show?: number; trickle?: number; safety?: number; complete?: number; hide?: number }>({});

    const clearTimers = () => {
        const { show, trickle, safety, complete, hide } = timers.current;
        window.clearTimeout(show);
        window.clearInterval(trickle);
        window.clearTimeout(safety);
        window.clearTimeout(complete);
        window.clearTimeout(hide);
        timers.current = {};
    };

    const finish = useCallback(() => {
        if (!isRunning.current) return;
        isRunning.current = false;
        window.clearTimeout(timers.current.safety);

        // страница уже открылась, но полоса добегает до конца не раньше MIN_VISIBLE_MS
        const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt.current));
        timers.current.complete = window.setTimeout(() => {
            window.clearInterval(timers.current.trickle);
            setProgress(100);
            timers.current.hide = window.setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 300);
        }, wait);
    }, []);

    const start = useCallback(() => {
        if (isRunning.current) return;
        isRunning.current = true;
        clearTimers();

        startedAt.current = Date.now();
        setVisible(true);
        setProgress(0);
        // со следующего кадра, чтобы рывок с нуля был плавным
        timers.current.show = window.setTimeout(() => setProgress(20), 16);
        // полоса замедляется у 90% и ждёт, пока страница откроется
        timers.current.trickle = window.setInterval(() => {
            setProgress((value) => value + (90 - value) * 0.12);
        }, TRICKLE_INTERVAL_MS);
        timers.current.safety = window.setTimeout(finish, SAFETY_TIMEOUT_MS);
    }, [finish]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (isPageNavigationClick(event)) start();
        };

        // capture: Link из Next.js отменяет стандартный переход ещё до всплытия события
        document.addEventListener('click', handleClick, true);
        window.addEventListener('popstate', start);
        window.addEventListener(START_EVENT, start);

        return () => {
            document.removeEventListener('click', handleClick, true);
            window.removeEventListener('popstate', start);
            window.removeEventListener(START_EVENT, start);
            clearTimers();
        };
    }, [start]);

    // новая страница открылась
    useEffect(() => {
        finish();
    }, [pathname, finish]);

    if (!visible) return null;

    return (
        <div
            className={styles.bar}
            style={{ transform: `scaleX(${progress / 100})`, opacity: progress >= 100 ? 0 : 1 }}
            aria-hidden
        />
    );
};
