'use client';
import { useHistoryData } from '../model/historyData';
import { QuoteCard } from '@/shared/ui/Cards';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { HistorySection } from './components/HistorySection';
import { DoubleImageSection } from './components/DoubleImageSection';
import { ConclusionSection } from './components/ConclusionSection';

export const HistoryPage: React.FC = () => {
    const t = useTranslations("History");
    const { quote, conclusion, historySections, doubleImage } = useHistoryData();
    
    return (
        <>
            <PageHeader
                title={t('HistoryTitle')}
                description={t('HistoryDescription')}
            />
            
            {historySections.map((section) => (
                <HistorySection key={section.id} {...section} />
            ))}
            
            <QuoteCard text={quote.text} author={quote.author} />
            <DoubleImageSection {...doubleImage} />
            <ConclusionSection title={conclusion.title} paragraphs={conclusion.paragraphs} />
        </>
    );
};