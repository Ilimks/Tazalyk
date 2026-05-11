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
            imageSrc: '/assets/images/Slide12.png',
            imageAlt: 'Первая техника Тазалык',
            imageCaption: 'Первая техника МП "Тазалык"',
            paragraphs: [t('HistoryWay1'), t('HistoryWay2')]
        },
        {
            id: 2,
            variant: 'right' as const,
            title: t('HistoryPeriodTitle'),
            imageSrc: '/assets/images/Slide7.JPG',
            imageAlt: 'Сотрудники Тазалык',
            imageCaption: 'Коллектив МП "Тазалык" в 2012 году',
            paragraphs: [t('HistoryPeriod1'), t('HistoryPeriod2')]
        },
        {
            id: 3,
            variant: 'left' as const,
            title: t('HistoryAwardsTitle'),
            imageSrc: '/assets/images/Slide12.png',
            imageAlt: 'Награды и достижения',
            imageCaption: 'Награды и благодарственные письма МП "Тазалык"',
            paragraphs: [t('HistoryAwards1'), t('HistoryAwards2')]
        },
        {
            id: 4,
            variant: 'right' as const,
            title: t('HistoryStageTitle'),
            imageSrc: '/assets/images/Slide8.png',
            imageAlt: 'МП Тазалык сегодня',
            imageCaption: 'Современный автопарк МП "Тазалык"',
            showStats: true,
            paragraphs: [t('HistoryStage1'), t('HistoryStage2'), t('HistoryStage3')]
        }
    ];

    const doubleImage = {
        title: t('HistoryDevelopmentTitle'),
        image1Src: '/assets/images/NewCars.JPG',
        image1Alt: 'Новая техника Тазалык',
        image2Src: '/assets/images/Slide5.JPG',
        image2Alt: 'Современный автопарк',
        paragraphs: [
            t('HistoryDevelopment1'),
            t('HistoryDevelopment2'),
            t('HistoryDevelopment3')
        ]
    };

    return { quote, conclusion, historySections, doubleImage };
};