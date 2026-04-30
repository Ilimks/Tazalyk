'use client'
import styles from './TariffTable.module.scss';

interface TariffTableProps {
    title: string;
    columns: string[];
    rows: Array<Record<string, string>>;
}

export const TariffTable: React.FC<TariffTableProps> = ({ title, columns, rows }) => {
    return (
        <section>
            <div className="container">
                <div className={styles.tableSection}>
                    <h2 className={styles.sectionTitle}>
                        <span>{title}</span>
                    </h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.tariffTable}>
                            <thead>
                                <tr>
                                    {columns.map((col, index) => (
                                        <th key={index}>{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.category}</td>
                                        <td>{row.unit}</td>
                                        <td>{row.baseTariff}</td>
                                        <td dangerouslySetInnerHTML={{ __html: row.taxes }} />
                                        <td className={styles.totalCell}>{row.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}