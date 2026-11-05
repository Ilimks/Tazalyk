import { CircleAlert } from 'lucide-react';
import styles from './VacanciesNote.module.scss';
import { useTranslations } from 'next-intl';

export const VacanciesNote: React.FC = () => {
    const t = useTranslations("Vacancies");

    return (
        <section>
            <div className="container">
                <div className={styles.note}>
                    <CircleAlert size={20} aria-hidden />
                    <div>
                        <strong>{t('VacanciesImportantTitle')}</strong> {t('VacanciesImportantText')}
                    </div>
                </div>
            </div>
        </section>
    );
};