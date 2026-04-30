import styles from './VacanciesNote.module.scss';
import { useTranslations } from 'next-intl';

export const VacanciesNote: React.FC = () => {
    const t = useTranslations("Vacancies");

    return (
        <section>
            <div className="container">
                <div className={styles.note}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8v4m0 4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div>
                        <strong>{t('VacanciesImportantTitle')}</strong> {t('VacanciesImportantText')}
                    </div>
                </div>
            </div>
        </section>
    );
};