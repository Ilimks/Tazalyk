'use client';
import { useTranslations } from 'next-intl';
import styles from './StructureOrganization.module.scss';

// Кто кому подчиняется — по схеме предприятия. У отделов кадров и безопасности подразделений нет.
const BRANCHES = [
    { head: 'deputyPlanning', units: ['planningEconomic', 'developmentAnalysis', 'documentFlow', 'accounting'] },
    { head: 'deputyAbonent', units: ['abonentService', 'procurementDept', 'administrative', 'legal'] },
    { head: 'deputyProduction', units: ['sanitaryCleaningSite', 'solidWasteSite', 'alaTooSquare', 'vasilievskySite'] },
    { head: 'mainEngineer', units: ['transport', 'landscapingRoads', 'demolitionDept', 'fountainsSite', 'strayAnimalsDept'] },
] as const;

const DIRECT = ['hr', 'security'] as const;

export const StructureOrganization: React.FC = () => {
    const t = useTranslations("Structure");

    return (
        <section className={styles.organization}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('organization.title')}</h2>

                <div className={styles.chart}>
                    <div className={styles.director}>{t('organization.director')}</div>

                    <div className={styles.direct}>
                        {DIRECT.map((key) => (
                            <div key={key} className={styles.directCard}>{t(`organization.${key}`)}</div>
                        ))}
                    </div>

                    <div className={styles.branches}>
                        {BRANCHES.map(({ head, units }) => (
                            <div key={head} data-reveal suppressHydrationWarning className={styles.branch}>
                                <h3 className={styles.head}>{t(`organization.${head}`)}</h3>
                                <ul className={styles.units}>
                                    {units.map((unit) => (
                                        <li key={unit}>{t(`organization.${unit}`)}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
