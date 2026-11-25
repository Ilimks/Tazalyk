'use client';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/shared/ui/PageHeader';
import { QuoteCard } from '@/shared/ui/Cards';
import { useHistoryData } from '../model/historyData';
import { AwardsSection } from './components/AwardsSection/AwardsSection';
import { HistorySection } from './components/HistorySection';
import { ConclusionSection } from './components/ConclusionSection';
import styles from './HistoryPage.module.scss';

export const HistoryPage: React.FC = () => {
    const t = useTranslations("History");
    const { quote, conclusion, historySections, awards } = useHistoryData();

    return (
        <>
            <PageHeader
                title={t('HistoryTitle')}
                description={t('HistoryDescription')}
                image="/assets/images/covers/history.webp"
                imagePosition="50% 46%"
            />

            <div className="container">
                <ol className={styles.timeline}>
                    {historySections.map((section, index) => (
                        // первое фото видно сразу под заголовком — грузим его без lazy (LCP)
                        <HistorySection key={section.id} {...section} imagePriority={index === 0} />
                    ))}
                </ol>
                <AwardsSection {...awards} />
            </div>

            <QuoteCard text={quote.text} author={quote.author} />
            <ConclusionSection title={conclusion.title} paragraphs={conclusion.paragraphs} />
        </>
    );
};
