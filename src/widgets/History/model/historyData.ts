'use client';
import { useTranslations } from 'next-intl';
import { COMPANY_FACTS } from '@/shared/config/site';

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
            title: t('HistoryWayTitle'),
            images: [{ src: '/assets/images/History1.webp', width: 1280, height: 854, alt: t('HistoryImage1Alt'), caption: t('HistoryImage1Caption') }],
            paragraphs: [t('HistoryWay1'), t('HistoryWay2')]
        },
        {
            id: 2,
            title: t('HistoryPeriodTitle'),
            images: [{ src: '/assets/images/History2.webp', width: 1400, height: 933, alt: t('HistoryImage2Alt'), caption: t('HistoryImage2Caption') }],
            paragraphs: [t('HistoryPeriod1'), t('HistoryPeriod2')]
        },
        {
            id: 3,
            title: t('HistoryDevelopmentTitle'),
            images: [
                { src: '/assets/images/History5.webp', width: 1400, height: 788, alt: t('HistoryImage5Alt') },
                { src: '/assets/images/History6.webp', width: 1400, height: 788, alt: t('HistoryImage6Alt') }
            ],
            paragraphs: [t('HistoryDevelopment1'), t('HistoryDevelopment2'), t('HistoryDevelopment3')]
        },
        {
            id: 4,
            title: t('HistoryStageTitle'),
            images: [{ src: '/assets/images/History4.webp', width: 1400, height: 935, alt: t('HistoryImage4Alt'), caption: t('HistoryImage4Caption') }],
            showStats: true,
            paragraphs: [t('HistoryStage1', { vehicles: COMPANY_FACTS.vehicles, employees: COMPANY_FACTS.employees }), t('HistoryStage2'), t('HistoryStage3')]
        }
    ];

    const awards = {
        title: t('HistoryAwardsTitle'),
        image: { src: '/assets/images/History3.webp', width: 1400, height: 933, alt: t('HistoryImage3Alt') },
        paragraphs: [t('HistoryAwards1'), t('HistoryAwards2')]
    };

    return { quote, conclusion, historySections, awards };
};
