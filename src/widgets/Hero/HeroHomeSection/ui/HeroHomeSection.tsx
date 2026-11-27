'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MessageSquareWarning } from 'lucide-react';
import { useHeroCarousel } from '../model/useHeroCarousel';
import styles from './HeroHomeSection.module.scss';
import mobile from './HeroHomeSectionMobile.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const HERO_IMAGE_SIZES = '(max-width: 480px) 200vw, (max-width: 1000px) 170vw, 100vw';

export const HeroHomeSection: React.FC = () => {
    const t = useTranslations("Main");
    const tMenu = useTranslations("HeaderMenu");
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const {
        currentSlide,
        setCurrentSlide,
        slideImages,
        slideThumbs
    } = useHeroCarousel();

    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const [shownSlide, setShownSlide] = useState(currentSlide);
    if (shownSlide !== currentSlide) {
        setPrevSlide(shownSlide);
        setShownSlide(currentSlide);
    }

    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        checkWidth();
        setIsHydrated(true);
        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isMobile, setCurrentSlide, slideImages.length]);

    const nextSlide = (currentSlide + 1) % slideImages.length;
    const shouldPreloadNext = isHydrated && !isMobile;

    const getBackgroundClass = (index: number): string | null => {
        if (index === currentSlide) {
            return prevSlide === null ? styles.bgCurrent : `${styles.bgCurrent} ${styles.bgFadeIn}`;
        }
        if (index === prevSlide) return styles.bgPrev;
        if (shouldPreloadNext && index === nextSlide) return styles.bgNext;
        return null;
    };

    const getSlideTransform = (position: number): string => {
        const angle = position * 47 + 141;

        let scale = 1;
        if (position === 0) {
            scale = 3;
        } else if (position === -1 || position === 1) {
            scale = 1.8;
        }

        return `rotate(${angle}deg) translateY(var(--ring)) rotate(${-angle}deg) scale(${scale})`;
    };

    const getSlidePosition = (index: number): number => {
        let offset = (index - currentSlide + slideImages.length) % slideImages.length;
        if (offset > slideImages.length / 2) offset -= slideImages.length;
        return offset;
    };
    const handleSlideClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section
            className={`${styles.hero} ${mobile.hero}`}
            data-fullscreen-hero
        >
            <div className={styles.background} aria-hidden="true">
                {slideImages.map((src, index) => {
                    const layerClass = getBackgroundClass(index);
                    if (!layerClass) return null;
                    return (
                        <Image
                            key={src}
                            src={src}
                            alt=""
                            fill
                            sizes={HERO_IMAGE_SIZES}
                            priority={index === 0}
                            fetchPriority={index === 0 ? 'high' : undefined}
                            className={`${styles.bgImage} ${layerClass}`}
                        />
                    );
                })}
            </div>

            <div className={`container ${styles.inner}`}>
                <div className={styles.infoPanel}>
                    <Image
                        className={styles.heroBrand}
                        src="/assets/icons/logo-name-green.svg"
                        alt="ТАЗАЛЫК"
                        width={260}
                        height={42}
                        priority
                    />
                    <h1 className={styles.heroTitle}>{t('MainHeruDescription')}</h1>
                    <div className={styles.heroActions}>
                        <Link href="/complaints" className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}>
                            <MessageSquareWarning size={20} aria-hidden />
                            {tMenu('subscribersComplaints')}
                        </Link>
                        <Link href="/history" className={styles.heroBtn}>
                            {t('MainHeroButton')}
                        </Link>
                    </div>
                </div>
            </div>

            {!isMobile && (
                <div className={styles.carouselContainer}>
                    <div className={styles.carousel}>
                        {slideImages.map((_, index) => {
                            const position = getSlidePosition(index);
                            if (position >= -2 && position <= 2) {
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.slide} ${
                                            index === currentSlide ? styles.active : ''
                                        }`}
                                        style={{
                                            backgroundImage: `url("${slideThumbs[index]}")`,
                                            transform: getSlideTransform(position)
                                        }}
                                        onClick={() => handleSlideClick(index)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};