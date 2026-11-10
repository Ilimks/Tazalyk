import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Home, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import styles from './NotFoundScene.module.scss';

/**
 * Страница 404 в духе предприятия: «эту страницу уже убрали».
 * Вместо нуля — герб в вращающемся кольце, под цифрами метла подметает листья,
 * на фоне падают листья. Вся анимация на CSS — без скриптов в браузере;
 * при «уменьшить движение» в системе всё стоит на месте.
 */

const QUICK_LINKS = [
    { key: 'tariffs', href: '/tariffs' },
    { key: 'services', href: '/attendance' },
    { key: 'news', href: '/news' },
    { key: 'complaints', href: '/complaints' },
] as const;

// падающие листья: место по горизонтали, задержка, длительность, размер
const FALLING_LEAVES = [
    { x: '6%', delay: '0s', duration: '13s', size: 22 },
    { x: '18%', delay: '4s', duration: '16s', size: 16 },
    { x: '31%', delay: '8s', duration: '14s', size: 20 },
    { x: '64%', delay: '2s', duration: '15s', size: 18 },
    { x: '78%', delay: '6s', duration: '12s', size: 24 },
    { x: '91%', delay: '10s', duration: '17s', size: 15 },
];

// листья и пыль, которые метла сметает вправо
const SWEPT = [
    { delay: '0s', kind: 'leaf' },
    { delay: '0.55s', kind: 'dust' },
    { delay: '1.1s', kind: 'leaf' },
    { delay: '1.65s', kind: 'dust' },
] as const;

const Leaf = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
            d="M20.5 3.5C11 3 4.5 8.5 4 17c0 1.2.2 2.3.5 3.3C6 13.5 10.5 9 16.5 7 11 10 7.3 14.6 6 21c.9.2 1.8.3 2.8.3 7.7-.4 12.4-7.4 11.7-17.8Z"
            fill="currentColor"
        />
    </svg>
);

const Broom = () => (
    <svg className={styles.broom} viewBox="0 0 120 170" aria-hidden focusable="false">
        <rect x="55" y="0" width="10" height="100" rx="5" fill="#102382" />
        <rect x="42" y="94" width="36" height="14" rx="4" fill="#3E4095" />
        <path d="M44 106h32l26 54c-28 9-56 9-84 0l26-54Z" fill="#22C55E" />
        <path
            d="M52 108 40 160M60 108v54M68 108l12 52M48 108 30 158M72 108l18 50"
            stroke="#15803D"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
    </svg>
);

export const NotFoundScene = async () => {
    const t = await getTranslations('NotFound');

    return (
        <section className={styles.scene} aria-labelledby="not-found-title">
            <div className={styles.sky} aria-hidden>
                {FALLING_LEAVES.map((leaf, index) => (
                    <span
                        key={index}
                        className={styles.fallingLeaf}
                        style={{
                            '--x': leaf.x,
                            '--delay': leaf.delay,
                            '--duration': leaf.duration,
                            '--size': `${leaf.size}px`,
                        } as CSSProperties}
                    >
                        <Leaf />
                    </span>
                ))}
            </div>

            <div className={`container ${styles.inner}`}>
                <span className={styles.eyebrow}>{t('eyebrow')}</span>

                <div className={styles.code} aria-label="404">
                    <span className={styles.digit} aria-hidden>4</span>
                    <span className={styles.emblemSlot} aria-hidden>
                        <span className={styles.emblemFloat}>
                            <span className={styles.ring} />
                            <span className={styles.orbit}>
                                <Leaf className={styles.orbitLeaf} />
                            </span>
                            <span className={styles.emblem}>
                                {/* eslint-disable-next-line @next/next/no-img-element -- векторный герб, оптимизация не нужна */}
                                <img src="/assets/icons/logo.svg" alt="" width={120} height={116} />
                            </span>
                        </span>
                    </span>
                    <span className={`${styles.digit} ${styles.digitLast}`} aria-hidden>4</span>
                </div>

                <div className={styles.street} aria-hidden>
                    <span className={styles.road} />
                    <span className={styles.sweeper}>
                        <Broom />
                        {SWEPT.map((item, index) => (
                            <span
                                key={index}
                                className={item.kind === 'leaf' ? styles.sweptLeaf : styles.dust}
                                style={{ '--delay': item.delay } as CSSProperties}
                            >
                                {item.kind === 'leaf' && <Leaf />}
                            </span>
                        ))}
                    </span>
                </div>

                <h1 id="not-found-title" className={styles.title}>{t('title')}</h1>
                <p className={styles.description}>{t('description')}</p>

                <div className={styles.actions}>
                    <Link href="/" className={`${styles.button} ${styles.buttonPrimary}`}>
                        <Home size={18} aria-hidden />
                        {t('home')}
                    </Link>
                    <Link href="/contacts" className={`${styles.button} ${styles.buttonGhost}`}>
                        <MessageCircle size={18} aria-hidden />
                        {t('contacts')}
                    </Link>
                </div>

                <nav className={styles.quick} aria-label={t('popular')}>
                    <span className={styles.quickLabel}>{t('popular')}</span>
                    <ul className={styles.quickList}>
                        {QUICK_LINKS.map((link) => (
                            <li key={link.key}>
                                <Link href={link.href} className={styles.quickLink}>
                                    {t(`links.${link.key}`)}
                                    <ArrowRight size={14} aria-hidden />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </section>
    );
};
