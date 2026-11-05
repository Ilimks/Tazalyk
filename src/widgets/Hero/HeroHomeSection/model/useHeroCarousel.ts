import { useState, useCallback, useRef } from 'react';
import { getImageProps } from 'next/image';

const slideImages = [
    "/assets/images/Slide1.webp",
    "/assets/images/Slide2.webp",
    "/assets/images/Slide3.webp",
    "/assets/images/Slide4.webp",
    "/assets/images/Slide5.webp",
    "/assets/images/Slide6.webp",
    "/assets/images/Slide7.webp",
];

// Миниатюры для круговой карусели: самый большой кружок ~288px (6rem * scale 3),
// поэтому берём оптимизированную версию шириной 640px (2x), а не полный слайд 1920px.
const slideThumbs = slideImages.map(
    (src) => getImageProps({ src, alt: '', width: 320, height: 320 }).props.src
);

export const useHeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    const startAutoPlay = useCallback((intervalTime: number = 5000) => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, intervalTime);
    }, [stopAutoPlay]);

    const handleSlideClick = useCallback((index: number) => {
        setCurrentSlide(index);
        stopAutoPlay();
        setTimeout(() => {
            startAutoPlay();
        }, 1000);
    }, [stopAutoPlay, startAutoPlay]);

    return {
        currentSlide,
        setCurrentSlide,
        slideImages,
        slideThumbs,
        handleSlideClick,
        startAutoPlay,
        stopAutoPlay
    };
};