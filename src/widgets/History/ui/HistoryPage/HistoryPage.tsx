'use client'
import { HistoryHeader, QuoteCard, pageHeader, quote, conclusion, historySections, doubleImage } from '@/entities/history';
import { HistorySection, DoubleImageSection, ConclusionSection } from '@/features/history';
import styles from './HistoryPage.module.scss';

export const HistoryPage: React.FC = () => (
    <section className={styles.history}>
        <div className="container">
            <HistoryHeader title={pageHeader.title} description={pageHeader.description} />
            
            {historySections.map((section) => (
                <HistorySection key={section.id} {...section} />
            ))}
            
            <QuoteCard text={quote.text} author={quote.author} />
            <DoubleImageSection {...doubleImage} />
            <ConclusionSection title={conclusion.title} paragraphs={conclusion.paragraphs} />
        </div>
    </section>
);