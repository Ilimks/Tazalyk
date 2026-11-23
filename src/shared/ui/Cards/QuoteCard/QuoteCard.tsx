'use client'
import { Quote } from 'lucide-react';
import styles from './QuoteCard.module.scss';

interface QuoteCardProps {
    text: string;
    author: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ text, author }) => (
    <section>
        <div className="container">
            <div data-reveal suppressHydrationWarning className={styles.quote}>
                <div className={styles.quoteContent}>
                    <Quote size={48} strokeWidth={1.5} aria-hidden />
                    {/* кавычки и тире уже есть в самом тексте */}
                    <blockquote>{text}</blockquote>
                    <cite>{author}</cite>
                </div>
            </div>
        </div>
    </section>
);