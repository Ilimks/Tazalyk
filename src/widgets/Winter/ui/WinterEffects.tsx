'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Snowflake } from 'lucide-react';
import styles from './WinterEffects.module.scss';

const STORAGE_KEY = 'tazalyk:snow';

interface WinterEffectsProps {
    enabled: boolean;
}

export const WinterEffects: React.FC<WinterEffectsProps> = ({ enabled }) => {
    const t = useTranslations('Winter');
    const [off, setOff] = useState<boolean | null>(null);
    const [reduced, setReduced] = useState(false);
    const snowRef = useRef<HTMLCanvasElement>(null);
    const layerRef = useRef<HTMLDivElement>(null);
    const manRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!enabled) return;
        let stored: string | null = null;
        try {
            stored = window.localStorage.getItem(STORAGE_KEY);
        } catch {
        }
        setOff(stored === 'off');
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(motion.matches);
        update();
        motion.addEventListener('change', update);
        return () => motion.removeEventListener('change', update);
    }, [enabled]);

    const active = enabled && off === false && !reduced;

    useEffect(() => {
        if (!active || !snowRef.current || !layerRef.current || !manRef.current) return;
        const snowCanvas = snowRef.current;
        const layer = layerRef.current;
        const manCanvas = manRef.current;
        let cancelled = false;
        const stops: (() => void)[] = [];

        const start = async () => {
            const { startSnow } = await import('../model/snow');
            if (cancelled) return;
            const snow = startSnow(snowCanvas, layer, { phone: window.innerWidth <= 1000 });
            stops.push(() => snow.stop());
            try {
                const { startSweeper } = await import('../model/sweeper');
                if (cancelled) return;
                const sweeper = startSweeper(manCanvas, snow);
                stops.unshift(() => sweeper.stop());
            } catch (error) {
                console.warn('Winter sweeper is unavailable:', error);
                manCanvas.style.display = 'none';
            }
        };

        const idle = window.requestIdleCallback
            ? window.requestIdleCallback(() => void start(), { timeout: 2500 })
            : window.setTimeout(() => void start(), 1200);

        return () => {
            cancelled = true;
            if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
            else window.clearTimeout(idle);
            stops.forEach((stop) => stop());
        };
    }, [active]);

    if (!enabled || reduced || off === null) return null;

    const toggle = () => {
        const next = !off;
        setOff(next);
        try {
            if (next) window.localStorage.setItem(STORAGE_KEY, 'off');
            else window.localStorage.removeItem(STORAGE_KEY);
        } catch {
        }
    };

    return (
        <>
            {active && (
                <div ref={layerRef} className={styles.layer} aria-hidden="true">
                    <canvas ref={manRef} className={styles.man} />
                </div>
            )}
            {active && <canvas ref={snowRef} className={styles.snow} aria-hidden="true" />}
            <button
                type="button"
                className={`${styles.toggle} ${off ? styles.toggleOff : ''}`}
                onClick={toggle}
                aria-pressed={!off}
                aria-label={off ? t('on') : t('off')}
                title={off ? t('on') : t('off')}
            >
                <Snowflake size={20} aria-hidden />
            </button>
        </>
    );
};
