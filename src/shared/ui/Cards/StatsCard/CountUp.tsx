'use client';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
    value: number;
    suffix?: string;
}

const DURATION_MS = 900;

// Число «набегает» один раз, когда доходит до экрана. В разметке с сервера сразу стоит итог
export const CountUp: React.FC<CountUpProps> = ({ value, suffix = '' }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(value);

    useEffect(() => {
        const element = ref.current;
        if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // уже на экране — не трогаем, чтобы число не прыгало на глазах
        if (element.getBoundingClientRect().top < window.innerHeight) return;

        let frame = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min(1, (now - start) / DURATION_MS);
                setShown(Math.round(value * (1 - (1 - progress) ** 3)));
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        });
        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    return (
        <span ref={ref}>
            {shown}
            {suffix}
        </span>
    );
};
