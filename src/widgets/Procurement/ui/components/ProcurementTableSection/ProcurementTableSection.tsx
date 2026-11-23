'use client';
import { useEffect, useMemo, useState } from 'react';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { useCopyProtection } from '@/shared/lib/hooks/useCopyProtection';
import { useProcurements } from '@/features/procurement/model/useProcurements';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import styles from './ProcurementTableSection.module.scss';
import mobileStyles from './ProcurementTableSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { useTranslations } from 'next-intl';
import type { PageResult } from '@/shared/api';
import type { ProcurementItem } from '@/entities/procurement';
import type { ProcurementStatus } from '@/entities/procurement/model/types';
import { InputNews } from '@/shared/ui/Inputs/InputNews';

const STATUSES = ['all', 'active', 'completed', 'cancelled'] as const;

interface ProcurementTableSectionProps {
    itemsPerPage?: number;
    // первая страница, загруженная на сервере; null — сервер не смог её загрузить, грузим в браузере
    initialData?: PageResult<ProcurementItem> | null;
}

export const ProcurementTableSection: React.FC<ProcurementTableSectionProps> = ({
    itemsPerPage = 100,
    initialData = null
}) => {

    const t = useTranslations("Procurement");

    const {
        procurements: loadedProcurements,
        isLoading: isLoadingProcurements,
        isSuccess,
        error: loadError,
        loadProcurements,
        totalCount: loadedCount
    } = useProcurements();
    const { handleCopy, handleContextMenu, handleKeyDown } = useCopyProtection();
    const loadOnClient = initialData === null;

    useEffect(() => {
        if (loadOnClient) loadProcurements(1, itemsPerPage);
    }, [loadOnClient, loadProcurements, itemsPerPage]);

    // таблица показывает только первую страницу, поэтому данные с сервера заменяют загрузку целиком
    const procurements = initialData ? initialData.items : loadedProcurements;
    const totalCount = initialData ? initialData.totalCount : loadedCount;
    const error = loadOnClient ? loadError : null;
    // до первого ответа в браузере показываем загрузку, а не «закупок нет»
    const isLoading = loadOnClient && (isLoadingProcurements || (!isSuccess && !loadError));

    // ТЗ 4.1.12: поиск и фильтр. Записи уже загружены целиком, отбираем их в браузере
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<ProcurementStatus | 'all'>('all');
    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return procurements.filter((item) =>
            (status === 'all' || item.status === status) &&
            (!needle || item.contractNumber.toLowerCase().includes(needle) || item.supplier.toLowerCase().includes(needle))
        );
    }, [procurements, query, status]);

    const renderContent = () => {
        if (isLoading && procurements.length === 0) {
            return <LoadingState />;
        }
        
        if (error && procurements.length === 0) {
            return (
                <div className={styles.errorWrapper}>
                    <ErrorState 
                        error={error} 
                        onRetry={() => loadProcurements(1, itemsPerPage)}
                        title={t('ProcurementErrorData')}
                        variant="compact"
                    />
                </div>
            );
        }

        if (procurements.length === 0 && !isLoading) {
            return <EmptyState variant="procurement" />;
        }
        
        return (
            <>
                <TableHeader totalCount={totalCount} isLoading={isLoading} />
                <div className={styles.toolbar}>
                    <div className={styles.search}>
                        <InputNews
                            value={query}
                            onChange={setQuery}
                            onClear={() => setQuery('')}
                            placeholder={t('ProcurementSearchPlaceholder')}
                        />
                    </div>
                    <div className={styles.statuses}>
                        {STATUSES.map((value) => (
                            <button
                                key={value}
                                type="button"
                                className={`${styles.statusBtn} ${status === value ? styles.statusBtnActive : ''}`}
                                onClick={() => setStatus(value)}
                                aria-pressed={status === value}
                            >
                                {value === 'all' ? t('ProcurementAllStatuses') : t(`ProcurementStatuses.${value}`)}
                            </button>
                        ))}
                    </div>
                </div>
                {visible.length > 0 ? (
                    <TableBody data={visible} />
                ) : (
                    <p className={styles.nothing}>{t('ProcurementNothingFound')}</p>
                )}
            </>
        );
    };

    return (
        <section 
            className={`${styles.procurement} ${mobileStyles.procurement}`}
            onCopy={handleCopy}
            onContextMenu={handleContextMenu}
            onKeyDown={handleKeyDown}
            style={{ userSelect: 'none' }}
        >
            <div className="container">
                <div className={`${styles.procurementBox} ${mobileStyles.procurementBox}`}>
                    {renderContent()}
                </div>
            </div>
        </section>
    );
};