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
                            Директор
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
                                Заместитель директора по планированию и развитию предприятия
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                Заместитель директора по работе абонентской службы
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                Заместитель директора по производству
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                Отдел по управлению человеческими ресурсами
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                Отдел контроля и безопасности
                            </div>
                            <div className={styles.lineVertical}></div>
                        </div>
                        <div className={styles.position}>
                            <div className={styles.positionCard}>
                                Главный инженер
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
                                Планово-экономический отдел
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Управление абонентской службы
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Участок по санитарной очистке
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
                                Транспортный отдел
                            </div>
                        </div>
                    </div>

                    {/* Третий ряд */}
                    <div className={styles.thirdRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Отдел развития и анализа
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Отдел по государственным закупкам
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Участок по вывозу твердых бытовых отходов (ТБО)
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
                                Отдел по эксплуатации и содержанию объектов внешнего благоустройства и дорог
                            </div>
                        </div>
                    </div>

                    {/* Четвертый ряд */}
                    <div className={styles.fourthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Отдел документооборота и системного администрирования
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Административно-хозяйственный отдел
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Участок площади "Ала-Тоо"
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
                                Отдел сноса (Демонтажа) незаконных объектов
                            </div>
                        </div>
                    </div>

                    {/* Пятый ряд */}
                    <div className={styles.fifthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Отдел бухгалтерского учета
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Юридический отдел
                            </div>
                        </div>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Участок "Васильевский тракт"
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
                                Участок "Фонтанные комплексы"
                            </div>
                        </div>
                    </div>

                    {/* Шестой ряд - отдел по борьбе с бродячими животными */}
                    <div className={styles.sixthRow}>
                        <div className={styles.subPosition}>
                            <div className={styles.subPositionCard}>
                                Отдел по борьбе с бродячими животными
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};