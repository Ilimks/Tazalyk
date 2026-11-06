import { useLocale, useTranslations } from 'next-intl';
import { CircleCheck, Clock, Wallet } from 'lucide-react';
import { getVacancyText, splitRequirements } from '../../lib/localize';
import type { Vacancy } from '../../model/types';
import { VacancyApply } from '../VacancyApply/VacancyApply';
import styles from './VacancyCard.module.scss';

interface VacancyCardProps {
    vacancy: Vacancy;
}

const formatNumber = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
    const t = useTranslations('Vacancies');
    const locale = useLocale();

    const title = getVacancyText(vacancy, 'title', locale);
    const description = getVacancyText(vacancy, 'description', locale);
    const schedule = getVacancyText(vacancy, 'schedule', locale);
    const requirements = splitRequirements(getVacancyText(vacancy, 'requirements', locale));

    const { salary_from: from, salary_to: to } = vacancy;
    // «30 000 – 40 000 сом», «от 30 000 сом», «до 40 000 сом», без зарплаты — «по договорённости»
    const getSalary = () => {
        if (from !== null && to !== null) {
            return from === to
                ? t('VacanciesSalaryExact', { amount: formatNumber(from) })
                : t('VacanciesSalaryRange', { from: formatNumber(from), to: formatNumber(to) });
        }
        if (from !== null) return t('VacanciesSalaryFrom', { from: formatNumber(from) });
        if (to !== null) return t('VacanciesSalaryTo', { to: formatNumber(to) });
        return t('VacanciesSalaryNegotiable');
    };
    const salary = getSalary();

    return (
        <article className={styles.card}>
            <h3 className={styles.title}>{title}</h3>

            <ul className={styles.facts}>
                <li className={styles.salary}>
                    <Wallet size={16} aria-hidden />
                    <span className={styles.srOnly}>{t('VacanciesSalaryLabel')}: </span>
                    {salary}
                </li>
                {schedule && (
                    <li>
                        <Clock size={16} aria-hidden />
                        <span className={styles.srOnly}>{t('VacanciesScheduleLabel')}: </span>
                        {schedule}
                    </li>
                )}
            </ul>

            {description && <p className={styles.description}>{description}</p>}

            {requirements.length > 0 && (
                <div className={styles.requirements}>
                    <h4>{t('VacanciesRequirements')}</h4>
                    <ul>
                        {requirements.map((item, index) => (
                            <li key={index}>
                                <CircleCheck size={16} aria-hidden />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <VacancyApply vacancyId={vacancy.id} vacancyTitle={title} />
        </article>
    );
};
