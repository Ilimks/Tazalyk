import { useTranslations } from 'next-intl';
import styles from './StructureOrganization.module.scss';

export const StructureOrganization: React.FC = () => {
    const t = useTranslations("Structure");

    return (
        <section className={styles.organization}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('organization.title')}</h2>
                
                <div className={styles.orgChart}>
                    {/* Директор */}
                    <div className={styles.director}>
                        <div className={styles.directorCard}>
                            {t('organization.director')}
                        </div>
                    </div>

                    {/* Линия от директора вниз */}
                    <div className={styles.lineDown}></div>
                    
                    {/* Горизонтальная линия */}
                    <div className={styles.lineHorizontal}></div>

                    {/* Первый ряд - 6 позиций */}
                    <div className={styles.topRow}>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.deputyPlanning')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.deputyAbonent')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.deputyProduction')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.hr')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.security')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                {t('organization.mainEngineer')}
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                    </div>

                    {/* Горизонтальная линия под первым рядом */}
                    <div className={styles.lineHorizontalBottom}></div>

                    {/* Второй ряд подразделений */}
                    <div className={styles.bottomRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.planningEconomic')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.abonentService')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.sanitaryCleaningSite')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.transport')}
                            </div>
                        </div>
                    </div>

                    {/* Третий ряд */}
                    <div className={styles.thirdRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.developmentAnalysis')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.procurementDept')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.solidWasteSite')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.landscapingRoads')}
                            </div>
                        </div>
                    </div>

                    {/* Четвертый ряд */}
                    <div className={styles.fourthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.documentFlow')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.administrative')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.alaTooSquare')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.demolitionDept')}
                            </div>
                        </div>
                    </div>

                    {/* Пятый ряд */}
                    <div className={styles.fifthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.accounting')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.legal')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.vasilievskySite')}
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                &nbsp;
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.fountainsSite')}
                            </div>
                        </div>
                    </div>

                    {/* Шестой ряд - отдел по борьбе с бродячими животными */}
                    <div className={styles.sixthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                {t('organization.strayAnimalsDept')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};