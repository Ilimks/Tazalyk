'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Maximize2, Route } from 'lucide-react';
import type { FitBoundsOptions, LatLngBounds, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loading } from '@/shared/ui/Loading';
import { BISHKEK_BOUNDARY } from './boundary';
import { BASES, type BaseId } from './bases';
import styles from './CityMap.module.scss';

interface Props {
    mode: 'zone' | 'bases';
    title: string;
}

const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const AROUND: [number, number][] = [[40, 70], [46, 70], [46, 79], [40, 79]];
const BASE_ZOOM = 16;
const HINT_MS = 1400;
const PIN_GAP = 40;

const routeUrl = (lat: number, lon: number) =>
    `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${lat}%2C${lon}`;

const fitOptions = (mode: Props['mode']): FitBoundsOptions => {
    const side = mode === 'zone' ? 20 : 72;
    const left = window.innerWidth > 1024 ? 348 + (mode === 'zone' ? 0 : 130) : side;
    return { paddingTopLeft: [left, side], paddingBottomRight: [side, side], maxZoom: BASE_ZOOM };
};

export const CityMap: React.FC<Props> = ({ mode, title }) => {
    const t = useTranslations('CityMap');
    const canvasRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const homeRef = useRef<LatLngBounds | null>(null);

    const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading');
    const [active, setActive] = useState<BaseId | null>(null);
    const [hint, setHint] = useState<'touch' | 'wheel' | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let cancelled = false;
        let hintTimer: ReturnType<typeof setTimeout> | undefined;
        const cleanups: (() => void)[] = [];

        const showHint = (kind: 'touch' | 'wheel') => {
            setHint(kind);
            clearTimeout(hintTimer);
            hintTimer = setTimeout(() => setHint(null), HINT_MS);
        };

        const start = async () => {
            const L = await import('leaflet');
            if (cancelled) return;

            const coarse = window.matchMedia('(pointer: coarse)').matches;
            const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const border = L.polygon(BISHKEK_BOUNDARY, { className: styles.border, interactive: false });
            const cityBounds = border.getBounds();

            const map = L.map(canvas, {
                zoomControl: false,
                scrollWheelZoom: false,
                dragging: !coarse,
                minZoom: 10,
                maxZoom: 18,
                zoomSnap: 0.25,
                maxBounds: cityBounds.pad(0.6),
                maxBoundsViscosity: 0.8,
                zoomAnimation: !calm,
                fadeAnimation: !calm,
                markerZoomAnimation: !calm,
            });
            mapRef.current = map;

            const home = mode === 'zone'
                ? cityBounds
                : L.latLngBounds(BASES.map((base) => [base.lat, base.lon] as [number, number]));
            homeRef.current = home;
            map.fitBounds(home, { ...fitOptions(mode), animate: false });

            map.attributionControl.setPrefix(false);
            const tiles = L.tileLayer(TILES, {
                maxZoom: 19,
                attribution: `© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">${t('attribution')}</a>`,
            }).addTo(map);

            let anyTile = false;
            tiles.once('tileload', () => {
                anyTile = true;
                setState('ready');
            });
            tiles.on('tileerror', () => {
                if (!anyTile) setState('failed');
            });

            L.polygon([AROUND, ...BISHKEK_BOUNDARY], { className: styles.outside, stroke: false, interactive: false }).addTo(map);
            border.addTo(map);

            L.control.zoom({ position: 'bottomright', zoomInTitle: t('zoomIn'), zoomOutTitle: t('zoomOut') }).addTo(map);

            for (const base of BASES) {
                const pin = document.createElement('span');
                const number = document.createElement('span');
                number.textContent = String(base.id);
                pin.append(number);
                const marker = L.marker([base.lat, base.lon], {
                    icon: L.divIcon({ className: `${styles.pin} ${base.id === 1 ? styles.pinLeft : styles.pinRight}`, html: pin, iconSize: [34, 44], iconAnchor: [17, 43] }),
                    title: `${t(`bases.${base.id}.name`)}, ${t(`bases.${base.id}.address`)}`,
                    alt: t(`bases.${base.id}.name`),
                    keyboard: true,
                    riseOnHover: true,
                });
                marker.bindTooltip(t(`bases.${base.id}.address`), {
                    permanent: true,
                    direction: base.id === 1 ? 'left' : 'right',
                    offset: base.id === 1 ? [-18, -22] : [18, -22],
                    className: `${styles.label} ${base.id === 1 ? styles.labelLeft : styles.labelRight}`,
                });
                marker.on('click', () => focusBase(base.id));
                marker.addTo(map);
            }

            const [first, second] = BASES;
            const spread = () => {
                const gap = map.project([first.lat, first.lon]).distanceTo(map.project([second.lat, second.lon]));
                canvas.dataset.spread = gap < PIN_GAP ? 'on' : 'off';
            };
            map.on('zoomend', spread);
            spread();

            const enableWheel = () => map.scrollWheelZoom.enable();
            const disableWheel = () => map.scrollWheelZoom.disable();
            map.on('click focus', enableWheel);
            canvas.addEventListener('mouseleave', disableWheel);
            canvas.addEventListener('blur', disableWheel);
            const onWheel = () => {
                if (!map.scrollWheelZoom.enabled()) showHint('wheel');
            };
            canvas.addEventListener('wheel', onWheel, { passive: true });
            const onTouchMove = (event: TouchEvent) => {
                if (coarse && event.touches.length === 1) showHint('touch');
            };
            canvas.addEventListener('touchmove', onTouchMove, { passive: true });

            const resize = new ResizeObserver(() => map.invalidateSize({ animate: false }));
            resize.observe(canvas);

            cleanups.push(() => {
                canvas.removeEventListener('mouseleave', disableWheel);
                canvas.removeEventListener('blur', disableWheel);
                canvas.removeEventListener('wheel', onWheel);
                canvas.removeEventListener('touchmove', onTouchMove);
                resize.disconnect();
                map.remove();
            });
        };

        start().catch(() => {
            if (!cancelled) setState('failed');
        });

        return () => {
            cancelled = true;
            clearTimeout(hintTimer);
            cleanups.forEach((run) => run());
            mapRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const move = (go: (map: LeafletMap, animate: boolean) => void) => {
        const map = mapRef.current;
        if (!map) return;
        go(map, !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    const focusBase = (id: BaseId) => {
        const base = BASES.find((item) => item.id === id);
        if (!base) return;
        setActive(id);
        move((map, animate) => {
            if (animate) map.flyTo([base.lat, base.lon], BASE_ZOOM, { duration: 0.9 });
            else map.setView([base.lat, base.lon], BASE_ZOOM, { animate: false });
        });
    };

    const showHome = () => {
        setActive(null);
        move((map, animate) => {
            const home = homeRef.current;
            if (!home) return;
            if (animate) map.flyToBounds(home, { ...fitOptions(mode), duration: 0.9 });
            else map.fitBounds(home, { ...fitOptions(mode), animate: false });
        });
    };

    return (
        <div className={`${styles.map} ${mode === 'bases' ? styles.basesOnly : ''}`}>
            <div className={styles.stage}>
                <div ref={canvasRef} className={styles.canvas} role="region" aria-label={title} tabIndex={0} />
                {state !== 'ready' && (
                    <div className={styles.state} aria-live="polite">
                        {state === 'loading' ? <Loading /> : <p>{t('failed')}</p>}
                    </div>
                )}
                <p className={`${styles.hint} ${hint ? styles.hintOn : ''}`} aria-hidden>
                    {hint === 'touch' ? t('hintTouch') : t('hintWheel')}
                </p>
            </div>

            <div className={styles.panel}>
                {mode === 'zone' && (
                    <button type="button" className={`${styles.city} ${active === null ? styles.on : ''}`} onClick={showHome} aria-pressed={active === null}>
                        <span className={styles.swatch} aria-hidden />
                        <span className={styles.text}>
                            <b>{t('city')}</b>
                            <span>{t('cityNote')}</span>
                        </span>
                        <Maximize2 size={18} aria-hidden />
                    </button>
                )}
                <ul className={styles.bases}>
                    {BASES.map((base) => (
                        <li key={base.id} className={`${styles.base} ${active === base.id ? styles.on : ''}`}>
                            <button type="button" className={styles.show} onClick={() => focusBase(base.id)} aria-pressed={active === base.id}>
                                <span className={styles.number} aria-hidden>{base.id}</span>
                                <span className={styles.text}>
                                    <b>{t(`bases.${base.id}.name`)}</b>
                                    <span>{t(`bases.${base.id}.address`)}</span>
                                </span>
                            </button>
                            <a
                                className={styles.route}
                                href={routeUrl(base.lat, base.lon)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${t('route')}: ${t(`bases.${base.id}.name`)}`}
                            >
                                <Route size={18} aria-hidden />
                                {t('route')}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
