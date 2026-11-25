'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BriefcaseBusiness } from 'lucide-react';
import { VacancyCard, vacanciesApi, type Vacancy } from '@/entities/vacancy';
import styles from './VacanciesOpenings.module.scss';

interface VacanciesOpeningsProps {
    // загружены на сервере вместе со страницей; null — сервер не дождался API
    initialVacancies: Vacancy[] | null;
}

// Открытые вакансии из админки (отдел кадров). Если API недоступен, блок не показывается —
// остальная страница остаётся как была
export const VacanciesOpenings: React.FC<VacanciesOpeningsProps> = ({ initialVacancies }) => {
    const t = useTranslations('Vacancies');
    const [vacancies, setVacancies] = useState<Vacancy[] | null>(initialVacancies);

    useEffect(() => {
        if (initialVacancies !== null) return;
        let cancelled = false;
        vacanciesApi
            .getAll()
            .then((response) => {
                if (!cancelled) setVacancies(response.results);
            })
            .catch((error) => console.error('Failed to load vacancies:', error));
        return () => {
            cancelled = true;
        };
    }, [initialVacancies]);

    if (vacancies === null) return null;

    return (
        <section className={styles.openings} aria-labelledby="vacancies-openings-title">
            <div className="container">
                <h2 id="vacancies-openings-title" className={styles.heading}>
                    <BriefcaseBusiness size={28} aria-hidden />
                    {t('VacanciesOpenTitle')}
                    {/* число карточек и так видно — экранный диктор не должен читать «вакансии2» */}
                    {vacancies.length > 0 && (
                        <span className={styles.count} aria-hidden>
                            {vacancies.length}
                        </span>
                    )}
                </h2>

                {vacancies.length > 0 ? (
                    <div className={styles.grid}>
                        {vacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                        {/* свободное место в последнем ряду занимает своя фотография, а не пустота */}
                        <div
                            className={styles.photo}
                            data-in-three={vacancies.length % 3}
                            data-in-two={vacancies.length % 2}
                        >
                            <Image src="/assets/images/work/driver.webp" alt={t('VacanciesPhoto')} fill sizes="(max-width: 1130px) 50vw, 850px" />
                        </div>
                    </div>
                ) : (
                    <p className={styles.empty}>{t('VacanciesOpenEmpty')}</p>
                )}
            </div>
        </section>
    );
};
