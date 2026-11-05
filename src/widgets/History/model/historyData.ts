'use client';
import { useTranslations } from 'next-intl';

export const useHistoryData = () => {
    const t = useTranslations("History");
    
    const quote = {
        text: t('HistoryCityTitle'),
        author: t('HistoryCityText')
    };

    const conclusion = {
        title: t('HistoryFutureTitle'),
        paragraphs: [
            t('HistoryFuture1'),
            t('HistoryFuture2'),
            t('HistoryFuture3')
        ]
    };

    const historySections = [
        {
            id: 1,
            variant: 'left' as const,
            title: t('HistoryWayTitle'),
            imageSrc: '/assets/images/History1.webp',
            imageWidth: 1280,
            imageHeight: 854,
            imageAlt: t('HistoryImage1Alt'),
            imageCaption: t('HistoryImage1Caption'),
            paragraphs: [t('HistoryWay1'), t('HistoryWay2')]
        },
        {
            id: 2,
            variant: 'right' as const,
            title: t('HistoryPeriodTitle'),
            imageSrc: '/assets/images/History2.webp',
            imageWidth: 1400,
            imageHeight: 933,
            imageAlt: t('HistoryImage2Alt'),
            imageCaption: t('HistoryImage2Caption'),
            paragraphs: [t('HistoryPeriod1'), t('HistoryPeriod2')]
        },
        {
            id: 3,
            variant: 'left' as const,
            title: t('HistoryAwardsTitle'),
            imageSrc: '/assets/images/History3.webp',
            imageWidth: 1400,
            imageHeight: 933,
            imageAlt: t('HistoryImage3Alt'),
            imageCaption: t('HistoryImage3Caption'),
            paragraphs: [t('HistoryAwards1'), t('HistoryAwards2')]
        },
        {
            id: 4,
            variant: 'right' as const,
            title: t('HistoryStageTitle'),
            imageSrc: '/assets/images/History4.webp',
            imageWidth: 1400,
            imageHeight: 935,
            imageAlt: t('HistoryImage4Alt'),
            imageCaption: t('HistoryImage4Caption'),
            showStats: true,
            paragraphs: [t('HistoryStage1'), t('HistoryStage2'), t('HistoryStage3')]
        }
    ];

    const doubleImage = {
        title: t('HistoryDevelopmentTitle'),
        image1Src: '/assets/images/History5.webp',
        image1Width: 1400,
        image1Height: 788,
        image1Alt: t('HistoryImage5Alt'),
        image2Src: '/assets/images/History6.webp',
        image2Width: 1400,
        image2Height: 788,
        image2Alt: t('HistoryImage6Alt'),
        paragraphs: [
            t('HistoryDevelopment1'),
            t('HistoryDevelopment2'),
            t('HistoryDevelopment3')
        ]
    };

    return { quote, conclusion, historySections, doubleImage };
};