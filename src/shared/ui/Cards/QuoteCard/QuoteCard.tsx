'use client'
import styles from './QuoteCard.module.scss';

interface QuoteCardProps {
    text: string;
    author: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ text, author }) => (
    <section>
        <div className="container">
            <div className={styles.quote}>
                <div className={styles.quoteContent}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <path d="M10 11H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M20 11h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    <blockquote>"{text}"</blockquote>
                    <cite>— {author}</cite>
                </div>
            </div>
        </div>
    </section>
);